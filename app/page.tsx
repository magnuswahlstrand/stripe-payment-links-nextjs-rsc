"use client"

import Cart from "@/components/Cart";
import {useState} from "react";
import {CartItem} from "@/lib/types";
import {Product, products, Products} from "@/components/Products";

export default function Home() {
    const [items, setItems] = useState<CartItem[]>([
        {id: "prod_OFvGCF45oTstv1", name: "Yiga clan", quantity: 1},
    ])

    const handleAddProduct = (product: Product) => {
        const item = items.find((item) => item.id === product.id)
        if (item) {
            setItems(items.map((item) => {
                if (item.id === product.id) {
                    return {...item, quantity: item.quantity + 1}
                }
                return item
            }))
        } else {
            setItems([...items, {id: product.id, name: product.name, quantity: 1}])
        }
    }

    const handleRemoveCartItem = (item: CartItem) => {
        setItems(items.filter((i) => i.id !== item.id))
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Cart items={items}
                  onRemoveProduct={handleRemoveCartItem}/>
            <Products products={products}
                      onAddProduct={handleAddProduct}/>
        </main>
    )
}
