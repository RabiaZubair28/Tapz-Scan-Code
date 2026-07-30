/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  ImagePlus,
  LayoutDashboard,
  LoaderCircle,
  LogIn,
  LogOut,
  Minus,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UploadCloud,
  UsersRound,
  X,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import {
  APPEARANCE_FIELDS,
  BASIC_FIELDS,
  CONTACT_GROUPS,
  getProfileOption,
  IMAGE_FIELDS,
  PROFILE_OPTIONS,
  RESOURCE_FIELDS,
  SOCIAL_GROUPS,
} from "../admin/profileConfig";
import "../admin/admin.css";

const ENV = import.meta.env || {};
const API_BASE = String(
  ENV.VITE_API_BASE_URL ||
    ENV.VITE_SCANTAP_API_BASE_URL ||
    "https://scantap.onrender.com/api",
).replace(/\/$/, "");
const CLIENTS_URL = `${API_BASE}/data/admin/clients`;

const FORM_TABS = [
  { id: "basics", label: "Profile details" },
  { id: "contact", label: "Contact" },
  { id: "social", label: "Links" },
  { id: "media", label: "Images" },
  { id: "appearance", label: "Template" },
];

const SETTINGS_FIELDS = APPEARANCE_FIELDS.filter(
  (field) =>
    field.name !== "color01" &&
    field.name !== "color02" &&
    field.name !== "color03",
);

const PROFILE_FIELD_NAMES = Array.from(
  new Set([
    ...BASIC_FIELDS.map((field) => field.name),
    ...CONTACT_GROUPS.flatMap((group) => group.fields),
    ...SOCIAL_GROUPS.flatMap((group) => [...group.names, ...group.links]),
    ...RESOURCE_FIELDS.map((field) => field.name),
    ...IMAGE_FIELDS.map((field) => field.name),
    ...SETTINGS_FIELDS.map((field) => field.name),
    "option",
  ]),
);

const createEmptyProfile = () => ({
  ...Object.fromEntries(PROFILE_FIELD_NAMES.map((name) => [name, ""])),
  option: "1",
  visitCount: 0,
});

const normaliseProfile = (source = {}) => {
  const profile = createEmptyProfile();

  PROFILE_FIELD_NAMES.forEach((name) => {
    if (name === "password") return;
    if (Object.prototype.hasOwnProperty.call(source, name)) {
      profile[name] = source[name] ?? "";
    }
  });

  profile.option = String(source.option || "1");
  profile.visitCount = Number(source.visitCount || 0);
  profile.password = "";
  return profile;
};

const profilePayload = (profile, editing) => {
  const payload = {};

  PROFILE_FIELD_NAMES.forEach((name) => {
    if (editing && name === "password" && !profile.password) return;

    payload[name] =
      name === "visitCount"
        ? Math.max(0, Number(profile[name] || 0))
        : profile[name] ?? "";
  });

  return payload;
};

const errorMessage = (body, fallback) =>
  body?.message || body?.error || body?.detail || fallback;

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let body = {};

  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text };
    }
  }

  if (!response.ok) {
    const error = new Error(
      errorMessage(body, `Request failed (${response.status}).`),
    );
    error.status = response.status;
    throw error;
  }

  return body;
};

const uploadProfileImage = async (file) => {
  const cloudName =
    ENV.VITE_CLOUDINARY_CLOUD_NAME || "dxokfhkhu";
  const uploadPreset =
    ENV.VITE_CLOUDINARY_UPLOAD_PRESET ||
    "first_time_using_cloudinary";

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: data },
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

const repeatCountsFor = (form) =>
  Object.fromEntries(
    [...CONTACT_GROUPS, ...SOCIAL_GROUPS].map((group) => {
      const fields = group.fields || [
        ...group.names.map((name, index) => [name, group.links[index]]),
      ].flat();
      let count = 1;

      fields.forEach((name, index) => {
        if (form[name]) {
          const entryIndex = group.fields ? index : Math.floor(index / 2);
          count = Math.max(count, entryIndex + 1);
        }
      });

      return [group.key, Math.min(3, count)];
    }),
  );

function DashboardLogin({ onAuthenticated }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const result = await apiRequest(`${API_BASE}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (result.role !== "admin") {
        await apiRequest(`${API_BASE}/auth/logout`, { method: "POST" });
        throw new Error("Administrator credentials are required.");
      }

      toast.success("Administrator login successful");
      onAuthenticated();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d1-login-page">
      <Toaster position="top-right" />
      <section className="d1-login-story">
        <span className="d1-login-brand">
          <Sparkles size={22} />
          ScanTaps
        </span>
        <div>
          <p>PROFILE ADMINISTRATION</p>
          <h1>Manage every profile from one secure workspace.</h1>
          <span>
            Sign in once with the administrator account, then create, edit and
            delete profiles without repeated profile logins.
          </span>
        </div>
      </section>

      <section className="d1-login-panel">
        <form className="d1-login-card" onSubmit={submit}>
          <span className="d1-login-icon">
            <LogIn size={23} />
          </span>
          <p>ADMIN ACCESS</p>
          <h2>Welcome back</h2>
          <span>Enter the administrator email and password.</span>

          <label>
            <b>Admin email</b>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={(event) =>
                setCredentials((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              autoComplete="username"
              required
            />
          </label>

          <label>
            <b>Admin password</b>
            <span className="d1-password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          {message ? <div className="d1-login-error">{message}</div> : null}

          <button
            type="submit"
            className="d1-login-submit"
            disabled={submitting}
          >
            {submitting ? (
              <LoaderCircle className="spin" size={18} />
            ) : (
              <LogIn size={18} />
            )}
            {submitting ? "Signing in..." : "Open dashboard"}
          </button>
        </form>
      </section>
      <DashboardOneStyles />
    </div>
  );
}

function ProfileField({ field, value, onChange }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const required =
    Boolean(field.required) ||
    field.name === "email" ||
    (field.name === "password" && field.required);
  const inputValue =
    field.type === "number" ? Number(value || 0) : value ?? "";

  const sharedProps = {
    id: field.name,
    name: field.name,
    value: inputValue,
    onChange,
    placeholder: field.placeholder || field.label,
    required,
  };

  if (field.name === "companyName") {
    sharedProps.pattern = "[a-zA-Z0-9-]+";
    sharedProps.title = "Use letters, numbers and hyphens only.";
  }

  return (
    <label
      className={`profile-field ${field.wide ? "profile-field--wide" : ""}`}
      htmlFor={field.name}
    >
      <span>
        {field.label}
        {required ? <b aria-hidden="true"> *</b> : null}
      </span>

      {field.type === "textarea" ? (
        <textarea {...sharedProps} rows={4} />
      ) : field.type === "password" ? (
        <span className="d1-password-input">
          <input
            {...sharedProps}
            type={passwordVisible ? "text" : "password"}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            title={passwordVisible ? "Hide password" : "Show password"}
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </span>
      ) : (
        <input {...sharedProps} type={field.type || "text"} />
      )}

      {field.help ? <small>{field.help}</small> : null}
    </label>
  );
}

function TemplateSelect({ value, onChange }) {
  return (
    <div className="template-picker">
      {PROFILE_OPTIONS.map((option) => {
        const selected = String(value) === option.value;
        return (
          <button
            className={`template-choice ${selected ? "is-selected" : ""}`}
            key={option.value}
            type="button"
            onClick={() =>
              onChange({ target: { name: "option", value: option.value } })
            }
            aria-pressed={selected}
          >
            <span
              className="template-swatch"
              style={{
                background: `linear-gradient(135deg, ${option.colors[0]} 0 50%, ${option.colors[1]} 50% 100%)`,
              }}
            />
            <span>
              <b>Option {option.value}</b>
              <small>{option.label}</small>
            </span>
            {selected ? <Check size={16} /> : null}
          </button>
        );
      })}
    </div>
  );
}

function RepeatableTextGroup({
  group,
  form,
  count,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <article className="repeat-card">
      <header>
        <div>
          <h4>{group.title}</h4>
          <p>Add up to three entries.</p>
        </div>
        {count < 3 ? (
          <button type="button" className="icon-action" onClick={onAdd}>
            <Plus size={17} />
            Add
          </button>
        ) : null}
      </header>

      <div className="repeat-rows">
        {group.fields.slice(0, count).map((fieldName, index) => (
          <div className="repeat-row repeat-row--single" key={fieldName}>
            <ProfileField
              field={{
                name: fieldName,
                label: group.labels[index],
                type: group.type,
                required: fieldName === "email",
              }}
              value={form[fieldName]}
              onChange={onChange}
            />
            {index === count - 1 && count > 1 ? (
              <button
                type="button"
                className="remove-row"
                onClick={onRemove}
                aria-label={`Remove ${group.labels[index]}`}
              >
                <Minus size={16} />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function RepeatableLinkGroup({
  group,
  form,
  count,
  onChange,
  onAdd,
  onRemove,
}) {
  return (
    <article className="repeat-card">
      <header>
        <div>
          <h4>{group.title}</h4>
          <p>Name and link, with a maximum of three.</p>
        </div>
        {count < 3 ? (
          <button type="button" className="icon-action" onClick={onAdd}>
            <Plus size={17} />
            Add
          </button>
        ) : null}
      </header>

      <div className="repeat-rows">
        {group.names.slice(0, count).map((nameField, index) => (
          <div className="repeat-row" key={nameField}>
            <ProfileField
              field={{
                name: nameField,
                label: `${group.title} name ${index + 1}`,
              }}
              value={form[nameField]}
              onChange={onChange}
            />
            <ProfileField
              field={{
                name: group.links[index],
                label: `${group.title} link ${index + 1}`,
                type: "url",
              }}
              value={form[group.links[index]]}
              onChange={onChange}
            />
            {index === count - 1 && count > 1 ? (
              <button
                type="button"
                className="remove-row"
                onClick={onRemove}
                aria-label={`Remove ${group.title} entry ${index + 1}`}
              >
                <Minus size={16} />
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function UploadField({
  field,
  value,
  onUpload,
  uploading,
  onClear,
}) {
  return (
    <article className={`upload-card ${value ? "has-image" : ""}`}>
      <div className="upload-preview">
        {value ? (
          <img src={value} alt={`${field.label} preview`} />
        ) : (
          <ImagePlus size={24} />
        )}
      </div>
      <div className="upload-copy">
        <b>{field.label}</b>
        <small>{value ? "Image ready" : "PNG, JPG, WebP or AVIF"}</small>
      </div>
      <label className="upload-button">
        {uploading ? (
          <LoaderCircle className="spin" size={17} />
        ) : (
          <UploadCloud size={17} />
        )}
        {uploading ? "Uploading" : value ? "Replace" : "Upload"}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          disabled={uploading}
          onChange={(event) => onUpload(field, event.target.files?.[0])}
        />
      </label>
      {value ? (
        <button
          type="button"
          className="clear-upload"
          onClick={() => onClear(field.name)}
        >
          Clear
        </button>
      ) : null}
    </article>
  );
}

function DashboardProfileForm({
  editingProfile,
  onSubmit,
  onCancel,
  onUpload,
  submitting,
  uploadingField,
}) {
  const editing = Boolean(editingProfile?._id);
  const initialForm = useMemo(
    () =>
      editingProfile
        ? normaliseProfile(editingProfile)
        : createEmptyProfile(),
    [editingProfile],
  );
  const [form, setForm] = useState(initialForm);
  const [activeTab, setActiveTab] = useState("basics");
  const [repeatCounts, setRepeatCounts] = useState(() =>
    repeatCountsFor(initialForm),
  );

  useEffect(() => {
    setForm(initialForm);
    setRepeatCounts(repeatCountsFor(initialForm));
    setActiveTab("basics");
  }, [initialForm]);

  const selectedTemplate = useMemo(
    () => getProfileOption(form.option),
    [form.option],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]:
        name === "companyName"
          ? String(value).toLowerCase().replace(/\s+/g, "-")
          : value,
    }));
  };

  const changeCount = (key, amount) => {
    setRepeatCounts((current) => ({
      ...current,
      [key]: Math.max(1, Math.min(3, current[key] + amount)),
    }));
  };

  const handleImageUpload = async (field, file) => {
    if (!file) return;
    const url = await onUpload(field, file);
    if (url) {
      setForm((current) => ({ ...current, [field.name]: url }));
    }
  };

  const submit = (event) => {
    event.preventDefault();

    if (!String(form.companyName || "").trim()) {
      setActiveTab("basics");
      toast.error("Profile URL name is required.");
      return;
    }
    if (!String(form.email || "").trim()) {
      setActiveTab("contact");
      toast.error("Primary email is required.");
      return;
    }
    if (!editing && !String(form.password || "")) {
      setActiveTab("appearance");
      toast.error("Profile password is required.");
      return;
    }

    onSubmit(profilePayload(form, editing));
  };

  return (
    <form className="interactive-profile-form" onSubmit={submit}>
      <div className="form-workspace">
        <nav className="form-tabs" aria-label="Profile form sections">
          {FORM_TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? "is-active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="form-panel">
          {activeTab === "basics" ? (
            <>
              <div className="panel-heading">
                <p>Step 1</p>
                <h3>{editing ? "Edit profile identity" : "Build the profile identity"}</h3>
                <span>
                  Set the public URL, profile name and the information shown at
                  the top of the selected template.
                </span>
              </div>
              <div className="profile-field-grid">
                {BASIC_FIELDS.map((field) => (
                  <ProfileField
                    field={field}
                    value={form[field.name]}
                    onChange={handleChange}
                    key={field.name}
                  />
                ))}
              </div>
            </>
          ) : null}

          {activeTab === "contact" ? (
            <>
              <div className="panel-heading">
                <p>Step 2</p>
                <h3>Add contact details</h3>
                <span>
                  The primary email is used for profile login. Add up to three
                  entries for every contact type.
                </span>
              </div>
              <div className="repeat-grid">
                {CONTACT_GROUPS.map((group) => (
                  <RepeatableTextGroup
                    key={group.key}
                    group={group}
                    form={form}
                    count={repeatCounts[group.key]}
                    onChange={handleChange}
                    onAdd={() => changeCount(group.key, 1)}
                    onRemove={() => changeCount(group.key, -1)}
                  />
                ))}
              </div>
            </>
          ) : null}

          {activeTab === "social" ? (
            <>
              <div className="panel-heading">
                <p>Step 3</p>
                <h3>Connect every channel</h3>
                <span>
                  Each platform starts with a name and link pair and supports
                  up to three entries.
                </span>
              </div>
              <div className="repeat-grid">
                {SOCIAL_GROUPS.map((group) => (
                  <RepeatableLinkGroup
                    key={group.key}
                    group={group}
                    form={form}
                    count={repeatCounts[group.key]}
                    onChange={handleChange}
                    onAdd={() => changeCount(group.key, 1)}
                    onRemove={() => changeCount(group.key, -1)}
                  />
                ))}
              </div>
              <div className="panel-subsection">
                <h4>Menu, catalogue and custom links</h4>
                <div className="profile-field-grid">
                  {RESOURCE_FIELDS.map((field) => (
                    <ProfileField
                      field={field}
                      value={form[field.name]}
                      onChange={handleChange}
                      key={field.name}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {activeTab === "media" ? (
            <>
              <div className="panel-heading">
                <p>Step 4</p>
                <h3>Upload profile images</h3>
                <span>
                  Upload the logo, cover, QR and gallery images. Every completed
                  upload is confirmed before the profile is saved.
                </span>
              </div>
              <div className="upload-grid">
                {IMAGE_FIELDS.map((field) => (
                  <UploadField
                    field={field}
                    value={form[field.name]}
                    onUpload={handleImageUpload}
                    uploading={uploadingField === field.name}
                    onClear={(name) =>
                      setForm((current) => ({ ...current, [name]: "" }))
                    }
                    key={field.name}
                  />
                ))}
              </div>
            </>
          ) : null}

          {activeTab === "appearance" ? (
            <>
              <div className="panel-heading">
                <p>Step 5</p>
                <h3>Choose a profile template</h3>
                <span>
                  All 37 templates are available. Their theme colours are
                  assigned automatically when the profile is saved.
                </span>
              </div>
              <TemplateSelect
                value={form.option}
                onChange={handleChange}
              />
              <div className="panel-subsection">
                <h4>Login and visits</h4>
                <div className="profile-field-grid">
                  {SETTINGS_FIELDS.map((field) => (
                    <ProfileField
                      field={{
                        ...field,
                        required: field.name === "password" && !editing,
                        help:
                          field.name === "password" && editing
                            ? "Leave blank to keep the existing password."
                            : field.help,
                      }}
                      value={form[field.name]}
                      onChange={handleChange}
                      key={field.name}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </section>

        <aside className="form-preview">
          <div className="preview-label">
            <span>Template preview</span>
            <b>Option {selectedTemplate.value}</b>
          </div>
          <div
            className="mini-profile"
            style={{
              "--preview-one": selectedTemplate.colors[0],
              "--preview-two": selectedTemplate.colors[1],
            }}
          >
            <div className="mini-cover">
              {form.images ? <img src={form.images} alt="" /> : null}
            </div>
            <div className="mini-avatar">
              {form.logo ? (
                <img src={form.logo} alt="" />
              ) : (
                <span>{(form.name || "S").charAt(0).toUpperCase()}</span>
              )}
            </div>
            <h4>{form.name || "Your profile name"}</h4>
            <p>{form.clientName || "Profile owner"}</p>
            <div className="mini-links">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="preview-url">
            <small>Public link</small>
            <b>scantabs.com/{form.companyName || "profile-url"}</b>
          </div>
          <div className="d1-preview-ready">
            <Check size={15} />
            Public profile ready
          </div>
        </aside>
      </div>

      <footer className="interactive-form-actions">
        <div>
          <b>{editing ? "Ready to save changes?" : "Ready to create?"}</b>
          <span>
            Required fields are marked with an asterisk. Existing passwords
            remain unchanged unless a new one is entered.
          </span>
        </div>
        <span className="d1-form-buttons">
          {editing ? (
            <button
              type="button"
              className="d1-secondary-button"
              onClick={onCancel}
              disabled={submitting}
            >
              <X size={18} />
              Cancel
            </button>
          ) : null}
          <button
            type="submit"
            disabled={submitting || Boolean(uploadingField)}
          >
            {submitting ? (
              <LoaderCircle className="spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            {submitting
              ? "Saving profile..."
              : editing
                ? "Save changes"
                : "Create profile"}
          </button>
        </span>
      </footer>
    </form>
  );
}

function LoadingRows() {
  return (
    <div className="directory-loading" role="status">
      <span />
      <span />
      <span />
      <p>Loading profiles...</p>
    </div>
  );
}

function ProfileDirectory({
  refreshSignal,
  onEdit,
  onSessionExpired,
}) {
  const [profiles, setProfiles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [reloadSignal, setReloadSignal] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: "8",
        search,
      });

      try {
        const result = await apiRequest(`${CLIENTS_URL}?${params.toString()}`);
        if (!cancelled) {
          setProfiles(result.items || []);
          setPagination(
            result.pagination || {
              page: 1,
              limit: 8,
              total: 0,
              totalPages: 1,
            },
          );
        }
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          onSessionExpired();
        } else if (!cancelled) {
          toast.error(error.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, search ? 250 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    onSessionExpired,
    page,
    refreshSignal,
    reloadSignal,
    search,
  ]);

  const editProfile = async (profile) => {
    setEditingId(profile._id);
    try {
      const result = await apiRequest(`${CLIENTS_URL}/${profile._id}`);
      onEdit(result.client || result);
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        onSessionExpired();
      } else {
        toast.error(error.message);
      }
    } finally {
      setEditingId("");
    }
  };

  const deleteProfile = async (profile) => {
    const profileName =
      profile.name || profile.clientName || profile.companyName || "this profile";
    if (
      !window.confirm(
        `Delete ${profileName}? This action permanently removes the profile.`,
      )
    ) {
      return;
    }

    setDeletingId(profile._id);
    try {
      await apiRequest(`${CLIENTS_URL}/${profile._id}`, {
        method: "DELETE",
      });
      toast.success("Profile deleted successfully");
      setReloadSignal((value) => value + 1);
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        onSessionExpired();
      } else {
        toast.error(error.message);
      }
    } finally {
      setDeletingId("");
    }
  };

  const from = pagination.total
    ? (pagination.page - 1) * pagination.limit + 1
    : 0;
  const to = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  );

  return (
    <section className="modern-directory">
      <div className="stats-grid d1-overview-grid">
        <article>
          <span className="stat-icon stat-icon--total">
            <UsersRound size={20} />
          </span>
          <div>
            <small>Total profiles</small>
            <b>{pagination.total}</b>
          </div>
        </article>
        <article>
          <span className="stat-icon d1-stat-icon--templates">
            <Sparkles size={20} />
          </span>
          <div>
            <small>Profile templates</small>
            <b>{PROFILE_OPTIONS.length}</b>
          </div>
        </article>
        <article>
          <span className="stat-icon d1-stat-icon--session">
            <LayoutDashboard size={20} />
          </span>
          <div>
            <small>Workspace access</small>
            <b className="d1-admin-value">Admin</b>
          </div>
        </article>
      </div>

      <div className="directory-toolbar">
        <div>
          <h2>Profiles</h2>
          <p>Create, edit, open or delete a client profile.</p>
        </div>
        <div className="directory-filters">
          <label className="search-box">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search profiles..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <LoadingRows />
      ) : profiles.length ? (
        <div className="profile-card-grid">
          {profiles.map((profile) => {
            const option = getProfileOption(profile.option);
            return (
              <article className="profile-admin-card" key={profile._id}>
                <div className="profile-card-top">
                  <span
                    className="profile-card-avatar"
                    style={{
                      background: `linear-gradient(135deg, ${option.colors[0]}, ${option.colors[1]})`,
                    }}
                  >
                    {profile.logo ? (
                      <img src={profile.logo} alt="" />
                    ) : (
                      (profile.name || profile.companyName || "P")
                        .charAt(0)
                        .toUpperCase()
                    )}
                  </span>
                  <span className="d1-template-pill">
                    Option {option.value}
                  </span>
                </div>
                <h3>{profile.name || profile.clientName || "Untitled profile"}</h3>
                <p>/{profile.companyName || "profile"}</p>
                <div className="profile-card-meta">
                  <span>
                    <i
                      style={{
                        background: `linear-gradient(135deg, ${option.colors[0]} 0 50%, ${option.colors[1]} 50% 100%)`,
                      }}
                    />
                    {option.label}
                  </span>
                  <span>{profile.visitCount || 0} visits</span>
                </div>
                <a
                  href={`/${encodeURIComponent(profile.companyName || "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open public profile
                  <ExternalLink size={16} />
                </a>
                <div className="d1-card-actions">
                  <button
                    type="button"
                    onClick={() => editProfile(profile)}
                    disabled={editingId === profile._id}
                  >
                    {editingId === profile._id ? (
                      <LoaderCircle className="spin" size={15} />
                    ) : (
                      <Pencil size={15} />
                    )}
                    Edit
                  </button>
                  <button
                    type="button"
                    className="is-danger"
                    onClick={() => deleteProfile(profile)}
                    disabled={deletingId === profile._id}
                  >
                    {deletingId === profile._id ? (
                      <LoaderCircle className="spin" size={15} />
                    ) : (
                      <Trash2 size={15} />
                    )}
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-directory">
          <UsersRound size={28} />
          <h3>No profiles found</h3>
          <p>Try another search or create a new profile.</p>
        </div>
      )}

      <div className="modern-pagination">
        <span>
          Showing {from}–{to} of {pagination.total}
        </span>
        <div>
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1 || loading}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            <ChevronLeft size={18} />
          </button>
          <b>
            {pagination.page} / {pagination.totalPages}
          </b>
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= pagination.totalPages || loading}
            onClick={() => setPage((value) => value + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function DashboardOneStyles() {
  return (
    <style>{`
      .d1-session-check {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #f4f7f5;
        color: #176b4d;
        font: 700 14px "DM Sans", sans-serif;
      }

      .d1-session-check > div {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .d1-login-page {
        min-height: 100vh;
        display: grid;
        grid-template-columns: minmax(340px, .9fr) minmax(440px, 1.1fr);
        background: #f4f7f5;
        font-family: "DM Sans", sans-serif;
      }

      .d1-login-story {
        min-height: 100vh;
        padding: 58px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background:
          linear-gradient(145deg, rgba(11, 72, 51, .94), rgba(21, 119, 82, .86)),
          url("https://liamcrest.com/assets/static/header/Asset%2072.png") center/cover;
      }

      .d1-login-brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font: 800 20px "Manrope", sans-serif;
      }

      .d1-login-story p,
      .d1-login-card > p {
        margin: 0 0 12px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .16em;
      }

      .d1-login-story h1 {
        max-width: 620px;
        margin: 0 0 18px;
        font: 800 clamp(38px, 5vw, 70px)/1.02 "Manrope", sans-serif;
      }

      .d1-login-story div > span {
        max-width: 570px;
        color: rgba(255, 255, 255, .78);
        display: block;
        font-size: 15px;
        line-height: 1.7;
      }

      .d1-login-panel {
        min-height: 100vh;
        padding: 32px;
        display: grid;
        place-items: center;
      }

      .d1-login-card {
        width: min(440px, 100%);
        padding: 38px;
        border: 1px solid #dfe8e3;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 24px 70px rgba(20, 55, 40, .12);
      }

      .d1-login-icon {
        width: 50px;
        height: 50px;
        margin-bottom: 24px;
        border-radius: 15px;
        color: #176b4d;
        background: #e8f4ed;
        display: grid;
        place-items: center;
      }

      .d1-login-card > p { color: #2a8a66; }
      .d1-login-card h2 {
        margin: 0 0 8px;
        color: #17241e;
        font: 800 34px "Manrope", sans-serif;
      }

      .d1-login-card > span:not(.d1-login-icon) {
        color: #708078;
        font-size: 13px;
      }

      .d1-login-card > label {
        margin-top: 20px;
        color: #34473e;
        display: grid;
        gap: 7px;
        font-size: 12px;
      }

      .d1-login-card input {
        width: 100%;
        height: 48px;
        padding: 0 14px;
        border: 1px solid #dce6e1;
        border-radius: 11px;
        outline: 0;
        font: 500 14px "DM Sans", sans-serif;
      }

      .d1-login-card input:focus,
      .d1-password-input input:focus {
        border-color: #2a8a66;
        box-shadow: 0 0 0 3px rgba(42, 138, 102, .12);
      }

      .d1-password-input {
        position: relative;
        display: block;
      }

      .d1-password-input input {
        width: 100%;
        padding-right: 48px !important;
      }

      .d1-password-input > button {
        width: 44px;
        height: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        color: #5d7168;
        display: grid;
        place-items: center;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }

      .d1-login-error {
        margin-top: 16px;
        padding: 10px 12px;
        border: 1px solid #f1caca;
        border-radius: 9px;
        background: #fff2f2;
        color: #a63f3f;
        font-size: 12px;
      }

      .d1-login-submit {
        width: 100%;
        height: 50px;
        margin-top: 22px;
        border: 0;
        border-radius: 11px;
        background: #176b4d;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font: 800 13px "DM Sans", sans-serif;
        cursor: pointer;
      }

      .d1-login-submit:disabled { opacity: .6; cursor: wait; }

      .d1-logout {
        width: calc(100% - 24px);
        margin: auto 12px 18px;
        padding: 11px 13px;
        border: 1px solid rgba(255, 255, 255, .16);
        border-radius: 10px;
        background: rgba(255, 255, 255, .06);
        color: #dce9e3;
        display: flex;
        align-items: center;
        gap: 9px;
        cursor: pointer;
      }

      .d1-sidebar { display: flex; flex-direction: column; }
      .d1-overview-grid .d1-stat-icon--templates {
        background: #f2ebff;
        color: #7047a2;
      }
      .d1-overview-grid .d1-stat-icon--session {
        background: #e7f7ee;
        color: #1c7c58;
      }
      .d1-admin-value { font-size: 19px !important; }

      .d1-template-pill {
        padding: 6px 8px;
        border-radius: 999px;
        background: #f2f6f4;
        color: #607069;
        font-size: 9px;
        font-weight: 800;
      }

      .d1-card-actions {
        margin-top: 9px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .d1-card-actions button {
        min-height: 35px;
        border: 1px solid #dbe7e1;
        border-radius: 9px;
        background: #fff;
        color: #275b46;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font: 800 10px "DM Sans", sans-serif;
        cursor: pointer;
      }

      .d1-card-actions button:hover { background: #f1f7f4; }
      .d1-card-actions button.is-danger {
        border-color: #efdada;
        color: #a64d4d;
      }
      .d1-card-actions button.is-danger:hover { background: #fff5f5; }
      .d1-card-actions button:disabled { opacity: .55; cursor: wait; }

      .d1-preview-ready {
        margin-top: 12px;
        padding: 10px 12px;
        border-radius: 10px;
        background: #eaf6ef;
        color: #1a7653;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 11px;
        font-weight: 800;
      }

      .d1-form-buttons {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .interactive-form-actions .d1-secondary-button {
        border: 1px solid #dbe4df;
        background: #fff;
        color: #51645b;
      }

      @media (max-width: 900px) {
        .d1-login-page { display: block; }
        .d1-login-story { display: none; }
        .d1-login-panel { min-height: 100vh; padding: 20px; }
      }

      @media (max-width: 640px) {
        .d1-login-card { padding: 26px 20px; }
        .d1-card-actions { grid-template-columns: 1fr; }
        .d1-form-buttons { width: 100%; flex-direction: column-reverse; }
        .d1-form-buttons button { width: 100%; }
      }
    `}</style>
  );
}

export default function DashboardOne() {
  const [sessionState, setSessionState] = useState("checking");
  const [view, setView] = useState("profiles");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState("");
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [savedProfile, setSavedProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);

  const checkSession = useCallback(async () => {
    try {
      const session = await apiRequest(`${API_BASE}/auth/session`);
      setSessionState(
        session.authenticated && session.role === "admin"
          ? "authenticated"
          : "anonymous",
      );
    } catch {
      setSessionState("anonymous");
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const expireSession = useCallback(() => {
    setSessionState("anonymous");
    setEditingProfile(null);
    setView("profiles");
    toast.error("Your administrator session expired. Please sign in again.");
  }, []);

  const handleUpload = async (field, file) => {
    setUploadingField(field.name);
    try {
      const url = await uploadProfileImage(file);
      toast.success(`${field.label} uploaded successfully`);
      return url;
    } catch (error) {
      toast.error(error.message);
      return "";
    } finally {
      setUploadingField("");
    }
  };

  const saveProfile = async (payload) => {
    const editing = Boolean(editingProfile?._id);
    setSubmitting(true);

    try {
      const result = await apiRequest(
        editing ? `${CLIENTS_URL}/${editingProfile._id}` : CLIENTS_URL,
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify(payload),
        },
      );
      const profile = result.client || result;

      setSavedProfile(profile);
      setEditingProfile(null);
      setRefreshSignal((value) => value + 1);
      setView("profiles");
      toast.success(
        editing
          ? "Profile updated successfully"
          : "Profile created successfully",
      );
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        expireSession();
      } else {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const startCreate = () => {
    setSavedProfile(null);
    setEditingProfile(null);
    setView("create");
  };

  const startEdit = (profile) => {
    setSavedProfile(null);
    setEditingProfile(profile);
    setView("edit");
  };

  const logout = async () => {
    try {
      await apiRequest(`${API_BASE}/auth/logout`, { method: "POST" });
    } catch {
      // The local state is still cleared if the server session already ended.
    }
    setSessionState("anonymous");
    setEditingProfile(null);
    setView("profiles");
  };

  if (sessionState === "checking") {
    return (
      <div className="d1-session-check">
        <div>
          <LoaderCircle className="spin" size={20} />
          Checking administrator session...
        </div>
        <DashboardOneStyles />
      </div>
    );
  }

  if (sessionState !== "authenticated") {
    return (
      <DashboardLogin
        onAuthenticated={() => setSessionState("authenticated")}
      />
    );
  }

  const pageTitle =
    view === "profiles"
      ? "Profile management"
      : view === "edit"
        ? "Edit profile"
        : "Create a new profile";

  return (
    <div className="dashboard-one">
      <Toaster position="top-right" />
      <aside className="d1-sidebar">
        <a className="d1-brand" href="/dashboard01">
          <span>
            <Sparkles size={20} />
          </span>
          <div>
            <b>ScanTaps</b>
            <small>Profile studio</small>
          </div>
        </a>

        <nav>
          <button
            type="button"
            className={view === "profiles" ? "is-active" : ""}
            onClick={() => {
              setEditingProfile(null);
              setView("profiles");
            }}
          >
            <UsersRound size={19} />
            Profiles
          </button>
          <button
            type="button"
            className={view === "create" ? "is-active" : ""}
            onClick={startCreate}
          >
            <Plus size={19} />
            Create profile
          </button>
        </nav>

        <button type="button" className="d1-logout" onClick={logout}>
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      <main className="d1-main">
        <header className="d1-topbar">
          <div>
            <span className="mobile-brand">
              <LayoutDashboard size={20} />
            </span>
            <div>
              <p>Administration</p>
              <h1>{pageTitle}</h1>
            </div>
          </div>
          <button
            type="button"
            className="primary-action"
            onClick={view === "profiles" ? startCreate : () => setView("profiles")}
          >
            {view === "profiles" ? <Plus size={18} /> : <UsersRound size={18} />}
            {view === "profiles" ? "New profile" : "View profiles"}
          </button>
        </header>

        <div className="d1-content">
          {savedProfile && view === "profiles" ? (
            <div className="created-banner">
              <span>
                <b>{savedProfile.name || savedProfile.companyName}</b> was saved
                successfully.
              </span>
              <a
                href={`/${encodeURIComponent(savedProfile.companyName || "")}`}
                target="_blank"
                rel="noreferrer"
              >
                Open public profile
                <ArrowRight size={16} />
              </a>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setSavedProfile(null)}
              >
                ×
              </button>
            </div>
          ) : null}

          {view === "profiles" ? (
            <ProfileDirectory
              refreshSignal={refreshSignal}
              onEdit={startEdit}
              onSessionExpired={expireSession}
            />
          ) : (
            <DashboardProfileForm
              key={editingProfile?._id || "new-profile"}
              editingProfile={editingProfile}
              onSubmit={saveProfile}
              onCancel={() => {
                setEditingProfile(null);
                setView("profiles");
              }}
              onUpload={handleUpload}
              submitting={submitting}
              uploadingField={uploadingField}
            />
          )}
        </div>
      </main>
      <DashboardOneStyles />
    </div>
  );
}
