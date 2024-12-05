// components
import { Navbar, Footer } from "@/components";

// sections
import Detail from "./partial/Detail"
import ContactForm from "../contact-form";

export default function Portfolio() {
    return (
        <>
            <Navbar />
            <Detail />
            <ContactForm />
            <Footer />
        </>
    );
}
