import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
import Stripe from "stripe";
import { Button } from "@/components/ui/button";
import { sendPurchaseReceipt } from "@/email";

export const metadata: Metadata = {
  title: "Order details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  const session = await auth();

  let client_secret = null;

  // Check if not paid and using stripe
  if (order?.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }
  if (!order) notFound();
  console.log("order: ", order);


  return (
    <>
      <OrderDetailsTable
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user?.role === "admin" || false}
        stripeClientSecret={client_secret}
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
      />
      <Button
        onClick={async () => {
          "use server";
          sendPurchaseReceipt({
            order: {
              ...order,
              shippingAddress: {
                fullName: "John Doe",
                streetAddress: "123 Main st",
                city: "New York",
                postalCode: "10001",
                country: "US",
              },
              paymentResult: {
                id: "123",
                status: "succeeded",
                pricePaid: "100",
                email_address: "test@test.com",
              },
            },
          });
        }}
      >
        Send test email
      </Button>
    </>
  );
};

export default OrderDetailsPage;
