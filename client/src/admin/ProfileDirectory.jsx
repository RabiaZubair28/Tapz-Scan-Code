/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  UsersRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { listProfiles, setProfileEnabled } from "./api";
import { getProfileOption } from "./profileConfig";

const LoadingRows = ({ plain }) => (
  <div className={plain ? "plain-loading" : "directory-loading"}>
    <span />
    <span />
    <span />
    <p>Loading profiles...</p>
  </div>
);

export default function ProfileDirectory({
  variant = "modern",
  refreshSignal = 0,
}) {
  const plain = variant === "plain";
  const [profiles, setProfiles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 1,
    limit: plain ? 15 : 8,
  });
  const [stats, setStats] = useState({ total: 0, enabled: 0, disabled: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [changingId, setChangingId] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const data = await listProfiles({
          page,
          limit: plain ? 15 : 8,
          search,
          status,
        });
        if (!cancelled) {
          setProfiles(data.items || []);
          setPagination(data.pagination);
          setStats(data.stats);
        }
      } catch (error) {
        if (!cancelled) toast.error(error.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, search ? 250 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [page, plain, refreshSignal, reloadKey, search, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const updateStatus = async (profile, enabled) => {
    setChangingId(profile._id);
    setProfiles((current) =>
      current.map((item) =>
        item._id === profile._id ? { ...item, flag: enabled } : item
      )
    );
    try {
      await setProfileEnabled(profile._id, enabled);
      toast.success(
        `${profile.name || profile.companyName} ${
          enabled ? "enabled" : "disabled"
        }`
      );
      setReloadKey((value) => value + 1);
    } catch (error) {
      setProfiles((current) =>
        current.map((item) =>
          item._id === profile._id ? { ...item, flag: !enabled } : item
        )
      );
      toast.error(error.message);
    } finally {
      setChangingId("");
    }
  };

  const from = pagination.total
    ? (pagination.page - 1) * pagination.limit + 1
    : 0;
  const to = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  if (plain) {
    return (
      <section className="plain-directory">
        <div className="plain-filter-row">
          <label>
            Search:
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label>
            Status:
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All</option>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </label>
          <span>
            Total: {stats.total} | Enabled: {stats.enabled} | Disabled:{" "}
            {stats.disabled}
          </span>
        </div>

        {loading ? (
          <LoadingRows plain />
        ) : (
          <div className="plain-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Profile name</th>
                  <th>URL name</th>
                  <th>Template</th>
                  <th>Visits</th>
                  <th>Public link</th>
                  <th>Enabled</th>
                </tr>
              </thead>
              <tbody>
                {profiles.length ? (
                  profiles.map((profile, index) => {
                    const option = getProfileOption(profile.option);
                    const enabled = profile.flag !== false;
                    return (
                      <tr key={profile._id}>
                        <td>{from + index}</td>
                        <td>{profile.name || profile.clientName || "—"}</td>
                        <td>{profile.companyName || "—"}</td>
                        <td>
                          {option.value} ({option.label})
                        </td>
                        <td>{profile.visitCount || 0}</td>
                        <td>
                          {enabled ? (
                            <a
                              href={`/${encodeURIComponent(
                                profile.companyName
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open
                            </a>
                          ) : (
                            "Hidden"
                          )}
                        </td>
                        <td>
                          <select
                            value={enabled ? "yes" : "no"}
                            disabled={changingId === profile._id}
                            onChange={(event) =>
                              updateStatus(
                                profile,
                                event.target.value === "yes"
                              )
                            }
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7">No matching profiles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="plain-pagination">
          <span>
            Showing {from}–{to} of {pagination.total}
          </span>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((value) => value - 1)}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="modern-directory">
      <div className="stats-grid">
        <article>
          <span className="stat-icon stat-icon--total">
            <UsersRound size={20} />
          </span>
          <div>
            <small>Total profiles</small>
            <b>{stats.total}</b>
          </div>
        </article>
        <article>
          <span className="stat-icon stat-icon--enabled" />
          <div>
            <small>Enabled</small>
            <b>{stats.enabled}</b>
          </div>
        </article>
        <article>
          <span className="stat-icon stat-icon--disabled" />
          <div>
            <small>Disabled</small>
            <b>{stats.disabled}</b>
          </div>
        </article>
      </div>

      <div className="directory-toolbar">
        <div>
          <h2>Profiles</h2>
          <p>Control which public links are available.</p>
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
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter profiles by status"
          >
            <option value="all">All profiles</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingRows />
      ) : profiles.length ? (
        <div className="profile-card-grid">
          {profiles.map((profile) => {
            const option = getProfileOption(profile.option);
            const enabled = profile.flag !== false;
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
                  <label className="status-switch">
                    <input
                      type="checkbox"
                      checked={enabled}
                      disabled={changingId === profile._id}
                      onChange={(event) =>
                        updateStatus(profile, event.target.checked)
                      }
                    />
                    <span />
                    <em>{enabled ? "Enabled" : "Disabled"}</em>
                  </label>
                </div>
                <h3>{profile.name || profile.clientName || "Untitled profile"}</h3>
                <p>/{profile.companyName}</p>
                <div className="profile-card-meta">
                  <span>
                    <i
                      style={{
                        background: `linear-gradient(135deg, ${option.colors[0]} 0 50%, ${option.colors[1]} 50% 100%)`,
                      }}
                    />
                    Option {option.value} · {option.label}
                  </span>
                  <span>{profile.visitCount || 0} visits</span>
                </div>
                <a
                  className={enabled ? "" : "is-disabled"}
                  href={
                    enabled
                      ? `/${encodeURIComponent(profile.companyName)}`
                      : undefined
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!enabled}
                  onClick={(event) => {
                    if (!enabled) event.preventDefault();
                  }}
                >
                  {enabled ? "Open public profile" : "Public link hidden"}
                  {enabled ? <ExternalLink size={16} /> : null}
                </a>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-directory">
          <UsersRound size={28} />
          <h3>No profiles found</h3>
          <p>Try another search or status filter.</p>
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
            disabled={page <= 1}
            onClick={() => setPage((value) => value - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <b>
            {pagination.page} / {pagination.totalPages}
          </b>
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((value) => value + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

