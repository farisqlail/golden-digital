"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarDetail, Footer } from "@/components";
import { getResourceWithToken } from "../../../../utils/Fetch";
import Sidebar from "@/components/Sidebar";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const router = useRouter();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toString()) {
      case "1":
      case "active":
        return "bg-green-100 text-green-800";
      case "0":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "lunas":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "gagal":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        router.push("/login");
        return;
      }

      try {
        const user = await getResourceWithToken("profile", authToken);
        const data = await getResourceWithToken(
          `transactions/history/${user.data.id}`,
          authToken
        );

        console.log("transactions response", data.data.transactions);
        setTransactions(data.data.transactions);
      } catch (err) {
        setError(err.message || "Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
  };

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

  return (
    <>
      <NavbarDetail />
      <div className="min-h-screen flex flex-col md:flex-row justify-center gap-6 p-4 md:p-8">
        <Sidebar />

        <div className="bg-white rounded-lg shadow-md p-4 w-full md:max-w-4xl">
          <h2 className="text-lg font-semibold mb-4">Riwayat Transaksi</h2>
          <div className="overflow-x-auto">
            {transactions.length === 0 ? (
              <div className="text-center">
                <h2 className="text-lg font-semibold">
                  Tidak ada transaksi ditemukan.
                </h2>
                <p className="text-gray-500">
                  Anda belum melakukan transaksi apapun.
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="mt-4 px-4 py-2 bg-[#ba0c0c] text-white rounded"
                >
                  Kembali ke Beranda
                </button>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-center mb-6">
                  Riwayat Transaksi
                </h1>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border-b p-4 text-left">
                        Kode Transaksi
                      </th>
                      <th className="border-b p-4 text-left">Produk</th>
                      <th className="border-b p-4 text-left">
                        Tanggal Pembelian
                      </th>
                      <th className="border-b p-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4 font-mono text-sm">
                          {transaction.transaction_code}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {transaction.voucher?.name || "-"}
                            </span>
                            <span className="text-sm text-gray-500">
                              Harga: Rp{" "}
                              {transaction.amount
                                ? transaction.amount.toLocaleString()
                                : "-"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {formatDate(transaction.created_at)}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleViewDetail(transaction)}
                            className="px-3 py-1 bg-red-700 text-white rounded text-sm hover:bg-white hover:border hover:border-red-700 hover:text-red-700 transition-colors"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail Transaksi */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Detail Transaksi</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={closeDetailModal}
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Informasi Umum</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">
                      Kode Transaksi
                    </span>
                    <p className="font-mono text-sm">
                      {selectedTransaction.transaction_code}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Tanggal</span>
                    <p>{formatDateTime(selectedTransaction.created_at)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Total Harga</span>
                    <p className="font-semibold text-lg">
                      Rp{" "}
                      {selectedTransaction.amount
                        ? selectedTransaction.amount.toLocaleString()
                        : 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Detail Voucher</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">Nama Voucher</span>
                    <p className="font-medium">
                      {selectedTransaction.voucher?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Akun</span>
                    <p>
                      {selectedTransaction.voucher?.akun?.email} |{" "}
                      {selectedTransaction.voucher?.akun?.password}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4">
              <button
                onClick={closeDetailModal}
                className="w-full px-4 py-2 bg-red-700 text-white rounded hover:border hover:border-red-700 hover:text-red-700 hover:bg-white transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default TransactionHistory;
