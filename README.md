# Fill My Fridge

A recipe storage, meal planning, and grocery list app that a team of four specified from scratch, requirements first, and then prototyped in React Native. Most of the work is in the requirements documents; the prototype was built against them in the last two weeks.

More context is on my portfolio at [billyyork.com](https://billyyork.com).

## Requirements documents

| Document | What it covers |
| --- | --- |
| [Vision and Scope](docs/Vision%20and%20Scope.pdf) | The business requirements, stakeholders, and what's in and out of scope |
| [Software Requirements Specification](docs/Software%20Requirements%20Specification.pdf) | Functional and quality requirements written as "shall" statements, plus the use cases and business rules |
| [Design Document](docs/Design%20Document.pdf) | The architecture, including the module decomposition |
| [Data Dictionary](docs/Data%20Dictionary.pdf) | Every data element in the system |
| [Data diagrams](docs/diagrams) | The entity relationship diagram, logical data model, data flow diagram, and CRUD matrix |
| [Private chef persona](docs/personas/Private%20Chef%20Persona.pdf) | One of the user personas the requirements were built around |

The process followed a waterfall model: elicitation through interviews and workshops, then the vision and scope document, then the specification and design, with the prototype last. One example of how the design came out of that process: a workshop on quality attributes turned up food allergies as a safety concern none of us had considered, and by the time the app was decomposed into modules it had its own allergen identifier and allergen database.

## Prototype

The [`app/`](app) folder is the React Native prototype built with Expo, which runs in the browser. It can add recipes and view saved ones. The team started out storing data in SQLite but switched to the browser's local storage to have a working prototype in time, and features like importing recipes from websites were never built. Its sample nutrition data comes from the USDA's FoodData Central. See [app/README.md](app/README.md) for how to run it.

## Team

Ana Knutson, David Litton, Yuliya Kazadoi, and me. On the requirements side, I wrote the stakeholder interview agenda and the private chef persona, built the data dictionary and all four data diagrams, and worked on revisions of the specification and design document. In the prototype, I set up the app and built the recipe form.

## Notes

The documents here are the final versions, exported to PDF, with course details removed. A standalone use case and business rule document was folded into the specification, so it isn't included separately.
