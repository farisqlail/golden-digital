import { Card, CardBody, Typography } from "@material-tailwind/react";

export function BenefitsCard({ icon: Icon, title, children }) {
  return (
    <Card color="transparent" shadow={false}>
      <CardBody className="grid justify-center text-center">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-amber-600 p-2.5 text-white shadow">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <Typography variant="h5" color="white" className="mb-2">
          {title}
        </Typography>
        <Typography className="px-8 font-normal !text-white">
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default BenefitsCard;
