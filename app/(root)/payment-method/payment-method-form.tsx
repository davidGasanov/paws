"use client";

import PaymentMethodsField from "@/components/shared/payment-method-form/payment-methods";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants";
import { paymentMethodSchema } from "@/lib/validators";
import { PaymentMethodType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

interface PaymentMethodFormProps {
  preferredPaymentMethod: string | null;
}

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: PaymentMethodFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PaymentMethodType>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: { type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: PaymentMethodType) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }

      router.push("/place-order");
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Payment method</h1>
        <p className="text-small text-muted-foreground">
          Please select a preferred payment method
        </p>
        <Form {...form}>
          <form
            method="post"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Add fields here */}
            <PaymentMethodsField name="type" control={form.control} />

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

export default PaymentMethodForm;
