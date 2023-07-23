import * as React from "react"
import {useLayoutEffect, useRef, useState} from "react"
import {CartItem} from "@/lib/types";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CartButtonContent} from "@/components/CartButtonContent";
import {Button} from "@/components/ui/button";
import {Foobar} from "@/components/Foobar";

type Props = {
    items: CartItem[]
    onRemoveProduct: (productId: string) => void
    redirectToPayment: (items: CartItem[]) => Promise<void>
}


function Logo() {
    return <div className="bg-background text-foreground font-medium px-2 py-0 rounded uppercase text-lg md:text-5xl">
        Time Bubble
    </div>;
}

export default function WrappedCart(props: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0);
    const [cartOpen, setCartOpen] = React.useState(false)


    useLayoutEffect(() => {
        if (ref.current && ref.current.clientHeight) {
            const height = ref.current.clientHeight;
            setHeight(height);
        }
    }, [props.items])

    const toggleCartOpen = () => setCartOpen(state => !state)

    const totalQuantity = props.items.reduce((total, item) => total + item.quantity, 0)

    async function redirectToPayment() {
        await props.redirectToPayment(props.items)
    }

    return <div className="flex flex-row justify-center w-full">
        <div className="w-full">
            <div className="bg-foreground flex flex-row justify-between items-center px-3 py-1">
                <Logo/>
                <div className="md:hidden">
                    {/*Mobile*/}
                    <button onClick={toggleCartOpen}>
                        <CartButtonContent totalQuantity={totalQuantity}/>
                    </button>
                </div>
                <div className="md:block hidden">
                    {/*Desktop*/}
                    <Popover>
                        <PopoverTrigger><CartButtonContent totalQuantity={totalQuantity}/></PopoverTrigger>
                        <PopoverContent className="w-96 mr-2">
                            <Foobar items={props.items} redirectToPayment={redirectToPayment} onRemoveProduct={props.onRemoveProduct} />
                        </PopoverContent>
                    </Popover>
                    aa
                </div>
            </div>
            <div className={`overflow-hidden transition-max-height duration-300 shadow`} style={{
                maxHeight: cartOpen ? `${height}px` : "0px",
            }}>
                <div ref={ref}>
                    <Foobar items={props.items} redirectToPayment={redirectToPayment} onRemoveProduct={props.onRemoveProduct} />
                    <Button className="mt-4 w-full" variant="outline"
                            onClick={() => setCartOpen(false)}>Close</Button>
                </div>
            </div>
            <div className="bg-lime-300 h-1"></div>
            <div className="bg-lime-100 h-1"></div>
        </div>
    </div>
}