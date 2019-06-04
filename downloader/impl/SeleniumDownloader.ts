import {Downloader} from "../Downloader";
var webdriver = require("selenium-webdriver");

export class SeleniumDownloader extends Downloader{

    async downloadHtml(url: string) {
        let driver = new webdriver.Builder().forBrowser('chrome').build();
        await driver.get(url);
        let html = driver.executeScript("return document.getElementsByTagName('html')[0].innerHTML");
        return html;
    }

}
