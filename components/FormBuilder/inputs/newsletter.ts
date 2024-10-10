import * as z from "zod";

export const newsletter = {
  name: "newsletter",
  inputType: "checkbox",
  labelText: "Subscribe to Newsletter",
  zod: z.boolean(),
  defaultValue: false,
};
