import {Product} from "@/components/Products";
import Store from "@/components/Store";

async function getProducts() {
    const products: Product[] = [
        {id: "prod_OFvGCF45oTstv1", name: "Yiga clan", description: "Poster", price: 100},
        {id: "prod_LG9QvqtbExSfVq", name: "Cats", description: "Poster", price: 200}
    ]
    return products
}

export default async function Home() {
    const products = await getProducts()
    const goToCheckout = async () => {
        "use server"
        console.log("CHECKOUT")
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Store products={products} onGoToCheckout={goToCheckout}/>
        </main>
    )
}
