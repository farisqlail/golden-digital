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
    const [benefits, setBenefits] = useState("");
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
            label: "Informasi",
            value: "informasi",
            desc: `Akun premium memberi Anda akses lebih banyak fitur dan kenyamanan. Dengan berlangganan akun premium, Anda dapat menikmati pengalaman tanpa gangguan, mendapatkan akses eksklusif ke konten, dan menikmati fitur tambahan yang tidak tersedia untuk pengguna biasa. Baik untuk menonton, mendengarkan, atau mengelola akun Anda, berlangganan premium memberikan pengalaman yang lebih kaya dan lebih cepat.`
        },
        {
            label: "Skema Berlangganan",
            value: "skema",
            desc: `Pilih paket yang sesuai dengan kebutuhan Anda! Akun premium hadir dengan beberapa pilihan skema berlangganan: Paket Bulanan yang memungkinkan Anda menikmati akses premium dengan biaya bulanan yang terjangkau, Paket Tahunan yang memberikan diskon lebih besar dengan berlangganan untuk setahun penuh, dan Paket Keluarga yang menyediakan akses premium untuk beberapa akun dalam satu keluarga dengan harga yang lebih hemat. Setiap paket menawarkan berbagai keuntungan seperti bebas iklan, kualitas streaming lebih tinggi, dan akses eksklusif ke konten tertentu.`
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
        setBenefits(item.product.description)

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
                                {benefits ? 'Benefit' : <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>}
                            </span>
                            {productData && productData.product.description ? (
                                benefits ? (
                                    <ul className="list-disc pl-5">
                                        {benefits.split('\r\n').map((item, index) => (
                                            item.trim() !== '' && ( // Hanya render item yang tidak kosong
                                                <li key={index} className="text-white">
                                                    {item}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-white">Tidak ada benefit yang tersedia.</p>
                                )
                            ) : (
                                <p className="text-white">Tidak ada benefit yang tersedia.</p>
                            )}
                        </div>

                        <div className="mt-5 bg-[#564d4d] rounded-lg shadow-md p-4"> {/* Menggunakan div sebagai card */}
                            <h2 className="text-white text-lg font-semibold mb-2">Informasi</h2> {/* Judul Card */}
                            {data ? (
                                data.map(({ label, desc }, index) => (
                                    <div key={index} className="mb-2">
                                        <h3 className="text-white font-medium">{label}</h3> {/* Menampilkan label */}
                                        <p className="text-gray-200">{desc}</p> {/* Menampilkan deskripsi */}
                                    </div>
                                ))
                            ) : (
                                <div className="h-32 bg-gray-600 animate-pulse rounded"></div> // Placeholder jika data tidak ada  
                            )}
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
                                {promo.length > 0 && (
                                    <>
                                        <span className="font-semibold text-white">Pilihan Paket</span>
                                        <div className="flex flex-col gap-3 mt-3">
                                            {promo.map((promoItem) => (
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
                                            ))}
                                        </div>
                                    </>
                                )}
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
