import React from "react";
import {
  Controller,
  Control,
  ControllerRenderProps,
  FieldValues,
  ControllerFieldState,
  FieldErrors,
} from "react-hook-form";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip"; // Assuming Radix UI is used
import { AlertCircle } from "lucide-react"; // Icon for displaying errors

interface FormInputWrapperProps {
  name: string;
  control: Control;
  labelText?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  errors?: FieldErrors;
  renderInput: (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => React.ReactNode;
}

const FormInputWrapper: React.FC<FormInputWrapperProps> = ({
  name,
  control,
  labelText,
  errors,
  renderInput,
}) => {
  const hasError = !!(errors && errors[name]);
  return (
    <div
      key={name}
      className={`form-item relative mt-3 ${
        name === "newsletter"
          ? "flex flex-row-reverse justify-end items-center"
          : ""
      }`}
    >
      {/* Label and Error Icon */}
      <div className="flex items-center space-x-2 mb-1">
        {hasError && (
          <Tooltip>
            <TooltipTrigger>
              {/* Error Icon that triggers the tooltip */}
              <AlertCircle className="text-red-500" size="18" />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              align="center"
              className="bg-red-500 text-white p-2 rounded"
            >
              {errors[name]?.message?.toString()}
            </TooltipContent>
          </Tooltip>
        )}
        {labelText && (
          <label className="text-sm font-bold" htmlFor={name}>
            {labelText}
          </label>
        )}
      </div>

      {/* Render the Input Component */}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>{renderInput(field, fieldState)}</>
        )}
      />
    </div>
  );
};

export default FormInputWrapper;
