// for calculating total product price including quantity

export const calculateProductTotal = (item) => {
    if (!item) return "0.00";

    const price = parseFloat(item.Price) || 0;
    
    //BasketItem.Quantity for BasketContentTable || selectedQuantity for AddProductToBasketTable
    const qty = item.BasketItem?.Quantity || item.selectedQuantity || 1;

    const total = price * qty;

    return total.toFixed(2);
};