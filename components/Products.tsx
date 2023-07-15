import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export type Product = {
    id: string
    name: string
    price: number
    description: string
}
export const products: Product[] = [
    {id: "prod_OFvGCF45oTstv1", name: "Yiga clan", description: "Poster", price: 100},
    {id: "prod_LG9QvqtbExSfVq", name: "Cats", description: "Poster", price: 200}
]

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