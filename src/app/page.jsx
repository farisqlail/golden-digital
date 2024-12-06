// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./partial/hero";
import Benefits from "./partial/benefits";
import Projects from "./partial/products";
import Promos from "./partial/promos";
import Subscribe from "./partial/subscribe";
import PopularProducts from "./partial/popular-products";
import ContactForm from "./partial/contact-form";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <Benefits />
      <Promos />
      <Projects />
      <Subscribe />
      <PopularProducts />
      <ContactForm />
      <Footer />
    </>
  );
}
