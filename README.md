# TMD Glitch Signup Simulation

This project is a frontend simulation of a social media signup process, developed for the INFO 5330 Technology, Media, and Democracy course at Cornell Tech (Spring 2025).

It explores the concept of "glitch art" as a form of critical commentary on the implications of joining social media platforms. The application presents a modern, sleek user interface for the signup flow, which is intentionally interrupted by disruptive, retro Windows XP-style error popups containing messages that question the user's actions and highlight potential negative consequences of platform engagement.

## Core Concept & Features

* **Glitch Art Commentary:** Uses unexpected, retro popups with critical messages to break the seamlessness of the modern UI and prompt reflection on privacy, data, algorithmic influence, and mental well-being.
* **Modern UI vs. Retro Glitch:** Intentionally contrasts a clean, fashionable frontend (using Tailwind CSS) with the jarring, outdated aesthetic of Windows XP error messages.
* **Simulated Signup Flow:** Guides the user through several steps:
    * Initial Login/Signup Screen
    * Personal Information Entry (Name, Phone, DOB using separate fields)
    * Interest Selection
    * Influencer/Account Following
    * Final "Complete Registration" step
* **Interactive Glitching:** Popups appear upon clicking progression buttons. All popups for a given step must be closed before the user can proceed by clicking the button again. Clicking to proceed while popups are visible highlights their close buttons.
* **Final System "Failure":** The final step simulates a system crash with a TV static/snow effect, preventing actual "completion" and reinforcing the glitch theme.
* **Frontend Focus:** Uses mock data and focuses entirely on the frontend user experience and interaction.

## Tech Stack

* **Framework:** Next.js (v14+ with App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** React
* **Icons:** Font Awesome
* **State Management:** React Context API (for Glitch state)
* **Package Manager:** Yarn

## Getting Started

1.  **Clone the repository (or ensure you are in the project directory):**
    ```bash
    # If cloning fresh:
    # git clone [https://github.com/TomorrowMC/GlitchArt.git](https://github.com/TomorrowMC/GlitchArt.git)
    # cd GlitchArt
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    yarn dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) (or the specified port) in your browser.

## Project Context

This project fulfills the final project requirement for INFO 5330.

*(Optional: Add Team Member list here if desired)*
* Yifei Hu
* Sarah Morrison
* Rebecca Deng
* Rida Chaudhry
* Yubang Jiang
* Zihan Lin
*(Based on TMD MARCH 21 DELIVERABLE.pdf)*