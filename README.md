# My Dashboard

A single-file personal life dashboard that lives on GitHub Pages and syncs to Firebase Realtime Database. It covers daily scheduling, habit tracking, food logging, expense management, gym progress, interview prep, and a reflective journal — all in one HTML file, no build step required.

---

## What you get

- **Overview** — daily score, streak tracking, calorie gauge, weekly report card, and a score trend chart in one glance
- **Today** — schedule tracker, task manager, and habit builder with a guided daily check-in flow
- **Health** — body metrics log, full food/macro tracker with meal templates, and a gym session tracker with rest timer and PR detection
- **Expenses** — three spend categories, daily variable limit and monthly budget, recurring auto-logging, debt tracking, and historical queries
- **Goals** — body targets, macro goals, expense budgets, grocery list, wish list, notes, ideas, and a daily journal with mood trends
- **Prep** — interview and exam prep planner with phase-based topic tracking, mock interview log, and pace alerts
- **Quick Log** — floating action button for logging expenses, study sessions, weight, and daily check-in without leaving any tab
- **PWA** — installable on iOS and Android, works from the home screen in full-screen mode
- **Firebase sync** — all data stored in Firebase Realtime Database; loads instantly from `localStorage` as a fallback
- **Sharing** — one-tap share link encodes your Firebase config into the URL so anyone with the link connects to the same data
- **Admin vs read-only** — separate SHA-256 hashed passwords; read-only visitors see all data but cannot write

---

## Features in detail

### Overview tab

The Overview tab is the home screen. Every time you navigate to it, all cards refresh.

| Card | What it shows |
|---|---|
| Score of the Day | Visual score circles for any selected date; jump back one day or return to today; share button |
| Streak Warning | Appears automatically if your daily consistency is at risk |
| This Month's Focus | Your three monthly intentions; admin Edit button jumps to the Goals tab |
| What's Left Today | Three-item checklist for schedule, meals, and expenses; tappable items navigate to the relevant tab |
| Calories Today | Live progress bar with calories consumed vs. goal; macro breakdown grid below |
| View Details (collapsed) | Hides a Weekly Report Card and a Score Trend chart (toggle between 30-day and 90-day views) |

The What's Left Today checklist also surfaces urgent tasks automatically. Any task due within the next two days, or already overdue, appears with a time-remaining badge. From that same list you can mark a task done, cycle its status, set a reminder, or open the full task view. If your prep topics are falling behind the expected pace, a Prep Pace Alert appears in this section with a direct link to the Upskill tab.

---

### Today tab

Three independently collapsible sections.

**Schedule**

- Pick a date and assign a day type (Office, WFH, or any custom type)
- A tracker shows how well you followed the planned schedule for that day
- Admins can define day-type templates with custom time slots and tasks
- A Past Day Data card lets you pull historical schedule logs for any date range

**Tasks**

- Filterable table showing name, category, priority, target date, days remaining, status, notes, and action controls
- Filter by due date or show all tasks at once
- Admins can add tasks with name, category (plus a custom Other option), target date, priority, and optional notes
- Completed tasks move to a separate hidden card showing completion date, outcome, and how you felt

**Habits**

- Active habits list showing name, category, daily time commitment, goal in days, and your motivation
- Admins can add habits via a dedicated form
- Habits that reach their goal move to a separate Habituated card

**Daily Check-in**

Accessible from the Quick Log overlay. A three-step bottom-sheet modal walks you through logging your day type, meals, and a quick expense. Each step can be skipped individually. After all three steps are finished or skipped, the modal closes automatically and refreshes the checklist and score indicators.

**Danger Zone (admin only)**

Four separate erase buttons at the bottom of the tab for wiping schedule logs, tasks, habits, and day notes. Each action is irreversible.

---

### Health tab

**Body Metrics**

- Six tracked metrics: weight, body fat %, lean mass, BMI, fat mass, and last logged date with a delta indicator
- Weight log table with date, weight, body fat %, and auto-calculated fat mass; sortable, with change columns and delete buttons
- Body targets and projection card with a weight-over-time chart
- BMI is derived automatically from logged weight and the height you set in Goals

**Food Logging**

- Five configurable daily macro targets (calories, protein, carbs, fat, fiber) shown as a color-coded proportional bar
- Five meal slots: Breakfast, Lunch, Snack, Dinner, Other
- Each entry captures dish name, eating location, protein source, and gram values for all macros plus total calories
- If an entry already exists for that date and category, new macros are merged (added) rather than overwritten
- Live inline progress bars update while you type, color-coding each macro against its daily target
- A daily summary card aggregates all meals for the selected date with colored total-vs-target bars
- A nutrition score (0–100) is computed per day and integrates with the Overview calorie gauge
- Meal templates let you save and reapply a full macro profile with one tap
- A custom ingredient library stores reusable items with category, serving size, and macro data

**Gym Tracker**

| Sub-tab | What it does |
|---|---|
| Log | Record a session by date, select up to 14 muscle groups, add exercises manually or via one-tap chips showing last performance |
| History | All sessions in reverse-chronological order; expandable cards with free-text search and muscle-group filtering |
| Progress | SVG line chart for any tracked exercise over 4 weeks to all time; multiple metrics; 4-week comparison panel sorted by biggest gain |

Strength exercises use a per-set table with weight, reps, RPE, and estimated 1RM (Epley formula). Sets that beat the previous session's max are flagged with a trophy icon; a live PR badge appears on the exercise header when a personal record is detected.

After each strength set, a rest timer overlay opens automatically with a countdown, audio beep (Web Audio API), vibration, and a browser notification when the rest period ends. The timer persists across tab navigation.

---

### Expenses tab

| Feature | Details |
|---|---|
| Three natures | Essential, Non-Essential, Fixed (EMI/rent/bill) |
| Daily and monthly limits | Essential + Non-Essential count toward the daily variable limit; Fixed expenses are excluded from the daily limit but included in the monthly budget. Limits are advisory — spending is never hard-blocked, but progress bars turn yellow at 70% and red at 90% |
| Add expense form | Date, description, amount, nature, optional note; reflected immediately in all summary cards |
| This Month's Spending Pattern | Visual chart of how spending is distributed across the current month |
| Daily Summary | Day-by-day breakdown for the past 7 days with per-transaction delete buttons |
| Monthly Summary | Month-over-month aggregate view |
| Recurring / Fixed auto-logging | Register a recurring expense with a name, amount, and day of the month; auto-logged on that date each month |
| One-time fixed entries | Logs once and retains in history without repeating |
| Historical fetch | Date-range picker with live search/filter on results |
| Track Money Owed | Log debts in four directions: owe to others, owed to you, cash lent, cash borrowed. For "They owe me" and "I lent", enter comma-separated names (e.g. `James, Joel, Mike`) to create one entry per person in a single step |
| Budget projection | Amounts under "I owe" and "I borrowed" appear as anticipated outflows in the projection view |
| Danger Zone (admin only) | Separate permanent erase buttons for all expenses, all recurring entries, the owed list, and expense limits |

---

### Goals tab

- **Body and nutrition targets** — goal weight, body fat %, height, weekly loss rate, daily macros, fiber, eating window, with visual projections and a macro bar after saving
- **Monthly expense limits** — daily variable spending cap and optional monthly ceiling; values lock in after saving to prevent mid-month changes
- **Score weights** — admin-adjustable component weights that must sum to 100%
- **Grocery and Essentials** — recurring items with configurable restock frequencies from daily to one-time; date-range lookup with live search
- **Wish List** — items tagged by recipient, priority (High / Medium / Low), budget, and notes; a Purchased Memory Lane view preserves bought items
- **Notes** — two tools: Things (locations, codes, contacts, reminders with optional expiry and pinning) and Sparks (ideas, enhancements, insights, questions with status and tag filtering)
- **Reflect** — weekly intentions with ratings, daily journal (text, energy score, mood score), mood and energy trend chart, monthly review summary, and past entries log
- **Monthly Intentions (admin only)** — three free-text intentions that surface on the Overview tab
- **Danger Zone** — permanent erase buttons for journal, grocery, wish list, notes, sparks, score weights, expense limits, and monthly focus

Most input sections are collapsible. Write actions are restricted to admin users.

---

### Prep (Upskill) tab

| Card | Details |
|---|---|
| Today's Focus | Dynamically generated card highlighting what to work on today |
| Plan Header and Progress | Days left, percent complete, topics done, mocks done, animated progress bar, estimated and actual finish dates |
| Filter Buttons | All / To Do / Done filters for the topic list |
| Phases Area | JS-rendered phases (e.g., DSA, Core Java, Spring Boot, System Design, Interview Readiness) |
| Add Custom Topic (admin) | Select phase, difficulty, topic name, source/platform, URL, days needed, hours estimate |
| Mock Interview Log (admin) | Date, round type, result, company/platform, notes; logged entries appear in a list below |
| Note/Remark Modal | Per-topic revision notes, notes link (Notion, Drive, Eraser), and a quick-fill button for the Eraser dashboard URL |
| Edit Topic Modal (admin) | Modify name, source, URL, days needed, and difficulty for any existing topic |
| Save as Default (admin) | Snapshot the current plan as the new default for future resets |
| Prep Meta Modal (admin) | Title, subtitle, target salary, start date, total plan days, daily hours target |
| Prep Category Modal (admin) | Create or edit a phase with emoji, name, and description |
| Danger Zone (admin) | Erase all progress and notes, reset to default plan, or erase all prep data |

If prep topics fall behind the expected pace, a Prep Pace Alert appears on the Overview tab showing how many topics are behind, with a direct link back to this tab.

---

### Quick Log overlay

A floating lightning-bolt button in the bottom-right corner opens an overlay panel from any tab.

- **Quick Navigate** — a two-column grid of tab shortcut buttons; tapping any closes the overlay and jumps to that tab. Admins can customise which tabs appear; selections persist to `localStorage` under `ql_tabs`.
- **Quick Actions** — four inline mini-forms that expand inside the overlay without closing it:
  - Log Expense
  - Study Session
  - Daily Check-in (three-step modal)
  - Log Weight

---

## Setup in 4 steps

### Step 1 — Fork and deploy to GitHub Pages

1. Open the source repository on GitHub and click **Fork** in the top-right. Select your account as the destination.
2. In your fork, go to **Settings > Pages**.
3. Under Source, choose **Deploy from a branch**.
4. Set Branch to `main` (or `master`) and folder to `/ (root)`. Click **Save**.
5. Wait 1–2 minutes. A green banner will show your live URL, typically `https://<your-username>.github.io/<repo-name>/`.
6. Open that URL to confirm the app loads. You will see the setup wizard on first visit.

---

### Step 2 — Create a Firebase project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com) and sign in.
2. Click **Add project**, enter a name (e.g. `my-dashboard`), and click through the prompts. Google Analytics is not required.
3. Once the project is created, click the gear icon next to **Project Overview** and select **Project settings**.
4. Scroll to **Your apps**, click the web icon (`</>`), enter an app nickname, and click **Register app**.
5. Copy the `firebaseConfig` block that appears. You will need all seven values.
6. Click **Continue to console**.

**Enable Realtime Database**

1. In the left sidebar, click **Build > Realtime Database**.
2. Click **Create Database**, choose a location, select **Start in test mode**, and click **Enable**.
3. Note the database URL shown at the top — it ends in `.firebaseio.com`.

**Enable Anonymous Authentication**

Anonymous Authentication is required. The database write rule is `auth != null`, meaning every write must come from an authenticated session. The app signs users in anonymously automatically, so no user-facing login is needed.

1. In the left sidebar, click **Build > Authentication**.
2. Click **Get started**, then open the **Sign-in method** tab.
3. Click **Anonymous**, toggle the **Enable** switch on, and click **Save**.

**Set security rules**

1. In **Realtime Database**, open the **Rules** tab.
2. Replace the entire contents with the following and click **Publish**:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

`.read: true` means anyone with the link can read data. `.write: "auth != null"` means only authenticated sessions can write — because Anonymous Authentication is enabled, every visitor automatically gets a session and writes succeed without a manual login.

---

### Step 3 — Run the setup wizard

Open your GitHub Pages URL. The wizard appears automatically on first visit.

**Step 1 of 3 — App Basics**

| Field | What to enter |
|---|---|
| App Name | Name shown in the browser tab and header (e.g. `Family Dashboard`) |
| Currency Symbol | Defaults to `₹`; change to `$`, `€`, or any symbol you use |
| Hosting URL | Your GitHub Pages URL (used to generate shareable links) |

Click **Next**.

**Step 2 of 3 — Firebase Sync**

Paste each of the seven values from your `firebaseConfig` object into the matching fields (API Key, Auth Domain, Database URL, Project ID, Storage Bucket, Messaging Sender ID, App ID). To use local-only mode with no cloud sync, leave all fields blank and click **Skip**.

Click **Next**.

**Step 3 of 3 — Access Passwords**

| Field | What to enter |
|---|---|
| Admin Password | Full read/write access. Hashed with SHA-256 before storing — plain text is never saved. Leave blank for no protection. |
| Read-only Password | Share this with people who should view but not edit. Leave blank to disable read-only mode. |
| Login Screen Hint | Optional subtitle shown on the login screen (e.g. `Enter the family password`) |

Click **Finish Setup**. The app hashes the passwords, saves config to Firebase and `localStorage`, creates a Firebase auth account, and reloads. The dashboard is now live and syncing.

---

### Step 4 — Add to home screen (optional)

**iOS (Safari only)**

1. Open your GitHub Pages URL in Safari. Chrome on iOS cannot install PWAs with full behavior.
2. Tap the **Share** button (box with an arrow) in the bottom toolbar.
3. Tap **Add to Home Screen**, edit the name if you like, and tap **Add**.
4. The icon appears on your home screen and opens in full-screen mode.

**Android (Chrome)**

1. Open your GitHub Pages URL in Chrome.
2. Tap the **three-dot menu** in the top-right.
3. Tap **Add to Home screen** or **Install app**.
4. Confirm and tap **Add** or **Install**.
5. The icon appears on your home screen and in the app drawer.

The app stores your Firebase config in `localStorage._fb_bootstrap` so subsequent home-screen launches load instantly even without the `#fb=` hash in the URL.

---

## Sharing with someone

Tapping **Copy Share Link** on the Overview tab generates a URL with your Firebase config base64-encoded into the fragment, like this:

```
https://you.github.io/dashboard/#fb=eyJhcGlLZXkiOi...
```

Anyone who opens that link connects to the same Firebase database instance. The hash is also saved to `localStorage._fb_bootstrap` on first load, so if the person installs it as a PWA, future launches work without the hash.

By default, visitors who open a share link land in **read-only mode** — they can see all data but cannot edit anything. To grant write access, share your admin password separately. Read-only users can upgrade to admin at any time via the settings menu without reloading the page.

---

## Admin access on a new device

1. Open the app URL (with or without the `#fb=` hash).
2. If prompted, enter the read-only password to view data.
3. Open the settings menu (gear icon) and select **Enter Admin Mode**.
4. Enter the admin password. The app signs you in and upgrades your session without a reload.

If you are opening the app on a brand-new device and have no `#fb=` hash, paste the full share link first so the app knows which Firebase project to connect to.

---

## Changing settings later

Open the settings menu from any tab (gear icon, top-right). From there you can:

- **Change admin or read-only password** — enter a new password and the app re-hashes and saves it
- **Update Firebase config** — paste new project values if you migrate to a different Firebase project
- **Change currency symbol** — updates all amount labels immediately on the next config load
- **Change app name** — reflected in the browser tab and header
- **Toggle dark mode** — switches between light and dark themes; preference persists across sessions
- **Customise Quick Log tabs** — enter edit mode in the Quick Log overlay to choose which tabs appear in the navigation grid

Monthly expense limits lock in for the current month once saved and cannot be changed mid-month. To adjust them early, use the Danger Zone in the Goals tab to erase the current limit entry, then re-save with updated values.

---

## Troubleshooting

**The page returns a 404 after deploying**

GitHub Pages can take up to 5 minutes to go live after the first push. If it is still 404 after 5 minutes, check Settings > Pages and confirm the branch and root folder are set correctly. Make sure your HTML file is named `index.html` and is in the root of the repository, not inside a subfolder.

**The app loads but shows a blank white screen**

Open the browser developer console (F12 or Cmd+Option+I). A JavaScript error here usually means the Firebase SDK failed to load. Check your internet connection and confirm the `firebaseConfig` values entered in the wizard are correct, especially `databaseURL` and `apiKey`. You can re-run the wizard by clearing `localStorage` in the console with `localStorage.clear()` and reloading.

**Data is not syncing between devices**

Confirm both devices opened the app using the same share link (same `#fb=` hash). If one device is in read-only mode the data it changes locally is not written to Firebase. Check the settings menu to confirm admin mode is active on the writing device.

**Firebase writes fail with "Permission denied"**

This means Anonymous Authentication is not enabled, or the security rules are incorrect. Fix both:

1. In the Firebase console, go to **Build > Authentication > Sign-in method** and enable **Anonymous**.
2. In **Realtime Database > Rules**, confirm the rules are exactly:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

Click **Publish** after saving the rules. Anonymous Authentication must be enabled for the `auth != null` condition to be satisfied — without it, `auth` is always `null` and all writes are rejected.

**I forgot my admin password**

Admin and read-only passwords are stored as SHA-256 hashes in Firebase under `app_config`. There is no way to reverse a hash to recover a plain-text password. To reset it, open the Firebase console, navigate to **Realtime Database**, find the `app_config` node, and delete the `AUTH_ADMIN_HASH` field. The next time you load the app, the wizard will prompt you to set a new password.

**The share link is broken or loads the wrong data**

The `#fb=` fragment in the share link is a base64-encoded JSON object of your Firebase config. If the URL was truncated (common in some messaging apps), the base64 string will be invalid. Copy the full link again from the app's share button and paste it as a plain URL rather than a hyperlink. If the link loads but shows no data, the person opening it may have an old `_fb_bootstrap` value in their `localStorage` pointing to a different project. They can clear it in the browser console with `localStorage.removeItem('_fb_bootstrap')` and reload using the full share link.

**PWA notifications are not working**

Notification reminders require the app to be installed as a PWA (added to home screen). They do not fire from a browser tab. After installing, grant notification permission when prompted. If the permission prompt never appeared, go to your device's notification settings, find the app, and enable notifications manually. The daily 10:30 AM reminder is scheduled via `setTimeout` when the app loads — if the app is not open or backgrounded at that time, the reminder will not fire until the next time the app is launched.

**The PWA does not update after I push a new version**

PWAs cache aggressively. On iOS, close the app fully (swipe up from the app switcher) and reopen it. On Android, go to the app's storage settings and clear the cache, or uninstall and reinstall from the share link. On desktop, open DevTools > Application > Service Workers and click **Update** or **Unregister**, then reload.
