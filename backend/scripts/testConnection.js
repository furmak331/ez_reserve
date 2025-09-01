import pool from '../config/db.js';

const testConnection = async () => {
  try {
    console.log('Testing PostgreSQL connection...');
    
    const result = await pool.query('SELECT NOW() as current_time, VERSION() as version');
    
    console.log('✅ Database connection successful!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('PostgreSQL version:', result.rows[0].version);
    
    // Test if database exists
    const dbResult = await pool.query('SELECT current_database()');
    console.log('Connected to database:', dbResult.rows[0].current_database);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('\n💡 Solutions:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Check your .env file for correct credentials');
    console.error('3. Verify the database exists');
    console.error('4. Use Docker: docker-compose up -d');
  } finally {
    await pool.end();
  }
};

testConnection();
