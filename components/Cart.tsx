import * as React from "react"
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

    return <li className="border-t first:border-t-0  pt-5 pb-5 flex flex-row">
        <Image
            src="http://placekitten.com/150/150"
            className="w-24 h-24 rounded-sm object-cover border-1"
            objectFit="cover"
            width="100"
            height="100"
            alt={"product image"}/>
        <div className="flex flex-col flex-1 pl-3 text-sm">
            <div className="flex flex-row justify-between text-base">
                <div className="">{item.name}</div>
                <div className="">$ 100.00</div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="text-muted-foreground">Poster</div>
            </div>
            <div className="flex flex-row justify-between mt-auto">
                <div className="text-muted-foreground">Qty {item.quantity}</div>
                <button className="font-medium text-indigo-700 hover:text-indigo-400" onClick={onRemoveItem}>Remove
                </button>
            </div>
        </div>
    </li>;
}


function OpenCartButton(props: { totalQuantity: number }) {
    return <SheetTrigger asChild>
        <Button variant="ghost" className="py-0 w-full flex-row justify-end items-center">
            <Badge>{props.totalQuantity}</Badge>
            <ShoppingCart className="m-2 h-6 w-6"/> Cart
        </Button>
    </SheetTrigger>;
}

function CartContent({items, onRemoveProduct, redirectToPayment}: Props) {
    async function action() {
        await redirectToPayment(items)
    }

    const totalPrice = items.reduce((total, item) => total + item.quantity * 100, 0)
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)

    if (totalQuantity < 1) {
        return <div className="text-sm text-muted-foreground flex justify-center">
            Your cart is empty
        </div>
    }

    return (
        <div className="flex flex-col items-center w-96">
            <div className="px-6">
                <ul>
                    {items.map((item) => (
                        <CartItemRow key={item.id} item={item}
                                     onRemoveItem={() => onRemoveProduct(item.id)}/>
                    ))}
                </ul>
            </div>
            <div className="p-6">
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