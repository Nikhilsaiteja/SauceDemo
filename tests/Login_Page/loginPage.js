import {expect} from '@playwright/test';
require ('dotenv').config();

module.exports = class LoginPage{
    
    constructor(page){
        this.page = page;

        this.initilizeLocators();
    }

    initilizeLocators(){

        //title locator
        this.titleText = this.page.locator("//div[@class='login_logo']").first();

        //login locators
        this.usernameInput = this.page.locator("//input[@id='user-name']").first();
        this.passwordInput = this.page.locator("//input[@id='password']").first();
        this.loginBtn = this.page.locator("//input[@id='login-button']").first();

    }

    async loginToApplication(username, password){
        try{
            await expect(this.titleText).toBeVisible({timeout: process.env.SHORT_TIMEOUT});
            await this.usernameInput.keyboard.type(username, {delay: 100});
            await this.passwordInput.keyboard.type(password, {delay: 100});
            await this.loginBtn.click();
        }catch(error){
            console.error(`Error in loginToApplication: ${error}`);
            throw error;
        }
    }
}