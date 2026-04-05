import {expect} from '@playwright/test';

module.exports = class CartPage{

    constructor(page){
        this.page = page;
        
        this.initilizeLocators();
    }

    initilizeLocators(){

        //Cart locator
        this.cartIcon = this.page.locator('a.shopping_cart_link').first();
        this.cartPageTitle = this.page.locator('span.title').first();
        this.cartItems = this.page.locator('div.cart_item');
        this.cartItemsNames = this.page.locator('div.inventory_item_name');
        this.cartItemsPrices = this.page.locator('div.inventory_item_price');
        this.continueShoppingBtn = this.page.locator('button#continue-shopping').first();

        //Checkout locators
        this.checkoutBtn = this.page.locator('button#checkout').first();
        this.checkoutPageTitle = this.page.locator('span.title').first();
        this.firstNameInput = this.page.locator('input#first-name').first();
        this.lastNameInput = this.page.locator('input#last-name').first();
        this.postalCodeInput = this.page.locator('input#postal-code').first();
        this.continueBtn = this.page.locator('input#continue').first();
        this.cancelBtn = this.page.locator('button#cancel').first();
        this.subTotal = this.page.locator('div.summary_subtotal_label').first();
        this.tax = this.page.locator('div.summary_tax_label').first();

        //Finish locators
        this.finishBtn = this.page.locator('button#finish').first();
        this.total = this.page.locator('div.summary_total_label').first();
        this.orderConfirmationMessage = this.page.locator('h2:has-text("Thank you for your order!")').first();

    }

    getProductRemoveBtnInCartByName(productName){
        return this.page.locator(`//div[normalize-space()='${productName}']/../../div[2]/button`);
    }

    getProductPriceInCartByName(productName){
        return this.page.locator(`//div[normalize-space()='${productName}']/../../div[2]/div`);
    }

    async getAllProductNamesInCart(){
        try{
            console.log('Fetching all product names from the cart.');
            const productNames = await this.cartItemsNames.allTextContents();
            console.log(`Product names in cart fetched: ${productNames}`);
            return productNames;
        }catch(error){
            console.error(`Error in getAllProductNamesInCart: ${error}`);
            throw error;
        }
    }

    async navigateToCartPage(){
        try{
            console.log('Navigating to the cart page.');
            await this.cartIcon.click();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            expect(await this.cartPageTitle.isVisible()).toBeTruthy();
            console.log('Navigated to the cart page successfully.');
            const totalItems = await this.cartItems.count();
            console.log(`Total items in cart: ${totalItems}`);
            const productNames = await this.getAllProductNamesInCart();
            console.log(`Product names in cart: ${productNames}`);
            let cartItemsPrices = {};
            for (const name of productNames) {
                let priceLocator = this.getProductPriceInCartByName(name);
                let price = parseFloat((await priceLocator.textContent()).split('$')[1]);
                cartItemsPrices[name] = price;
            }
            console.log(`Cart items prices: ${JSON.stringify(cartItemsPrices)}`);
            return {
                totalItems: totalItems,
                productNames: productNames,
                productPrices: cartItemsPrices
            };
        }catch(error){
            console.error(`Error in navigateToCartPage: ${error}`);
            throw error;
        }
    }

    async removeFromCartProductByName(productName){
        try{
            console.log(`Removing product from cart: ${productName}`);
            const removeBtn = this.getProductRemoveBtnInCartByName(productName);
            expect(await removeBtn.textContent()).toBe('Remove');
            await removeBtn.click();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            const cartItems = await this.cartItemsNames.allTextContents();
            await expect(cartItems).not.toContain(productName);
            console.log(`Product "${productName}" removed from cart successfully.`);
            return;
        }catch(error){
            console.error(`Error in removeFromCartProductByName: ${error}`);
            throw error;
        }
    }

    async navigateToDashboardPageFromCart(){
        try{
            console.log('Navigating back to the dashboard page from cart.');
            await this.navigateToCartPage();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            await this.continueShoppingBtn.click();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            console.log('Navigated back to the dashboard page successfully.');
            return;
        }catch(error){
            console.error(`Error in navigateToDashboardPageFromCart: ${error}`);
            throw error;
        }
    }

    async checkoutFromCart(firstName,lastName,postalCode,settings={}){
        try{
            console.log('Initiating checkout from cart.');
            const defaultOptions = {
                cancelInFirstStep: false,
                cancelInSecondStep: false,
            }
            const options = {...defaultOptions, ...settings};
            await this.checkoutBtn.click();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            expect(await this.checkoutPageTitle.isVisible()).toBeTruthy();
            console.log('On checkout information page.');
            if(options.cancelInFirstStep){
                console.log('Cancelling checkout in first step.');
                await this.cancelBtn.click();
                await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
                console.log('Checkout cancelled in first step.');
                return;
            }
            await this.firstNameInput.pressSequentially(firstName, {delay: 100});
            await this.lastNameInput.pressSequentially(lastName, {delay: 100});
            await this.postalCodeInput.pressSequentially(postalCode, {delay: 100});
            await this.continueBtn.click();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            console.log('On checkout overview page.');
            if(options.cancelInSecondStep){
                console.log('Cancelling checkout in second step.');
                await this.cancelBtn.click();
                await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
                console.log('Checkout cancelled in second step.');
                return;
            }
            const overviewTotalItems = await this.cartItems.count();
            console.log(`Total items in cart: ${overviewTotalItems}`);
            const overviewProductNames = await this.getAllProductNamesInCart();
            console.log(`Products in checkout overview: ${overviewProductNames}`);
            let overviewProductPrices = {};
            let itemsPrice = 0;
            for (const name of overviewProductNames) {
                let priceLocator = this.getProductPriceInCartByName(name);
                let price = parseFloat((await priceLocator.textContent()).split('$')[1]);
                overviewProductPrices[name] = price;
                itemsPrice += price;
            }
            console.log(`Product prices in checkout overview: ${JSON.stringify(overviewProductPrices)}`);
            const subTotal = parseFloat((await this.subTotal.textContent()).split('$')[1]);
            const tax = parseFloat((await this.tax.textContent()).split('$')[1]);
            console.log(`itemsPrice: ${itemsPrice}, subTotal: ${subTotal}, tax: ${tax}`);
            await expect(subTotal).toBe(itemsPrice);
            const finalPrice = subTotal + tax;
            console.log(`Final price (including tax): ${finalPrice}`);
            console.log('Checkout process completed successfully.');
            return {
                overviewTotalItems,
                overviewProductNames,
                overviewProductPrices,
                finalPrice
            };
        }catch(error){
            console.error(`Error in checkoutFromCart: ${error}`);
            throw error;
        }
    }

    async finishCheckout(){
        try{
            console.log('Finishing checkout process.');
            const totalPrice = parseFloat((await this.total.textContent()).split('$')[1]);
            console.log(`Total price to be paid: ${totalPrice}`);
            await this.finishBtn.click();
            await this.page.waitForLoadState('networkidle',{timeout: process.env.LONG_TIMEOUT});
            expect(await this.orderConfirmationMessage.isVisible()).toBeTruthy();
            console.log('Checkout finished successfully.');
            return {
                totalPrice
            };
        }catch(error){
            console.error(`Error in finishCheckout: ${error}`);
            throw error;
        }
    }

}