import * as React from "react";
import {CartRow2} from "@/components/CartRow";
import {ShoppingCart} from "lucide-react";
import {CartItem} from "@/lib/types";
import {GoToCheckout2} from "@/components/GoToCheckoutButton";

type CartListProps = {
    items: CartItem[]
    onRemoveProduct: (productId: string) => void
    redirectToPayment: () => Promise<void>
    closeButton: React.ReactNode,
};

export function CartList({items, redirectToPayment, onRemoveProduct, closeButton}: CartListProps) {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = items.reduce((total, item) => total + item.quantity * item.price.amount, 0)

    return <div className={"p-4"}>
        {totalQuantity === 0 && <CartEmpty/>}
        {totalQuantity > 0 && <form action={redirectToPayment}>
            {/*header */}
            <h3 className="font-semibold text-xl">Your cart</h3>
            {/*list*/}
            <ul>
                {items.map((item) => (
                    <CartRow2
                        key={item.id} item={item}
                        onRemoveItem={() => onRemoveProduct(item.id)}
                    />
                ))}
            </ul>
            <Subtotal totalPrice={totalPrice}/>
            {/*go to payment*/}
            <GoToCheckout2/>
        </form>}
        {/*close checkout*/}
        {closeButton}
    </div>
}


function Subtotal(props: { totalPrice: number }) {
    return <>
        <div className="pt-4 flex flex-row justify-between font-bold">
            <div className="">Subtotal</div>
            <div className="">${props.totalPrice}</div>
        </div>
        <div className={"pt-2 text-sm"}>Taxes and shipping calculated on checkout.</div>
    </>;
}

function CartEmpty() {
    return <div className="flex flex-col items-center">
        <ShoppingCart className="h-8 w-8" fill="black"/>
        <span className="mt-2 font-semibold">
            Your cart is empty
            </span>
    </div>;
}