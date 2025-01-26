import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShippingAddress } from "@/types";
import { Control, ControllerRenderProps } from "react-hook-form";
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";

interface FormFieldProps {
  name: keyof typeof SHIPPING_ADDRESS_DEFAULT_VALUES;
  label: string;
  placeHolder?: string;
  control: Control<
    {
      fullName: string;
      streetAddress: string;
      city: string;
      postalCode: string;
      country: string;
      lat?: number | undefined;
      lng?: number | undefined;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
}

const ShippingFormField = ({
  name,
  label,
  placeHolder,
  control,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<ShippingAddress, typeof name>;
      }) => (
        <div className="flex flex-col md:flex-row gap-5">
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeHolder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      )}
    />
  );
};

export default ShippingFormField;
