// FormInputResolver.tsx
import React from "react";
import { Input } from "../ui/input"; // ShadCN UI components
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea"; // ShadCN UI components
import { Checkbox } from "../ui/checkbox"; // ShadCN UI components
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"; // ShadCN UI components

import { Control, FieldErrors } from "react-hook-form";
import FormInputWrapper from "./FormInputWrapper"; // Import the wrapper component
import { Label } from "../ui/label";

interface FormInputProps {
  name: string;
  inputType: string;
  options?: { value: string; label: string }[];
  placeholder: string;
  labelText?: string;
  disabled?: boolean;
}

export const FormInputResolver = (
  {
    name,
    inputType,
    options = [],
    placeholder,
    labelText = "",
    disabled = false,
  }: FormInputProps,
  control: Control,
  errors: FieldErrors,
  readOnly?: boolean
) => {
  switch (inputType) {
    case "text":
      return (
        <FormInputWrapper
          name={name}
          control={control}
          labelText={labelText}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          errors={errors}
          renderInput={(field) => (
            <Input
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
            />
          )}
        />
      );

    case "long-text":
      return (
        <FormInputWrapper
          name={name}
          control={control}
          labelText={labelText}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          errors={errors}
          renderInput={(field) => (
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
            />
          )}
        />
      );

    case "select":
      return (
        <FormInputWrapper
          name={name}
          control={control}
          labelText={labelText}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          errors={errors}
          renderInput={(field) => (
            <Select {...field} disabled={disabled}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        />
      );

    case "checkbox":
      return (
        <FormInputWrapper
          name={name}
          control={control}
          labelText={labelText}
          disabled={disabled}
          readOnly={readOnly}
          errors={errors}
          renderInput={(field) => (
            <Checkbox {...field} checked={field.value} disabled={disabled}>
              {labelText}
            </Checkbox>
          )}
        />
      );

    case "radio":
      return (
        <FormInputWrapper
          name={name}
          control={control}
          labelText={labelText}
          disabled={disabled}
          readOnly={readOnly}
          errors={errors}
          renderInput={(field) => (
            <RadioGroup value={field.value} onChange={field.onChange}>
              {options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem
                    id={option.value}
                    key={option.value}
                    value={option.value}
                  />

                  <Label htmlFor={option.value} className="text-xs">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      );

    default:
      return null;
  }
};

export default FormInputResolver;
