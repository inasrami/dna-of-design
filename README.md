# DNA of Design 🧬

<div align="center">
  <p><i>"Extract color palettes from any website."</i></p>
  <p>A web-based tool that uses computer vision to analyze web pages and generate color schemes.</p>
</div>

---

## ✦ About The Project

**DNA of Design** is a utility tool designed for developers and designers who need to quickly analyze the visual identity of a website. By entering a URL, the application captures a live screenshot of the target site and processes the image to extract its dominant color palette.

### ⚡ Core Functionality
* **Live Screenshot Capture:** Uses the *Screenshot Machine API* to fetch a real-time visual of the target URL.
* **Color Extraction:** Utilizes *Color Thief* to analyze the image pixel data and identify the 8 most dominant colors.
* **Palette Generation:** Displays the extracted colors alongside their specific HEX codes for easy copying.

## 🛠 Tech Stack

Built with a lightweight, no-build architecture using modern browser APIs.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

* **Structure:** Semantic HTML5
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN) for rapid UI development and gradients.
* **Logic:** Vanilla JavaScript with async/await for API handling.
* **Libraries & APIs:**
    * [Color Thief](https://lokeshdhakar.com/projects/color-thief/) (Image analysis).
    * [Screenshot Machine](https://screenshotmachine.com/) (Site capture).

## ✨ Features

* **Dark Mode UI:** A sleek, gradient-infused dark theme utilizing Tailwind's slate/gray palettes.
* **Loading States:** Custom shimmer animations to indicate processing status during API calls.
* **Error Handling:** User-friendly error messages if the URL is invalid or the screenshot fails to load.
* **Responsive:** Fully adaptive layout that works on mobile and desktop.

## 🚀 Getting Started

No build process is required.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/inasrami/dna-of-design.git](https://github.com/inasrami/dna-of-design.git)
    ```

2.  **Open the application**
    Simply open `index.html` in your web browser.

    *Note: For the best performance with image manipulation APIs, serving the file via a local server (like VS Code Live Server) is recommended to avoid CORS restrictions.*

## 👤 Author

**Inas Rami**
* Built by Inas Rami.

---
