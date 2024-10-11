// FormInputResolver.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSchemaInput, FormValues } from "./FormBuilder";
import FormInputWrapper from "./FormInputWrapper";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { PatternFormat } from "react-number-format";

interface FormInputResolverProps {
  formInput: FormSchemaInput;
  readOnly?: boolean;
}

const FormInputResolver = ({
  formInput,
  readOnly = false,
}: FormInputResolverProps): React.ReactElement | null => {
  const {
    name,
    inputType,
    options = [],
    placeholder,
    labelText,
    disabled,
  } = formInput;

  const form = useFormContext<FormValues>();

  if (!form) {
    throw new Error("FormInputResolver must be used within a FormProvider");
  }

  const { control } = form;

  switch (inputType) {
    case "text":
      return (
        <FormInputWrapper name={name} control={control} labelText={labelText}>
          {(field) => (
            <Input
              {...field}
              value={
                field.value as string | number | readonly string[] | undefined
              }
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
            />
          )}
        </FormInputWrapper>
      );

    case "long-text":
      return (
        <FormInputWrapper name={name} control={control} labelText={labelText}>
          {(field) => (
            <Textarea
              {...field}
              value={
                field.value as string | number | readonly string[] | undefined
              }
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
            />
          )}
        </FormInputWrapper>
      );

    case "select":
      return (
        <FormInputWrapper name={name} control={control} labelText={labelText}>
          {(field) => (
            <Select
              disabled={disabled || readOnly}
              onValueChange={field.onChange}
              value={field.value as string}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormInputWrapper>
      );

    case "checkbox":
      return (
        <FormInputWrapper name={name} control={control} labelText={labelText}>
          {(field) => (
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
              disabled={disabled || readOnly}
            />
          )}
        </FormInputWrapper>
      );

    case "radio":
      return (
        <FormInputWrapper name={name} control={control} labelText={labelText}>
          {(field) => (
            <RadioGroup
              value={field.value as string}
              onValueChange={field.onChange}
              disabled={disabled || readOnly}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} />
                  <label>{option.label}</label>
                </div>
              ))}
            </RadioGroup>
          )}
        </FormInputWrapper>
      );

    case "phone":
      return (
        <FormInputWrapper name={name} control={control} labelText={labelText}>
          {(field) => (
            <PatternFormat
              value={field.value as string | number | undefined}
              onValueChange={(values) => {
                field.onChange(values.value);
              }}
              placeholder={placeholder}
              disabled={disabled || readOnly}
              customInput={Input}
              getInputRef={field.ref}
              format="+1 (###) - ### - ####"
              allowEmptyFormatting
              mask="_"
            />
          )}
        </FormInputWrapper>
      );

    default:
      return null;
  }
};

export default FormInputResolver;
