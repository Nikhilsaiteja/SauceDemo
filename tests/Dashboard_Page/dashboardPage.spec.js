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