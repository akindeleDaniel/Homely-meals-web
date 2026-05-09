# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This document specifies the requirements for the Homely Made Meals web application. It describes the current implementation and formalizes the expected behavior for users, administrators, and system integrations.

### 1.2 Scope
Homely Made Meals provides a web order system for a Wednesday Stir-Fried Spaghetti campaign. The application supports:
- customer registration and authentication
- menu retrieval
- cart management for protein or combo meal selections
- checkout and payment initialization through Paystack
- order creation and notification through Telegram
- admin authentication and order management
- static frontend delivery via Express

### 1.3 Definitions, Acronyms, and Abbreviations
- API: Application Programming Interface
- SRS: Software Requirements Specification
- Paystack: online payment initialization service used by the app
- JWT: JSON Web Token
- CRUD: Create, Read, Update, Delete
- GK: Geographical area abbreviation used for delivery zones

### 1.4 References
- `package.json`
- `src/app.ts`
- `src/server.ts`
- `src/controllers/user.controller.ts`
- `src/controllers/menu.controller.ts`
- `src/controllers/admin.controller.ts`
- `src/services/cart.service.ts`
- `src/services/order.service.ts`
- `src/models/*.ts`
- `src/routes/routes.ts`

## 2. Overall Description

### 2.1 Product Perspective
This is a single-system product that combines a Node.js/Express backend with a static frontend located in the `frontend/` folder. The backend serves the frontend and exposes REST API endpoints for order and admin flows.

### 2.2 Product Functions
- Serve static frontend assets from `frontend/`
- Provide authentication endpoints for users and admins
- Provide menu retrieval endpoints
- Manage carts for authenticated users
- Initialize payment via Paystack on checkout
- Verify completed payments
- Persist orders in MongoDB
- Notify Telegram when orders are placed or updated

### 2.3 User Classes and Characteristics
- Customer: can register, login, view menu, add items to cart, checkout, and place orders
- Admin: can login, view all orders, and update order status
- System: responsible for payment initialization, order persistence, cart management, and notifications

### 2.4 Operating Environment
- Node.js runtime
- MongoDB database
- Browser for static frontend use
- Environment variables loaded via `.env`

### 2.5 Design and Implementation Constraints
- `type` is `commonjs` in `package.json`
- `tsoa` is used for route generation
- Express is used as the web server
- Mongoose is used for MongoDB models
- No dev or start scripts currently exist beyond `build`
- Future versions may include additional user roles (e.g., restaurant managers) and multi-restaurant support

## 3. External Interface Requirements

### 3.1 User Interfaces
The application frontend is delivered as static HTML/CSS/JS from `frontend/index.html` and served by Express.

### 3.2 API Interfaces
The following endpoints are exposed:

#### Public / user-facing routes
- `POST /main/register`
  - Register a new customer
  - Required body: `email`, `password`, `firstName`, `lastName`, `phoneNumber`
- `POST /main/login`
  - Login existing customer
  - Required body: `email`, `password`
- `GET /main/welcome`
  - Returns a greeting message

#### Authenticated customer routes
- `POST /main/cart/add`
  - Adds items to cart
  - Required bearer token
  - Body may include both `proteins` and `combos`
- `GET /main/cart`
  - Returns the user's current cart
- `POST /main/checkout`
  - Initializes payment and returns a Paystack authorization URL
  - Required bearer token
  - Required body: `email`, `phoneNumber`, `deliveryType`, optional `deliveryArea`, `deliveryAddress`
- `POST /main/order`
  - Verifies payment and creates an order
  - Required bearer token
  - Required body: `email`, `phoneNumber`, `deliveryType`, `orderRef`, optional `deliveryArea`, `deliveryAddress`

#### Admin routes
- `POST /admin/register`
  - Register an admin user
- `POST /admin/login`
  - Admin login
- `GET /admin/orders`
  - Retrieve all orders
  - Requires admin bearer token
- `PUT /admin/orders/{id}`
  - Update order details/status
  - Requires admin bearer token

#### Webhook routes
- `POST /webhook/paystack`
  - Receives payment success notifications from Paystack
  - Automates order finalization

### 3.3 Hardware Interfaces
There are no direct hardware interfaces specified.

### 3.4 Software Interfaces
- MongoDB for data persistence
- Paystack API for payment initialization and verification
- Telegram API for messaging notifications
- Swagger UI via `/docs`

## 4. System Features and Requirements

### 4.1 Register Customer
#### Description
Allows a new customer to create an account.

#### Functional Requirements
- FR1: The system shall accept `email`, `password`, `firstName`, `lastName`, `phoneNumber`.
- FR2: The system shall reject duplicate emails with HTTP 409.
- FR3: The system shall hash the password before storing it.
- FR4: The system shall create an empty cart for the user after registration.

### 4.2 Customer Login
#### Description
Authenticates a customer and returns a JWT.

#### Functional Requirements
- FR5: The system shall validate that `email` and `password` are present.
- FR6: The system shall reject invalid email/password pairs with HTTP 401.
- FR7: The system shall return a JWT valid for 1 day when login succeeds.

### 4.3 Welcome Endpoint
#### Description
Returns a simple greeting to verify the API is available.

#### Functional Requirements
- FR8: The system shall return a static welcome message on `GET /main/welcome`.

### 4.4 Retrieve Menu
#### Description
Returns menu details including base meal, proteins, combos, and delivery info.

#### Functional Requirements
- FR9: The system shall provide menu data from `GET /menu/home`.
- FR10: The system shall include item names, prices, and relevant delivery window info.

### 4.5 Cart Add/Update
#### Description
Adds proteins and/or combos to a customer cart, merges with existing items, and calculates subtotal.

#### Functional Requirements
- FR11: The system shall allow both `proteins` and `combos` per cart update.
- FR12: The system shall reject requests with neither `proteins` nor `combos`.
- FR13: The system shall reject quantities less than or equal to zero.
- FR14: The system shall calculate subtotal as `BASE_PRICE + (protein prices * quantities) + (combo prices * quantities)`.
- FR15: The system shall store `itemsText` describing the items added.
- FR16: The system shall persist the cart in MongoDB and merge with existing cart items.

### 4.6 Retrieve Cart
#### Description
Fetches the authenticated user's current cart.

#### Functional Requirements
- FR17: The system shall return cart items, subtotal, currency, and items text.
- FR18: The system shall return HTTP 404/empty cart error if no cart exists for the user.

### 4.7 Checkout / Payment Initialization
#### Description
Initializes payment via Paystack for an authenticated user's cart.

#### Functional Requirements
- FR19: The system shall authenticate the user via JWT in `Authorization: Bearer <token>`.
- FR20: The system shall validate `email`, `phoneNumber`, and `deliveryType`.
- FR21: If delivery is selected, the system shall require `deliveryArea` and `deliveryAddress`.
- FR22: If pickup is selected, the system shall reject delivery fields.
- FR23: The system shall compute delivery fee using `DELIVERY_FEES[data.deliveryArea]`.
- FR24: The system shall initialize Paystack payment with `total * 100` and return `paymentUrl` and `orderRef`.
- FR25: The system shall return error if payment initialization fails.

### 4.8 Verify Payment and Place Order
#### Description
Verifies a payment with Paystack and creates a final order record, sending immediate Telegram notification.

#### Functional Requirements
- FR26: The system shall verify payment status using Paystack on `POST /main/order` or via webhook.
- FR27: The system shall reject orders whose verification fails or is not `success`.
- FR28: The system shall create an order record with status `paid`.
- FR29: The system shall clear the user's cart after order creation.
- FR30: The system shall send a Telegram notification with order details immediately upon successful payment.

### 4.9 Admin Authentication
#### Description
Allows administrators to register and login.

#### Functional Requirements
- FR31: The system shall support admin registration with `name`, `email`, `password`.
- FR32: The system shall hash admin passwords.
- FR33: The system shall respond with a JWT including role `admin` on successful admin login.

### 4.10 Admin Order Management
#### Description
Enables admins to retrieve all orders and update order status/details with predefined values.

#### Functional Requirements
- FR34: The system shall require admin JWT for `GET /admin/orders` and `PUT /admin/orders/{id}`.
- FR35: The system shall return all orders sorted by creation date descending.
- FR36: The system shall update order records with predefined status values (e.g., pending, paid, preparing, ready, delivered) and notify Telegram when order status changes.

## 5. Data Requirements

### 5.1 User Model
- `firstName`: string, required
- `lastName`: string, required
- `email`: string, required, unique
- `phoneNumber`: string
- `password`: string, required
- `cart`: ObjectId ref `Cart`
- `orders`: ObjectId[] ref `Order`
- `declinedOrders`: ObjectId[] ref `Order`

### 5.2 Cart Model
- `userId`: ObjectId ref `User`, required, unique
- `items.proteins`: array of `{ name, quantity }`
- `items.combos`: array of `{ name, quantity }`
- `subtotal`: number, required
- `currency`: string, default `₦`
- `itemsText`: string

### 5.3 Order Model
- `userId`: ObjectId ref `User`
- `userEmail`: string
- `phoneNumber`: string, required
- `items`: mixed, required
- `subtotal`: number, required
- `deliveryFee`: number, required
- `total`: number, required
- `currency`: string, default `₦`
- `deliveryType`: `pickup` or `delivery`, required
- `deliveryAddress`: string
- `pickupLocation`: string
- `deliveryWindow`: string
- `status`: string
- timestamps: createdAt, updatedAt

### 5.4 Order DTO
- `email`: string
- `phoneNumber`: string
- `deliveryType`: `pickup` | `delivery`
- `deliveryAddress`: string optional
- `deliveryArea`: `gk` | `outside-gk` optional

### 5.5 Pricing Constants
- `BASE_PRICE`: base meal price
- `PROTEIN_PRICES`: mapping of individual protein prices
- `COMBO_PRICES`: mapping of combo meal prices
- `DELIVERY_FEES`: mapping of delivery area fees

## 6. Nonfunctional Requirements

### 6.1 Performance
- The system shall respond to API requests with acceptable latency for simple data retrieval and cart operations.

### 6.2 Security
- Passwords must be hashed before storage.
- JWT tokens are required for protected customer and admin routes.
- Admin routes must verify role `admin` inside JWT.

### 6.3 Reliability
- The system shall handle database failures by returning HTTP 500 errors.
- The system shall return validation errors and clear messages for invalid input.

### 6.4 Maintainability
- The project shall use TypeScript for type safety.
- Routes are generated via `tsoa` from controller definitions.
- Configuration and environment settings use `dotenv`.

### 6.5 Usability
- The system shall serve its own frontend from the backend so customers can access the web UI via `http://localhost:3000`.
- Swagger docs shall be available at `/docs`.

## 7. Assumptions and Constraints
- The frontend is static and served from `frontend/` by the Node backend.
- Customers may choose both proteins and combos at any amount they want per cart submission.
- Pickup orders use a fixed pickup location: `Perfect Touch (GK)`.
- Payment verification uses Paystack; environment variables must include valid Paystack credentials and `JWT_SECRET`.
- Telegram notifications are expected to work when valid Telegram bot/webhook credentials are configured.

## 8. Open Questions
- Should cart updates support merging new items with existing cart items, or always replace the cart contents? **Answer: Cart updates should merge new items with existing cart items. Users should be able to view former orders to make reordering easier, and MongoDB should store all orders.**
- Does the frontend need to call `/main/order` automatically after Paystack returns success, or will order placement be a separate confirmation step? **Answer: Immediately after the user pays, the notification should be sent. There is no need for a separate confirmation step.**
- Should admin order updates include predefined status values beyond free-text status? **Answer: Yes.**
- Is there a need for a payment webhook endpoint to automate order finalization instead of manual `orderRef` verification? **Answer: Yes.**
- Are there any additional user roles or multi-restaurant support requirements in future versions? **Answer: Yes, there could be.**

## 9. Appendix

### 9.1 Known Implementation Notes
- `src/app.ts` registers static middleware and routes.
- `src/server.ts` starts the app on port `3000` and mounts Swagger UI at `/docs`.
- `frontend/README.md` currently describes local static frontend usage and image asset conventions.
