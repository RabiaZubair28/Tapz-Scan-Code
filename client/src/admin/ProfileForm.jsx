/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ImagePlus,
  LoaderCircle,
  Minus,
  Plus,
  UploadCloud,
} from "lucide-react";
import {
  APPEARANCE_FIELDS,
  BASIC_FIELDS,
  CONTACT_GROUPS,
  createEmptyProfile,
  getProfileOption,
  IMAGE_FIELDS,
  PROFILE_OPTIONS,
  RESOURCE_FIELDS,
  SOCIAL_GROUPS,
} from "./profileConfig";

const FORM_TABS = [
  { id: "basics", label: "Profile details" },
  { id: "contact", label: "Contact" },
  { id: "social", label: "Links" },
  { id: "media", label: "Images" },
  { id: "appearance", label: "Template" },
];

const initialRepeatCounts = () =>
  Object.fromEntries(
    [...CONTACT_GROUPS, ...SOCIAL_GROUPS].map((group) => [group.key, 1])
  );

const Field = ({ field, value, onChange, plain = false }) => {
  const inputValue =
    field.type === "color" ? value || "#000000" : value ?? "";
  const sharedProps = {
    id: field.name,
    name: field.name,
    value: inputValue,
    onChange,
    placeholder: field.placeholder || field.label,
    required: field.required,
  };

  if (field.name === "companyName") {
    sharedProps.pattern = "[a-zA-Z0-9-]+";
    sharedProps.title = "Use letters, numbers and hyphens only.";
  }

  return (
    <label
      className={`profile-field ${field.wide ? "profile-field--wide" : ""} ${
        plain ? "profile-field--plain" : ""
      }`}
      htmlFor={field.name}
    >
      <span>
        {field.label}
        {field.required ? <b aria-hidden="true"> *</b> : null}
      </span>
      {field.type === "textarea" ? (
        <textarea {...sharedProps} rows={4} />
      ) : (
        <input {...sharedProps} type={field.type || "text"} />
      )}
      {field.help ? <small>{field.help}</small> : null}
    </label>
  );
};

const TemplateSelect = ({ value, onChange, visual = false }) => {
  if (!visual) {
    return (
      <label className="profile-field profile-field--wide" htmlFor="option">
        <span>Profile template *</span>
        <select id="option" name="option" value={value} onChange={onChange}>
          {PROFILE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Option {option.value} ({option.label})
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div className="template-picker">
      {PROFILE_OPTIONS.map((option) => {
        const selected = value === option.value;
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
};

const RepeatableTextGroup = ({
  group,
  form,
  count,
  onChange,
  onAdd,
  onRemove,
}) => (
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
          <Field
            field={{
              name: fieldName,
              label: group.labels[index],
              type: group.type,
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

const RepeatableLinkGroup = ({
  group,
  form,
  count,
  onChange,
  onAdd,
  onRemove,
}) => (
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
          <Field
            field={{
              name: nameField,
              label: `${group.title} name ${index + 1}`,
            }}
            value={form[nameField]}
            onChange={onChange}
          />
          <Field
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

const UploadField = ({
  field,
  value,
  onUpload,
  uploading,
  onClear,
}) => (
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

const PlainSocialFields = ({ form, onChange }) => (
  <div className="plain-social-groups">
    {SOCIAL_GROUPS.map((group) => (
      <fieldset key={group.key}>
        <legend>{group.title}</legend>
        <div className="profile-field-grid">
          {group.names.map((nameField, index) => (
            <span className="plain-field-pair" key={nameField}>
              <Field
                field={{
                  name: nameField,
                  label: `${group.title} name ${index + 1}`,
                }}
                value={form[nameField]}
                onChange={onChange}
                plain
              />
              <Field
                field={{
                  name: group.links[index],
                  label: `${group.title} link ${index + 1}`,
                  type: "url",
                }}
                value={form[group.links[index]]}
                onChange={onChange}
                plain
              />
            </span>
          ))}
        </div>
      </fieldset>
    ))}
  </div>
);

export default function ProfileForm({
  variant = "interactive",
  onSubmit,
  onUpload,
  submitting = false,
  uploadingField = "",
  resetSignal = 0,
}) {
  const interactive = variant === "interactive";
  const [form, setForm] = useState(createEmptyProfile);
  const [activeTab, setActiveTab] = useState("basics");
  const [repeatCounts, setRepeatCounts] = useState(initialRepeatCounts);

  useEffect(() => {
    setForm(createEmptyProfile());
    setRepeatCounts(initialRepeatCounts());
    setActiveTab("basics");
  }, [resetSignal]);

  const selectedTemplate = useMemo(
    () => getProfileOption(form.option),
    [form.option]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]:
        name === "flag"
          ? value === true || value === "true"
          : name === "companyName"
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

  const clearImage = (name) => {
    setForm((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const plainContactFields = CONTACT_GROUPS.flatMap((group) =>
    group.fields.map((name, index) => ({
      name,
      label: group.labels[index],
      type: group.type,
    }))
  );

  if (!interactive) {
    return (
      <form className="plain-profile-form" onSubmit={submit}>
        <fieldset>
          <legend>Profile details</legend>
          <div className="profile-field-grid">
            {BASIC_FIELDS.map((field) => (
              <Field
                field={field}
                value={form[field.name]}
                onChange={handleChange}
                plain
                key={field.name}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact details</legend>
          <div className="profile-field-grid">
            {plainContactFields.map((field) => (
              <Field
                field={field}
                value={form[field.name]}
                onChange={handleChange}
                plain
                key={field.name}
              />
            ))}
          </div>
        </fieldset>

        <PlainSocialFields form={form} onChange={handleChange} />

        <fieldset>
          <legend>Menu, catalogue and custom links</legend>
          <div className="profile-field-grid">
            {RESOURCE_FIELDS.map((field) => (
              <Field
                field={field}
                value={form[field.name]}
                onChange={handleChange}
                plain
                key={field.name}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Image URLs</legend>
          <div className="profile-field-grid">
            {IMAGE_FIELDS.map((field) => (
              <Field
                field={{ ...field, type: "url" }}
                value={form[field.name]}
                onChange={handleChange}
                plain
                key={field.name}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Template and settings</legend>
          <div className="profile-field-grid">
            <TemplateSelect value={form.option} onChange={handleChange} />
            {APPEARANCE_FIELDS.map((field) => (
              <Field
                field={field}
                value={form[field.name]}
                onChange={handleChange}
                plain
                key={field.name}
              />
            ))}
            <label className="profile-field" htmlFor="flag">
              <span>Profile enabled</span>
              <select
                id="flag"
                name="flag"
                value={String(form.flag)}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>
        </fieldset>

        <div className="plain-form-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating profile..." : "Create profile"}
          </button>
        </div>
      </form>
    );
  }

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
                <h3>Build the profile identity</h3>
                <span>
                  Set the public URL, profile name and the information shown at
                  the top of the selected template.
                </span>
              </div>
              <div className="profile-field-grid">
                {BASIC_FIELDS.map((field) => (
                  <Field
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
                  Start with one entry. Use Add to reveal the second and third
                  fields; the button disappears after the third.
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
                    <Field
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
                  upload is confirmed before the profile is created.
                </span>
              </div>
              <div className="upload-grid">
                {IMAGE_FIELDS.map((field) => (
                  <UploadField
                    field={field}
                    value={form[field.name]}
                    onUpload={handleImageUpload}
                    uploading={uploadingField === field.name}
                    onClear={clearImage}
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
                  All 37 project templates are available and labelled with
                  their visual theme.
                </span>
              </div>
              <TemplateSelect
                value={form.option}
                onChange={handleChange}
                visual
              />
              <div className="panel-subsection">
                <h4>Additional settings</h4>
                <div className="profile-field-grid">
                  {APPEARANCE_FIELDS.map((field) => (
                    <Field
                      field={field}
                      value={form[field.name]}
                      onChange={handleChange}
                      key={field.name}
                    />
                  ))}
                  <label className="profile-field" htmlFor="flag">
                    <span>Initial profile status</span>
                    <select
                      id="flag"
                      name="flag"
                      value={String(form.flag)}
                      onChange={handleChange}
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  </label>
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
            <b>
              scantabs.com/{form.companyName || "profile-url"}
            </b>
          </div>
          <div className="preview-status">
            <span className={form.flag ? "is-enabled" : "is-disabled"} />
            {form.flag
              ? "Visible after creation"
              : "Hidden after creation"}
          </div>
        </aside>
      </div>

      <footer className="interactive-form-actions">
        <div>
          <b>Ready to publish?</b>
          <span>
            Required fields are marked with an asterisk. Empty optional links
            stay hidden on the public profile.
          </span>
        </div>
        <button type="submit" disabled={submitting || Boolean(uploadingField)}>
          {submitting ? (
            <LoaderCircle className="spin" size={18} />
          ) : (
            <Check size={18} />
          )}
          {submitting ? "Creating profile..." : "Create profile"}
        </button>
      </footer>
    </form>
  );
}

