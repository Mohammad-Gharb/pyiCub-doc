Complex URDF file
=================

Here is my embedded HTML viewer:

.. raw:: html

    <style>

       #urdf-viewer-container { /* Give your div a unique ID for styling */
           width: 700px; /* Or whatever size you need */
           height: 600px;
           border: 1px solid #ccc;
           margin: 20px auto; /* Center the div */
           background-color: #eee;
       }
    </style>

    

        <div id="menu">
            <ul id="urdf-options">
                <li urdf="/_static/urdf/T12/urdf/T12_flipped.URDF" color="#E91E63">ATHLETE</li>
                <li urdf="/_static/urdf/TriATHLETE/urdf/TriATHLETE_flipped.URDF" color="#009688">TriATHLETE</li>
                <li urdf="/_static/urdf/TriATHLETE_Climbing/urdf/TriATHLETE_flipped.URDF" color="#FFB300">TriATHLETE Climbing</li>
            </ul>

            <div id="controls" class="hidden">
                <div id="toggle-controls"></div>
                <div>Drag and drop URDF files or folders! <br/> (Chrome Only)</div>
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
                        <option value="-Z" selected>-Z</option>
                    </select>
                </label>
                <ul></ul>
            </div>
        </div>
        <urdf-viewer up="-Z" display-shadow tabindex="0"></urdf-viewer>
    <div id="urdf-viewer-container">
        <script  type="module" src="../_static/urdf_loader/example/src/index.js"></script>
    </div>