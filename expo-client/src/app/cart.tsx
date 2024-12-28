import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { Redirect } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function CartScreen() {
	const items = useCart((state) => state.items);
	const resetCart = useCart((state) => state.reset);

	const onCheckout = () => {
		resetCart();
	};

	if (items.length === 0) {
		return <Redirect href="/" />;
	}

	return (
		<FlatList
			data={items}
			contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
			renderItem={({ item }) => (
				<HStack className="p-3 bg-white border-b border-gray-200">
					<VStack space="sm">
						<Text>{item.product.name}</Text>
						<Text>${item.product.price}</Text>
					</VStack>
					<Text className="ml-auto">{item.quantity}</Text>
				</HStack>
			)}
			ListFooterComponent={() => (
				<Button onPress={onCheckout}>
					<ButtonText>Checkout</ButtonText>
				</Button>
			)}
		/>
	);
}
