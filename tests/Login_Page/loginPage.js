import {expect} from '@playwright/test';

const dashboardPage = require('../Dashboard_Page/dashboardPage');

module.exports = class loginPage{
    
    constructor(page){
        this.page = page;

        this.DP = new dashboardPage(this.page);

        this.initilizeLocators();
    }

    initilizeLocators(){

        //title locator
        this.titleText = this.page.locator("//div[@class='login_logo']").first();

        //login locators
        this.usernameInput = this.page.locator("//input[@id='user-name']").first();
        this.passwordInput = this.page.locator("//input[@id='password']").first();
        this.loginBtn = this.page.locator("//input[@id='login-button']").first();

        //login error
        this.loginError = this.page.locator("//h3[@data-test='error']").first();

    }

    async loginToApplication(username, password){
        try{
            console.log(`Logging in with username: ${username} and password: ${password}`);
            await expect(this.titleText).toBeVisible({timeout: parseInt(process.env.SHORT_TIMEOUT)});
            console.log('Title text is visible on login page');
            await this.usernameInput.pressSequentially(username, {delay: 100});
            await this.passwordInput.pressSequentially(password, {delay: 100});
            await this.loginBtn.click();
            const errorVisible = await this.loginError.isVisible();
            if(errorVisible){
                const errorText = await this.loginError.textContent();
                console.log(`Login failed with error: ${errorText.trim()}`);
                return errorText.trim();
            }
            await expect(this.DP.dashboardTitle).toBeVisible({timeout: parseInt(process.env.SHORT_TIMEOUT)});
            await expect(this.DP.cartIcon).toBeVisible({timeout: parseInt(process.env.SHORT_TIMEOUT)});
            console.log('Login successful, dashboard page is visible');
            return 'success';
        }catch(error){
            console.error(`Error in loginToApplication: ${error}`);
            throw error;
        }
    }
    
}