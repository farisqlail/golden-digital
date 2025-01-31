"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from 'next/script';
import Image from "next/image";
import {
    Card,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Radio,
    Button,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { v4 as uuidv4 } from 'uuid';

import {
    getResource,
    postResource,
    getResourceWithToken
} from "../../../../../utils/Fetch";

export function Detail({ productData, id }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState("informasi");
    const [promo, setPromo] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openSecondModal, setOpenSecondModal] = useState(false);
    const [dataUser, setDataUser] = useState(null);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [varian, setVarian] = useState("");
    const [duration, setDuration] = useState("");
    const [idPrice, setIdPrice] = useState(0);
    const [kodeToko, setKodeToko] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [variance, setVariance] = useState([]);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        transaction_code: productData?.kode_toko,
    });
    const handleOpen = () => setOpen(!open);
    const handleOpenSecondModal = () => setOpenSecondModal(!openSecondModal);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem("authToken");
                const result = await getResource(`vouchers?id_variance=${productData?.product.id_varian}&id_product_type=${productData?.product?.product_type?.id}`);
                const resultData = await getResource(`get_detail_products/${id}`)
                if (authToken) {
                    const resultUser = await getResourceWithToken("profile", authToken);
                    setDataUser(resultUser.data);
                }

                setVariance(resultData.prices);
                setPromo(Array.isArray(result.vouchers) ? result.vouchers : []);

                if (variance.length > 0) {
                    setSelectedIndex(0);
                }
                handleSelect(productData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [productData]);

    const refreshVoucher = async (id) => {
        try {
            const result = await getResource(`vouchers?id_variance=${productData?.product.id_varian}&id_product_type=${id}`);

            setPromo(Array.isArray(result.vouchers) ? result.vouchers : []);
        } catch (error) {
            console.error("Error fetching vouchers:", error);
        }
    };

    const toCheckout = () => {
        if (localStorage.getItem("authToken")) {
            const transactionCode = uuidv4();

            const data = {
                external_id: kodeToko,
                amount: calculateTotalAmount(),
                id_price: idPrice,
                id_customer: dataUser ? dataUser.id : 0,
                id_promo: selectedPromo ? selectedPromo.id : 0,
                customer_name: dataUser ? dataUser.name : formData.name,
                email_customer: dataUser ? dataUser.email : formData.email,
                phone_customer: dataUser ? dataUser.number : formData.phone,
                transaction_code: transactionCode,
                payment_status: "PENDING",
                product: productData?.product?.variance?.variance_name,
                duration: duration,
                product_price: price,
                discountAmount: selectedPromo?.amount,
                tax: calculateTotalTaxAmount()
            };

            localStorage.setItem("dataPayment", JSON.stringify(data));

            router.push("/checkout")
        } else {
            handleOpen();
        }
    }

    const data = [
        {
            label: "Private Profile",
            value: "private",
            desc: `Satu akun private berisikan 5 Pembeli
            Dikarenakan batas screen limit Netflix 4 user, apabila 4 user sedang menonton otomatis 1 user menunggu (terkena batas layar)
            Apabila terkena batas layer bisa download vidio dan ditonton secara offline agar tidak terkena batas layar`
        },
        {
            label: "Anti Limit Profile",
            value: "anti",
            desc: `Satu akun private platinum berisikan 4 pembeli
            Tidak akan terkena screen limit
            Mendapatkan prioritas customer service
            Tidak akan terkena household`
        },
        {
            label: "Sharing Profile",
            value: "sharing",
            desc: `Satu akun sharing berisikan 10 Pembeli
            Dikarenakan batas screen limit Netflix 4 user, apabila 4 user sedang menonton otomatis 6 user menunggu (terkena batas layar)
            Apabila terkena batas layar bisa download vidio dan ditonton secara offline agar tidak terkena batas layar
            Tidak direkomendasikan untuk TV`
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const checkout = async () => {
        if (localStorage.getItem("authToken")) {
            await handleSubmit();
        } else {
            handleOpen();
        }
    }

    const calculateTotalAmount = () => {
        const discount = selectedPromo?.amount || 0;
        if (discount > 0) {
            const harga = price;
            const totalAfterDiscount = harga - discount;
            const biayaAdmin = totalAfterDiscount * 0.06;
            return totalAfterDiscount + biayaAdmin;
        } else {
            const harga = price;
            const biayaAdmin = harga * 0.06;
            return harga + biayaAdmin;
        }
    };

    const handlePromoSelect = (promoItem) => {
        setSelectedPromo(promoItem);
    };

    const handleSubmit = async () => {
        const transactionCode = uuidv4();

        const data = {
            external_id: kodeToko,
            amount: calculateTotalAmount(),
            id_price: idPrice,
            id_customer: dataUser ? dataUser.id : 0,
            id_promo: selectedPromo ? selectedPromo.id : 0,
            customer_name: dataUser ? dataUser.name : formData.name,
            email_customer: dataUser ? dataUser.email : formData.email,
            phone_customer: dataUser ? dataUser.number : formData.phone,
            transaction_code: transactionCode,
            payment_status: "PENDING",
            product: productData?.product?.variance?.variance_name,
            duration: duration,
            product_price: price,
            discountAmount: selectedPromo?.amount,
            tax: calculateTotalTaxAmount()
        };

        localStorage.setItem("dataPayment", JSON.stringify(data));

        router.push("/checkout")
    };

    const checkoutMidtrans = async () => {
        const data = {
            amount: 10000,
            customer_name: "John Doe",
            email: "john@example.com",
            phone: "08123456789",
        }

        const response = await postResource('payment/create', data);
        if (response.success) {
            window.snap.pay(response.snap_token, {
                onSuccess: function (result) {
                    console.log('Payment Success:', result);
                },
                onPending: function (result) {
                    console.log('Payment Pending:', result);
                },
                onError: function (result) {
                    console.log('Payment Error:', result);
                },
                onClose: function () {
                    console.log('Payment Modal Closed');
                }
            });
        } else {
            console.error('Error:', response.message);
        }
    }

    const calculateTotalTaxAmount = () => {
        const discount = selectedPromo?.amount || 0;
        if (discount > 0) {
            const harga = price;
            const totalAfterDiscount = harga - discount;
            const biayaAdmin = totalAfterDiscount * 0.06;
            return biayaAdmin;
        } else {
            const harga = price;
            const biayaAdmin = harga * 0.06;
            return biayaAdmin;
        }
    };

    const toAuth = () => {
        router.push('/auth/login');
    }

    const handleSelect = (item, index) => {
        setSelectedIndex(index ? index : 0);
        setPrice(item.harga)
        setVarian(item.product.product_type.type_name)
        setDuration(item.product.ket_durasi)
        setIdPrice(item.id)
        setKodeToko(item.kode_toko)

        setSelectedPromo(null); // Mengatur selectedPromo ke null  
        handlePromoSelect(null);

        refreshVoucher(item.product.product_type.id)
    };

    return (
        <section className="py-8 px-4">
            <div className="container mx-auto text-left">
                <Typography variant="h2" color="white" className="mb-4">
                    {productData ? `Langganan ${productData?.product?.variance?.variance_name}` : <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>}
                </Typography>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Kiri */}
                    <div className="flex-[3] flex flex-col gap-4">
                        <div className="max-w-[18rem] mx-auto lg:mx-0 mt-5 border-2 rounded-lg p-2 bg-white">
                            {productData?.product?.variance?.variance_name ? (
                                <Image
                                    width={1024}
                                    height={800}
                                    alt="product"
                                    src={`/logos/${productData?.product?.variance?.variance_name.toLowerCase()}.png`}
                                    className="h-full rounded-lg w-full"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-semibold text-white">
                                {productData ? 'Benefit' : <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>}
                            </span>
                            {productData ? (
                                [
                                    "Akses penuh ke konten eksklusif yang hanya tersedia untuk pengguna premium.",
                                    "Fitur pencarian lanjutan untuk menemukan apa yang kamu cari lebih cepat dan mudah.",
                                    "Kemampuan untuk mengakses berbagai perangkat tanpa batasan, jadi kamu bisa menikmati layanan di mana saja.",
                                    "Peningkatan kualitas streaming, memberikan pengalaman menonton atau mendengarkan yang lebih jernih dan tajam.",
                                    "Akses lebih cepat ke update atau fitur baru yang belum tersedia untuk pengguna biasa.",
                                    "Pengaturan personalisasi lebih lengkap, memungkinkan pengalaman yang lebih disesuaikan dengan preferensi kamu.",
                                ].map((benefit, idx) => (
                                    <div className="flex gap-2 text-white" key={idx}>
                                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none">
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                                    fill="#03d100"
                                                />
                                            </g>
                                        </svg>
                                        <span>{benefit}</span>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {[...Array(6)].map((_, idx) => (
                                        <div className="flex gap-2" key={idx}>
                                            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 w-3/4 animate-pulse rounded"></div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="mt-5 bg-[#564d4d] rounded-lg shadow-md p-4"> {/* Menggunakan div sebagai card */}
                            <h2 className="text-white text-lg font-semibold mb-2">Informasi</h2> {/* Judul Card */}
                            {data.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold text-white">{item.label}</h3>
                                    <ul className="list-disc pl-5 text-white">
                                        {item.desc.split('\n').map((descItem, descIndex) => (
                                            <li key={descIndex}>{descItem.trim()}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kanan */}
                    <div className="flex-[1] flex flex-col gap-3">
                        <div className="border rounded-lg p-5">
                            <span className="text-white">{productData ? "Skema Harga" : <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>}</span>
                            <div className="flex flex-col gap-2 mt-2 text-white">
                                {productData ? (
                                    [
                                        ["Nama Paket", varian],
                                        ["Harga", "Rp" + price.toLocaleString()],
                                        ["Diskon", selectedPromo ? "Rp" + selectedPromo.amount.toLocaleString() : "Rp0"],
                                        ["Biaya Admin", "Rp" + calculateTotalTaxAmount().toLocaleString()],
                                        ["Total", "Rp" + calculateTotalAmount().toLocaleString()],
                                    ].map(([label, value], idx) => (
                                        <div className="flex justify-between gap-5 text-white" key={idx}>
                                            <span>{label}</span>
                                            <span className={idx === 4 ? "font-semibold " : ""}>{value}</span>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        {[...Array(3)].map((_, idx) => (
                                            <div className="flex justify-between gap-5" key={idx}>
                                                <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                                                <div className="w-1/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <span className="font-semibold text-white">Pilihan Paket</span>
                            <div className="flex flex-col gap-3 mt-3">
                                {variance.length > 0 && (
                                    variance.map((item, index) => (
                                        <div className="flex gap-3" key={item.id}>
                                            <div className="border rounded-lg p-1 w-full text-white">
                                                <Radio
                                                    name="type_variance"
                                                    label={
                                                        <Typography
                                                            color="white"
                                                            className="flex font-medium text-white items-center"
                                                        >
                                                            {item.product.product_type.type_name} &nbsp; <span className="text-sm">{item.product.durasi} {item.product.ket_durasi}</span>
                                                        </Typography>
                                                    }
                                                    color="red"
                                                    className="text-white"
                                                    checked={selectedIndex === index}
                                                    onChange={() => handleSelect(item, index)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {dataUser && (
                            <div>
                                <span className="font-semibold text-white">Pilihan Paket</span>
                                <div className="flex flex-col gap-3 mt-3">
                                    {promo.length > 0 && (
                                        promo.map((promoItem) => (
                                            <div className="flex gap-3" key={promoItem.id}>
                                                <div className="border rounded-lg p-1 w-full text-white">
                                                    <Radio
                                                        name="type"
                                                        label={
                                                            <Typography
                                                                color="white"
                                                                className="flex font-medium text-white"
                                                            >
                                                                {promoItem.name}
                                                            </Typography>
                                                        }
                                                        color="red"
                                                        className="text-white"
                                                        checked={selectedPromo?.id === promoItem.id}
                                                        onChange={() => handlePromoSelect(promoItem)}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        <Button className="bg-[#ba0c0c] w-full" onClick={toCheckout}>
                            Pesan
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Konfirmasi Pesanan</DialogHeader>
                <DialogBody>
                    Anda dapat mendapatkan point jika anda memiliki akun <span className="font-semibold">Golden Digital</span>
                </DialogBody>
                <DialogFooter className="flex flex-col gap-3">
                    <Button onClick={() => {
                        handleOpen();
                        handleOpenSecondModal();
                    }} className="w-full bg-[#ba0c0c]">
                        <span>Tetap lanjutkan</span>
                    </Button>
                    <div className="flex justify-center">
                        <span className="mr-1 w-full cursor-pointer text-[#ba0c0c]" onClick={toAuth}>Login dan dapatkan point!</span>
                    </div>
                </DialogFooter>
            </Dialog>

            <Dialog open={openSecondModal} handler={handleOpenSecondModal}>
                <DialogHeader>Masukkan Informasi Anda</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Nama"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Nomor Telepon"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        className="w-full bg-[#ba0c0c]"
                        onClick={handleSubmit}
                    >
                        Lanjutkan
                    </Button>
                </DialogFooter>
            </Dialog>

            <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-a2u-4CJzXJ9Wm80f" // Replace with your actual client key  
                strategy="afterInteractive"
            />
        </section>
    );
}

export default Detail;
