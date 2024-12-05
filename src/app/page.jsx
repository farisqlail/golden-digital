// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import Benefits from "./benefits";
import Projects from "./products";
import Testimonial from "./testimonial";
import PopularClients from "./popular-clients";
import ContactForm from "./contact-form";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <Benefits />
      <Projects />
      <Testimonial />
      <PopularClients />
      <ContactForm />
      <Footer />
    </>
  );
}
