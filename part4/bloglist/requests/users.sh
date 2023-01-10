# register
curl -X POST http://localhost:3001/api/users \
-H "Content-Type: application/json" \
-d \
'{
    "name": "Superuser",
    "username": "root",
    "password": "secret"
}' | jq
