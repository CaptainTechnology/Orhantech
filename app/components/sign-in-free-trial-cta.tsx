import { Link } from "react-router";
import { Button } from "./ui/button";

export default function SignInFreeTrialCTA({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={"flex md:items-center max-md:flex-col gap-2 " + className}>
      <Button
        size={"lg"}
        className="font-medium text-base bg-signature overflow-hidden px-0.5 py-0.5 h-auto"
      >
        <Link
          to="#"
          className="grow block bg-white text-black px-5 py-[7px] rounded-sm"
        >
          Sign In
        </Link>
      </Button>
      <Button
        size={"lg"}
        asChild
        className="bg-signature font-medium text-base"
      >
        <Link to="#">Free Trial</Link>
      </Button>
    </div>
  );
}
