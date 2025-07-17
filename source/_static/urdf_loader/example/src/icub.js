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
let isWaving = true;
let waveStartTime = 0;
const waveSpeed = 2; 
const waveJointName = 'r_elbow'; 
let jointSliders = {}; 
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
    jointControlsContainer = document.getElementById('joint-controls-container');
    if (viewerContainer) {
        viewerContainer.appendChild(renderer.domElement);
    } else {
        console.error("URDF viewer container div not found!");
        document.body.appendChild(renderer.domElement); 
    }

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

    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.up = 'Z';
    loader.defaultMeshScale = 1.0;
    loader.packages = {
    'T12': '../_static/urdf/iCub/ds/robots' // Mapped directly to /_static/T12
    }
    loader.load('../_static/urdf/iCub/ds/robots/iCubGazeboV2_5_visuomanip/model.urdf', result => {
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

        robot = set_initial_State(robot);
        robot.updateMatrixWorld(true);

        const bb = new Box3();
        bb.setFromObject(robot);
        const robotSize = bb.getSize(new Vector3());
        robot.position.y -= bb.min.y;
        scene.add(robot);

        bb.setFromObject(robot);

        robot.rotation.z = Math.PI / 2; 
        scene.add(robot);

        // Adjust camera to properly frame the robot based on its bounding box
        const center = bb.getCenter(new Vector3());
        const size = bb.getSize(new Vector3()); // Get the calculated size
        const maxDim = Math.max(size.x, size.y, size.z); // Max dimension for view distance
        const fov = camera.fov * (Math.PI / 180); // Camera FOV in radians
        let cameraDistance = maxDim / 2 / Math.tan(fov / 2); // Minimum distance to see whole object

        cameraDistance *= 0.8; // Add some padding so it's not right on the edge of the view

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
                    jointSliders[jointName] = { slider: slider, valueDisplay: valueDisplay }; // <--- NEW
                }
            }
        }
    };

    onResize();
    window.addEventListener('resize', onResize);

}
viewerContainer.addEventListener('joint-mouseover', e => {

    console.log("here mouse over")
    console.log(e.detail)

});

viewerContainer.addEventListener('joint-mouseout', e => {

    console.log("mouse out")

});

function onResize() {
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
function render(time) {
    requestAnimationFrame(render);
    if (robot && isWaving && robot.joints[waveJointName]) {
        const joint = robot.joints[waveJointName];
        const elapsedTime = (time - waveStartTime) / 1000; // Time in seconds


        const range = joint.limit.upper - joint.limit.lower;
        const center = (joint.limit.upper + joint.limit.lower) / 2;
        const amplitude = range / 2;

        const newAngleRad = center + amplitude * Math.sin(elapsedTime * waveSpeed);
        joint.setJointValue(newAngleRad);

        // Update the corresponding slider and its display
        if (jointSliders[waveJointName]) {
            jointSliders[waveJointName].slider.value = MathUtils.radToDeg(newAngleRad).toFixed(1);
            jointSliders[waveJointName].valueDisplay.textContent = `${MathUtils.radToDeg(newAngleRad).toFixed(1)}°`;
        }
    }

    renderer.render(scene, camera);
}

function set_initial_State(robot){
    robot.joints[`r_shoulder_roll`].setJointValue(MathUtils.degToRad(90));
    robot.joints[`l_shoulder_roll`].setJointValue(MathUtils.degToRad(30));
    robot.joints[`r_shoulder_pitch`].setJointValue(MathUtils.degToRad(-80));
    return robot
}