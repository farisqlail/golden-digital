"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarDetail, Footer } from "@/components";
import { getResource, getResourceWithToken, createResource } from "../../../../utils/Fetch";
import Sidebar from "@/components/Sidebar";

export default function Vouchers() {
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const router = useRouter();

    useEffect(() => {
        const fetchVouchers = async () => {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                router.push("/login");
                return;
            }

            try {
                const dataUser = await getResourceWithToken("profile", authToken);
                const data = await getResource(`vouchers?user_id=${dataUser.data.id}`);

                setVouchers(data?.vouchers || []);
            } catch (err) {
                setError(err.message || "Failed to fetch vouchers");
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                Error: {error}
            </div>
        );
    }

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000); // auto hide 3 detik
    };

    const claimVoucher = async (id) => {
        const authToken = localStorage.getItem("authToken");
        try {
            const dataUser = await getResourceWithToken("profile", authToken);
            const payload = {
                user_id: dataUser.data.id,
                voucher_id: id,
                points_used: dataUser.data.point
            }
            const data = await createResource(`vouchers/claim`, payload, authToken);

            if (data.success === true) {
                showToast("Voucher berhasil diklaim!", "success");
                setTimeout(() => window.location.reload(), 1500);
            } else {
                console.log(data.message);
            }
        } catch (err) {
            setError(err.message || "Failed to fetch vouchers");
        } finally {
            setLoading(false);
        }
    }

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);

    const totalPages = Math.ceil(vouchers.length / itemsPerPage);
    const currentData = vouchers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <NavbarDetail />
            <div className="min-h-screen flex flex-col md:flex-row justify-center gap-6 p-4 md:p-8">
                <Sidebar />

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-md p-4 w-full md:max-w-4xl">
                    {toast.show && (
                        <div
                            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
                                }`}
                        >
                            {toast.message}
                        </div>
                    )}

                    <h2 className="text-lg font-semibold mb-4">Daftar Voucher</h2>

                    {vouchers.length === 0 ? (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold">Tidak ada voucher ditemukan.</h2>
                            <p className="text-gray-500">Anda belum memiliki voucher.</p>
                            <button
                                onClick={() => router.push("/")}
                                className="mt-4 px-4 py-2 bg-[#ba0c0c] text-white rounded"
                            >
                                Kembali ke Beranda
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {currentData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
                                    >
                                        <div>
                                            <h3 className="text-md font-semibold mb-1">{item.name}</h3>
                                            <p className="text-gray-600 mb-1">
                                                Harga: {formatCurrency(item.amount)}
                                            </p>
                                            <p className="text-gray-600 mb-1">
                                                Min Poin: {item.min_points_required ?? "-"}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Dibuat:{" "}
                                                {new Date(item.created_at).toLocaleDateString("id-ID")}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => claimVoucher(item.id)}
                                            className="mt-4 px-3 py-2 bg-[#ba0c0c] text-white rounded hover:bg-red-700"
                                        >
                                            Klaim Voucher
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-6">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        Sebelumnya
                                    </button>
                                    <span>
                                        {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                        className="px-3 py-1 bg-[#ba0c0c] text-white rounded disabled:opacity-50"
                                    >
                                        Selanjutnya
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
