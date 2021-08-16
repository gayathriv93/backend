// Connecting express server
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./db');
const stuff= require('./controllers/stuff');
const Custmodel = require('./models/customer');
const { deleteOne } = require('./models/customer');

const app = express();
const port = 3002;  

app.use(cors());
app.use(morgan('tiny'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

console.log('Hii');

app.post('/api/stuff', stuff.createStuff);
// GET call
app.get('/api/stuff',stuff.plainGetstuff);


//   email
app.get('/api/stuff/:id', stuff.getStuff) ;
// Put call-Update
app.put('/api/stuff/:mobile', stuff.putStuff) ;

// delete
app.delete('/api/stuff/:id',stuff.deleteStuff);


app.listen(port, () => {
    console.log(` app listening on port ${port}!`)
});

