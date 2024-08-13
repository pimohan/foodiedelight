const { faker } = require("@faker-js/faker");
const fs = require("fs");

const categories = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "French",
  "Japanese",
  "Thai",
  "American",
  "Mediterranean",
  "Korean",
];

const generateRestaurant = (id) => {
  const menus = [];
  for (let i = 1; i <= 10; i++) {
    menus.push({
      id: i,
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
      category: categories[i % categories.length],
    });
  }

  return {
    id,
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    location: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
    category: categories[id % categories.length],
    contact: {
      phone: faker.phone.number(),
      email: faker.internet.email(),
      website: faker.internet.url(),
    },
    operating_hours: {
      monday: "9:00 AM - 9:00 PM",
      tuesday: "9:00 AM - 9:00 PM",
      wednesday: "9:00 AM - 9:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 11:00 PM",
      saturday: "10:00 AM - 11:00 PM",
      sunday: "10:00 AM - 8:00 PM",
    },
    menu: menus,
    images: [faker.image.food(), faker.image.food()],
    reviews: [
      {
        id: 1,
        rating: faker.string.numeric({ min: 1, max: 5, precision: 0.5 }),
        comment: faker.lorem.sentence(),
        date: faker.date.past().toISOString(),
      },
      {
        id: 2,
        rating: faker.string.numeric({ min: 1, max: 5, precision: 0.5 }),
        comment: faker.lorem.sentence(),
        date: faker.date.past().toISOString(),
      },
    ],
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
};

const restaurants = [];
for (let i = 1; i <= 100; i++) {
  restaurants.push(generateRestaurant(i));
}

fs.writeFileSync(
  "db.json",
  JSON.stringify(
    {
      restaurants,
      users: [
        {
          id: "1",
          username: "admin",
          password: "password1",
          email: "admin@thinkbridge.in",
          name: "User One",
        },
        {
          id: "2",
          username: "guest",
          password: "password2",
          email: "user2@thinkbridge.in",
          name: "User Two",
        },
      ],
    },
    null,
    2
  )
);
console.log("Generated 100 restaurants with 10 menus each.");
