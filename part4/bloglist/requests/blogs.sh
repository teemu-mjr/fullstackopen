# get all
curl -v -X GET http://localhost:3001/api/blogs | jq

# add one
curl -v http://localhost:3001/api/blogs \
    -H "Authorization: Bearer $(./login.sh)" \
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
    -H "Authorization: Bearer $(./login.sh)" \
    -H "Content-Type: application/json" \
    -d \
    '{
      "title": "Cool",
      "author": "Pach",
      "url": "www.site.com",
      "likes": 100
    }' | jq

# delete one
ID=63b6ef0d235c8ea6f312f5a5
curl -v -X DELETE http://localhost:3001/api/blogs/"$ID" \
    -H "Authorization: Bearer $(./login.sh)"
