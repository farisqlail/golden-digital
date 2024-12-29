// components/WaitingPaymentCard.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

import {
    postResource
} from "../../../../utils/Fetch";

import Toast from '@/components/Toast';

const SuccessPaymentCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [testimonial, setTestimonial] = useState("");
    const [name, setName] = useState("");
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const router = useRouter();

    const toHome = async () => {
        if (localStorage.authToken) {
            if (name.trim() === "") {
                setToastMessage("Nama belum terisi nih");
                setToastType("warning");
                return;
            }

            try {
                const payload = {
                    name: name,
                    description: testimonial
                };

                await postResource("testimonial/add", payload);

                localStorage.removeItem("dataPayment")
                setShowModal(false);
                router.push("/");

            } catch (error) {
                console.error("Error checking payment status:", error);
            }
        } else {
            localStorage.removeItem("dataPayment")
            router.push("/");
        }
    };

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
                        onClick={() => setShowModal(true)}
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Tulis Testimonial</h3>
                            <span className="text-gray-400">Beri testimonial dan dapatkan point!</span>
                        </div>
                        <div>
                            <label htmlFor="">Nama</label>
                            <input type="text" className="w-full p-2 border rounded-md mb-4" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Ulasan</label>
                            <textarea
                                className="w-full p-2 border rounded-md mb-4"
                                rows="4"
                                placeholder="Tulis testimonial Anda di sini..."
                                value={testimonial}
                                onChange={(e) => setTestimonial(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                onClick={() => setShowModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                                onClick={toHome}
                            >
                                Kirim & Kembali
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
        </div>
    );
};

export default SuccessPaymentCard;
