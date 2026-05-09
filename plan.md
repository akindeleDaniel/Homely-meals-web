## Plan: Create Formal SRS for Homely Made Meals

TL;DR: Build a formal SRS document in Markdown for the current Homely Made Meals app, using the existing backend and frontend integration as the source of truth. The SRS will include system scope, actors, use cases, functional requirements, nonfunctional requirements, data models, API endpoints, and open questions.

**Steps**
1. Audit existing application behavior from current code.
   - Review `src/controllers/user.controller.ts`, `src/controllers/menu.controller.ts`, `src/controllers/admin.controller.ts`, `src/services/cart.service.ts`, `src/routes/routes.ts`, `src/app.ts`, `src/server.ts`, and `package.json`.
2. Define the system overview and scope.
   - Describe the app purpose, supported user roles, major subsystems, and the fact that the backend serves the static `frontend/` UI.
3. Define actors and user roles.
   - End user/customer, admin, system, and external payment provider.
4. Create use case descriptions.
   - Register, login, view menu, add to cart, view cart, checkout, verify payment, place order, view orders, update order status.
5. Extract functional requirements from controllers and services.
   - Include validation rules, cart rules, pricing rules, authentication requirements, delivery rules, error conditions, and admin authorization.
6. Document nonfunctional requirements.
   - Tech stack, deployment assumptions, security, performance, reliability, maintainability, and Slack/Telegram notification behavior.
7. Capture data model summaries.
   - User, admin, cart, order, menu items, delivery area, and payload schemas.
8. Add open questions / assumptions.
   - For example, pickup location details, order status lifecycle, payment webhooks or manual verification, front-end integration completeness, environment variable requirements.
9. Prepare the SRS Markdown file path and structure.
   - Proposed file: `SRS.md` in the repository root.

**Relevant files**
- `src/controllers/user.controller.ts`
- `src/controllers/menu.controller.ts`
- `src/controllers/admin.controller.ts`
- `src/services/cart.service.ts`
- `src/routes/routes.ts`
- `src/app.ts`
- `src/server.ts`
- `package.json`

**Verification**
1. Confirm that every API route in `src/routes/routes.ts` is represented in the SRS.
2. Confirm that data validation and business rules from `user.controller.ts` and `cart.service.ts` are captured accurately.
3. Review the SRS against the running app and Swagger docs at `/docs`.

**Decisions**
- Output will be a formal Markdown SRS.
- The SRS should be authored from the existing implementation, not from a blank product idea.
- If you approve, I can next draft the SRS structure and the first version of `SRS.md`.