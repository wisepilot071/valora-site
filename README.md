# VALORA — website

The VALORA storefront. It's a static-first Next.js site with a slide-out cart, WhatsApp checkout, a corporate enquiry form and full SEO.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 3 · react-hook-form + zod · self-hosted fonts (Cormorant Garamond + Hanken Grotesk). There are no third-party scripts, no payment gateway and no external ecommerce SDK.

---

## Contents

1. [Local setup](#1-local-setup)
2. [Environment setup](#2-environment-setup)
3. [Development](#3-development)
4. [Production build](#4-production-build)
5. [Deploying to Vercel](#5-deploying-to-vercel)
6. [Where everything lives](#6-where-everything-lives)
7. [How to add a product](#7-how-to-add-a-product)
8. [How to add or replace product images](#8-how-to-add-or-replace-product-images)
9. [How to change prices](#9-how-to-change-prices)
10. [How to change homepage copy](#10-how-to-change-homepage-copy)
11. [How to change brand information](#11-how-to-change-brand-information)
12. [How to change the WhatsApp number](#12-how-to-change-the-whatsapp-number)
13. [How to add Instagram](#13-how-to-add-instagram)
14. [How to add categories](#14-how-to-add-categories)
15. [How to update SEO](#15-how-to-update-seo)
16. [Other common edits](#16-other-common-edits)
17. [Before launch checklist](#17-before-launch-checklist)

---

## 1. Local setup

You need **Node.js 20.9 or newer** (22 LTS recommended) and npm.

```bash
git clone <your-repo-url> valora-site
cd valora-site
npm install
```

## 2. Environment setup

Copy the example file:

```bash
cp .env.example .env.local
```

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public address, e.g. `https://www.valora.in`. It's used for canonical URLs, Open Graph, the sitemap, robots.txt and JSON-LD. |

If this isn't set, the site uses your Vercel production domain on Vercel. Failing that, it uses `brand.siteUrl` (if filled in), and otherwise `http://localhost:3000`.

## 3. Development

```bash
npm run dev          # http://localhost:3000
```

In development, the terminal warns you about any product image path that doesn't exist.

## 4. Production build

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run build        # production build (every page is pre-rendered)
npm start            # serve the build on :3000

npm run check        # typecheck + lint + build in one go
```

## 5. Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository. It detects Next.js automatically, so leave the defaults.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your final domain (for example `https://www.valora.in`).
4. Deploy. Every push to `main` redeploys the site, and pull requests get preview URLs.
5. To use a custom domain, go to **Settings → Domains**, add it, then redeploy so canonicals pick it up.

Vercel's image optimiser serves AVIF first, then WebP, then the original JPG.

---

## 6. Where everything lives

Components never contain business copy, prices, phone numbers or image paths. Edit the files below instead.

```
src/config/
  brand.ts           Brand name, tagline, email, WhatsApp, Instagram, service area, site URL
  navigation.ts      Header / footer / mobile menu links
  whatsapp.ts        Wording of every WhatsApp message
  forms.ts           Form labels, placeholders, error and success messages
  design-tokens.ts   Colours, type scale, spacing, motion (Tailwind reads from here)

src/data/
  products.ts        THE product catalogue: names, prices, contents, images, SEO
  categories.ts      Shop categories (filters + /shop/<slug> pages)
  homepage.ts        Every string and image on the homepage
  moments.ts         "Meaningful Moments" cards
  whyValora.ts       The three principles
  about.ts           About page copy + founders
  contact.ts         Contact page copy
  seo.ts             Page titles & descriptions (home, shop, about, contact)
  site.ts            Shared UI text: buttons, cart, empty states, 404

public/images/
  products/<slug>/   Product photography, one folder per product
  home/              Homepage imagery
  brand/             Logo, founders, About imagery
  og/                Default social-share image
```

---

## 7. How to add a product

1. Open `src/data/products.ts`.
2. Copy an existing product block, from `{` to `},`, and paste it where you want it.
3. Change the fields:

| Field | Notes |
| --- | --- |
| `id` | Any unique text, e.g. `vl-012`. |
| `name` | Shown everywhere. |
| `slug` | The URL: `/product/<slug>`. Lowercase letters and hyphens only. It must be unique. |
| `category` | A list of category **slugs** from `categories.ts`, e.g. `['corporate-gifting', 'premium-gifts']`. |
| `price` | A whole number in rupees, e.g. `3450`. |
| `salePrice` | `null`, or a lower number to show a sale price with the original struck through. |
| `shortDescription` | One line, used on cards and in social previews. |
| `fullDescription` | A list of paragraphs for the product page. |
| `contents` | What's inside, one item per entry. **Only list what's really in the box.** If the list is empty, the section is hidden. |
| `perfectFor` | Occasion chips. |
| `weight`, `dimensions`, `delivery` | Optional. Delete the line or leave it out and it won't show. |
| `images` | See [section 8](#8-how-to-add-or-replace-product-images). |
| `availability` | `'available'`, `'outOfStock'`, `'comingSoon'` or `'hidden'`. |
| `featured` | `true` puts the product on the homepage. |
| `sortOrder` | Lower numbers come first. Ties sort by name. |
| `seo` | See [section 15](#15-how-to-update-seo). |

4. Put its images in `public/images/products/<slug>/`.
5. Save. The product then appears in the shop, its category pages, related products, the cart, the corporate form's hamper list, the sitemap and structured data. You don't need to edit any components.

**Availability behaviour**

| Value | What happens |
| --- | --- |
| `available` | Normal card, Add to Cart, WhatsApp enquiry. |
| `outOfStock` | Muted image, "Out of Stock" badge, Add to Cart disabled, WhatsApp enquiry still works. |
| `comingSoon` | "Coming Soon" badge, no Add to Cart, enquiry still works. |
| `hidden` | Removed everywhere: home, shop, related, cart, sitemap, JSON-LD. Its URL returns 404. |

## 8. How to add or replace product images

**Replace an image:** drop a new file into `public/images/products/<slug>/` with **exactly the same file name**. Every surface (card, gallery, cart, social preview, structured data) updates, because they all read the same path.

**Add an image:** save the file in the product's folder, then add an entry to that product's `images` list:

```ts
{
  src: '/images/products/the-mulberry-hamper/the-mulberry-hamper-detail.jpg',
  alt: 'Close-up of the hand-printed paper band and wax seal',   // describe what's in the photo
  role: 'detail',            // thumbnail | main | closed | contents | detail | lifestyle | additional
  width: 1600,
  height: 1200,
  focus: '60% 50%',          // optional: which part stays in frame when cropped
},
```

- The card and cart use `thumbnail` if there is one, otherwise `main`.
- The gallery shows the images in this order: main, closed, contents, detail, lifestyle, additional.
- Recommended size: JPG, 1600 to 2000 px on the long edge, quality around 80. The site creates the AVIF and WebP versions automatically.
- If a file is missing, the site shows a branded placeholder instead of a broken image, and the layout doesn't shift.

## 9. How to change prices

Edit `price` (and `salePrice` if you use one) for that product in `src/data/products.ts`. That's the **only** place a price exists. Home, Shop, the product page, the cart, WhatsApp messages and JSON-LD all read from it. Existing customer carts pick up the new price too, because the cart stores only product and quantity.

## 10. How to change homepage copy

Every homepage word lives in `src/data/homepage.ts`: announcement bar, hero, the "passing of a gift" steps, section headings, brand story, corporate block and final call to action. The Moments cards are in `moments.ts`, and the three principles are in `whyValora.ts`.

To swap the hero image, replace `public/images/home/hero.jpg` or point `hero.image.src` at another file.

## 11. How to change brand information

Edit `src/config/brand.ts`:

- `tagline`, `positioning`: used in the footer, metadata and Organization schema.
- `email`: replace `REPLACE_ME` with the real address. While it says `REPLACE_ME`, email links stay hidden across the site.
- `serviceArea`: currently "Bengaluru, India". Set `show: false` to remove it from the footer, contact page and schema.
- `siteUrl`: a fallback if `NEXT_PUBLIC_SITE_URL` isn't set.

The founders (names, roles, LinkedIn links, photos) are in `src/data/about.ts`. To add Sagar's LinkedIn, fill in `linkedin: ''`. To add his photo, save it as `public/images/brand/founders/sagar-choudhary.jpg` and set `photo` to that path.

## 12. How to change the WhatsApp number

In `src/config/brand.ts`:

```ts
whatsapp: {
  countryCode: '91',
  number: '7830104700',        // digits only, no spaces
  display: '+91 78301 04700',  // how it appears on the page
},
```

Every WhatsApp link, the cart checkout and both forms use this one number. The other numbers are kept in `alternateNumbers` for reference but aren't shown anywhere. To reword the messages themselves, edit `src/config/whatsapp.ts`.

## 13. How to add Instagram

Set `instagram: 'https://www.instagram.com/<handle>'` in `src/config/brand.ts`. The footer icon appears automatically and the URL is added to the Organization schema. Leave it as `''` to hide it.

## 14. How to add categories

Add an entry to `src/data/categories.ts`:

```ts
{
  name: 'Wedding Gifts',
  slug: 'wedding-gifts',
  description: 'For the couple, and the families.',
  image: '/images/home/moment-family.jpg',
  seoTitle: 'Wedding Gift Hampers',
  seoDescription: 'Wedding gift hampers from VALORA…',
  keywords: ['wedding gift hampers'],
  sortOrder: 6,
  visible: true,
},
```

Then add `'wedding-gifts'` to the `category` list of the products that belong in it. The filter chip, the crawlable `/shop/wedding-gifts` page with its own title and description, breadcrumbs, the product-page category link and the sitemap all update. Set `visible: false` to hide a category.

## 15. How to update SEO

- **Pages** (home, shop, about, contact): `src/data/seo.ts`.
- **Categories**: `seoTitle`, `seoDescription` and `keywords` on each category.
- **Products**: the `seo` block on each product.

```ts
seo: {
  seoTitle: 'The Mulberry Hamper — Festive Gift Hamper',   // <title> (" | VALORA" is added)
  metaDescription: '…',                                    // meta description
  slug: 'the-mulberry-hamper',                             // keep equal to the product slug
  canonicalUrl: '',   // '' = /product/<slug>
  keywords: ['festive gift hamper'],
  ogTitle: '',        // '' = seoTitle + " | VALORA"
  ogDescription: '',  // '' = metaDescription
  ogImage: '',        // '' = the product's main image
  h1: '',             // '' = product name
},
```

Leave the optional fields empty and they follow the main ones, so changing `seoTitle` updates the browser title, Open Graph and Twitter titles together. Fill them in only when you want a different value.

Built in: canonical URLs, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`, and JSON-LD for Organization, WebSite, BreadcrumbList, ItemList, Product and Offer. There are deliberately **no** ratings, reviews or awards. Don't add them unless they're real.

## 16. Other common edits

| Want to… | Edit |
| --- | --- |
| Rename, reorder or hide a nav link | `src/config/navigation.ts` (`label`, `order`, `visible`) |
| Change button labels, cart text, 404 or empty states | `src/data/site.ts` |
| Change form labels or error messages | `src/config/forms.ts` |
| Change colours or type sizes | `src/config/design-tokens.ts` |
| Turn off the announcement bar | `homepage.ts` → `announcement.enabled: false` |
| Change the logo | Replace the PNGs in `public/images/brand/` (`valora-logo.png` = name + tagline, `valora-wordmark.png` = name only, `-light` versions for dark backgrounds). Keep transparent backgrounds; update `logoSize` / `wordmarkSize` in `brand.ts` if the proportions change. |

## 17. Before launch checklist

- [ ] Confirm every product's **price** and **contents** in `products.ts`. They were drafted from the photography and are marked `// CONFIRM`.
- [ ] The Partnership Box lists a bottle of wine. Check whether you can sell and deliver alcohol before keeping it.
- [x] Email set to sagarchoudharyok@gmail.com in `brand.ts`.
- [ ] Pick the primary WhatsApp number in `brand.ts`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel.
- [x] Sagar's LinkedIn and photo added in `about.ts`.
- [ ] Add the Instagram URL once the account is live (optional).
