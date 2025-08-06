# OrangeHRM Cypress Automation 

This project automates key modules of the OrangeHRM web application using Cypress and JavaScript.

## 📂 Project Structure

- `cypress/e2e/` – Test specifications
- `cypress/fixture/` – JSON file for credentials
- `cypress/support/` – POM Files
- `cypress.config.js` – Configuration file

## ✅ Features Automated

- Login functionality using POM
- Add Employee
- Assertion for validation
- Explicit Wait


## ⚡ Technical Highlights

### 1. ⏳ **Explicit Waits Used**
OrangeHRM's UI is **slow and flaky**, so we used:
- `cy.intercept()` to wait for API calls before DOM checks.
- `cy.wait()` only where absolutely necessary.
- `cy.get(..., { timeout: 10000 })` to increase element wait time.

### 2. 🧱 **Why Page Object Model (POM)?**

We used POM for better maintainability and structure.

✅ Benefits:
- Separation of test logic and selectors  
- Easy to maintain if UI changes  
- Code reusability across test files  
- Cleaner and more readable test cases

Example:
``js
loginPage.enterUsername('Admin');
loginPage.enterPassword('admin123');
loginPage.clickLoginButton();
--------------------------------------------------------------------------------------------------------
🔧 Cypress Project setup Installation & Setup

## ⚙️ Setup Instructions

### 🔹 1. Install Node.js

Download and install Node.js (includes npm) from the (https://nodejs.org/en/download).  
Verify installation:

``bash
node -v
npm -v

git clone https://github.com/Nitin-Ranga/Orange_HRM.git
cd Orange_HRM

npm init -y                    # (If package.json not present)
npm install cypress --save-dev

npx cypress run

