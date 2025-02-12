'use client'

import React, { useEffect, useState } from "react";
import { NavbarDetail, Footer } from "@/components";

// sections
import Checkout from "./partial/Checkout"

export default function CheckoutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <>
            <NavbarDetail />
            <Checkout />
            <Footer />
        </>
    );
}
