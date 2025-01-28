// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./partial/hero";
import Trending from "./partial/trending";
import Promos from "./partial/promos";
import Products from "./partial/products";
import PopularProducts from "./partial/popular-products";
import Testimonial from "./partial/testimonial";
import FAQ from "./partial/faq";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <PopularProducts /> */}
      <Trending />
      {/* <section id="benefits">
        <Benefits />
      </section> */}
      <section id="products">
        <Products />
      </section>
      <Promos />
      {/* <section id="subscribe">
        <Subscribe />
      </section> */}
      <Testimonial />
      {/* <section id="faq">
        <FAQ />
      </section> */}
      {/* <ContactForm /> */}
      <Footer />
    </>
  );
}
