import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabaseConnection() {
  try {
    // Perform a simple query to the database
    const result = await prisma.user.findFirst();

    // If successful, log the result
    console.log('Database connection successful:', result);
  } catch (error) {
    // If an error occurs, log the error
    console.error('Error connecting to database:', error);
  } finally {
    // Close the database connection
    await prisma.$disconnect();
  }
}

// Call the function to test the database connection
testDatabaseConnection();
