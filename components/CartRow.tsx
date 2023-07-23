import {CartItem} from "@/lib/types";
import Image from "next/image";
import {X} from "lucide-react";
import {Input} from "@/components/ui/input";
import * as React from "react";

type CartRowProps = {
    item: CartItem,
    onRemoveItem: () => void
    onChangeQuantity: (quantity: number) => void
};

export function CartRow({item, onRemoveItem, onChangeQuantity}: CartRowProps) {
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
            <div className="flex flex-row justify-between">
                <div className="font-semibold">{item.name}</div>
                <button className="font-medium hover:text-muted-foreground" onClick={onRemoveItem}>
                    <X/>
                </button>
            </div>
            <div className="text-muted-foreground text-xs uppercase">
                {item.type}
            </div>
            <div className="flex flex-row items-center mt-auto gap-2 text-base">
                <Input value={item.quantity} type="number" className="text-center w-16"
                       onChange={(e) => {
                           const quantity = parseInt(e.target.value) | 0
                           onChangeQuantity(quantity > 0 ? quantity : 0)
                       }}
                />
                <div className="text-muted-foreground">
                    {item.quantity > 1 ? <div className="">${item.price.amount} each</div> : null}
                </div>
                <div className="ml-auto font-semibold">${totalAmount}</div>
            </div>
        </div>
    </li>;
}