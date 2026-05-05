"use client";

import { useMemo, useState } from "react";
import {
  LucideBell,
  LucideShieldAlert,
  LucideSend,
  LucideArrowDownLeft,
  LucideFilter,
  LucideCheck,
  LucideTrash2,
} from "lucide-react";

type NotificationType = "security" | "payout" | "credit" | "system";
type NotificationStatus = "unread" | "read";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  time: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "NTF-1001",
    title: "New payout processed",
    message: "Bulk payout batch #BATCH76231 was successfully processed.",
    type: "payout",
    status: "unread",
    time: "2 min ago",
  },
  {
    id: "NTF-1002",
    title: "Security sign-in detected",
    message: "A new admin login was detected from Lagos, NG.",
    type: "security",
    status: "unread",
    time: "12 min ago",
  },
  {
    id: "NTF-1003",
    title: "Wallet credited",
    message: "Main Business Wallet received a credit of N150,000.",
    type: "credit",
    status: "read",
    time: "1 hr ago",
  },
  {
    id: "NTF-1004",
    title: "Scheduled maintenance",
    message: "Webhook service maintenance starts by 11:00 PM WAT.",
    type: "system",
    status: "read",
    time: "4 hr ago",
  },
];

function typeMeta(type: NotificationType) {
  if (type === "security") {
    return {
      icon: <LucideShieldAlert size={14} strokeWidth={2.2} />,
      chip: "badge badge--warning",
      label: "Security",
      iconWrap: "ntf-icon ntf-icon--warning",
    };
  }
  if (type === "payout") {
    return {
      icon: <LucideSend size={14} strokeWidth={2.2} />,
      chip: "badge badge--info",
      label: "Payout",
      iconWrap: "ntf-icon ntf-icon--info",
    };
  }
  if (type === "credit") {
    return {
      icon: <LucideArrowDownLeft size={14} strokeWidth={2.2} />,
      chip: "badge badge--success",
      label: "Credit",
      iconWrap: "ntf-icon ntf-icon--success",
    };
  }
  return {
    icon: <LucideBell size={14} strokeWidth={2.2} />,
    chip: "badge badge--neutral",
    label: "System",
    iconWrap: "ntf-icon ntf-icon--neutral",
  };
}

export default function NotificationsClient() {
  const [items, setItems] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [tab, setTab] = useState<"all" | "unread">("all");

  const unreadCount = useMemo(() => items.filter((n) => n.status === "unread").length, [items]);

  const visible = useMemo(() => {
    if (tab === "unread") return items.filter((n) => n.status === "unread");
    return items;
  }, [items, tab]);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, status: "read" })));
  };

  const clearRead = () => {
    setItems((prev) => prev.filter((n) => n.status !== "read"));
  };

  return (
    <div className="page-root">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-sub">Stay up to date with system alerts and account activity.</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-ghost btn-sm u-gap-6" onClick={clearRead}>
            <LucideTrash2 size={14} /> Clear Read
          </button>
          <button type="button" className="btn btn-primary btn-sm u-gap-6" onClick={markAllRead}>
            <LucideCheck size={14} /> Mark All Read
          </button>
        </div>
      </div>

      <div className="sum-grid">
        <div className="sum-card">
          <span className="sum-label">Total Notifications</span>
          <span className="sum-value u-text-primary">{items.length}</span>
          <span className="sum-sub">Across all channels</span>
        </div>
        <div className="sum-card">
          <span className="sum-label">Unread</span>
          <span className="sum-value u-text-warning">{unreadCount}</span>
          <span className="sum-sub">Needs your attention</span>
        </div>
        <div className="sum-card">
          <span className="sum-label">Read</span>
          <span className="sum-value u-text-success">{items.length - unreadCount}</span>
          <span className="sum-sub">Reviewed updates</span>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header ntf-panel-head">
          <span className="panel-title">Notification Center</span>
          <div className="filter-tabs">
            <button
              type="button"
              className={`filter-tab ${tab === "all" ? "filter-tab--active" : ""}`}
              onClick={() => setTab("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`filter-tab ${tab === "unread" ? "filter-tab--active" : ""}`}
              onClick={() => setTab("unread")}
            >
              Unread
            </button>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">
              <LucideBell size={20} strokeWidth={1.7} color="rgba(226,225,239,.3)" />
            </span>
            <p>No notifications in this view.</p>
          </div>
        ) : (
          <div className="ntf-list">
            {visible.map((item) => {
              const meta = typeMeta(item.type);
              return (
                <div key={item.id} className={`ntf-row ${item.status === "unread" ? "ntf-row--unread" : ""}`}>
                  <span className={meta.iconWrap}>{meta.icon}</span>
                  <div className="ntf-main">
                    <div className="ntf-title-row">
                      <p className="ntf-title">{item.title}</p>
                      <span className={meta.chip}>{meta.label}</span>
                    </div>
                    <p className="ntf-message">{item.message}</p>
                    <div className="ntf-meta-row">
                      <span className="mono ntf-id">{item.id}</span>
                      <span className="ntf-dot">•</span>
                      <span className="ntf-time">{item.time}</span>
                    </div>
                  </div>
                  {item.status === "unread" && <span className="ntf-unread-dot" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
