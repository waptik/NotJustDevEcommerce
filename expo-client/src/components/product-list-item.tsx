import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { Image } from "@/components/ui/image";

interface Product {
	id: number;
	name: string;
	description: string;
	image: string;
	price: number;
}

export default function ProductListItem({ product }: { product: Product }) {
	return (
		<Link href={`/products/${product.id}`} asChild>
			<Pressable className="flex-1">
				<Card className="p-5 rounded-lg max-w-[360px]">
					<Image
						source={{
							uri: product.image,
						}}
						className="mb-6 h-[240px] w-full rounded-md"
						alt={`Image of ${product.name}`}
						resizeMode="contain"
					/>
					<Text className="text-sm font-normal mb-2 text-typography-700">
						{product.name}
					</Text>
					<Heading size="md" className="mb-4">
						${product.price}
					</Heading>
				</Card>
			</Pressable>
		</Link>
	);
}
