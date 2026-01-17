import {test,expect} from '@playwright/test';

const loginPage = require('../Login_Page/loginPage');
const dashboardPage = require('../Dashboard_Page/dashboardPage');
const cartPage = require('../Cart_Page/cartPage');

let page;
let LP;
let DP;
let CP;

test.beforeEach(async ({ browser })=>{
    const context = await browser.newContext();
    page = await context.newPage();
    LP = new loginPage(page);
    DP = new dashboardPage(page);
    CP = new cartPage(page);
    await page.goto(process.env.APP_URL);
    await page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
    await LP.loginToApplication(process.env.APP_USERNAME, process.env.APP_PASSWORD);
});

test.afterEach(async ()=>{
    await page.close();
});

test('Verify navigating to cart page from dashboard', async ()=>{
    const products = await DP.getAllProductNames();
    const {name,price} = await DP.addToCartProductByName(products[0]);
    const {totalItems,productNames,productPrices} = await CP.navigateToCartPage();
    expect(totalItems).toBeGreaterThan(0);
    expect(productNames).toContain(name);
    expect(price).toBe(productPrices[name]);
});

test('Verify removing product from cart by name', async ()=>{
    const products = await DP.getAllProductNames();
    await DP.addToCartProductByName(products[0]);
    await CP.navigateToCartPage();
    await CP.removeFromCartProductByName(products[0]);
});

test('Verify navigating back to dashboard page from cart', async ()=>{
    const products = await DP.getAllProductNames();
    await DP.addToCartProductByName(products[3]);
    await CP.navigateToDashboardPageFromCart();
    expect(await DP.dashboardTitle.isVisible()).toBeTruthy();
    expect(await DP.productsText.isVisible()).toBeTruthy();
});

test('Verify checkout process from cart to order confirmation', async ()=>{
    const products = await DP.getAllProductNames();
    await DP.addToCartProductByName(products[2]);
    const {totalItems,productNames,productPrices} = await CP.navigateToCartPage();
    const {overviewTotalItems, overviewProductNames, overviewProductPrices} = await CP.checkoutFromCart('John','Doe','12345');
    expect(overviewTotalItems).toBe(totalItems);
    expect(overviewProductNames).toEqual(productNames);
    expect(overviewProductPrices).toEqual(productPrices);
});

test('Verify finishing checkout process and order confirmation', async ()=>{
    const products = await DP.getAllProductNames();
    await DP.addToCartProductByName(products[2]);
    await DP.addToCartProductByName(products[4]);
    await CP.navigateToCartPage();
    const {finalPrice} = await CP.checkoutFromCart('John','Doe','12345');
    const {totalPrice} = await CP.finishCheckout();
    expect(totalPrice).toBe(finalPrice);
});