import { useAuth } from "@/store/autStore";
import type { CartOrder, Order } from "@/types/shop";
import { API_URL } from "@/utils/constants";

export async function listOrders() {
    const authToken = useAuth.getState().token;
    const req = await fetch(`${API_URL}/orders`, {
        headers: {
            Authorization: ` ${authToken}`,
        },
    });

    if (!req.ok) {
        throw new Error("Failed to fetch orders");
    }

    const res = await req.json();

    const orders: Order[] = res;

    return orders;
}

export async function getOrder(id: string) {
    const authToken = useAuth.getState().token;
    const req = await fetch(`${API_URL}/orders/${id}`, {
        headers: {
            Authorization: ` ${authToken}`,
        },
    });

    if (!req.ok) {
        throw new Error("Failed to fetch order");
    }

    const data = await req.json();

    const order = data as Order;

    return order;
}

export async function createOrder(orderItems: CartOrder["items"]) {
    const authToken = useAuth.getState().token;
    const req = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: ` ${authToken}`,
        },
        body: JSON.stringify({ items: orderItems }),
    });

    if (!req.ok) {
        throw new Error("Failed to create order");
    }

    const data = await req.json();

    const newOrder = data as Order;

    return newOrder;
}
