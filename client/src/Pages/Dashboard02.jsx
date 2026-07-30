import React, { useCallback, useEffect, useMemo, useState } from "react";

const ENV = import.meta.env || {};
const API_BASE = (
  ENV.VITE_API_BASE_URL ||
  ENV.VITE_SCANTAP_API_BASE_URL ||
  "/api"
).replace(/\/+$/, "");
const ADD_CLIENT_URL =
  ENV.VITE_SCANTAP_ADD_CLIENT_URL ||
  `${API_BASE}/data/addClient`;
const DIRECTORY_URL =
  ENV.VITE_SCANTAP_DIRECTORY_URL || `${API_BASE}/dashboard1`;
const PUBLIC_SITE_URL = (
  ENV.VITE_PUBLIC_SITE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "")
).replace(/\/+$/, "");

const API = {
  client: (id) => `${API_BASE}/data/client/${id}`,
  update: (id) => `${API_BASE}/data/update/${id}`,
  remove: (id) => `${API_BASE}/data/deleteClient/${id}`,
  allClients: `${API_BASE}/data/fetchClients`,
};

const socialFields = (key, label) => [
  { name: `${key}Name`, label: `${label} name 1` },
  { name: `${key}Link`, label: `${label} link 1`, type: "url" },
  { name: `${key}Name02`, label: `${label} name 2` },
  { name: `${key}Link02`, label: `${label} link 2`, type: "url" },
  { name: `${key}Name03`, label: `${label} name 3` },
  { name: `${key}Link03`, label: `${label} link 3`, type: "url" },
];

const FORM_GROUPS = [
  {
    id: "identity",
    title: "Profile identity",
    description: "Core business, profile and public-page information.",
    fields: [
      { name: "companyName", label: "Profile URL name", required: true },
      { name: "name", label: "Company name" },
      { name: "romanName", label: "Roman name" },
      { name: "clientName", label: "Client name" },
      { name: "designation", label: "Designation" },
      { name: "description", label: "Description", type: "textarea", wide: true },
      { name: "services", label: "Services", type: "textarea", wide: true },
      { name: "address", label: "Address", type: "textarea", wide: true },
      { name: "location", label: "Location / map URL", type: "url" },
      { name: "qr", label: "QR value or URL" },
      { name: "option", label: "Profile template", type: "template", required: true },
      { name: "flag", label: "Profile status", type: "status" },
      {
        name: "password",
        label: "Login password",
        type: "password",
        hint: "Leave blank while editing to keep the current password.",
      },
      { name: "visitCount", label: "Visit count", type: "number" },
    ],
  },
  {
    id: "contact",
    title: "Contact details",
    description: "Email addresses and Qatar contact numbers shown on the profile.",
    fields: [
      { name: "email", label: "Login / primary email", type: "email", required: true },
      { name: "email02", label: "Email 2", type: "email" },
      { name: "email03", label: "Email 3", type: "email" },
      { name: "phone01", label: "Mobile number 1" },
      { name: "phone02", label: "Mobile number 2" },
      { name: "phone03", label: "Mobile number 3" },
      { name: "whatsapp01", label: "WhatsApp number 1" },
      { name: "whatsapp02", label: "WhatsApp number 2" },
      { name: "whatsapp03", label: "WhatsApp number 3" },
      { name: "telephone01", label: "Telephone number 1" },
      { name: "telephone02", label: "Telephone number 2" },
      { name: "telephone03", label: "Telephone number 3" },
    ],
  },
  {
    id: "social",
    title: "Social channels",
    description: "Up to three named links for every supported social platform.",
    fields: [
      ...socialFields("instagram", "Instagram"),
      ...socialFields("snapchat", "Snapchat"),
      ...socialFields("youtube", "YouTube"),
      ...socialFields("youtubeShorts", "YouTube Shorts"),
      ...socialFields("tiktok", "TikTok"),
      ...socialFields("twitter", "X / Twitter"),
      ...socialFields("facebook", "Facebook"),
      ...socialFields("googleReview", "Google review"),
      ...socialFields("googleMap", "Google map"),
      { name: "websiteName", label: "Website name 1" },
      { name: "website", label: "Website link 1", type: "url" },
      { name: "websiteName02", label: "Website name 2" },
      { name: "website02", label: "Website link 2", type: "url" },
      { name: "websiteName03", label: "Website name 3" },
      { name: "website03", label: "Website link 3", type: "url" },
    ],
  },
  {
    id: "resources",
    title: "Resources and custom links",
    description: "Menu, catalogue and additional profile destinations.",
    fields: [
      { name: "menuName", label: "Menu name" },
      { name: "menuLink", label: "Menu link", type: "url" },
      { name: "catalogueName", label: "Catalogue name" },
      { name: "catalogueLink", label: "Catalogue link", type: "url" },
      { name: "profileName01", label: "Custom profile name 1" },
      { name: "profileLink01", label: "Custom profile link 1", type: "url" },
      { name: "profileName02", label: "Custom profile name 2" },
      { name: "profileLink02", label: "Custom profile link 2", type: "url" },
    ],
  },
  {
    id: "visuals",
    title: "Brand and media",
    description: "Logo, cover/gallery media and the three template colours.",
    fields: [
      { name: "logo", label: "Logo URL", type: "url" },
      { name: "images", label: "Cover image URL", type: "url" },
      ...Array.from({ length: 10 }, (_, index) => ({
        name: `img${String(index + 1).padStart(2, "0")}`,
        label: `Gallery image ${index + 1} URL`,
        type: "url",
      })),
      { name: "color01", label: "Primary colour", type: "color" },
      { name: "color02", label: "Secondary colour", type: "color" },
      { name: "color03", label: "Accent colour", type: "color" },
    ],
  },
];

const PROFILE_FIELD_NAMES = FORM_GROUPS.flatMap((group) =>
  group.fields.map((field) => field.name),
);

const createEmptyProfile = () => {
  const profile = Object.fromEntries(PROFILE_FIELD_NAMES.map((name) => [name, ""]));
  profile.option = "1";
  profile.flag = true;
  profile.visitCount = 5;
  return profile;
};

const normaliseProfile = (source = {}) => {
  const profile = createEmptyProfile();
  PROFILE_FIELD_NAMES.forEach((name) => {
    if (name === "password") return;
    if (Object.prototype.hasOwnProperty.call(source, name) && source[name] != null) {
      profile[name] = source[name];
    }
  });
  profile.flag = source.flag !== false;
  profile.option = String(source.option || "1");
  profile.visitCount = Number(source.visitCount || 0);
  profile.password = "";
  return profile;
};

const profilePayload = (profile, editing) => {
  const payload = {};
  PROFILE_FIELD_NAMES.forEach((name) => {
    if (editing && name === "password" && !profile.password) return;
    if (name === "flag") {
      payload[name] = profile[name] !== false;
    } else if (name === "visitCount") {
      payload[name] = Number(profile[name] || 0);
    } else {
      payload[name] = profile[name] ?? "";
    }
  });
  return payload;
};

const safeDirectoryItem = (item = {}) => {
  const { password: _password, __v: _version, ...safe } = item;
  return safe;
};

const messageFromResponse = (data, fallback) =>
  data?.message || data?.error || data?.detail || fallback;

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(messageFromResponse(data, `Request failed (${response.status})`));
  }
  return data;
}

function useDirectory(enabled) {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, enabled: 0, disabled: 0 });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(
    async (page = 1, query = search) => {
      if (!enabled) return;
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(pagination.limit),
          search: query.trim(),
        });
        const result = await request(`${DIRECTORY_URL}?${params.toString()}`);
        setItems((result.items || []).map(safeDirectoryItem));
        setStats(result.stats || { total: 0, enabled: 0, disabled: 0 });
        setPagination(
          result.pagination || {
            page,
            limit: pagination.limit,
            total: result.items?.length || 0,
            totalPages: 1,
          },
        );
      } catch (directoryError) {
        try {
          const all = await request(API.allClients);
          const cleaned = (Array.isArray(all) ? all : []).map(safeDirectoryItem);
          const term = query.trim().toLowerCase();
          const filtered = term
            ? cleaned.filter((item) =>
                [item.companyName, item.name, item.clientName, item.email]
                  .filter(Boolean)
                  .some((value) => String(value).toLowerCase().includes(term)),
              )
            : cleaned;
          const limit = pagination.limit;
          const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
          const safePage = Math.min(Math.max(1, page), totalPages);
          const offset = (safePage - 1) * limit;
          setItems(filtered.slice(offset, offset + limit));
          setStats({
            total: cleaned.length,
            enabled: cleaned.filter((item) => item.flag !== false).length,
            disabled: cleaned.filter((item) => item.flag === false).length,
          });
          setPagination({
            page: safePage,
            limit,
            total: filtered.length,
            totalPages,
          });
        } catch (fallbackError) {
          setError(fallbackError.message || directoryError.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [enabled, pagination.limit, search],
  );

  useEffect(() => {
    if (enabled) load(1, "");
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    items,
    stats,
    pagination,
    search,
    loading,
    error,
    setSearch,
    load,
  };
}

function Icon({ name }) {
  const paths = {
    grid: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
    plus: "M12 5v14M5 12h14",
    user: "M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    search: "m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
    logout: "M10 17l5-5-5-5m5 5H3m12-9h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-5",
    arrow: "m9 18 6-6-6-6",
    edit: "m14 4 6 6L8 22H2v-6L14 4Zm-1 3 4 4",
    trash: "M4 7h16m-10 4v6m4-6v6M9 7V4h6v3m-9 0 1 14h10l1-14",
    eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    lock: "M6 10V7a6 6 0 0 1 12 0v3m-13 0h14v11H5V10Z",
  };
  return (
    <svg
      className="st-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.grid} />
    </svg>
  );
}

function Alert({ notice, onClose }) {
  if (!notice) return null;
  return (
    <div className={`st-alert is-${notice.type || "info"}`} role="status">
      <span>{notice.message}</span>
      <button type="button" onClick={onClose} aria-label="Close message">
        ×
      </button>
    </div>
  );
}

function Header({ title, subtitle }) {
  return (
    <header className="st-header">
      <div className="st-header-brand">
        <span className="st-brand-mark">S</span>
        <div>
          <strong>ScanTap</strong>
          <small>Profile platform</small>
        </div>
      </div>
      <div className="st-header-title">
        <p className="st-eyebrow">{title}</p>
        <h1>{subtitle}</h1>
      </div>
      <div className="st-account">
        <div className="st-account-copy">
          <strong>Profile workspace</strong>
          <small>Create and manage clients</small>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "grid" },
    { id: "create", label: "Create profile", icon: "plus" },
    { id: "manage", label: "Manage profiles", icon: "user" },
  ];

  return (
    <aside className="st-sidebar">
      <p className="st-sidebar-label">WORKSPACE</p>
      <nav>
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={activeTab === tab.id ? "is-active" : ""}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon name={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="st-sidebar-foot">
        <span className="st-live-dot" />
        <div>
          <strong>API connected</strong>
          <small>ScanTap production</small>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ label, value, note, tone }) {
  return (
    <article className={`st-stat is-${tone}`}>
      <div className="st-stat-top">
        <span>{label}</span>
        <span className="st-stat-spark">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function Overview({
  stats,
  items,
  loading,
  onCreate,
  onManage,
  onEdit,
  variant,
}) {
  const totalVisits = items.reduce(
    (sum, item) => sum + Number(item.visitCount || 0),
    0,
  );

  return (
    <div className="st-view">
      <section className="st-hero">
        <div>
          <p className="st-kicker">
            {variant === "operations" ? "PORTFOLIO OPERATIONS" : "PROFILE STUDIO"}
          </p>
          <h2>
            {variant === "operations"
              ? "Keep every client profile ready."
              : "Build profiles that feel unmistakably theirs."}
          </h2>
          <p>
            Review your portfolio, create a profile or update its content and
            template without leaving the dashboard.
          </p>
          <div className="st-hero-actions">
            <button type="button" className="st-primary" onClick={onCreate}>
              <Icon name="plus" />
              Create profile
            </button>
            <button type="button" className="st-secondary" onClick={onManage}>
              Manage directory
              <Icon name="arrow" />
            </button>
          </div>
        </div>
        <div className="st-hero-art" aria-hidden="true">
          <div className="st-phone-card">
            <span className="st-phone-pill" />
            <div className="st-phone-avatar">ST</div>
            <i />
            <i />
            <i />
          </div>
          <div className="st-template-chip">37</div>
          <div className="st-template-label">Live templates</div>
        </div>
      </section>

      <section className="st-stats-grid">
        <StatCard
          label="Total profiles"
          value={loading ? "—" : stats.total}
          note="Complete client portfolio"
          tone="blue"
        />
        <StatCard
          label="Enabled"
          value={loading ? "—" : stats.enabled}
          note="Visible public profiles"
          tone="green"
        />
        <StatCard
          label="Disabled"
          value={loading ? "—" : stats.disabled}
          note="Currently hidden"
          tone="orange"
        />
        <StatCard
          label="Visits in view"
          value={loading ? "—" : totalVisits.toLocaleString()}
          note="Across recently loaded profiles"
          tone="purple"
        />
      </section>

      <section className="st-panel st-recent-panel">
        <div className="st-panel-head">
          <div>
            <p className="st-kicker">RECENT PROFILES</p>
            <h3>Continue where you left off</h3>
          </div>
          <button type="button" className="st-text-button" onClick={onManage}>
            View all <Icon name="arrow" />
          </button>
        </div>
        <div className="st-mini-grid">
          {items.slice(0, 4).map((item) => (
            <button
              type="button"
              className="st-mini-profile"
              key={item._id}
              onClick={() => onEdit(item._id)}
            >
              <span className="st-mini-logo">
                {item.logo ? (
                  <img src={item.logo} alt="" />
                ) : (
                  (item.name || item.clientName || "S").slice(0, 1)
                )}
              </span>
              <span>
                <strong>{item.name || item.clientName || "Untitled profile"}</strong>
                <small>Template {item.option || "—"}</small>
              </span>
              <span className={`st-status ${item.flag === false ? "is-off" : ""}`}>
                {item.flag === false ? "Disabled" : "Enabled"}
              </span>
            </button>
          ))}
          {!loading && !items.length && (
            <div className="st-empty">No profiles are available yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}

function Directory({
  directory,
  onEdit,
  onCreate,
  onDelete,
  deletingId,
}) {
  const submitSearch = (event) => {
    event.preventDefault();
    directory.load(1, directory.search);
  };

  return (
    <div className="st-view">
      <section className="st-page-intro">
        <div>
          <p className="st-kicker">PROFILE DIRECTORY</p>
          <h2>Find and manage every client</h2>
          <p>Search by URL name, company, client or email address.</p>
        </div>
        <button type="button" className="st-primary" onClick={onCreate}>
          <Icon name="plus" /> New profile
        </button>
      </section>

      <section className="st-panel">
        <div className="st-directory-tools">
          <form className="st-search" onSubmit={submitSearch}>
            <Icon name="search" />
            <input
              type="search"
              value={directory.search}
              onChange={(event) => directory.setSearch(event.target.value)}
              placeholder="Search profiles…"
            />
            <button type="submit">Search</button>
          </form>
          <span className="st-result-count">
            {directory.pagination.total} matching profiles
          </span>
        </div>

        {directory.error && (
          <div className="st-inline-error">{directory.error}</div>
        )}

        <div className="st-table-wrap">
          <table className="st-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Contact</th>
                <th>Template</th>
                <th>Visits</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {directory.items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="st-profile-cell">
                      <span className="st-table-logo">
                        {item.logo ? (
                          <img src={item.logo} alt="" />
                        ) : (
                          (item.name || item.clientName || "S").slice(0, 1)
                        )}
                      </span>
                      <span>
                        <strong>{item.name || item.clientName || "Untitled"}</strong>
                        <small>/{item.companyName || "no-url-name"}</small>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="st-cell-main">{item.clientName || "—"}</span>
                    <small>{item.email || "No email"}</small>
                  </td>
                  <td>
                    <span className="st-template-badge">
                      Option {item.option || "—"}
                    </span>
                  </td>
                  <td>{Number(item.visitCount || 0).toLocaleString()}</td>
                  <td>
                    <span
                      className={`st-status ${item.flag === false ? "is-off" : ""}`}
                    >
                      {item.flag === false ? "Disabled" : "Enabled"}
                    </span>
                  </td>
                  <td>
                    <div className="st-row-actions">
                      <button
                        type="button"
                        onClick={() => onEdit(item._id)}
                        aria-label={`Edit ${item.name || item.clientName || "profile"}`}
                      >
                        <Icon name="edit" />
                      </button>
                      <button
                        type="button"
                        className="is-danger"
                        disabled={deletingId === item._id}
                        onClick={() => onDelete(item)}
                        aria-label={`Delete ${item.name || item.clientName || "profile"}`}
                      >
                        <Icon name="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!directory.loading && !directory.items.length && (
                <tr>
                  <td colSpan="6">
                    <div className="st-empty">No matching profiles found.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="st-pagination">
          <button
            type="button"
            disabled={directory.pagination.page <= 1 || directory.loading}
            onClick={() =>
              directory.load(directory.pagination.page - 1, directory.search)
            }
          >
            Previous
          </button>
          <span>
            Page <strong>{directory.pagination.page}</strong> of{" "}
            <strong>{directory.pagination.totalPages}</strong>
          </span>
          <button
            type="button"
            disabled={
              directory.pagination.page >= directory.pagination.totalPages ||
              directory.loading
            }
            onClick={() =>
              directory.load(directory.pagination.page + 1, directory.search)
            }
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({ field, value, onChange, editing }) {
  const id = `profile-${field.name}`;

  if (field.type === "textarea") {
    return (
      <label className={`st-field ${field.wide ? "is-wide" : ""}`} htmlFor={id}>
        <span>
          {field.label}
          {field.required && <b>*</b>}
        </span>
        <textarea
          id={id}
          name={field.name}
          value={value || ""}
          onChange={onChange}
          rows="4"
          required={field.required}
        />
      </label>
    );
  }

  if (field.type === "template") {
    return (
      <label className="st-field" htmlFor={id}>
        <span>
          {field.label}
          {field.required && <b>*</b>}
        </span>
        <select
          id={id}
          name={field.name}
          value={String(value || "1")}
          onChange={onChange}
          required={field.required}
        >
          {Array.from({ length: 37 }, (_, index) => (
            <option key={index + 1} value={String(index + 1)}>
              Option {index + 1}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "status") {
    return (
      <label className="st-field" htmlFor={id}>
        <span>{field.label}</span>
        <select
          id={id}
          name={field.name}
          value={value === false ? "false" : "true"}
          onChange={onChange}
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </label>
    );
  }

  if (field.type === "color") {
    return (
      <label className="st-field" htmlFor={id}>
        <span>{field.label}</span>
        <div className="st-color-input">
          <input
            type="color"
            value={/^#[0-9a-f]{6}$/i.test(value || "") ? value : "#5b5cf0"}
            onChange={(event) =>
              onChange({ target: { name: field.name, value: event.target.value } })
            }
            aria-label={`${field.label} colour picker`}
          />
          <input
            id={id}
            name={field.name}
            value={value || ""}
            onChange={onChange}
            placeholder="#5B5CF0"
          />
        </div>
      </label>
    );
  }

  return (
    <label className={`st-field ${field.wide ? "is-wide" : ""}`} htmlFor={id}>
      <span>
        {field.label}
        {field.required && <b>*</b>}
      </span>
      <input
        id={id}
        type={field.type || "text"}
        name={field.name}
        value={value ?? ""}
        onChange={onChange}
        required={field.required || (!editing && field.name === "password")}
        min={field.type === "number" ? "0" : undefined}
        autoComplete={field.name === "password" ? "new-password" : undefined}
      />
      {field.hint && <small>{field.hint}</small>}
    </label>
  );
}

function ProfileForm({
  mode,
  profile,
  setProfile,
  onSubmit,
  onCancel,
  saving,
  profileId,
}) {
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries(FORM_GROUPS.map((group, index) => [group.id, index === 0])),
  );
  const editing = mode === "edit";

  const onChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({
      ...current,
      [name]:
        name === "flag"
          ? value === "true"
          : name === "visitCount"
            ? value.replace(/[^\d]/g, "")
            : value,
    }));
  };

  return (
    <div className="st-view">
      <section className="st-page-intro">
        <div>
          <p className="st-kicker">
            {editing ? "EDIT PROFILE" : "CREATE PROFILE"}
          </p>
          <h2>
            {editing
              ? profile.name || profile.clientName || "Update profile"
              : "Create a new ScanTap profile"}
          </h2>
          <p>
            {editing
              ? `Profile ID: ${profileId}`
              : "Complete the relevant sections now; optional information can be added later."}
          </p>
        </div>
        {editing && profile.companyName && (
          <a
            className="st-secondary"
            href={`${PUBLIC_SITE_URL}/${profile.companyName}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="eye" /> View public profile
          </a>
        )}
      </section>

      <form onSubmit={onSubmit} className="st-editor-layout">
        <div className="st-form-stack">
          {FORM_GROUPS.map((group) => (
            <section className="st-panel st-form-section" key={group.id}>
              <button
                type="button"
                className="st-form-section-head"
                onClick={() =>
                  setOpenGroups((current) => ({
                    ...current,
                    [group.id]: !current[group.id],
                  }))
                }
                aria-expanded={openGroups[group.id]}
              >
                <span>
                  <strong>{group.title}</strong>
                  <small>{group.description}</small>
                </span>
                <b>{openGroups[group.id] ? "−" : "+"}</b>
              </button>
              {openGroups[group.id] && (
                <div className="st-fields-grid">
                  {group.fields.map((field) => (
                    <Field
                      key={field.name}
                      field={field}
                      value={profile[field.name]}
                      onChange={onChange}
                      editing={editing}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <aside className="st-save-card">
          <p className="st-kicker">{editing ? "LIVE UPDATE" : "NEW PROFILE"}</p>
          <h3>{editing ? "Ready to publish?" : "Profile checklist"}</h3>
          <ul>
            <li className={profile.companyName ? "is-done" : ""}>
              <span>{profile.companyName ? "✓" : "1"}</span> URL name
            </li>
            <li className={profile.email ? "is-done" : ""}>
              <span>{profile.email ? "✓" : "2"}</span> Login email
            </li>
            <li className={profile.option ? "is-done" : ""}>
              <span>{profile.option ? "✓" : "3"}</span> Template option
            </li>
            <li className={profile.logo ? "is-done" : ""}>
              <span>{profile.logo ? "✓" : "4"}</span> Brand logo
            </li>
          </ul>
          <div className="st-template-preview">
            <span>Selected layout</span>
            <strong>{profile.option || "1"}</strong>
            <small>Template option</small>
          </div>
          <button type="submit" className="st-primary" disabled={saving}>
            {saving
              ? "Saving…"
              : editing
                ? "Save profile changes"
                : "Add profile"}
          </button>
          <button type="button" className="st-cancel" onClick={onCancel}>
            Cancel
          </button>
        </aside>
      </form>
    </div>
  );
}

export function ScanTapDashboardWorkspace({
  variant = "operations",
  defaultTab = "overview",
  pageTitle = "Dashboard 02",
  pageSubtitle = "Portfolio operations",
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [profile, setProfile] = useState(createEmptyProfile);
  const [profileId, setProfileId] = useState("");
  const [formMode, setFormMode] = useState("create");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [notice, setNotice] = useState(null);
  const directory = useDirectory(true);

  const showNotice = useCallback((type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 5000);
  }, []);

  const editProfile = useCallback(
    async (id) => {
      if (!id) return;
      setBusy(true);
      setNotice(null);
      try {
        const result = await request(API.client(id));
        setProfile(normaliseProfile(result));
        setProfileId(id);
        setFormMode("edit");
        setActiveTab("editor");
      } catch (error) {
        showNotice("error", error.message);
      } finally {
        setBusy(false);
      }
    },
    [showNotice],
  );

  const startCreate = () => {
    setProfile(createEmptyProfile());
    setProfileId("");
    setFormMode("create");
    setActiveTab("create");
    setNotice(null);
  };

  const cancelForm = () => {
    setActiveTab("manage");
    setProfile(createEmptyProfile());
    setProfileId("");
  };

  const submitProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const editing = formMode === "edit";
      const payload = profilePayload(profile, editing);
      if (editing) {
        await request(API.update(profileId), {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        showNotice("success", "Profile changes saved successfully.");
      } else {
        await request(ADD_CLIENT_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        showNotice("success", "Profile created successfully.");
        setProfile(createEmptyProfile());
        directory.load(1, "");
      }
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProfile = async (item) => {
    const label = item.name || item.clientName || item.companyName || "this profile";
    if (!window.confirm(`Permanently delete ${label}? This cannot be undone.`)) return;

    setDeletingId(item._id);
    setNotice(null);
    try {
      await request(API.remove(item._id), { method: "DELETE" });
      showNotice("success", `${label} was deleted.`);
      directory.load(directory.pagination.page, directory.search);
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setDeletingId("");
    }
  };

  const titleCopy = useMemo(() => {
    if (variant === "studio") {
      return { title: pageTitle, subtitle: pageSubtitle || "Profile studio" };
    }
    return { title: pageTitle, subtitle: pageSubtitle || "Portfolio operations" };
  }, [pageSubtitle, pageTitle, variant]);

  const renderContent = () => {
    if (activeTab === "editor") {
      return (
        <ProfileForm
          mode="edit"
          profile={profile}
          setProfile={setProfile}
          profileId={profileId}
          onSubmit={submitProfile}
          onCancel={cancelForm}
          saving={saving}
        />
      );
    }

    if (activeTab === "create") {
      return (
        <ProfileForm
          mode="create"
          profile={profile}
          setProfile={setProfile}
          profileId=""
          onSubmit={submitProfile}
          onCancel={cancelForm}
          saving={saving}
        />
      );
    }

    if (activeTab === "manage") {
      return (
        <Directory
          directory={directory}
          onEdit={editProfile}
          onCreate={startCreate}
          onDelete={deleteProfile}
          deletingId={deletingId}
        />
      );
    }

    return (
      <Overview
        stats={directory.stats}
        items={directory.items}
        loading={directory.loading}
        onCreate={startCreate}
        onManage={() => setActiveTab("manage")}
        onEdit={editProfile}
        variant={variant}
      />
    );
  };

  return (
    <div className={`st-admin st-variant-${variant}`}>
      <style>{ADMIN_CSS}</style>
      <Header
        title={titleCopy.title}
        subtitle={titleCopy.subtitle}
      />
      <div className="st-workspace">
        <Sidebar
          activeTab={
            activeTab === "editor"
              ? "manage"
              : activeTab === "profile"
                ? "profile"
                : activeTab
          }
          onTabChange={(tab) => {
            if (tab === "create") startCreate();
            else setActiveTab(tab);
          }}
        />
        <main className="st-content">
          <Alert notice={notice} onClose={() => setNotice(null)} />
          {busy && <div className="st-loading-bar" />}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function Dashboard02() {
  return (
    <ScanTapDashboardWorkspace
      variant="operations"
      defaultTab="manage"
      pageTitle="Dashboard 02"
      pageSubtitle="Portfolio operations"
    />
  );
}

const ADMIN_CSS = `
  .st-admin {
    --ink: #171a2b;
    --muted: #73778c;
    --line: #e7e8f0;
    --soft: #f6f7fb;
    --paper: #ffffff;
    --accent: #5b5cf0;
    --accent-2: #8779ff;
    --dark: #17182c;
    --success: #15966a;
    --danger: #dc4961;
    --warning: #db8b2c;
    min-height: 100vh;
    color: var(--ink);
    background: var(--soft);
    font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.45;
  }
  .st-admin * { box-sizing: border-box; }
  .st-admin button, .st-admin input, .st-admin textarea, .st-admin select {
    font: inherit;
  }
  .st-admin button, .st-admin a { -webkit-tap-highlight-color: transparent; }
  .st-variant-studio { --accent: #5c5df4; --accent-2: #9d6cff; }
  .st-variant-operations { --accent: #087f8c; --accent-2: #25a69a; }
  .st-variant-portal { --accent: #3157d5; --accent-2: #6e62f5; }
  .st-icon { width: 20px; height: 20px; flex: 0 0 auto; }
  .st-brand-mark {
    width: 42px;
    height: 42px;
    display: inline-grid;
    place-items: center;
    border-radius: 14px;
    color: white;
    background: linear-gradient(145deg, var(--accent), var(--accent-2));
    font-size: 20px;
    font-weight: 850;
    box-shadow: 0 10px 25px color-mix(in srgb, var(--accent) 25%, transparent);
  }
  .st-eyebrow, .st-kicker {
    margin: 0 0 8px;
    color: var(--accent);
    font-size: 11px;
    font-weight: 850;
    letter-spacing: .16em;
  }
  .st-muted { color: var(--muted); }

  .st-login-shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(390px, .95fr) minmax(520px, 1.05fr);
    background: white;
  }
  .st-login-story {
    position: relative;
    min-height: 100vh;
    padding: clamp(44px, 7vw, 104px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    background:
      radial-gradient(circle at 15% 12%, rgba(146, 112, 255, .44), transparent 27%),
      radial-gradient(circle at 88% 88%, rgba(65, 203, 190, .19), transparent 30%),
      linear-gradient(145deg, #18182f 0%, #222344 54%, #15162a 100%);
  }
  .st-login-story .st-brand-mark {
    position: absolute;
    top: 42px;
    left: clamp(44px, 7vw, 104px);
  }
  .st-login-story .st-eyebrow { color: #aeadff; }
  .st-login-story h1 {
    position: relative;
    z-index: 2;
    margin: 0;
    max-width: 690px;
    font-size: clamp(48px, 6vw, 88px);
    line-height: .98;
    letter-spacing: -.065em;
  }
  .st-login-copy {
    position: relative;
    z-index: 2;
    max-width: 590px;
    margin: 30px 0 34px;
    color: #c5c6d9;
    font-size: 17px;
  }
  .st-login-points {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .st-login-points span {
    padding: 9px 13px;
    border: 1px solid rgba(255,255,255,.13);
    border-radius: 999px;
    color: #e9e9f6;
    background: rgba(255,255,255,.06);
    backdrop-filter: blur(10px);
    font-size: 12px;
  }
  .st-orbit {
    position: absolute;
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 50%;
    animation: stFloat 8s ease-in-out infinite;
  }
  .st-orbit-one { right: -120px; top: 12%; width: 420px; height: 420px; }
  .st-orbit-two { right: 18%; bottom: -90px; width: 230px; height: 230px; animation-delay: -3s; }
  @keyframes stFloat { 50% { transform: translate3d(0,-18px,0) rotate(8deg); } }
  .st-login-panel {
    display: grid;
    place-items: center;
    padding: 42px;
    background:
      radial-gradient(circle at 75% 20%, color-mix(in srgb, var(--accent) 7%, transparent), transparent 25%),
      #fff;
  }
  .st-login-card { width: min(440px, 100%); }
  .st-mobile-brand { display: none; }
  .st-login-icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    margin-bottom: 25px;
    border-radius: 18px;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 10%, white);
  }
  .st-login-card h2 {
    margin: 0;
    font-size: 38px;
    letter-spacing: -.04em;
  }
  .st-login-card > .st-muted { margin: 10px 0 28px; }
  .st-login-form { display: grid; gap: 17px; }
  .st-login-form label, .st-field { display: grid; gap: 7px; }
  .st-login-form label > span, .st-field > span {
    color: #42465a;
    font-size: 12px;
    font-weight: 750;
  }
  .st-login-form input, .st-field input, .st-field textarea, .st-field select {
    width: 100%;
    border: 1px solid var(--line);
    border-radius: 12px;
    outline: none;
    color: var(--ink);
    background: white;
    transition: border-color .2s, box-shadow .2s, transform .2s;
  }
  .st-login-form input { height: 50px; padding: 0 15px; }
  .st-field input, .st-field select { min-height: 43px; padding: 8px 12px; }
  .st-field textarea { padding: 11px 12px; resize: vertical; }
  .st-login-form input:focus, .st-field input:focus, .st-field textarea:focus, .st-field select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 11%, transparent);
  }
  .st-password-wrap { position: relative; }
  .st-password-wrap input { padding-right: 50px; }
  .st-password-wrap button {
    position: absolute;
    right: 7px;
    top: 7px;
    width: 36px;
    height: 36px;
    border: 0;
    display: grid;
    place-items: center;
    color: var(--muted);
    background: transparent;
    cursor: pointer;
  }
  .st-primary, .st-secondary {
    min-height: 42px;
    padding: 10px 17px;
    border: 0;
    border-radius: 11px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s, opacity .2s;
  }
  .st-primary {
    color: white;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 12px 28px color-mix(in srgb, var(--accent) 22%, transparent);
  }
  .st-secondary {
    border: 1px solid var(--line);
    color: var(--ink);
    background: white;
  }
  .st-primary:hover, .st-secondary:hover { transform: translateY(-2px); }
  .st-primary:disabled { cursor: wait; opacity: .6; transform: none; }
  .st-login-submit { width: 100%; height: 52px; margin-top: 5px; }
  .st-login-submit .st-icon { margin-left: auto; }
  .st-login-note { margin: 22px 0 0; color: #9295a5; font-size: 11px; text-align: center; }

  .st-alert {
    position: relative;
    z-index: 5;
    margin-bottom: 18px;
    padding: 12px 14px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    color: #2d536b;
    background: #edf8ff;
    font-size: 13px;
    font-weight: 700;
  }
  .st-alert.is-error { color: #972b3f; background: #fff0f3; }
  .st-alert.is-success { color: #0d6d4b; background: #eafaf3; }
  .st-alert button { border: 0; color: inherit; background: none; font-size: 21px; cursor: pointer; }
  .st-login-card .st-alert { margin-top: -8px; }

  .st-header {
    position: sticky;
    z-index: 20;
    top: 0;
    min-height: 74px;
    padding: 12px 28px;
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: 230px minmax(280px, 1fr) auto;
    align-items: center;
    background: rgba(255,255,255,.94);
    backdrop-filter: blur(16px);
  }
  .st-header-brand { display: flex; align-items: center; gap: 11px; }
  .st-header-brand > div, .st-account-copy { display: grid; }
  .st-header-brand strong { font-size: 16px; }
  .st-header-brand small, .st-account small { color: var(--muted); font-size: 10px; }
  .st-header-title { padding-left: 27px; border-left: 1px solid var(--line); }
  .st-header-title .st-eyebrow { margin: 0; font-size: 9px; }
  .st-header-title h1 { margin: 2px 0 0; font-size: 18px; letter-spacing: -.02em; }
  .st-account { display: flex; align-items: center; gap: 14px; }
  .st-account-copy { text-align: right; }
  .st-account-copy strong { font-size: 12px; }
  .st-icon-button {
    min-height: 38px;
    padding: 8px 11px;
    border: 1px solid var(--line);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--ink);
    background: white;
    cursor: pointer;
  }
  .st-icon-button span { font-size: 11px; font-weight: 800; }

  .st-workspace { min-height: calc(100vh - 74px); display: grid; grid-template-columns: 230px 1fr; }
  .st-sidebar {
    position: sticky;
    top: 74px;
    height: calc(100vh - 74px);
    padding: 25px 16px 18px;
    border-right: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .st-sidebar-label { padding: 0 12px; color: #9b9dad; font-size: 9px; font-weight: 850; letter-spacing: .15em; }
  .st-sidebar nav { display: grid; gap: 6px; margin-top: 8px; }
  .st-sidebar nav button {
    width: 100%;
    padding: 11px 12px;
    border: 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 11px;
    color: #676b7d;
    background: transparent;
    font-size: 12px;
    font-weight: 750;
    text-align: left;
    cursor: pointer;
    transition: color .2s, background .2s, transform .2s;
  }
  .st-sidebar nav button:hover { transform: translateX(3px); color: var(--ink); background: var(--soft); }
  .st-sidebar nav button.is-active {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 9%, white);
  }
  .st-sidebar-foot {
    margin-top: auto;
    padding: 13px 12px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    gap: 9px;
    background: var(--soft);
  }
  .st-sidebar-foot div { display: grid; }
  .st-sidebar-foot strong { font-size: 10px; }
  .st-sidebar-foot small { color: var(--muted); font-size: 9px; }
  .st-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #19b879; box-shadow: 0 0 0 5px #dff8ed; }
  .st-content { position: relative; min-width: 0; padding: 30px; }
  .st-loading-bar {
    position: fixed;
    z-index: 40;
    top: 74px;
    left: 230px;
    width: calc(100% - 230px);
    height: 3px;
    overflow: hidden;
    background: color-mix(in srgb, var(--accent) 12%, white);
  }
  .st-loading-bar::after {
    content: "";
    display: block;
    width: 35%;
    height: 100%;
    background: var(--accent);
    animation: stLoading 1.1s ease-in-out infinite;
  }
  @keyframes stLoading { from { transform: translateX(-110%); } to { transform: translateX(300%); } }
  .st-view { max-width: 1420px; margin: 0 auto; }

  .st-hero {
    position: relative;
    min-height: 300px;
    padding: clamp(30px, 4vw, 58px);
    border-radius: 23px;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(260px, .75fr);
    align-items: center;
    color: white;
    background:
      radial-gradient(circle at 80% 20%, rgba(161, 138, 255, .28), transparent 30%),
      linear-gradient(135deg, var(--dark), color-mix(in srgb, var(--dark) 75%, var(--accent)));
    box-shadow: 0 24px 70px rgba(23, 24, 44, .17);
  }
  .st-variant-operations .st-hero { --dark: #102f37; }
  .st-hero .st-kicker { color: #c0bfff; }
  .st-variant-operations .st-hero .st-kicker { color: #8be4da; }
  .st-hero h2 { max-width: 720px; margin: 0; font-size: clamp(34px, 4vw, 59px); line-height: 1.03; letter-spacing: -.055em; }
  .st-hero p:not(.st-kicker) { max-width: 640px; margin: 18px 0 24px; color: #c9cadb; font-size: 14px; }
  .st-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; }
  .st-hero .st-secondary { border-color: rgba(255,255,255,.16); color: white; background: rgba(255,255,255,.08); }
  .st-hero-art { position: relative; min-height: 250px; }
  .st-phone-card {
    position: absolute;
    right: 20%;
    top: 8%;
    width: 142px;
    height: 245px;
    padding: 18px;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 27px;
    transform: rotate(7deg);
    background: rgba(255,255,255,.13);
    box-shadow: 0 30px 60px rgba(0,0,0,.22);
    backdrop-filter: blur(18px);
  }
  .st-phone-pill { display: block; width: 34px; height: 5px; margin: 0 auto 23px; border-radius: 9px; background: rgba(255,255,255,.3); }
  .st-phone-avatar { width: 57px; height: 57px; margin: 0 auto 20px; border-radius: 18px; display: grid; place-items: center; color: var(--dark); background: white; font-weight: 900; }
  .st-phone-card i { display: block; height: 25px; margin-top: 10px; border-radius: 9px; background: rgba(255,255,255,.15); }
  .st-template-chip {
    position: absolute;
    right: 4%;
    bottom: 14%;
    width: 82px;
    height: 82px;
    border-radius: 24px;
    display: grid;
    place-items: center;
    color: var(--dark);
    background: white;
    font-size: 31px;
    font-weight: 900;
    transform: rotate(-7deg);
    box-shadow: 0 17px 35px rgba(0,0,0,.2);
  }
  .st-template-label { position: absolute; right: 3%; bottom: 2%; color: #d4d4e2; font-size: 10px; font-weight: 800; }

  .st-stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 18px; }
  .st-stat {
    min-height: 145px;
    padding: 20px;
    border: 1px solid var(--line);
    border-radius: 17px;
    background: white;
    transition: transform .25s, box-shadow .25s;
  }
  .st-stat:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(28,31,55,.08); }
  .st-stat-top { display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: 11px; font-weight: 750; }
  .st-stat > strong { display: block; margin: 18px 0 2px; font-size: 33px; letter-spacing: -.04em; }
  .st-stat > small { color: var(--muted); font-size: 10px; }
  .st-stat-spark { height: 24px; display: flex; align-items: end; gap: 3px; }
  .st-stat-spark i { width: 4px; border-radius: 5px; background: currentColor; opacity: .65; }
  .st-stat-spark i:nth-child(1) { height: 7px; } .st-stat-spark i:nth-child(2) { height: 16px; }
  .st-stat-spark i:nth-child(3) { height: 11px; } .st-stat-spark i:nth-child(4) { height: 22px; }
  .st-stat.is-blue .st-stat-spark { color: #4f67e8; } .st-stat.is-green .st-stat-spark { color: #18a374; }
  .st-stat.is-orange .st-stat-spark { color: #e1963a; } .st-stat.is-purple .st-stat-spark { color: #9066df; }

  .st-panel {
    border: 1px solid var(--line);
    border-radius: 17px;
    background: white;
    box-shadow: 0 8px 30px rgba(25,27,46,.035);
  }
  .st-recent-panel { margin-top: 18px; padding: 24px; }
  .st-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .st-panel-head h3, .st-page-intro h2, .st-save-card h3 { margin: 0; letter-spacing: -.035em; }
  .st-panel-head h3 { font-size: 21px; }
  .st-text-button {
    border: 0;
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--accent);
    background: transparent;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  }
  .st-mini-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 20px; }
  .st-mini-profile {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--line);
    border-radius: 13px;
    display: grid;
    grid-template-columns: 42px 1fr auto;
    align-items: center;
    gap: 11px;
    color: var(--ink);
    background: white;
    text-align: left;
    cursor: pointer;
    transition: transform .2s, border-color .2s;
  }
  .st-mini-profile:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--accent) 35%, var(--line)); }
  .st-mini-logo, .st-table-logo {
    overflow: hidden;
    display: grid;
    place-items: center;
    border-radius: 11px;
    color: white;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    font-size: 13px;
    font-weight: 850;
  }
  .st-mini-logo { width: 42px; height: 42px; }
  .st-mini-logo img, .st-table-logo img { width: 100%; height: 100%; object-fit: cover; background: white; }
  .st-mini-profile > span:nth-child(2), .st-profile-cell > span:nth-child(2) { min-width: 0; display: grid; }
  .st-mini-profile strong, .st-profile-cell strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
  .st-mini-profile small, .st-profile-cell small, .st-table td small { color: var(--muted); font-size: 10px; }
  .st-status {
    display: inline-flex;
    width: fit-content;
    padding: 5px 8px;
    border-radius: 999px;
    color: #0b7652;
    background: #e7f8f0;
    font-size: 9px;
    font-weight: 850;
  }
  .st-status.is-off { color: #a15c1b; background: #fff1e2; }

  .st-page-intro {
    margin-bottom: 20px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 25px;
  }
  .st-page-intro h2 { font-size: clamp(27px, 3vw, 39px); }
  .st-page-intro p:not(.st-kicker) { margin: 7px 0 0; color: var(--muted); font-size: 12px; }
  .st-directory-tools { padding: 16px 18px; border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .st-search {
    width: min(520px, 100%);
    height: 42px;
    padding-left: 12px;
    border: 1px solid var(--line);
    border-radius: 11px;
    display: flex;
    align-items: center;
    color: var(--muted);
    background: var(--soft);
  }
  .st-search input { min-width: 0; flex: 1; height: 100%; padding: 0 10px; border: 0; outline: 0; background: transparent; }
  .st-search button { height: 100%; padding: 0 15px; border: 0; border-left: 1px solid var(--line); color: var(--accent); background: white; font-size: 11px; font-weight: 850; cursor: pointer; }
  .st-result-count { color: var(--muted); font-size: 11px; }
  .st-inline-error { margin: 15px; padding: 11px; border-radius: 9px; color: #972b3f; background: #fff0f3; font-size: 12px; }
  .st-table-wrap { overflow-x: auto; }
  .st-table { width: 100%; border-collapse: collapse; }
  .st-table th { padding: 13px 18px; border-bottom: 1px solid var(--line); color: #8e91a1; background: #fafafd; font-size: 9px; letter-spacing: .08em; text-align: left; text-transform: uppercase; }
  .st-table td { padding: 14px 18px; border-bottom: 1px solid var(--line); font-size: 11px; vertical-align: middle; }
  .st-table tbody tr { transition: background .2s; }
  .st-table tbody tr:hover { background: #fbfbfe; }
  .st-profile-cell { min-width: 220px; display: flex; align-items: center; gap: 11px; }
  .st-table-logo { width: 38px; height: 38px; }
  .st-cell-main { display: block; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 750; }
  .st-template-badge { padding: 6px 9px; border-radius: 7px; color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, white); font-size: 10px; font-weight: 800; }
  .st-row-actions { display: flex; justify-content: flex-end; gap: 6px; }
  .st-row-actions button {
    width: 34px;
    height: 34px;
    border: 1px solid var(--line);
    border-radius: 9px;
    display: grid;
    place-items: center;
    color: var(--accent);
    background: white;
    cursor: pointer;
  }
  .st-row-actions button.is-danger { color: var(--danger); }
  .st-row-actions button:disabled { opacity: .45; cursor: wait; }
  .st-row-actions .st-icon { width: 16px; }
  .st-empty { padding: 30px; color: var(--muted); text-align: center; font-size: 12px; }
  .st-pagination { padding: 15px 18px; display: flex; align-items: center; justify-content: flex-end; gap: 15px; }
  .st-pagination button { padding: 7px 11px; border: 1px solid var(--line); border-radius: 8px; color: var(--ink); background: white; font-size: 10px; font-weight: 800; cursor: pointer; }
  .st-pagination button:disabled { opacity: .4; cursor: not-allowed; }
  .st-pagination span { color: var(--muted); font-size: 10px; }

  .st-editor-layout { display: grid; grid-template-columns: minmax(0, 1fr) 260px; align-items: start; gap: 18px; }
  .st-form-stack { display: grid; gap: 12px; }
  .st-form-section { overflow: hidden; }
  .st-form-section-head {
    width: 100%;
    padding: 17px 19px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--ink);
    background: white;
    text-align: left;
    cursor: pointer;
  }
  .st-form-section-head span { display: grid; gap: 3px; }
  .st-form-section-head strong { font-size: 13px; }
  .st-form-section-head small { color: var(--muted); font-size: 10px; font-weight: 500; }
  .st-form-section-head b { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, white); font-size: 17px; }
  .st-fields-grid {
    padding: 18px 19px 21px;
    border-top: 1px solid var(--line);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
    background: #fcfcfe;
    animation: stReveal .24s ease both;
  }
  @keyframes stReveal { from { opacity: 0; transform: translateY(-4px); } }
  .st-field.is-wide { grid-column: 1 / -1; }
  .st-field > span b { margin-left: 3px; color: var(--danger); }
  .st-field > small { margin-top: -3px; color: var(--muted); font-size: 9px; }
  .st-color-input { display: grid; grid-template-columns: 45px 1fr; gap: 7px; }
  .st-color-input input[type="color"] { height: 43px; padding: 4px; cursor: pointer; }
  .st-save-card {
    position: sticky;
    top: 100px;
    padding: 21px;
    border-radius: 17px;
    color: white;
    background:
      radial-gradient(circle at 85% 12%, color-mix(in srgb, var(--accent-2) 35%, transparent), transparent 28%),
      var(--dark);
    box-shadow: 0 20px 45px rgba(23,24,44,.16);
  }
  .st-variant-operations .st-save-card { --dark: #102f37; }
  .st-save-card .st-kicker { color: #afafff; }
  .st-save-card h3 { font-size: 21px; }
  .st-save-card ul { margin: 20px 0; padding: 0; display: grid; gap: 10px; list-style: none; }
  .st-save-card li { display: flex; align-items: center; gap: 9px; color: #9ea0b4; font-size: 10px; }
  .st-save-card li span { width: 22px; height: 22px; border: 1px solid rgba(255,255,255,.15); border-radius: 7px; display: grid; place-items: center; }
  .st-save-card li.is-done { color: #e7e7f2; }
  .st-save-card li.is-done span { border-color: #37c991; color: #0d4e38; background: #75e4ba; }
  .st-template-preview {
    margin: 19px 0;
    padding: 17px;
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 13px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    background: rgba(255,255,255,.06);
  }
  .st-template-preview span { grid-column: 1; color: #9ea0b4; font-size: 9px; }
  .st-template-preview strong { grid-column: 2; grid-row: 1 / span 2; font-size: 31px; }
  .st-template-preview small { grid-column: 1; font-size: 10px; }
  .st-save-card .st-primary { width: 100%; }
  .st-cancel { width: 100%; margin-top: 8px; padding: 8px; border: 0; color: #aeb0c0; background: transparent; font-size: 10px; font-weight: 800; cursor: pointer; }

  @media (max-width: 1080px) {
    .st-login-shell { grid-template-columns: .9fr 1.1fr; }
    .st-login-story { padding: 48px; }
    .st-login-story .st-brand-mark { left: 48px; }
    .st-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .st-editor-layout { grid-template-columns: 1fr; }
    .st-save-card { position: static; }
  }
  @media (max-width: 820px) {
    .st-login-shell { display: block; background: var(--soft); }
    .st-login-story { display: none; }
    .st-login-panel { min-height: 100vh; padding: 24px; }
    .st-mobile-brand { margin-bottom: 46px; display: flex; align-items: center; gap: 10px; }
    .st-header { grid-template-columns: 1fr auto; padding: 11px 16px; }
    .st-header-title { display: none; }
    .st-account-copy { display: none; }
    .st-icon-button span { display: none; }
    .st-workspace { display: block; }
    .st-sidebar {
      position: sticky;
      z-index: 18;
      top: 67px;
      width: 100%;
      height: auto;
      padding: 8px 12px;
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }
    .st-sidebar-label, .st-sidebar-foot { display: none; }
    .st-sidebar nav { grid-auto-flow: column; grid-auto-columns: 1fr; }
    .st-sidebar nav button { justify-content: center; padding: 9px 7px; }
    .st-sidebar nav button:hover { transform: none; }
    .st-content { padding: 18px 14px; }
    .st-loading-bar { top: 67px; left: 0; width: 100%; }
    .st-hero { min-height: auto; grid-template-columns: 1fr; }
    .st-hero-art { display: none; }
    .st-mini-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .st-login-card h2 { font-size: 31px; }
    .st-brand-mark { width: 38px; height: 38px; border-radius: 12px; }
    .st-header-brand small { display: none; }
    .st-sidebar nav button { display: grid; justify-items: center; gap: 4px; font-size: 9px; text-align: center; }
    .st-sidebar nav .st-icon { width: 17px; }
    .st-stats-grid { grid-template-columns: 1fr 1fr; gap: 9px; }
    .st-stat { min-height: 126px; padding: 15px; }
    .st-stat > strong { font-size: 27px; }
    .st-page-intro { align-items: stretch; flex-direction: column; }
    .st-directory-tools { align-items: stretch; flex-direction: column; }
    .st-result-count { padding-left: 3px; }
    .st-fields-grid { grid-template-columns: 1fr; padding: 15px; }
    .st-field.is-wide { grid-column: auto; }
    .st-pagination { justify-content: center; }
    .st-mini-profile { grid-template-columns: 38px 1fr; }
    .st-mini-profile .st-status { grid-column: 2; }
  }
`;
