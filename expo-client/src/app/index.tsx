import { FlatList, Text, View } from "react-native";
import products from "../../assets/products.json";
import ProductListItem from "../components/product-list-item";
import { Button, ButtonText } from "@/components/ui/button";

export default function HomeScreen() {
	return (
		<Button onPress={() => console.log("Button pressed")} variant="outline">
			<ButtonText>Press me</ButtonText>
		</Button>
	);
	// return (
	// 	<View>
	// 		<FlatList
	// 			data={products}
	// 			renderItem={({ item }) => <ProductListItem product={item} />}
	// 		/>
	// 	</View>
	// );
}
