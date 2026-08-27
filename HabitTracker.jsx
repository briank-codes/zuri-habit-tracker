import { useState } from "react";
import { X, Plus } from "lucide-react";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const TODAY_IDX = (new Date().getDay() + 6) % 7; // Monday = 0

const initialHabits = [
  { id: 1, name: "Drink 2L of water", week: [true, true, false, true, false, false, false] },
  { id: 2, name: "Read 10 pages", week: [true, true, true, true, true, false, false] },
  { id: 3, name: "Morning stretch", week: [false, false, false, false, false, false, false] },
];

function computeStreak(week) {
  let streak = 0;
  for (let i = TODAY_IDX; i >= 0; i--) {
    if (week[i]) streak++;
    else break;
  }
  return streak;
}

function badgeFor(habit) {
  if (habit.week[TODAY_IDX]) {
    return { label: "Completed", className: "bg-[#111111] text-white" };
  }
  const streak = computeStreak(habit.week);
  if (streak >= 3) {
    return { label: `Streak ${streak} days`, className: "bg-[#F2EAD9] text-[#9C7A3C]" };
  }
  return { label: "Pending", className: "bg-transparent border border-stone-200 text-stone-400" };
}

function todayLabel() {
  return new Date()
    .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    .toUpperCase();
}

export default function HabitTracker() {
  const [habits, setHabits] = useState(initialHabits);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");

  const total = habits.length * 7;
  const done = habits.reduce((sum, h) => sum + h.week.filter(Boolean).length, 0);
  const weekPercent = total ? Math.round((done / total) * 100) : 0;

  function toggleDay(id, day) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, week: h.week.map((v, i) => (i === day ? !v : v)) }
          : h
      )
    );
  }

  function deleteHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function addHabit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setHabits((prev) => [
      ...prev,
      { id: Date.now(), name: trimmed, week: new Array(7).fill(false) },
    ]);
    setName("");
    setShowAdd(false);
  }

  return (
    <div
      className="min-h-screen w-full bg-[#F4F3EF] text-[#1C1C1C] px-5 py-14"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-xl mx-auto">
        {/* header */}
        <span
          className="block mb-3 text-[11px] tracking-[0.08em] uppercase text-stone-400"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {todayLabel()}
        </span>
        <h1
          className="mb-10 max-w-md leading-[1.12] tracking-[-0.02em] text-[2.6rem]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
        >
          Daily consistency, <em className="italic text-[#4B5E45]">tracked</em> simply.
        </h1>

        {/* progress card — signature element */}
        <div className="flex flex-wrap items-end justify-between gap-6 bg-white border border-stone-200 rounded-[20px] px-8 py-8 mb-6">
          <div>
            <div
              className="leading-none tracking-[-0.02em] text-[4.2rem]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
            >
              {weekPercent}%
            </div>
            <div className="mt-2 text-xs text-stone-400">This week's consistency</div>
          </div>

          <div className="flex gap-2.5">
            {DAY_LABELS.map((label, i) => {
              const doneAny = habits.some((h) => h.week[i]);
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-[15px] h-[15px] rounded-full border ${
                      doneAny ? "bg-[#1C1C1C] border-[#1C1C1C]" : "bg-transparent border-stone-200"
                    } ${i === TODAY_IDX ? "border-2 border-[#4B5E45]" : ""}`}
                  />
                  <span
                    className="text-[10px] text-stone-400"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* add row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-[0.05em] text-stone-400">Your habits</span>
          <button
            onClick={() => setShowAdd((v) => !v)}
            className="flex items-center gap-1.5 rounded-full bg-[#111111] text-white text-[13px] font-semibold px-5 py-2.5"
          >
            <Plus size={14} /> New habit
          </button>
        </div>

        {showAdd && (
          <div className="flex flex-wrap gap-2.5 bg-white border border-stone-200 rounded-[20px] px-6 py-5 mb-5">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              placeholder="Habit name, e.g. Read 10 pages"
              maxLength={40}
              className="flex-1 min-w-[160px] rounded-[10px] border border-stone-200 bg-[#F4F3EF] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1C1C1C]"
            />
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-full border border-stone-200 text-sm font-medium px-4.5 py-2.5"
            >
              Cancel
            </button>
            <button
              onClick={addHabit}
              className="rounded-full bg-[#111111] text-white text-sm font-semibold px-5 py-2.5"
            >
              Add
            </button>
          </div>
        )}

        {/* habit list */}
        {habits.length === 0 ? (
          <div
            className="text-center text-stone-400 py-14 italic text-lg"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Nothing tracked yet — add your first habit.
          </div>
        ) : (
          habits.map((habit) => {
            const badge = badgeFor(habit);
            return (
              <div
                key={habit.id}
                className="bg-white border border-stone-200 rounded-[18px] px-5.5 py-5 mb-3"
              >
                <div className="flex items-start justify-between gap-3.5 mb-3.5">
                  <div>
                    <div
                      className="text-[1.3rem] tracking-[-0.01em]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      {habit.name}
                    </div>
                    <div
                      className="mt-1 text-[11px] text-stone-400 uppercase tracking-[0.05em]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      Daily
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`rounded-full text-[11px] font-semibold uppercase tracking-[0.05em] px-3 py-1.5 whitespace-nowrap ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      aria-label="Delete habit"
                      className="text-stone-400 hover:text-[#B4433A] p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  {habit.week.map((isDone, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDay(habit.id, i)}
                      className={`w-6 h-6 rounded-[7px] border text-[10px] flex items-center justify-center ${
                        isDone
                          ? "bg-[#E7EBE3] border-[#4B5E45] text-[#4B5E45]"
                          : "bg-[#F4F3EF] border-stone-200 text-stone-400"
                      }`}
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {DAY_LABELS[i]}
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
