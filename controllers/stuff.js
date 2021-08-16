

const Custmodel = require('../models/customer');

const createStuff = (req, res, next) => {

    console
        .log(req.body)

    const custdb = new Custmodel({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        mobile: req.body.mobile,
        email: req.body.email,
        purchaseDate: req.body.purchaseDate
    });

    custdb.save().then(
        () => {
            console.log('SSSS');
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            console.log('Error', error);

            res.status(400).json({
                error: error
            });
        }
    );
};

const deleteStuff = (req, res, next) => {
    Custmodel.deleteOne({
        _id: req.params.id
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
};

const plainGetstuff = (req, res, next) => {
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
};

const getStuff = (req, res, next) => {
    Custmodel.findById(req.params.id).then(
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
};

const putStuff = async (req, res, next) => {
    try {

        let doc = await Custmodel.findOneAndUpdate({id: req.params.id}, req.body, {new: true});

        res.status(200).json(doc);

    } catch (er) {
        res.status(400).json({
            error: er
        });
    }
};

module.exports = {
   createStuff,
   deleteStuff,
    getStuff,
    putStuff, 
    plainGetstuff
}