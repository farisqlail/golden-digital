"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Input,
    Button,
    Typography,
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";

import { postResource } from "../../../../utils/Fetch";

function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        point: 20
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await postResource("customers", formData);
            if (response.success) {
                alert("Registrasi berhasil!");
                router.push("/auth/login");
            } else {
                setErrorMessage(response.message || "Gagal mendaftarkan akun.");
            }
        } catch (error) {
            setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigation = (url) => {
        router.push(url);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#ba0c0c] via-[#0b0000] to-[#780909] px-4">
            <Card className="w-full max-w-lg shadow-lg bg-white bg-opacity-90">
                <CardBody className="p-6">
                    <Typography
                        variant="h4"
                        className="text-center text-2xl font-bold text-[#ba0c0c] mb-4"
                    >
                        Daftar Akun Baru
                    </Typography>
                    <Typography
                        variant="paragraph"
                        className="text-center text-gray-500 mb-6"
                    >
                        Isi formulir di bawah ini untuk membuat akun baru.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="text"
                                label="Nama"
                                size="lg"
                                className="w-full"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="email"
                                label="Email"
                                size="lg"
                                className="w-full"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="password"
                                label="Password"
                                size="lg"
                                className="w-full"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="tel"
                                label="Nomor Telepon"
                                size="lg"
                                className="w-full"
                                name="number"
                                value={formData.number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {errorMessage && (
                            <Typography
                                variant="small"
                                className="text-red-600 text-center mb-4"
                            >
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-[#ba0c0c] hover:bg-[#780909]"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Daftar"}
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="text-center p-6">
                    <Typography variant="paragraph" className="text-gray-600 flex gap-2 justify-center">
                        Sudah punya akun?{" "}
                        <div onClick={() => handleNavigation("/auth/login")} className="text-[#ba0c0c] hover:underline cursor-pointer">
                            Masuk
                        </div>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Register;
