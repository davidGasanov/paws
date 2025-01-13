import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        priority
        alt={`${APP_NAME} Logo`}
      />
      <div className="p-6 rounded-lg shadow-md text-center w-1/3">
        <h1 className="text-3xl font-bold mb-4">Not found</h1>
        <p className="text-destructive">Requested page was not found</p>
        <Button variant={"outline"} className="mt-4 ml-2">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
