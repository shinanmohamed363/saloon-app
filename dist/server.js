"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
require("./types/express");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
if (process.env.MONGODB_URL) {
    mongoose_1.default.connect(process.env.MONGODB_URL);
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}
else {
    console.error('MONGODB_URL is not defined in the environment variables.');
    process.exit(1);
}
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/customers', customer_routes_1.default);
app.use('/api/auth', user_routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
