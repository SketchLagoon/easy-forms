// FormBuilder.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputResolver from "./FormInputResolver";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

// Type definitions
export interface FormSchemaInput {
  name: string;
  inputType: string;
  placeholder?: string;
  labelText?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean | null;
  disabled?: boolean;
  zod: z.ZodTypeAny;
}

export interface FormSection {
  inputs: FormSchemaInput[];
  title: string;
  loading?: boolean;
}

export type FormSchema = Record<string, FormSection>;

export type FormValues = Record<string, unknown>;

export interface FormBuilderProps {
  title: string;
  formSchema: FormSchema;
  submitHandler: SubmitHandler<FormValues>;
  saveLabel?: string;
  cancelLabel?: string;
  readOnly?: boolean;
  onCancelClick?: () => void;
  formId?: string;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  title,
  formSchema,
  submitHandler,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  readOnly = false,
  onCancelClick, // Added here
  formId = "",
}): React.ReactElement => {
  const [formLoading, setFormLoading] = useState<boolean>(false);

  // Flatten inputs across sections to create Zod schema object
  const inputsArray: FormSchemaInput[] = Object.values(formSchema).flatMap(
    (section) => section.inputs
  );

  const makeZodSchemaObj = (): z.ZodObject<Record<string, z.ZodTypeAny>> => {
    const obj: Record<string, z.ZodTypeAny> = {};
    inputsArray.forEach((formInput) => {
      obj[formInput.name] = formInput.zod;
    });
    return z.object(obj);
  };

  const zodSchemaObj = makeZodSchemaObj();

  const formMethods: UseFormReturn<FormValues> = useForm<FormValues>({
    resolver: zodResolver(zodSchemaObj),
    defaultValues: inputsArray.reduce<FormValues>((defaults, input) => {
      if (input.defaultValue !== undefined) {
        defaults[input.name] = input.defaultValue;
      }
      return defaults;
    }, {}),
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  // Form submission handler
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setFormLoading(true);
    await submitHandler(data);
    setFormLoading(false);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} id={formId} className="space-y-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <hr className="border-t border-gray-700 dark:border-gray-900 mb-6" />
        {Object.entries(formSchema).map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_sectionKey, { inputs, title, loading }], sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="form-section">
              {/* Section title with optional loading spinner */}
              <div className="section-title flex items-center space-x-2">
                <h2 className="text-lg font-bold">{title}</h2>
                {(loading || formLoading) && (
                  <Loader2 className="animate-spin" />
                )}
              </div>
              <hr className="border-t border-gray-200 dark:border-gray-700 mb-6" />

              <div className="space-y-4">
                {/* Render section inputs */}
                {inputs.map((formInput: FormSchemaInput) => (
                  <FormInputResolver
                    key={formInput.name}
                    formInput={formInput}
                    readOnly={readOnly}
                  />
                ))}
              </div>
            </div>
          )
        )}
        <div className="form-actions flex space-x-4">
          <Button
            type="button"
            onClick={() => {
              reset();
              if (onCancelClick) {
                onCancelClick();
              }
            }}
            disabled={formLoading}
            variant="outline"
          >
            {cancelLabel}
          </Button>
          <Button type="submit" disabled={!isValid || formLoading}>
            {saveLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormBuilder;
