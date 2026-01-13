import {expect} from '@playwright/test';

module.exports = class DashboardPage{

    constructor(page){
        this.page = page;

        this.initilizeLocators();
    }

    initilizeLocators(){

        //Title locator
        this.dashboardTitle = this.page.locator("//div[@class='app_logo']").first();
        this.productsText = this.page.locator("//span[@class='title']").first();

        //All products
        this.allProducts = this.page.locator("//div[@class='inventory_item']");
        this.allProductsNames = this.page.locator("//div[@class='inventory_item']/div[2]/div[1]/a/div");
        this.allProductsPrices = this.page.locator("//div[@class='inventory_item']/div[2]/div[2]/div");

        //Product filter button
        this.productFilterBtn = this.page.locator("//select[@class='product_sort_container']").first();

        //Cart locator
        this.cartIcon = this.page.locator("//a[@class='shopping_cart_link']").first();

        //Menu locators
        this.menuBtn = this.page.locator("//button[@id='react-burger-menu-btn']").first();
        this.allItemsBtn = this.page.locator("//a[@id='inventory_sidebar_link']").first();
        this.aboutBtn = this.page.locator("//a[@id='about_sidebar_link']").first();
        this.logoutBtn = this.page.locator("//a[@id='logout_sidebar_link']").first();
        this.resetAppStateBtn = this.page.locator("//a[@id='reset_sidebar_link']").first();
        this.menuCloseBtn = this.page.locator("//button[@id='react-burger-cross-btn']").first();

        //sauce labs title
        this.sauseLabsTitle = this.page.locator("//div[@class='MuiBox-root css-lwb5go']//img[@alt='Saucelabs']").first();

        //login button
        this.loginBtn = this.page.locator("//input[@id='login-button']").first();

    }

    getCartBtnByName(productName){
        return this.page.locator(`//div[normalize-space()='${productName}']/../../../div[2]/button`);
    }

    getProductPriceByName(productName){
        return this.page.locator(`//div[normalize-space()='${productName}']/../../../div[2]/div`);
    }

    async verifyProductsFilters(filter){
        try{
            console.log(`Verifying product filter: ${filter}`);
            await this.productFilterBtn.selectOption(filter);
            await this.page.waitForTimeout(parseInt(process.env.VERY_SHORT_TIMEOUT));
            const productsCount = await this.allProducts.count();
            console.log(`Total products found: ${productsCount}`);

            let productNames = await this.allProductsNames.allTextContents();
            console.log(`Product names: ${productNames}`);
            let productPrices = (await this.allProductsPrices.allTextContents()).map(priceText=>parseFloat(priceText.replace('$','')));
            console.log(`Product prices: ${productPrices}`);

            switch(filter){
                case 'az':
                    let sortedNamesAZ = [...productNames].sort();
                    console.log(`Sorted names A to Z: ${sortedNamesAZ}`);
                    expect(productNames).toEqual(sortedNamesAZ);
                    console.log('Products are sorted A to Z correctly.');
                    return 'success';
                case 'za':
                    let sortedNamesZA = [...productNames].sort().reverse();
                    console.log(`Sorted names Z to A: ${sortedNamesZA}`);
                    expect(productNames).toEqual(sortedNamesZA);
                    console.log('Products are sorted Z to A correctly.');
                    return 'success';
                case 'lohi':
                    let sortedPricesLOHI = [...productPrices].sort((a,b)=>a-b);
                    console.log(`Sorted prices Low to High: ${sortedPricesLOHI}`);
                    expect(productPrices).toEqual(sortedPricesLOHI);
                    console.log('Products are sorted by Price Low to High correctly.');
                    return 'success';
                case 'hilo':
                    let sortedPricesHILO = [...productPrices].sort((a,b)=>b-a);
                    console.log(`Sorted prices High to Low: ${sortedPricesHILO}`);
                    expect(productPrices).toEqual(sortedPricesHILO);
                    console.log('Products are sorted by Price High to Low correctly.');
                    return 'success';
            }

            //Wait for products to be updated
            await this.page.waitForTimeout(3000);
        }catch(error){
            console.error(`Error in verifyProductsFilters: ${error}`);
            throw error;
        }
    }

    async verifyMenuButtons(button){
        try{
            console.log('Verifying menu buttons functionality');
            await this.menuBtn.click();
            await this.page.waitForTimeout(parseInt(process.env.VERY_SHORT_TIMEOUT));
            await expect(this.allItemsBtn).toBeVisible();
            await expect(this.aboutBtn).toBeVisible();
            await expect(this.logoutBtn).toBeVisible();
            await expect(this.resetAppStateBtn).toBeVisible();
            console.log('All menu buttons are visible.');
            console.log(`Clicking on menu button: ${button}`);
            switch(button){
                case 'All Items':
                    await this.allItemsBtn.click();
                    await this.page.waitForTimeout(parseInt(process.env.VERY_SHORT_TIMEOUT));
                    expect(await this.productsText.isVisible()).toBeTruthy();
                    console.log('All Items button is working correctly.');
                    await this.menuCloseBtn.click();
                    await this.page.waitForTimeout(parseInt(process.env.VERY_SHORT_TIMEOUT));
                    await expect(this.menuBtn).toBeVisible();
                    expect(await this.allItemsBtn.isVisible()).toBeFalsy();
                    expect(await this.aboutBtn.isVisible()).toBeFalsy();
                    expect(await this.logoutBtn.isVisible()).toBeFalsy();
                    expect(await this.resetAppStateBtn.isVisible()).toBeFalsy();
                    console.log('Menu closed successfully.');
                    return 'success';
                case 'About':
                    await this.aboutBtn.click();
                    await this.page.waitForTimeout(parseInt(process.env.TIMEOUT));
                    const currentUrl = this.page.url();
                    console.log(`Navigated to: ${currentUrl}`);
                    expect(currentUrl).toContain('saucelabs.com');
                    console.log('About button is working correctly - navigated to Sauce Labs website.');
                    expect(await this.sauseLabsTitle.isVisible()).toBeTruthy();
                    console.log('Sauce Labs title is visible on the About page.');
                    return 'success';
                case 'Logout':
                    await this.logoutBtn.click();
                    await this.page.waitForTimeout(parseInt(process.env.VERY_SHORT_TIMEOUT));
                    expect(await this.loginBtn.isVisible()).toBeTruthy();
                    console.log('Logout button is working correctly.');
                    return 'success';
                case 'Reset App State':
                    await this.resetAppStateBtn.click();
                    await this.page.waitForTimeout(parseInt(process.env.VERY_SHORT_TIMEOUT));
                    expect(await this.productsText.isVisible()).toBeTruthy();
                    console.log('Reset App State button is working correctly.');
                    await this.menuCloseBtn.click();
                    await this.page.waitForTimeout(parseInt(process.env.VERY_SHORT_TIMEOUT));
                    await expect(this.menuBtn).toBeVisible();
                    expect(await this.allItemsBtn.isVisible()).toBeFalsy();
                    expect(await this.aboutBtn.isVisible()).toBeFalsy();
                    expect(await this.logoutBtn.isVisible()).toBeFalsy();
                    expect(await this.resetAppStateBtn.isVisible()).toBeFalsy();
                    console.log('Menu closed successfully.');
                    return 'success';
            }
        }catch(error){
            console.error(`Error in verifyMenuButtons: ${error}`);
            throw error;
        }
    }

    async getAllProductNames(){
        try{
            console.log('Fetching all product names from the dashboard.');
            const productNames = await this.allProductsNames.allTextContents();
            console.log(`Product names fetched: ${productNames}`);
            return productNames;
        }catch(error){
            console.error(`Error in getAllProductsNames: ${error}`);
            throw error;
        }
    }

    async addToCartProductByName(productName){
        try{
            console.log(`Adding product to cart: ${productName}`);
            const cartBtn = this.getCartBtnByName(productName);
            expect(await cartBtn.textContent()).toBe('Add to cart');
            const productPriceLocator = this.getProductPriceByName(productName);
            const productPrice = parseFloat((await productPriceLocator.textContent()).split('$')[1]);
            console.log(`Product price on dashboard: ${productPrice}`);
            await cartBtn.click();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            expect(await cartBtn.textContent()).toBe('Remove');
            const cartIconCount = parseInt(await this.cartIcon.textContent());
            console.log(`Cart icon count after adding product: ${cartIconCount}`);
            expect(cartIconCount).toBeGreaterThan(0);
            console.log(`Product "${productName}" added to cart successfully.`);
            return {
                name: productName,
                price: productPrice,
                message: 'Success'
            }
        }catch(error){
            console.error(`Error in addToCartProductByName: ${error}`);
            throw error;
        }
    }

}