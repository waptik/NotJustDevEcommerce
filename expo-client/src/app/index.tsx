import ProductListItem from "@/components/product-list-item";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { listProducts } from "@/utils/products";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
	const numColumns = useBreakpointValue({ default: 2, sm: 3, xl: 4 });
	const { data, isPending, error } = useQuery({
		queryKey: ["products"],
		queryFn: listProducts,
	});

	if (isPending) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <View>{error.message}</View>;
	}

	return (
		<View>
			<FlatList
				key={numColumns}
				data={data}
				numColumns={numColumns}
				contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
				columnWrapperClassName="gap-2"
				renderItem={({ item }) => <ProductListItem product={item} />}
			/>
		</View>
	);
}
