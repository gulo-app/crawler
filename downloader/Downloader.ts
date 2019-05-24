import request = require('request');

export class Downloader {

    static async downloadHtml(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let html = request(url, function (err, response, body) {
                if(err) return reject(err);
                return resolve(body);
            });
        })
    }
}