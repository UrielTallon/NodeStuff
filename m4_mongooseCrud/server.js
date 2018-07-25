const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorhandler = require('errorhandler');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/edx-course-db');

const accountSchema = mongoose.Schema({
    name: String,
    balance: Number
});

let Account = mongoose.model('Account', accountSchema);

let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/accounts', (req, res) => {
    Account.find({}, null, {sort: {_id: -1}}).exec((error, accounts) => {
        if (error) return next(error);
        console.log(accounts);
        res.send(accounts);
    });
});

app.post('/accounts', (req, res) => {
    let acc = new Account(req.body);
    acc.save((error, product) => {
        if (error) return next(error);
        console.log('Account saved: ', acc.toJSON());
        res.send(product);
    });
});

app.put('/accounts/:id', (req, res) => {
    let accountId = req.params.id;
    Account.update({_id: accountId}, {$set: req.body}).exec((error, results) => {
        if (error) return next(error);
        console.log(`Account ${accountId} updated: `, req.body);
        res.send(results);
    });
});

// Optional can be used to saved some code lines;
// Each time the :id parameter is requied, the code
// below will be executed, thus storing the accounts
// details in the request body
/*
app.param('id', (req, res, next) => {
    Account.findById(req.params.id, (error, account) => {
        req.account = account;
        next();
    });
});
*/

app.delete('/accounts/:id', (req, res) => {
    let accountId = req.params.id;
    Account.remove({_id: accountId}, (error, results) => {
        if (error) return next(error);
        console.log(`Account ${accountId} deleted`);
        res.send(results);
    });
});

app.use(errorhandler());

app.listen(3000, () => {
    console.log('server ready on port 3000...');
});