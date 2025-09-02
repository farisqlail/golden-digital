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

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await postResource("customers/login", formData);
      if (response.success) {
        // Pastikan hanya dijalankan di client
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", response.data.token);
        }
        router.push("/profile");
      } else {
        setErrorMessage(response.message || "Gagal masuk. Cek email & password.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#ba0c0c] via-[#0b0000] to-[#780909] px-4">
      <Card className="w-full max-w-md shadow-lg bg-white bg-opacity-80">
        <CardBody className="p-6">
          <Typography variant="h4" className="text-center font-bold text-[#ba0c0c] mb-4">
            Masuk ke Akun Anda
          </Typography>
          <Typography variant="paragraph" className="text-center text-gray-600 mb-6">
            Masukkan email dan password untuk melanjutkan.
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="email"
                label="Email"
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {errorMessage && (
              <Typography variant="small" className="text-red-600 text-center mb-4">
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              className="w-full bg-[#ba0c0c] hover:bg-[#780909]"
              disabled={loading}
            >
              {loading ? "Loading..." : "Masuk"}
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center p-6">
          <Typography variant="paragraph" className="text-gray-600">
            Belum punya akun?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              className="text-[#ba0c0c] cursor-pointer hover:underline"
            >
              Daftar
            </span>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
