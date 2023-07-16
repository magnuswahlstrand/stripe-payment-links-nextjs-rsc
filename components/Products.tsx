import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

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
    return <div className={"flex flex-row gap-4"}>
        {products.map((product) => (
            <Card key={product.id}>
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => onAddProduct(product)}>Add to cart</Button>
                </CardContent>
            </Card>
        ))}
    </div>;
}