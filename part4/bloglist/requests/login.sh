#!/bin/bash

# login
curl -s http://localhost:3001/api/login \
    -H "Content-Type: application/json" \
    -d \
    '{
        "username": "root",
        "password": "secret"
    }' | jq -r .token
