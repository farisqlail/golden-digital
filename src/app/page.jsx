// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./partial/hero";
import Products from "./partial/products";
import PopularProducts from "./partial/popular-products";
import FAQ from "./partial/faq";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularProducts />
      {/* <section id="benefits">
        <Benefits />
      </section> */}
      <section id="products">
        <Products />
      </section>
      {/* <section id="subscribe">
        <Subscribe />
      </section> */}
      <section id="faq">
        <FAQ />
      </section>
      {/* <ContactForm /> */}
      <Footer />
    </>
  );
}
