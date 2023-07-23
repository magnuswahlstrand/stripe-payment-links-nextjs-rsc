import * as React from "react";
import {useEffect, useRef} from "react";
import {Badge} from "@/components/ui/badge";
import {ShoppingCart} from "lucide-react";

type CartButtonProps = {
    totalQuantity: number,
};

export function CartButtonContent(props: CartButtonProps) {
    const ref = useRef<HTMLDivElement>(null)

    const removeSpinAnimation = () => {
        ref.current?.classList.remove('animate-cart-wiggle')
    }

    useEffect(() => {
        ref.current?.classList.add('animate-cart-wiggle')
    }, [props.totalQuantity])

    return (
        <div
            className="text-background flex flex-row items-center gap-2 px-3 py-1"
        >
            <div ref={ref} onAnimationEnd={removeSpinAnimation}>
                <Badge className="text-sm" variant="secondary">{props.totalQuantity}</Badge>
            </div>
            <ShoppingCart className="h-6 w-6 md:h-8 md:w-8"/>
        </div>)
}