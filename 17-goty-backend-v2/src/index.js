"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
        f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

    function verb(n) { return function(v) { return step([n, v]); }; }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return { value: op[1], done: false };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
                        t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2];
                        _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e];
            y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://goty-project.firebaseio.com"
});
var db = admin.firestore();
var app = express();
var port = process.env.PORT || 8000;
app.use(cors({ origin: true }));
app.set('port', port);
app.get('/', function(req, res) {
    res.json({
        message: 'Root'
    });
});
app.get('/goty', function(req, res) {
    return __awaiter(void 0, void 0, void 0, function() {
        var gamesRef, snapshot, gamesList;
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    gamesRef = db.collection('goty');
                    return [4 /*yield*/ , gamesRef.get()];
                case 1:
                    snapshot = _a.sent();
                    gamesList = snapshot.docs.map(function(game) { return game.data(); });
                    res.json(gamesList);
                    return [2 /*return*/ ];
            }
        });
    });
});
app.get('/goty/:id', function(req, res) {
    return __awaiter(void 0, void 0, void 0, function() {
        var gameId, gameRef, snapshot;
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    gameId = req.params.id;
                    gameRef = db.collection('goty').doc(gameId);
                    return [4 /*yield*/ , gameRef.get()];
                case 1:
                    snapshot = _a.sent();
                    if (!snapshot.exists) {
                        res.status(404).json({
                            ok: false,
                            message: "Cannot find game with ID (" + gameId + ")"
                        });
                    } else {
                        res.json(snapshot.data());
                    }
                    return [2 /*return*/ ];
            }
        });
    });
});
app.post('/goty/:id', function(req, res) {
    return __awaiter(void 0, void 0, void 0, function() {
        var gameId, gameRef, snapshot, votosAnteriores;
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    gameId = req.params.id;
                    gameRef = db.collection('goty').doc(gameId);
                    return [4 /*yield*/ , gameRef.get()];
                case 1:
                    snapshot = _a.sent();
                    if (!!snapshot.exists) return [3 /*break*/ , 2];
                    res.status(404).json({
                        ok: false,
                        message: "Cannot find game with ID (" + gameId + ")"
                    });
                    return [3 /*break*/ , 4];
                case 2:
                    votosAnteriores = snapshot.data().votos;
                    return [4 /*yield*/ , gameRef.update({
                        votos: votosAnteriores + 1
                    })];
                case 3:
                    _a.sent();
                    res.json({
                        ok: true,
                        message: "Gracias por votar a " + snapshot.data().name
                    });
                    _a.label = 4;
                case 4:
                    return [2 /*return*/ ];
            }
        });
    });
});
app.listen(port, function() { return console.log("Escuchando en puerto " + port); });