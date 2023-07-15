"use  client"
import * as React from "react"


import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {CartItem} from "@/lib/types";
import {redirectToPaymentLink} from "@/lib/actions";

type Props = {
    items: CartItem[]
    onRemoveProduct: (product: CartItem) => void
}

function Cart({items, onRemoveProduct}: Props) {

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Your cart</CardTitle>
                <CardDescription>Items in your cart</CardDescription>
            </CardHeader>
            <CardContent>
                {items.length === 0 ?
                    (<div className="text-center">Your cart is empty</div>)
                    : <ul>
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center">
                                <div>{item.name}</div>
                                <div>{item.quantity}</div>
                                <div onClick={() => onRemoveProduct(item)}>x</div>
                            </li>
                        ))}
                    </ul>
                }
            </CardContent>
            <CardFooter className="flex justify-end">
                <form action={redirectToPaymentLink}>
                    <Button type="submit">Go to payment</Button>
                </form>
            </CardFooter>
        </Card>
    )
}

export default Cart