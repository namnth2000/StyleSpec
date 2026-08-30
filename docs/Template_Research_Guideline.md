# Template Research Guideline

## 1. Mục tiêu

Research không nhằm copy website đẹp.

Mục tiêu là tìm ra **archetype có structural divergence** đủ rõ để bổ sung vào StyleSpec mà không tạo thêm một bộ template giống nhau chỉ đổi skin.

## 2. Nguồn research ưu tiên

### Creative direction

- Godly
- SiteInspire
- Landbook
- Lapa Ninja
- One Page Love

Dùng để tìm:

- composition lạ nhưng usable
- typography role
- media treatment
- editorial structure
- interaction motif

### Product / SaaS pattern

- SaaSFrame
- Mobbin
- Relume

Dùng để nghiên cứu:

- page pattern
- product flow
- section structure
- component hierarchy

### Template marketplace

- Framer Marketplace
- Webflow Templates
- ThemeForest

Dùng để nghiên cứu taxonomy, niche và market demand.

Không mặc định được phép reuse source hoặc design.

### Open-source implementation

- Astro Themes
- GitHub
- shadcn/ui
- Flowbite
- các repository template có license rõ ràng

Dùng để tìm implementation có thể tận dụng sau khi kiểm tra license.

## 3. Template acceptance criteria

Một candidate chỉ nên vào catalog nếu:

1. Có target domain rõ ràng.
2. Có structural difference so với template hiện tại.
3. Khác ít nhất hai dimension, trong đó ít nhất một dimension thuộc composition.
4. Không chỉ đổi color, font, radius hoặc shadow.
5. Có thể mô tả thành decision data thay vì phụ thuộc vào một screenshot duy nhất.
6. Có thể responsive mà vẫn giữ identity.
7. Không phụ thuộc vào copyrighted asset để template còn ý nghĩa.
8. Có provenance record.

Các dimension review:

- information hierarchy
- navigation
- hero model
- content density
- grid
- content rhythm
- typography role
- media treatment
- section transition
- interaction model
- brand motif

## 4. AI-default checklist

Khi review candidate, kiểm tra xem template có đang lặp lại quá nhiều pattern sau không:

- badge nhỏ phía trên hero
- giant sans heading
- muted description
- Primary + Secondary pill CTA
- centered hero
- bento grid mặc định
- rounded icon container
- gradient blob
- glass card
- green status dot
- generic three-card feature row

Các pattern này không bị cấm.

Nhưng nếu một candidate dùng nhiều pattern cùng lúc mà không có structural idea riêng, không nên thêm vào catalog.

## 5. Productive friction

StyleSpec nên buộc user thực hiện một số lựa chọn có ý nghĩa trước khi giao việc cho AI.

Template gallery phải khiến user nhìn thấy các direction khác nhau rõ ràng và chọn một trong số đó.

Mục tiêu không phải cung cấp một default "đẹp nhất".

Mục tiêu là làm user nhận ra:

> Tôi thích kiểu này hơn kiểu kia.

## 6. License policy

### Có thể cân nhắc reuse sau khi review

Ưu tiên:

- MIT
- BSD-2-Clause
- BSD-3-Clause
- Apache-2.0
- 0BSD
- CC0

Vẫn phải đọc file LICENSE thực tế của từng repository.

### Cần review kỹ

- CC BY: thường yêu cầu attribution
- GPL / AGPL: có nghĩa vụ copyleft, cần đánh giá trước khi đưa vào sản phẩm hoặc code export
- custom license: luôn đọc điều khoản cụ thể

### Inspiration only mặc định

- Commercial template marketplace
- Paid component libraries
- Template có license single-use
- Source không có license rõ ràng
- Theme/template cấm redistribution hoặc derivative template builder

Không copy hoặc redistribute asset/code từ nguồn commercial chỉ vì có thể xem source trên browser.

## 7. Provenance record

Mỗi template research candidate nên lưu:

- tên nguồn
- URL
- ngày review
- license
- phần được học
- phần được reuse nếu có
- decision nào được chuyển thành StyleSpec archetype

Nếu template cuối cùng là original synthesis từ nhiều nguồn, ghi rõ original synthesis thay vì gắn nó với một source duy nhất.

## 8. Review cadence

Mỗi batch template mới:

1. Thu thập reference.
2. Nhóm theo domain.
3. Loại candidate chỉ khác visual skin.
4. Chuyển candidate thành Composition DNA + Visual DNA.
5. So sánh thumbnail với catalog hiện tại.
6. Kiểm tra license.
7. Chỉ sau đó mới implement.
