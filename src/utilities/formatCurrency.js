
const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, { style: "currency", currency: "PLN" })

const formatCurrency = (number) => {
    return CURRENCY_FORMATER.format(number);
}

export default formatCurrency;