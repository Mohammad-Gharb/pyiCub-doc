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
    LoadingManager,
    MathUtils,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import URDFLoader from '../../src/URDFLoader.js';

let scene, camera, renderer, robot, controls;
let viewerContainer;
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
    if (viewerContainer) {
        viewerContainer.appendChild(renderer.domElement);
    } else {
        console.error("URDF viewer container div not found!");
    // Fallback or display an error to the user
        document.body.appendChild(renderer.domElement); // Fallback if div not found, but this is less ideal
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

    // Load robot
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.packages = {
    'T12': 'urdf/T12' // Mapped directly to /_static/T12
};
    loader.load('urdf/T12/urdf/T12_flipped.URDF', result => {
// source/_static/urdf/T12/urdf/T12_flipped.URDF
// source/_static/urdf_loader/example/src/simple.js
        robot = result;

    });

    // wait until all the geometry has loaded to add the model to the scene
    manager.onLoad = () => {

        robot.rotation.x = Math.PI / 2;
        robot.traverse(c => {
            c.castShadow = true;
        });
        for (let i = 1; i <= 6; i++) {

            robot.joints[`HP${ i }`].setJointValue(MathUtils.degToRad(30));
            robot.joints[`KP${ i }`].setJointValue(MathUtils.degToRad(120));
            robot.joints[`AP${ i }`].setJointValue(MathUtils.degToRad(-60));

        }
        robot.updateMatrixWorld(true);

        const bb = new Box3();
        bb.setFromObject(robot);

        robot.position.y -= bb.min.y;
        scene.add(robot);

    };

    onResize();
    window.addEventListener('resize', onResize);

}

function onResize() {
    // Check if the viewerContainer actually exists (good practice)
    if (viewerContainer) {
        // Use the dimensions of the container div, not the window
        console.log(viewerContainer.offsetWidth)
        console.log(viewerContainer.offsetHeight)
        renderer.setSize(viewerContainer.offsetWidth, viewerContainer.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Keep this line

        // Update camera aspect based on container
        camera.aspect = viewerContainer.offsetWidth / viewerContainer.offsetHeight;
        camera.updateProjectionMatrix();

        // If you're using OrbitControls, remember to update them on resize
        // controls.update(); // Uncomment if you have OrbitControls and it needs updating
    } else {
        console.warn("Viewer container not found during resize, could not update canvas size.");
    }
}

function render() {

    requestAnimationFrame(render);
    renderer.render(scene, camera);

}
