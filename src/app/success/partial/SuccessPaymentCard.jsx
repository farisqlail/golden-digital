'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { postResource, getResourceWithToken } from "../../../../utils/Fetch";
import Toast from '@/components/Toast';

const SuccessPaymentCard = ({ dataAccount }) => {
    const [showModal, setShowModal] = useState(false);
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [testimonial, setTestimonial] = useState("");
    const [name, setName] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("authToken")

                const response = await getResourceWithToken("profile", token);

                setUserData(response.data)
            } catch (error) {
                console.error("Error checking payment status:", error);
            }
        }

        checkAuth();
    }, [])

    const toHome = async () => {
        const currentName = userData ? userData.name : name;

        if (localStorage.authToken) {
            if (currentName.trim() === "") {
                setToastMessage("Nama belum terisi nih");
                setToastType("warning");
                return;
            }

            try {
                const payload = {
                    name: currentName, 
                    description: testimonial
                };

                await postResource("testimonial/add", payload);

                localStorage.removeItem("dataPayment");
                setShowModal(false);
                router.push("/");
            } catch (error) {
                console.error("Error checking payment status:", error);
            }
        } else {
            localStorage.removeItem("dataPayment");
            router.push("/");
        }
    };

    const claim = () => {
        setShowWhatsAppModal(true);
    };

    const sendToWhatsApp = () => {
        const data = {
            email: dataAccount.akun.email,
            password: dataAccount.akun.password,
            profile: dataAccount.detailAkun.profile ? dataAccount.detailAkun.profile : null
        };

        const message = `Silahkan nikmati akun anda, ini untuk Email: ${data.email}\nPassword: ${data.password}\nProfile: ${data.profile ? data.profile : 'No profile'}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        setShowWhatsAppModal(false);
        setWhatsappNumber("");
    };

    const checkTestimonial = () => {
        userData ? setShowModal(true) : router.push("/");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-fit">
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
                    Silahkan klaim akun kamu!
                </p>
                <div className="flex w-full justify-between">
                    <div className="flex justify-center">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            onClick={claim}
                        >
                            Klaim akun kamu
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="px-4 py-2 bg-amber-500 text-white rounded-md"
                            onClick={checkTestimonial}
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal untuk input nomor WhatsApp */}
            {showWhatsAppModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Masukkan Nomor WhatsApp</h3>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md mb-4"
                            placeholder="Contoh: 6281234567890"
                            value={userData ? userData.number : whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                onClick={() => setShowWhatsAppModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                                onClick={sendToWhatsApp}
                            >
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Tulis Testimonial</h3>
                            <span className="text-gray-400">Beri testimonial dan dapatkan point!</span>
                        </div>
                        <div>
                            <label htmlFor="">Nama</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md mb-4"
                                value={userData ? userData.name : name}
                                onChange={(e) => setName(e.target.value)}
                            />
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
