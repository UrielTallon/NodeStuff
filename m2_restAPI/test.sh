echo "post account data"
curl -H "Content-Type: application/json" -X POST -d '{"balance": 100, "name": "checking"}' "http://localhost:3000/accounts"

echo ""
echo "updates account data at specified id (0)"
curl -H "Content-Type: application/json" -X PUT -d '{"balance": 200, "name": "savings"}' "http://localhost:3000/accounts/0"

echo ""
echo "get account data"
curl "http://localhost:3000/accounts"

echo ""
echo "deletes account data at a specified id (0)"
curl -X DELETE "http://localhost:3000/accounts/0"