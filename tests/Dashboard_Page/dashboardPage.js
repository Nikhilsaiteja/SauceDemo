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
        this.allProducts = this.page.locator("//div[@class='inventory_item']").all();

        //Cart locator
        this.cartIcon = this.page.locator("//a[@class='shopping_cart_link']").first();
    }

}