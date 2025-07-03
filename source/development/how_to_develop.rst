.. meta::
   :sidebar: developmentSidebar

.. _development_guide:

Development Guide
=================

This document describes the recommended workflow and tooling for contributing to the ``pyicub`` Python library using an example. It outlines how to set up your development environment, follow coding standards, and contribute effectively as part of the development lifecycle.

.. raw:: html

   <hr>

1. Toolchain and System Requirements
------------------------------------

Although we provide a Dockerized development environment, the following system requirements ensure compatibility and performance during local builds and development.

Minimum System Requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Ubuntu 20.04+ (or other modern Linux distribution)
- GPU with NVIDIA drivers (preferrable)


Required Packages
~~~~~~~~~~~~~~~~~

Install the following system dependencies:

.. code-block:: bash

   sudo apt update && sudo apt install -y \
       docker.io \
       docker-compose \
       curl \
       git \
       python3-pip \
       python3-venv \
       nvidia-container-toolkit

After installing, ensure Docker can access your GPU (if available):

.. code-block:: bash

   sudo nvidia-ctk runtime configure --runtime=docker
   sudo systemctl restart docker

.. raw:: html

   <hr>

2. Development Environment Setup
--------------------------------

We use Docker and dev containers to ensure consistency across development machines. Please check the documentation about :doc:`Docker <docker>` before going further. An example on how to develop is the following:

Clone the Repository
~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   git clone https://github.com/s4hri/pyicub.git
   cd pyicub/docker

Build and Launch the Docker Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the provided scripts:

.. code-block:: bash

   bash build
   bash go

These scripts will:

- Set up environment variables
- Build required services
- Launch Docker Compose with the appropriate profile

Once launched, you will be dropped into:

.. code-block:: none

   /workspace/
   ├── icub-apps/
   ├── pyicub/
   ├── pyicub-apps/
   └── scripts/

Validate Setup
~~~~~~~~~~~~~~

An example to validate the setup, following the `test guidelines <../contributions/testing>`_, could be:

.. code-block:: bash

   cd pyicub/
   pytest -m smoke

You should see smoke tests passing, confirming your container is working.

.. raw:: html

   <hr>

3. Code Contribution Workflow
-----------------------------

Here below it is show an example taken from the `Github Workflow documentation <../contributions/github>`_:

Create a Feature Branch
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   git checkout -b feature/my-new-feature

Add a New Function
~~~~~~~~~~~~~~~~~~

Edit or add a function in ``pyicub/`` and follow typing and documentation guidelines.

Lint and Type Check
~~~~~~~~~~~~~~~~~~~

Inside the container:

.. code-block:: bash

   pip install flake8 mypy
   flake8 pyicub/
   mypy pyicub/

Commit Changes
~~~~~~~~~~~~~~

.. code-block:: bash

   git add pyicub/
   git commit -m "Feature: add my-new-feature"

.. raw:: html

   <hr>

4. Writing and Running Tests
----------------------------

Add tests in the ``tests/`` directory. Example written following the following `important guideline <../contributions/testing>`_:

.. code-block:: python

   import pytest

   @pytest.mark.smoke
   def test_my_function():
       assert True

Run tests with:

.. code-block:: bash

   pytest -m smoke

Or full test suite:

.. code-block:: bash

   pytest

.. raw:: html

   <hr>

5. Sync, Rebase & Push
----------------------

Keep your branch up to date with ``main``:

.. code-block:: bash

   git checkout main
   git pull origin main
   git checkout feature/my-new-feature
   git rebase main

Then push:

.. code-block:: bash

   git push origin feature/my-new-feature

.. raw:: html

   <hr>

6. Pull Request
---------------

Following the guide obtained from the `Pull request guideline <../contributions/pull_requests>`_:

1. Open a PR on GitHub.
2. Use the `template <../contributions/pull_requests#pull-request-template>`_ and assign reviewers.
3. PRs must pass:
   - Linting
   - Type checks
   - Unit and smoke tests

.. raw:: html

   <hr>


8. Appendix: SSH GitHub Access
------------------------------

To configure Github ssh access inside the container:

.. code-block:: bash

   ssh-keygen -t ed25519 -C "your_email@example.com"
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   cat ~/.ssh/id_ed25519.pub

Add the public key to GitHub, then:

.. code-block:: bash

   git remote set-url origin git@github.com:YOUR_USERNAME/pyicub.git
   ssh -T git@github.com

.. raw:: html

   <hr>