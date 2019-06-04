"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("../Parser");
var YenotBitanParser = /** @class */ (function (_super) {
    __extends(YenotBitanParser, _super);
    function YenotBitanParser() {
        return _super.call(this) || this;
    }
    YenotBitanParser.prototype.extractUrls = function (url, $) {
        return undefined;
    };
    YenotBitanParser.prototype.parse = function (url, $, updateMode, productsId) {
        return undefined;
    };
    return YenotBitanParser;
}(Parser_1.Parser));
exports.YenotBitanParser = YenotBitanParser;
//# sourceMappingURL=YenotBitanParser.js.map