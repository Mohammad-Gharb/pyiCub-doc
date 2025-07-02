
Installation
======================================

Introduction
------------

`PYICUB <https://github.com/s4hri/pyicub>`_ is a framework for developing iCub applications using Python.


Requirements
------------

- `YARP <https://github.com/robotology/yarp>`_ (compiled with Python wrappers)
- `icub-main <https://github.com/robotology/icub-main>`_

How to install the Python package
---------------------------------

.. code-block:: bash

    git clone git@github.com:s4hri/pyicub.git
    cd pyicub
    pip3 install .

How to start (using Docker)
----------------------------

In order to simplify the installation procedure, we have containerized the essential requirements in a Docker image.

.. code-block:: bash

    git clone git@github.com:s4hri/pyicub.git
    cd pyicub/docker
    bash build.sh
    bash run.sh

How to test pyicub
------------------

To run the tests you can run this command from your host machine, leveraging Docker containers.

.. code-block:: bash

    cd pyicub/docker
    COMPOSE_PROFILES=test ./run.sh
