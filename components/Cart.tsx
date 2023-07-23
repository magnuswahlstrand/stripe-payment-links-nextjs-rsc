import * as React from "react"
import {useEffect, useLayoutEffect, useRef, useState} from "react"

import {Button} from "@/components/ui/button"
import {CartItem} from "@/lib/types";
import {ShoppingCart} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {CartRow2} from "@/components/CartRow";

type Props = {
    items: CartItem[]
    onRemoveProduct: (productId: string) => void
    redirectToPayment: (items: CartItem[]) => Promise<void>
}

function OpenCartButtonV2(props: { totalQuantity: number, onToggleCartOpen: () => void }) {
    const ref = useRef<HTMLDivElement>(null)

    const removeSpinAnimation = () => {
        ref.current?.classList.remove('animate-cart-wiggle')
    }

    useEffect(() => {
        ref.current?.classList.add('animate-cart-wiggle')
    }, [props.totalQuantity])

    return (
        <div className="bg-foreground flex flex-row justify-between items-center px-3 pt-1 pb-1">
            <div className="bg-background text-foreground font-medium px-2 py-0 rounded uppercase text-lg">
                Time Bubble
            </div>
            <button
                className="text-background flex flex-row items-center rounded-md gap-2 px-3 py-1"
                onClick={() => props.onToggleCartOpen()}
            >
                <div ref={ref} onAnimationEnd={removeSpinAnimation}>
                    <Badge variant="secondary">{props.totalQuantity}</Badge>
                </div>
                <ShoppingCart className="h-6 w-6"/>
            </button>
        </div>)
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

export default function WrappedCart(props: Props) {
    const [height, setHeight] = useState(0);

    const ref = useRef<HTMLDivElement>(null)
    const [cartOpen, setCartOpen] = React.useState(false)

    useLayoutEffect(() => {
        if (ref.current && ref.current.clientHeight) {
            const height = ref.current.clientHeight;
            setHeight(height);
        }
    }, [props.items])

    const toggleCartOpen = () => setCartOpen(state => !state)

    const totalQuantity = props.items.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = props.items.reduce((total, item) => total + item.quantity * item.price.amount, 0)

    async function action() {
        await props.redirectToPayment(props.items)
    }

    return <div className="flex flex-row justify-center w-full">
        <div className="w-full">
            <OpenCartButtonV2 totalQuantity={totalQuantity} onToggleCartOpen={toggleCartOpen}/>
            <div className={`overflow-hidden transition-max-height duration-300 shadow`} style={{
                maxHeight: cartOpen ? `${height}px` : "0px",
            }}>
                <div className={"p-4"} ref={ref}>
                    {totalQuantity === 0 && <CartEmpty/>}
                    {totalQuantity > 0 && <form action={action}>
                        {/*header */}
                        <h3 className="font-semibold text-xl">Your cart</h3>
                        {/*list*/}
                        <ul>
                            {props.items.map((item) => (
                                <CartRow2
                                    key={item.id} item={item}
                                    onRemoveItem={() => props.onRemoveProduct(item.id)}
                                />
                            ))}
                        </ul>
                        <Subtotal totalPrice={totalPrice}/>
                        {/*go to payment*/}
                        <Button className="mt-4 w-full" type="submit">Checkout</Button>
                    </form>}
                    {/*close checkout*/}
                    <Button className="mt-4 w-full" variant="outline" onClick={() => setCartOpen(false)}>Close</Button>
                </div>
            </div>
            <div className="bg-lime-300 h-1"></div>
            <div className="bg-lime-100 h-1"></div>
        </div>
    </div>
}