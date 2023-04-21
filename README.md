# Built.JS Plugin: Blog

## NOTE: Unstable! Still in active development!

A [Built.JS](https://builtjs.com) plugin for a blog, with basic Tailwind styling.

## Installation
```
npm install
```
Then you can run the app using:
```
npm run dev
```

### Pages
- Blog
- Blog Article

### Sections
- blog-seo
- blog-landing
- blog-item-list
- blog-list
- blog-article
- blog-related-articles

---

### Content Types
#### Blog Item
Attributes:
- title: Text
- content: RichText
- image: File
- tags: Array<Tag>
- createdAt: Date
- author: Author

#### Author
Attributes:
- fullName
- bio
- position
- profileImage
- blogItems