"use client";

import React from "react";
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

function Login() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1600x900')", // Ganti dengan gambar yang Anda pilih
      }}
    >
      <Card className="w-full max-w-md shadow-lg bg-white bg-opacity-80">
        <CardBody className="p-6">
          <Typography
            variant="h4"
            className="text-center text-2xl font-bold text-gray-800 mb-4"
          >
            Masuk ke Akun Anda
          </Typography>
          <Typography
            variant="paragraph"
            className="text-center text-gray-500 mb-6"
          >
            Masukkan email dan password untuk melanjutkan.
          </Typography>
          <form>
            <div className="mb-4">
              <Input
                type="email"
                label="Email"
                size="lg"
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                label="Password"
                size="lg"
                className="w-full"
                required
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-amber-600"
                />
                <span className="ml-2 text-gray-600">Ingat Saya</span>
              </label>
              <a
                href="#"
                className="text-amber-600 hover:underline text-sm"
              >
                Lupa Password?
              </a>
            </div>
            <Button
              type="submit"
              color="amber"
              size="lg"
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              Masuk
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center p-6">
          <Typography
            variant="paragraph"
            className="text-gray-600"
          >
            Belum punya akun?{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Daftar
            </a>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
