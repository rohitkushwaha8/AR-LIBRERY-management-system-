// ══════════════════════════════════════════════════
//   A.R. Library — MongoDB Atlas Connection
// ══════════════════════════════════════════════════
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable set nahi hai!');
  // process.exit nahi karenge — server chalta rahega
}

mongoose.set('bufferCommands', false); // buffer mat karo, seedha error do agar disconnected

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  family: 4,          // IPv6 skip karo, seedha IPv4 use karo
  maxPoolSize: 10,
  retryWrites: true,
}).catch(err => {
  console.error('❌ MongoDB connect error:', err.message);
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB Atlas connected — ar_library database');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected — reconnecting...');
});

module.exports = mongoose;
