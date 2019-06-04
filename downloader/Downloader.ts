export abstract class Downloader {

    /**
     * download html of a given url and return body.
     * @param url
     */
    abstract async downloadHtml(url: string);

}
