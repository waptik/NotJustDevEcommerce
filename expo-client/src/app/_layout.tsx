import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Link, Stack } from "expo-router";
import "../../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import {
	LogOut,
	LogOutIcon,
	ShoppingCart,
	User,
	UserIcon,
} from "lucide-react-native";
import { Pressable } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/store/autStore";

const queryClient = new QueryClient();

export default function RootLayout() {
	const cartItemsNum = useCart((state) => state.items.length);
	const isLoggedIn = useAuth((state) => state.token !== null);
	const logout = useAuth((state) => state.logout);

	return (
		<QueryClientProvider client={queryClient}>
			<GluestackUIProvider>
				<Stack
					screenOptions={{
						headerRight: () => (
							<Link href="/cart" className="p-3" asChild>
								<Pressable className="flex-row gap-2 items-center">
									<Icon as={ShoppingCart} />
									<Text>{cartItemsNum}</Text>
								</Pressable>
							</Link>
						),
						headerLeft: () =>
							isLoggedIn ? (
								<Pressable
									className="p-3 flex-row gap-2 items-center"
									onPress={logout}
								>
									<Icon as={LogOutIcon} />
									{/* <Text>Logout</Text> */}
								</Pressable>
							) : (
								<Link href="/login" className="p-3" asChild>
									<Pressable className="flex-row gap-2 items-center">
										<Icon as={UserIcon} />
									</Pressable>
								</Link>
							),
					}}
				>
					<Stack.Screen name="index" options={{ title: "Shop" }} />
					<Stack.Screen name="products/[id]" options={{ title: "Product" }} />
					<Stack.Screen name="cart" options={{ title: "Cart" }} />
					<Stack.Screen name="orders" options={{ title: "Orders" }} />
					<Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
				</Stack>
			</GluestackUIProvider>
		</QueryClientProvider>
	);
}
