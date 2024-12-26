import Image from "next/image";
import {useRouter} from "next/navigation";
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
    <Card color="transparent" shadow={false}>
      <CardHeader floated={false} className="mx-0 mt-0 mb-6 h-48">
        <Image
          src={img}
          alt={title}
          width={768}
          height={768}
          className="h-full w-full object-contain"
        />
      </CardHeader>
      <CardBody className="p-0">
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-800"
        >
          <Typography variant="h5" className="mb-2">
            {title}
          </Typography>
        </a>
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        <Button className="bg-amber-600" size="sm" onClick={() => toDetail(code)}>
          Beli
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
