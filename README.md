# Bài cáo về nhiệm vụ: Hiểu Devops & Docker hóa dự án backend (UserCRUD)
## 1. Nỗi đau hiện tại khi phát triển và vận hành sản phẩm.
* Khi phát hành thủ công, khi phát triển một phiên bản mới nâng cấp, thường sẽ phải làm thủ công lại nhiều bước như đóng gói, kết nối, cài đặt. Từ đó tạo ra các sai sót, lỗi không mong muốn. Đồng thời khó có thể quay trở lại phiên bản cũ vốn đã ổn định. Đây là khó khăn lớn trong quá trình Operations.
* Sau khi việc Development được hòan thành, mã cần được kiểm thử, chờ đợi rồi mới được đẩy lên. Đôi khi gây trễ tiến độ, trế hẹn tính năng.
* Giám sát một cách quá đơn thuần: chỉ thông qua sự hoạt động của RAM hay CPU mà không biết chậm ở đâu, lỗi thế nào.

    ***-> Từ đó một cách thức tổ chức công việc mang tên là DevOps ra đời để giải quyết các vấn đề trên.***

## 2. Devops là gì?
* DevOps không phải một vai trò. Mà là cách tổ chức làm việc giữa Development và Operations. Nhằm mục đích mọi sự phát triển, thay đổi đi từ ý tưởng tới sản phẩm và tới người dùng mượt mà, trơn tru hơn.
* Tinh thần cốt lõi:
    * Tạo dòng chảy trơn tru: Việc có xu hướng lặp đi lặp lại thì tự động hóa để máy thực hiện, con người tập trung vào việc có giá trị như kiểm soát và đánh giá.
    * Phản hồi sớm: Kiểm tra sớm, phát hiện sớm, sửa các vấn đề sớm hơn.
    * Học và cải thiện liên tục: đo đạc bằng số liệu, sau mỗi sự cố đều phải rút kinh nghiệm để không mắc phải ở những lần thực hiện sau.

    ***-> Và DevOps mang trong mình giải pháp để chấm dứt nỗi đau hiện tại khi phát triển và vận hành sản phẩm gồm 3 trụ cột là CI/CD - Automation - Monitoring/Observability.***
## 3. Giải pháp DevOps 3 trụ cột.
### 3.1 CI/CD - Tự động kiểm tra và đưa phiên bản mới ra.
* CI (Continous intergrated): Mỗi lần đẩy code lên là máy tự build và chạy kiểm thử. Nếu ổn mới cho phép gộp code.
* CD (Contious Develop): khi đã được thông qua, phiên bản sẵn sàng đưa lên môi trường chạy. Có thể đưa dần một lượng nhỏ user thử nghiệm trước để an tòan.
### 3.2 Automation - Tự động hóa.
* Mọi công việc lặp lại như build - test - cài đặt ... đều được viết thành kịch bản - scripts. Như thế, dù là bất kì ai chạy đều cho ra một kết quả như nhau. Có sự kiểm soát theo kịch bản.
### 3.3 Giám sát - Monitoring/Observability.
* Không chỉ nhìn máy chủ xem CPU RAM mà còn đo đạc theo trải nghiệm. đỗ trễ trả lời, lượng truy cập, tỉ lệ lỗi. Đặt ngưỡng để cảnh báo (ví dụ: 95% yêu cầu trả lời dưới 300ms; tỉ lệ lỗi dưới 0.1%).
### 3.4 Lợi ích cụ thể của 3 trụ cột giải pháp mang lại.
* Lợi ích đầu tiên chính là ra phiên bản một cách thường xuyên bất kể khi nào muốn nhờ vào CI/CD.
* Giảm lỗi do thao tác bằng tay nhờ vào Automation.
* Nhờ monitoring phát hiện sớm sự cố, xử lý nhanh, đo đạc chính xác nơi cần thiết.
* Dễ quay lại phiên bản trước hơn nhờ việc đóng gói (build) thường xuyên.

***-> Chung quy lại, DevOps thực hiện mục tiêu xây dựng một đường ray tự động. Code cứ đi qua các trạm soát chính là các cổng kiểm tra. An tòan thì đưa lên để gộp và chạy. Nếu có vấn đề thì, quay về phiên bản cũ, không gộp hay chạy code. Đường ray dựa trên 3 trụ cột và cũng chính là giải pháp cho nỗi đau hiện tại khi phát triển và vận hành sản phẩm.***

* Đường ray được nhắc đến ở phần kết luận trên chính là **quy trình 5 bước: ```Code -> Build -> Test -> Deploy -> Monitor```.**

## 4. Quy trình 5 bước ```Code -> Build -> Test -> Deploy -> Monitor```.
### 4.1 Viết code.
* Thay vi viết code trong 1 tháng và cuối tháng mới gộp code, nên gộp code theo ngày hoặc nhiều lần trong ngày từng ít một theo đúng tinh thần Kiểm tra sớm, phát hiện sớm, sửa các vấn đề sớm hơn.
* Chỉ gộp code khi qua các bước kiểm tra. Tạo nhánh chính sạch tức gộp là hoạt động trơn tru mượt mà.
* Nên xây dựnd công tắc tính năng: code có thể lên sớm, nhưng bật/tắt tính năng theo ý muốn (để thử dần).

***-> Kết quả giúp đỡ kẹt hay ngộp code, giảm xung đột, đều tay.***
### 4.2 Build - Đóng gói.
* Đóng gói ứng dụng thường thành Container và chạy được.
* build một lần trong hệ thống tự động, rồi dùng cùng gói đó cho mọi môi trường. 
* Khóa phiên bản thư viện, framework để sau build lại ra đúng gói giống như cũ.

***-> Kết quả sản phẩm chạy trên nhiều môi trường, dễ tái lập lại khi gặp sự cố.***
### 4.3 Test - kiểm thử.
* Kiểm thử cần nhanh và cũng cần đáng tin cậy, đầy đủ. Gồm các nhóm sau:
    * Kiểm thử đơn vị: kiểm logic với tốc độ nhanh và số lượng lớn.
    * Kiểm thử tích hợp: Kiểm các phần câu nối DB, API.
    * Kiểm thử đầu cuối, Kiểm thử chất lượng mã nguồn, kiểm thử bảo mật thư viện.
* Nếu đạt yêu cầu kiểm thử cho phép các bước tiếp theo.

***->Kết quả là lỗi được bắt trước khi chạm bước deploy.***

### 4.4 Deploy - Triển khai.
* Tự động đưa lên các môi trường để xem chúng hoạt động không, API thế nào.
* Thử nghiệm với số lượng bé người dùng. Có hai hướng là khu song song và khu nhóm nhỏ. 
    * Hai khu chạy song song: chuẩn bị khu mới bên cạnh khu đang chạy. Khi ổn thì chuyển hướng người dùng sang khu mới. Nếu có vấn đề, đảo chiều để quay lại khu cũ.
    * Thử trên nhóm nhỏ: lúc đầu chỉ cho 1% người dùng dùng phiên bản mới, nếu ổn thì tăng lên 5%, 25%, rồi 100%. Nếu chỉ số xấu đi, ngưng lại và quay về phiên bản trước.
* Dùng nút bấm hoặc một lệch để deploy theo kịch bản. Không rời rạc thao tác.

***-> Kết quả là ra phiên bản an toàn, hạn chế rủi ro tốt, quay lại nhanh khi cần.***

### 4.5 Monitor - Giám sát
* Lập Dashboard theo dõi thứ cần thiết mà chính người dùng cảm nhận rõ như độ trễ, lượng truy cập ... 
* Đặt ngưỡng để cảnh báo.
* Sau mỗi lần có vấn đề, viết bản rút kinh nghiệm: nguyên nhân, bài học, sửa vào quy trình/pipeline để lần sau tránh lặp lại.

***-> Kết quả là biết sớm sửa sớm, số liệu nói chuyện, số liệu đánh giá, số liệu là bài học.***

## 5. Tổng kết.
* DevOps giúp nhóm vừa nhanh vừa chắc:
    * Tự động hoá toàn bộ đường đi của code.
    * Phát hành nhỏ, đều, dễ kiểm soát.
    * Biết rõ tình trạng hệ thống.
    * Khi có lỗi, quay lại trạng thái ổn định chỉ trong vài phút.

**Áp dụng DevOps là bước tiến tất yếu để mọi nhóm phát triển hiện đại rút ngắn khoảng cách giữa code xong và triển khai sản phẩm tới người dùng, nhanh mà ổn định và an tòan.**