Testing Practices
=================

How should tests be written and executed?
-----------------------------------------

Writing Tests
~~~~~~~~~~~~~

- **Test Style:**
  - All tests are written using `pytest <https://docs.pytest.org/>`_ and should be placed in the ``tests/`` directory.
  - Test files should be named ``test_*.py`` and each test function/method name should begin with ``test_``.
  - Where appropriate, group related tests in classes, using ``@classmethod`` setup/teardown for expensive shared resources (e.g., the ``iCub`` instance in integration tests).
  - Use descriptive docstrings for each test function to clarify intent.

- **Types of Tests:**
  - **Smoke Tests:** Simple, fast checks (e.g., import, basic API availability). Example:

    .. code-block:: python

       @pytest.mark.smoke
       def test_import_pyicub():
           try:
               import pyicub
           except ImportError as e:
               pytest.fail(f"Failed to import pyicub: {e}")

  - **Integration/System Tests:** Validate interactions between modules and simulation, using the full robot API in Gazebo. Use ``@pytest.mark.integration`` or similar markers to distinguish these. Example structure:

    .. code-block:: python

       class TestPositionController:
           @classmethod
           def setup_class(self):
               self.icub = iCub()
           @classmethod
           def teardown_class(self):
               self.icub.close()

           def verify_encoders(self, controller, pose, tolerance=5.0):
               # Assert that controller encoders match expected pose, within tolerance
               ...

           @pytest.mark.integration
           def test_move_to_pose_and_home(self):
               # Use robot controller to move to target, then verify encoder state
               ...

  - **Assertions:** Always assert expected outcomes and error conditions. Use helper methods for repeated validation (e.g., comparing simulated encoder values to commanded joint poses).

- **Test Isolation:**
  - Tests must not require specific execution order.
  - Avoid side effects: use setup/teardown or fixtures to manage robot state and resource cleanup.
  - Markers (e.g., ``@pytest.mark.integration``) help selectively run subsets of tests (``pytest -m integration``).

- **Documentation and Licensing:**
  - Each test module should retain the standard BSD 2-Clause license and project copyright.
  - Add clear comments and docstrings to facilitate maintenance by other developers.

Executing Tests
~~~~~~~~~~~~~~~

**All tests must run in simulation (Gazebo), with no dependency on real hardware.** There are two supported workflows:

1. Manual (Interactive) Testing (for development/debugging)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Launch the Docker container as described in project documentation.
- Start Gazebo with the required simulation profile (in Yarp Module Manager>Applictions>iCub_Gazebo run and connect the processes).
- From within the container,inside the pyicub/ directory, run:

  .. code-block:: sh

    pytest --cov=pyicub tests/

- Use markers to filter tests (e.g., ``pytest -m smoke`` or ``pytest -m integration``).

2. Automated (Headless) Testing (for CI and reproducibility)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- In the host machine, in the pyicub/ folder, set the ``.env`` profile to ``test`` and launch using:

  .. code-block:: sh

    bash go

- The suite will run automatically in the simulated environment, collecting results and coverage.

**In both modes:**
- The simulation environment (Gazebo) must be fully initialized before tests start.
- Code quality checks (type-checking, linting) are run as part of the CI/CD workflow.

Summary
-------

- Write tests in pytest style, using markers to distinguish test types.
- Assert all expected outcomes; use helper methods for repeated checks.
- Ensure tests are independent, self-contained, and run only in simulation.
- Execute via ``pytest`` interactively or headlessly, with Gazebo always required.

For further details on test types and overall test strategy, see `Test_strategy.md`.