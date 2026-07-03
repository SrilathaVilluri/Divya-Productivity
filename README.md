# My Dashboard — Personal Life Dashboard

A single-file web app that acts as your personal command center — tracking your day, health, money, goals, fitness, and learning in one place. It runs entirely in your browser, syncs across devices via Firebase, and can be installed on your phone like a native app.

## What you get

- **Overview tab** — score of the day, monthly intentions, what's left today, and calorie gauge at a glance
- **Today tab** — daily schedule, tasks, and habit tracker
- **Health tab** — Body metrics (weight, BMI, body fat), Food/Nutrition logging, and **Gym Tracker** (exercises, sets, progressive overload, rest timer, 1RM, templates)
- **Expenses tab** — record spending and track your budget with your local currency
- **Prep tab** — plan and track your upskilling, study goals, and career readiness
- **Goals tab** — body targets, nutrition targets, expense limits, score weights
- **Offline-ready PWA** — install on your phone home screen, works without internet; changes sync both ways when back online
- **Sharing** — share a read-only link; recipient connects to your Firebase automatically

## What you need

- A GitHub account (free — sign up at [github.com](https://github.com))
- A Google account (for Firebase sync — the free tier is more than enough for personal use)
- A phone or computer with a modern browser (Safari, Chrome, or Firefox)

## Setup in 4 steps

> **Important:** Do the setup in a regular browser tab, not a private/incognito tab. Private tabs block the clipboard API that the share-link feature relies on, and some browser storage behaviours differ. Use a normal tab for all steps below.

### Step 1 — Fork the repository

Forking means making your own personal copy of this project on GitHub, hosted under your own account.

1. Make sure you are signed in to GitHub.
2. On this repository's page, click the **Fork** button in the top-right corner.
3. On the next screen, leave everything as-is and click **Create fork**.
4. You now have your own copy at `https://github.com/YOUR_USERNAME/Dashboard`.

Now turn on GitHub Pages so the app is publicly accessible:

5. In your forked repository, click **Settings** (the gear icon in the top menu).
6. In the left sidebar, click **Pages**.
7. Under "Branch", click the dropdown that says "None" and select **main**.
8. Leave the folder set to **/ (root)**.
9. Click **Save**.

GitHub will now build your site. It takes about 1–2 minutes. Your app will be live at:

```
https://YOUR_USERNAME.github.io/Dashboard/
```

Check the Pages settings screen to confirm the exact URL.

---

### Step 2 — Set up Firebase (for sync across devices)

> This step is optional. If you only use one device and do not need your data to sync anywhere, skip this entirely and use the app in local-only mode. Your data will be saved in your browser.

Firebase is a free service from Google that stores your data in the cloud so it stays in sync across your phone, tablet, and computer.

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in with your Google account.
2. Click **Add project**. Give it any name (e.g. "my-dashboard"). Click **Continue**.
3. Toggle off **Enable Google Analytics** — it is not needed. Click **Create project**.
4. Wait about 10 seconds, then click **Continue**.
5. On the project overview page, click the **Web icon** (`</>`) to add a web app.
6. Give it any nickname (e.g. "dashboard"). Do **not** check "Firebase Hosting". Click **Register app**.
7. Firebase will show a block of code. Find the `firebaseConfig` object:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "yourproject.firebaseapp.com",
     databaseURL: "https://yourproject-default-rtdb.region.firebasedatabase.app",
     projectId: "yourproject",
     storageBucket: "yourproject.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123...:web:abc..."
   };
   ```

   Keep this page open — you will need these values in Step 3.

8. Click **Continue to console**.
9. In the left sidebar, click **Build** → **Realtime Database**.
10. Click **Create database**.
11. Choose the server location closest to you. Click **Next**.
12. Select **Start in test mode**. Click **Enable**.
13. **Enable Anonymous Authentication** (required for sync to work): In the left sidebar click **Authentication** → **Sign-in method** → **Anonymous** → toggle **Enable** → **Save**. This allows the app to authenticate automatically so writes are permitted.

> **Note on security:** Test mode allows open read/write access for 30 days. For personal use this is fine to start. After the 30 days expire, go to Realtime Database → Rules and renew access (see Troubleshooting below).

---

### Step 3 — Open your app and complete setup

Go to your GitHub Pages URL from Step 1. The first time you open the app, a setup wizard appears automatically.

**Step 1 of 3 — App Basics (required)**

- **App Name** — whatever you want to call it (e.g. "My Dashboard")
- **Currency Symbol** — your local currency symbol (default is ₹; change to `$`, `€`, `£`, etc.)
- **Hosting URL** — paste your GitHub Pages URL here. This is used when the app generates sharing links.

Click **Next →** to continue.

---

**Step 2 of 3 — Firebase Sync (optional)**

Paste each value from the `firebaseConfig` block you saw in Firebase:

| Field in the wizard | Key in firebaseConfig |
|---|---|
| API Key | `apiKey` |
| Auth Domain | `authDomain` |
| Database URL | `databaseURL` |
| Project ID | `projectId` |
| Storage Bucket | `storageBucket` |
| Messaging Sender ID | `messagingSenderId` |
| App ID | `appId` |

If you do not want Firebase right now, click **Skip** and continue.

---

**Step 3 of 3 — Passwords (optional)**

- **Admin password** — your private password for full read/write access and settings.
- **Read-only password** — a separate password you can share with others. They can view your dashboard but cannot edit anything.
- **Login screen hint** — optional text shown on the login screen.

> Passwords are stored as SHA-256 hashes — the app never stores your password in plain text.

Click **Finish Setup**. The page will reload and your dashboard is ready.

---

### Step 4 — Add to your phone's home screen

**iPhone or iPad (Safari):**

1. Open your GitHub Pages URL in **Safari** (must be Safari on iOS, not Chrome).
2. Tap the **Share button** (square with an arrow pointing up).
3. Tap **Add to Home Screen**, give it a name, and tap **Add**.

**Android (Chrome):**

1. Open your GitHub Pages URL in **Chrome**.
2. Tap the **three-dot menu** (⋮).
3. Tap **Add to Home screen** (or "Install app") and tap **Add**.

The app will open full-screen, just like a downloaded app.

---

## Sharing with someone (read-only access)

After setup, sharing is a single step:

1. Open the app in a **regular (non-private) tab**.
2. Tap **⚙️** (settings gear) in the top-right corner.
3. Tap **Copy Share Link**.
4. Send the copied URL to whoever you want to give read-only access to.

That URL already contains your Firebase configuration encoded in its `#fb=...` hash fragment. When the recipient opens it, they connect to your Firebase database automatically and land in read-only mode — no password or extra steps needed.

> **The `#fb=` hash is required for sharing to work.** The app encodes your Firebase config into the URL hash so recipients can connect to your database without any manual configuration. If the hash is missing (e.g. the URL was truncated or Firebase was not configured), the share link will not work. Always use the **Copy Share Link** button to get the correct URL — do not copy the address bar manually before the hash has been generated.

---

## Admin access on a new device

If you open the app on a new device (including via a share link), it starts in read-only mode. To switch to admin access:

1. Tap **⚙️** in the top-right corner.
2. Tap **Admin Login**.
3. Enter your admin password.

You now have full read/write access on that device.

---

## Changing settings later

You do not need to redo the setup wizard. At any time:

1. Open the app.
2. Tap the **menu icon** (☰) in the top-right corner.
3. Tap **App Settings**.

From there you can update your app name, currency, Firebase configuration, and passwords.

---

## Troubleshooting

**"I get a 404 error when I open the app"**

Your repository is likely set to **private**. GitHub Pages only works with public repositories on a free GitHub account. Go to Settings → scroll to Danger Zone → **Change repository visibility** → Public.

Your data is still protected by the app's own password system — making the repository public only exposes the source code, not your data.

---

**"The app shows a blank page or doesn't load"**

Wait 2–3 minutes after enabling GitHub Pages and try again. If it still does not load, go back to Settings → Pages and confirm the branch is set to `main` and the folder is `/ (root)`.

---

**"Data isn't syncing across my devices"**

Make sure the **Database URL** in App Settings is correct:

```
https://your-project-default-rtdb.REGION.firebasedatabase.app
```

Check for typos, extra spaces, or a missing `https://`. Copy it directly from Firebase Console → Build → Realtime Database.

---

**"I forgot my admin password"**

Passwords are stored as hashes and cannot be recovered. To reset: open your forked repository on GitHub, click `index.html` → pencil icon to edit → find the stored hash and remove it (or clear the app's settings key in DevTools → Application → Local Storage to re-trigger the setup wizard).

---

**"Firebase says 'Permission denied'"**

Your 30-day test mode has expired. Fix it in Firebase Console → Build → Realtime Database → **Rules** tab — replace the contents with:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Click **Publish**.

---

**"The share link doesn't work — recipient sees wrong or no data"**

Make sure:
- You copied the link using **⚙️ → Copy Share Link**, not manually from the address bar.
- The URL contains `#fb=` — this is the encoded Firebase config the recipient needs.
- You were in a **regular tab** (not private/incognito) when you copied the link.
- Firebase is configured in your app (the share link requires Firebase; local-only mode cannot be shared).

---

**"The PWA / home screen icon is not working"**

The app requires HTTPS for PWA features. GitHub Pages always uses HTTPS, so as long as you are using your `github.io` URL (not a local file), it should work. Open the full URL in Safari (iOS) or Chrome (Android) before adding to home screen.
