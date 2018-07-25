const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./databases/quotes.db');

const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/quotes', (req, res) => {
    if (req.query.year) {
        db.all('SELECT * FROM Quotes WHERE year = ?', [parseInt(req.query.year)], function(err, rows) { // doesn't work if not converted to number
            if (err) res.send(err.message);
            else {
                console.log("Return a list of quotes from the year: ", req.query.year);
                res.send(rows);
            }
        });
    }
    else {
        db.all('SELECT * FROM Quotes', function(err, rows) {
            if (err) res.send(err.message);
            else {
                for (var i = 0; i < rows.length; i++) {
                    console.log(rows[i].quote, rows[i].year);
                }
                res.send(rows);
            }
        });
    }
});

app.get('/quotes/:id', (req, res) => {
    console.log('return quote with id: ', req.params.id);
    db.get('SELECT * FROM Quotes WHERE rowid = ?', [req.params.id], function(err, row) {
        if (err) console.log(err.message);
        else {
            res.send(row);
        }
    });
});

app.post('/quotes', (req, res) => {
    console.log('Insert new quote: ', req.body.quote);
    db.run('INSERT INTO Quotes VALUES (?, ?, ?)', [req.body.quote, req.body.author, req.body.year], function(err) {
        if (err) console.log(err.message);
        else {
            console.log('Inserted quote with id: ', this.lastID);
            res.status(201).send();
        }
    });
});

app.use(errorhandler());

app.listen(3000, () => {
    console.log('server ready on port 3000...');
});