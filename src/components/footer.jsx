import { Typography, Button } from "@material-tailwind/react";

const LINKS = ["Benefit", "Produk", "Cara Berlangganan"];
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-10 px-6 sm:px-8 pt-20">
      <div className="container mx-auto">
        <div className="mt-16 flex flex-wrap items-center justify-center gap-y-4 border-t border-gray-200 py-6 md:justify-between">
          <Typography className="text-center font-normal !text-white">
            &copy; {CURRENT_YEAR} Made by{" "}
            <a href="https://www.material-tailwind.com" target="_blank">
              Golden Digital
            </a>{" "}
          </Typography>
          <ul className="flex flex-wrap gap-4 sm:gap-8 items-center justify-center md:justify-end">
            {LINKS.map((link) => (
              <li key={link}>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  className="font-normal text-white hover:text-gray-900 transition-colors"
                >
                  {link}
                </Typography>
              </li>
            ))}
            <Button className="bg-[#ba0c0c] text-sm px-4 py-2 sm:text-base sm:px-6 sm:py-3">
              Langganan
            </Button>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;