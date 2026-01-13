import {test,expect} from '@playwright/test';

const loginPage = require('../Login_Page/loginPage');
const dashboardPage = require('../Dashboard_Page/dashboardPage');

let page;
let LP;
let DP;

test.beforeEach(async ({ browser })=>{
    const context = await browser.newContext();
    page = await context.newPage();
    LP = new loginPage(page);
    DP = new dashboardPage(page);
    await page.goto(process.env.APP_URL);
    await page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
    await LP.loginToApplication(process.env.APP_USERNAME, process.env.APP_PASSWORD);
});

test.afterEach(async ()=>{
    await page.close();
});

test('Verify product filter: Names (A to Z)', async ()=>{
    await DP.verifyProductsFilters('az');
});

test('Verify product filter: Names (Z to A)', async ()=>{
    await DP.verifyProductsFilters('za');
});

test('Verify product filter: Price (low to high)', async ()=>{
    await DP.verifyProductsFilters('lohi');
});

test('Verify product filter: Price (high to low)', async ()=>{
    await DP.verifyProductsFilters('hilo');
});

test('Verify All Items Menu button', async ()=>{
    await DP.verifyMenuButtons('All Items');
});

test('Verify About Menu button', async ()=>{
    await DP.verifyMenuButtons('About');
});

test('Verify Logout Menu button', async ()=>{
    await DP.verifyMenuButtons('Logout');
});

test('Verify Reset App State Menu button', async ()=>{
    await DP.verifyMenuButtons('Reset App State');
});

test('Verify adding product to cart by name', async ()=>{
    const products = await DP.getAllProductNames();
    await DP.addToCartProductByName(products[0]);
});

test('Verify navigating to cart page from dashboard', async ()=>{
    const products = await DP.getAllProductNames();
    const {name,price,message} = await DP.addToCartProductByName(products[0]);
    const {totalItems,productNames,productPrices,message:cartMessage} = await DP.navigateToCartPage();
    expect(totalItems).toBeGreaterThan(0);
    expect(productNames).toContain(name);
    expect(price).toBe(productPrices[name]);
});

test('Verify removing product from cart by name', async ()=>{
    const products = await DP.getAllProductNames();
    await DP.addToCartProductByName(products[0]);
    await DP.navigateToCartPage();
    await DP.removeFromCartProductByName(products[0]);
});

test.only('Verify navigating back to dashboard page from cart', async ()=>{
    const products = await DP.getAllProductNames();
    await DP.addToCartProductByName(products[3]);
    await DP.navigateToDashboardPageFromCart();
});