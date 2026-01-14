require('dotenv').config();

const { getModels, syncDatabase } = require('./db');
const { hashPassword } = require('./auth');

async function main() {
  await syncDatabase();
  const { User, Product } = getModels();

  // Admin
  const adminEmail = 'admin@example.com';
  const admin = await User.findOne({ where: { email: adminEmail } });
  if (!admin) {
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password_hash: await hashPassword('admin123'),
      role: 'admin'
    });
    console.log('Admin criado: admin@example.com / admin123');
  }

  // Produtos do template (exemplo)
  const sample = [
    { name: 'Product Design Handbook', sku: 'PDH88801', price: 30.00, purchases: 88, dateAdded: new Date('2023-12-19') },
    { name: 'Website UI Kit', sku: 'WUK68581', price: 8.00, purchases: 68, dateAdded: new Date('2023-11-08') },
    { name: 'Icon UI Kit', sku: 'IUK167281', price: 8.00, purchases: 53, dateAdded: new Date('2023-11-01') },
    { name: 'E-commerce Web Template', sku: 'EWT81201', price: 10.00, purchases: 48, dateAdded: new Date('2023-03-06') },
    { name: 'Wireframing Kit', sku: 'WKP98165', price: 8.00, purchases: 51, dateAdded: new Date('2023-02-18') }
  ];

  for (const p of sample) {
    const exists = await Product.findOne({ where: { sku: p.sku } });
    if (!exists) await Product.create(p);
  }

  console.log('Seed concluído.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
