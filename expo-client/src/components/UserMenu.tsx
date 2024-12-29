import { Button, ButtonIcon } from "@/components/ui/button";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { useAuth } from "@/store/autStore";
import { LogOutIcon, UserIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Icon } from "./ui/icon";

export default function UserMenu() {
	const logout = useAuth((state) => state.logout);

	return (
		<Menu
			offset={5}
			trigger={({ ...triggerProps }) => {
				return (
					<Button variant="outline" {...triggerProps} size="sm">
						<ButtonIcon as={UserIcon} />
					</Button>
				);
			}}
		>
			<MenuItem key="Logout" textValue="Logout" onPress={logout}>
				<Icon as={LogOutIcon} size="sm" className="mr-2" />
				<MenuItemLabel size="sm">Logout</MenuItemLabel>
			</MenuItem>
		</Menu>
	);
}
