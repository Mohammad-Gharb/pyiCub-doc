Contributing to Pyicub
=======================

Thank you for your interest in contributing to the Pyicub project.

Pyicub is a Python library designed to simplify and standardize robot software development for the iCub humanoid platform. Contributions from the community are welcome and encouraged. This document outlines how to contribute effectively, and references essential project documentation to help you align with our development workflow and expectations.

Getting Started
---------------

Before contributing, please ensure that you have:

- A GitHub account
- A fork of the repository
- A local development environment properly set up

Familiarize yourself with the `GitHub Workflow <../Guide/Github_workflow.md>`_ to understand our development process and how branches are structured and maintained. Even though as a team we are working in the same repository, refer to the `branching strategy <../Guide/Github_workflow.md>`_ once you have forked the repository.

Development Workflow
--------------------

It is essential to utilize the provided `Docker <../Development/Docker.md>`_ container for development to ensure a consistent and reproducible environment.

Once the container is running, to contribute code effectively follow `this <../Development/How_to_develop.md>`_ guideline.

Ensure your code follows our `Testing Strategy <../Management/Test_strategy.md>`_ and passes all required checks (`local test <../Development/Docker.md#running-tests>`_, CI, coverage, linting).

Opening a Pull Request
----------------------

We enforce a standardized pull request process to maintain code quality and traceability. Please follow the guidelines and use the `PR template <../Development/Pull_request.md#pull-request-template>`_ when opening a pull request.

Each PR must:

- Be linked to an issue (if applicable)
- Pass all CI checks
- Be reviewed and approved by at least one team member
- Include tests for new or modified behavior
- Be documented (including code comments or examples)

Testing Guidelines
------------------

Our testing strategy is described in detail `here <../Management/Test_strategy.md>`_. Highlights:

- Tests must run in a simulation environment (no physical robot dependency)
- We aim for >90% coverage on core modules but it is not strictly mandatory
- Use ``pytest``, ``pytest-cov``, ``mypy``, and ``flake8`` locally and in CI
- Manual testing is required for features not covered by automation

Test cases should be located under the ``tests/`` directory.

Release Process
---------------

All contributions that affect behavior, APIs, or modules should be reflected in the changelog and considered for version bumping. Our `Release Guidelines <../Development/Releases.md>`_ explain:

- When and how to bump versions (Semantic Versioning)
- How to tag releases
- How to maintain version branches

Only maintainers can tag and publish official releases.

Issue Management
----------------

We track all tasks using GitHub Projects. Refer to the `Issue Triage Guide <../Development/Github_issues.md>`_ for:

- Label definitions
- Priority assignments
- Milestone planning
- Status board workflows

Please check for existing issues before opening a new one, and use descriptive titles and content.

Code Review Expectations
------------------------

All contributions are peer-reviewed. Reviewers may request changes to improve clarity, performance, or maintainability. Contributors are expected to:

- Respond to feedback constructively
- Address requested changes promptly
- Keep PRs small, focused, and self-contained

Documentation Contributions
---------------------------

Improvements to documentation, examples, or tutorials are welcome. These changes also follow the PR process. Please mark such PRs with ``docs:`` in the commit message and ensure clarity for external users.

Style and Best Practices
------------------------

- Please follow the `Coding conventions guideline <../Development/Coding_conventions.md>`_
- Write clear and concise commit messages
- Keep documentation up to date with code changes

Reporting Issues or Requesting Features
---------------------------------------

To report bugs, suggest enhancements, or request support:

1. Open an issue on GitHub
2. Follow the `triage and labeling process <../Development/Github_issues.md>`_
3. Provide sufficient context, logs, and steps to reproduce

Communication
-------------

If you have questions about contributing or need help reviewing your PR, open a discussion in the GitHub repository or mention a maintainer in your issue/PR.
