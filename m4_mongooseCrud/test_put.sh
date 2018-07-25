echo "put data"
curl -H "Content-Type: application/json" -X PUT -d '{"balance": 200, "name": "savings"}' "http://localhost:3000/accounts/5b0f7245931ffa0730580279"