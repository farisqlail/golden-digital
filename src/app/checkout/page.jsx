// components
import { Navbar, Footer } from "@/components";

// sections
import Checkout from "./partial/Checkout"

export default function CheckoutPage() {
    return (
        <>
            <Navbar />
            <Checkout />
            <Footer />
        </>
    );
}
