// deleteAll.js
require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); // adjust path if needed

const MONGO_URL = process.env.ATLAS_URL;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // milliseconds

async function connectWithRetry(retries = MAX_RETRIES) {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ Connected to MongoDB Atlas');
    return true;
  } catch (err) {
    console.error('❌ Connection failed:', err.message);

    if (retries > 0) {
      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds... (${retries} attempts left)`);
      await new Promise(res => setTimeout(res, RETRY_DELAY));
      return connectWithRetry(retries - 1);
    } else {
      console.error('🚫 Could not connect to MongoDB. Make sure your IP is whitelisted and credentials are correct.');
      return false;
    }
  }
}

async function deleteAllListings() {
  const connected = await connectWithRetry();
  if (!connected) return;

  try {
    const result = await Listing.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} listings`);
  } catch (err) {
    console.error('❌ Error deleting listings:', err);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
  }
}

deleteAllListings();
