import {Product} from "@/components/Products";
import Store from "@/components/Store";
import {CartItem} from "@/lib/types";
import {redirectToPaymentLink} from "@/lib/actions";

async function getProducts() {
    const products: Product[] = [
        {
            id: "prod_OFvGCF45oTstv1", name: "Princess of Time",
            description: "Black T-shirt",
            price: {id: 'price_1NTPQJGLM4u3hshryU7x5fi9', amount: 10},
            imageUrl: "/images/transparent-tshirt-time-cropped.png",
        },
        {
            id: "prod_LG9QvqtbExSfVq",
            name: "Cats",
            description: "Poster",
            price: {id: 'price_1KZd7yGLM4u3hshrit8iVSAx', amount: 15},
            imageUrl: "http://placekitten.com/600/600",
        },
        {
            id: "prod_LG9QvqtbExSfVq2",
            name: "Cats",
            description: "Poster",
            price: {id: 'price_1KZd7yGLM4u3hshrit8iVSAx', amount: 15},
            imageUrl: "http://placekitten.com/400/400",
        },
        {
            id: "prod_LG9QvqtbExSfVq3",
            name: "Cats",
            description: "Poster",
            price: {id: 'price_1KZd7yGLM4u3hshrit8iVSAx', amount: 15},
            imageUrl: "http://placekitten.com/300/300",
        },
    ]
    return products
}

export default async function Home() {
    const products = await getProducts()


    const goToCheckout = async (items: CartItem[]) => {
        "use server"
        await redirectToPaymentLink(items)
    }


    return (
        <main>
            <Store products={products} onGoToCheckout={goToCheckout}/>
        </main>
    )
}
