import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
	Toast,
	ToastDescription,
	ToastTitle,
	useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { createOrder } from "@/utils/api/orders";
import { useMutation } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { HelpCircleIcon } from "lucide-react-native";
import { FlatList, Pressable, Text } from "react-native";

export default function CartScreen() {
	const items = useCart((state) => state.items);
	const resetCart = useCart((state) => state.reset);
	const toast = useToast();

	const RenderToast = ({
		id,
		message,
		type = "error",
	}: { id: string; message: string; type?: "error" | "success" }) => {
		const uniqueToastId = `toast-${id}`;
		return (
			<Toast
				action={type}
				variant="outline"
				nativeID={uniqueToastId}
				className={`p-4 gap-6 border-${type}-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between`}
			>
				<HStack space="md">
					<Icon as={HelpCircleIcon} className={`stroke-${type}-500 mt-0.5`} />
					<VStack space="xs">
						<ToastTitle className={`text-${type}-500`}>
							{type === "error" ? "Error" : "Success"}
						</ToastTitle>
						<ToastDescription className={`text-${type}-500`}>
							{message}
						</ToastDescription>
					</VStack>
				</HStack>
				<Pressable onPress={() => toast.close(uniqueToastId)}>
					<Icon as={CloseIcon} className={`stroke-${type}-500`} />
				</Pressable>
			</Toast>
		);
	};

	const createOrderMutation = useMutation({
		mutationFn: () => {
			return createOrder(
				items.map((item) => ({
					productId: item.product.id,
					quantity: item.quantity,
				})),
			);
		},
		onSuccess: (data) => {
			console.log("success", data);
			toast.show({
				placement: "bottom",
				render: ({ id }) => {
					return (
						<RenderToast
							id={id}
							message="Order created successfully"
							type="success"
						/>
					);
				},
			});
			resetCart();
		},
		onError: (error) => {
			console.log("error", error);
			toast.show({
				placement: "top",
				render: ({ id }) => {
					return <RenderToast id={id} message={error.message} />;
				},
			});
		},
	});

	const onCheckout = () => {
		createOrderMutation.mutate();
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
