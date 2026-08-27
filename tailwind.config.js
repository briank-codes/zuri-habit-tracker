/** tailwind.config.js — extend, don't replace, your existing config */
module.exports = {
  theme: {
    extend: {
      colors: {
        cream: "#F4F3EF",
        card: "#FFFFFF",
        border: "#E4E1D8",
        ink: "#1C1C1C",
        muted: "#8A8778",
        "off-black": "#111111",
        moss: "#4B5E45",
        "moss-tint": "#E7EBE3",
        ochre: "#9C7A3C",
        "ochre-tint": "#F2EAD9",
        danger: "#B4433A",
      },
      fontFamily: {
        display: ["Instrument Serif", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        headline: ["2.6rem", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        stat: ["4.2rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "habit-name": ["1.3rem", { letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "18px",
        xl: "20px",
      },
      letterSpacing: {
        tightish: "-0.02em",
        wideish: "0.05em",
        monoish: "0.08em",
      },
    },
  },
};

/* ==========================================================
   Usage in JSX, once merged into your tailwind.config.js:
   ==========================================================
   <h1 className="font-display font-normal text-headline tracking-tightish">
     Daily consistency, <em className="italic text-moss">tracked</em> simply.
   </h1>

   <span className="badge bg-ochre-tint text-ochre rounded-full text-[11px]
                     font-semibold uppercase tracking-wideish px-3 py-1.5">
     Streak 7 days
   </span>

   <div className="bg-card border border-border rounded-xl p-8">
     <div className="font-display text-stat">72%</div>
   </div>
   ========================================================== */
