import {Downloader} from "../Downloader";
var webdriver = require("selenium-webdriver");

export class SeleniumDownloader extends Downloader{

    async downloadHtml(url: string) {
        //let op = webdriver.ChromeOptions();
        //op.add_argument('headless');
        //driver = webdriver.Chrome(options=op)
        let driver = await new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        await driver.get(url);
        let html = driver.executeScript("return document.getElementsByTagName('html')[0].innerHTML");
        return html;
    }

}
