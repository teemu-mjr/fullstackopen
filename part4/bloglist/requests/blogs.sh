# get all
curl -v -X GET http://localhost:3001/api/blogs | jq

# add one
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZW11LW1qciIsImlkIjoiNjNiNmViOGY4Y2EyZWVjNWIxNTFlMmU5IiwiaWF0IjoxNjcyOTMyMjQyLCJleHAiOjE2NzI5MzU4NDJ9.h3WOgb9VCdzaerDx1fFPlCfw-OSYzOG1ojDoE60dEVg"
curl -v -X POST http://localhost:3001/api/blogs \
-H "Authorization: Bearer ${TOKEN}" \
-H "Content-Type: application/json" \
-d \
'{
  "title": "Title",
  "author": "Author",
  "url": "www.site.com",
  "likes": 10
}' | jq

# pach one
ID=pddd
curl -v -X PATCH http://localhost:3001/api/blogs/"$ID" \
-H "Content-Type: application/json" \
-d \
'{
  "title": "Cool",
  "author": "Pach",
  "url": "www.site.com",
  "likes": 100
}' | jq

# delete one
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZW11LW1qciIsImlkIjoiNjNiNmViOGY4Y2EyZWVjNWIxNTFlMmU5IiwiaWF0IjoxNjcyOTMyMjQyLCJleHAiOjE2NzI5MzU4NDJ9.h3WOgb9VCdzaerDx1fFPlCfw-OSYzOG1ojDoE60dEVg"
ID=63b6e60453b4fd1cbac6672d
curl -v -X DELETE http://localhost:3001/api/blogs/"$ID" \
-H "Authorization: Bearer ${TOKEN}"
