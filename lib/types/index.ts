export type CartItem = {
    id: string;
    name: string;
    quantity: number;
    type: string;
    price: { id: string, amount: number }
    imageUrl: string;
}