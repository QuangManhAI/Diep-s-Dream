#!/bin/bash
BASE_URL="http://localhost:3001/users"
EMAIL="nhuphamquangmanhlop9a1@gmail.com"
PASS="200406"

REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d @- <<JSON
{
  "email": "$EMAIL",
  "password": "$PASS",
  "fullName": "Nhu Pham Quang Manh",
  "phoneNumber": "0345552262",
  "address": "Diep's Dream Coffee"
}
JSON
)
USER_ID=$(echo "$REGISTER_RESPONSE" | grep -oE '"id":"[^"]+' | cut -d'"' -f4)

LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d @- <<JSON
{"email":"$EMAIL","password":"$PASS"}
JSON
)
ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -oE '"accessToken":"[^"]+' | cut -d'"' -f4)

UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/$USER_ID" \
  -H "Content-Type: application/json" \
  -d @- <<JSON
{"fullName":"User Updated","address":"456 Updated Street"}
JSON
)

GET_RESPONSE=$(curl -s -X GET "$BASE_URL/email/$EMAIL")

echo "REGISTER RESPONSE: $REGISTER_RESPONSE"
echo "LOGIN RESPONSE: $LOGIN_RESPONSE"
echo "UPDATE RESPONSE: $UPDATE_RESPONSE"
echo "GET RESPONSE: $GET_RESPONSE"
