const MongoClient = require('mongodb');
const async = require('async');

const url = 'mongodb://localhost:27017/edx-course-db';
const customers = require('./m3-customer-data.json');
const customerAddress = require('./m3-customer-address-data.json');

let tasks = [];
const limit = parseInt(process.argv[2], 10) || 1000;

MongoClient.connect(url, (error, client) => {
    if (error) return process.exit(1);
    
    const db = client.db('edx-course-db');
    
    customers.forEach((customer, index, list) => {
        customers[index] = Object.assign(customer, customerAddress[index]);
        
        if (index % limit == 0) {
            const start = index;
            const end = (start + limit > customers.length) ? customers.length - 1 : start + limit;
            tasks.push((done) => {
                console.log(`Processing ${start} - ${end} out of ${customers.length}`);
                db.collection('customers').insert(customers.slice(start, end), (error, result) => {
                    done(error, result);
                });
            });
        }
        
    });
    
    console.log(`launching ${tasks.lenth} parallel task(s)`);
    const startTime = Date.now();
    async.parallel(tasks, (err, results) => {
        if (err) console.error(err);
        const endTime = Date.now();
        console.log(`Execution time: ${endTime - startTime}`);
        client.close();
    });
});