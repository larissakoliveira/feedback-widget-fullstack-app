"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e9f519ebf9fbe5",
        pass: "cfae859664b45c"
    }
});
class NodemailerMailAdapter {
    async sendMain({ subject, body }) {
        await transport.sendMail({
            from: 'Feedback Team <feedback@team.com>',
            to: 'Larissa Oliveira<oliveir5uwm@gmail.com>',
            subject,
            html: body,
        });
    }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
