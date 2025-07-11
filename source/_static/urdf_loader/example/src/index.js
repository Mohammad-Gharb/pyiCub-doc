/* globals */
import * as THREE from 'three';
import { registerDragEvents } from './dragAndDrop.js'; // Assuming this file exists and is correctly structured
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import URDFManipulator from '../../src/urdf-manipulator-element.js';

// Define the custom element
customElements.define('urdf-viewer', URDFManipulator);

// Declare viewer globally, but initialize it inside DOMContentLoaded
let viewer;
let viewerContainer;

// UI element references - get them after DOM is ready
const urdfOptions = document.getElementById('urdf-options');
const limitsToggle = document.getElementById('ignore-joint-limits');
const collisionToggle = document.getElementById('collision-toggle');
const radiansToggle = document.getElementById('radians-toggle');
const autocenterToggle = document.getElementById('autocenter-toggle');
const upSelect = document.getElementById('up-select');
const sliderList = document.querySelector('#controls ul'); // Still targets the ul for sliders
const controlsel = document.getElementById('controls');
const controlsToggle = document.getElementById('toggle-controls');
const animToggle = document.getElementById('do-animate');
const hideFixedToggle = document.getElementById('hide-fixed');

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 1 / DEG2RAD;
let sliders = {};

// Global Functions
const setColor = color => {
    // document.body.style.backgroundColor = color;
    // if (viewer) { // Ensure viewer exists before trying to set highlight color
    //     viewer.highlightColor = '#' + (new THREE.Color(0xffffff)).lerp(new THREE.Color(color), 0.35).getHexString();
    // }
};

const updateList = () => {
    // Attach click listeners to URDF options
    document.querySelectorAll('#urdf-options li[urdf]').forEach(el => {
        el.addEventListener('click', e => {
            // Remove 'selected' class from all others
            document.querySelectorAll('#urdf-options li').forEach(item => item.classList.remove('selected'));
            // Add 'selected' class to the clicked one
            e.target.classList.add('selected');

            const urdf = e.target.getAttribute('urdf');
            const color = e.target.getAttribute('color');
            const pkg = e.target.getAttribute('package'); // Get the package path from the li

            if (viewer) {
                viewer.up = upSelect ? upSelect.value : '-Z'; // Use current up-select value
                viewer.package = pkg; // Set the package path for the new URDF
                viewer.urdf = urdf; // Load the new URDF
                animToggle?.classList.add('checked'); // Re-enable animation by default on new load
                setColor(color);
            }
        });
    });

    // Manually trigger click on the initial selected item to load it
    const initialUrdfPath = viewerContainer.dataset.initialUrdf;
    const initialPackagePath = viewerContainer.dataset.initialPackage;

    const initialLi = document.querySelector(
        `#urdf-options li[urdf="${initialUrdfPath}"][package="${initialPackagePath}"]`
    );

    if (initialLi) {
        initialLi.classList.add('selected'); // Mark as selected
        initialLi.dispatchEvent(new Event('click')); // Trigger load
    } else {
        // Fallback: if the initial item isn't in the list, just load the first one available
        document.querySelector('#urdf-options li[urdf]')?.dispatchEvent(new Event('click'));
    }
};


// --- Main execution flow after DOM is loaded ---
document.addEventListener('DOMContentLoaded', () => {
    viewerContainer = document.getElementById('urdf-viewer-container');
    if (!viewerContainer) {
        console.error("Target div #urdf-viewer-container not found!");
        return;
    }

    // Create the <urdf-viewer> element
    viewer = document.createElement('urdf-viewer');

    // Read initial data attributes from the container div
    const initialUrdfPath = viewerContainer.dataset.initialUrdf;
    const initialPackagePath = viewerContainer.dataset.initialPackage;
    const initialColor = viewerContainer.dataset.initialColor;
    const initialUp = viewerContainer.dataset.initialUp;
    const displayShadow = viewerContainer.dataset.displayShadow === 'true'; // Convert to boolean
    const tabindex = viewerContainer.dataset.tabindex;
    const cameraX = parseFloat(viewerContainer.dataset.cameraX);
    const cameraY = parseFloat(viewerContainer.dataset.cameraY);
    const cameraZ = parseFloat(viewerContainer.dataset.cameraZ);

    // Set initial attributes/properties on the dynamically created viewer
    if (initialUrdfPath) viewer.setAttribute('urdf', initialUrdfPath);
    if (initialPackagePath) viewer.setAttribute('package', initialPackagePath);
    if (initialUp) viewer.setAttribute('up', initialUp);
    if (displayShadow) viewer.setAttribute('display-shadow', ''); // presence of attribute means true
    if (tabindex) viewer.setAttribute('tabindex', tabindex);

    // Append the <urdf-viewer> element to the specified div
    viewerContainer.appendChild(viewer);

    // Set initial background color
    if (initialColor) {
        setColor(initialColor);
    } else {
        // Fallback to default if no color specified
        setColor('#263238');
    }

    // --- UI Event Listeners ---
    limitsToggle?.addEventListener('click', () => {
        limitsToggle.classList.toggle('checked');
        viewer.ignoreLimits = limitsToggle.classList.contains('checked');
    });

    radiansToggle?.addEventListener('click', () => {
        radiansToggle.classList.toggle('checked');
        Object.values(sliders).forEach(sl => sl.update());
    });

    collisionToggle?.addEventListener('click', () => {
        collisionToggle.classList.toggle('checked');
        viewer.showCollision = collisionToggle.classList.contains('checked');
    });

    autocenterToggle?.addEventListener('click', () => {
        autocenterToggle.classList.toggle('checked');
        viewer.noAutoRecenter = !autocenterToggle.classList.contains('checked');
    });

    hideFixedToggle?.addEventListener('click', () => {
        hideFixedToggle.classList.toggle('checked');
        const hideFixed = hideFixedToggle.classList.contains('checked');
        if (controlsel) {
            if (hideFixed) controlsel.classList.add('hide-fixed');
            else controlsel.classList.remove('hide-fixed');
        }
    });

    upSelect?.addEventListener('change', () => viewer.up = upSelect.value);

    controlsToggle?.addEventListener('click', () => controlsel?.classList.toggle('hidden'));

    // --- Viewer-specific Event Listeners ---
    // These listeners ensure the UI (sliders, highlights) reacts to viewer changes
    viewer.addEventListener('urdf-change', () => {
        // Clear old sliders when a new URDF is loaded
        Object.values(sliders).forEach(sl => sl.remove());
        sliders = {};
    });

    viewer.addEventListener('ignore-limits-change', () => {
        Object.values(sliders).forEach(sl => sl.update());
    });

    viewer.addEventListener('angle-change', e => {
        if (sliders[e.detail]) sliders[e.detail].update();
    });

    viewer.addEventListener('joint-mouseover', e => {
        const j = document.querySelector(`li[joint-name="${ e.detail }"]`);
        if (j) j.setAttribute('robot-hovered', true);
    });

    viewer.addEventListener('joint-mouseout', e => {
        const j = document.querySelector(`li[joint-name="${ e.detail }"]`);
        if (j) j.removeAttribute('robot-hovered');
    });

    let originalNoAutoRecenter;
    viewer.addEventListener('manipulate-start', e => {
        const j = document.querySelector(`li[joint-name="${ e.detail }"]`);
        if (j) {
            j.scrollIntoView({ block: 'nearest' });
            window.scrollTo(0, 0);
        }
        originalNoAutoRecenter = viewer.noAutoRecenter;
        viewer.noAutoRecenter = true;
    });

    viewer.addEventListener('manipulate-end', e => {
        viewer.noAutoRecenter = originalNoAutoRecenter;
    });

    // Create the sliders when URDF is processed
    viewer.addEventListener('urdf-processed', () => {
        const r = viewer.robot;
        if (!r) {
            console.warn("URDFManipulator: Robot object not available after processing.");
            return;
        }

        Object
            .keys(r.joints)
            .sort((a, b) => {
                const da = a.split(/[^\d]+/g).filter(v => !!v).pop();
                const db = b.split(/[^\d]+/g).filter(v => !!v).pop();
                if (da !== undefined && db !== undefined) {
                    const delta = parseFloat(da) - parseFloat(db);
                    if (delta !== 0) return delta;
                }
                if (a > b) return 1;
                if (b > a) return -1;
                return 0;
            })
            .map(key => r.joints[key])
            .forEach(joint => {
                if (!sliderList) return; // Ensure sliderList exists
                const li = document.createElement('li');
                li.innerHTML =
                `
                <span title="${ joint.name }">${ joint.name }</span>
                <input type="range" value="0" step="0.0001"/>
                <input type="number" step="0.0001" />
                `;
                li.setAttribute('joint-type', joint.jointType);
                li.setAttribute('joint-name', joint.name);

                sliderList.appendChild(li);

                const slider = li.querySelector('input[type="range"]');
                const input = li.querySelector('input[type="number"]');
                li.update = () => {
                    const degMultiplier = radiansToggle?.classList.contains('checked') ? 1.0 : RAD2DEG;
                    let angle = joint.angle;

                    if (joint.jointType === 'revolute' || joint.jointType === 'continuous') {
                        angle *= degMultiplier;
                    }

                    if (Math.abs(angle) > 1) {
                        angle = angle.toFixed(1);
                    } else {
                        angle = angle.toPrecision(2);
                    }

                    if (input) input.value = parseFloat(angle);
                    if (slider) slider.value = joint.angle;

                    if (viewer.ignoreLimits || joint.jointType === 'continuous') {
                        if (slider) { slider.min = -6.28; slider.max = 6.28; }
                        if (input) { input.min = -6.28 * degMultiplier; input.max = 6.28 * degMultiplier; }
                    } else {
                        if (slider) { slider.min = joint.limit.lower; slider.max = joint.limit.upper; }
                        if (input) { input.min = joint.limit.lower * degMultiplier; input.max = joint.limit.upper * degMultiplier; }
                    }
                };

                switch (joint.jointType) {
                    case 'continuous':
                    case 'prismatic':
                    case 'revolute':
                        break;
                    default:
                        li.update = () => {};
                        input?.remove();
                        slider?.remove();
                }

                slider?.addEventListener('input', () => {
                    viewer.setJointValue(joint.name, slider.value);
                    li.update();
                });

                input?.addEventListener('change', () => {
                    const degMultiplier = radiansToggle?.classList.contains('checked') ? 1.0 : DEG2RAD;
                    viewer.setJointValue(joint.name, input.value * degMultiplier);
                    li.update();
                });

                li.update();
                sliders[joint.name] = li;
            });
    });

    // Override default mesh loader (as in your original code)
    viewer.loadMeshFunc = (path, manager, done) => {
        const ext = path.split(/\./g).pop().toLowerCase();
        switch (ext) {
            case 'gltf':
            case 'glb':
                new GLTFLoader(manager).load(path, result => done(result.scene), undefined, err => done(null, err));
                break;
            case 'obj':
                new OBJLoader(manager).load(path, result => done(result), undefined, err => done(null, err));
                break;
            case 'dae':
                new ColladaLoader(manager).load(path, result => done(result.scene), undefined, err => done(null, err));
                break;
            case 'stl':
                new STLLoader(manager).load(path, result => {
                    const material = new THREE.MeshPhongMaterial();
                    const mesh = new THREE.Mesh(result, material);
                    done(mesh);
                }, undefined, err => done(null, err));
                break;
            default:
                console.warn(`URDFManipulator: Unknown mesh type for path: ${path}`);
                done(null, new Error(`Unknown mesh type: ${ext}`));
                break;
        }
    };

    // Initialize drag and drop events (assuming registerDragEvents is defined in dragAndDrop.js)
    if (typeof registerDragEvents !== 'undefined') {
         registerDragEvents(viewer, () => {
            setColor('#263238'); // Default color on drag/drop
            animToggle?.classList.remove('checked'); // Stop animation on drag/drop
         });
    }

    // Call updateList to set up click handlers for menu items and trigger initial load
    updateList();
});


// Animation loop functions (remain largely the same)
const updateAngles = () => {
    if (!viewer || !viewer.setJointValue) return;

    // Reset everything to 0 first (or keep current angles if not animating a reset)
    const resetJointValues = { ...viewer.angles }; // Clone angles to avoid modifying directly
    for (const name in resetJointValues) resetJointValues[name] = 0;
    viewer.setJointValues(resetJointValues);

    const time = Date.now() / 3e2;
    for (let i = 1; i <= 6; i++) {
        const offset = i * Math.PI / 3;
        const ratio = Math.max(0, Math.sin(time + offset));

        viewer.setJointValue(`HP${ i }`, THREE.MathUtils.lerp(30, 0, ratio) * DEG2RAD);
        viewer.setJointValue(`KP${ i }`, THREE.MathUtils.lerp(90, 150, ratio) * DEG2RAD);
        viewer.setJointValue(`AP${ i }`, THREE.MathUtils.lerp(-30, -60, ratio) * DEG2RAD);
        viewer.setJointValue(`TC${ i }A`, THREE.MathUtils.lerp(0, 0.065, ratio));
        viewer.setJointValue(`TC${ i }B`, THREE.MathUtils.lerp(0, 0.065, ratio));
        viewer.setJointValue(`W${ i }`, window.performance.now() * 0.001);
    }
};

const updateLoop = () => {
    if (animToggle?.classList.contains('checked')) {
        updateAngles();
    }
    requestAnimationFrame(updateLoop);
};

// --- WebComponentsReady listener ---
// This is triggered when all web components are upgraded.
// It's a good place to start the animation loop and set initial camera if not done on urdf-processed.
document.addEventListener('WebComponentsReady', () => {
    animToggle?.addEventListener('click', () => animToggle.classList.toggle('checked'));

    if (viewer) {
        viewer.addEventListener('manipulate-start', () => animToggle?.classList.remove('checked'));
        viewer.addEventListener('urdf-processed', () => {
            updateAngles(); // Start animation or set initial angles after URDF loads

            // Set initial camera position after the robot is loaded and centered
            const cameraX = parseFloat(viewerContainer.dataset.cameraX);
            const cameraY = parseFloat(viewerContainer.dataset.cameraY);
            const cameraZ = parseFloat(viewerContainer.dataset.cameraZ);
            if (!isNaN(cameraX) && !isNaN(cameraY) && !isNaN(cameraZ)) {
                 viewer.camera.position.set(cameraX, cameraY, cameraZ);
            }
            viewer.camera.lookAt(0,0,0); // Ensure camera looks at the origin after setting position
        });
        updateLoop(); // Start the animation loop
    }
});