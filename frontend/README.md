# Homely Made Meals Frontend

This folder includes a standalone static frontend for the Homely Made Meals / Wednesday Stir Fry campaign.

- `index.html`: main landing page UI
- `styles.css`: orange-themed brand styling

## Usage

1. Open `frontend/index.html` in browser.
2. Implement backend calls later (no backend wiring included yet).
3. To integrate later, add `src/api/order.js` and call your existing API endpoints.

## Brand notes
- Company: Homely Made Meals (main)
- Branch: Wednesday Stir Fry
- Color base: orange gradient (#ff9b2d, #ff6b00, #ffa04f)

## Adding Photos

1. Place image files inside `frontend/assets/`.
   - Example names used in `app.js`:
     - `plain-stir-fry-spaghetti.jpg`
     - `stir-fry-spaghetti-egg.jpg`
     - `stir-fry-spaghetti-beef.jpg`
     - `stir-fry-spaghetti-fish.jpg`
     - `stir-fry-spaghetti-sardine.jpg`
     - `stir-fry-spaghetti-fish-plantain.jpg`
     - `logo.png`

2. Update `frontend/app.js` to change any image path or item description.
   - Each menu item has `name`, `price`, `description`, `image`, and `alt` text.

3. If you prefer hosted images, use a full URL in `image`, for example:
   - `image: 'https://example.com/images/stir-fry-spaghetti.jpg'`

4. Open `frontend/index.html` in the browser to preview.

## How it works

- `frontend/index.html` loads `styles.css` and `app.js`.
- `app.js` creates each meal card and inserts a photo automatically.
- This makes it easy to add or change photos without rewriting HTML.
