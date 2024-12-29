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
          external_id: dataPayment.transaction_code,
          status: "PAID"
        };

        const response = await postResource("xendit-callback", payload);

        if (response.ok) {
          const data = await response.json();
          setPaymentStatus(data.status);

          if (data.status === "PAID" || data.status === "FAILED") {
            clearInterval(interval);
          }

          localStorage.removeItem("dataPayment");
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