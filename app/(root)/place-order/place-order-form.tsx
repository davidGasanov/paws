"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/lib/actions/order.actions";
import { formatError } from "@/lib/utils";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const PlaceOrderform = () => {
  const router = useRouter();
  const { toast } = useToast();

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full">
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Check className="w-4 h-4" /> Place order
          </>
        )}
      </Button>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let res;

    try {
      res = await createOrder();
    } catch (error: unknown) {
      console.log("error whilst creating order: ", error);
      toast({
        title: "Error",
        description: formatError(error),
        variant: "destructive",
      });
    }
    // if (!res?.success) {
    //   toast({
    //     title: "Error",
    //     description: res?.message,
    //     variant: "destructive",
    //   });
    // }

    if (res?.redirect) router.push(res.redirect);
  };

  return (
    <form className="w-full" onClick={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderform;
