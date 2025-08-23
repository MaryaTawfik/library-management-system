const User = require('../models/users');

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'Admin' });
    if (existingAdmin) {
      console.log('✅ Admin already exists.');
      return;
    }

    const adminUser = new User({
      userID: 'A0001',
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      phoneNumber: 9112345678,
      role: 'Admin',
      is_member: true,
      status: 'active',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    await adminUser.save();
    console.log('✅ Admin user seeded successfully.');
  } catch (error) {
    console.error('❌ Failed to seed admin:', error.message);
  }
};

module.exports = seedAdmin;
