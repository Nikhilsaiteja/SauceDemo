# SauceDemo Automation Framework

A comprehensive end-to-end test automation framework built with Playwright for testing the [SauceDemo](https://www.saucedemo.com/) e-commerce application. This framework provides robust test coverage across login functionality, product browsing, cart operations, and checkout workflows.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Reporting](#reporting)
- [Contributing](#contributing)

## 🎯 Overview

This automation suite is designed to validate critical user journeys on the SauceDemo platform, ensuring the application functions correctly across various scenarios. The framework follows the Page Object Model (POM) design pattern for better maintainability and reusability.

## ✨ Features

- **Page Object Model (POM)**: Clean separation of test logic and page elements
- **Parallel Execution**: Run tests concurrently for faster feedback
- **Cross-Browser Support**: Ready to test on Chromium, Firefox, and WebKit
- **Environment Configuration**: Flexible configuration using `.env` files
- **Comprehensive Reporting**: Dual reporting with HTML and Allure reports
- **Modular Test Structure**: Organized by page functionality
- **Reusable Components**: Shared utilities and common actions

## 🛠 Tech Stack

- **Test Framework**: [Playwright](https://playwright.dev/) v1.57.0
- **Programming Language**: JavaScript (CommonJS)
- **Reporting**: 
  - Playwright HTML Reporter
  - Allure Reports v3.4.5
- **Environment Management**: dotenv v17.2.3
- **Runtime**: Node.js

## 📁 Project Structure

```
SauceDemo/
├── tests/
│   ├── Login_Page/
│   │   ├── loginPage.js          # Login page object
│   │   └── loginPage.spec.js     # Login test scenarios
│   ├── Dashboard_Page/
│   │   ├── dashboardPage.js      # Dashboard page object
│   │   └── dashboardPage.spec.js # Dashboard test scenarios
│   └── Cart_Page/
│       ├── cartPage.js           # Cart page object
│       └── cartPage.spec.js      # Cart & checkout test scenarios
├── allure-results/               # Allure test results (JSON)
├── allure-report/                # Generated Allure HTML report
├── playwright-report/            # Playwright HTML report
├── test-results/                 # Test artifacts and screenshots
├── playwright.config.js          # Playwright configuration
├── package.json                  # Project dependencies and scripts
└── README.md                     # Project documentation
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- **Allure Command Line** (optional, for viewing Allure reports)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Nikhilsaiteja/SauceDemo.git
cd SauceDemo
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

4. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```env
APP_URL=https://www.saucedemo.com/
APP_USERNAME=standard_user
APP_PASSWORD=secret_sauce
SHORT_TIMEOUT=5000
LONG_TIMEOUT=10000
```

## 🔧 Configuration

The framework configuration is managed in `playwright.config.js`. Key configurations include:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled by default
- **Browsers**: Chromium (can enable Firefox and WebKit)
- **Reporters**: HTML and Allure
- **Retries**: Configured for CI/CD environments
- **Trace Collection**: Configurable for debugging

## 🧪 Running Tests

### Run all tests

```bash
npm run test
```

### Run tests in headed mode (with browser UI)

```bash
npm run test:headed
```

### Run specific test suites

```bash
# Login tests only
npm run test:login

# Dashboard tests only
npm run test:dashboard

# Cart and checkout tests only
npm run test:cart
```

### Run tests with specific tags

```bash
npx playwright test --grep @login
```

## 📊 Test Coverage

### Login Page Tests

- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ Error message validation

### Dashboard Page Tests

- ✅ Product filtering (A-Z, Z-A)
- ✅ Product sorting by price (Low to High, High to Low)
- ✅ Menu functionality (All Items, About, Logout, Reset App State)
- ✅ Add products to cart by name

### Cart Page Tests

- ✅ Navigate to cart page
- ✅ Verify products in cart (name, price, quantity)
- ✅ Remove products from cart
- ✅ Continue shopping navigation
- ✅ Checkout process with user information
- ✅ Checkout cancellation flows
- ✅ Order overview validation
- ✅ Complete order confirmation
- ✅ Price calculation verification

## 📈 Reporting

### Playwright HTML Report

After test execution, view the HTML report:

```bash
npx playwright show-report
```

### Allure Report

Generate and view Allure reports for detailed test analytics:

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open
```

### Clear Allure Results

To clear previous test results before a fresh run:

```bash
npm run allure:clear
```

## 🎯 Best Practices

This framework follows several best practices:

1. **Page Object Model**: Separates test logic from page implementation
2. **Environment Variables**: Sensitive data stored securely in `.env`
3. **Waits and Synchronization**: Proper wait strategies for stable tests
4. **Descriptive Test Names**: Clear test descriptions for better reporting
5. **Modular Structure**: Easy to extend and maintain
6. **Reusable Functions**: Common actions abstracted into page objects

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Nikhil Sai Teja**

- GitHub: [@Nikhilsaiteja](https://github.com/Nikhilsaiteja)

## 🔗 Links

- [Project Repository](https://github.com/Nikhilsaiteja/SauceDemo)
- [SauceDemo Application](https://www.saucedemo.com/)
- [Playwright Documentation](https://playwright.dev/)
- [Allure Reports Documentation](https://docs.qameta.io/allure/)

---

**Happy Testing! 🚀**
