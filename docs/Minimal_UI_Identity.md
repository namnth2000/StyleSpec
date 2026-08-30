# Minimal UI Identity

Một bộ nhận diện UI tối thiểu không cần là một Design System đầy đủ.

Với StyleSpec V2, "UI identity" không chỉ là màu, font và component skin.

Mục tiêu là:

> **Đủ rõ để con người và AI tạo ra các màn hình có cùng một design direction, nhưng không phải mô tả mọi pixel.**

## 1. Hai lớp quan trọng nhất

~~~text
Composition Identity
+
Visual Identity
~~~

Một sản phẩm có thể thêm:

~~~text
+ Product Signature
~~~

## 2. Composition Identity

Composition quyết định trang được tổ chức như thế nào. Đây là lớp dễ bị AI tự đoán và dẫn tới các website giống nhau.

| Thành phần | Các option phổ biến |
| --- | --- |
| **Navigation** | Top / Sidebar / Floating / Index / Hidden |
| **Hero structure** | Centered / Split / Asymmetric / Full-screen / None |
| **Hero priority** | Copy-first / Product-first / Image-first / Tool-first |
| **CTA model** | Primary + Secondary / Single / Inline links / None |
| **Content rhythm** | Stacked / Alternating / Dense / Magazine / Masonry |
| **Grid** | Traditional / Asymmetric / Editorial / Freeform |
| **Information density** | Compact / Balanced / Spacious |
| **Section transition** | Whitespace / Border / Background shift / Overlap |
| **Page structure** | Marketing scroll / Workspace / Poster / Document / Dashboard / Journal |

Không phải sản phẩm nào cũng cần define mọi field. Chỉ define những decision thật sự tạo ra direction.

## 3. Visual Identity

| Thành phần | Các option phổ biến |
| --- | --- |
| **Colors** | Light / Dark / Both; Neutral warm / cool; Accent color |
| **Typography** | Sans / Serif-led / Mono-led / Display accent |
| **Shape & Surface** | Square / Slight / Rounded / Pill; Flat / Border / Shadow / Elevated |
| **Density & Spacing** | Compact / Normal / Spacious |
| **Interaction** | Tint / Darken / Border / Lift / None; Minimal / Gentle / Expressive |
| **Text Behavior** | Wrap / Pretty / Balance |
| **Icon Style** | Outline / Filled / Duotone |

User nên chọn intent hoặc option trực quan. StyleSpec có thể derive giá trị preview cần thiết, nhưng không được biến derived value thành user preference trong DESIGN.md.

## 4. Product Signature

Chỉ định nghĩa khi chúng thực sự tạo cá tính riêng:

- Gradient style
- Illustration direction
- Background texture hoặc pattern
- Logo treatment
- Wordmark / Lettermark / Monogram / Badge
- Custom icon
- Special animation
- Decorative motif
- Product-specific signature component

Product Signature không nên trở thành rule bắt buộc cho mọi template.

## 5. Công thức V2

~~~text
Template Structure
+ Preview Defaults
+ Explicit User Selections
= Preview Style

Template Structure
+ 5 Essential Selections
+ Explicit Optional Selections
= DESIGN.md
~~~

Điểm quan trọng nhất:

> **Nếu composition chưa được chọn, AI vẫn còn phải đoán một phần rất lớn của gu.**
