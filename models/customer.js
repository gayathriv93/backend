const mongoose = require('mongoose');

// Schema Creation
const CustSchema = new mongoose.Schema({
    firstName: String,
    secondName: String,
    mobile: String,
    email: String,
    purchaseDate: Date,
});

// Model creation using schema
const Custmodel = mongoose.model('Custmodel', CustSchema);
module.exports = Custmodel;