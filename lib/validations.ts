import { z } from "zod";

const statItemSchema = z.object({
  value: z.string().min(1, "Value is required"), 
  label: z.string().min(1, "Label is required"), 
});
const socialSchema = z.object({
  github: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  reddit: z.string().optional(),  
});




export const generalProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
    devNickname: z.string().min(1, "Dev Nickname is required"), 
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  isOpenForWork: z.boolean().default(true),
stats: z.array(statItemSchema).optional(),
  socials: socialSchema.optional(), 
});

const techCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().min(1, "Description is required"),

  techStack: z.string().min(1, "Tech stack is required"), 
  image: z.string().optional(),
  link: z.string().optional(),
  featured: z.boolean().default(false),
});
export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Job title is required"),
  startDate: z.coerce.date(), 
  endDate: z.coerce.date().nullable().optional(),
  description: z.string().min(1, "Description is required"),
  current: z.boolean().default(false),
  order: z.number().optional(),
});


export const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ProjectValues = z.infer<typeof projectSchema>;

export type GeneralProfileValues = z.infer<typeof generalProfileSchema>;

export const techStackSchema = z.array(techCategorySchema);

export type TechStackValues = z.infer<typeof techStackSchema>;