import {Product} from "@/components/Products";
import Store from "@/components/Store";
import {CartItem} from "@/lib/types";
import {redirectToPaymentLink} from "@/lib/actions";

async function getProducts() {
    const products: Product[] = [
        {
            id: "prod_OJlwirZ19qmc0e", name: "Princess of Time",
            description: "Black T-shirt",
            price: {id: 'price_1NX8OIGLM4u3hshrQJwEbhas', amount: 10},
            imageUrl: "/images/transparent-tshirt-time-cropped.png",
        },
        {
            id: "prod_OFvGCF45oTstv1",
            name: "Yiga clan",
            description: "Poster",
            price: {id: 'price_1NX8UeGLM4u3hshr4AlumuUa', amount: 15},
            imageUrl: "/images/yiga-clan.png",
        }
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
