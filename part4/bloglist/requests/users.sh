# register
curl -X POST http://localhost:3001/api/users \
-H "Content-Type: application/json" \
-d \
'{
    "name": "teemu",
    "username": "teemu-mjr",
    "password": "secret"
}' | jq
