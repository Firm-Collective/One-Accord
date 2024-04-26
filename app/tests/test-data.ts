import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  alert('ran');
  try {
    const result = await prisma.user.findMany(); // Replace 'yourTableName' with the name of your table
    console.log('Data in the table:', result);
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
