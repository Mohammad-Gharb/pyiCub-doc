
How to Develop
=================

This document describes the recommended workflow and tooling for contributing to the ``pyicub`` Python library using an example. It outlines how to set up your development environment, follow coding standards, and contribute effectively as part of the development lifecycle.

.. contents::
   :local:
   :depth: 2

1. Toolchain and System Requirements
------------------------------------

Although we provide a Dockerized development environment, the following system requirements ensure compatibility and performance during local builds and development.

**Minimum System Requirements**

- Ubuntu 20.04+ (or other modern Linux distribution)
- GPU with NVIDIA drivers (preferable)

**Required Packages**

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

2. Development Environment Setup
--------------------------------

We use Docker and dev containers to ensure consistency across development machines. Please check the documentation about :doc:`Docker <Docker>` before going further. An example of how to develop is the following:

**Clone the Repository**

.. code-block:: bash

    git clone https://github.com/s4hri/pyicub.git
    cd pyicub/docker

**Build and Launch the Docker Environment**

Use the provided scripts:

.. code-block:: bash

    bash build
    bash go

These scripts will:

- Set up environment variables
- Build required services
- Launch Docker Compose with the appropriate profile

Once launched, you will be dropped into:

.. code-block:: text

    /workspace/
    ├── icub-apps/
    ├── pyicub/
    ├── pyicub-apps/
    └── scripts/

**Validate Setup**

An example to validate the setup, following the :doc:`test guidelines <../Management/Test_strategy>`, could be:

.. code-block:: bash

    cd pyicub/
    pytest -m smoke

You should see smoke tests passing, confirming your container is working.

3. Code Contribution Workflow
-----------------------------

Here below is shown an example taken from the :doc:`Gi
