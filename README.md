# MONEY MOTION STUDIOS — Web App

The studio's own web app, hand-written in plain HTML, CSS and vanilla
JavaScript. **No build step, no npm, no framework** — open the folder with
any static file server (or just deploy the folder as-is) and it runs.

**Positioning:** KEYZ is the studio's mixing engineer ("KEYZ — Money Motion
Engineer"). He is never presented as owner/founder/CEO anywhere in this app.
The dashboard is called the *Owner Dashboard* because it's where the studio
owner approves payments — the public pages never claim Keyz owns the studio.

## Pages

| File | What it does |
| --- | --- |
| `index.html` | Home: logo, tagline "From the block to the booth.", exact rate card (Studio Time $150 / 5 hrs with free mixdown, Booking Fee $50, Mix & Master only $300), "Bring a consolidated WAV session", phones, address, socials, links to booking + live room. |
| `book.html` | Booking form (name, phone, email, service, date, time, notes). Creates a booking numbered `MM-XXXXXX` with status **Pending payment** and sends the client to the pay page. |
| `pay.html` | `pay.html?n=MM-123456` — shows the $50 booking fee due now, the service total and the balance after the fee, and three ways to pay (Cash App, Venmo, Chime) using the handles from settings. **"I've Paid"** flips the booking to *Payment sent — awaiting confirmation* — the booking stays pending until the owner confirms it in the dashboard. That's the per-transaction control. |
| `live.html` | The Live Room: video area (OFF AIR state, or HLS playback when live), live chat, and an owner-only Go Live panel (visible after owner sign-in) with the playback-URL field and live toggle. |
| `dashboard.html` | Owner login. Lists all bookings (newest first) with **Confirm Payment / Mark Completed / Cancel**, plus an editable settings form: Cash App handle, Venmo link, Chime handle, live on/off, playback URL. |

## Demo mode (works right now, no accounts)

While `SUPABASE_URL` / `SUPABASE_ANON_KEY` in `js/config.js` are empty, the
app runs in **demo mode**:

- Bookings, settings and chat are stored in the browser's `localStorage`.
- A gold banner at the top of every page says so.
- The dashboard is gated by a demo password stored in `js/config.js`
  (`DEMO_OWNER_PASSWORD`, default `moneymotion` — change it, and note it's
  only a demo gate, not real security).
- Everything is per-browser: a booking made on your phone won't show in the
  dashboard on your laptop until Supabase is connected.

Preview it:

```bash
cd money-motion-app
python3 -m http.server 8000
# open http://localhost:8000
```

## Go-live checklist

1. **Create a free Supabase project** at [supabase.com](https://supabase.com)
   (free tier is plenty for a studio booking app).
2. **Run the schema:** Supabase Dashboard → **SQL Editor** → New query →
   paste all of `supabase-schema.sql` → **Run**. This creates the
   `bookings`, `settings` and `chat_messages` tables with the right
   permissions and seeds the payment handles.
3. **Paste your keys:** Supabase Dashboard → **Settings → API** → copy the
   **Project URL** and the **anon public** key into `js/config.js`
   (`SUPABASE_URL`, `SUPABASE_ANON_KEY`). Demo mode turns off automatically.
4. **Create the owner user:** Supabase Dashboard → **Authentication →
   Users → Add user** — set the email + password the owner will use to sign
   in at `dashboard.html`. Do this before sharing the site: the signed-in
   owner is the only account that can read all bookings and change settings.
5. **Deploy to GitHub Pages:** push this folder to a GitHub repo →
   repo **Settings → Pages** → deploy from the main branch, root folder.
   (Or drop the folder on Netlify / Cloudflare Pages / any static host.)
6. **Live video:** create a free **Livepeer** (or Mux) stream, start it
   from OBS / the provider's studio with your stream key, then paste the
   HLS **playback URL** (ends in `.m3u8`) into the dashboard settings (or
   the Go Live panel on the live page) and flip **Live** on. Viewers get
   video + chat; flip Live off to return to OFF AIR.

## How payments work (by design)

Venmo, Cash App and Chime have no checkout API for outside apps, so the pay
page deep-links the client to the owner's own handles with the amount set
($50) and tells them to put their booking number in the payment note. Money
goes straight to the owner — the app never touches it — and every booking
stays **Pending payment** until the owner taps **Confirm Payment** in the
dashboard. Handles are settings, not hard-coded: change them in the
dashboard and the pay page updates.

## Files

```
index.html  live.html  book.html  pay.html  dashboard.html
css/style.css
js/config.js   ← Supabase keys, rate card, demo password, fallback handles
js/store.js    ← data layer: Supabase when configured, localStorage in demo
assets/logo.png
supabase-schema.sql
```
