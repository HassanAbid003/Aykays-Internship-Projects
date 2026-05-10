Animated Product Card Grid
A responsive product card grid with hover reveal animations, a swipe-to-cart button, and a detailed product modal. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks.
________________


Project Structure
project/
├── index.html       # Main HTML file with all 8 product cards
├── style.css        # All styles and animations
├── README.md        # This file
└── images/          # Your product images folder
    ├── furniture-modern-studio-lifestyle-green.jpg
    ├── beautiful-luxury-pillow-sofa-decoration-living-room-interior-vintage-light-filter.jpg
    ├── dillon-mangum-9489sFfgk4c-unsplash.jpg
    ├── rashid-khreiss-TN4DuLKtA8Q-unsplash.jpg
    ├── yu-carla-Or3zn5zbgzE-unsplash.jpg
    ├── photo-1586023492125-27b2c045efd7.jpg
    ├── objecttype-raw-ZCarpyNlYPQ-unsplash.jpg
    └── valentin-lacoste-GcepdU3MyKE-unsplash.jpg


________________


How to Run
1. Put index.html and style.css in the same folder
2. Put all your images inside an /images/ folder next to them
3. Open index.html in any browser — no server needed
________________


How to Add a New Card
Copy any existing <article> block in index.html and paste it inside <main class="grid">. Then update:
<article class="card" aria-label="Your Chair Name, $000.">
  <div class="card-img-wrap">
    <img src="/images/your-image.jpg" alt="Your Chair Name" loading="lazy">
  </div>
  <div class="card-info">
    <p class="card-tag">Your Tag</p>
    <h2 class="card-title">Your Chair Name</h2>
    <p class="card-price">From <span>$000</span></p>
  </div>
  <div class="card-overlay" aria-hidden="true">
    <p class="overlay-tag">Your Tag</p>
    <h3 class="overlay-title">Your Chair Name</h3>
    <p class="overlay-desc">Your description here.</p>
    <button class="btn-see-more">See More</button>
  </div>
</article>


________________


How to Change Animation Speed
All animation timing is controlled by one variable in style.css:
:root {
  --transition: 0.38s cubic-bezier(0.4, 0, 0.2, 1);
}


* Make it faster → lower the number e.g. 0.2s
* Make it slower → raise the number e.g. 0.6s
For the swipe button animation specifically, find this in index.html:
pill.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';


Change 0.5s to your preferred speed.
________________


How to Change Colors
All colors are CSS variables in :root at the top of style.css:
:root {
  --cream: #F5F0E8;       /* Page background */
  --dark: #1A1A18;        /* Text and dark elements */
  --accent: #C8A96E;      /* Gold accent color */
  --accent-light: #E8D5A8;/* Light gold */
  --text-muted: #7A7A72;  /* Secondary text */
  --card-bg: #FFFFFF;     /* Card background */
  --overlay-bg: rgba(20, 18, 14, 0.88); /* Hover overlay */
}


Change any value to update the color throughout the whole project.
________________


How to Change Card Layout
The grid columns are controlled by:
.grid {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}


* Increase 240px → fewer, wider cards
* Decrease 240px → more, narrower cards
________________


How to Change Modal Size
.modal-box {
  max-width: 780px; /* Change this value */
}


* Smaller modal → reduce to e.g. 520px
* Larger modal → increase to e.g. 960px
________________


How to Change Swipe Button Reset Time
In index.html find:
}, 3000);


* 3000 = 3 seconds before button resets
* Change to any millisecond value e.g. 2000 = 2 seconds
________________


How to Update Modal Specs
In index.html find the specs list inside the modal:
<ul class="modal-specs">
  <li><i class="fa-solid fa-truck"></i> Ships in 3–5 business days</li>
  <li><i class="fa-solid fa-weight-hanging"></i> Weight capacity: 120kg</li>
  <li><i class="fa-solid fa-leaf"></i> Eco-friendly materials</li>
  <li><i class="fa-solid fa-screwdriver-wrench"></i> Easy self-assembly</li>
</ul>


Change the text or swap icons from Font Awesome.
________________


Accessibility
* Keyboard navigation: Tab to focus a card, Enter or Space to open overlay, Escape to close
* All images have alt text
* aria-expanded and aria-hidden attributes update dynamically
* Focus outlines visible via :focus-visible
________________


Browser Support
Works in all modern browsers — Chrome, Firefox, Safari, Edge. No Internet Explorer support.
________________


Dependencies
Library
	Used For
	CDN
	Google Fonts
	Playfair Display + DM Sans
	Loaded in <head>
	Font Awesome 6
	Spec icons in modal
	Loaded in <head>
	No build tools, no npm, no frameworks required.