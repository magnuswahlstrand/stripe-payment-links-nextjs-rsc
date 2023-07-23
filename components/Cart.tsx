import * as React from "react"
import {useEffect, useLayoutEffect, useRef, useState} from "react"

import {Button} from "@/components/ui/button"
import {CartItem} from "@/lib/types";
import {ShoppingCart} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {CartRow, CartRow2} from "@/components/CartRow";

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
        <div className="bg-foreground flex flex-row justify-between items-center px-3 pt-1">
            <div className="bg-background text-foreground font-medium px-2 py-0 rounded uppercase text-lg">
                Time Bubble
            </div>
            <button
                className="text-background flex flex-row items-center hover:bg-muted-foreground rounded-md gap-2 px-3 py-1"
                onClick={() => props.onToggleCartOpen()}
            >
                <div ref={ref} onAnimationEnd={removeSpinAnimation}>
                    <Badge variant="secondary">
                        {props.totalQuantity}
                    </Badge>
                </div>
                <ShoppingCart className="h-6 w-6"/>
            </button>
        </div>)
}

type CartContentProps = Props & {
    closeCart: () => void
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

function CartContent({items, onRemoveProduct, redirectToPayment, closeCart}: CartContentProps) {
    async function action() {
        await redirectToPayment(items)
    }

    const totalPrice = items.reduce((total, item) => total + item.quantity * item.price.amount, 0)
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)


    if (totalQuantity < 1) {
        return <div className="flex flex-col items-center ">
            <ShoppingCart className="h-8 w-8"/>
            <span className="pt-2 ">
            Your cart is empty
            </span>
        </div>
    }


    return (
        <div className="w-full">
            <ul className={""}>
                {items.map((item) => (
                    <CartRow
                        key={item.id} item={item}
                        onRemoveItem={() => onRemoveProduct(item.id)}
                    />
                ))}
            </ul>
            <div className={"flex flex-col"}>
                <Subtotal totalPrice={totalPrice}/>
                <div className="flex flex-col w-3/4 gap-2">
                    <form className="w-full mt-2 flex justify-center" action={action}>
                        <Button className="w-full" type="submit"
                                disabled={totalQuantity < 1}>Checkout</Button>
                    </form>
                    <Button className="w-full" variant="outline"
                            onClick={closeCart}>Close</Button>
                </div>
            </div>
        </div>
    )
}

export default function WrappedCart(props: Props) {
    const [height, setHeight] = useState(0);

    const ref = useRef<HTMLDivElement>(null)
    const [cartOpen, setCartOpen] = React.useState(false)

    useLayoutEffect(() => {
        if (ref.current && ref.current.clientHeight) {
            const height = ref.current.clientHeight;
            console.log('call', height)
            setHeight(height + 1);
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
            <div className={"py-3 m-5"}>
                <form action={action}>

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
                </form>
                {/*close checkout*/}
                <Button className="mt-4 w-full" variant="outline" onClick={() => setCartOpen(false)}>Close</Button>
            </div>
            <div className="bg-indigo-700 h-6"></div>
            {/*<div className={`overflow-hidden transition-max-height duration-300 border-b-4 border-foreground`} style={{*/}
            {/*    maxHeight: cartOpen ? `${height}px` : "0px",*/}
            {/*}}>*/}
            {/*    <div ref={ref}>*/}
            {/*        <div className={"p-4 border-t-4 border-foreground flex flex-col items-center"}>*/}
            {/*            <div className={"max-w-md w-full"}>*/}
            {/*                <CartContent {...props} closeCart={() => setCartOpen(false)}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </div>
}