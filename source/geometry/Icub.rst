Icub urdf
=========

Here is little Icub and you can play with it :)

.. raw:: html

    <style>
        /* General body styling for better layout */
        body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
        }

        /* Adjust viewer-and-controls-wrapper to center its content */
        .viewer-and-controls-wrapper {
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: flex-start; /* Align to top */
            width: fit-content; /* Only take up space needed by content */
            margin: 20px auto; /* Center the wrapper itself */
            position: relative; /* If you need absolute children within it later */
        }

        #urdf-viewer-container {
            width: 700px;
            height: 600px; /* Adjusted height for better proportions */
            border: 1px solid #ccc;
            display: block;
            position: relative; /* ESSENTIAL for absolute children positioning */
            overflow: hidden; /* Clips content outside its bounds */
            background-color: #263238; /* Match scene background */
        }
        #urdf-viewer-container canvas {
            display: block;
            width: 100%;
            height: 100%;
        }

        /* --- JOINT CONTROLS CONTAINER (NOW ON LEFT AS OVERLAY) --- */
        #joint-controls-container {
            width: 280px;
            max-height: 100%;
            border: 1px solid #555;
            padding: 10px;
            position: absolute; /* Positioned relative to #urdf-viewer-container */
            top: 10px; /* Distance from the top of viewer */
            left: 10px; /* NOW ON THE LEFT SIDE */
            overflow-y: auto;
            background-color: rgba(51, 51, 51, 0.8);
            color: #eee;
            font-family: sans-serif;
            box-sizing: border-box;
            z-index: 5;
            border-radius: 5px;
        }

        .joint-control {
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: 1px solid #555;
        }
        .joint-control:last-child {
            border-bottom: none;
        }

        .joint-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        .joint-control label {
            margin-bottom: 0;
            font-weight: bold;
            color: white;
        }
        .joint-value {
            font-size: 0.9em;
            margin-top: 0;
        }

        .joint-control input[type="range"] {
            width: 100%;
            margin-top: 5px;
            -webkit-appearance: none;
            height: 8px;
            background: #555;
            outline: none;
            opacity: 0.7;
            -webkit-transition: .2s;
            transition: opacity .2s;
            border-radius: 4px;
        }
        .joint-control input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
        }
        .joint-control input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
        }

        /* Clearfix no longer needed as floats are removed */
        .viewer-and-controls-wrapper::after {
            content: "";
            display: table;
            clear: both;
        }

        /* --- MAXIMIZE BUTTON (now top-right) --- */
        #maximizeButton {
            position: absolute;
            top: 10px;
            right: 10px; /* NOW ON THE RIGHT SIDE */
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 3px;
            font-size: 0.8em;
            z-index: 10;
        }
        #maximizeButton:hover {
            background-color: rgba(0, 0, 0, 0.7);
        }

        /* --- MAXIMIZED STATE FOR VIEWER CONTAINER --- */
        #urdf-viewer-container.maximized {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            z-index: 9999;
        }
        #joint-controls-wrapper.hidden #toggle-controls:before {
            content: "show controls";
        }
        #joint-control-toggle:hover{
            color : black;
        }

        #joint-controls-wrapper.hidden > *:not(#toggle-controls) {
            display: none;
        }
        #joint-control-toggle{
        overflow-y: auto;
        background-color: rgba(51, 51, 51, 0.8);
        color: #eee;
        font-family: sans-serif;
        box-sizing: border-box;
        z-index: 5;
        border: none;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20px;
        }

    </style>

    <div class="viewer-and-controls-wrapper">
        <div id="urdf-viewer-container">
            <button id="maximizeButton">Maximize</button>

            <div id="joint-controls-container">
                <button id="joint-control-toggle">Joint Controls</button>
                <div id='joint-controls-list'></div>
                <p>Loading joints...</p>
                </div>

            <script type="module" src="../_static/urdf_loader/example/src/icub.js"></script>
        </div>
    </div>