const { z } = require("zod");

const clientSchema = z.object({
  serialNo: z.string(),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast of 3 characters" })
    .max(255, { message: "Email must be not more than 255 characters" }),

  phone01: z
    .string()
    .trim()
    .min(10, { message: "Phone must be atleast of 10 characters" })
    .max(20, { message: "Phone must be not more than 20 characters" }),

  phone02: z
    .string()
    .trim()
    .min(10, { message: "Phone must be atleast of 10 characters" })
    .max(20, { message: "Phone must be not more than 20 characters" }),
  whatsapp01: z
    .string()
    .trim()
    .min(10, { message: "Phone must be atleast of 10 characters" })
    .max(20, { message: "Phone must be not more than 20 characters" }),
  whatsapp02: z
    .string()
    .trim()
    .min(10, { message: "Phone must be atleast of 10 characters" })
    .max(20, { message: "Phone must be not more than 20 characters" }),

  companyName: z
    .string()
    .min(5, { message: "Company Name must be atleast of 5 characters" })
    .max(1024, { message: "Company Name can't be more than 1024 characters" }),

  description: z.string(),
  name: z.string(),

  address: z.string(),

  instagramLink: z.string(),

  snapchatLink: z.string(),
  location: z.string(),
  clientName: z.string(),
  designation: z.string(),
  qr: z.string(),
  youtubeLink: z.string(),
  tiktokLink: z.string(),
  twitterLink: z.string(),
  facebookLink: z.string(),
  googleReviewLink: z.string(),
  website: z.string(),

  youtubeShortsLink: z.string(),
  googleMapLink: z.string(),
  menuLink: z.string(),
  images: z.string(),
  password: z.string(),

  logo: z.string(),
  romanName: z.string(),

  img01: z.string(),
  img02: z.string(),
  img03: z.string(),
  img04: z.string(),
  img05: z.string(),
  img06: z.string(),
  img07: z.string(),
  img08: z.string(),
  img09: z.string(),
  img10: z.string(),
});

module.exports = { clientSchema };
