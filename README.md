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
- **Cross-Browser Testing**: Configured to run on Chromium, Firefox, and WebKit
- **CI/CD Integration**: GitHub Actions workflow with secure secret management
- **Environment Configuration**: Flexible configuration using `.env` files
- **Comprehensive Reporting**: Dual reporting with HTML and Allure reports
- **Organized Test Suites**: Tests grouped using `test.describe` blocks for better structure
- **Flexible Test Execution**: Grep-based filtering with multiple tags for selective test runs
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
├── report/                       # Allure report screenshot
├── test-results/                 # Test artifacts and screenshots
├── .env.example                  # Environment variables template
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

Copy the `.env.example` file and create a `.env` file in the root directory:

```bash
cp .env.example .env
```

The `.env` file should contain the following variables:

```env
APP_URL=https://www.saucedemo.com/
APP_USERNAME=standard_user
APP_PASSWORD=secret_sauce
TIMEOUT=10000
SHORT_TIMEOUT=5000
LONG_TIMEOUT=20000
VERY_SHORT_TIMEOUT=1000
```

**Environment Variable Descriptions:**
- `APP_URL`: The base URL of the application under test
- `APP_USERNAME`: Login username for test execution
- `APP_PASSWORD`: Login password for test execution
- `TIMEOUT`: Default timeout for general operations (10 seconds)
- `SHORT_TIMEOUT`: Timeout for quick operations (5 seconds)
- `LONG_TIMEOUT`: Timeout for slower operations like page loads (20 seconds)
- `VERY_SHORT_TIMEOUT`: Timeout for very quick operations (1 second)

> **Note**: `.env` is excluded from git tracking for security. Use `.env.example` as a template.

5. **GitHub Secrets Setup (for CI/CD)**

For GitHub Actions to work properly, add the following secrets to your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:
   - `APP_URL`
   - `APP_USERNAME`
   - `APP_PASSWORD`
   - `TIMEOUT`
   - `SHORT_TIMEOUT`
   - `LONG_TIMEOUT`
   - `VERY_SHORT_TIMEOUT`

The GitHub Actions workflow automatically creates a `.env` file from these secrets during test execution.

## 🔧 Configuration

The framework configuration is managed in `playwright.config.js`. Key configurations include:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled by default
- **Browsers**: Chromium, Firefox, and WebKit (all three major browsers enabled)
- **Reporters**: HTML and Allure
- **Retries**: Configured for CI/CD environments (2 retries on CI)
- **Trace Collection**: Configurable for debugging
- **Workers**: Optimized for CI/CD (1 worker on CI, unlimited locally)

## 🧪 Running Tests

### Run all tests

```bash
npm run test
```

### Run tests in headed mode (with browser UI)

```bash
npm run test:headed
```

### Run tests on specific browsers

```bash
# Run on Chromium only
npx playwright test --project=chromium

# Run on Firefox only
npx playwright test --project=firefox

# Run on WebKit (Safari) only
npx playwright test --project=webkit

# Run on multiple browsers
npx playwright test --project=chromium --project=firefox
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

### Run tests with grep patterns (tags)

Tests are organized with multiple grep tags for flexible execution:

```bash
# Run by test suite
npx playwright test --grep @login
npx playwright test --grep @filter
npx playwright test --grep @menu
npx playwright test --grep @cart
npx playwright test --grep @checkout

# Run by specific functionality
npx playwright test --grep @valid          # Valid login tests
npx playwright test --grep @invalid        # Invalid login tests
npx playwright test --grep @asc            # Ascending sort tests
npx playwright test --grep @desc           # Descending sort tests
npx playwright test --grep @remove         # Product removal tests
npx playwright test --grep @finish         # Checkout completion tests

# Combine multiple patterns (OR operation)
npx playwright test --grep "@login|@cart"
npx playwright test --grep "@checkout|@filter"

# Exclude specific tests (NOT operation)
npx playwright test --grep-invert @invalid
```

## 📊 Test Coverage

Tests are organized into logical groups using `test.describe` blocks for better structure and reporting.

### Login Page Tests (`test.describe: 'Login Page Tests'`)

- ✅ Login with valid credentials `@login@valid`
- ✅ Login with invalid credentials `@login@invalid`
- ✅ Error message validation

### Dashboard Filter Tests (`test.describe: 'Dashboard filter Tests'`)

- ✅ Product filtering: Names (A to Z) `@filter@asc`
- ✅ Product filtering: Names (Z to A) `@filter@desc`
- ✅ Product sorting: Price (Low to High) `@filter@asc`
- ✅ Product sorting: Price (High to Low) `@filter@desc`

### Dashboard Menu Tests (`test.describe: 'Dashboard Menu Tests'`)

- ✅ All Items menu button `@menu@allitems`
- ✅ About menu button `@menu@about`
- ✅ Logout menu button `@menu@logout`
- ✅ Reset App State menu button `@menu@resetappstate`

### Dashboard Cart Tests (`test.describe: 'Dashboard Cart Tests'`)

- ✅ Add products to cart by name `@cart`

### Navigation Tests (`test.describe: 'Navigation Tests'`)

- ✅ Navigate to cart page from dashboard `@cart@tocart`
- ✅ Navigate back to dashboard from cart `@cart@todashboard`
- ✅ Continue shopping functionality

### Product Checkout Tests (`test.describe: 'Product Checkout Tests'`)

- ✅ Remove products from cart `@cart@remove`
- ✅ Checkout process validation `@checkout@process`
- ✅ Checkout cancellation (first step) `@checkout@cancelfirststep`
- ✅ Checkout cancellation (second step) `@checkout@cancelsecondstep`
- ✅ Complete order confirmation `@checkout@finish`
- ✅ Price calculation verification

**Total Test Cases: 18** | **Test Suites: 6**

## � CI/CD Integration

This project includes GitHub Actions workflow for continuous testing.

### Workflow Features

- **Trigger**: Runs on push and pull requests to `main` and `master` branches
- **Environment**: Ubuntu latest
- **Node Version**: LTS (Long Term Support)
- **Browsers**: Installs all Playwright browsers with dependencies
- **Secrets Management**: Environment variables loaded from GitHub repository secrets
- **Artifacts**: HTML reports uploaded and retained for 30 days
- **Timeout**: 60 minutes maximum execution time

### Workflow File

The workflow is defined in `.github/workflows/playwright.yml` and includes:

1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Install Playwright browsers
5. Create `.env` file from GitHub Secrets
6. Run Playwright tests
7. Upload test reports as artifacts

### Viewing CI/CD Results

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Select the latest workflow run
4. Download the `playwright-report` artifact to view detailed results

## �📈 Reporting

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

Allure report screenshots are saved in the `report/` folder for documentation and sharing purposes.

### Clear Allure Results

To clear previous test results before a fresh run:

```bash
npm run allure:clear
```

## 🎯 Best Practices

This framework follows several best practices:

1. **Page Object Model**: Separates test logic from page implementation
2. **Environment Variables**: Sensitive data stored securely in `.env` (excluded from git)
3. **Test Organization**: Tests grouped using `test.describe` blocks for logical structuring
4. **Multi-Level Grep Tags**: Tests tagged with multiple grep patterns for flexible execution
5. **Cross-Browser Testing**: Configured to run on Chromium, Firefox, and WebKit
6. **CI/CD Ready**: GitHub Actions integration with secure secret management
7. **Waits and Synchronization**: Proper wait strategies using `networkidle` for stable tests
8. **Descriptive Test Names**: Clear test descriptions for better reporting
9. **Modular Structure**: Easy to extend and maintain
10. **Reusable Functions**: Common actions abstracted into page objects
11. **Comprehensive Logging**: Detailed console logs for debugging and traceability

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