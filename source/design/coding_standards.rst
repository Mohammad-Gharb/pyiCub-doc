=======================
Pyicub Coding Standards
=======================

To maintain quality, readability, and collaboration across the **pyicub** codebase, all development must follow recognized standards.

Python
======

- Follow the official `PEP8 guidelines <https://peps.python.org/pep-0008/>`_.
- Static analysis with ``flake8`` and ``mypy`` is required.
- Naming conventions:
  
  - Modules and files: ``lowercase_with_underscores``
  - Classes: ``CamelCase``
  - Functions and variables: ``lowercase_with_underscores``
  - Constants: ``UPPERCASE_WITH_UNDERSCORES``

- Use type annotations where meaningful.
- Keep imports organized: standard libraries, third-party, then local imports.
- Limit function complexity: prefer small, focused functions.

Bash
====

- Follow `Google's Shell Style Guide <https://google.github.io/styleguide/shellguide.html>`_.
- Scripts must start with: ``#!/usr/bin/env bash``
- Always quote variables: ``"${var}"``
- Ensure portability across Linux environments.
- Write functions for repeated logic; avoid duplication.

General
=======

- Keep code **simple**, **modular**, and **documented**.
- Prioritize **readability** over cleverness.
- Every file must contain a short module-level docstring if applicable.
