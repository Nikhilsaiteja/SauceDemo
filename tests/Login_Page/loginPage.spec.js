import {test,expect} from '@playwright/test';
const loginPage = require('./loginPage');
const dashboardPage = require('../Dashboard_Page/dashboardPage');

let page;
let LP;
let DP;

test.beforeEach(async ({browser})=>{
    const context = await browser.newContext();
    page = await context.newPage();
    LP = new loginPage(page);
    DP = new dashboardPage(page);
    await page.goto(process.env.APP_URL);
    await page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
});

test.afterEach(async ()=>{
    await page.close();
});

test('Login with valid credentials@login', async()=>{
    const loginResult = await LP.loginToApplication(process.env.APP_USERNAME, process.env.APP_PASSWORD);
    expect(loginResult).toBe('success');
    await expect(DP.dashboardTitle).toBeVisible({timeout: parseInt(process.env.SHORT_TIMEOUT)});
    console.log('Dashboard title is visible after login');
    await expect(DP.cartIcon).toBeVisible({timeout: parseInt(process.env.SHORT_TIMEOUT)});
    console.log('Cart icon is visible on dashboard page after login');
});

test('Login with invalid credentials@login', async()=>{
    const loginResult = await LP.loginToApplication("UserName", "Password");
    expect(loginResult).toContain('Username and password do not match any user in this service');
});