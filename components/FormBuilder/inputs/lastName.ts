import * as z from "zod";

export const lastName = {
  name: "lastName",
  inputType: "text",
  placeholder: "Enter your last name",
  labelText: "Last Name",
  zod: z.string().min(1, "Last name is required"),
  defaultValue: "",
};
