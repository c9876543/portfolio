# DAEWOONG Site

## Overview
This project is a website for DAEWOONG, showcasing the company's information, products, research and development, ESG initiatives, investment information, and news.

## Project Structure
```
daewoong-site
├── src
│   ├── index.html          # Main HTML document for the website
│   ├── partials
│   │   ├── header.html     # Header structure with logo and navigation
│   │   └── overlay-menu.html # Full-screen overlay menu structure
│   ├── css
│   │   └── main.css        # Compiled CSS styles for the website
│   ├── scss
│   │   └── main.scss       # Main SCSS file with variables and styles
│   └── js
│       └── main.js         # JavaScript code for interactivity
├── package.json            # npm configuration file
├── .gitignore              # Files and directories to ignore in Git
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd daewoong-site
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Compile SCSS to CSS:
   ```
   npm run build-css
   ```
5. Open `src/index.html` in your browser to view the website.

## Usage
- The website includes sections for company introduction, product information, research and development, ESG, investment information, and news.
- The navigation menu is accessible from both the header and the full-screen overlay menu.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.