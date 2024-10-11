// phone.ts
import * as z from "zod";

export const phone = {
  name: "phone",
  inputType: "phone",
  placeholder: "Enter your phone number",
  labelText: "Phone Number",
  zod: z
    .string()
    .nonempty("Phone number is required")
    .refine((val) => /^\d{11}$/.test(val.replace(/\D/g, "")), {
      message: "Please enter a valid phone number",
    }),
  defaultValue: "",
};
