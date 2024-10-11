// FormBuilder.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import FormBuilder, {
  FormBuilderProps,
} from "../../components/FormBuilder/FormBuilder";
import {
  firstName,
  lastName,
  email,
  phone,
  newsletter,
  gender,
} from "@/components/FormBuilder/inputs";

export default {
  title: "Form/FormBuilder",
  component: FormBuilder,
} as Meta<typeof FormBuilder>;

const formSchema = {
  PersonalInfo: {
    title: "Personal Information",
    inputs: [firstName, lastName],
  },
  ContactInfo: {
    title: "Contact Information",
    inputs: [email, phone],
  },
  Preferences: {
    title: "Preferences",
    inputs: [newsletter, gender],
  },
};

const handleFormSubmit = async (data: unknown) => {
  console.log("Form Submitted with Data:", data);
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

const Template: StoryFn<typeof FormBuilder> = (args: FormBuilderProps) => (
  <FormBuilder {...args} />
);

export const ExampleForm = Template.bind({});
ExampleForm.args = {
  title: "Example Form",
  formSchema,
  submitHandler: handleFormSubmit,
  saveLabel: "Submit",
  cancelLabel: "Reset",
};
