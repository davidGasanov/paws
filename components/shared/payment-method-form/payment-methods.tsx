import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PAYMENT_METHODS } from "@/lib/constants";
import { PaymentMethodType } from "@/types";
import { Control } from "react-hook-form";

interface FormFieldProps {
  name: keyof PaymentMethodType;
  control: Control<
    PaymentMethodType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
}

const PaymentMethodsField = ({ name, control }: FormFieldProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                className="flex flex-col space-y-2"
              >
                {PAYMENT_METHODS.map((method) => (
                  <FormItem
                    key={method}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem
                        value={method}
                        checked={field.value === method}
                      ></RadioGroupItem>
                    </FormControl>
                    <FormLabel className="font-normal">{method}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentMethodsField;
