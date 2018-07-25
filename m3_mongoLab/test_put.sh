echo "put data"
curl -H "Content-Type: application/json" -X PUT -d '{"balance": 200, "name": "savings"}' "http://localhost:3000/accounts/5af553cde62e4a0e4cd7daae"