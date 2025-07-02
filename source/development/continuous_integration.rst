Continuous Integration for Pyicub
=================================

This document outlines the Continuous Integration (CI) strategy and setup for the ``pyicub`` project. It details the process by which automated tests are executed in a Dockerized simulation environment. **Due to YARP's limitations with GitHub Actions, this CI workflow is executed locally using Docker and Git hooks instead of GitHub Actions.**

Goals of CI
-----------

The CI system is designed to:

- Automatically run the full simulation stack for the iCub robot in a headless Docker environment.
- Execute all Python-based integration tests using ``pytest``.
- Detect regressions early during development, before code is pushed to the remote repository.
- Provide fast feedback to developers while preserving realistic robot middleware behavior (YARP).
- Collect and archive test results for debugging and reproducibility.

Key Design Decisions
--------------------

- **Avoid GitHub Actions**: YARP relies on low-level networking and requires port-based communication that conflicts with GitHub Action’s restricted container networking (e.g., no ``--network host`` support).
- **Run Tests Locally**: Instead, tests are executed locally in Docker via a ``pre-push`` Git hook.
- **Full Stack Testing**: The CI setup emulates the real robot middleware environment with YARP, Gazebo, and ``yarprobotinterface``, validating the full software stack.

Infrastructure Overview
------------------------

- **Containerization**: Docker Compose (using profiles and environment overrides)
- **Simulation Engine**: Gazebo Classic in headless mode
- **Robot Middleware**: YARP + yarprobotinterface + iKinGazeCtrl
- **Test Framework**: Pytest (with optional coverage plugin)
- **Artifacts**: Test result XML or HTML saved in ``docker/results/``

Project Structure (CI-Relevant)
-------------------------------

.. code-block:: text

    pyicub-training/
    ├── docker/
    │   ├── compose.yaml          # Docker Compose config
    │   ├── .env                  # COMPOSE_PROFILES and env variables
    │   └── results/              # Test output (e.g., result.xml)
    ├── backend/
    │   └── Dockerfile            # Image used by test container
    ├── icub-apps/                # Gazebo world and YARP configs
    ├── scripts/
    │   └── runTests.sh           # CI test entry point
    ├── .git/hooks/
    │   └── pre-push              # Git hook to trigger CI tests

``runTests.sh`` — Test Execution Pipeline
-----------------------------------------

This Bash script is the core of the CI logic. It is executed inside the ``pyicub-test`` container.

**Responsibilities:**

- Launch ``yarpserver`` and ``yarprun``
- Start ``gzserver`` in headless mode with the iCub world
- Start ``yarprobotinterface`` for hardware abstraction
- Launch ``iKinGazeCtrl`` for head control
- Run ``pytest`` to validate the Python interface

**Robustness Features:**

- Tracks and manages PIDs for all launched components
- Monitors readiness of the simulation environment
- Handles timeouts and prints useful error messages

Git Pre-push Hook
-----------------

To ensure tests are always run before sharing code:

- A ``pre-push`` Git hook is installed in ``.git/hooks/pre-push``.
- This hook launches the local CI pipeline using Docker.
- If tests fail, the push is aborted.
- This guarantees code is only pushed when the local integration passes.

Example of pre-push logic:

.. code-block:: bash

    #!/bin/sh

    if [ "$(id -u)" != "0" ]; then
      exit 0
    fi

    echo " Running tests before pushing..."

    # Run your test script
    bash ../scripts/runTests.sh

    # If the test fails, block the push
    if [ $? -ne 0 ]; then
      echo " Tests failed. Push rejected."
      exit 1
    fi

    echo " Tests passed. Proceeding"

CI Success Criteria
-------------------

CI is considered successful when:

- All Docker containers build correctly.
- The ``pytest`` suite executes without error.
- Simulation starts cleanly and robot interface is responsive.
- Test results are saved in ``/workspace/pyicub/``.

