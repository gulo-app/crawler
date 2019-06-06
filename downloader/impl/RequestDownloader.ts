import {Downloader} from "../Downloader";
import request = require('request');

export class RequestDownloader extends Downloader{

     async downloadHtml(url: string): Promise<any> {
         return new Promise((resolve, reject) => {
             request(url, function (err, response, body) {
                 if (err) return reject(err);
                 return resolve(body);
             });
         })
     }

}