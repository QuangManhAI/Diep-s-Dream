#!/usr/bin/env bash
API="http://localhost:3001/menu"

# === ☕ CÀ PHÊ MENU (9 món, có ảnh thật) ===
curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Cà phê đen đá",
  "price":12,
  "imagePath":"/Gemini_Generated_Image_kaiqzdkaiqzdkaiq.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Cà phê sữa",
  "price":15,
  "imagePath":"/Gemini_Generated_Image_hcsr82hcsr82hcsr.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Bạc xỉu",
  "price":15,
  "imagePath":"/Gemini_Generated_Image_zdxpw8zdxpw8zdxp.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Cà phê muối",
  "price":20,
  "imagePath":"/Gemini_Generated_Image_2xebow2xebow2xeb.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Cà phê mật ong",
  "price":22,
  "imagePath":"/Gemini_Generated_Image_wi8kq9wi8kq9wi8k.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Cà phê dừa",
  "price":25,
  "imagePath":"/Gemini_Generated_Image_narl24narl24narl.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Bạc xỉu muối",
  "price":20,
  "imagePath":"/Gemini_Generated_Image_58qdha58qdha58qd.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Cà phê trứng",
  "price":28,
  "imagePath":"/Gemini_Generated_Image_rylngdrylngdryln.png",
  "avaiable":true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category":"coffee",
  "name":"Kem muối (topping)",
  "price":10,
  "imagePath":"/Gemini_Generated_Image_ce9v9zce9v9zce9v.png",
  "avaiable":true
}'

echo "✅ Đã seed xong 9 món cà phê có ảnh!"


# === 🍹 DRINK MENU (9 món có ảnh thật) ===
curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Nước mắt tiên cá",
  "price": 20,
  "imagePath": "/Gemini_Generated_Image_6tsnq6tsnq6tsnq6.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Trân châu giòn",
  "price": 7,
  "imagePath": "/Gemini_Generated_Image_5ms42c5ms42c5ms4.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Soda việt quất",
  "price": 22,
  "imagePath": "/Gemini_Generated_Image_8rmho48rmho48rmh.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Sữa chua phúc bồn tử",
  "price": 25,
  "imagePath": "/Gemini_Generated_Image_wo8xyswo8xyswo8x.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Sữa chua chanh dây",
  "price": 25,
  "imagePath": "/Gemini_Generated_Image_mxe7w6mxe7w6mxe7.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Trà quýt hoa nhài",
  "price": 18,
  "imagePath": "/Gemini_Generated_Image_ru6l2tru6l2tru6l.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Trà đào cam sả",
  "price": 20,
  "imagePath": "/Gemini_Generated_Image_1dty1i1dty1i1dty.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Phúc bồn tử đá xay",
  "price": 28,
  "imagePath": "/Gemini_Generated_Image_sfkqnhsfkqnhsfkq.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "drink",
  "name": "Matcha đá xay",
  "price": 30,
  "imagePath": "/Gemini_Generated_Image_v5mnywv5mnywv5mn.png",
  "avaiable": true
}'

echo "✅ Đã seed xong 9 món thức uống có ảnh thật!"



# === 🍜 FOOD MENU (9 món có ảnh thật, tên file mới) ===

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Mì indomi (mì thêm +8)",
  "price": 24,
  "imagePath": "/bc.jpg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Mì Bếp nhà",
  "price": 22,
  "imagePath": "/ab.jpg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Mì cay phô mai",
  "price": 35,
  "imagePath": "/IMG_6635_cover.jpg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Mì ý",
  "price": 25,
  "imagePath": "/Italian-Sausage-Pasta-5-1.jpg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Khoai tây lắc phô mai",
  "price": 20,
  "imagePath": "/asd.jpg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Kimbap",
  "price": 22,
  "imagePath": "/lkj.jpg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Cơm trứng cuộn phô mai",
  "price": 35,
  "imagePath": "/rice-paper-omelette.jpeg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Tàu hũ phô mai (topping)",
  "price": 5,
  "imagePath": "/cd.jpg",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "food",
  "name": "Xúc xích (topping)",
  "price": 7,
  "imagePath": "/cd.jpg",
  "avaiable": true
}'

echo "✅ Đã seed xong 9 món 🍜 món ăn có ảnh thật (tên file chuẩn)!"


# === 🍵 MATCHA MENU (9 món có ảnh Gemini) ===

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Matcha latte",
  "price": 20,
  "imagePath": "/Gemini_Generated_Image_9walp69walp69wal.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Matcha sữa hạt",
  "price": 22,
  "imagePath": "/Gemini_Generated_Image_njeisunjeisunjei.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Matcha sữa gấu",
  "price": 25,
  "imagePath": "/Gemini_Generated_Image_mim3jemim3jemim3.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Matcha kem muối",
  "price": 28,
  "imagePath": "/Gemini_Generated_Image_cu7cz8cu7cz8cu7c.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Matcha anh đào",
  "price": 30,
  "imagePath": "/Gemini_Generated_Image_nnenainnenainnen.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Khoai môn latte",
  "price": 20,
  "imagePath": "/Gemini_Generated_Image_ange0pange0pange.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Cacao latte",
  "price": 20,
  "imagePath": "/Gemini_Generated_Image_s6lgoys6lgoys6lg.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Trân châu oolong (topping)",
  "price": 5,
  "imagePath": "/Gemini_Generated_Image_b3tc6lb3tc6lb3tc.png",
  "avaiable": true
}'

curl -X POST $API -H "Content-Type: application/json" -d '{
  "category": "matcha",
  "name": "Kem muối (topping)",
  "price": 10,
  "imagePath": "/Gemini_Generated_Image_9vz8l29vz8l29vz8.png",
  "avaiable": true
}'

echo "✅ Đã seed xong 9 món 🍵 Matcha với ảnh Gemini đẹp chuẩn sáng!"
