/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInputResolver from "./FormInputResolver"; // Import the resolver
import { Loader2 } from "lucide-react"; // For spinner
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";

export interface FormSchemaInput {
  name: string;
  inputType: string;
  placeholder?: string;
  labelText?: string;
  options?: { value: string; label: string }[];
  defaultValue?: any;
  disabled?: boolean;
  zod: z.ZodTypeAny;
}

export interface FormSection {
  inputs: FormSchemaInput[];
  title: string; // Added title for the section
  loading?: boolean; // Optional loading state for the section
}

export interface FormBuilderProps {
  formSchema: { [key: string]: FormSection };
  submitHandler: (data: any) => void;
  saveLabel?: string;
  cancelLabel?: string;
  submitOnChange?: boolean;
  readOnly?: boolean;
  onCancelClick?: () => void;
  formId?: string;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  formSchema,
  submitHandler,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  //   submitOnChange = false,
  readOnly = false,
  //   onCancelClick = () => {},
  formId = "",
}) => {
  // State to manage global loading during form submission
  const [formLoading, setFormLoading] = useState(false);

  // Flatten inputs across sections to create Zod schema object
  const inputsArray = Object.values(formSchema).flatMap(
    (section) => section.inputs
  );

  const makeZodSchemaObj = () => {
    const obj: { [x: string]: z.ZodTypeAny } = {};
    inputsArray.forEach((formInput) => (obj[formInput.name] = formInput.zod));
    return z.object(obj);
  };

  const zodSchemaObj = makeZodSchemaObj();

  const form = useForm({
    resolver: zodResolver(zodSchemaObj),
    defaultValues: inputsArray.reduce((defaults, input) => {
      if (input.defaultValue) {
        defaults[input.name] = input.defaultValue;
      }
      return defaults;
    }, {} as { [key: string]: any }),
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid, errors },
  } = form;

  // Form submission handler
  const onSubmit = async (data: any) => {
    setFormLoading(true); // Start the loading spinner
    await submitHandler(data);
    setFormLoading(false); // Stop the loading spinner
  };

  return (
    <TooltipProvider delayDuration={250}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => console.log(form.getValues())}
        id={formId}
      >
        {Object.entries(formSchema).map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([sectionKey, { inputs, title, loading }], sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="form-section mb-6">
              {/* Section title with optional loading spinner */}
              <div className="section-title">
                <h2 className="font-bold">
                  {title}
                  {loading || formLoading ? (
                    <Loader2 className="inline-block animate-spin" />
                  ) : null}
                </h2>
                <hr />
              </div>

              {/* Render section inputs */}
              {inputs.map((formInput: FormSchemaInput) =>
                FormInputResolver(
                  {
                    name: formInput.name,
                    inputType: formInput.inputType,
                    placeholder: formInput.placeholder || "",
                    labelText: formInput.labelText || "",
                    options: formInput.options || [],
                    disabled: formInput.disabled,
                  },
                  control,
                  errors,
                  readOnly
                )
              )}
            </div>
          )
        )}

        <div className="form-actions">
          <Button type="button" onClick={() => reset()} disabled={formLoading}>
            {cancelLabel}
          </Button>
          <Button type="submit" disabled={!isValid || formLoading}>
            {saveLabel}
          </Button>
        </div>
      </form>
    </TooltipProvider>
  );
};

export default FormBuilder;
