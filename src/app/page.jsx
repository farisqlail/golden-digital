// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./partial/hero";
import Benefits from "./partial/benefits";
import Products from "./partial/products";
import Subscribe from "./partial/subscribe";
import PopularProducts from "./partial/popular-products";
import ContactForm from "./partial/contact-form";
import FAQ from "./partial/faq";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularProducts />
      <section id="benefits">
        <Benefits />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="subscribe">
        <Subscribe />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <ContactForm />
      <Footer />
    </>
  );
}
