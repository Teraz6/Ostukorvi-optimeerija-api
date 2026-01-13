export const calculateTotal = (items) => {
    if (!items || !Array.isArray(items)) return "0.00";
    
    return items.reduce((total, item) => {
        const price = parseFloat(item.Price) || 0;
        const qty = item.BasketItem?.Quantity || 0;
        return total + (price * qty);
    }, 0).toFixed(2);
};