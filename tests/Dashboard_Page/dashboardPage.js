import {expect} from '@playwright/test';
import { parse } from 'node:path';

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

}