export type CartItem = {
    id: string;
    name: string;
    quantity: number;
    price: { id: string, amount: number }
    imageUrl: string;
}