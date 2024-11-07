import "dotenv/config";
import nodemailer from "nodemailer";
import LoginEmail from "./templates/Login";
import RegisterEmail from "./templates/Register";
import DepositNotificationEmail from "./templates/DepositNotificationEmail";

interface User {
    fullName: string;
    email: string;
}

const ADMIN_EMAIL = "Admin <admin@trustitutesfinancials.com>";

class EmailService {
    transporter: nodemailer.Transporter;

    constructor() {
        // Set up nodemailer transporter with Postmark SMTP settings
        this.transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: "admin@trustitutesfinancials.com",
                pass: "Password7@trustitutesfinancials",
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        try {
            console.log("Sending email....");
            const response = await this.transporter.sendMail({
                from: ADMIN_EMAIL,
                to: to,
                subject: subject,
                html: html,
                text: html.replace(/<[^>]*>/g, ""),
                headers: {
                    "X-PM-Message-Stream": "outbound",
                },
            });
            console.log("Response gotten", response);
        } catch (error) {
            console.error(`Error sending mail: ${JSON.stringify(error)}`);
        }
    }

    async sendLoginEmail(user: any) {
        const template = LoginEmail(`${user.firstName} ${user.lastName}`);
        await this.sendMail(user.email, "New Login Notification", template);
    }

    async sendRegisterEmail(user: any, account: any) {
        const template = RegisterEmail(
            `${user.firstName} ${user.lastName}`,
            account.accountNumber
        );
        await this.sendMail(
            user.email,
            "Welcome to Trustitutes Financials",
            template
        );
    }

    // Transaction Emails
    async sendDepositNotification(user: any, account: any, amount: any) {
        const template = DepositNotificationEmail(
            user.fullName,
            account.accountName,
            amount
        );
        await this.sendMail(user.email, "Deposit Notification", template);
    }
}

export default EmailService;
