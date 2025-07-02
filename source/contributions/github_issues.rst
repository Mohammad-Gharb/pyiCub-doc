GitHub Projects and Issue Triage Guide
======================================

This guide provides a structured overview of how we use GitHub Projects to plan, prioritize, and track work in the ``pyicub`` project. It also outlines how to triage issues using standard labels, views, and processes.

.. raw:: html

   <hr>

1. Introduction to GitHub Projects
----------------------------------

GitHub Projects is a planning and tracking system built directly into GitHub. It allows teams to manage tasks using issues, pull requests, labels, priorities, and milestones, all organized through interactive views.

GitHub Projects enables:

* Visual task tracking through boards and timelines.
* Issue categorization and prioritization.
* Assignment of tasks and ownership.
* Structured planning using milestones and fields.

.. raw:: html

   <hr>

2. Project Structure
--------------------

Each project consists of:

* **Items**: Issues or pull requests that represent work.
* **Views**: Ways to visualize items (Boards, Tables, Roadmaps).
* **Fields**: Metadata like Status, Priority, Milestone, Assignee.
* **Automation**: Optional rules that move or modify items automatically.

.. raw:: html

   <hr>

3. Core Views and Their Purpose
-------------------------------

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - View Name
     - Purpose
   * - **Status Board**
     - Kanban-style flow for daily tracking of tasks.
   * - **Roadmap**
     - Calendar-based timeline for long-term planning.
   * - **Prioritized Backlog**
     - Sorted list of tasks by priority level.
   * - **Bugs**
     - Shows only ``bug``-labeled issues for QA and release prep.
   * - **My Items**
     - Tasks assigned to the logged-in user.
   * - **In Review**
     - Lists items currently under code review.

.. raw:: html

   <hr>

4. Field Definitions
--------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Field
     - Purpose
   * - **Status**
     - Tracks task progression (Backlog, Ready, In Progress, etc.).
   * - **Priority**
     - Denotes urgency (``P0``, ``P1``, ``P2``).
   * - **Assignee**
     - Who is responsible for completing the item.
   * - **Milestone**
     - Targeted sprint, release, or date.
   * - **Estimate**
     - Optional time or effort estimate.

.. raw:: html

   <hr>

5. Label Definitions
--------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Label
     - Description
   * - ``bug``
     - A confirmed malfunction or incorrect behavior.
   * - ``documentation``
     - Missing, unclear, or incorrect documentation.
   * - ``duplicate``
     - Already tracked by another issue or PR.
   * - ``enhancement``
     - A feature request or usability improvement.
   * - ``good first issue``
     - Entry-level task suitable for new contributors.
   * - ``help wanted``
     - Maintainers welcome external contributions.
   * - ``invalid``
     - Not valid; caused by incorrect usage.
   * - ``question``
     - User or contributor request for clarification.
   * - ``wontfix``
     - Acknowledged but not planned for resolution.

.. raw:: html

   <hr>

6. Triage Process
-----------------

Triage ensures that issues are categorized, prioritized, and actionable. This is typically done by maintainers on a weekly basis.

Step-by-step Workflow:
~~~~~~~~~~~~~~~~~~~~~~

1. **Confirm It’s an Issue**

   * If it’s a question, label as ``question``.
   * If it lacks enough context, label as ``invalid`` or request clarification.

2. **Check for Duplicates**

   * Search the Issues tab.
   * Close duplicates and link the existing issue.

3. **Label and Categorize**

   * Apply one or more labels (bug, enhancement, etc.).

4. **Assign Priority**

   * P0 = urgent/blocker
   * P1 = high-priority, next sprint
   * P2 = low-priority, backlog

5. **Assign and Schedule**

   * Assign a team member.
   * Associate the issue with a milestone.

6. **Move in Status Board**

   * ``Backlog``: untriaged or new issues.
   * ``Ready``: approved for development.
   * ``In Progress``: active work.
   * ``In Review``: under pull request.
   * ``Done``: resolved/merged.

.. raw:: html

   <hr>

7. When to Close Issues
-----------------------

An issue can be closed if:

* The pull request linked to it is merged.
* It is determined to be invalid or a duplicate.
* It is accepted as ``wontfix``.

.. raw:: html

   <hr>

8. Milestones and Roadmap Planning
----------------------------------

Milestones group related issues and features under a release goal or sprint cycle. These are reflected visually in the Roadmap view. Each accepted issue should be attached to a milestone.

.. raw:: html

   <hr>

9. Best Practices
-----------------

* Perform triage weekly.
* Ensure each task has a defined scope, priority, and assignee.
* Align Roadmap view with actual sprint or delivery timelines.
* Review and update issue status regularly.
* Ensure all code changes are linked to issues.

.. raw:: html

   <hr>