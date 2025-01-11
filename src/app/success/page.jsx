"use client"

import React, { useState, useEffect } from "react";

import {
  getResource,
  postResource
} from "../../../utils/Fetch";

import SuccessPaymentCard from "./partial/SuccessPaymentCard";

export default function WaitingPayment() {
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const dataPayment = JSON.parse(localStorage.getItem("dataPayment"))
        const payload = {
          external_id: dataPayment.external_id,
          status: "PAID",
          customer: {
            email: dataPayment.email_customer,
            name: dataPayment.customer_name,
            phone: dataPayment.phone_payment
          },
          id_customer: dataPayment.id_customer,
          amount: dataPayment.amount,
          promo_id: dataPayment.id_promo,
          transaction_code: dataPayment.transaction_code,
          payment_status: "PAID"
        };

        const response = await postResource("confirm-payment", payload);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // setPaymentStatus(data.status);

          // if (data.status === "PAID" || data.status === "FAILED") {
          //   clearInterval(interval);
          // }

          // localStorage.removeItem("dataPayment");
        } else {
          console.error("Failed to fetch payment status:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus();
  }, []);

  return (
    <>
      <SuccessPaymentCard />
    </>
  );
}