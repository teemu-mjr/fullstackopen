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

# delete one
ID=63af548352c629342c9890a2
curl -X DELETE http://localhost:3001/api/blogs/"$ID"
