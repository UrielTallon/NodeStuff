echo "post data"
curl -H "Content-Type: application/json" -X POST -d '{"balance": 100, "name": "checking"}' "http://localhost:3000/accounts"

echo ""
curl -H "Content-Type: application/json" -X POST -d '{"balance": 1000, "name": "savings"}' "http://localhost:3000/accounts"

echo ""
curl -H "Content-Type: application/json" -X POST -d '{"balance": 300, "name": "savings"}' "http://localhost:3000/accounts"