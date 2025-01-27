"use client";

import ShippingFormField from "@/components/shared/shipping-address-form/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateUserAddress } from "@/lib/actions/user.actions";
import { SHIPPING_ADDRESS_DEFAULT_VALUES_EMPTY } from "@/lib/constants";
import { shippingAddressSchema } from "@/lib/validators";
import { ShippingAddress } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ShippingAddressFormProps {
  address: ShippingAddress;
}

const ShippingAddressForm = ({ address }: ShippingAddressFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || SHIPPING_ADDRESS_DEFAULT_VALUES_EMPTY,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ShippingAddress> = async (values) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }

      router.push("/payment-method");
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Shipping Address</h1>
        <p className="text-small text-muted-foreground">
          Please enter an address to ship to
        </p>
        <Form {...form}>
          <form
            method="post"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ShippingFormField
              name="fullName"
              label="Full name"
              control={form.control}
              placeHolder="Enter your full name"
            />
            <ShippingFormField
              name="streetAddress"
              label="Street Address"
              control={form.control}
              placeHolder="Enter your address"
            />
            <ShippingFormField
              name="city"
              label="City"
              control={form.control}
              placeHolder="Enter your city"
            />
            <ShippingFormField
              name="postalCode"
              label="Postal code"
              control={form.control}
              placeHolder="Enter your postal code"
            />
            <ShippingFormField
              name="country"
              label="Country"
              control={form.control}
              placeHolder="Enter your country"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ShippingAddressForm;
