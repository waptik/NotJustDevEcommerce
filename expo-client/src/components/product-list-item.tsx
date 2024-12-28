import React from "react";
import { Text } from "react-native";

interface Product {
	name: string;
}
export default function ProductListItem({ product }: { product: Product }) {
	return <Text style={{ fontSize: 30 }}>{product.name}</Text>;
}
