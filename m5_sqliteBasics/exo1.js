const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

// ensure statements are run sequentially
db.serialize(() => {
    // create the table
    db.run('CREATE TABLE Contacts (first_name TEXT, last_name TEXT, age INTEGER)');
    
    // insert values
    db.run('INSERT INTO Contacts VALUES ("John", "Doe", 25)');
    db.run('INSERT INTO Contacts VALUES ("Jane", "Doe", 19)');
    db.run('INSERT INTO Contacts VALUES ("Sue", "Smith", 42)');
    
    // queries
    db.all('SELECT * FROM Contacts', processRows); // process the whole set of resulting rows
    db.each('SELECT * FROM Contacts', processRow); // process the resulting rows sequentially
    db.each('SELECT * FROM Contacts WHERE last_name = "Doe"', processRow);
    var firstName = 'John';
    db.get('SELECT * FROM Contacts WHERE first_name = ?', [firstName], (err, row) => {
        console.log("Get John's Age:");
        if (err) console.log("ERROR: ", err.message);
        else console.log(row.age);
    });
});

function processRows(err, rows) {
    console.log("PROCESS ROWS");
    if (err) console.log("ERROR: ", err.message);
    else {
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i].first_name);
        }
    }
}

function processRow(err, row) {
    console.log("PROCESS ROW");
    if (err) console.log("ERROR: ", err.message);
    else console.log(row.first_name);
}

db.close();