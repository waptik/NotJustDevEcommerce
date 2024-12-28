import ProductListItem from "@/components/product-list-item";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import products from "@assets/products.json";
import { FlatList, View } from "react-native";

export default function HomeScreen() {
	const numColumns = useBreakpointValue({ default: 2, sm: 3, xl: 4 });

	return (
		<View>
			<FlatList
				key={numColumns}
				data={products}
				numColumns={numColumns}
				contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
				columnWrapperClassName="gap-2"
				renderItem={({ item }) => <ProductListItem product={item} />}
			/>
		</View>
	);
}
