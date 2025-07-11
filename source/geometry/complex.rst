complex URDF file
=============
.. raw:: html

    <style>
       #urdf-viewer-container { /* Give your div a unique ID for styling */
           width: 700px; /* Or whatever size you need */
           height: 600px;
           border: 1px solid #ccc;
           margin: 20px auto; /* Center the div */
           background-color: #eee; /* Default background */
       }

        urdf-viewer { /* Style for the actual web component instance */
            width: 100%;
            height: 100%;
            display: block;
        }

       /* Add styling for menu and controls for better visibility */
       #menu {
           width: 700px;
           margin: 20px auto 0;
           padding: 10px;
           border: 1px solid #ccc;
           background-color: #f0f0f0;
           box-shadow: 0 2px 5px rgba(0,0,0,0.1);
       }
       #urdf-options {
           list-style: none;
           padding: 0;
           margin: 0 0 10px 0;
           display: flex; /* Arrange options horizontally */
           gap: 10px;
           justify-content: center;
       }
       #urdf-options li {
           padding: 8px 15px;
           border: 1px solid #bbb;
           border-radius: 5px;
           cursor: pointer;
           background-color: #fff;
           transition: background-color 0.2s;
       }
       #urdf-options li:hover {
           background-color: #e0e0e0;
       }
       #urdf-options li.selected { /* Style for the currently active URDF */
           background-color: #d1e7dd; /* A light green to indicate selection */
           border-color: #007bff;
           font-weight: bold;
       }

       #controls {
           padding: 10px;
           border-top: 1px solid #ccc;
           margin-top: 10px;
       }
       #controls.hidden {
           display: none;
       }
       #controls .toggle {
           display: inline-block;
           padding: 5px 10px;
           margin: 5px;
           border: 1px solid #ccc;
           border-radius: 3px;
           cursor: pointer;
           background-color: #fefefe;
       }
       #controls .toggle.checked {
           background-color: #007bff;
           color: white;
           border-color: #007bff;
       }
       #controls label {
           margin-left: 10px;
       }
       #controls ul { /* For joint sliders */
           list-style: none;
           padding: 0;
           margin: 10px 0 0 0;
           max-height: 300px; /* Limit height for scrollability */
           overflow-y: auto;
           border-top: 1px dashed #ddd;
           padding-top: 10px;
       }
       #controls ul li {
           display: flex;
           align-items: center;
           margin-bottom: 8px;
           padding: 3px 0;
           border-bottom: 1px dotted #eee;
       }
       #controls ul li span {
           flex-basis: 120px; /* Fixed width for joint name */
           margin-right: 10px;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           font-size: 0.9em;
       }
       #controls ul li input[type="range"] {
           flex-grow: 1;
           margin-right: 10px;
       }
       #controls ul li input[type="number"] {
           width: 70px;
           font-size: 0.9em;
       }
       #toggle-controls {
           padding: 8px 15px;
           border: 1px solid #007bff;
           background-color: #007bff;
           color: white;
           cursor: pointer;
           border-radius: 5px;
           display: inline-block;
           margin-bottom: 10px;
       }
       .hide-fixed li[joint-type="fixed"] {
           display: none;
       }
       li[robot-hovered] {
           background-color: #f0f8ff; /* Highlight for hovered joint */
           border: 1px solid #aaddff;
       }
    </style>

    

        <div id="menu">
            <ul id="urdf-options">
                <li urdf="urdf/T12/urdf/T12_flipped.URDF" color="#E91E63" package="/en/latest/_static/urdf/T12">ATHLETE</li>
                <li urdf="urdf/TriATHLETE/urdf/TriATHLETE_flipped.URDF" color="#009688" package="/en/latest/_static/urdf/TriATHLETE">TriATHLETE</li>
                <li urdf="urdf/TriATHLETE_Climbing/urdf/TriATHLETE_flipped.URDF" color="#FFB300" package="/en/latest/_static/urdf/TriATHLETE_Climbing">TriATHLETE Climbing</li>
            </ul>

            <div id="controls" class="hidden">
                <div id="toggle-controls">Toggle Controls</div> <div>Drag and drop URDF files or folders! <br/> (Chrome Only)</div>
                <div id="ignore-joint-limits" class="toggle">Ignore Joint Limits</div>
                <div id="hide-fixed" class="toggle">Hide Fixed Joints</div>
                <div id="radians-toggle" class="toggle">Use Radians</div>
                <div id="autocenter-toggle" class="toggle checked">Autocenter</div>
                <div id="collision-toggle" class="toggle">Show Collision</div>
                <div id="do-animate" class="toggle checked">Animate Joints</div>
                <label>
                    Up Axis
                    <select id="up-select">
                        <option value="+X">+X</option>
                        <option value="-X">-X</option>
                        <option value="+Y">+Y</option>
                        <option value="-Y">-Y</option>
                        <option value="+Z">+Z</option>
                        <option value="-Z" selected> -Z</option>
                    </select>
                </label>
                <ul></ul> </div>
        </div>
    <div id="urdf-viewer-container"
        data-initial-urdf="urdf/T12/urdf/T12_flipped.URDF"
        data-initial-package="urdf/T12"
        data-initial-color="#E91E63"
        data-initial-up="-Z"
        data-display-shadow="true"
        data-tabindex="0"
        data-camera-x="-5.5"
        data-camera-y="3.5"
        data-camera-z="5.5"
    >
        <script  type="module" src="../_static/urdf_loader/example/src/index.js"></script>
    </div>