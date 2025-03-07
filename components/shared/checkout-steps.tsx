import { cn } from "@/lib/utils";
import { FileCheck, MapPinHouse, Receipt, User } from "lucide-react";
import React from "react";

const pages = [
  { name: "User Login", icon: User },
  { name: "Shipping Address", icon: MapPinHouse },
  { name: "Payment Method", icon: Receipt },
  { name: "Place Order", icon: FileCheck },
];

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
      {pages.map((step, index) => (
        <React.Fragment key={step.name}>
          <div
            className={cn(
              "p-2 w-56 rounded-full text-center text-sm flex items-center justify-center",
              index === current ? "bg-secondary text-secondary-foreground" : ""
            )}
          >
            {
              <step.icon
                className={cn("mr-2 opacity-65", {
                  "opacity-100": index === current,
                })}
                color={index === current ? "#FFF" : undefined}
              />
            }
            <span>{step.name}</span>
          </div>
          {step.name !== "Place Order" && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
