import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/actions/order.actions";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";
import { FaCheckCircle } from "react-icons/fa";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const StripePaymentSuccessPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) => {
  const { id } = await props.params;
  const { payment_intent: paymentIntentId } = await props.searchParams;

  //   Fetch order
  const order = await getOrderById(id);
  if (!order) {
    return notFound();
  }

  //   Retreive payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (
    paymentIntent.metadata.orderId === null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    return notFound();
  }

  //   Check if payment is successfull
  const isSuccess = paymentIntent.status === "succeeded";

  if (!isSuccess) return redirect(`/order/${id}`);

  return (
    <div className="max-w-4xl md:min-h-[400px] w-full mx-auto space-y-8">
      <div className="flex flex-col gap-6 items-center mt-10">
        <FaCheckCircle size={82} color="#4BB543" />
        <h1 className="h1-bold text-center">Thank you for your purchase!</h1>
        <div className="max-w-[90%] md:max-w-[40%] text-center">
          We are processing your order. You can check order details by clicking
          the button below.
        </div>
        <Button asChild>
          <Link href={`/order/${id}`}>View order</Link>
        </Button>
      </div>
    </div>
  );
};

export default StripePaymentSuccessPage;
