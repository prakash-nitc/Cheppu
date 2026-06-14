# Cheppu — Speak Telugu (చెప్పు = "say it")

A small, install-on-your-phone web app for learning **spoken** Telugu — built for
holding real conversations with your partner, her parents, and everyday life.
No reading or writing the script required: every phrase is shown in plain
romanized spelling with audio. The loop is **Hear → Understand → Say**.

It's a single self-contained `index.html` with no build step, no server, and
no database. Progress lives in your browser. An optional AI conversation partner
runs on your own free Groq API key.

## Features
- **12 units, ~20 lessons, ~115 phrases** (greetings, you & me, family & respect,
  meeting the parents, food, sweet talk, daily life, small talk, numbers, time,
  getting around, feelings). All spoken-first, romanization-first.
- **Six exercise types**, no script-reading required:
  - **Listen & pick the meaning** (with a 🐢 slow-replay)
  - **Recall** — English → choose the right phrase
  - **Build the sentence** — tap word tiles into order
  - **Type what you hear** — hear Telugu, rebuild it from tiles
  - **Match the pairs** — phrase ↔ meaning
  - **Speak it** — say the phrase; the 🎤 scores you against the target
    using browser speech recognition (graceful self-check fallback where
    recognition isn't available)
- **Spaced repetition**: every phrase tracks a strength (0–5); a daily
  **"Practice weak words"** review resurfaces what's due.
- **Crowns / levels**: replay a lesson to level it up (1–5 crowns each).
- **Gamification**: daily XP goal with progress ring, hearts, in-lesson combos,
  sound effects + haptics (toggleable), a daily streak, and an achievements grid.
- Audio playback via your device's built-in Telugu voice.
- A searchable **phrasebook** showing each phrase's audio and learned strength.
- Optional Telugu script as an off-by-default reference toggle.
- Optional AI **conversation partner** (girlfriend / meeting-the-parents /
  errand role-plays) powered by your own Groq key — with 🎤 voice dictation.
- Progress saved locally (localStorage, memory fallback).

## Run it locally
Two options:

**Quick:** double-click `index.html` to open it in a browser. The lessons,
audio, phrasebook, and progress all work this way.

**Recommended (enables PWA install + offline):** serve the folder over HTTP.
```bash
cd cheppu
python3 -m http.server 8000
# open http://localhost:8000
```
The service worker (offline support) and "Add to Home Screen" only activate
when served over http/https, not from a `file://` path.

## Install on your phone (PWA)
Open the hosted URL on your phone, then use the browser menu → **Add to Home
Screen**. It gets an icon and opens fullscreen like a native app.

## Deploy free on GitHub Pages
1. Push this folder to a GitHub repo (see below).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, pick `main` and `/ (root)`, save.
3. Your app goes live at `https://<your-username>.github.io/<repo>/`.

## The conversation partner (Groq)
The chat in the **Practice** tab needs an API key:
1. Sign up free at https://console.groq.com (no credit card).
2. Create an API key.
3. Open the app → **You** tab → paste the key → Save.

Notes:
- Groq runs open-source models (this app uses `llama-3.3-70b-versatile`). The
  free tier is generous for personal use.
- The key is stored only in your browser's local storage. **Don't commit your
  key or deploy it publicly embedded** — anyone could read it. For a public
  deployment, route requests through a small serverless proxy instead.
- Browser-direct calls can occasionally be blocked by CORS depending on the
  host; running locally or via GitHub Pages generally works for personal use.

## Push to GitHub
```bash
cd cheppu
git init
git add .
git commit -m "Cheppu: spoken Telugu trainer (v1)"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

## Project structure
```
cheppu/
├── index.html          # the whole app (UI + content + logic, inline)
├── manifest.json       # PWA metadata
├── service-worker.js   # offline cache
├── icons/              # app icons + favicon
├── README.md
├── LICENSE             # MIT
└── .gitignore
```
All learning content lives in the `UNITS` array near the top of `index.html` —
add phrases or units there and they show up automatically.

## Roadmap (future scope)
- More units and phrases (target ~200+).
- Paired dialogue drills ("she says X → pick your reply").
- Cross-device sync via a lightweight backend (Supabase/Firebase) + accounts.
- Splitting `index.html` into separate `css/` and `js/` modules as it grows.

Done since v1: word-tile sentence building, type-what-you-hear, match-the-pairs,
microphone speaking practice with scoring, spaced-repetition review, crowns/levels,
daily goal, sound + haptics, achievements, phrasebook search.

---
Built as a personal learning tool. Telugu phrasing favors natural, casual
spoken usage; corrections and additions welcome.
