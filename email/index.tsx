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
  await resend.emails.send({
    from: `${APP_NAME} <${sender_email}>`,
    to: order.user.email,
    subject: `Order confirmation ${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};
