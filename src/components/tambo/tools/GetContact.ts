import { z } from "zod";

export const getContactSchema = z.object({});

export const getContactAction = async () => {
  return {
    fullName: "Subhajit",
    phone: "+91 96740 25615",
    email: "brandsubhajit@gmail.com",
    role: "Expert Travel Consultant",
    available: "24/7"
  };
};
