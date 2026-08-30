# StyleSpec

## 1. Vấn đề

Khi dùng AI để xây UI, người dùng thường mô tả bằng những câu như:

> Làm đẹp hơn.

> Làm hiện đại hơn.

> Làm đúng gu của tôi hơn.

AI không biết chính xác "đẹp" hay "gu của tôi" nghĩa là gì.

Ở V1, StyleSpec đã giảm việc AI tự đoán các decision như màu, typography, radius, density, hover, text behavior và icon style.

Nhưng vẫn còn một vấn đề lớn hơn:

> **AI thường tự chọn cùng một composition an toàn.**

Khi composition không được chỉ định, nhiều sản phẩm dễ hội tụ về các pattern giống nhau:

- Heading hero rất lớn
- Description nhỏ phía dưới
- Primary CTA + Secondary CTA
- Badge hoặc status pill
- Cards hoặc bento grid
- Rounded icon container
- Typography sans-serif tương tự
- Một vài decorative motif lặp lại như gradient hoặc status dot

Vì vậy chỉ đổi color, font và radius chưa đủ để giải quyết vấn đề "AI làm giao diện nào cũng giống nhau".

## 2. Giải pháp V2

StyleSpec trở thành công cụ giúp user **chọn design direction trước khi customize visual style**.

Flow mới:

~~~text
Choose domain
  ↓
Choose template
  ↓
Customize
  ↓
Preview
  ↓
Export
~~~

Template không chỉ là một theme.

Mỗi template có:

- Composition DNA
- Visual DNA
- Brand Motifs khi cần
- Section intent khi cần

Sau đó user chọn 5 Essentials bắt buộc và có thể thêm các Optional hoặc Template Details cụ thể.

Preview formula:

~~~text
Template Structure
+ Preview Defaults
+ Explicit User Selections
= Preview Style
~~~

Export formula:

~~~text
Template Structure
+ 5 Essential Selections
+ Explicit Optional Selections
= DESIGN.md
~~~

## 3. Design direction trước, fine-tune sau

Ví dụ cùng là một software landing page nhưng user có thể chọn:

- Product-first
- Technical
- Editorial
- Narrative

Cùng là portfolio nhưng có thể chọn:

- Index
- Case-study grid
- Personal editorial
- Experimental

Cùng là tool nhưng có thể chọn:

- Utility-first
- Workspace
- Editorial tool

Các direction phải khác nhau ở hierarchy và composition, không chỉ khác palette.

## 4. Output

StyleSpec vẫn export:

~~~text
DESIGN.md
~~~

DESIGN.md phải mô tả template structure và explicit visual preferences đủ rõ để coding agent thực hiện mà không cần tự đoán composition.

Nguyên tắc quan trọng:

- Ghi structural decision, Brand Motif và Section Intent từ template user đã chọn.
- Ghi đủ 5 Essentials user đã click chọn.
- Chỉ ghi Optional Details và Template Details khi user đã click chọn.
- Không ghi preview default hoặc fallback chưa được user chọn.
- Không tự thêm implementation guidance.

Việc user chọn một template được coi là họ đã chọn structural direction, không phải visual preview defaults.

## 5. Product position

StyleSpec không phải:

- Design System Builder
- Theme Generator
- Website Builder
- AI Designer
- Template marketplace thuần túy

StyleSpec là:

> **Taste layer before vibe coding.**

Mục tiêu là:

> **Biến gu thẩm mỹ và design direction của user thành những decision rõ ràng mà AI có thể làm theo.**

## 6. Mở rộng

Sau khi Template + Composition engine ổn định, StyleSpec có thể mở rộng thêm:

- Nhiều domain hơn như Game, Blog, Agency, Event, Ecommerce
- Section archetype
- Logo treatment như Wordmark, Monogram, Lettermark
- Avoid patterns
- AI-default risk hints
- Save style profiles
- Deterministic HTML/CSS/JS export
- Framework export

## 7. Slogan

> **Don't ask AI to guess your taste.**

Câu bổ trợ:

> **Choose your taste once. Let AI follow it.**
