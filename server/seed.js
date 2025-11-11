const { sequelize, User, Contract, Resource, PurchaseOrder } = require('./models');

async function seedDatabase() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Create users
    const admin = await User.create({
      username: 'admin',
      email: 'admin@rrootshell.com',
      password: 'admin123',
      role: 'admin'
    });

    const director = await User.create({
      username: 'director',
      email: 'director@rrootshell.com',
      password: 'director123',
      role: 'director'
    });

    console.log('Users created');

    // Create contracts
    const today = new Date();
    const oneMonthFromNow = new Date(today);
    oneMonthFromNow.setMonth(today.getMonth() + 1);
    
    const sixMonthsFromNow = new Date(today);
    sixMonthsFromNow.setMonth(today.getMonth() + 6);
    
    const twentyDaysFromNow = new Date(today);
    twentyDaysFromNow.setDate(today.getDate() + 20);

    const contract1 = await Contract.create({
      clientName: 'Tech Corp Inc',
      contractNumber: 'CTR-2024-001',
      startDate: new Date('2024-01-01'),
      endDate: twentyDaysFromNow,
      value: 500000,
      status: 'active',
      description: 'Full stack development team'
    });

    const contract2 = await Contract.create({
      clientName: 'Digital Solutions LLC',
      contractNumber: 'CTR-2024-002',
      startDate: new Date('2024-03-15'),
      endDate: sixMonthsFromNow,
      value: 750000,
      status: 'active',
      description: 'Cloud infrastructure modernization'
    });

    const contract3 = await Contract.create({
      clientName: 'Global Finance Co',
      contractNumber: 'CTR-2024-003',
      startDate: new Date('2024-05-01'),
      endDate: oneMonthFromNow,
      value: 350000,
      status: 'active',
      description: 'Financial system integration'
    });

    console.log('Contracts created');

    // Create resources
    const resource1 = await Resource.create({
      name: 'John Doe',
      email: 'john.doe@rrootshell.com',
      role: 'Senior Full Stack Developer',
      contractId: contract1.id,
      startDate: new Date('2024-01-01'),
      skills: 'React, Node.js, MongoDB, AWS',
      status: 'active'
    });

    const resource2 = await Resource.create({
      name: 'Jane Smith',
      email: 'jane.smith@rrootshell.com',
      role: 'DevOps Engineer',
      contractId: contract2.id,
      startDate: new Date('2024-03-15'),
      skills: 'Docker, Kubernetes, AWS, CI/CD',
      status: 'active'
    });

    const resource3 = await Resource.create({
      name: 'Mike Johnson',
      email: 'mike.johnson@rrootshell.com',
      role: 'Backend Developer',
      contractId: contract3.id,
      startDate: new Date('2024-05-01'),
      skills: 'Java, Spring Boot, PostgreSQL',
      status: 'active'
    });

    const resource4 = await Resource.create({
      name: 'Sarah Williams',
      email: 'sarah.williams@rrootshell.com',
      role: 'Cloud Architect',
      contractId: contract2.id,
      startDate: new Date('2024-04-01'),
      skills: 'AWS, Azure, Terraform, Architecture',
      status: 'active'
    });

    console.log('Resources created');

    // Create purchase orders
    await PurchaseOrder.create({
      poNumber: 'PO-2024-001',
      resourceId: resource1.id,
      contractId: contract1.id,
      startDate: new Date('2024-01-01'),
      endDate: twentyDaysFromNow,
      value: 150000,
      status: 'active'
    });

    await PurchaseOrder.create({
      poNumber: 'PO-2024-002',
      resourceId: resource2.id,
      contractId: contract2.id,
      startDate: new Date('2024-03-15'),
      endDate: sixMonthsFromNow,
      value: 180000,
      status: 'active'
    });

    await PurchaseOrder.create({
      poNumber: 'PO-2024-003',
      resourceId: resource3.id,
      contractId: contract3.id,
      startDate: new Date('2024-05-01'),
      endDate: oneMonthFromNow,
      value: 120000,
      status: 'active'
    });

    await PurchaseOrder.create({
      poNumber: 'PO-2024-004',
      resourceId: resource4.id,
      contractId: contract2.id,
      startDate: new Date('2024-04-01'),
      endDate: sixMonthsFromNow,
      value: 200000,
      status: 'active'
    });

    console.log('Purchase orders created');
    console.log('\nSample data seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin - username: admin, password: admin123');
    console.log('Director - username: director, password: director123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
