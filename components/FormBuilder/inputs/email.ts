import * as z from "zod";

export const email = {
  name: "email",
  inputType: "text",
  placeholder: "Enter your email",
  labelText: "Email Address",
  zod: z.string().email("Please enter a valid email"),
  defaultValue: "",
};
