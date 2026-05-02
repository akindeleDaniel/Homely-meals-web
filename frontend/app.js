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
    description: 'Perfectly boiled egg served over our flavorful stir-fry spaghetti.',
    image: 'assets/stir-fry-spaghetti-egg.jpeg',
    alt: 'Stir fry spaghetti with egg',
  },
  {
    name: 'Stir-Fry Spaghetti + Beef',
    price: '₦3,000',
    description: 'Tender beef strips on top of our signature stir-fry spaghetti.',
    image: 'assets/stir-fry-spaghetti-beef.jpeg',
    alt: 'Stir fry spaghetti with beef',
  },
  {
    name: 'Stir-Fry Spaghetti + Beef & Plantain',
    price: '₦3,500',
    description: 'Beef, plantain, and savory stir-fry spaghetti in one hearty plate.',
    image: 'assets/stir-fry-spaghetti-beef-plantain.jpeg',
    alt: 'Stir fry spaghetti with beef and plantain',
  },
  {
    name: 'Stir-Fry Spaghetti + Egg & Fried Fish',
    price: '₦4,500',
    description: 'A delicious combo with egg, fried fish, and our signature stir-fry spaghetti.',
    image: 'assets/stir-fry-spaghetti-egg-fried-fish.jpeg',
    alt: 'Stir fry spaghetti with egg and fried fish',
  },
  {
    name: 'Stir-Fry Spaghetti + Fish & Plantain',
    price: '₦3,500',
    description: 'Crispy fish and plantain served with rich stir-fry spaghetti.',
    image: 'assets/stir-fry-spaghetti-fish-plantain.jpeg',
    alt: 'Stir fry spaghetti with fish and plantain',
  },
  {
    name: 'Stir-Fry Spaghetti + Sardine & Fried Fish',
    price: '₦4,500',
    description: 'Sardine and fried fish join our flavorful stir-fry spaghetti for a bold plate.',
    image: 'assets/stir-fry-spaghetti-sardine-fried-fish.jpeg',
    alt: 'Stir fry spaghetti with sardine and fried fish',
  }
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
