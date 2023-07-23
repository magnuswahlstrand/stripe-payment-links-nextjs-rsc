import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import * as React from "react";
import Image from "next/image";

export type Product = {
    id: string
    name: string
    price: {
        id: string,
        amount: number,
    }
    description: string
    imageUrl: string
}


export function Products({products, onAddProduct}: {
    products: Product[]
    onAddProduct: (product: Product) => void
}) {
    return <div
        className={"gap-4 md:max-w-3xl max-w-full mt-8 grid grid-cols-fill-14"}>
        {products.map((product) => (
            <div className="border border-1 rounded" key={product.id}>
                <div className={"relative overflow-hidden bg-stone-100 rounded"}>
                    <Image
                        src={product.imageUrl}
                        alt="poster"
                        width={100}
                        height={100}
                        className="w-full sm:scale-75 hover:scale-100 transition duration-300"
                    />
                </div>
                <div className="p-2">
                    <h2 className={"text-sm mt-1"}>{product.name}</h2>
                    <h2 className={"text-xs font-light mt-1 uppercase text-muted-foreground"}>{product.description}</h2>
                    <div className="pt-3 flex flex-row justify-between items-end">
                        From ${product.price.amount}
                        <Button className="rounded-full active:bg-muted-foreground active:text-background transition"
                                variant="outline"
                                size="sm"
                                onClick={() => onAddProduct(product)}>
                            <ShoppingCart className="w-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        ))}
    </div>;
}