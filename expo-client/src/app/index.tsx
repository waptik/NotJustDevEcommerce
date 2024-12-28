import { FlatList, Text, View } from "react-native";
import products from "../../assets/products.json";
import ProductListItem from "../components/product-list-item";

export default function HomeScreen() {
	return (
		<View>
			<FlatList
				data={products}
				renderItem={({ item }) => <ProductListItem product={item} />}
			/>
		</View>
	);
}
