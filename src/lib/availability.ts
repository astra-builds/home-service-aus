const DAY_PLAN: Record<number, string[]> = {
  // 2 = Tuesday, 4 = Thursday, 6 = Saturday
  2: ["09:00", "11:00", "14:00"],
  4: ["09:30", "11:30", "14:30"],
  6: ["09:00", "10:30"],
};

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type Slot = {
  iso: string;
  dayKey: string;
  dayName: string;
  dayNumber: string;
  month: string;
  timeLabel: string;
  period: "Morning" | "Midday" | "Afternoon";
  kind: "Site visit" | "Video call" | "Cost plan review";
  busy: boolean;
};

function periodOf(h: number): Slot["period"] {
  if (h < 11) return "Morning";
  if (h < 14) return "Midday";
  return "Afternoon";
}

export function generateSlots(taken: string[] = [], weeks = 4): Slot[] {
  const out: Slot[] = [];
  const now = new Date();
  const start = new Date(now.getTime() + 36 * 3600 * 1000);
  start.setMinutes(0, 0, 0);
  const end = new Date(now.getTime() + weeks * 7 * 24 * 3600 * 1000);

  const cursor = new Date(start);
  while (cursor <= end) {
    const times = DAY_PLAN[cursor.getDay()];
    if (times) {
      for (const t of times) {
        const [h, m] = t.split(":").map(Number);
        const d = new Date(cursor);
        d.setHours(h, m, 0, 0);
        if (d.getTime() < now.getTime() + 20 * 3600 * 1000) continue;
        out.push({
          iso: d.toISOString(),
          dayKey: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
          dayName: DAY_NAMES[d.getDay()],
          dayNumber: String(d.getDate()).padStart(2, "0"),
          month: MONTHS[d.getMonth()],
          timeLabel: t.replace(":00", ":00am").replace(":30", ":30"),
          period: periodOf(h),
          kind: d.getDay() === 6 ? "Site visit" : h < 12 ? "Site visit" : "Video call",
          busy: taken.includes(d.toISOString()),
        });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

export function groupByDay(slots: Slot[]) {
  const map = new Map<string, Slot[]>();
  for (const s of slots) {
    const arr = map.get(s.dayKey) ?? [];
    arr.push(s);
    map.set(s.dayKey, arr);
  }
  return [...map.entries()].map(([dayKey, list]) => ({ dayKey, list }));
}

export function formatSlot(iso: string) {
  const d = new Date(iso);
  const h = d.getHours();
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mins = String(d.getMinutes()).padStart(2, "0");
  return {
    day: DAY_NAMES[d.getDay()],
    date: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
    time: `${h12}:${mins}${h < 12 ? "am" : "pm"}`,
  };
}
