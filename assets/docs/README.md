# Biên dịch CV

`CV.tex` là nguồn chính của CV. Mọi thay đổi về nội dung, bố cục, phông chữ hoặc liên kết phải thực hiện trong tệp này. `CV.pdf` là kết quả biên dịch; không chỉnh sửa trực tiếp PDF.

Với [Tectonic](https://tectonic-typesetting.github.io/book/latest/installation/) đã có trong PATH, chạy từ thư mục gốc Portfolio:

```powershell
tectonic --untrusted --outdir assets/docs assets/docs/CV.tex
```

Tectonic tự tải các gói và phông chữ cần thiết trong lần chạy đầu. Nếu dùng một bản portable, thay `tectonic` bằng đường dẫn tới chương trình.

Sau khi biên dịch, đọc log và kiểm tra trực quan tất cả các trang PDF trước khi sử dụng. Không dùng cách chồng chữ, sửa content stream hoặc di chuyển link annotation trong PDF; chỉnh mã LaTeX và biên dịch lại.
