Pyicub Structure
===========================

This document describes the structure and organization of the **Pyicub** repository. Understanding this structure is essential for effective development, testing, deployment, and collaboration within the Pyicub project.

Overview
--------

The ``pyicub`` repository is structured according to industry best practices for **modularity**, **maintainability** and **testability**. It separates source code, configuration, documentation, examples, and deployment assets into distinct directories. This modular structure ensures clear boundaries between development, deployment, documentation, and usage, facilitating efficient onboarding, robust CI/CD pipelines, and streamlined releases.

Top-Level Layout
----------------

.. code-block:: text

    pyicub/
    ├── docker/
    ├── docs/
    ├── examples/
    ├── media/
    ├── pyicub/
    ├── scripts/
    ├── tests/
    ├── LICENSE
    ├── pytest.ini
    ├── README.md
    ├── requirements.txt
    ├── setup.py

Directory and File Reference
----------------------------

1. ``docker/``
~~~~~~~~~~~~~~

**Purpose:** All assets, configurations, and scripts related to containerization and deployment using Docker.

- ``backend/``, ``frontend/``, ``local/``: Contain Dockerfiles for building images for different project components or environments.
- ``compose.base.yaml``, ``compose.local.yaml``, ``compose.yaml``: Docker Compose files for orchestration.
- ``scripts/``: Shell scripts for environment setup and automation.
- ``workdir/``: Prebuilt workspaces for simulation and robot configs.

**Rationale:**  
Centralized containerization enables reproducibility, CI/CD, and clean separation from source.


2. ``examples/``
~~~~~~~~~~~~~~~~

**Purpose:** Practical runnable scripts for demonstrating Pyicub features.

- Organized into thematic folders (e.g., YARP, modules, FSMs, REST, controllers).
- Includes Python scripts and configs.

**Rationale:**  
Executable examples accelerate onboarding and serve as real-use validations.

3. ``media/``
~~~~~~~~~~~~~

**Purpose:** Project visual assets (e.g., logos).

- ``pyicub-logo.png`` and similar media.

**Rationale:**  
Keeps visuals organized for documentation or marketing use.

4. ``pyicub/``
~~~~~~~~~~~~~~

**Purpose:** Core library source code.

- Modular structure:
  - ``controllers/``, ``core/``, ``modules/``, ``proc/``
  - Actions, FSMs, helpers, requests, REST, utils

**Rationale:**  
Encourages modular, testable, and reusable design. Standard Python packaging layout.

5. ``scripts/``
~~~~~~~~~~~~~~~

**Purpose:** Standalone helper scripts and automation tools.

**Rationale:**  
Separates local tools from deployable or core modules.

6. ``tests/``
~~~~~~~~~~~~~

**Purpose:** Automated testing.

- Unit and integration tests.
- Supports CI and TDD.

**Rationale:**  
Improves code quality and supports CI pipelines.

7. Root-Level Files
~~~~~~~~~~~~~~~~~~~

- ``README.md``: Project overview and quickstart
- ``requirements.txt``: Python dependencies
- ``setup.py``: Python packaging
- ``LICENSE``: Open source license
- ``pytest.ini``: Test configuration

**Rationale:**  
Standard Python project entry points for contributors and tooling.

Rationale and Best Practices
----------------------------

- **Separation of Concerns**: Organized layout for maintainability
- **Docker-First Deployment**: Self-contained environments under ``docker/``
- **Documentation-Driven Development**: Versioned and buildable docs
- **Example-Driven Learning**: Rich, runnable scripts
- **Testing as a First-Class Citizen**: Dedicated, discoverable test layout

How to Navigate the Repository
------------------------------

- **For Developers**: Start with ``README.md``, check ``pyicub/``, use ``docker/`` for dev environments
- **For Users**: Explore ``examples/`` and ``docs/``
- **For Contributors**: Add tests in ``tests/``, follow coding standards, see ``development/Testing.md``
- **For DevOps**: Refer to ``docker/`` for orchestration, builds, and deployment automation

Contributions
-------------

All contributors should follow the repository structure to ensure maintainability and scalability. When adding new modules, tests, documentation, or deployment scripts, place them in the appropriate directory as described above.
