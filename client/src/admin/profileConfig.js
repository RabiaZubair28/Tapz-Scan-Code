export const PROFILE_OPTIONS = [
  { value: "1", label: "Blush", colors: ["#ffb8d6", "#f6ece9"] },
  { value: "2", label: "Navy & White", colors: ["#16215c", "#ffffff"] },
  { value: "3", label: "Violet Night", colors: ["#544e66", "#1f153d"] },
  { value: "4", label: "Black & Grey", colors: ["#030712", "#374151"] },
  { value: "5", label: "Sage Mist", colors: ["#4e867e", "#e6eaea"] },
  { value: "6", label: "Monochrome", colors: ["#111827", "#f9fafb"] },
  { value: "7", label: "Sky & White", colors: ["#1d8eb7", "#ffffff"] },
  { value: "8", label: "Navy & Lime", colors: ["#16215c", "#a3c24e"] },
  { value: "9", label: "Navy & Rose", colors: ["#16215c", "#f2b0b4"] },
  { value: "10", label: "Black & Gold I", colors: ["#111827", "#c79d3d"] },
  { value: "11", label: "White & Gold", colors: ["#ffffff", "#c79d3d"] },
  { value: "12", label: "Silver & Gold", colors: ["#bdbdbd", "#c79d3d"] },
  { value: "13", label: "Classic Gold", colors: ["#111111", "#c79d3d"] },
  { value: "14", label: "Forest Classic", colors: ["#38572e", "#111827"] },
  { value: "15", label: "Olive Gradient", colors: ["#38572e", "#868e52"] },
  { value: "16", label: "Olive & White", colors: ["#6d7c3f", "#fafcee"] },
  { value: "17", label: "Fresh Green", colors: ["#4c9537", "#aee19f"] },
  { value: "18", label: "Soft Blush", colors: ["#f9d6cd", "#f6ece9"] },
  { value: "19", label: "Coffee & Taupe", colors: ["#784330", "#957a71"] },
  { value: "20", label: "Ruby & Cream", colors: ["#b10000", "#f5e7c8"] },
  { value: "21", label: "Ruby & Amber", colors: ["#c12c2c", "#fab23f"] },
  { value: "22", label: "Wine & Pearl", colors: ["#9e201c", "#f4e7e6"] },
  { value: "23", label: "Charcoal Gold", colors: ["#1e2533", "#c79d3d"] },
  { value: "24", label: "Midnight Green", colors: ["#111827", "#38572e"] },
  { value: "25", label: "Pure Black", colors: ["#000000", "#ffffff"] },
  { value: "26", label: "Graphite Green", colors: ["#231f20", "#38572e"] },
  { value: "27", label: "Black & Antique Gold", colors: ["#000000", "#b89a64"] },
  { value: "28", label: "Burgundy & Sand", colors: ["#65141a", "#f0d3b5"] },
  { value: "29", label: "Dark Editorial", colors: ["#111827", "#6b7280"] },
  { value: "30", label: "Onyx Gold I", colors: ["#000000", "#b89a64"] },
  { value: "31", label: "Slate Luxury", colors: ["#111827", "#9ca3af"] },
  { value: "32", label: "Onyx Gold II", colors: ["#000000", "#b89a64"] },
  { value: "33", label: "Custom Theme", colors: ["#1f7a3f", "#ffffff"] },
  { value: "34", label: "Metallic Gold", colors: ["#d4a84e", "#fff7dd"] },
  { value: "35", label: "Black & Bronze", colors: ["#000000", "#b89a64"] },
  { value: "36", label: "Black & Yellow", colors: ["#000000", "#fef485"] },
  { value: "37", label: "Burgundy Heritage", colors: ["#5d0618", "#ead9c9"] },
];

export const BASIC_FIELDS = [
  {
    name: "companyName",
    label: "Profile URL name",
    placeholder: "e.g. saray-wellness",
    required: true,
    help: "Used in the public link: /saray-wellness",
  },
  { name: "name", label: "Company / brand name", required: true },
  { name: "clientName", label: "Profile owner name" },
  { name: "romanName", label: "Roman name" },
  { name: "designation", label: "Designation / role" },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    wide: true,
  },
  { name: "services", label: "Services", type: "textarea", wide: true },
  { name: "address", label: "Address", type: "textarea", wide: true },
  { name: "location", label: "Location name" },
];

export const CONTACT_GROUPS = [
  {
    key: "mobile",
    title: "Mobile numbers",
    fields: ["phone01", "phone02", "phone03"],
    labels: ["Mobile 1", "Mobile 2", "Mobile 3"],
    type: "tel",
  },
  {
    key: "telephone",
    title: "Telephone numbers",
    fields: ["telephone01", "telephone02", "telephone03"],
    labels: ["Telephone 1", "Telephone 2", "Telephone 3"],
    type: "tel",
  },
  {
    key: "whatsapp",
    title: "WhatsApp numbers",
    fields: ["whatsapp01", "whatsapp02", "whatsapp03"],
    labels: ["WhatsApp 1", "WhatsApp 2", "WhatsApp 3"],
    type: "tel",
  },
  {
    key: "email",
    title: "Email addresses",
    fields: ["email", "email02", "email03"],
    labels: ["Email 1", "Email 2", "Email 3"],
    type: "email",
  },
];

export const SOCIAL_GROUPS = [
  {
    key: "instagram",
    title: "Instagram",
    names: ["instagramName", "instagramName02", "instagramName03"],
    links: ["instagramLink", "instagramLink02", "instagramLink03"],
  },
  {
    key: "snapchat",
    title: "Snapchat",
    names: ["snapchatName", "snapchatName02", "snapchatName03"],
    links: ["snapchatLink", "snapchatLink02", "snapchatLink03"],
  },
  {
    key: "youtube",
    title: "YouTube",
    names: ["youtubeName", "youtubeName02", "youtubeName03"],
    links: ["youtubeLink", "youtubeLink02", "youtubeLink03"],
  },
  {
    key: "tiktok",
    title: "TikTok",
    names: ["tiktokName", "tiktokName02", "tiktokName03"],
    links: ["tiktokLink", "tiktokLink02", "tiktokLink03"],
  },
  {
    key: "twitter",
    title: "X / Twitter",
    names: ["twitterName", "twitterName02", "twitterName03"],
    links: ["twitterLink", "twitterLink02", "twitterLink03"],
  },
  {
    key: "facebook",
    title: "Facebook",
    names: ["facebookName", "facebookName02", "facebookName03"],
    links: ["facebookLink", "facebookLink02", "facebookLink03"],
  },
  {
    key: "googleReview",
    title: "Google reviews",
    names: ["googleReviewName", "googleReviewName02", "googleReviewName03"],
    links: ["googleReviewLink", "googleReviewLink02", "googleReviewLink03"],
  },
  {
    key: "website",
    title: "Websites",
    names: ["websiteName", "websiteName02", "websiteName03"],
    links: ["website", "website02", "website03"],
  },
  {
    key: "youtubeShorts",
    title: "YouTube Shorts",
    names: [
      "youtubeShortsName",
      "youtubeShortsName02",
      "youtubeShortsName03",
    ],
    links: [
      "youtubeShortsLink",
      "youtubeShortsLink02",
      "youtubeShortsLink03",
    ],
  },
  {
    key: "googleMap",
    title: "Google Maps",
    names: ["googleMapName", "googleMapName02", "googleMapName03"],
    links: ["googleMapLink", "googleMapLink02", "googleMapLink03"],
  },
];

export const RESOURCE_FIELDS = [
  { name: "menuName", label: "Menu name" },
  { name: "menuLink", label: "Menu link", type: "url" },
  { name: "catalogueName", label: "Catalogue name" },
  { name: "catalogueLink", label: "Catalogue link", type: "url" },
  { name: "profileName01", label: "Custom profile name 1" },
  { name: "profileLink01", label: "Custom profile link 1", type: "url" },
  { name: "profileName02", label: "Custom profile name 2" },
  { name: "profileLink02", label: "Custom profile link 2", type: "url" },
];

export const IMAGE_FIELDS = [
  { name: "logo", label: "Logo" },
  { name: "images", label: "Cover image" },
  { name: "qr", label: "QR image" },
  ...Array.from({ length: 10 }, (_, index) => ({
    name: `img${String(index + 1).padStart(2, "0")}`,
    label: `Image ${index + 1}`,
  })),
];

export const APPEARANCE_FIELDS = [
  { name: "color01", label: "Theme color 1", type: "color" },
  { name: "color02", label: "Theme color 2", type: "color" },
  { name: "color03", label: "Theme color 3", type: "color" },
  { name: "password", label: "Profile login password", type: "password" },
  { name: "visitCount", label: "Starting visit count", type: "number" },
];

const ALL_TEXT_FIELDS = [
  ...BASIC_FIELDS.map((field) => field.name),
  ...CONTACT_GROUPS.flatMap((group) => group.fields),
  ...SOCIAL_GROUPS.flatMap((group) => [...group.names, ...group.links]),
  ...RESOURCE_FIELDS.map((field) => field.name),
  ...IMAGE_FIELDS.map((field) => field.name),
  ...APPEARANCE_FIELDS.map((field) => field.name),
];

export const createEmptyProfile = () => {
  const profile = Object.fromEntries(ALL_TEXT_FIELDS.map((field) => [field, ""]));
  return {
    ...profile,
    option: "1",
    flag: true,
    visitCount: 0,
  };
};

export const getProfileOption = (value) =>
  PROFILE_OPTIONS.find((option) => option.value === String(value)) ||
  PROFILE_OPTIONS[0];

