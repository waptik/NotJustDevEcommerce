import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { getProduct } from "@/utils/products";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function ProductDetailsScreen() {
	const { id } = useLocalSearchParams();
	const {
		data: product,
		isPending,
		error,
	} = useQuery({
		queryKey: ["products", id],
		queryFn: () => getProduct(String(id)),
	});

	if (isPending) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text style={{ fontSize: 30 }}>{error.message}</Text>;
	}

	return (
		<Box className="flex-1 items-center p-3">
			<Stack.Screen options={{ title: product.name }} />
			<Card className="p-5 rounded-lg max-w-[960px] w-full flex-1">
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
				<VStack className="mb-6">
					<Heading size="md" className="mb-4">
						${product.price}
					</Heading>
					<Text size="sm">{product.description}</Text>
				</VStack>
				<Box className="flex-col sm:flex-row">
					<Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
						<ButtonText size="sm">Add to cart</ButtonText>
					</Button>
					<Button
						variant="outline"
						className="px-4 py-2 border-outline-300 sm:flex-1"
					>
						<ButtonText size="sm" className="text-typography-600">
							Wishlist
						</ButtonText>
					</Button>
				</Box>
			</Card>
		</Box>
	);
}
