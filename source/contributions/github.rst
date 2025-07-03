GitHub Workflow
===============

Overview
--------

This document describes how to effectively collaborate on the ``pyicub`` project using GitHub. Our team uses a **trunk-based development** approach. This means that all work is centered around a single primary branch: ``master``. All new code is merged into this branch through short-lived, goal-oriented branches.

This document is written to help developers understand how to contribute safely and effectively.

.. raw:: html

   <hr>

Branching Strategy
------------------

We use a simple and scalable branching strategy:

.. list-table::
   :widths: 15 10 15 60
   :header-rows: 1

   * - Branch Name
     - Protected?
     - Base Branch
     - Description
   * - ``master``
     - YES
     - N/A
     - The main production branch. All stable code lives here.
   * - ``feature/*``
     - NO
     - ``master``
     - Short-lived branches for new features. Merged into ``master`` when ready.
   * - ``bugfix/*``
     - NO
     - ``master``
     - Short-lived branches for small fixes. Merged into ``master``.
   * - ``v1.x``
     - YES
     - ``master``
     - Long-term release branches for major or divergent versions of the library.

Key Points:
~~~~~~~~~~~

* **``master``** is the trunk: All production-ready code goes here.
* **``feature/*`` branches** are created to develop isolated features. They are merged into ``master`` once completed and reviewed.
* **``bugfix/*`` branches** are used for fixing specific bugs and are merged into ``master`` with the corresponding version bump (usually PATCH).
* **``vX.Y`` branches** are created when major changes require a divergence (e.g., a move from ``icubSim`` to ``gazebo``). These branches are independently maintained and versioned.

.. raw:: html

   <hr>

Typical Development Workflow
----------------------------

1. **Start from master**

   .. code-block:: bash

      git checkout master
      git pull origin master

2. **Create your feature or bugfix branch**

   .. code-block:: bash

      git checkout -b feature/my-new-feature

3. **Make your changes locally**

4. **Commit regularly with meaningful messages**

   .. code-block:: bash

      git commit -m "feat: add new grasp controller"

   We encourage using `Conventional Commits <https://www.conventionalcommits.org/en/v1.0.0/>`_ where possible:

   * ``feat:`` for new features
   * ``fix:`` for bug fixes
   * ``docs:`` for documentation
   * ``refactor:`` for internal refactoring without behavior change

5. **Push your branch and open a pull request (PR)**

   .. code-block:: bash

      git push origin feature/my-new-feature

   * Open the PR from GitHub.
   * Clearly describe what the PR does.
   * Link to any related issues.
   * Assign reviewers.

6. **Get the code reviewed and approved**

   * Every :doc:`Pull Request <pull_requests>` must be reviewed by at least one team member.
   * Ensure all tests pass (local and CI checks).

7. **Merge into master**

   * Once approved and tested, merge the PR into ``master``.

.. raw:: html

   <hr>

Hotfixes
--------

If an urgent bug is discovered in production:

1. Create a bugfix branch from ``master``:

   .. code-block:: bash

      git checkout master
      git pull origin master
      git checkout -b bugfix/fix-title-error

2. Apply and commit the fix, then merge into ``master``.

3. Bump the PATCH version and tag the release.

   > For how to tag releases and version properly, refer to the **Tagging Releases** section in :doc:`Releases <../development/releases>`.

4. If the bug also affects an older version (e.g., ``v0.3``), cherry-pick the fix into that version branch.

.. raw:: html

   <hr>

Versioning and Tags
-------------------

Our project follows `Semantic Versioning <https://semver.org/>`_ with practical adaptations during early development (``v0.x.y``). For guidance on when to bump versions and how to tag them correctly, refer to the **Versioning Strategy** and **Tagging Releases** sections in :doc:`Releases <../development/releases>`.

.. raw:: html

   <hr>

Best Practices
--------------

* One task per branch: keep changes isolated and easy to review.
* Use clear, descriptive branch and commit names.
* Never push to ``master`` directly — always use PRs.
* Keep branches up to date with ``master`` to avoid conflicts.
* Delete merged branches to keep the repository clean.

.. raw:: html

   <hr>