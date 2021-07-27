// Connecting express server
const express = require('express');
const app = express();
const port = 3002;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(` app listening on port ${port}!`)
});

// Connecting to Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/customer', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

// Schema Creation
const CustSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    ContactNo: Number,
    EmailID: String,
    PurchaseDate: { type: Date, default: Date.now }
});
// Model creation using schema
const Custmodel = mongoose.model('Custmodel', CustSchema);

app.post('/api/stuff', (req, res, next) => {
    const custdb = new Custmodel({
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        ContactNo: req.body.ContactNo,
        EmailID: req.body.EmailID,
        PurchaseDate: req.body.PurchaseDate
    });
    custdb.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
// GET call
app.get('/api/stuff', (req, res, next) => {
    Custmodel.find().then(
        (custdbs) => {
            res.status(200).json(custdbs);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});


//   email
app.get('/api/stuff/:email', (req, res, next) => {
    Custmodel.findOne({
        EmailID: req.params.email
    }).then(
        (custdb) => {
            res.status(200).json(custdb);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});
// Put call-Update
app.put('/api/stuff:ContactNo', async (req, res, next) => {
    // Custmodel.findOneAndUpdate({ ContactNo: ContactNo }).then(
try{
    const filter = { ContactNo: req.body.ContactNo };
    const update = {PurchaseDate : new Date(),
    bill: req.body.bill };
    
    // `doc` is the document _before_ `update` was applied
    let doc = await Custmodel.findOneAndUpdate(filter, update);

    res.status(200).json(doc);

} catch(er) {
    res.status(400).json({
                       error: er
                    });
}


        
        
        
//         (custdbs) => {
//             res.status(200).json(custdbs);
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
});

// delete
app.delete('/api/stuff/:email', (req, res, next) => {
    Custmodel.deleteOne({
        EmailID: req.params.email
    }).then(
        (custdb) => {
            res.status(200).json(custdb);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

