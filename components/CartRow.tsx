import {CartItem} from "@/lib/types";
import Image from "next/image";
import {X} from "lucide-react";
import {Input} from "@/components/ui/input";
import * as React from "react";

export function CartRow(props: { item: CartItem, onRemoveItem: () => void }) {
    const {item, onRemoveItem} = props

    const totalAmount = item.price.amount * item.quantity

    return <li
        key={item.id}
        className="border-t first:border-t-0  py-5 flex flex-row">
        <Image
            src={item.imageUrl}
            className="w-24 h-24 rounded-sm object-cover border-1"
            width="100"
            height="100"
            alt={"product image"}/>
        <div className="flex flex-col flex-1 pl-2 text-sm">
            <div className="flex flex-row justify-between text-base">
                <div className="">{item.name}</div>
                <button className="font-medium hover:text-muted-foreground" onClick={onRemoveItem}>
                    <X/>
                </button>
            </div>
            <div className="flex flex-row justify-between">
                <div className="text-muted-foreground">Poster</div>
            </div>
            <div className="flex flex-row justify-between mt-auto">
                <Input value={item.quantity} type="number" className="w-8"/>
                <div className="text-muted-foreground">Qty {item.quantity}
                    {item.quantity > 1 ? <div className="text-muted-foreground">${item.price.amount} each</div> : null}
                </div>
                <div className="">${totalAmount}</div>
            </div>
        </div>
    </li>;
}


export function CartRow2({item, onRemoveItem}: { item: CartItem, onRemoveItem: () => void }) {
    const totalAmount = item.price.amount * item.quantity

    return <li
        key={item.id}
        className="border-b py-4 flex flex-row gap-3">
        <Image
            src={item.imageUrl}
            className="w-24 h-24 rounded-sm object-cover border-1"
            width="100"
            height="100"
            alt={"product image"}/>
        <div className="flex flex-col flex-1">
            <div className="flex flex-row justify-between text-base">
                <div className="font-semibold">{item.name}</div>
                <button className="font-medium hover:text-muted-foreground" onClick={onRemoveItem}>
                    <X/>
                </button>
            </div>
            <div className="text-muted-foreground text-xs uppercase">
                Poster
            </div>
            <div className="flex flex-row items-center mt-auto gap-2">
                <Input value={item.quantity} disabled type="number" className="w-12 h-8 text-center text-base"/>
                <div className="text-muted-foreground">
                    {item.quantity > 1 ? <div className="">${item.price.amount} each</div> : null}
                </div>
                <div className="ml-auto font-semibold">${totalAmount}</div>
            </div>
        </div>
    </li>;
}