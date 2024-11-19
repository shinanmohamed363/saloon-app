"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
            });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.validateSchema = validateSchema;
