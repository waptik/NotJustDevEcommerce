import { API_URL } from "@/utils/constants";
export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailPattern.test(email)) {
        throw new Error("Invalid email format");
    }

    // password cannot be empty
    if (!password) {
        throw new Error("Password cannot be empty");
    }

    email = email.toLowerCase().trim();

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return await response.json();
}

export async function register({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailPattern.test(email)) {
        throw new Error("Invalid email format");
    }

    // password cannot be empty
    if (!password.trim()) {
        throw new Error("Password cannot be empty");
    }

    email = email.toLowerCase().trim();

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name: email }),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return await response.json();
}
