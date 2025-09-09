"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Image from "next/image";

import { Button, Typography } from "@material-tailwind/react";

import {
    getResource,
    postResource,
    getResourceWithToken
} from "../../../../utils/Fetch";

export function Checkout() {
    const router = useRouter();
    const [dataCheckout, setDataCheckout] = useState(null);
    const [listPayment, setListPayment] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [total, setTotal] = useState(0);
    const [uniqueCode, setUniqueCode] = useState(0);
    const [userData, setUserData] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [claimedVoucher, setClaimedVoucher] = useState(null); // State untuk voucher yang diklaim

    useEffect(() => {
        window.scrollTo(0, 0);
        const dataCheckout = JSON.parse(localStorage.getItem("dataPayment"));
        setDataCheckout(dataCheckout);

        const fetchData = async () => {
            const authToken = localStorage.getItem("authToken");
            try {
                const dataUser = await getResourceWithToken("profile", authToken);
                const result = await getResource("list-payments");
                const resultVoucher = await getResource(`vouchers/claimed?user_id=${dataUser.data.id}`);

                setListPayment(result.data);
                setVouchers(resultVoucher.claimed_vouchers);
                setUserData(dataUser.data);
            } catch (fetchError) {
                console.error("Error fetching list payments:", fetchError);
                setError("Gagal memuat daftar pembayaran. Silakan coba lagi.");
            }

            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await getResourceWithToken("profile", token);
                    setUserData(response.data)
                } catch (profileError) {
                    console.error("Error fetching profile:", profileError);
                    setError("Gagal memuat profil. Silakan coba lagi.");
                }
            } else {
                setError("Token tidak ditemukan. Silakan login kembali.");
            }
        };

        const generateUniqueCode = () => {
            const randomCode = Math.floor(Math.random() * 1000);
            setUniqueCode(randomCode);
        };

        generateUniqueCode();
        fetchData();
    }, [])

    const handleToggle = () => {
        setIsChecked(!isChecked);
        calculateTotalWithDiscounts(!isChecked);
    };

    const calculateTotalWithDiscounts = (usePoints = isChecked) => {
        const uniqueCodeValue = uniqueCode;
        const baseTotal = dataCheckout?.amount || 0;
        let finalTotal = baseTotal + uniqueCodeValue;
        
        // Kurangi dengan voucher jika ada
        if (claimedVoucher) {
            finalTotal -= claimedVoucher.amount;
        }
        
        // Kurangi dengan poin jika dicentang
        if (usePoints && userData?.point) {
            finalTotal -= userData.point;
        }
        
        // Pastikan total tidak negatif
        finalTotal = Math.max(0, finalTotal);
        
        setTotal(finalTotal);
    };

    const calculateTotal = () => {
        calculateTotalWithDiscounts();
    };

    useEffect(() => {
        calculateTotal();
    }, [uniqueCode, claimedVoucher, userData]);

    const selectPayment = (payment, index) => {
        setSelectedPayment(payment);
        localStorage.setItem("selectedPayment", JSON.stringify(payment));
    };

    const handleClaimVoucher = (voucher) => {
        setClaimedVoucher(voucher.voucher);
        setShowVoucherModal(false);
        // Hitung ulang total dengan voucher yang diklaim
        calculateTotalWithDiscounts();
    };

    const handleRemoveVoucher = () => {
        setClaimedVoucher(null);
        calculateTotalWithDiscounts();
    };

    const handleSubmit = async () => {
        const payment = JSON.parse(localStorage.getItem("selectedPayment"))
        const data = {
            external_id: dataCheckout?.external_id,
            amount: total,
            id_price: dataCheckout?.id_price,
            id_customer: dataCheckout?.id_customer ? dataCheckout?.id_customer : 0,
            id_promo: dataCheckout?.id_promo ? dataCheckout?.id_promo : 0,
            customer_name: dataCheckout?.customer_name,
            email_customer: dataCheckout?.email_customer,
            phone_customer: dataCheckout?.phone_customer,
            transaction_code: dataCheckout?.transaction_code,
            payment_status: "PENDING",
            payment_method: payment,
            claim_point: isChecked,
            point: dataCheckout?.point,
            id_voucher: claimedVoucher?.id || null 
        };
        localStorage.setItem("dataCheckout", JSON.stringify(data));
        router.push("/payment")
    };

    return (
        <section className="py-0 px-4">
            <div className="container mx-auto text-center flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[600px] mt-4">
                    <div className="flex w-full">
                        <span className="font-semibold text-xl text-left text-white">Detail Pesanan</span>
                    </div>
                    <div className="border-2 rounded-lg w-full">
                        <div className="border-b-2 pb-2 bg-white">
                            <Image
                                width={1024}
                                height={800}
                                alt="product"
                                src={`/logos/${dataCheckout?.product.toLowerCase()}.png`}
                                className="h-full rounded-lg max-w-full"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-4 text-white p-3">
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-left">{dataCheckout?.product}</span>
                                <span>Rp {dataCheckout?.amount.toLocaleString()} / ({dataCheckout?.duration} Bulan)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full text-white">
                        {listPayment.length > 0 ? (
                            listPayment
                                .filter(payment => payment.web)
                                .map((payment, index) => (
                                    <div
                                        key={index}
                                        className={`border-2 rounded-lg mb-2 ${selectedPayment?.id === payment.id ? 'border-[#ba0c0c]' : ''
                                            }`}
                                    >
                                        <div
                                            className="p-4 cursor-pointer flex justify-between items-center"
                                            onClick={() => selectPayment(payment)}
                                        >
                                            <span>{payment.nama_payment}</span>
                                            <Button
                                                className="mt-2 bg-[#ba0c0c] text-white"
                                                onClick={() => selectPayment(payment)}
                                            >
                                                Pilih
                                            </Button>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="col-span-full border-2 rounded-lg p-4 text-gray-500">
                                Tidak ada metode pembayaran tersedia.
                            </div>
                        )}
                    </div>

                    {/* Bagian Voucher - tampilkan voucher yang diklaim atau tombol untuk buka modal */}
                    {claimedVoucher ? (
                        <div className="flex justify-between items-center px-4 py-4 border border-green-700 w-full rounded-lg bg-green-50">
                            <div className="flex flex-col gap-2 text-left">
                                <span className="font-bold text-lg text-green-700">{claimedVoucher.name}</span>
                                <small className="text-gray-600">Potongan Rp {claimedVoucher.amount.toLocaleString()}</small>
                            </div>
                            <Button
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={handleRemoveVoucher}
                            >
                                Hapus
                            </Button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center px-4 py-4 border border-yellow-700 w-full rounded-lg">
                            <div className="flex flex-col gap-2 text-left">
                                <span className="font-bold text-2xl text-yellow-700">Gunakan Vouchermu</span>
                                <small className="text-gray-500">Dapat potongan menarik dengan menggunakan vouchermu!</small>
                            </div>
                            <Button
                                className="bg-green-700 text-white"
                                onClick={() => setShowVoucherModal(true)}
                            >
                                Lihat Voucher
                            </Button>
                        </div>
                    )}

                    {/* Modal Voucher */}
                    {showVoucherModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
                                <h2 className="text-xl text-left font-semibold mb-4">Voucher Kamu</h2>
                                <button
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowVoucherModal(false)}
                                >
                                    &times;
                                </button>
                                <div className="max-h-96 overflow-y-auto grid gap-4">
                                    {vouchers.length === 0 ? (
                                        <p className="text-gray-500 text-center">Anda tidak memiliki voucher.</p>
                                    ) : (
                                        vouchers.map((voucher) => (
                                            <div
                                                key={voucher.voucher.id}
                                                className="bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] p-4 rounded-xl shadow-md flex justify-between items-center"
                                            >
                                                <div className="mb-2 text-left">
                                                    <h3 className="font-bold text-lg">{voucher.voucher.name}</h3>
                                                    <p className="text-sm text-gray-700">
                                                        Potongan Rp {voucher.voucher.amount.toLocaleString()}
                                                    </p>
                                                </div>
                                                <button
                                                    className="mt-2 w-fit px-4 bg-[#ba0c0c] text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                                    onClick={() => handleClaimVoucher(voucher)}
                                                >
                                                    Klaim Voucher
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 w-full text-white">
                        <span className="font-semibold text-xl text-left">Ringkasan Pembayaran</span>
                        <div className="border-b-2 pb-3 flex flex-col gap-2">
                            <div className="flex justify-between">
                                <span>Biaya Langganan</span>
                                <span>Rp {dataCheckout?.product_price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Kode Unik Pembayaran</span>
                                <span>Rp {uniqueCode}</span>
                            </div>
                            {dataCheckout?.discountAmount && (
                                <div className="flex justify-between">
                                    <span>Diskon</span>
                                    <span>-Rp {dataCheckout?.discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            {claimedVoucher && (
                                <div className="flex justify-between">
                                    <span>Potongan Voucher ({claimedVoucher.name})</span>
                                    <span className="text-green-400">-Rp {claimedVoucher.amount.toLocaleString()}</span>
                                </div>
                            )}
                            {isChecked && userData?.point && (
                                <div className="flex justify-between">
                                    <span>Potongan Poin</span>
                                    <span className="text-blue-400">-Rp {userData.point.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Biaya Transaksi & Tax</span>
                                <span>Rp {dataCheckout?.tax.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between mt-3">
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-xl font-bold text-[#ba0c0c]">Rp {total.toLocaleString()}</span>
                        </div>
                        <Button
                            className={`mt-4 p-3 rounded-lg ${selectedPayment ? 'bg-[#ba0c0c] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            onClick={handleSubmit}
                            disabled={!selectedPayment}
                        >
                            Bayar
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;