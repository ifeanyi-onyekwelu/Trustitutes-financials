const LoginEmail = (fullName: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Our Service!</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 {color: #333;}
                .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
               <div class="header">
                    <h1>Dear, ${fullName}!</h1>
                </div>
                <div class="content">
                    <p>Thank you for logging in to your account! We're excited to have you back.</p>
                    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                    <p>Enjoy exploring your dashboard and all the features we offer!</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Trustitutes Financials. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default LoginEmail;
