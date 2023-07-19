import * as React from "react"
import {useEffect, useRef} from "react"
import Image from "next/image"

import {Button} from "@/components/ui/button"
import {CartItem} from "@/lib/types";
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import {ShoppingCart} from "lucide-react";
import {Badge} from "@/components/ui/badge";

type Props = {
    items: CartItem[]
    onRemoveProduct: (productId: string) => void
    redirectToPayment: (items: CartItem[]) => Promise<void>
}

function CartItemRow(props: { item: CartItem, onRemoveItem: () => void }) {
    const {item, onRemoveItem} = props

    return <li
        key={item.id}
        className="border-t first:border-t-0  pt-5 pb-5 flex flex-row">
        <Image
            src={item.imageUrl}
            className="w-24 h-24 rounded-sm object-cover border-1"
            objectFit="cover"
            width="100"
            height="100"
            alt={"product image"}/>
        <div className="flex flex-col flex-1 pl-2 text-sm">
            <div className="flex flex-row justify-between text-base">
                <div className="">{item.name}</div>
                <div className="">${item.quantity * item.price.amount}</div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="text-muted-foreground">Poster</div>
                {item.quantity > 1 ? <div className="text-muted-foreground">${item.price.amount} each</div> : null}
            </div>
            <div className="flex flex-row justify-between mt-auto">
                <div className="text-muted-foreground">Qty {item.quantity}</div>
                <button className="font-medium text-indigo-700 hover:text-indigo-400" onClick={onRemoveItem}>Remove
                </button>
            </div>
        </div>
    </li>;
}

export function useFirstRender() {
    const firstRender = useRef(true);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    return firstRender.current;
}

function OpenCartButton(props: { totalQuantity: number }) {
    const ref = useRef<HTMLDivElement>(null)

    console.log('rendering open cart button', props.totalQuantity)

    const removeSpinAnimation = () => {
        ref.current?.classList.remove('animate-cart-wiggle')
        console.log('animation removed')
    }

    useEffect(() => {
        ref.current?.classList.add('animate-cart-wiggle')
        console.log('animation added')
    }, [props.totalQuantity])

    return <SheetTrigger asChild>
        <div>

            <Button variant="ghost" className="py-0 w-full flex-row justify-end items-center">
                <div className="" ref={ref} onAnimationEnd={removeSpinAnimation}>
                    <Badge>
                        {props.totalQuantity}
                    </Badge>
                </div>
                <ShoppingCart className="m-2 h-6 w-6"/> Cart
            </Button>
        </div>
    </SheetTrigger>;
}

function CartContent({items, onRemoveProduct, redirectToPayment}: Props) {
    async function action() {
        await redirectToPayment(items)
    }

    const totalPrice = items.reduce((total, item) => total + item.quantity * item.price.amount, 0)
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)

    if (totalQuantity < 1) {
        return <div className="text-sm text-muted-foreground flex justify-center">
            Your cart is empty
        </div>
    }

    return (
        <div className="flex flex-col justify-stretch items-center">
            <div className="p-4">
                <ul className={""}>
                    {items.map((item) => (
                        <CartItemRow key={item.id} item={item}
                                     onRemoveItem={() => onRemoveProduct(item.id)}/>
                    ))}
                </ul>
                <div className={"flex flex-col"}>
                    <div className="flex flex-row justify-between">
                        <div className="">Subtotal</div>
                        <div className="">${totalPrice}</div>
                    </div>
                    <div className={"text-sm text-muted-foreground"}>Taxes and shipping calculated on checkout.
                    </div>
                    <form className="w-full" action={action}>
                        <Button className="w-full bg-indigo-700 mt-6" type="submit"
                                disabled={totalQuantity < 1}>Checkout</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function WrappedCart(props: Props) {
    const totalQuantity = props.items.reduce((total, item) => total + item.quantity, 0)

    return <div className="flex flex-row justify-center">
        <div className="w-96 px-6 z-[100]">
            <Sheet>
                <OpenCartButton totalQuantity={totalQuantity}/>
                <SheetContent side="top" className="mt-10 flex justify-center">
                    <div className="flex flex-col w-96">
                        <div className="font-semibold flex justify-center">
                            Shopping Cart
                        </div>
                        <CartContent {...props}/>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </div>
}