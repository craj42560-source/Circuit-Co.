# Circuit-Co.
A client-side university project for a fictional Birmingham-based technology repair service, providing service information, repair booking, pricing, and local booking management through a responsive web interface.

## Project Overview

Circuit&Co is a client-side web application developed as a university group project. The website presents a professional interface for a technology repair business and allows users to:

* Browse available repair services
View service details, pricing, and estimated turnaround times
Submit a repair booking
Select different urgency levels
Apply promotional codes
View and manage locally stored bookings
Read company information, FAQs, and customer testimonials
Switch between light and dark themes

The project focuses on applying frontend development principles to a realistic service-booking use case without relying on a server-side application or database. Booking information is stored in the browser using `localStorage`. 

## Features

### Service Catalogue

The website provides six service categories:

* Laptop & PC Repair
* Phone & Tablet Repair
* Data Recovery
* Board-Level & Soldering
* Virus & Malware Removal
* Business IT Support

Each service contains descriptive information, starting pricing where applicable, expected turnaround information, features, and imagery. 

### Repair Booking

Users can submit a repair booking containing:

* Name
* Email address
* Phone number
* Device type
* Service
* Urgency
* Preferred date
* Preferred time
* Additional message
* Optional promotional code

Available booking times are provided in 30-minute intervals from 09:00 to 17:30. 

### Client-Side Validation

The booking form performs client-side validation for required fields and input formats. Validation includes email and UK phone-number checks, required service/date/time selections, and other field-specific validation. Errors are displayed directly against the relevant form fields. 

### Dynamic Pricing

The booking form calculates an estimated price based on:

* Selected service
* Selected urgency level
* Applied promotional discount

The project defines standard, priority, and express urgency options with corresponding price multipliers. 

### Promotional Codes

The client-side application includes predefined promotional codes:

* `REPAIR10`
* `STUDENT15`
* `WELCOME`
* `SUMMER25`

The discount is applied to the calculated booking price when a valid code is entered. 

### Booking Management

The **My Bookings** page reads bookings from browser storage and allows users to:

* View saved bookings
* Filter bookings by status
* Mark pending bookings as confirmed
* Mark confirmed bookings as completed
* Cancel pending or confirmed bookings
* Delete bookings

Supported booking states include `pending`, `confirmed`, `completed`, and `cancelled`. 

### Theme System

A light/dark theme toggle is available across the website. The selected theme is saved in `localStorage`, allowing the preference to persist in the browser. 

### Interactive UI

The project includes several client-side interactions, including:

* Animated page elements
* Service-detail modal windows
* Team-member modal content
* FAQ content
* Navbar scroll behaviour
* Active navigation highlighting
* Back-to-top functionality
* Form interaction feedback
* Responsive navigation

These behaviours are implemented through JavaScript, jQuery, Bootstrap, and the project's CSS system. 

## Technologies Used

### Core Technologies

| Technology | Usage                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------- |
| HTML5      | Page structure and semantic markup                                                             |
| CSS3       | Layout, visual design, responsive styling, themes, animations, and glassmorphism               |
| JavaScript | Client-side application logic, state handling, validation, pricing, bookings, and interactions |

The repository consists of static HTML, CSS, and JavaScript files and does not contain a `package.json` or project-specific build configuration. ([GitHub][2])

### Libraries & Frameworks

* **Bootstrap 5.3.3** — responsive layout, components, and Bootstrap JavaScript functionality
* **jQuery 3.7.1** — DOM manipulation and event handling
* **Bootstrap Icons 1.11.3** — interface icons
* **Google Fonts** — Inter and Sora typography

These dependencies are loaded from CDNs rather than installed through a package manager. 

### Browser APIs

The project also uses browser-provided functionality including:

* `localStorage` for bookings and theme preferences
* DOM APIs for interaction and page manipulation
* `window` and browser scrolling APIs for navigation behaviour



## Project Structure

The repository is intentionally structured as a small static client-side application:

```text
Circuit-Co./
├── index.html
├── services.html
├── about.html
├── contact.html
├── bookings.html
├── style.css
├── app.js
├── data.js
├── home.js
├── services.js
├── contacts.js
├── bookings.js
└── README.md
```

The repository currently contains these primary project files and no separate source/build directories. ([GitHub][2])

### HTML Pages

| File            | Purpose                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `index.html`    | Home page containing the main service overview, testimonials, FAQs, and booking call-to-actions |
| `services.html` | Full service catalogue with service details and interactive service modals                      |
| `about.html`    | Company/about page with team information and interactive team content                           |
| `contact.html`  | Contact and repair-booking form                                                                 |
| `bookings.html` | Displays and manages bookings saved in the browser                                              |

The available pages and navigation are defined directly in the HTML files. 

### JavaScript

| File          | Purpose                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `app.js`      | Shared booking storage, validation utilities, theme management, navbar behaviour, and back-to-top functionality |
| `data.js`     | Shared services, testimonials, FAQs, team data, prices, urgency options, and promotional codes                  |
| `home.js`     | Dynamically renders home-page service previews, testimonials, and FAQ content                                   |
| `services.js` | Builds the service catalogue and handles service-detail interactions                                            |
| `contacts.js` | Handles booking-form interactions, pricing, promotions, validation, and booking submission                      |
| `bookings.js` | Retrieves, displays, filters, updates, and deletes saved bookings                                               |



### `style.css`

`style.css` provides the shared visual system for the application, including:

* CSS custom properties
* Glassmorphism components
* Buttons and cards
* Form styling
* Responsive layouts
* Theme-specific styles
* Animation and transition classes
* Focus states
* Reduced-motion handling



## How It Works

Circuit&Co follows a simple client-side architecture.

Shared information such as services, testimonials, FAQs, team members, service prices, urgency options, and promotional codes is defined in `data.js`. Individual page scripts use this shared data to dynamically populate sections of the website. 

The booking process is handled entirely within the browser:

1. The user selects a service and booking options.
2. The interface calculates an estimated price.
3. Client-side validation checks the submitted information.
4. A booking object is created with an ID, `pending` status, and creation timestamp.
5. The booking is stored in browser `localStorage`.
6. The user receives a booking confirmation containing a generated reference.
7. The **My Bookings** page retrieves the saved information and allows the user to manage its status. 

There is **no server-side booking system or database specified in the repository**. Bookings are therefore local to the browser in which they were created. 

## Getting Started

### Prerequisites

No project-specific package manager or dependency installation is required.

The repository does not contain a `package.json`, build configuration, or dependency installation script. External libraries are loaded through CDN links in the HTML files. ([GitHub][2])

A modern web browser and a local static HTTP server are sufficient.

### Clone the Repository

```bash
git clone https://github.com/craj42560-source/Circuit-Co..git
cd Circuit-Co.
```

### Run Locally

Because the project is a static website, it can be served using any local HTTP server.

For example, if Python is installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Alternatively, the project can be served using a static-site extension such as a local development server in a code editor.

### Install Dependencies

No installation command is required. Bootstrap, Bootstrap Icons, jQuery, and Google Fonts are referenced externally through CDN URLs. 

### Build

No build step is specified. The project is delivered as static HTML, CSS, and JavaScript files.

## Usage

The primary user flow is:

```text
Home
  │
  ├── Browse Services
  │       └── View service details
  │
  └── Book a Repair
          │
          ├── Enter personal details
          ├── Select device and service
          ├── Select urgency
          ├── Select date and time
          ├── Apply optional promo code
          ├── Review estimated price
          └── Submit booking
                    │
                    ▼
              Booking saved locally
                    │
                    ▼
               My Bookings
```

Users can start a booking from the home page, navigation, service details, or contact page. After submission, the booking is saved locally and becomes available through **My Bookings**. 

## Team Members & Contributions

### Raj Chaudhary

**Lead Frontend Architect & Project Lead**

* Glassmorphism UI Architecture
* Semantic HTML
* WCAG Accessibility

### Shishir Sapkota

**Interactive Feature Developer**

* Dynamic UI Transitions
* Interactive Event Handling

### Chetan Budhathoki

**Client-Side Logic Engineer**

* State Management
* Validation
* Booking Logic

### Simant Pokhrel

**QA & Performance Engineer**

* Cross-Browser Testing
* Asset Optimization
* Theme Systems

## Accessibility

Accessibility has been considered in the implementation through several identifiable practices:

* Semantic HTML elements such as headings, navigation, sections, forms, lists, and buttons
* Descriptive `alt` text for content images
* `aria-label` attributes for controls such as the theme toggle and back-to-top button
* `aria-controls` and `aria-expanded` attributes on the responsive navigation control
* Visible form validation feedback
* Keyboard-friendly form controls and interactive elements
* Focus styling for form controls
* A `prefers-reduced-motion` media query that reduces animation and transition effects for users who request reduced motion



The project **does not claim formal WCAG compliance**. The implementation contains accessibility-focused practices, but no formal accessibility audit or WCAG conformance report is specified in the repository.

## Testing & Quality Assurance

The implemented functionality provides several areas suitable for manual testing, including:

* Booking form validation
* Dynamic pricing
* Promotional codes
* Theme switching
* Responsive navigation
* Service modals
* Booking filtering and status changes
* Local booking persistence

## Performance & Optimization

The project includes several identifiable frontend optimisation practices:

* Images use `loading="lazy"` where appropriate.
* External dependencies are loaded from CDN resources.
* Shared data is centralised in `data.js` rather than duplicated across pages.
* CSS uses reusable component classes and CSS custom properties.
* Responsive layouts are implemented through Bootstrap's grid system and CSS media queries.
* Reduced-motion support limits animations and transitions when requested by the user's operating system.

## Responsive Design

The website is designed to adapt to different viewport sizes using Bootstrap's responsive grid and navigation components alongside custom CSS media queries.

The navigation collapses at smaller viewport widths, while content such as service cards and page sections uses responsive Bootstrap column classes. The custom stylesheet also includes a mobile navigation breakpoint and responsive layout rules. 

## Deployment

The live application is deployed through **GitHub Pages**, as indicated by the project's provided `github.io` deployment address.

**Live website:**
[Circuit&Co Live Website](https://craj42560-source.github.io/Circuit-Co./index.html?utm_source=chatgpt.com)

The repository's GitHub Pages deployment configuration/workflow is not present among the files visible in the main project directory, so the exact deployment configuration is **Not specified**. ([GitHub][2])

## Limitations

As a client-side university project, the current implementation has some inherent limitations:

* Booking data is stored only in the user's browser using `localStorage`.
* There is no server-side database specified.
* Bookings are not synchronised between different browsers or devices.
* There is no authenticated user account system.
* Booking status changes are performed locally rather than through a real business administration system.
* There is no confirmed real-time availability system.
* The project does not include a real payment processing system.
* External assets and libraries depend on their CDN resources being available.

These limitations are consistent with the project's client-side scope rather than indicating missing functionality required for the academic implementation. 

## Future Improvements

The following are potential future improvements rather than existing functionality:

* Add a backend API and persistent database for real booking management.
* Introduce user authentication so customers can access bookings across devices.
* Add real-time appointment availability.
* Add an administrative interface for managing bookings.
* Integrate a secure payment provider where appropriate.
* Add automated unit and end-to-end testing.
* Perform a formal WCAG accessibility audit.
* Add formal performance testing and Lighthouse monitoring.
* Replace placeholder/static business content with a managed content system.
* Improve deployment automation with a documented CI/CD workflow.

## Learning Outcomes

This project demonstrates practical experience in:

* Frontend architecture
* Semantic HTML
* CSS component and design-system development
* Glassmorphism UI implementation
* Responsive web design
* Client-side state management
* Browser-based data persistence
* Event-driven programming
* Form validation
* Dynamic pricing logic
* Interactive UI transitions
* Accessibility-focused development
* Cross-browser testing
* Asset and frontend optimisation
* Theme-system implementation

These outcomes are reflected in the project's separation of shared data, page-specific JavaScript, reusable CSS components, browser storage, validation logic, and interactive interface behaviour. 

## Links

* **GitHub Repository:** https://github.com/craj42560-source/Circuit-Co..git
* **Live Website:** https://craj42560-source.github.io/Circuit-Co./index.html

## License

No license file or explicit software license is specified in the repository. ([GitHub][2])

**License: Not specified.**

## Academic Project Note

Circuit&Co was developed as a **client-side development group project**. The project was created to demonstrate practical application of frontend web development, client-side programming, accessibility, responsive UI design, validation, testing, and performance-oriented development practices within an academic setting.

[1]: https://craj42560-source.github.io/Circuit-Co./index.html "Circuit&Co | Tech Repair Specialists in Birmingham"
[2]: https://github.com/craj42560-source/Circuit-Co..git "GitHub - craj42560-source/Circuit-Co. · GitHub"
