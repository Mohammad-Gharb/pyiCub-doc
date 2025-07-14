import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Mesh,
    PlaneGeometry,
    ShadowMaterial,
    DirectionalLight,
    PCFSoftShadowMap,
    sRGBEncoding,
    Color,
    AmbientLight,
    Box3,
    Vector3,
    LoadingManager,
    MathUtils,
    Raycaster, 
    Vector2
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import URDFLoader from '../../src/URDFLoader.js';

let scene, camera, renderer, robot, controls;
let viewerContainer;
let jointControlsContainer;
const raycaster = new Raycaster();
const mouse = new Vector2();
let popupDiv; 
init();
render();

function init() {

    scene = new Scene();
    scene.background = new Color(0x263238);

    camera = new PerspectiveCamera();
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    

    renderer = new WebGLRenderer({ antialias: true });
    renderer.outputEncoding = sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    viewerContainer = document.getElementById('urdf-viewer-container');
    jointControlsContainer = document.getElementById('joint-controls-container'); // <--- NEW
    if (viewerContainer) {
        viewerContainer.appendChild(renderer.domElement);
    } else {
        console.error("URDF viewer container div not found!");
    // Fallback or display an error to the user
        document.body.appendChild(renderer.domElement); // Fallback if div not found, but this is less ideal
    }
        // --- NEW: Create and style the pop-up div ---
    popupDiv = document.createElement('div');
    popupDiv.style.position = 'absolute';
    popupDiv.style.background = 'rgba(40, 40, 40, 0.8)';
    popupDiv.style.color = 'white';
    popupDiv.style.padding = '8px';
    popupDiv.style.borderRadius = '5px';
    popupDiv.style.pointerEvents = 'none'; // So it doesn't block clicks on the canvas
    popupDiv.style.display = 'none'; // Hidden by default
    popupDiv.style.zIndex = '1000'; // Ensure it's on top
    popupDiv.style.whiteSpace = 'pre-wrap'; // For multi-line text
    document.body.appendChild(popupDiv);
    // -------------------------------------------

    const directionalLight = new DirectionalLight(0xffffff, 1.0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.setScalar(1024);
    directionalLight.position.set(5, 30, 5);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const ground = new Mesh(new PlaneGeometry(), new ShadowMaterial({ opacity: 0.25 }));
    ground.rotation.x = -Math.PI / 2;
    ground.scale.setScalar(30);
    ground.receiveShadow = true;
    scene.add(ground);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 4;
    controls.target.y = 1;
    controls.update();

    // Load robot
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.up = 'Z';
    loader.defaultMeshScale = 1.0;
    loader.packages = {
    'T12': '../_static/urdf/iCub/ds/robots' // Mapped directly to /_static/T12
}
    loader.load('../_static/urdf/iCub/ds/robots/iCubGazeboV2_5/model.urdf', result => {
        robot = result;

    });

    // wait until all the geometry has loaded to add the model to the scene
    manager.onLoad = () => {
        console.log(robot.joints)
        console.log("Number of joints:", Object.keys(robot.joints).length);

        robot.rotation.x = -Math.PI / 2;
        robot.traverse(c => {
            c.castShadow = true;
        });

        robot.updateMatrixWorld(true);

        const bb = new Box3();
        bb.setFromObject(robot);
        const robotSize = bb.getSize(new Vector3());
        console.log("Robot Bounding Box Size (meters):", robotSize);
        robot.position.y -= bb.min.y;
        scene.add(robot);

        bb.setFromObject(robot);

        robot.position.y -= bb.min.y; // Keep this, it puts the robot's base on the ground
        scene.add(robot);

        // Adjust camera to properly frame the robot based on its bounding box
        const center = bb.getCenter(new Vector3());
        const size = bb.getSize(new Vector3()); // Get the calculated size
        const maxDim = Math.max(size.x, size.y, size.z); // Max dimension for view distance
        const fov = camera.fov * (Math.PI / 180); // Camera FOV in radians
        let cameraDistance = maxDim / 2 / Math.tan(fov / 2); // Minimum distance to see whole object

        cameraDistance *= 1.5; // Add some padding so it's not right on the edge of the view

        // --- OPTIMIZED CAMERA POSITIONING ---
        // Position the camera to look at the center of the robot from a good viewing angle
        // For a robot, a common approach is to place the camera slightly above and in front.
        camera.position.set(center.x + cameraDistance * 0.5, center.y + cameraDistance * 0.75, center.z + cameraDistance * 1.5);
        camera.lookAt(center); // Make camera look at the center of the robot

        // --- OPTIMIZED ORBITCONTROLS ---
        controls.target.copy(center); // Orbit around the center of the robot
        controls.minDistance = maxDim * 0.5; // Prevent camera from going too close, adjust as needed
        controls.maxDistance = maxDim * 4;   // Allow zooming out further, adjust as needed
        controls.update(); // Crucial: update controls after changing target and camera position

         // --- NEW: Populate Joint Controls ---
        if (jointControlsContainer) {
            jointControlsContainer.innerHTML = '<h2>Joint Controls</h2>'; // Clear "Loading joints..."
            for (const jointName in robot.joints) {
                const joint = robot.joints[jointName];

                // Only add controls for revolute (and optionally prismatic) joints
                if (joint.jointType === 'revolute' || joint.jointType === 'prismatic') {
                    const controlDiv = document.createElement('div');
                    controlDiv.className = 'joint-control';

                    // --- NEW: Wrapper for label and value display ---
                    const headerDiv = document.createElement('div');
                    headerDiv.className = 'joint-header'; // Add a class for styling
                    
                    const label = document.createElement('label');
                    label.textContent = joint.name;
                    headerDiv.appendChild(label); // Append label to the headerDiv

                    // Display current angle
                    const valueDisplay = document.createElement('span');
                    valueDisplay.className = 'joint-value';
                    valueDisplay.textContent = `${(MathUtils.radToDeg(joint.angle || 0)).toFixed(1)}°`; // Initial value in degrees
                    headerDiv.appendChild(valueDisplay); // Append valueDisplay to the headerDiv
                    
                    controlDiv.appendChild(headerDiv); // Add the headerDiv to the main controlDiv
                    // --- END NEW: Wrapper for label and value display ---

                    const slider = document.createElement('input');
                    slider.type = 'range';
                    slider.min = (MathUtils.radToDeg(joint.limit.lower || 0)).toFixed(1);
                    slider.max = (MathUtils.radToDeg(joint.limit.upper || 0)).toFixed(1);
                    slider.step = 0.1;
                    slider.value = (MathUtils.radToDeg(joint.angle || 0)).toFixed(1);

                    slider.oninput = () => {
                        const angleDeg = parseFloat(slider.value);
                        const angleRad = MathUtils.degToRad(angleDeg);
                        joint.setJointValue(angleRad);
                        valueDisplay.textContent = `${angleDeg.toFixed(1)}°`; // Update display
                    };

                    controlDiv.appendChild(slider); // Slider is appended after the headerDiv
                    jointControlsContainer.appendChild(controlDiv);
                }
            }
        }

    };

    onResize();
    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('click', onClick, false);

}

function onResize() {
    // Check if the viewerContainer actually exists (good practice)
    if (viewerContainer) {
        const width = viewerContainer.offsetWidth;
        const height = viewerContainer.offsetHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.updateProjectionMatrix();
    controls.update();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

// --- NEW: Click handler for raycasting ---
function onClick(event) {
    console.log("clicked")
    if (!robot) { // Ensure robot is loaded
        popupDiv.style.display = 'none';
        console.log("no robot")
        return;
    }


    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    console.log("mouse")

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find all intersecting objects (meshes) in the robot hierarchy
    // We only want to intersect with Meshes that have an associated link/joint data.
    const intersects = raycaster.intersectObjects(robot.children, true); // true for recursive
    console.log("number of intersects")
    console.log(intersects.length)
    // console.log(intersects)
    console.log("###############################################")
    for(let i = 0; i < intersects.length; i++){
        console.log("---------------------------------------------")
        console.log(intersects[i].object.material.name)
        console.log(intersects[i].object.uuid)
        console.log("---------------------------------------------")
    }
    console.log("###############################################")
    if (intersects.length > 0) {
        let clickedObject = intersects[0].object; // The closest intersected object (a THREE.Mesh)
        let linkData = null;
        let jointData = null;

        // Traverse up the hierarchy to find the actual URDF Link/Joint object
        // URDFLoader attaches 'link' and 'joint' data to Object3D's userData
        while (clickedObject) {
            if (clickedObject ) {
                console.log(clickedObject)
                linkData = clickedObject;
                // If this link is associated with a joint, get that joint data too
                if (linkData.parentJoint) {
                    jointData = robot.joints[linkData.parentJoint];
                }
                break; // Found the link, stop traversing
            }
            clickedObject = clickedObject.parent;
        }

        if (linkData) {
            let infoText = `Name: ${linkData.material.name}\n`;
            infoText += `Type: Link\n`;

            if (jointData) {
                infoText += `\nJoint:\n`;
                infoText += `  Name: ${jointData.name}\n`;
                infoText += `  Type: ${jointData.jointType}\n`;
                
                // Add joint angle if applicable
                if (jointData.jointType === 'revolute' || jointData.jointType === 'prismatic') {
                    infoText += `  Current Angle: ${jointData.angle.toFixed(3)} rad\n`;
                    infoText += `  Limits: [${jointData.limit.lower.toFixed(3)}, ${jointData.limit.upper.toFixed(3)}] rad\n`;
                } else if (jointData.jointType === 'continuous') {
                    infoText += `  Current Angle: ${jointData.angle.toFixed(3)} rad (Continuous)\n`;
                }
            }

            // Display pop-up
            popupDiv.innerHTML = infoText;
            popupDiv.style.left = `${event.clientX + 10}px`; // 10px offset from mouse
            popupDiv.style.top = `${event.clientY + 10}px`;
            popupDiv.style.display = 'block';
        } else {
            // Clicked on something but couldn't find associated URDF link data
            popupDiv.style.display = 'none';
        }
    } else {
        // No object intersected, hide pop-up
        popupDiv.style.display = 'none';
    }
}
