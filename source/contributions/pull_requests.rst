Pull Request
============

This guide outlines how to correctly open a Pull Request (PR) for the **Pyicub** repository. It defines the standard process to follow and includes a template to ensure clarity, consistency, and code quality across our team.

When to Open a Pull Request
---------------------------

Open a PR when:

- You have implemented a new feature or bug fix.
- You want to propose a change and start a discussion.
- You are ready for code review, even if the change is not 100% complete.

.. note::
   If the change is a work-in-progress (WIP), open the PR with the title prefix: ``[WIP]``.

Pull Request Process
--------------------

1. **Create a feature branch** from ``main``:

   .. code-block:: bash

      git checkout -b feature/short-description

2. **Commit your changes** with clear and concise messages:

   .. code-block:: bash

      git commit -m "Fix: resolve crash when sensor input is None"

3. **Push your branch**:

   .. code-block:: bash

      git push origin feature/short-description

4. **Open a Pull Request** on GitHub:

   - Use the PR template provided below.
   - Assign reviewers (at least one core team member).
   - Link related issues in the PR description.

5. **Request review** and respond to comments.

6. **Wait for CI checks to pass.**

7. Once approved, the PR will be **merged by the maintainer**.

PR Acceptance Criteria
----------------------

- The code **runs without errors and passes all tests**.
- The implementation behavior matches the expected outcome.
- Code is **documented** (including docstrings, README, or examples if needed).
- Commit history is clean and meaningful.
- If applicable, version bump is evaluated and changelog is updated.

Pull Request Template
---------------------

.. admonition:: Pull Request Template
   :class: tip

   Copy-paste and fill in this template when opening a PR:

   .. code-block:: markdown

      ## Summary

      <!-- Briefly explain what this PR does and why it is needed -->

      Fixes #[issue_number]

      ## Changes

      - [ ] Implemented feature / fix description
      - [ ] Added/modified tests
      - [ ] Updated documentation or usage examples (if applicable)

      ---

      ## Change Manager: Verified that:

      - [ ] **Solution is implemented**

        - [ ] Code compiles and all tests pass  
          Details:  
          ```
          pytest output / build logs / manual test results
          ```

        - [ ] Behavior matches expected results  
          Details:  
          ```
          Description of output, validation steps or test plan
          ```

      - [ ] **Implementation is documented**
        - [ ] Docstrings and usage updated (if needed)
        - [ ] Changelog entry added
        - [ ] Commit messages are clear
        - [ ] Version bump considered  
          Details:  
          ```
          Not needed / Patch / Minor / Major - and why
          ```

      > Note: this template will most likely be implemented as a pull request template in GitHub, as a future improvement.

      ---

      ## Checklist

      - [ ] Code conforms to PEP8 / project style guidelines
      - [ ] No commented-out debug code or print statements
      - [ ] No large files or data included by mistake (keys etc..)

Additional Notes
----------------

- For **urgent fixes**, notify a reviewer on Teams.
- For **large PRs**, consider breaking them into smaller logical parts.
- Let's keep PRs small, focused, and easy to review.
