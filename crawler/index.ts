import {Crawler} from "./Crawler";

let run = (urls: string[]): void => {
    let crawler = new Crawler();
    let products = crawler.crawl(urls);
    crawler.update(products);
}

run([ 'https://www.shufersal.co.il/online/he/A']);


//'https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy'