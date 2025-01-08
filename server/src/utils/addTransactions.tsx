import Transaction from "@/models/Transaction";

// Generate Random Transactions
async function generateRandomTransactions() {
    const transactionTypes = [
        "deposit",
        "withdrawal",
        "bill-payment",
        "transfer",
    ];
    const statuses = ["pending", "succeded", "failed"];

    const transactions = Array.from({ length: 20 }, () => {
        const type =
            transactionTypes[
                Math.floor(Math.random() * transactionTypes.length)
            ];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const amount = Math.floor(Math.random() * 10000) + 100; // Random amount between 100 and 10,000
        const date = new Date(
            2022 + Math.floor(Math.random() * 3), // Random year between 2022-2024
            Math.floor(Math.random() * 12), // Random month
            Math.floor(Math.random() * 28) + 1 // Random day
        );

        return {
            userId: "677ee18b6a55602e13b74e0f",
            fromAccount: type === "transfer" ? `7013138482` : undefined,
            toAccount:
                type === "transfer"
                    ? `ToAcc${Math.floor(Math.random() * 1000)}`
                    : undefined,
            amount,
            status,
            type,
            reference: `REF${Math.floor(Math.random() * 100000)}`,
            description: `${
                type.charAt(0).toUpperCase() + type.slice(1)
            } transaction`,
            date,
        };
    });

    try {
        await Transaction.insertMany(transactions);
        console.log("20 random transactions added successfully!");
    } catch (err) {
        console.error("Error saving transactions:", err);
    }
}

// Run the script
async function run() {
    await generateRandomTransactions();
}

run();
