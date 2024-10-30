const generateRandomAccountNumber = (): string => {
    const characters = "0123456789";
    let accountNumber = "";

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        accountNumber += characters[randomIndex];
    }

    return accountNumber;
};

export default generateRandomAccountNumber;
