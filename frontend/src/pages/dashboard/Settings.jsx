import { useEffect, useState } from "react";
import "../../css/Settings.css";

const DEFAULT_SETTINGS = {
  notifications: true,
  emailNotifications: false,
  budgetAlerts: true,
  billReminders: true,
  darkMode: false,
  currency: "INR",
  weekStarts: "Monday",
};

const sections = [
  {
    id: "general",
    icon: "settings",
    title: "General",
    description: "Preferences",
  },
  {
    id: "notifications",
    icon: "bell",
    title: "Notifications",
    description: "Alerts & reminders",
  },
  {
    id: "appearance",
    icon: "palette",
    title: "Appearance",
    description: "Display preferences",
  },
  {
    id: "privacy",
    icon: "lock",
    title: "Privacy",
    description: "Your data",
  },
];

function Icon({ name, size = 20 }) {
  const icons = {
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    palette: (
      <path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 0-3.6H12a1.5 1.5 0 0 1 0-3h2.5a6.5 6.5 0 0 0 0-13H12Z" />
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    rupee: (
      <>
        <path d="M7 5h10" />
        <path d="M7 9h8" />
        <path d="m8 9 7 8" />
        <path d="M8 9c5 0 7-1 7-4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    receipt: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    moon: (
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    shield: (
      <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function Settings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("homeflowSettings");

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);

        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsed,
        });
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, []);

  // GLOBAL THEME
  useEffect(() => {
    const root = document.documentElement;

    if (settings.darkMode) {
      root.classList.add("homeflow-dark");
    } else {
      root.classList.remove("homeflow-dark");
    }

    return () => {
      root.classList.remove("homeflow-dark");
    };
  }, [settings.darkMode]);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "homeflowSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      "homeflowSettings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="settings-page">

      {/* HEADER */}

      <header className="settings-header">
        <div>
          <span className="settings-label">
            PREFERENCES
          </span>

          <h1>Settings</h1>

          <p>
            Make HomeFlow feel right for you.
          </p>
        </div>

        <div className="settings-header-icon">
          <Icon name="settings" size={25} />
        </div>
      </header>

      {/* MAIN */}

      <div className="settings-layout">

        {/* SIDEBAR */}

        <aside className="settings-navigation">

          <div className="settings-nav-title">
            SETTINGS
          </div>

          {sections.map((section) => (
            <button
              key={section.id}
              className={`settings-nav ${
                activeSection === section.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleSectionChange(section.id)
              }
            >
              <span className="nav-icon">
                <Icon name={section.icon} size={18} />
              </span>

              <span className="nav-text">
                <strong>{section.title}</strong>
                <small>{section.description}</small>
              </span>

              <span className="nav-arrow">
                →
              </span>
            </button>
          ))}

          <div className="settings-sidebar-footer">
            <div className="status-dot"></div>

            <div>
              <strong>HomeFlow</strong>
              <span>Personal finance</span>
            </div>
          </div>
        </aside>

        {/* CONTENT */}

        <main className="settings-content">

          {/* GENERAL */}

          {activeSection === "general" && (
            <section className="settings-section animate-section">

              <SectionIntro
                label="GENERAL"
                title="General Preferences"
                description="Choose how HomeFlow displays your financial information."
                icon="settings"
              />

              <div className="settings-card">

                <div className="setting-row">
                  <SettingInfo
                    icon="rupee"
                    iconClass="green"
                    title="Currency"
                    description="Choose the currency used throughout HomeFlow."
                  />

                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      updateSetting(
                        "currency",
                        e.target.value
                      )
                    }
                    className="settings-select"
                  >
                    <option value="INR">
                      ₹ Indian Rupee (INR)
                    </option>
                    <option value="USD">
                      $ US Dollar (USD)
                    </option>
                    <option value="EUR">
                      € Euro (EUR)
                    </option>
                    <option value="GBP">
                      £ British Pound (GBP)
                    </option>
                  </select>
                </div>

                <div className="setting-row last">
                  <SettingInfo
                    icon="calendar"
                    iconClass="blue"
                    title="Start of the week"
                    description="Choose the first day for weekly reports."
                  />

                  <select
                    value={settings.weekStarts}
                    onChange={(e) =>
                      updateSetting(
                        "weekStarts",
                        e.target.value
                      )
                    }
                    className="settings-select"
                  >
                    <option value="Monday">Monday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Saturday">
                      Saturday
                    </option>
                  </select>
                </div>

              </div>

              <div className="info-banner">
                <div className="banner-icon">
                  💡
                </div>

                <div>
                  <strong>
                    Preferences are saved locally
                  </strong>

                  <p>
                    HomeFlow remembers your settings
                    on this device.
                  </p>
                </div>
              </div>

            </section>
          )}

          {/* NOTIFICATIONS */}

          {activeSection === "notifications" && (
            <section className="settings-section animate-section">

              <SectionIntro
                label="NOTIFICATIONS"
                title="Notifications & Alerts"
                description="Control which reminders and financial alerts you receive."
                icon="bell"
              />

              <div className="settings-card">

                <SettingToggle
                  icon="bell"
                  iconClass="green"
                  title="Notifications"
                  description="Receive important HomeFlow notifications."
                  checked={settings.notifications}
                  onChange={(value) =>
                    updateSetting(
                      "notifications",
                      value
                    )
                  }
                />

                <SettingToggle
                  icon="rupee"
                  iconClass="orange"
                  title="Budget alerts"
                  description="Get notified when you are close to your budget limit."
                  checked={settings.budgetAlerts}
                  onChange={(value) =>
                    updateSetting(
                      "budgetAlerts",
                      value
                    )
                  }
                />

                <SettingToggle
                  icon="receipt"
                  iconClass="purple"
                  title="Bill reminders"
                  description="Receive reminders before your bills are due."
                  checked={settings.billReminders}
                  onChange={(value) =>
                    updateSetting(
                      "billReminders",
                      value
                    )
                  }
                />

                <SettingToggle
                  icon="mail"
                  iconClass="blue"
                  title="Email notifications"
                  description="Receive financial summaries and reminders by email."
                  checked={settings.emailNotifications}
                  onChange={(value) =>
                    updateSetting(
                      "emailNotifications",
                      value
                    )
                  }
                  last
                />

              </div>

              <div className="notification-status">

                <div className="notification-status-icon">
                  <Icon name="check" size={17} />
                </div>

                <div>
                  <strong>
                    Notification preferences
                  </strong>

                  <p>
                    {[
                      settings.notifications &&
                        "Notifications",
                      settings.budgetAlerts &&
                        "Budget alerts",
                      settings.billReminders &&
                        "Bill reminders",
                      settings.emailNotifications &&
                        "Email",
                    ]
                      .filter(Boolean)
                      .join(" • ") ||
                      "All notifications are disabled"}
                  </p>
                </div>

              </div>

            </section>
          )}

          {/* APPEARANCE */}

          {activeSection === "appearance" && (
            <section className="settings-section animate-section">

              <SectionIntro
                label="APPEARANCE"
                title="Display Preferences"
                description="Choose how HomeFlow looks across your entire website."
                icon="palette"
              />

              <div className="settings-card">

                <div className="theme-choice-grid">

                  <button
                    type="button"
                    className={`theme-card ${
                      !settings.darkMode
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateSetting(
                        "darkMode",
                        false
                      )
                    }
                  >
                    <div className="theme-preview light-theme">
                      <div className="theme-sidebar"></div>

                      <div className="theme-main">
                        <div className="theme-heading"></div>

                        <div className="theme-boxes">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>

                        <div className="theme-line"></div>
                        <div className="theme-line short"></div>
                      </div>
                    </div>

                    <div className="theme-card-bottom">
                      <div>
                        <strong>Light</strong>
                        <p>Clean & bright</p>
                      </div>

                      <div className="theme-radio">
                        {!settings.darkMode && (
                          <Icon name="check" size={15} />
                        )}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`theme-card ${
                      settings.darkMode
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      updateSetting(
                        "darkMode",
                        true
                      )
                    }
                  >
                    <div className="theme-preview dark-theme">
                      <div className="theme-sidebar"></div>

                      <div className="theme-main">
                        <div className="theme-heading"></div>

                        <div className="theme-boxes">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>

                        <div className="theme-line"></div>
                        <div className="theme-line short"></div>
                      </div>
                    </div>

                    <div className="theme-card-bottom">
                      <div>
                        <strong>Dark</strong>
                        <p>Easy on the eyes</p>
                      </div>

                      <div className="theme-radio">
                        {settings.darkMode && (
                          <Icon name="check" size={15} />
                        )}
                      </div>
                    </div>
                  </button>

                </div>

                <div className="appearance-divider"></div>

                <SettingToggle
                  icon="moon"
                  iconClass="purple"
                  title="Dark mode"
                  description="Switch between light and dark HomeFlow themes."
                  checked={settings.darkMode}
                  onChange={(value) =>
                    updateSetting(
                      "darkMode",
                      value
                    )
                  }
                  last
                />

              </div>

              <div className="theme-note">
                <Icon
                  name={
                    settings.darkMode
                      ? "moon"
                      : "sun"
                  }
                  size={18}
                />

                <span>
                  {settings.darkMode
                    ? "Dark mode is active across HomeFlow."
                    : "Light mode is active across HomeFlow."}
                </span>
              </div>

            </section>
          )}

          {/* PRIVACY */}

          {activeSection === "privacy" && (
            <section className="settings-section animate-section">

              <SectionIntro
                label="PRIVACY"
                title="Your Data"
                description="Manage your HomeFlow preferences and local data."
                icon="lock"
              />

              <div className="settings-card">

                <div className="privacy-hero">

                  <div className="privacy-big-icon">
                    <Icon
                      name="shield"
                      size={28}
                    />
                  </div>

                  <div>
                    <span className="privacy-badge">
                      PRIVATE
                    </span>

                    <h3>
                      Your data stays yours
                    </h3>

                    <p>
                      Your HomeFlow preferences are
                      stored locally on this device.
                      They are not shared with other
                      users.
                    </p>
                  </div>

                </div>

                <div className="privacy-items">

                  <PrivacyItem
                    title="Local preferences"
                    description="Your settings are saved in your browser."
                  />

                  <PrivacyItem
                    title="No tracking"
                    description="Settings are only used by HomeFlow."
                  />

                  <PrivacyItem
                    title="Full control"
                    description="You can reset your preferences anytime."
                  />

                </div>

                <div className="danger-zone">

                  <div>
                    <strong>
                      Reset preferences
                    </strong>

                    <p>
                      Restore HomeFlow settings to
                      their default values.
                    </p>
                  </div>

                  <button
                    className="reset-button"
                    onClick={handleReset}
                  >
                    Reset Settings
                  </button>

                </div>

              </div>

            </section>
          )}

          {/* SAVE */}

          <div className="settings-actions">

            {saved && (
              <div className="saved-message">
                <Icon name="check" size={16} />
                Settings saved successfully
              </div>
            )}

            <button
              className="save-settings-button"
              onClick={handleSave}
            >
              Save Changes
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}


/* =========================
   SECTION INTRO
========================= */

function SectionIntro({
  label,
  title,
  description,
  icon,
}) {
  return (
    <div className="section-intro">

      <div>
        <span className="card-label">
          {label}
        </span>

        <h2>{title}</h2>

        <p>{description}</p>
      </div>

      <div className="section-icon">
        <Icon name={icon} size={23} />
      </div>

    </div>
  );
}


/* =========================
   SETTING INFO
========================= */

function SettingInfo({
  icon,
  iconClass,
  title,
  description,
}) {
  return (
    <div className="setting-info">

      <div className={`setting-icon ${iconClass}`}>
        <Icon name={icon} size={19} />
      </div>

      <div>
        <h3>{title}</h3>

        <p>{description}</p>
      </div>

    </div>
  );
}


/* =========================
   TOGGLE
========================= */

function SettingToggle({
  icon,
  iconClass,
  title,
  description,
  checked,
  onChange,
  last = false,
}) {
  return (
    <div
      className={`setting-row ${
        last ? "last" : ""
      }`}
    >

      <SettingInfo
        icon={icon}
        iconClass={iconClass}
        title={title}
        description={description}
      />

      <label className="toggle">

        <input
          type="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked)
          }
        />

        <span className="toggle-slider"></span>

      </label>

    </div>
  );
}


/* =========================
   PRIVACY ITEM
========================= */

function PrivacyItem({
  title,
  description,
}) {
  return (
    <div className="privacy-item">

      <span>
        <Icon name="check" size={15} />
      </span>

      <div>
        <strong>{title}</strong>

        <p>{description}</p>
      </div>

    </div>
  );
}


export default Settings;