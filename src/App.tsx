import { useState } from "react";
import { initialEmails, USER, type Email } from "./data";

type Folder = "inbox" | "sent" | "spam" | "trash";

const FOLDERS: { key: Folder; label: string; icon: string }[] = [
  { key: "inbox", label: "Inbox", icon: "📥" },
  { key: "sent", label: "Sent", icon: "📤" },
  { key: "spam", label: "Spam", icon: "⚠️" },
  { key: "trash", label: "Trash", icon: "🗑️" },
];

export default function App() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [folder, setFolder] = useState<Folder>("inbox");
  const [openId, setOpenId] = useState<number | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const folderEmails = emails
    .filter((e) => e.folder === folder)
    .sort((a, b) => b.id - a.id);
  const openEmail = emails.find((e) => e.id === openId) || null;
  const unread = (f: Folder) =>
    emails.filter((e) => e.folder === f && !e.read).length;

  const openMessage = (id: number) => {
    setOpenId(id);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e))
    );
  };

  const toggleStar = (id: number) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e))
    );
  };

  const deleteEmail = (id: number) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, folder: "trash" } : e))
    );
    setOpenId(null);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#c3d9f0] font-[Tahoma,Geneva,sans-serif] text-[13px] text-[#333]">
      {/* Top glossy header bar */}
      <header className="bg-gradient-to-b from-[#5b9bd5] via-[#3d7cc0] to-[#2c5f96] shadow-md border-b-2 border-[#1e4d7d]">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1">
            <span className="text-[26px] font-bold italic text-white drop-shadow-[1px_1px_0_#1e4d7d]">
              Net
            </span>
            <span className="text-[26px] font-bold italic text-[#ffe45c] drop-shadow-[1px_1px_0_#7d6a00]">
              Mail
            </span>
            <span className="ml-1 rounded bg-[#ffe45c] px-1 text-[10px] font-bold text-[#7d6a00] shadow">
              v2.0
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white">
            <span className="hidden sm:inline drop-shadow">
              Signed in as <b>{USER.email}</b>
            </span>
            <button
              onClick={() => setLoggedIn(false)}
              className="rounded border border-[#1e4d7d] bg-gradient-to-b from-[#6fa8dc] to-[#3d7cc0] px-2 py-[2px] font-bold shadow hover:from-[#7fb8ec] active:translate-y-px"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* thin search bar */}
      <div className="bg-[#e8f0fa] border-b border-[#a9c6e8]">
        <div className="mx-auto flex max-w-[1100px] items-center gap-2 px-3 py-1.5">
          <input
            placeholder="Search Mail"
            className="w-56 rounded-sm border border-[#8fb0d8] bg-white px-2 py-[3px] text-[11px] shadow-inner focus:outline-none"
          />
          <button className="rounded-sm border border-[#8fb0d8] bg-gradient-to-b from-white to-[#dce8f5] px-3 py-[3px] text-[11px] font-bold shadow active:translate-y-px">
            Search
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1100px] gap-3 px-3 py-3">
        {/* Sidebar */}
        <aside className="w-40 shrink-0">
          <button
            onClick={() => setComposeOpen(true)}
            className="mb-3 w-full rounded border-2 border-[#c99a00] bg-gradient-to-b from-[#ffe988] via-[#ffd93b] to-[#f5b800] py-2 text-[13px] font-bold text-[#5a4600] shadow-md hover:from-[#fff0a0] active:translate-y-px"
          >
            ✎ Compose
          </button>
          <div className="overflow-hidden rounded border border-[#a9c6e8] bg-white shadow-sm">
            {FOLDERS.map((f) => {
              const count = unread(f.key);
              const active = folder === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => {
                    setFolder(f.key);
                    setOpenId(null);
                  }}
                  className={`flex w-full items-center justify-between border-b border-[#dce8f5] px-2 py-[6px] text-left last:border-b-0 ${
                    active
                      ? "bg-gradient-to-b from-[#fff0b3] to-[#ffe066] font-bold text-[#5a4600]"
                      : "hover:bg-[#eaf2fb]"
                  }`}
                >
                  <span>
                    <span className="mr-1">{f.icon}</span>
                    {f.label}
                  </span>
                  {count > 0 && (
                    <span className="rounded bg-[#3d7cc0] px-1 text-[10px] font-bold text-white">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* fake ad box */}
          <div className="mt-3 rounded border border-[#a9c6e8] bg-white p-2 text-center shadow-sm">
            <div className="mb-1 text-[9px] uppercase tracking-wide text-[#999]">
              Advertisement
            </div>
            <div className="rounded bg-gradient-to-br from-[#ff5a5a] to-[#c40000] p-2 text-white">
              <div className="text-[13px] font-black">FREE ROBUX!!</div>
              <div className="text-[10px]">Click here 2 claim →</div>
              <div className="mt-1 animate-pulse text-[10px] font-bold text-[#ffe45c]">
                ⚡ LIMITED TIME ⚡
              </div>
            </div>
          </div>

          {/* status widget */}
          <div className="mt-3 rounded border border-[#a9c6e8] bg-[#f5faff] p-2 text-[10px] text-[#666] shadow-sm">
            <div className="font-bold text-[#3d7cc0]">Storage</div>
            <div className="my-1 h-2 w-full overflow-hidden rounded-full bg-[#dce8f5]">
              <div className="h-full w-[13%] bg-gradient-to-r from-[#6fa8dc] to-[#3d7cc0]" />
            </div>
            <div>0.98 GB of 7.50 GB used</div>
          </div>
        </aside>

        {/* Main panel */}
        <main className="min-w-0 flex-1 rounded border border-[#a9c6e8] bg-white shadow-sm">
          {openEmail ? (
            <MessageView
              email={openEmail}
              onBack={() => setOpenId(null)}
              onStar={() => toggleStar(openEmail.id)}
              onDelete={() => deleteEmail(openEmail.id)}
            />
          ) : (
            <MailList
              emails={folderEmails}
              folderLabel={FOLDERS.find((f) => f.key === folder)!.label}
              onOpen={openMessage}
              onStar={toggleStar}
            />
          )}
        </main>
      </div>

      <footer className="pb-6 text-center text-[10px] text-[#5a7aa0]">
        ©2010 NetMail Inc. All rights reserved. &nbsp;|&nbsp; Terms &nbsp;|&nbsp;
        Privacy &nbsp;|&nbsp; Best viewed in Internet Explorer 8
      </footer>

      {composeOpen && <Compose onClose={() => setComposeOpen(false)} />}
    </div>
  );
}

function MailList({
  emails,
  folderLabel,
  onOpen,
  onStar,
}: {
  emails: Email[];
  folderLabel: string;
  onOpen: (id: number) => void;
  onStar: (id: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#a9c6e8] bg-gradient-to-b from-[#f0f6fd] to-[#dce8f5] px-3 py-1.5">
        <span className="font-bold text-[#2c5f96]">{folderLabel}</span>
        <span className="text-[11px] text-[#666]">{emails.length} messages</span>
      </div>
      {emails.length === 0 ? (
        <div className="p-10 text-center text-[#999]">
          This folder is empty.
        </div>
      ) : (
        <ul>
          {emails.map((e) => (
            <li
              key={e.id}
              onClick={() => onOpen(e.id)}
              className={`flex cursor-pointer items-center gap-2 border-b border-[#eef4fb] px-2 py-2 hover:bg-[#fffbe6] ${
                e.read ? "bg-white" : "bg-[#eaf2fb]"
              }`}
            >
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  onStar(e.id);
                }}
                className="text-[15px] leading-none"
                title="Star"
              >
                {e.starred ? "⭐" : "☆"}
              </button>
              <span
                className={`w-40 shrink-0 truncate ${
                  e.read ? "font-normal" : "font-bold"
                }`}
              >
                {e.from}
              </span>
              <span
                className={`min-w-0 flex-1 truncate ${
                  e.read ? "text-[#555]" : "font-bold text-[#222]"
                }`}
              >
                {e.subject}
                {e.attachment && <span className="ml-1">📎</span>}
                <span className="ml-1 font-normal text-[#999]">
                  — {e.body.replace(/\n/g, " ").slice(0, 50)}...
                </span>
              </span>
              <span className="shrink-0 text-[11px] text-[#888]">
                {e.date.replace(", 2010", "")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MessageView({
  email,
  onBack,
  onStar,
  onDelete,
}: {
  email: Email;
  onBack: () => void;
  onStar: () => void;
  onDelete: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-[#a9c6e8] bg-gradient-to-b from-[#f0f6fd] to-[#dce8f5] px-3 py-1.5">
        <button
          onClick={onBack}
          className="rounded-sm border border-[#8fb0d8] bg-gradient-to-b from-white to-[#dce8f5] px-2 py-[2px] text-[11px] font-bold shadow active:translate-y-px"
        >
          ← Back
        </button>
        <button
          onClick={onStar}
          className="rounded-sm border border-[#8fb0d8] bg-gradient-to-b from-white to-[#dce8f5] px-2 py-[2px] text-[11px] font-bold shadow active:translate-y-px"
        >
          {email.starred ? "⭐ Starred" : "☆ Star"}
        </button>
        <button
          onClick={onDelete}
          className="rounded-sm border border-[#8fb0d8] bg-gradient-to-b from-white to-[#dce8f5] px-2 py-[2px] text-[11px] font-bold shadow active:translate-y-px"
        >
          🗑 Delete
        </button>
      </div>

      <div className="p-4">
        <h1 className="mb-3 text-[18px] font-bold text-[#2c5f96]">
          {email.subject}
        </h1>
        <div className="mb-3 flex items-start gap-2 border-b border-[#eef4fb] pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#6fa8dc] to-[#3d7cc0] text-[16px] font-bold text-white shadow">
            {email.from.charAt(0).toUpperCase()}
          </div>
          <div className="text-[12px]">
            <div>
              <b>{email.from}</b>{" "}
              <span className="text-[#888]">&lt;{email.fromAddr}&gt;</span>
            </div>
            <div className="text-[#888]">to {email.to}</div>
            <div className="text-[#aaa]">{email.date}</div>
          </div>
        </div>
        <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#222]">
          {email.body}
        </div>
        {email.attachment && (
          <div className="mt-4 inline-flex items-center gap-2 rounded border border-[#a9c6e8] bg-[#f5faff] px-3 py-2 shadow-sm">
            <span className="text-[20px]">📎</span>
            <div>
              <div className="font-bold text-[#2c5f96]">{email.attachment}</div>
              <div className="text-[11px] text-[#c40000]">
                ⚠ File could not be scanned. Download anyway?
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Compose({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[520px] overflow-hidden rounded border-2 border-[#1e4d7d] bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-gradient-to-b from-[#5b9bd5] to-[#2c5f96] px-3 py-1.5 text-white">
          <span className="font-bold drop-shadow">New Message</span>
          <button onClick={onClose} className="font-bold hover:text-[#ffe45c]">
            ✕
          </button>
        </div>
        {sent ? (
          <div className="p-8 text-center">
            <div className="mb-2 text-[15px] font-bold text-[#2c5f96]">
              Message sent!
            </div>
            <p className="text-[12px] text-[#666]">
              Delivery status: <b className="text-[#c40000]">RETURNED</b> — the
              recipient address <b>00@th3.archive</b> does not exist... yet.
            </p>
            <button
              onClick={onClose}
              className="mt-4 rounded-sm border border-[#8fb0d8] bg-gradient-to-b from-white to-[#dce8f5] px-4 py-1 text-[12px] font-bold shadow"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-3">
            <input
              placeholder="To:"
              className="mb-2 w-full rounded-sm border border-[#8fb0d8] bg-white px-2 py-1 text-[12px] shadow-inner focus:outline-none"
            />
            <input
              placeholder="Subject:"
              className="mb-2 w-full rounded-sm border border-[#8fb0d8] bg-white px-2 py-1 text-[12px] shadow-inner focus:outline-none"
            />
            <textarea
              rows={7}
              placeholder="Write your message..."
              className="w-full resize-none rounded-sm border border-[#8fb0d8] bg-white px-2 py-1 text-[12px] shadow-inner focus:outline-none"
            />
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setSent(true)}
                className="rounded border border-[#c99a00] bg-gradient-to-b from-[#ffe988] to-[#f5b800] px-4 py-1 text-[12px] font-bold text-[#5a4600] shadow active:translate-y-px"
              >
                Send
              </button>
              <button className="text-[11px] text-[#3d7cc0] underline">
                Attach a file
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#c3d9f0] to-[#8fb8e0] font-[Tahoma,Geneva,sans-serif] p-4">
      <div className="mb-4 flex items-center">
        <span className="text-[42px] font-bold italic text-[#2c5f96] drop-shadow-[2px_2px_0_#fff]">
          Net
        </span>
        <span className="text-[42px] font-bold italic text-[#f5b800] drop-shadow-[2px_2px_0_#fff]">
          Mail
        </span>
      </div>
      <div className="w-full max-w-[320px] overflow-hidden rounded-lg border-2 border-[#1e4d7d] bg-white shadow-2xl">
        <div className="bg-gradient-to-b from-[#5b9bd5] to-[#2c5f96] px-4 py-2 text-white">
          <span className="font-bold drop-shadow">Sign In</span>
        </div>
        <div className="p-5">
          <label className="mb-1 block text-[11px] font-bold text-[#555]">
            Email
          </label>
          <input
            defaultValue={USER.email}
            className="mb-3 w-full rounded-sm border border-[#8fb0d8] bg-white px-2 py-1.5 text-[13px] shadow-inner focus:outline-none"
          />
          <label className="mb-1 block text-[11px] font-bold text-[#555]">
            Password
          </label>
          <input
            type="password"
            defaultValue="••••••••"
            className="mb-4 w-full rounded-sm border border-[#8fb0d8] bg-white px-2 py-1.5 text-[13px] shadow-inner focus:outline-none"
          />
          <button
            onClick={onLogin}
            className="w-full rounded border-2 border-[#1e4d7d] bg-gradient-to-b from-[#6fa8dc] via-[#3d7cc0] to-[#2c5f96] py-2 text-[14px] font-bold text-white shadow-md hover:from-[#7fb8ec] active:translate-y-px"
          >
            Sign In
          </button>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-1 text-[#666]">
              <input type="checkbox" defaultChecked /> Keep me signed in
            </label>
            <a className="text-[#3d7cc0] underline" href="#">
              Forgot?
            </a>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[10px] text-[#3d5a7d]">
        ©2010 NetMail Inc. &nbsp;|&nbsp; New here?{" "}
        <span className="underline">Create an account</span>
      </p>
    </div>
  );
}
