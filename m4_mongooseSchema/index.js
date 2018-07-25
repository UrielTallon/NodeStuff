const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/edx-course-db');

const bookSchema = mongoose.Schema({
    name: String,
    published: Boolean,
    createdAt: Date,
    updatedAt: {type: Date, default: Date.now()},
    email: String,
    reviews: [mongoose.Schema.Types.Mixed]
});

// add custom methods
bookSchema.method({
    buy : function(quantity, customer, callback) {
        var bookToPurchase = this;
        console.log('buy');
        return callback();
    },
    refund : function(customer, callback) {
        console.log('refund');
        return callback();
    }
})

// Not an actual field; computed on demand
bookSchema.virtual('authorPhotoUrl')
    .get(function() {
        if (!this.email) return null;
        var crypto = require('crypto'), email = this.email;
        email = email.trim();
        email = email.toLowerCase();
        var hash = crypto.createHash('md5').update(email).digest('hex');
        var gravatarBaseUrl = 'https://secure.gravatar.com/avatar/';
        return gravatarBaseUrl + hash;
    });

// Typically worked on entire collections or sets of multiple documents
// Instance not required
bookSchema.static({
    getZeroInventoryReport(callback) {
        console.log('getZeroInventoryReport');
        let books = [];
        return callback(books);
    },
    getCountOfBooksById(bookId, callback) {
        console.log('getCountOfBooksById');
        let count = 0;
        return callback(count);
    }
})

bookSchema.pre('save', function(next) {
    // prepare for saving
    return next();
})

bookSchema.pre('remove', function(next) {
    // prepare for removing
    return next(e);
})

// The methods must be defined BEFORE the model
let Book = mongoose.model('Book', bookSchema);
Book.getZeroInventoryReport(() => {});
Book.getCountOfBooksById(123, () => {});

let practicalNodeBook = new Book({
    name: 'Practical Node.js, 2nd Edition',
    author: 'Azat',
    email: 'hi@azat.co',
    link: 'https://github.com/azat-co/practicalnode',
    createdAt: Date.now()
});

practicalNodeBook.buy(1, 2, () => {});
practicalNodeBook.refund(1, () => {});

practicalNodeBook.save((err, results) => {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log('Saved: ', results);
        console.log('Book author photo: ', practicalNodeBook.authorPhotoUrl);
        practicalNodeBook.remove(process.exit);
    }
});