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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await postResource("customers/login", formData);
      if (response.success) {
        localStorage.setItem("authToken", response.data.token);

        alert("Login berhasil!");
        router.push("/profile");
      } else {
        setErrorMessage(response.message || "Gagal masuk. Silakan cek kembali email dan password Anda.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#ba0c0c] via-[#0b0000] to-[#780909] px-4 sm:px-6 md:px-8">
      <Card className="w-full max-w-md shadow-lg bg-white bg-opacity-80 sm:max-w-sm md:max-w-lg">
        <CardBody className="p-6 sm:p-4 md:p-8">
          <Typography
            variant="h4"
            className="text-center text-2xl sm:text-xl md:text-3xl font-bold text-[#ba0c0c] mb-4"
          >
            Masuk ke Akun Anda
          </Typography>
          <Typography
            variant="paragraph"
            className="text-center text-gray-600 mb-6 sm:mb-4 md:mb-8"
          >
            Masukkan email dan password untuk melanjutkan.
          </Typography>
          <form onSubmit={handleSubmit}>
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
            <div className="flex justify-between items-center mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-amber-600"
                />
                <span className="ml-2 text-gray-600 text-sm sm:text-xs">
                  Ingat Saya
                </span>
              </label>
              <a href="#" className="text-[#ba0c0c] hover:underline text-sm sm:text-xs">
                Lupa Password?
              </a>
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
              {loading ? "Loading..." : "Masuk"}
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center p-6 sm:p-4 md:p-8">
          <Typography
            variant="paragraph"
            className="text-gray-600 flex gap-2 justify-center"
          >
            Belum punya akun?{" "}
            <div
              onClick={() => handleNavigation("/auth/register")}
              className="text-[#ba0c0c] cursor-pointer hover:underline"
            >
              Daftar
            </div>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
