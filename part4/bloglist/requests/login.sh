# login
curl -v http://localhost:3001/api/login \
-H "Content-Type: application/json" \
-d \
'{
    "username": "teemu-mjr",
    "password": "secret"
}' | jq | tee login.log
