import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import FormBuilder, {
  FormBuilderProps,
} from "../../components/FormBuilder/FormBuilder"; // Adjust the import path as needed
import {
  firstName,
  lastName,
  email,
  phone,
  newsletter,
  gender,
} from "@/components/FormBuilder/inputs";
// Define meta for Storybook
export default {
  title: "Form/FormBuilder",
  component: FormBuilder,
} as ComponentMeta<typeof FormBuilder>;

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

// Mock submit handler for Storybook
const handleFormSubmit = async (data: unknown) => {
  console.log("Form Submitted with Data:", data);
  // Simulate a loading delay
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

// Default Storybook Template
const Template: ComponentStory<typeof FormBuilder> = (
  args: FormBuilderProps
) => <FormBuilder {...args} />;

// Story definition
export const ExampleForm = Template.bind({});
ExampleForm.args = {
  formSchema,
  submitHandler: handleFormSubmit,
  saveLabel: "Submit",
  cancelLabel: "Reset",
};
