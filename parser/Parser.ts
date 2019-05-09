import {ParserUrls} from "./ParserUrls";

export abstract class Parser {
   name: string;
   url: ParserUrls;

   protected constructor(name: string, url: ParserUrls){
      this.name = name;
      this.url = url;
   }


   abstract parse(): void;

   abstract extract(): Array<string>;


}

