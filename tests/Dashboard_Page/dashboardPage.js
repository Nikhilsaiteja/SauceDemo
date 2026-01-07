import {expect} from '@playwright/test';
require('dotenv').config();

module.exports = class DashboardPage{

    constructor(page){
        this.page = page;

        this.initilizeLocators();
    }

    initilizeLocators(){

        //Title locator

    }

}