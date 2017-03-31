"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var Characters = require("../controllers/characters");
var Accounts = require("../controllers/accounts");
var ApiRoutes = (function (_super) {
    __extends(ApiRoutes, _super);
    function ApiRoutes() {
        return _super.call(this) || this;
    }
    ApiRoutes.create = function (router) {
        //log
        console.log("[ApiRoutes::create] Creating api routes.");
        router.get('/api/me', function (req, res) {
            res.send({ user: req.user });
        });
        router.get('/api/me', function (req, res) {
            res.send(req.session);
        });
        router.get('/api/users', Accounts.get);
        router.get('/api/users/:id', Accounts.get);
        router.post('/api/users', Accounts.upsert);
        router.post('/api/users/:id', Accounts.upsert);
        // Char Routes
        router.get('/api/chars', Characters.get);
        router.get('/api/chars/:id', Characters.get);
        router.post('/api/chars', Characters.upsert);
        router.post('/api/chars/:id', Characters.upsert);
    };
    return ApiRoutes;
}(route_1.BaseRoute));
exports.ApiRoutes = ApiRoutes;
