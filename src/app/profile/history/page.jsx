"use client";  
  
import React, { useEffect, useState } from "react";  
import { useRouter } from "next/navigation";  
import { NavbarDetail, Footer } from "@/components";  
import { getResourceWithToken } from "../../../../utils/Fetch";  
  
function TransactionHistory() {  
  const [transactions, setTransactions] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const router = useRouter();  
  
  useEffect(() => {  
    const fetchTransactions = async () => {  
      const authToken = localStorage.getItem("authToken");  
      if (!authToken) {  
        router.push("/login");  
        return;  
      }  
  
      try {  
        const user = await getResourceWithToken("profile", authToken);
        const data = await getResourceWithToken(`transactions/history/${user.data.id}`, authToken);  
        setTransactions(data.data.transactions);  
      } catch (err) {  
        setError(err.message || "Failed to fetch transactions");  
      } finally {  
        setLoading(false);  
      }  
    };  
  
    fetchTransactions();  
  }, []);  
  
  if (loading) {  
    return <div className="flex justify-center items-center h-screen">Loading...</div>;  
  }  
  
  if (error) {  
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;  
  }  
  
  return (  
    <>  
      <NavbarDetail />  
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center gap-6 p-4 md:p-8">  
        {/* Sidebar */}  
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 w-full md:max-w-sm">  
          <div className="flex items-center gap-2 cursor-pointer">  
            <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">  
              <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />  
              <path  
                d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"  
                stroke="currentColor"  
                strokeWidth="1.5"  
                strokeLinecap="round"  
              />  
            </svg>  
            <span className="text-sm md:text-base">Profile</span>  
          </div>  
          <div className="flex items-center gap-2 cursor-pointer">  
            <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">  
              <path  
                d="M9 11H15M9 7H13M9 15H15M5 6.2V21L7.5 19L10 21L12 19L14 21L16.5 19L19 21V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2Z"  
                stroke="currentColor"  
                strokeWidth="2"  
                strokeLinecap="round"  
              />  
            </svg>  
            <span className="text-sm md:text-base">Pesanan</span>  
          </div>  
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {  
            localStorage.removeItem("authToken");  
            router.push("/");  
          }}>  
            <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">  
              <path  
                d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"  
                stroke="currentColor"  
                strokeWidth="1.5"  
                strokeLinecap="round"  
              />  
              <path  
                d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"  
                stroke="currentColor"  
                strokeWidth="1.5"  
                strokeLinecap="round"  
              />  
            </svg>  
            <span className="text-sm md:text-base">Keluar</span>  
          </div>  
        </div>  
  
        {/* Main Content */}  
        <div className="bg-white rounded-lg shadow-md p-4 w-full md:max-w-4xl">  
          <h2 className="text-lg font-semibold mb-4">Riwayat Transaksi</h2>  
          <div className="overflow-x-auto">  
            <table className="min-w-full divide-y divide-gray-200">  
              <thead className="bg-gray-50">  
                <tr>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Transaksi</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Customer</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pembelian</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Pembayaran</th>  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>  
                </tr>  
              </thead>  
              <tbody className="bg-white divide-y divide-gray-200">  
                {transactions.map((transaction) => (  
                  <tr key={transaction.id}>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.kode_transaksi}</td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.nama_customer}</td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(transaction.tanggal_pembelian).toLocaleDateString()}</td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.status_pembayaran}</td>  
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.harga.toLocaleString()} IDR</td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
          </div>  
        </div>  
      </div>  
      <Footer />  
    </>  
  );  
}  
  
export default TransactionHistory;  
