"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.listen(8000, () => { console.log("Fut a szerver"); });
let szemelyek = [];
let szemely = {
    id: 1,
    vnev: "Zsuzsa",
    knev: "Ilona",
    kor: 31
};
szemelyek.push(szemely);
app.get('/', (req, res) => {
    res.send("Express Typescript");
});
app.get('/test', (req, res) => {
    res.json({ message: "Express typescript" });
});
app.get("/szemelyek", (req, res) => {
    res.json(szemelyek);
});
