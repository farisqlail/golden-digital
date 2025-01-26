import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ProductCard({ img, title, desc, code }) {
  const router = useRouter();

  const toDetail = (id) => {
    router.push(`/product/${id}`);
  }

  return (
    <Card color="transparent" shadow={false} className="w-full">
      <CardHeader floated={false} className="mx-0 mt-0 mb-6 h-48">
        <Image
          src={img}
          alt={title}
          width={768}
          height={768}
          className="h-full w-full object-contain cursor-pointer"
          onClick={() => toDetail(code)}
        />
      </CardHeader>
      <CardBody className="p-0 text-left">
        <span
          onClick={() => toDetail(code)}
          className="text-white transition-colors hover:text-[#ba0c0c] cursor-pointer"
        >
          <Typography variant="h5" className="mb-2">
            {title}
          </Typography>
        </span>
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        <Button className="bg-[#ba0c0c]" size="sm" onClick={() => toDetail(code)}>
          Beli
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
