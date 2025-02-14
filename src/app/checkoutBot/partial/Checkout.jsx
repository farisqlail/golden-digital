"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";

import { Button, Typography } from "@material-tailwind/react";

import {
    getResource,
    postResource,
    getResourceWithToken
} from "../../../../utils/Fetch";

const Checkout = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [dataCheckout, setDataCheckout] = useState(null);
    const [listPayment, setListPayment] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [total, setTotal] = useState(0);
    const [uniqueCode, setUniqueCode] = useState(0);
    const [userData, setUserData] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const dataCheckout = {
            external_id: searchParams.get('external_id'),
            amount: searchParams.get('amount'),
            id_price: searchParams.get('id_price'),
            id_customer: searchParams.get('id_customer'),
            id_promo: searchParams.get('id_promo'),
            customer_name: searchParams.get('customer_name'),
            email_customer: searchParams.get('email_customer'),
            phone_customer: searchParams.get('phone_customer'),
            transaction_code: searchParams.get('transaction_code'),
            payment_status: searchParams.get('payment_status'),
            product: searchParams.get('product'),
            duration: searchParams.get('duration'),
            product_price: searchParams.get('product_price'),
            tax: searchParams.get('tax')
        }
        setDataCheckout(dataCheckout);

        const fetchData = async () => {
            try {
                // const token = localStorage.getItem("authToken");
                // const response = await getResourceWithToken("profile", token);
                const result = await getResource("list-payments");

                setListPayment(result.data);
                // setUserData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        const generateUniqueCode = () => {
            const randomCode = Math.floor(Math.random() * 1000);
            setUniqueCode(randomCode);
        };

        generateUniqueCode();
        fetchData();
    }, [router, searchParams])

    const handleToggle = () => {
        setIsChecked(!isChecked);
        const uniqueCodeValue = uniqueCode;
        const baseTotal = dataCheckout?.amount || 0;

        setTotal(baseTotal + uniqueCodeValue);
    };

    const calculateTotal = () => {
        const uniqueCodeValue = uniqueCode;
        const baseTotal = parseInt(dataCheckout?.amount);
        setTotal(baseTotal + parseInt(dataCheckout?.tax) + uniqueCodeValue);
    };

    useEffect(() => {
        calculateTotal();
    }, [uniqueCode]);

    const selectPayment = (payment, index) => {
        setSelectedPayment(payment);
        localStorage.setItem("selectedPayment", JSON.stringify(payment));
    };

    const handleSubmit = async () => {
        const payment = JSON.parse(localStorage.getItem("selectedPayment"))
        const data = {
            external_id: searchParams.get('external_id'),
            amount: total,
            id_price: searchParams.get('id_price'),
            id_customer: searchParams.get('id_customer') ? searchParams.get('id_customer') : 0,
            id_promo: searchParams.get('id_promo') ? searchParams.get('id_promo') : 0,
            customer_name: searchParams.get('customer_name'),
            email_customer: searchParams.get('email_customer'),
            phone_customer: searchParams.get('phone_customer'),
            transaction_code: searchParams.get('transaction_code'),
            payment_status: "PENDING",
            payment_method: payment,
            claim_point: isChecked
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
                        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-4 text-white p-3">
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-left">{dataCheckout?.product}</span>
                                <span>Rp {dataCheckout?.amount.toLocaleString()} / ({dataCheckout?.duration} Bulan)</span>
                            </div>
                        </div> */}
                    </div>

                    <div className="flex flex-col w-full text-white">
                        {listPayment.length > 0 ? (
                            listPayment.map((payment, index) => (
                                <div
                                    key={index}
                                    className={`border-2 rounded-lg mb-2 ${selectedPayment?.id === payment.id ? 'border-[#ba0c0c]' : ''}`}
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
                                    <span>Rp {dataCheckout?.discountAmount.toLocaleString()}</span>
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

const CheckoutPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Checkout />
        </Suspense>
    );
};

export default CheckoutPage;
