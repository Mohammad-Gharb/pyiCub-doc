Docker Environment
==================

Purpose
-------

This repository uses Docker to provide an isolated and consistent development environment for the ``pyicub`` system. The environment ensures reproducibility, avoids system pollution, and streamlines the onboarding process. It supports modular builds for the robotics backend (including ``robotology-superbuild`` and ``pyicub``) and the frontend, all orchestrated through Docker Compose.

.. raw:: html

   <hr>

Benefits of Containerization
----------------------------

- **Reproducibility**: All developers and CI runners use the exact same environment.
- **Simplified Setup**: No need to manually install system packages or Python dependencies.
- **Safe Experimentation**: Test upgrades or changes in isolated containers.
- **Multi-profile Workflows**: Selectively run services (e.g. backend only, frontend only, or test pipelines).

.. raw:: html

   <hr>

Environment Structure
---------------------

- ``backend/``: Dockerfile for simulation & core robotics stack.
- ``frontend/``: Dockerfile for frontend service (optional, e.g., Web Interface for using the robot).
- ``compose.yaml``: Manages service orchestration via Docker Compose.
- ``.env``: Defines global project variables and Compose profile selection.
- ``scripts/``: Contains helper scripts like ``runSetup.sh``, ``runTests.sh``, and automation logic.

.. raw:: html

   <hr>

The Role of ``.env`` and ``COMPOSE_PROFILES``
--------------------------------------------

``.env``
~~~~~~~~

The ``.env`` file centralizes environment variables used across Docker Compose. This includes:

- **Image tags** (``PYICUB_IMAGE_NAME``, ``ROBOTOLOGY_IMAGE_NAME``)
- **Profile flags** (``COMPOSE_PROFILES``)
- **YARP/ICUB Settings** (``ICUB_SIMULATION``, ``ICUBSRV_HOST``, etc.)
- **Feature toggles** for Pyicub modules (``PYICUB_API``, logging paths, ports)

It is injected automatically into each service using the ``env_file:`` directive in Compose and is referenced both at build time (e.g., ``build.args``) and runtime (``environment:`` block).

``COMPOSE_PROFILES``
~~~~~~~~~~~~~~~~~~~~

``docker compose`` supports *profiles* for conditional service inclusion. This project defines three:

.. list-table::
   :widths: 15 25 60
   :header-rows: 1

   * - Profile
     - Services Included
     - Purpose
   * - ``backend``
     - ``pyicub``
     - Main development and simulation container
   * - ``frontend``
     - ``pyicub-frontend``
     - UI layer
   * - ``test``
     - ``pyicub-test``
     - Executes test suite in isolated container

By setting ``COMPOSE_PROFILES``, you choose which parts of the system to bring up.

.. raw:: html

   <hr>

Build and Run Workflow
----------------------

Using the ``go`` script (recommended)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This script automates the build and run process (host machine):

.. code-block:: bash

   ./docker/go

What it does:
1. Sets up ``XDG_RUNTIME_DIR`` if unset.
2. Grants X server access to root inside the container (``xhost +local:root``).
3. Runs ``docker compose down`` with ``COMPOSE_PROFILES=backend,frontend`` (clean start).
4. Builds services (``backend``, ``frontend``) using ``docker compose build``.
5. Starts up the services (``docker compose up``).
6. Brings them down after exit (if not detached).

Note: You can modify ``COMPOSE_PROFILES`` in the script to suit your development needs.

.. raw:: html

   <hr>

Manual Usage
------------

Step 1 – Build
~~~~~~~~~~~~~~

.. code-block:: bash

   COMPOSE_PROFILES=backend docker compose build

Step 2 – Run
~~~~~~~~~~~~

.. code-block:: bash

   COMPOSE_PROFILES=backend docker compose up

Use ``-d`` for detached mode:

.. code-block:: bash

   COMPOSE_PROFILES=backend docker compose up -d

Step 3 – Tear Down
~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   docker compose down --remove-orphans

.. raw:: html

   <hr>

Developing Inside the Container
-------------------------------

Default Workspace Structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Upon container startup, a ``terminator`` terminal is launched and you are placed inside ``/workspace``, which includes:

.. code-block:: none

   /workspace/
   ├── icub-apps/
   ├── pyicub/
   ├── pyicub-apps/
   └── scripts/

- **``icub-apps/``** – YARP-based and Gazebo applications and configurations used in simulation.
- **``pyicub/``** – Python codebase of the pyicub library.
- **``pyicub-apps/``** – Additional Python robotic applications.
- **``scripts/``** – Entry-point and automation scripts for setup, testing, and environment configuration (e.g., ``runSetup.sh``, ``runTests.sh``).

This structure is mounted from a Compose volume and persists as long as the volume exists.

.. raw:: html

   <hr>

Setup and Initialization
------------------------

The container entrypoint runs:

.. code-block:: bash

   /opt/scripts/runSetup.sh

This script:
- Prepares device simulation and YARP configuration.
- Initializes any required services before interaction.

.. raw:: html

   <hr>

Running Tests
-------------

A dedicated test profile is available for automated test execution.

To launch the tests via Compose:

.. code-block:: bash

   COMPOSE_PROFILES=test docker compose up

Alternatively, from within the running container:

1) From yarpmanager > Applications > iCub_Gazebo, run all the scripts displayed.
2) Then run:

   .. code-block:: bash

      pytest -v /workspace/pyicub/tests

This command produces CLI test output and logs.

.. raw:: html

   <hr>

Best Practices
--------------

- Use ``test`` profile for isolated, fast validation pipelines.
- Mount volumes to persist workspace data between sessions.
- Use ``go`` for streamlined build/run/down workflow.
- Do all code execution and editing inside ``/workspace`` for clarity and compatibility.
- The container runs as root intentionally to simplify permission handling for devices like YARP ports or Gazebo simulation.

.. raw:: html

   <hr>