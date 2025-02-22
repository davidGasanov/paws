// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { APP_NAME, sender_email } from "@/lib/constants";
import { OrderSchema } from "@/types";
import { Resend } from "resend";
import PurchaseReceiptEmail from "./purchase-receipt";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({
  order,
}: {
  order: OrderSchema;
}) => {
  try {
    console.log("sending email to: ", order.user.email);
    await resend.emails.send({
      from: `${APP_NAME} <${sender_email}>`,
      to: order.user.email,
      subject: `Order confirmation ${order.id}`,
      react: <PurchaseReceiptEmail order={order} />,
    });
    console.log("Email sent!");
  } catch (error) {
    console.log("Email not sent!");
    console.error(error);
  }
};

export const sendTestEmail = async () => {
  try {
    await resend.emails.send({
      from: `${APP_NAME} <${sender_email}>`,
      to: "tansacal@protonmail.com",
      subject: "Email test",
      react: <>Test email body</>,
    });
    console.log("Email sent!");
  } catch (error) {
    console.log("Email not sent!");
    console.error(error);
  }
};
