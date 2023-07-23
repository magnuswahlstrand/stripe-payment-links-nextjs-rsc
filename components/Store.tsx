"use client"

import Cart from "@/components/Cart";
import {useReducer} from "react";
import {CartItem} from "@/lib/types";
import {Product, Products} from "@/components/Products";

type Props = {
    products: Product[]
    onGoToCheckout: (items: CartItem[]) => Promise<void>
}

type Action =
    { type: 'ADD_ITEM', payload: Product } |
    { type: 'REMOVE_ITEM', payload: { id: string } } |
    { type: 'CHANGE_QUANTITY', payload: { id: string, quantity: number } }

function reducer(state: CartItem[], action: Action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const item = state.find((item) => item.id === action.payload.id)
            if (item) {
                return state.map((item) => {
                    return item.id === action.payload.id ?
                        {...item, quantity: item.quantity + 1} :
                        item
                })
            } else {
                return [...state, {
                    id: action.payload.id,
                    name: action.payload.name,
                    quantity: 1,
                    price: action.payload.price,
                    imageUrl: action.payload.imageUrl,
                    type: action.payload.description,
                }]
            }
        case 'REMOVE_ITEM':
            return state.filter((item) => item.id !== action.payload.id)
        case 'CHANGE_QUANTITY':
            const item2 = state.find((item) => item.id === action.payload.id)
            if (item2) {
                return state.map((item) => {
                    return item.id === action.payload.id ?
                        {...item, quantity: action.payload.quantity} :
                        item
                })
            }
    }
    return state
}

const INITIAL_PRODUCT: CartItem = {
    id: "prod_OFvGCF45oTstv1", name: "Yiga clan", quantity: 1,
    price: {id: 'price_1NTPQJGLM4u3hshryU7x5fi9', amount: 15},
    imageUrl: "http://placekitten.com/500/500",
    type: "Poster",
}

const Store = ({products, onGoToCheckout}: Props) => {
    const [items, dispatch] = useReducer(reducer, [])

    const handleRemoveItem = (id: string) => dispatch({type: 'REMOVE_ITEM', payload: {id}})
    const handleQuantityChanged = (id: string, quantity: number) => dispatch({
        type: 'CHANGE_QUANTITY',
        payload: {id, quantity}
    })
    const handleAddProduct = (product: Product) => dispatch({type: 'ADD_ITEM', payload: product})

    return (
        <div className="flex flex-col items-center">
            <Cart items={items}
                  onRemoveProduct={handleRemoveItem}
                  onChangeQuantity={handleQuantityChanged}
                  redirectToPayment={onGoToCheckout}
            />
            <Products
                products={products}
                onAddProduct={handleAddProduct}/>
        </div>
    )
}

export default Store;