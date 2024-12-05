// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import Benefits from "./benefits";
import Projects from "./products";
import Subscribe from "./subscribe";
import PopularProducts from "./popular-products";
import ContactForm from "./contact-form";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <Benefits />
      <Projects />
      <Subscribe />
      <PopularProducts />
      <ContactForm />
      <Footer />
    </>
  );
}
