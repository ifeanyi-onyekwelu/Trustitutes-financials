function formatAmount(amount: number = 0) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default formatAmount;
