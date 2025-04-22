"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_js_1 = __importDefault(require("../config/connection.js"));
const index_js_1 = require("../models/index.js");
const cleanDB_js_1 = __importDefault(require("./cleanDB.js"));
const data_js_1 = require("./data.js");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connection_js_1.default)();
            yield (0, cleanDB_js_1.default)();
            // Add thoughts to the collection and await the results
            const thoughts = yield index_js_1.Thought.insertMany(data_js_1.thoughtData);
            // Add users to the collection and await the results
            yield index_js_1.User.insertMany(data_js_1.userData);
            // Log out the seed data to indicate what should appear in the database
            console.table(thoughts);
            console.info('Seeding complete! 🌱');
            process.exit(0);
        }
        catch (error) {
            console.error('Error seeding database:', error);
            process.exit(1);
        }
    });
}
