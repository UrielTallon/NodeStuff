echo "post data"
curl -H "Content-Type: application/json" -X POST -d '{"balance": 100, "name": "checking"}' "http://localhost:3000/accounts"