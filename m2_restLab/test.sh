echo "posts post data"
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url": "http://webapplog.com/es6", "text": "", "comments": []}' "http://localhost:3000/posts"

echo ""
echo "gets post data"
curl "http://localhost:3000/posts"

echo ""
echo "gets post comments"
curl "http://localhost:3000/posts/0/comments"

echo ""
echo "updates post data at specific id"
curl -H "Content-Type: application/json" -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url": "http://webapplog.com/es6", "text": "This is an update"}' "http://localhost:3000/posts/0"

echo ""
echo "post a new comment"
curl -H "Content-Type: application/json" -X POST -d '{"text": "Awesome!"}' "http://localhost:3000/posts/1/comments"

echo ""
echo "deletes specific comment"
curl -X DELETE "http://localhost:3000/posts/0/comments/1"

echo ""
echo "gets post data"
curl "http://localhost:3000/posts"

echo ""
echo "deletes post data at specific id"
curl -X DELETE "http://localhost:3000/posts/0"