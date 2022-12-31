# get all
curl -s -X GET http://localhost:3001/api/blogs | jq

# add one
curl -X POST http://localhost:3001/api/blogs \
-H "Content-Type: application/json" \
-d \
'{
  "title": "Title",
  "author": "Author",
  "url": "www.site.com",
  "likes": 10
}' | jq

# pach one
ID=63af71d4a60976e47f0eb056
curl -X PATCH http://localhost:3001/api/blogs/"$ID" \
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
curl -X DELETE http://localhost:3001/api/blogs/"$ID"
