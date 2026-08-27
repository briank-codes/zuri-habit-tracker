# Zuri Habit Tracker (Editorial Redesign)

This is a fresh look for the habit tracker, moved away from the dark mode version into a warm, editorial style. Cream background, a serif headline with one word in italics, pill badges, and a big stat card up top. Same idea as before, you check off your habits and the app tells you how consistent you have been, just dressed differently this time.

## What is in here

There are four files.

1) habit tracker dot html. This one runs on its own. Open it in a browser and it works, no build step, nothing to install. It uses plain JavaScript the same way the original project did.

2) HabitTracker dot jsx. Same design, built as a React component using Tailwind classes and useState for the state. Use this one if your project already runs on React.

3) design tokens dot css. The colours, fonts, spacing and radius values written out as CSS variables, so you can pull the look into any other page without copying the whole component.

4) tailwind config dot js. The same tokens but written as a Tailwind theme extension, for the React version.

## The look

The background is a warm cream, not pure white. Cards sit on top in plain white with a thin border and rounded corners. Headings use Instrument Serif, body text uses Inter, and small labels like day names use IBM Plex Mono in uppercase with wide letter spacing.

The one word "tracked" in the headline is italic and coloured moss green. That is on purpose, it is meant to be the one accent your eye catches first.

Badges tell you the state of a habit at a glance. Completed is solid black. A streak of three days or more turns ochre coloured. Anything else just says pending with a plain outline.

The stat card at the top shows your weekly consistency as one big serif number, with seven small dots underneath for Monday through Sunday, so you can see at a glance which days had something checked off.

## Running it

For the html file, just double click it or drag it into your browser. Everything is kept in memory for this version, so refreshing the page resets it. If you want it to remember your habits after closing the tab, add localStorage calls where the comment in the script says to, the same way the original tracker did it.

For the React component, drop it into an existing React and Tailwind project, merge the tailwind config into your own, and import lucide react for the icons it uses.

## Why it changed from the original

The first version was dark, mono spaced, more like a dashboard. This one reads more like a page from a magazine, softer, with the serif type doing most of the personality work instead of neon green glows. Same habits, same streaks, same scoring idea underneath, just presented in a calmer, warmer way.

## Built by

Brian, Zuri Creative Designs.
