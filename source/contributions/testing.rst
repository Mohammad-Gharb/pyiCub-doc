Testing Strategy
================

.. contents::
   :depth: 2
   :local:

.. raw:: html

   <hr>

1. Introduction
---------------

1.1 Overview
~~~~~~~~~~~~

This document defines the test strategy for the ``pyicub`` Python library. The aim is to provide robust, reliable, and maintainable Python interfaces for robot development, with a testing strategy that ensures high quality and repeatability.

1.2 Scope
~~~~~~~~~

1.2.1 Constraints
^^^^^^^^^^^^^^^^^

- **Hardware Independence:** All automated tests must run in simulation (Gazebo) to avoid dependency on physical iCub robots.
- **Python Support:** All tests must pass on all supported Python versions (e.g., 3.8+).
- **CI/CD Integration:** The testing strategy must be compatible with continuous integration systems (e.g., GitHub Actions).
- **Open Source Compliance:** Testing tools and scripts should use open-source licenses.
- **Coverage Requirement:** A minimum of 90% code coverage is required for core modules.

1.2.2 Assumptions
^^^^^^^^^^^^^^^^^

- The codebase will be actively maintained and extended by multiple developers.
- All major features are testable within a simulated environment.
- Test data and simulation scenarios are representative of typical usage.

1.2.3 In Scope
^^^^^^^^^^^^^^

- Integration and system (end-to-end) tests for all public modules.
- Static analysis, linting, and type checks.
- Manual and exploratory testing for critical workflows.
- Automated test execution in both local and CI environments.

1.2.4 Out of Scope
^^^^^^^^^^^^^^^^^^

- Non-simulated (physical lab) acceptance tests.

1.3 Objectives
~~~~~~~~~~~~~~

- Validate correctness, stability, and maintainability of the ``pyicub`` library.
- Ensure high code coverage and early defect detection.
- Enable seamless automated testing both locally and in CI.
- Document testing processes, outcomes, and guidelines.

1.4 Executive Summary
~~~~~~~~~~~~~~~~~~~~~

This strategy outlines the multi-layered approach to testing for ``pyicub``. It includes automated integration and system testing (primarily with pytest), static code analysis, and manual review, all conducted in a reproducible simulation environment. The strategy ensures robust releases, high code quality, and readiness for real-world robotics applications.

.. raw:: html

   <hr>

2. Test Strategy
----------------

2.1 Test Approach
~~~~~~~~~~~~~~~~~

2.1.1 Test Coverage
^^^^^^^^^^^^^^^^^^^

- **Modules:** Integration tests must cover all core modules, interfaces, and helper functions to ensure interaction and functionality.
- **Interfaces:** Robot hardware interfaces, communications, and workflows validated in simulation(Gazebo).
- **Error Handling:** All exception and edge-case paths must be tested.
- **Performance:** Basic responsiveness tests in simulation.

2.1.2 Test Automation
^^^^^^^^^^^^^^^^^^^^^

- **pytest** is the standard framework for all automated Python testing, providing test discovery, fixtures, and parameterization.
- All tests are run both locally and in CI pipelines.
- Coverage is measured by `pytest-cov`.
- Regression tests are retained and run for each release and PR.

2.1.3 Regression Testing
^^^^^^^^^^^^^^^^^^^^^^^^

- All resolved bugs must have corresponding regression tests.
- Regression suite is executed for every pull request and major code change.

2.2 Test Types
~~~~~~~~~~~~~~

2.2.1 Integration Testing
^^^^^^^^^^^^^^^^^^^^^^^^^

- **Goal:** Validate interactions between modules (e.g., command pipelines, event handling).
- **Scope:** Subsystem interactions, robot interface with Gazebo/YARP layers.

2.2.2 System Testing
^^^^^^^^^^^^^^^^^^^^

- **Goal:** Validate end-to-end workflows in a full simulation.
- **Scope:** Full startup, motion sequences, sensor feedback, shutdown.

2.2.3 Manual & Exploratory Testing
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- **Goal:** Identify usability issues and edge cases not easily automated.
- **Scope:** New features, complex behaviors, user experience, and real robot (if available).
- **Practice:** Conducted by developers during feature completion or release review.

2.3 Test Tools
~~~~~~~~~~~~~~

- **pytest:** Main Python test runner.
- **pytest-cov:** Coverage measurement.
- **mypy:** Static type checking.
- **flake8:** Linting and code style.
- **Gazebo:** Robot simulation backend.
- **YARP:** Middleware for robot modules.
- **GitHub Actions:** CI/CD automation.

2.4 Test Environment
~~~~~~~~~~~~~~~~~~~~

- **Development:** Local machine with Dockerized simulation and Python environment.
- **Simulation:** Gazebo launched in either interactive (GUI) or headless mode.
- **CI:** Headless, automated Docker containers executing the full suite.
- **Test Data:** Synthetic and scenario-based, versioned with the codebase.

2.5 Risks and Mitigation
~~~~~~~~~~~~~~~~~~~~~~~~

- **Simulation Drift:** Regularly validate simulation environment matches real robot capabilities.
- **Coverage Gaps:** Enforce code coverage metrics and peer review for test completeness.
- **CI Failures:** Automate environment setup; use stable, versioned Docker images.
- **Test Flakiness:** Stabilize flaky tests (so inconsistent outcome of tests) by isolating side effects.

.. raw:: html

   <hr>

3. Test Plan
------------

3.1 Test Schedule
~~~~~~~~~~~~~~~~~

- **Continuous:** Testing is triggered on each code push, pull request, and scheduled in CI (to define the frequency of the trigger).

3.2 Responsibilities and Roles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **Developers:** Write and maintain tests for their code, review test failures.
- **Maintainers:** Oversee CI status, coverage reports, and overall quality.

3.3 Test Cases
~~~~~~~~~~~~~~

- Test cases are maintained alongside code in the ``tests/`` directory.
- Complex scenarios will be (most likely) described in markdown or reStructuredText files within ``tests/docs/``.

3.4 Metrics and Reporting
~~~~~~~~~~~~~~~~~~~~~~~~~

- **Code Coverage:** % of lines and branches tested (minimum 90%).
- **Test Pass Rate:** Percentage of passing tests per CI run.
- **Defect Density:** Number of bugs reported per release.
- **Resolution Time:** Mean time to resolve failed CI runs or critical bugs.
- **Manual Review Logs:** Outcomes and findings of exploratory/manual sessions.

.. raw:: html

   <hr>

4. Deliverables (To be determined)
----------------------------------

- **Testing Strategy Document:** This document, versioned with the repository.
- **Test Suite:** All automated and manual test cases/scripts.
- **Coverage & Lint Reports:** Generated on every CI run.
- **Final Test Report:** Compiled for major releases, summarizing results, coverage, and known issues.

.. raw:: html

   <hr>

5. Dependencies
---------------

- **Python 3.8+**
- **pytest, pytest-cov, mypy, flake8**
- **Gazebo, YARP**
- **Docker** (for simulation and CI)
- **GitHub Actions** (for CI/CD)

.. raw:: html

   <hr>

6. Appendix
-----------

6.1 Acronyms and Abbreviations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Acronym
     - Definition
   * - API
     - Application Programming Interface
   * - CI
     - Continuous Integration
   * - CD
     - Continuous Deployment
   * - YARP
     - Yet Another Robot Platform
   * - QA
     - Quality Assurance
   * - PEP8
     - Python Enhancement Proposal 8 (style guide)
   * - IDE
     - Integrated Development Environment

6.2 References
~~~~~~~~~~~~~~

- `pytest <https://pytest.org/>`_
- `Gazebo <http://gazebosim.org/>`_
- `YARP <https://www.yarp.it/>`_
- `GitHub Actions <https://github.com/features/actions>`_
- `mypy <http://mypy-lang.org/>`_
- `flake8 <https://flake8.pycqa.org/>`_

**This document will be reviewed and updated as the project evolves, to ensure ongoing quality and relevance.**