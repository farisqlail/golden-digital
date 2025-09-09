"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

import {
    getResource,
    postResource,
    getResourceWithToken
} from "../../../../utils/Fetch";

export function Payment() {
    const router = useRouter();
    const [dataCheckout, setDataCheckout] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [imagePath, setImagePath] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const dataCheckout = JSON.parse(localStorage.getItem("dataCheckout"));
        setDataCheckout(dataCheckout);
    }, [])


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImagePath(file);
    };

    const handleSubmit = async () => {
        handleOpenModal(); // Buka modal upload bukti pembayaran
    };

    const handleUploadProof = async () => {
        if (!imagePath) {
            alert("Harap unggah bukti pembayaran!");
            return;
    }

        setLoading(true);

        const formData = new FormData();
        formData.append("external_id", dataCheckout?.external_id);
        formData.append("amount", dataCheckout?.amount);
        formData.append("id_price", dataCheckout?.id_price);
        formData.append("id_customer", dataCheckout?.id_customer || 0);
        formData.append("id_promo", dataCheckout?.id_promo || 0);
        formData.append("id_payment", dataCheckout?.payment_method?.id || 0);
        formData.append("id_voucher", dataCheckout?.id_voucher || 0);
        formData.append("customer_name", dataCheckout?.customer_name);
        formData.append("email_customer", dataCheckout?.email_customer);
        formData.append("phone_customer", dataCheckout?.phone_customer);
        formData.append("transaction_code", dataCheckout?.transaction_code);
        formData.append("payment_status", "PENDING");
        formData.append("payment_method", dataCheckout?.payment_method?.nama_payment);
        formData.append("point", dataCheckout?.point);
        formData.append("image_path", imagePath);

        const data = {
            external_id: dataCheckout?.external_id,
            amount: dataCheckout?.amount,
            id_price: dataCheckout?.id_price,
            id_customer: dataCheckout?.id_customer ? dataCheckout?.id_customer : 0,
            id_promo: dataCheckout?.id_promo ? dataCheckout?.id_promo : 0,
            id_payment: dataCheckout?.payment_method?.id,
            id_voucher: dataCheckout?.id_voucher,
            customer_name: dataCheckout?.customer_name,
            email_customer: dataCheckout?.email_customer,
            phone_customer: dataCheckout?.phone_customer,
            transaction_code: dataCheckout?.transaction_code,
            payment_status: "PENDING",
            payment_method: dataCheckout?.payment_method?.nama_payment,
            claim_point: dataCheckout?.claim_point,
            point: dataCheckout?.point,
            claim_number: dataCheckout?.claim_number ? dataCheckout?.claim_number : null,
        };

        localStorage.setItem("dataPayment", JSON.stringify(data));
        try {
            const response = await postResource("create-invoice", formData);

            if (response.success === true) {
                router.push("/success");
            } else {
                console.error("Invoice creation failed:", response);
            }
        } catch (error) {
            console.error("Error uploading proof:", error);
        } finally {
            setLoading(false);
            handleCloseModal();
        }
    };

    return (
        <section className="py-0 px-4 h-screen text-black">
            <div className="container mx-auto text-center flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4 w-full max-w-[600px] mt-4 bg-white rounded-lg p-3">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-semibold text-lg">Selesaikan Pembayaran anda</span>
                        {dataCheckout?.payment_method?.image ? (
                            <div className="flex justify-center">
                                <Image
                                    width={1024}
                                    height={800}
                                    alt="subscribe image"
                                    src={`https://devgoldendigital.my.id/public/uploads/payments/` + dataCheckout?.payment_method?.image }
                                    className="h-full rounded-lg w-3/4"
                                />
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 flex justify-center">
                                    <Image
                                        width={1024}
                                        height={800}
                                        alt="subscribe image"
                                        src={`/image/success-payment.png`}
                                        className="h-full rounded-lg w-2/4"
                                    />
                                </div>
                                <div className="mt-4 mb-4 flex flex-col gap-3">
                                    <div className="flex justify-between">
                                        <span>Pilihan Pembayaran</span>
                                        <span className="font-semibold">{dataCheckout?.payment_method?.nama_payment}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>VA</span>
                                        <span className="font-semibold">{dataCheckout?.payment_method?.va}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Atas Nama</span>
                                        <span className="font-semibold">{dataCheckout?.payment_method?.name_account}</span>
                                    </div>
                                </div>
                            </>
                        )}
                        <Button className="bg-[#ba0c0c] w-full mt-3" onClick={handleSubmit}>Upload Bukti Bayar</Button>
                    </div>
                </div>
            </div >

            {/* Modal Upload Bukti Pembayaran */}
            < Dialog open={openModal} handler={handleCloseModal} >
                <DialogBody>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-lg font-semibold">Unggah Bukti Pembayaran</p>

                        {/* Label sebagai tombol upload */}
                        <label className="cursor-pointer w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg hover:bg-gray-100 mt-6 mb-6">
                            {imagePath ? (
                                <Image
                                    src={URL.createObjectURL(imagePath)}
                                    alt="Preview"
                                    width={160}
                                    height={160}
                                    className="object-cover rounded-lg"
                                />
                            ) : (
                                <span className="text-gray-600">Klik untuk upload</span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </DialogBody>
                <DialogFooter className="flex gap-3">
                    <Button color="gray" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    <Button className="bg-[#ba0c0c]" onClick={handleUploadProof} disabled={loading}>
                        {loading ? "Mengunggah..." : "Kirim Bukti"}
                    </Button>
                </DialogFooter>
            </Dialog >
        </section >
    );
}

export default Payment;
