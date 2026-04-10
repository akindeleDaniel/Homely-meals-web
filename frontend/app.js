const menuItems = [
  {
    name: 'Plain Stir-Fry Spaghetti',
    price: '₦2,000',
    description: 'Classic stir-fry spaghetti with rich tomato sauce and fresh herbs.',
    image: 'assets/plain-stir-fry-spaghetti.jpg',
    alt: 'Plain stir fry spaghetti',
  },
  {
    name: 'Stir-Fry Spaghetti + Egg',
    price: '₦2,500',
    description: 'Perfectly fried egg served over our flavorful stir-fry spaghetti.',
    image: 'assets/stir-fry-spaghetti-egg.jpg',
    alt: 'Stir fry spaghetti with egg',
  },
  {
    name: 'Stir-Fry Spaghetti + Beef',
    price: '₦2,500',
    description: 'Tender beef strips on top of our signature stir-fry spaghetti.',
    image: 'assets/stir-fry-spaghetti-beef.jpg',
    alt: 'Stir fry spaghetti with beef',
  },
  {
    name: 'Stir-Fry Spaghetti + Fish',
    price: '₦2,700',
    description: 'Crispy fish paired with savory stir-fry spaghetti for a full meal.',
    image: 'assets/stir-fry-spaghetti-fish.jpg',
    alt: 'Stir fry spaghetti with fish',
  },
  {
    name: 'Stir-Fry Spaghetti + Sardine',
    price: '₦2,500',
    description: 'A tasty stir-fry spaghetti combo topped with sardines and spices.',
    image: 'assets/stir-fry-spaghetti-sardine.jpg',
    alt: 'Stir fry spaghetti with sardine',
  },
  {
    name: 'Stir-Fry Spaghetti + Fish & Plantain (Dodo)',
    price: '₦3,000',
    description: 'A premium combo with fish, plantain, and our signature stir-fry spaghetti.',
    image: 'assets/stir-fry-spaghetti-fish-plantain.jpg',
    alt: 'Stir fry spaghetti with fish and plantain',
  },
];

const comboGrid = document.getElementById('comboGrid');

if (comboGrid) {
  menuItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'combo-item';
    card.innerHTML = `
      <img class="combo-image" src="${item.image}" alt="${item.alt}" onerror="this.src='https://via.placeholder.com/420x280?text=Meal'" />
      <div class="combo-item-content">
        <h3>${item.name}</h3>
        <p class="combo-price">${item.price}</p>
        <p class="combo-description">${item.description}</p>
      </div>
    `;

    comboGrid.appendChild(card);
  });
}
