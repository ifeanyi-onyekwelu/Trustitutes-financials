const RegisterEmail = (fullName: string, accountNumber: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Trustitutes Financials!</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
                .btn { display: block; padding: 10px; background-color: #333; color: #fff; text-decoration: none; border-radius: 2px; text-align: center; font-size: 2.5rem; font-weight: bold;}
                .highlight { font-weight: bold; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome, ${fullName}!</h1>
                </div>
                <div class="content">
                    <p>Thank you for registering with Trustitutes Financials. We are excited to have you join us!</p>
                    <p>Your account number is: <span class="highlight">${accountNumber}</span></p>
                    <p>To complete your registration, please verify your email address by copying the code below:</p>
                    <p class="highlight" style="font-size: 1.2em;">[Verification Code]</p>
                    <p>If you did not create this account, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Trustitutes Financials. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default RegisterEmail;
