# K.P Fashion Website - Final POE

## Student Details

- Student: Kamran Pillay
- Student Number: ST10535613
- Module: WEDE5020
- Project: K.P Fashion

## About the Project

K.P Fashion is a fashion website created for my WEDE5020 project. The website allows users to browse women's fashion, men's fashion and shoes, search and filter products, send product enquiries and contact K.P Fashion.

The final POE builds on my Part 1 HTML website and my Part 2 CSS and responsive design work.

## Website Pages

- Home - `index.html`
- About Us - `about.html`
- Products - `products.html`
- Enquiries - `enquiries.html`
- Contact Us - `contact.html`

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- CSS Grid
- Flexbox
- Media Queries
- Fetch API / AJAX
- Leaflet and OpenStreetMap for the interactive map
- GitHub and GitHub Pages

## Part 2 Feedback and Improvements

The Part 2 feedback showed that the website was good overall but still had a few areas to improve.

### Feedback / Changelog

- The feedback and changelog section scored 8/10. For Part 3 I expanded the changelog so the lecturer can clearly see what was changed and why.
- Decoration and colour scored 4/5. I made the black, white and gold styling more consistent across product cards, forms, buttons, tabs and interactive states.
- GitHub commits scored 4/5. For Part 3 I will use regular descriptive commit messages instead of broad messages such as "update files".
- The README scored 3/5. I expanded the README to include the final website structure, JavaScript features, SEO work, validation, deployment instructions, testing and references.

## Part 3 Functionality

### JavaScript Enhancements

The site now uses one shared JavaScript file: `js/script.js`.

JavaScript features include:

- Time-based greeting on the Home page.
- Scroll reveal animations using the Intersection Observer API.
- About Us tabs for Story, Mission and Vision.
- Image lightbox gallery using the HTML `dialog` element.
- Dynamic product data loaded from `data/products.json` using `fetch()`.
- Product search, category filtering and price/name sorting.
- DOM manipulation to create product cards from JSON data.
- FAQ accordion on the Enquiries page.
- Interactive Leaflet map on the Contact page.
- JavaScript form validation and error messages.
- AJAX enquiry form submission using FormSubmit.
- Dynamic enquiry response showing the selected product's price and availability.
- Contact form that creates an email preview and mailto link.

## Form Functionality and Validation

### Enquiries Form

The Enquiries form collects:

- Full name
- Email address
- Contact number
- Enquiry type
- Product
- Preferred size
- Message
- Consent

HTML5 validation attributes and JavaScript validation are used before submission. When a product is selected, JavaScript displays its price and availability in the response. The form uses a FormSubmit AJAX endpoint for asynchronous submission.

### Contact Form

The Contact form collects:

- Full name
- Email address
- Contact number
- Message type
- Full message
- Consent

After validation, JavaScript compiles the information into an email preview. The user can then open the completed message in their email application.

## SEO Improvements

The final POE includes the following SEO improvements:

- Unique title tag on every page.
- Unique meta description on every page.
- Relevant keywords included naturally in page content and metadata.
- Correct heading structure.
- Descriptive image file names and alt text.
- Cleaner file names such as `about.html` and `contact.html` instead of spaces in URLs.
- Internal links between relevant pages.
- Responsive mobile-friendly layout.
- Lazy loading on non-critical images.
- Large Part 2 images were resized and compressed for faster page loading.
- `robots.txt` file.
- `sitemap.xml` file.
- Local Braamfontein / Johannesburg information for local relevance.
- Off-page SEO can be supported after publishing by sharing the GitHub Pages link on social media and earning genuine external links; backlinks cannot be created reliably inside the website code itself.

## Basic Security Improvements

- Form inputs are validated before processing.
- A honeypot field is included on the enquiry form to reduce simple bot spam.
- The Leaflet CDN files use integrity and crossorigin attributes.
- GitHub Pages provides HTTPS when the site is deployed.
- The project does not store passwords, card details or other sensitive account information.

## Folder Structure

```text
K.P-Fashion
├── css
│   └── style.css
├── data
│   └── products.json
├── Images
│   ├── logo.png
│   ├── mens-fashion.jpg
│   ├── shoes.jpg
│   └── womens-fashion.jpg
├── js
│   └── script.js
├── index.html
├── about.html
├── products.html
├── enquiries.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md
```

## Testing

I tested the website to check that:

- All navigation links work.
- JavaScript loads without syntax errors.
- Product data loads through Live Server / GitHub Pages.
- Search, filter and sort controls work.
- The lightbox opens and closes.
- About Us tabs work.
- FAQ accordion works.
- Enquiry and Contact forms display validation errors when information is invalid.
- The Contact form creates a correctly formatted email link.
- The website responds to desktop, tablet and mobile screen sizes.
- Images display with alt text.
- `robots.txt` and `sitemap.xml` are included.

## GitHub Commit Plan

Part 3 should be committed in smaller descriptive steps. Suggested commit messages:

1. `Add Part 2 feedback fixes and improve styling`
2. `Add JavaScript tabs gallery and animations`
3. `Add dynamic products search filter and sort`
4. `Add enquiry form validation and AJAX response`
5. `Add contact form validation and interactive map`
6. `Add SEO metadata robots and XML sitemap`
7. `Update README and Part 3 changelog`
8. `Final POE testing and deployment updates`

## GitHub Pages Deployment

The project is prepared for GitHub Pages deployment from the `main` branch and repository root.

Expected website address:

`https://kamranpillay7-oss.github.io/Kamran-Pillay_ST10535613_wede5020_poe_group-04_My-Project/`

To publish:

1. Upload/push the final Part 3 files to the repository.
2. Open the repository **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/(root)`.
6. Save and use the published GitHub Pages link in the LMS submission.

## Changelog

### Part 1

- Created the first five HTML pages.
- Added website content, images and navigation.

### Part 2

- Added an external CSS stylesheet.
- Improved file and folder structure.
- Added Flexbox navigation and CSS Grid product layout.
- Added responsive breakpoints for desktop, tablet and mobile.
- Added hover, focus and active states.
- Improved form styling.
- Updated README, references and GitHub commits.

### Part 3 / Final POE

- Renamed `about us.html` to `about.html` and `contact us.html` to `contact.html` for cleaner URLs.
- Added unique SEO titles, descriptions and keywords to every page.
- Added `robots.txt` and `sitemap.xml`.
- Added a shared JavaScript file.
- Added a time-based welcome message.
- Added scroll reveal animations.
- Added interactive About Us tabs.
- Added an image gallery and lightbox.
- Added dynamic product data stored in JSON.
- Added product search, filtering and sorting.
- Added FAQ accordion functionality.
- Added an interactive map on the Contact page.
- Added a complete Enquiries form with HTML5 and JavaScript validation.
- Added AJAX submission to the Enquiries form.
- Added a product price and availability response after enquiry validation.
- Added a separate Contact form with validation.
- Added email preview and mailto functionality to the Contact form.
- Improved visual consistency in buttons, cards, forms and interactive elements.
- Resized and compressed the main fashion images to improve page speed.
- Added basic security improvements including validation, a form honeypot and Subresource Integrity on the map library.
- Added `.nojekyll` for straightforward GitHub Pages static-site publishing.
- Expanded README documentation and the feedback changelog.

## References

FormSubmit (2026) *FormSubmit Documentation*. Available at: https://formsubmit.co/documentation (Accessed: 2 November 2026).

FormSubmit (2026) *Form submission with AJAX*. Available at: https://formsubmit.co/ajax-documentation (Accessed: 2 November 2026).

GitHub (2026) *Configuring a publishing source for your GitHub Pages site*. Available at: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site (Accessed: 2 November 2026).

Leaflet (2026) *Leaflet - an open-source JavaScript library for mobile-friendly interactive maps*. Available at: https://leafletjs.com/ (Accessed: 2 November 2026).

Mozilla Developer Network (MDN) (2026) *Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API (Accessed: 2 November 2026).

Mozilla Developer Network (MDN) (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 2 November 2026).

Mozilla Developer Network (MDN) (2026) *HTMLDialogElement*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement (Accessed: 2 November 2026).

OpenStreetMap contributors (2026) *OpenStreetMap*. Available at: https://www.openstreetmap.org/ (Accessed: 2 November 2026).
