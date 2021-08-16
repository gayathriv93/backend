
const mongoose = require('mongoose');

// Connecting to Mongoose
mongoose.connect('mongodb://localhost:27017/customer', { useNewUrlParser: true, useUnifiedTopology: true });

