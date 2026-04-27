const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

const seedUsers = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);
  
  return [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true
    }
  ];
};

const products = [
  // --- Home and Outdoor (8 Items) ---
  { name: 'Soft chairs', price: 19.00, image: '/images/soft-chair.png', description: 'Comfortable soft chair', category: 'Home', stock: 40 },
  { name: 'Sofa & chair', price: 89.00, image: '/images/soft&chair.png', description: 'Elegant sofa set', category: 'Home', stock: 12 },
  { name: 'Kitchen dishes', price: 10.00, image: '/images/kitchen-dishes.png', description: 'Durable kitchenware', category: 'Home', stock: 100 },
  { name: 'Smart lamps', price: 190.00, image: '/images/sm-image.png', description: 'Modern smart lighting', category: 'Home', stock: 25 },
  { name: 'Kitchen mixer', price: 340.00, image: '/images/mixer.png', description: 'Professional mixer', category: 'Home', stock: 15 },
  { name: 'Blenders', price: 200.00, image: '/images/blender.png', description: 'High-speed blender', category: 'Home', stock: 30 },
  { name: 'Home rasm', price: 50.00, image: '/images/rasm.png', description: 'Decorative home art', category: 'Home', stock: 20 },
  { name: 'Coffee maker', price: 5.00, image: '/images/maker.png', description: 'Compact coffee maker', category: 'Home', stock: 50 },

  // --- Consumer Electronics (8 Items) ---
  { name: 'Smart watches', price: 19.00, image: '/images/image35.png', description: 'Latest smartwatch', category: 'Electronics', stock: 100 },
  { name: 'Cameras', price: 89.00, image: '/images/6.png', description: 'High-res action camera', category: 'Electronics', stock: 50 },
  { name: 'Headphones', price: 10.00, image: '/images/9.png', description: 'Noise-cancelling headphones', category: 'Electronics', stock: 200 },
  { name: 'SmartWatch Pro', price: 190.00, image: '/images/10.png', description: 'Advanced wearable tech', category: 'Electronics', stock: 45 },
  { name: 'Gaming Set', price: 340.00, image: '/images/image29.png', description: 'Complete gaming gear', category: 'Electronics', stock: 10 },
  { name: 'Laptops & PC', price: 200.00, image: '/images/7.png', description: 'Powerful workstation', category: 'Electronics', stock: 30 },
  { name: 'SmartPhones', price: 50.00, image: '/images/tablet.png', description: 'Latest 5G smartphone', category: 'Electronics', stock: 60 },
  { name: 'Electric Kettle', price: 5.00, image: '/images/rediphone.png', description: 'Fast boiling kettle', category: 'Electronics', stock: 80 },

  // --- Recommended Items (Clothing) ---
  { name: 'T-shirts with multiple colors', price: 10.30, image: '/images/rec-item1.png', description: 'Cotton comfort', category: 'Clothing', stock: 500 },
  { name: 'Jeans shorts for men', price: 15.50, image: '/images/rec-item2.png', description: 'Blue denim shorts', category: 'Clothing', stock: 120 },
  { name: 'Mens jacket winter', price: 22.00, image: '/images/rec-item3.png', description: 'Warm winter wear', category: 'Clothing', stock: 45 },
  { name: 'Leather wallet for men', price: 8.50, image: '/images/rec-item4.png', description: 'Genuine leather', category: 'Clothing', stock: 150 },
  { name: 'Travel bag waterproof', price: 34.00, image: '/images/rec-item5.png', description: 'Durable travel gear', category: 'Clothing', stock: 75 }
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const users = await seedUsers();
    await User.insertMany(users);
    await Product.insertMany(products);

    console.log('Data (Users & Products) Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
