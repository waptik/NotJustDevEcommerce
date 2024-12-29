export type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
};

export interface CartOrder {
    id: number;
    userId: number;
    status: string;
    items: {
        productId: number;
        quantity: number;
    }[];
}

export interface Order {
    id: number;
    userId: number;
    status: string;
    createdAt: Date;
    items: {
        id: number;
        productId: number;
        orderId: number;
        quantity: number;
        price: number;
    }[];
}
