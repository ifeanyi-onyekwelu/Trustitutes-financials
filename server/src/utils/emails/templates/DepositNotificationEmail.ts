const DepositNotificationEmail = (
    fullName: string,
    accountNumber: string,
    amount: number
) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deposit Notification</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
                .highlight { font-weight: bold; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Deposit Notification</h1>
                </div>
                <div class="content">
                    <p>Dear ${fullName},</p>
                    <p>We have received a deposit of <span class="highlight">$${amount.toFixed(
                        2
                    )}</span> into your account.</p>
                    <p>Your account number is: <span class="highlight">${accountNumber}</span></p>
                    <p>Thank you for choosing Trustitutes Financials.</p>
                    <p>If you have any questions or concerns, please contact our support team.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Trustitutes Financials. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default DepositNotificationEmail;
