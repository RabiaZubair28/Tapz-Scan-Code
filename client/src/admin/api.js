const API_ROOT = String(import.meta.env.VITE_API_BASE_URL || "/api").replace(
  /\/$/,
  ""
);
const DATA_ROOT = API_ROOT.endsWith("/data")
  ? API_ROOT
  : `${API_ROOT}/data`;

const getErrorMessage = async (response) => {
  try {
    const body = await response.json();
    return body.message || body.error || "The request could not be completed.";
  } catch {
    return "The request could not be completed.";
  }
};

const request = async (path, options = {}) => {
  const response = await fetch(`${DATA_ROOT}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
};

export const listProfiles = ({ page, limit, search, status }) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search: search || "",
    status: status || "all",
  });
  return request(`/admin/clients?${params.toString()}`);
};

export const createProfile = (payload) =>
  request("/admin/clients", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const setProfileEnabled = (id, enabled) =>
  request(`/admin/clients/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ enabled }),
  });

export const uploadProfileImage = async (file) => {
  const cloudName =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dxokfhkhu";
  const uploadPreset =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
    "first_time_using_cloudinary";

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: data }
  );

  if (!response.ok) {
    throw new Error("Image upload failed. Please try again.");
  }

  const result = await response.json();
  const url = result.secure_url || result.url;
  if (!url) {
    throw new Error("The image provider did not return an image URL.");
  }
  return url;
};
