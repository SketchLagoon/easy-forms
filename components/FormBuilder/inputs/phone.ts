import * as z from "zod";

export const phone = {
  name: "phone",
  inputType: "text",
  placeholder: "Enter your phone number",
  labelText: "Phone Number",
  zod: z.string().min(10, "Phone number must be at least 10 digits"),
  defaultValue: "",
};
