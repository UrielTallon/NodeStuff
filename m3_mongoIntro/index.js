const MongoClient = require('mongodb');

// Connection URI
const url = 'mongodb://localhost:27017/edx-course-db';

const insertDocuments = (db, callback) => {
    // Get reference to edx-course-docs collection
    const collection = db.collection('edx-course-students');
    // Insert 3 documents
    collection.insert([
        {name: 'Bob'}, {name: 'John'}, {name: 'Peter'}
    ], (error, result) => {
        if (error) return process.exit(1);
        console.log(result.result.n); // Will be 3
        console.log(result.ops.length); // Will be 3
        console.log('Inserted 3 documents into the edx-course-students collection');
        callback(result);
    });
}

const updateDocument = (db, callback) => {
    // Get the edx-course-students collection
    var collection = db.collection('edx-course-students');
    // Update document where a is 2, set b equal to 1
    const name = 'Peter';
    collection.update({ name : name }, { $set: { grade : 'A' } }, (error, result) => {
        if (error) return process.exit(1);
        console.log(result.result.n); // Will be 1
        console.log(`Updated the student document where name = ${name}`);
        callback(result);
    });
}

const removeDocument = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('edx-course-students');
    // Insert some documents
    const name = 'Bob';
    collection.remove({ name : name }, (error, result) => {
        if (error) return process.exit(1);
        console.log(result.result.n); // Will be 1
        console.log(`Removed the document where name = ${name}`);
        callback(result);
    });
}

var findDocument = (db, callback) => {
    // Get the documents collection
    var collection = db.collection('edx-course-students');
    // Find some document
    collection.find({}).toArray((error, docs) => {
        if (error) return process.exit(1);
        console.log(2, docs.length) // Will be 2 because we removed one document
        console.log(`Found the following documents:`);
        console.dir(docs);
        callback(docs);
    });
}

// Use connect method to connect to the Server
MongoClient.connect(url, (err, client) => {
    if (err) return process.exit(1);
    console.log('Connected to MongoDB server');
    
    const db =  client.db('edx-course-db');
    insertDocuments(db, () => {
        console.log('Documents successfully inserted');
    });
    updateDocument(db, () => {
        console.log('Document updated');
    });
    removeDocument(db, () => {
        console.log('Document removed');
    });
    findDocument(db, () => {});
    client.close();
});

// "D:\MongoDB\Server\3.2\bin\mongod.exe" --config "C:\MongoDB\Server\3.2\mongod.conf" --install