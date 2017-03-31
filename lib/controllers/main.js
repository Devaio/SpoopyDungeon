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
var helpers = require("../modules/helpers");
var FunctionUtil = (function () {
    function FunctionUtil() {
    }
    /**
     * Bind all methods on `scope` to that `scope`.
     *
     * Normal fat arrow/lambda functions in TypeScript are simply member functions
     * that replace the value of `this`, with `_this` (a reference to `this` from
     * within the constructor's scope). They're not on the prototype and as such do not
     * support inheritance. So no calling `super.myMethod()` if it's been
     * declared with a `=>`.
     *
     * `FunctionUtil.bindAllMethods( this )` should be called from the base class' constructor.
     * It will bind each method as such that it will always execute using the class scope.
     *
     * Essentially, we should now write class methods without `=>`. When executed,
     * the scope will be preserved and they will importantly continue to support
     * inheritance. Fat arrow/lambda functions (`=>`) are still great when you
     * don't require inheritance, for example, when using anonymous function callbacks.
     *
     * @param scope     Usually, pass the value of `this` from your base class.
     */
    FunctionUtil.bindAllMethods = function (scope) {
        for (var p in scope) {
            // Don't bind if scope[p] is a getter/setter
            var descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(scope), p);
            if (descriptor && (descriptor.get || descriptor.set))
                continue;
            // Only bind if scope[p] is a function that's not already a class member
            // the bound function will be added as a class member, referencing the function on the prototype
            if (!Object.prototype.hasOwnProperty.call(scope, p) && typeof scope[p] == 'function')
                scope[p] = scope[p].bind(scope);
        }
    };
    return FunctionUtil;
}());
var MainController = (function (_super) {
    __extends(MainController, _super);
    function MainController(model) {
        var _this = this;
        _this.model = model;
        FunctionUtil.bindAllMethods(_this);
        return _this;
    }
    MainController.prototype.get = function (req, res, cb) {
        if (req.params.id) {
            this.model.findOne({ _id: req.params.id }, function (err, data) {
                res.send(data);
                cb ? cb(data) : null;
            });
        }
        else {
            var q = helpers.queryBuilder(req);
            this.model.find(q.query).sort(q.sortQuery).exec(function (err, data) {
                res.send(data);
                cb ? cb(data) : null;
            });
        }
    };
    MainController.prototype.upsert = function (req, res, data, cb) {
        var self = this;
        if (req.params.id) {
            var query = { _id: req.params.id };
            this.model.update(query, data, function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
                cb ? cb(data) : null;
            });
        }
        else {
            var newModelInstance = new this.model(data);
            newModelInstance.save(function (err, doc) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(doc);
                }
                cb ? cb(data) : null;
            });
        }
    };
    MainController.prototype.delete = function (req, res, cb) {
        if (req.params.id) {
            this.model.findOneAndUpdate({ _id: req.params.id }, { deleted: true }, function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
                cb ? cb(data) : null;
            });
        }
        else {
            res.send({ error: "Please provide more info" });
        }
    };
    return MainController;
}(FunctionUtil));
exports.MainController = MainController;
