# Template System

## 1. Mục tiêu

Template System là lõi mới của StyleSpec V2.

Template không được hiểu là một bộ màu hoặc một trang HTML cố định. Template là một **design direction có decision rõ ràng**, đủ để StyleSpec render preview và export DESIGN.md mà không cần AI tự suy diễn.

## 2. Data model

Một template nên có các nhóm dữ liệu sau:

~~~text
Template
├── Metadata
├── Domain
├── Composition DNA
├── Preview Defaults
├── Brand Motifs
├── Section Intent
├── Template Details
└── Research Metadata
~~~

### Metadata

- id
- name
- short description
- thumbnail
- tags
- status: active / planned / experimental

### Domain

Ví dụ:

- tool
- software
- portfolio
- wedding
- game

### Composition DNA

Các field có thể dùng:

- navigation
- heroStructure
- heroPriority
- ctaModel
- contentRhythm
- grid
- informationDensity
- sectionTransition
- pageStructure

Template chỉ define field có ý nghĩa với direction đó.

### Preview Defaults

Các field có thể dùng:

- colorMode
- accentColor
- typography
- radius
- density
- neutralTone
- surface
- hover
- focusMotion
- textBehavior
- iconStyle

Preview Defaults giữ template coherent trước khi user hoàn thành Customize. Chúng không phải user selections và không được export tự động.

### Template Details

Template có thể expose một danh sách nhỏ composition decision có ý nghĩa riêng với direction đó. Mỗi detail khai báo decision id, title theo ngữ cảnh, allowed options và optional display labels. Chỉ option có visible preview effect mới được expose.

### Brand Motifs

Có thể gồm:

- logoTreatment
- decorativeMotif
- illustrationDirection
- backgroundTreatment
- signatureComponent

### Section Intent

Có thể lưu:

- section type
- order
- emphasis
- optional / required

Không cần chứa HTML cụ thể ở V2 core.

### Research Metadata

Dùng nội bộ để quản lý nguồn tham khảo:

- references
- provenance
- license
- licenseNotes
- reviewedAt

Research metadata không được đi vào DESIGN.md.

## 3. User state

State của user gồm:

~~~text
selectedDomain
selectedTemplateId
essentials
optional
templateDetails
~~~

Không copy toàn bộ template hoặc preview defaults vào state. Mỗi group chỉ lưu decision user đã click chọn, kể cả khi giá trị bằng preview default.

Ví dụ:

~~~text
selectedTemplateId: "workspace-01"

essentials:
  colorMode: "light"
  accent: "indigo"
  typography: "sans"
  radius: "slight"
  density: "compact"

optional:
  surface: "border"

templateDetails:
  navigation: "sidebar"
~~~

## 4. Resolver

Resolver tạo hai deterministic views từ cùng một state:

~~~text
previewStyle = template.structure + template.previewDefaults + explicit selections
exportStyle = template.structure + essentials + optional + templateDetails
~~~

Quy tắc:

1. Template Structure luôn là structural baseline.
2. Preview Defaults chỉ tồn tại trong preview style.
3. Essentials và mọi explicit Optional selection thắng preview fallback. Template-specific refinements có thể vẫn lưu riêng trong state nội bộ nhưng được trình bày cho user trong cùng Optional Details.
4. Clear bất kỳ Optional detail nào xóa selection; preview quay về fallback và export omit decision.
5. Explicit selection bằng preview default không bị nén thành absence.
6. Invalid hoặc unavailable Template Detail option bị bỏ qua.
7. Export chỉ được generate khi đủ 5 Essentials.

## 5. Structural divergence

Template mới chỉ đáng thêm nếu khác template hiện có ở cấp cấu trúc.

Một template không được xem là mới nếu chỉ thay:

- accent color
- font family
- radius
- shadow
- icon style

Nên khác ít nhất hai dimension, trong đó có ít nhất một dimension composition:

- hierarchy
- navigation
- hero model
- page structure
- grid
- content rhythm
- information density
- media treatment
- interaction model

## 6. Preview renderer

Preview renderer phải nhận:

- selected template
- preview style
- preview context

Các context có thể giữ:

- Page
- Components
- States

Page context là template-specific.

Components và States có thể dùng sampler chung nhưng phải lấy visual decision từ preview style.

Không hard-code Northstar thành root layout của toàn bộ preview.

## 7. Template customization

5 Essentials luôn được expose cho mọi template:

- Color mode
- Accent color
- Typography
- Radius
- Density

Optional Details luôn collapsed mặc định và giữ semantic giống V1: không có option nào selected cho đến khi user click. Mỗi template có thể khai báo thêm template-specific refinements theo ngữ cảnh, nhưng các refinement này hiển thị trong cùng một Optional Details group thay vì tạo thêm group thứ ba.

Ví dụ Workspace:

- Navigation
- Board layout

Ví dụ Wedding Editorial:

- Invitation layout
- Response style

Không cần ép mọi domain dùng cùng template-specific list. Tên control phải dễ hiểu với domain và option phải thay đổi preview rõ ràng.

Khi user chuyển template để so sánh direction, renderer chỉ cập nhật selection và preview. UI không được auto-scroll; vị trí viewport hiện tại phải được giữ nguyên.

## 8. DESIGN.md export

Exporter resolve theo thứ tự:

~~~text
Template Structure
+ 5 Essential Selections
+ Explicit Optional Selections
→ DESIGN.md
~~~

DESIGN.md bị khóa cho đến khi đủ 5 Essentials. Visual preview defaults không bao giờ tự đi vào export. Optional section chỉ chứa decision user đã chọn rõ ràng.

Không xuất:

- research source
- license
- preview fallback
- internal template ID nếu không cần
- hidden derived token
- implementation advice

Có thể xuất display name của template vì đây là lựa chọn trực tiếp của user.

## 9. Logo treatment extension

V2 core chỉ cần hỗ trợ schema.

Các option dự kiến:

- Wordmark
- Lettermark
- Symbol + Wordmark
- Monogram
- Badge

Sau này mỗi loại có thể có archetype riêng, ví dụ Wordmark:

- Grotesk
- Geometric
- Humanist
- High-contrast Serif
- Monospace
- Display

Không cần logo editor đầy đủ trong V2 core.

## 10. Section template extension

Section archetype nên được xây trên cùng triết lý structural divergence.

Ví dụ Hero:

- Statement
- Product
- Editorial
- Poster
- Tool
- Split
- Full bleed
- Minimal

Tương tự có thể mở rộng cho Navigation, Feature, Gallery, Pricing, Social proof và Footer.

Section editor đầy đủ nằm sau V2 core.

## 11. Future code export

Code export phải deterministic và dùng cùng template data.

Mô hình dự kiến:

~~~text
Export Style
+ Template implementation
→ index.html
→ styles.css
→ interactions.js
→ DESIGN.md
~~~

Không dùng AI để regenerate một phiên bản khác với preview.

Đây là hướng Pro sau khi V2 ổn định.
