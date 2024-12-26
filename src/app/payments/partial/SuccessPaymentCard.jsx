// components/WaitingPaymentCard.js
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

const SuccessPaymentCard = () => {
    const router = useRouter();

    const toHome = () => {
        router.push("/")
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-1/4">
                <div className="mb-4 flex justify-center">
                    <Image
                        width={1024}
                        height={800}
                        alt="subscribe image"
                        src={`/image/success-payment.png`}
                        className="h-full rounded-lg w-2/4"
                    />
                </div>
                <h2 className="text-xl font-semibold mb-2">Pembayaran Selesai</h2>
                <p className="text-gray-500 mb-4 text-sm">
                    Akun akan dikirimkan melalui WA kami, tunggu yaa.
                </p>
                <div className="flex justify-center">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                        onClick={toHome}
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPaymentCard;
