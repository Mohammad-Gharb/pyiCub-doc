Icub urdf
=========

Here is little Icub and you can play with it :)

.. raw:: html

    <style>
       /* Optional: If you need these styles specifically for the viewer div */

       #urdf-viewer-container { /* Give your div a unique ID for styling */
           width: 700px; /* Or whatever size you need */
           height: 600px;
           border: 1px solid #ccc;
           margin: 20px auto; /* Center the div */
           background-color: #eee;
       }
       /* Add some basic styling for the viewer */
        #urdf-viewer-container {
            width: 700px;
            height: 600px;
            border: 1px solid #ccc;
            margin: 20px auto;
            display: block;
            float: left; /* To allow controls to float beside it */
        }
        #urdf-viewer-container canvas {
            display: block;
            width: 100%;
            height: 100%;
        }
        /* --- NEW STYLES FOR JOINT CONTROLS --- */
         #joint-controls-container {
            width: 300px;
            height: 600px;
            border: 1px solid #ccc;
            margin: 20px auto;
            padding: 10px;
            float: left;
            overflow-y: auto;
            background-color: #333;
            color: #eee;
            font-family: sans-serif;
            box-sizing: border-box;
        }
        .joint-control {
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: 1px solid #555;
        }
        .joint-control:last-child {
            border-bottom: none;
        }
        
        /* --- NEW: Style for the joint header (name and value) --- */
        .joint-header {
            display: flex; /* Enable flexbox */
            justify-content: space-between; /* Puts space between items (name and value) */
            align-items: center; /* Vertically centers items if they have different heights */
            margin-bottom: 5px; /* Add some space below the header */
        }
        /* Make the label part of the flex container, remove its block display */
        .joint-control label {
            /* display: block; */ /* Remove this, flex item handles it */
            margin-bottom: 0; /* Reset margin from previous rule */
            font-weight: bold;
            color: white;
        }
        /* The value display no longer needs text-align: right */
        .joint-value {
            font-size: 0.9em;
            margin-top: 0; /* Reset margin from previous rule */
            /* text-align: right; */ /* Flexbox handles alignment now */
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
        
        /* Clearfix to contain floats */
        .viewer-and-controls-wrapper::after {
            content: "";
            display: table;
            clear: both;
        }
    </style>


    <div class="viewer-and-controls-wrapper">
        <div id="urdf-viewer-container">

            <script type="module" src="../_static/urdf_loader/example/src/redirect.js"></script>

            <script type="module" src="../_static/urdf_loader/example/src/icub.js"></script>
        </div>

        <div id="joint-controls-container">
            <h2>Joint Controls</h2>
            <p>Loading joints...</p>
        </div>
    </div>
