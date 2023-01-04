# get all
curl -v -X GET http://localhost:3001/api/blogs | jq

# add one
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlZW11LW1qciIsImlkIjoiNjNiNTg0MzUyMTc4YThlNDIwODQ2NThlIiwiaWF0IjoxNjcyODQwMzAxLCJleHAiOjE2NzI4NDM5MDF9.5tJOFMMcs2AIlcAkxepIOm3S4nOCyucqyPj5bOf08Vw"
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
ID=63af548352c629342c9890a2
curl -v -X DELETE http://localhost:3001/api/blogs/"$ID"
