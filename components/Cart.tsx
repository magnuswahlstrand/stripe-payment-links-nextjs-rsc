import * as React from "react"
import Image from "next/image"

import {Button} from "@/components/ui/button"
import {Card,} from "@/components/ui/card"
import {CartItem} from "@/lib/types";

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

function Cart({items, onRemoveProduct, redirectToPayment}: Props) {
    async function action() {
        await redirectToPayment(items)
    }

    return (
        <Card className="w-[500px]">
            <div className="p-6 pb-0 text-2xl font-semibold tracking-tight">Shopping cart</div>
            <div className="px-6">
                {items.length === 0 ?
                    (<div className="text-center">Your cart is empty</div>)
                    : <ul>
                        {items.map((item) => (
                            <CartItemRow key={item.id} item={item} onRemoveItem={() => onRemoveProduct(item.id)}/>
                        ))}
                    </ul>
                }
            </div>
            <div className="border border-t-1 p-6">
                <div className={"flex flex-col"}>
                    <div className="flex flex-row justify-between">
                        <div className="">Subtotal</div>
                        <div className="">$ 100.00</div>
                    </div>
                    <div className={"text-sm text-muted-foreground"}>Taxes and shipping calculated on checkout.</div>
                    <form className="w-full" action={action}>
                        <Button className="w-full bg-indigo-700 mt-6" type="submit">Checkout</Button>
                    </form>
                </div>
            </div>
        </Card>
    )
}

export default Cart