# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static weekly planner (Monday–Sunday view plus a to-do list). There is no build step, package manager, server, linter or test suite. Node is not installed on this machine.

To run it, open `planner.html` directly in a browser (on Windows: `Start-Process planner.html`). The user must refresh (F5) after `data.js` changes.

## Hard constraint: must work from `file://`

The user opens the page by double-clicking it, so there is no web server. That rules out `fetch`/XHR of local files, ES modules (`type="module"`) and JSON data files. Data is loaded with a classic `<script src="data.js">` that assigns a global. Keep every dependency inline or in classic scripts next to the page.

## Architecture

- **`data.js`** holds the user's real schedule; it is the only file the user edits by hand. It assigns `window.PLANNER_DATA = { events: [...], todos: [...] }`. The comment block at its top documents the schema for the user. Keep that block in sync whenever fields are added.
  - Event: `date` ("YYYY-MM-DD"), `start` ("HH:MM", 24h), `duration` (minutes), `title`, optional `location`, `color` (one of `blue|green|orange|pink|purple|teal`), `repeat` (`"weekly"|"daily"`), `until` ("YYYY-MM-DD"; a repeat with no `until` runs for one year).
  - To-do: `text`, `done` (bool), optional `due` ("YYYY-MM-DD").
- **`planner.html`** contains all markup, CSS and JS in one file, with no libraries.
  - At load, events are grouped into a `byDate` map keyed by "YYYY-MM-DD". Repeating events are expanded into every matching date at this point, and each day is sorted by start time. Rendering only does lookups into that map.
  - `weekStart` (a local-time Monday) is the only state. The prev/next/"This week" buttons and the arrow keys change it and call `renderWeek()`. `renderTodos()` runs once.
  - Dates are handled in local time on purpose (`parseDate`/`key` helpers). Avoid `new Date("YYYY-MM-DD")`, which parses as UTC and can shift the day.
  - All user text goes through `esc()` before being inserted with `innerHTML`.
  - Colours are CSS custom properties on `:root`, with a `prefers-color-scheme: dark` override. Event colours map to `.event.<color>` classes.
- The to-do list is read-only. Ticking an item on the page is not supported, because the page cannot write back to `data.js`; `done` is changed in the file.

## Working with the user's data

`data.js` contains the user's real events and to-dos (all sample data has been removed).

- **Time zone:** the user is in US Eastern time. Treat every time they give as Eastern, and work out "today"/"tomorrow" from the current Eastern date. Store times in `data.js` as Eastern wall-clock time; the page displays them as written.
- **Adding events:** the user gives a name, date/time and duration. If any of the three is missing or unclear, ask before editing. Do not assume a default.
- **After adding an event:** confirm the exact date and time back to the user, e.g. "Tue 27 Oct 2026, 13:00–14:00 ET". For a repeating event, give the first and last occurrence.
- **Completing to-dos:** when the user says a to-do is done, set `done: true` on it. Don't delete it.
