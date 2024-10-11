// FormInputWrapper.tsx
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form"; // Adjust the import path as needed
import {
  Control,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
  Path,
} from "react-hook-form";

interface FormInputWrapperProps<
  TFieldValues extends FieldValues = FieldValues
> {
  name: string;
  control: Control<TFieldValues>;
  labelText?: string;
  children: (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
    fieldState: ControllerFieldState
  ) => React.ReactNode;
}

const FormInputWrapper = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  labelText,
  children,
}: FormInputWrapperProps<TFieldValues>): React.ReactElement => {
  const labelBesideInput = children.toString().includes("Checkbox");

  return (
    <FormField
      control={control}
      name={name as Path<TFieldValues>}
      render={({ field, fieldState }) => (
        <FormItem>
          <div
            className={`flex  gap-2 ${
              labelBesideInput ? "flex-row-reverse justify-end" : "flex-col"
            }`}
          >
            {labelText && (
              <FormLabel className="font-bold">{labelText}</FormLabel>
            )}
            <FormControl>{children(field, fieldState)}</FormControl>
          </div>

          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormInputWrapper;
