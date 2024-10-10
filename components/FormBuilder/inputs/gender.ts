import * as z from "zod";

export const gender = {
  name: "gender",
  inputType: "radio",
  labelText: "Gender",
  options: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
  zod: z.string().min(1, "Please select a gender"),
  defaultValue: "male",
};
