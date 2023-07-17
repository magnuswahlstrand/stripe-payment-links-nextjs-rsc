import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import * as React from "react";

export type Product = {
    id: string
    name: string
    price: {
        id: string,
        amount: number,
    }
    description: string
}


export function Products({products, onAddProduct}: {
    products: Product[]
    onAddProduct: (product: Product) => void
}) {
    return <div
        className={"gap-4 md:max-w-3xl sm:max-w-md max-w-min mt-8 grid grid-cols-fill-12"}>
        {products.map((product) => (
            <div>
                <div className={"relative overflow-hidden bg-slate-100 rounded"}>
                    <img src="http://placekitten.com/500/500" alt="poster"
                         className="w-full scale-75 hover:scale-100 transition transition-150"/>
                </div>
                <h2 className={"text-sm mt-1"}>{product.name}</h2>
                <h2 className={"text-xs font-light  mt-1"}>By Magnus</h2>
                <div className="pt-3 flex flex-row justify-between items-center">
                    From ${product.price.amount}
                    <Button className="rounded-full" variant="outline"

                        onClick={() => onAddProduct(product)}>
                        <ShoppingCart className=""/>
                    </Button>
                </div>
            </div>
        ))}
    </div>;
}