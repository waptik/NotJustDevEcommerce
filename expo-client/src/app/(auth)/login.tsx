import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import {
	Toast,
	ToastDescription,
	ToastTitle,
	useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/store/autStore";
import { login, register } from "@/utils/api/auth";
import { useMutation } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { EyeIcon, EyeOffIcon, HelpCircleIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";

export default function LoginScreen() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const toast = useToast();

	// auth store
	// const { setToken, setUser } = useAuth();
	const setLogin = useAuth((state) => state.login);
	const isLoggedIn = useAuth((state) => state.token !== null);

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

	const loginMutation = useMutation({
		mutationFn: () => login({ email, password }),
		onSuccess: (data) => {
			console.log("[LoginScreen.loginMutation] >> success data:", data);
			if (data.token && data.user) {
				// setUser(data.user);
				// setToken(data.token);
				setLogin(data.token, data.user);
			}
		},
		onError: (error) => {
			console.log("[LoginScreen.loginMutation] >>  error:", error);
			toast.show({
				placement: "top",
				duration: 3000,
				render: ({ id }) => {
					return <RenderToast id={id} message={error.message} />;
				},
			});
		},
	});

	const signupMutation = useMutation({
		mutationFn: () => register({ email, password }),
		onSuccess: (data) => {
			console.log("[LoginScreen.signupMutation] >> success data:", data);
			if (data.token && data.user) {
				// setUser(data.user);
				// setToken(data.token);
				setLogin(data.token, data.user);
			}
		},
		onError: (error) => {
			console.log("[LoginScreen.signupMutation] >> error:", error);
			toast.show({
				placement: "top",
				duration: 3000,
				render: ({ id }) => {
					return <RenderToast id={id} message={error.message} />;
				},
			});
		},
	});

	const handleState = () => {
		setShowPassword((showState) => {
			return !showState;
		});
	};

	if (isLoggedIn) {
		return <Redirect href="/" />;
	}

	return (
		<FormControl className="p-4 border rounded-lg border-outline-300 max-w-[500px] bg-white m-2">
			<VStack space="xl">
				<Heading className="text-typography-900">Login</Heading>
				<VStack space="xs">
					<Text className="text-typography-500">Email</Text>
					<Input className="min-w-[250px]">
						<InputField value={email} onChangeText={setEmail} type="text" />
					</Input>
				</VStack>
				<VStack space="xs">
					<Text className="text-typography-500">Password</Text>
					<Input className="text-center">
						<InputField
							value={password}
							onChangeText={setPassword}
							type={showPassword ? "text" : "password"}
						/>
						<InputSlot className="pr-3" onPress={handleState}>
							<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
						</InputSlot>
					</Input>
				</VStack>
				<HStack space="sm">
					<Button
						className="flex-1"
						variant="outline"
						onPress={() => signupMutation.mutate()}
					>
						<ButtonText>Sign up</ButtonText>
					</Button>
					<Button className="flex-1" onPress={() => loginMutation.mutate()}>
						<ButtonText>Sign in</ButtonText>
					</Button>
				</HStack>
			</VStack>
		</FormControl>
	);
}
