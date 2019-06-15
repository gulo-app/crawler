import {Crawler} from "./crawler/Crawler";
const node_env = process.env.NODE_ENV;

let run = (urls: string[]): void => {
    let isProd: boolean = !!node_env.match("PROD");

    let crawler = new Crawler(isProd);
    crawler.crawl(urls);
};

run(['https://www.shufersal.co.il/online/he/A', 'https://www.rami-levy.co.il/category/start_buy']);


