import * as z from "zod";

export const firstName = {
  name: "firstName",
  inputType: "text",
  placeholder: "Enter your first name",
  labelText: "First Name",
  zod: z.string().min(1, "First name is required"),
  defaultValue: "",
};
