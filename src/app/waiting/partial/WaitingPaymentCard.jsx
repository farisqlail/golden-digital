// components/WaitingPaymentCard.js  
  
import React, { useState } from "react";  
import Image from "next/image";  
import { useRouter } from "next/navigation";  
import { postResource } from "../../../../utils/Fetch";  
import Toast from '@/components/Toast';  
  
const WaitingPaymentCard = () => {  
    const router = useRouter();  
    const [toastMessage, setToastMessage] = useState('');  
    const [toastType, setToastType] = useState('');  
    const [paymentStatus, setPaymentStatus] = useState("PENDING");  
  
    const checkPaymentStatus = async () => {  
        try {  
            const dataPayment = JSON.parse(localStorage.getItem("dataPayment"));  
            const payload = {  
                transaction_code: dataPayment.transaction_code,  
            };  
  
            const response = await postResource("check-payment-status", payload);  
  
            if (response.payment_status === "PENDING") {  
                setToastMessage("Payment is still pending. Please complete the payment.");  
                setToastType("warning");  
            } else if (response.payment_status === "PAID") {  
                router.push("/success");  
            }  
  
            console.log("tt", response);  
        } catch (error) {  
            console.error("Error checking payment status:", error);  
        }  
    };  
  
    return (  
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">  
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-md">  
                <div className="mb-4 flex justify-center">  
                    <Image  
                        width={1024}  
                        height={800}  
                        alt="subscribe image"  
                        src={`/image/waiting-payment.png`}  
                        className="h-auto max-w-full rounded-lg w-2/4"  
                    />  
                </div>  
                <h2 className="text-xl font-semibold mb-2">Menunggu Pembayaran</h2>  
                <p className="text-gray-500 mb-4 text-sm">  
                    Silakan lakukan pembayaran melalui metode yang telah dipilih. Kami akan memproses pesanan Anda setelah pembayaran berhasil.  
                </p>  
                <div className="flex justify-center">  
                    <button  
                        className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition duration-200"  
                        onClick={checkPaymentStatus}  
                    >  
                        Cek Status Pembayaran  
                    </button>  
                </div>  
            </div>  
  
            <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />  
        </div>  
    );  
};  
  
export default WaitingPaymentCard;  