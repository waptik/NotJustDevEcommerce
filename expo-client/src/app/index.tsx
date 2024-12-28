import { FlatList, Text, View } from "react-native";
import products from "../../assets/products.json";
import ProductListItem from "../components/product-list-item";
import { Button, ButtonText } from "@/components/ui/button";

export default function HomeScreen() {
	return (
		<View>
			<FlatList
				data={products}
				numColumns={2}
				contentContainerClassName="gap-2"
				columnWrapperClassName="gap-2"
				renderItem={({ item }) => <ProductListItem product={item} />}
			/>
		</View>
	);
}
