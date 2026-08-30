# Project Spec

# 1. Tổng quan

- **Tên sản phẩm:** StyleSpec
- **Target version:** V2.x - Expanded Template + Composition catalog
- **Mô tả ngắn:** Công cụ web giúp người dùng chọn một design direction có cấu trúc rõ ràng, tùy biến theo gu và export thành DESIGN.md để coding agent làm theo mà không phải tự đoán.
- **Vấn đề cốt lõi:** UI do AI tạo thường hội tụ về cùng một số pattern an toàn như hero có heading lớn, description nhỏ, hai CTA, cards, pill, bento grid, status dot và typography tương tự nhau. V1 đã giúp user chọn visual style nhưng vẫn để AI hoặc preview tự quyết định composition.
- **Người dùng mục tiêu:** Người dùng Codex, Claude Code, Cursor, Gemini hoặc coding agent khác muốn tạo UI có cá tính riêng nhưng không muốn tự xây Design System hoặc mô tả chi tiết CSS.
- **Giải pháp chính:** Cho user chọn loại sản phẩm, chọn một template có Composition DNA + Visual DNA rõ ràng, tùy biến các decision của template, xem live preview và export kết quả deterministic thành DESIGN.md.
- **Định vị:** StyleSpec là taste layer trước bước vibe coding, không phải website builder và không phải AI designer.
- **Slogan:** Don't ask AI to guess your taste.
- **Ngôn ngữ sản phẩm:** English only.

Công thức V2:

~~~text
Template Structure
+ Preview Defaults
+ Explicit User Selections
= Preview

Template Structure
+ 5 Essential Selections
+ Explicit Optional Selections
= DESIGN.md
~~~

# 2. Nguyên tắc sản phẩm

1. **Template selection là một lựa chọn cấu trúc thật của user.** Composition DNA, Brand Motifs và Section Intent của template được kế thừa vào export. Visual preview defaults không được coi là lựa chọn của user.
2. **Không để AI lấp khoảng trống trong main flow.** Preview và export phải deterministic.
3. **Template phải khác nhau về cấu trúc, không chỉ đổi skin.** Khác biệt cần thể hiện qua hierarchy, composition, navigation, content density, media treatment hoặc interaction.
4. **Chỉ export structure được kế thừa từ template và visual decision user đã chọn trực tiếp.**
5. **Không tự thêm implementation advice.** DESIGN.md mô tả intent và decision, không tự thêm token, library, spacing scale, animation duration hoặc rule ngoài lựa chọn.
6. **Preview và export phải dùng resolver deterministic nhưng có output khác nhau.** Preview được phép dùng preview defaults; export không được phép dùng chúng.
7. **Giữ V2 client-side.** Không cần account, backend hoặc external AI API.

# 3. Luồng chính

1. User mở StyleSpec và đi thẳng vào tool.
2. User chọn **What are you designing?**
3. User chọn một **Design Direction / Template** bằng thumbnail preview.
4. Template lập tức tạo preview hoàn chỉnh bằng structure + preview defaults, nhưng export vẫn bị khóa.
5. User chọn đủ 5 Essentials trong Customize, sau đó có thể thêm Optional Details. Nhóm Optional này gồm cả common refinements và các template-specific refinements khi direction hiện tại cần.
6. Preview cập nhật cả composition lẫn visual style.
7. User có thể clear bất kỳ Optional detail nào để preview trở về fallback và export omit decision.
8. User export DESIGN.md.

Flow:

~~~text
Choose domain
  ↓
Choose template
  ↓
Customize
  ↓
Preview
  ↓
Export DESIGN.md
~~~

User phải chọn đủ 5 Essentials trước khi export: Color mode, Accent color, Typography, Radius và Density. Chọn template chỉ hoàn tất structural direction, không hoàn tất visual preferences.

# 4. Domain và template V2

## Core domains

V2 cần hỗ trợ tối thiểu:

- Tool / Utility
- Software / SaaS
- Portfolio
- Wedding

Mỗi domain cần tối thiểu 3 design direction có composition khác nhau rõ ràng.

Northstar không còn là universal preview. Northstar được giữ như **một template cụ thể** trong catalog để bảo toàn hướng hiện tại, nhưng không đại diện cho mọi style.

Danh sách cụ thể nằm trong Template_Catalog.md.

## Mở rộng V2.x đã implement

V2.x mở rộng catalog lên 6 domain và 18 template với hai domain:

- Game
- Blog / Editorial

Mỗi domain mới có đúng 3 design direction có Page preview riêng và dùng nguyên flow, Customize semantics và deterministic export contract của V2 core.

## Mở rộng sau V2.x

Kiến trúc phải sẵn sàng cho:

- Agency
- Event
- Restaurant
- Ecommerce
- Docs / Developer product

# 5. Template model

Mỗi template phải định nghĩa các layer sau.

## 5.1 Composition DNA

Các decision có thể gồm:

- Navigation: top / sidebar / floating / index / hidden
- Hero structure: centered / split / asymmetric / full-screen / none
- Hero priority: copy-first / product-first / image-first / tool-first
- CTA model: primary + secondary / single CTA / inline links / none
- Content rhythm: stacked / alternating / dense / magazine / masonry
- Grid: traditional / asymmetric / editorial / freeform
- Information density: compact / balanced / spacious
- Section transition: whitespace / border / background shift / overlap
- Page structure: marketing scroll / workspace / poster / document / dashboard / journal

Không phải template nào cũng phải dùng mọi field. Chỉ field thật sự thuộc design direction đó mới được define.

## 5.2 Preview Defaults và Visual Identity

Mỗi template cung cấp preview defaults để render coherent ngay khi được chọn. V2 tái sử dụng các visual decision từ V1:

- Color mode
- Accent color
- Typography
- Radius
- Density
- Neutral tone
- Surface treatment
- Hover style
- Focus and motion
- Text behavior
- Icon style

Template phải có preview defaults cho 5 Essentials và có thể có fallback cho Optional Details. Các giá trị này không được đánh dấu selected và không được export cho đến khi user click chọn. Explicit selection vẫn phải được lưu ngay cả khi bằng đúng preview default.

## 5.3 Brand Motifs

Template có thể định nghĩa hoặc cho user tùy biến các motif có ảnh hưởng rõ đến nhận diện:

- Logo treatment: Wordmark / Lettermark / Symbol + Wordmark / Monogram / Badge
- Decorative motif
- Illustration direction
- Background texture hoặc pattern
- Product-specific signature component

Logo generator đầy đủ không nằm trong V2 core. V2 chỉ cần data model đủ để mở rộng.

## 5.4 Section model

Template có thể mô tả loại section và thứ tự section ở mức intent:

- Hero
- Product showcase
- Feature presentation
- Gallery
- Social proof
- Pricing
- CTA
- Footer

Section template editor đầy đủ không nằm trong V2 core, nhưng data model không được khóa cứng vào một page structure duy nhất.

# 6. Preview và export resolver

Hai resolver phải giữ distinction giữa fallback và explicit selection:

~~~text
previewStyle = template.structure + template.previewDefaults + explicit selections
exportStyle = template.structure + 5 Essentials + explicit Optional Details
~~~

Quy tắc:

- Template Structure là baseline cấu trúc sau khi user chọn template.
- Preview Defaults chỉ phục vụ rendering và luôn bị explicit selection ghi đè.
- 5 Essentials khởi tạo ở trạng thái unselected và đều bắt buộc trước export.
- Optional Details khởi tạo unselected. Nhóm này gồm 6 common refinements và các template-specific refinements nếu template expose thêm control.
- Clear Optional detail xóa explicit selection, đưa preview về template fallback và loại field khỏi export.
- Explicit selection bằng đúng preview default vẫn tồn tại trong state và vẫn được export.
- Invalid hoặc unavailable template-specific option bị bỏ qua.
- Không có hidden preference hoặc AI-generated decision.

# 7. Customize UI

Customize có hai group:

1. **Essentials**, luôn mở: Color mode, Accent color, Typography, Radius, Density. UI hiển thị progress `n / 5 Essentials selected`.
2. **Optional Details**, collapsed mặc định. Nhóm này luôn có Neutral tone, Surface treatment, Hover, Focus & motion, Text behavior, Icon style, và có thể thêm template-specific refinements nếu direction hiện tại cần.

Option card chỉ có selected border và checkmark sau click trực tiếp. Không hiển thị `From template` trên từng decision. Context chung có thể ghi `Preview uses template defaults until you choose`.

Template-specific refinements dùng label dễ hiểu theo domain, ví dụ Workspace có Navigation và Board layout, Editorial Tool có Tool placement và Grid, Paper Collage có Collage layout và Paper layering. Chúng nằm chung trong Optional Details, khởi tạo unselected và có thể clear như Optional của V1. Không ép mọi template có cùng control hoặc biến V2 thành page builder.

Khi user click một template để so sánh direction, StyleSpec chỉ cập nhật selection + preview. **Không auto-scroll tới Customize, Export hoặc vị trí khác.** Viewport hiện tại phải giữ nguyên để user có thể click qua lại các template và quan sát preview.

# 8. Live preview

Preview phải thay đổi theo template ở cấp layout, không chỉ CSS token.

## Quy tắc

- Template switch phải thay đổi composition đủ rõ để nhìn thumbnail cũng nhận ra direction khác.
- Northstar chỉ render khi template Northstar được chọn.
- Page view render layout của template hiện tại.
- Components và States vẫn có thể dùng sampler chung để user đánh giá visual decision, nhưng sampler phải lấy preview style hiện tại.
- Template preview không được ép mọi domain vào cùng hero + CTA + cards structure.
- Tool template có thể mở thẳng vào workspace/tool.
- Portfolio có thể không có hero hoặc CTA.
- Wedding có thể dùng invitation/editorial composition và không cần SaaS-style button hierarchy.
- Preview trên mobile phải giữ đặc trưng composition thay vì collapse mọi template về cùng một stack giống nhau.

# 9. Export DESIGN.md

- Tên file luôn là DESIGN.md.
- Generation deterministic, không dùng AI hoặc external API.
- Dòng mở đầu giữ: This is the UI profile of current application.
- Output phải đủ chi tiết để coding agent không cần biết nội bộ StyleSpec.
- Output chỉ chứa Template Structure, 5 Essentials đã chọn và Optional/Template Details đã chọn rõ ràng.
- Không export preview fallback, source URL, research metadata hoặc license metadata.
- Không thêm implementation suggestion mà user hoặc template không chọn.

## Cấu trúc đề xuất

- Template / Structure
- Visual Identity
- Optional Details, chỉ khi user đã chọn ít nhất một optional decision

Template section nên ghi tên direction để con người biết nguồn lựa chọn, nhưng agent phải dựa vào các decision đã resolve chứ không cần tra catalog.

## Mức độ chi tiết

### Composition

Ghi các intent đã được template hoặc user chọn, ví dụ:

- Navigation: Sidebar
- Hero: None
- Content rhythm: Dense workspace
- CTA model: Inline actions

Không tự thêm breakpoint, grid columns hoặc pixel size nếu các giá trị đó không phải decision.

### Visual Identity

- Luôn có đủ 5 Essentials do đây là export gate.
- Accent ghi tên + HEX chính; Custom ghi Custom + HEX.
- Không tự thêm neutral, surface, hover, focus/motion, text hoặc icon nếu user chưa chọn.

### Typography

- Ghi profile hoặc font direction được chọn.
- Có thể giữ ví dụ font nếu chính template định nghĩa hoặc user chọn.
- Không tự sinh hierarchy, weight hoặc type scale.

### Shape, density, interaction, text, icon

- Ghi intent đã resolve.
- Không tự thêm implementation rules.

### Brand Motifs và Sections

- Chỉ xuất nếu template hoặc user đã chọn chúng.
- Không sinh thêm decorative rule hoặc section không tồn tại trong Template Structure hoặc explicit selections.

# 10. Architecture và data model

V2 phải chuyển từ một preview hard-coded sang template-driven rendering.

Tối thiểu cần có các khái niệm dữ liệu:

- Domain
- Template
- Template Structure
- Preview Defaults
- Essential selections
- Optional selections
- Template Detail selections
- Preview style
- Export style
- Preview renderer
- DESIGN.md exporter

Yêu cầu kiến trúc:

- Template là data, không phải một loạt conditional rải rác trong DOM/CSS.
- Resolver tạo preview style và export style từ cùng một state có group rõ ràng.
- Preview style merge preview defaults; export style tuyệt đối không merge preview defaults.
- Template metadata có thể chứa thumbnail, description, tags, provenance và license, nhưng metadata research không được xuất vào DESIGN.md.
- Schema phải hỗ trợ thêm domain, template, logo treatment và section archetype mà không cần viết lại export model.
- Không bắt buộc framework mới. V2 có thể tiếp tục static HTML/CSS/vanilla JavaScript nếu vẫn giữ code dễ bảo trì.

# 11. UI/UX

## Template selection

- Bước đầu tiên hỏi What are you designing?
- Domain cards ngắn gọn, không cần mô tả dài.
- Sau khi chọn domain, hiển thị template bằng thumbnail đủ lớn để thấy composition.
- Template card cần tên direction + mô tả rất ngắn về điểm khác biệt.
- Không dùng cùng một thumbnail structure rồi chỉ đổi màu.

## Customize

- Luôn hiện 5 Essentials và giữ chúng unselected cho đến click trực tiếp.
- Optional Details và Template Details collapsed mặc định.
- Chỉ hiện Template Detail có ý nghĩa và visible effect với template.
- User có thể clear Optional/Template Detail để preview về fallback và export omit decision.
- StyleSpec chrome giữ trung tính để không cạnh tranh với preview.

## Desktop

- Template chooser có thể dùng gallery/grid.
- Customize và sticky preview có thể xuất hiện cùng lúc.

## Mobile

- Flow theo chiều dọc.
- Preview có thể mở bằng floating control như V1.
- Thumbnail template phải đọc được ở khoảng 375 px.

# 12. Dữ liệu và quyền riêng tư

- Toàn bộ state nằm client-side trong V2.
- Không yêu cầu account.
- Không gửi profile hoặc template choice tới external API.
- Custom color và explicit selections chỉ tồn tại ở client hiện tại trừ khi sau này có tính năng Save Profile.

# 13. Ngoài phạm vi V2 core

- Account / login
- Cloud sync
- AI generation
- MCP
- Figma integration
- Collaboration
- Full design system management
- Deterministic HTML/CSS/JS code export
- Framework export
- Section marketplace/editor đầy đủ
- Logo generator đầy đủ
- AI-default risk scoring

Các mục trên có thể nằm trong roadmap sau khi Template + Composition engine ổn định.

# 14. Tiêu chí hoàn thành V2

- [ ] User chọn được domain trước khi chọn template.
- [ ] Có 6 domains và 18 template structurally distinct trong catalog V2.x.
- [ ] Northstar là một template cụ thể, không còn universal preview.
- [ ] Template thay đổi Page preview ở cấp composition.
- [ ] Chọn template render preview ngay nhưng chưa đủ để export DESIGN.md.
- [ ] 5 Essentials bắt đầu unselected và đều bắt buộc trước export.
- [ ] Explicit selection bằng preview default vẫn được tính và export.
- [ ] Optional Details và Template Details bắt đầu unselected và có thể clear.
- [ ] Clear đưa preview về template fallback và loại decision khỏi export.
- [ ] DESIGN.md chỉ chứa Template Structure + explicit selections, không thêm decision ngoài lựa chọn.
- [ ] Không export preview fallback hoặc research/license metadata.
- [ ] Template được định nghĩa bằng data model có thể mở rộng.
- [ ] Mobile preview vẫn giữ khác biệt giữa các template.
- [ ] V1 visual controls còn phù hợp được tái sử dụng thay vì tạo lại không cần thiết.
- [ ] npm run check pass sau khi implementation hoàn tất.
