import type { Product } from "@/types/shop";
import { API_URL } from "./const";

export async function listProducts() {
    const req = await fetch(`${API_URL}/products`);

    if (!req.ok) {
        throw new Error("Failed to fetch products");
    }

    const res = await req.json();

    const products: Product[] = res.filter((product: Product) => product.image);

    return products;
}

export async function getProduct(id: string) {
    const req = await fetch(`${API_URL}/products/${id}`);

    if (!req.ok) {
        throw new Error("Failed to fetch product");
    }

    const data = await req.json();

    const product = data as Product;

    return product;
}
