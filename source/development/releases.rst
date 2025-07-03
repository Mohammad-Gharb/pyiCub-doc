
Release
=======

Overview
--------

This document outlines the release process and guidelines for the ``pyicub`` library. It includes details on how version numbers are managed, how releases are tagged, and what criteria must be met before a new version is considered stable and official. The goal is to ensure that each release is consistent, traceable, and useful for both developers and users.

Versioning Strategy
-------------------

We follow a versioning approach inspired by `Semantic Versioning (SemVer) <https://semver.org/>`_, a widely adopted standard that defines how to assign and increment version numbers.

The version format is::

    vMAJOR.MINOR.PATCH

Where:

- **MAJOR** (e.g., 1.0.0 → 2.0.0): Increased for major refactors.
- **MINOR** (e.g., 1.3.0 → 1.4.0): Increased when adding new functionality or features.
- **PATCH** (e.g., 1.3.1 → 1.3.2): Increased for backward-compatible bug fixes.

We apply SemVer *practically*, especially for active development phases where ``v0.x.y`` may still be common. In these cases:

- ``v0.X.Y`` is used when the project is in an early development phase.
- ``X`` is increased for feature-level changes.
- ``Y`` is increased for bugfixes or minor patches.

**Examples:**

- ``v0.3.0`` → Introduces new feature for PyiCub.
- ``v0.3.1`` → Fixes a bug.
- ``v1.0.0`` → First stable and complete release after development.

Major Changes (``v1.x`` branches)
---------------------------------

Before changing the branches, it is important to understand the branching structure in Pyicub. It is described in the :doc:`Github <../contributions/github.html>`.

If a significant redesign or architectural change is made (e.g., migrating from ``icubSim`` to ``gazebo``), we create a new long-lived version branch such as ``v1.0``. These branches represent parallel supported versions that may diverge in tooling or dependencies.

This allows us to maintain multiple stable versions of the library (e.g., ``pyicub@v0.x`` vs ``pyicub@v1.x``) while continuing active development on ``master``.

Release Criteria
----------------

Before a release can be made, all code changes must follow the PR process described in :doc:`Pull Request <../contributions/pull_requests.html>`.

Summary:

- Code must be merged into ``master`` via a reviewed pull request.
- All core functionalities must be tested manually or automatically.
- Documentation updates must be complete.
- Changelog entries must be added.

Tagging Releases
----------------

A release is made official by creating a **tag** in Git. This tag marks a specific commit as the release point. Tagging ensures traceability, meaning anyone can go back and check exactly what code was included in a release.

Use the following convention when tagging::

    git tag -a v0.3.1 -m "Release v0.3.1"
    git push origin --tags

- Always prefix the tag with ``v`` (e.g., ``v0.3.1``, ``v1.0.0``).
- Tags must match the chosen version exactly.

Release Process Summary
-----------------------

1. Develop new features or fixes in a branch off ``master``.
2. Merge completed work into ``master`` via pull request.
3. Verify that all criteria for release are met (testing, docs, etc).
4. Bump the version number and tag the release.
5. Announce the release internally or externally, if needed.
6. If the release is significantly different (e.g., new tooling), consider creating a ``v1.x`` branch to maintain it independently.

Maintaining Old Versions
------------------------

Sometimes, older versions of the library may still be needed—for example, if they support older tools like ``icubSim``. These can be preserved and updated via their own ``v0.x`` or ``v1.x`` branches. Bugfixes can be cherry-picked into these branches as needed.

This allows us to:

- Keep old systems running without forcing an upgrade.
- Continue modern development with new tools in parallel.

----

By following this process, we ensure that the ``pyicub`` library remains stable, traceable, and maintainable as it evolves.
