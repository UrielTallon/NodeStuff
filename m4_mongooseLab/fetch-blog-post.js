const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/edx-course-db');

const Post = mongoose.model('Post',
    { 
        name: String,
        url: String,
        text: String,
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    });

const Comment = mongoose.model('Comment', 
    { text: String });
    
let ca = [{text: 'Cruel... var {house: mouse} = no type optimization at all'},
    {text: "I think you're undervaluing the benefits of 'let' and 'const'"},
    {text: '(p1, p2)=>{ ... }, I understand this, thank you!'}
    ].map((comment) => {
        const c = new Comment(comment);
        c.save();
        return c._id;
    });

console.log(ca);

var post = new Post({
    name: 'Top 10 ES6 features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: "This essay will give you a quick introduction to ES6. If you don't know what is ES6, it's a new JavaScript implementation.",
    comments: ca
});

post.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('The post is saved: ', post.toJSON());
    }
    Post.findOne({ name: /Top 10 ES6/i })
    .populate('comments').exec(function(err, post) { //returns a Promise object
        if (err) return console.error(err);
        console.log(`The post is ${post}`);
        mongoose.disconnect();
    });
});