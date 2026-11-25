"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChatReply, ChatSlots } from "@/lib/receptionist";
import { money } from "@/lib/estimate";
import { BRAND } from "@/lib/site";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  reply?: ChatReply;
};

const uid = () => Math.random().toString(36).slice(2, 10);

function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
        const content = line.replace(/^\s*[•-]\s*/, "");
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={j} className="font-semibold text-current">
              {p.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{p}</span>
          ),
        );
        if (isBullet) {
          return (
            <div key={i} className="flex gap-2.5 pl-0.5">
              <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-current opacity-50" />
              <span>{rendered}</span>
            </div>
          );
        }
        return <p key={i}>{rendered}</p>;
      })}
    </div>
  );
}

export function ChatDock() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uid);
  const [slots, setSlots] = useState<ChatSlots>({});
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const scroller = useRef<HTMLDivElement | null>(null);
  const greeted = useRef(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("ts-chat");
      if (saved) {
        const parsed = JSON.parse(saved) as { msgs: Msg[]; slots: ChatSlots };
        if (parsed.msgs?.length) {
          setMsgs(parsed.msgs);
          setSlots(parsed.slots ?? {});
          greeted.current = true;
        }
      }
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setTeaser(true), 5200);
    const t2 = setTimeout(() => setTeaser(false), 22000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (msgs.length) {
      try {
        sessionStorage.setItem("ts-chat", JSON.stringify({ msgs, slots }));
      } catch {
        /* ignore */
      }
    }
  }, [msgs, slots]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, open]);

  const push = async (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const userMsg: Msg = { id: uid(), role: "user", text: clean };
    const history = [...msgs, userMsg];
    setMsgs(history);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: clean,
          slots,
          turns: history.slice(-10).map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = (await res.json()) as { reply: ChatReply };
      await new Promise((r) =>
        setTimeout(r, Math.min(1500, 380 + data.reply.reply.length * 5)),
      );
      setSlots(data.reply.slots ?? {});
      setMsgs((prev) => [
        ...prev,
        { id: uid(), role: "assistant", text: data.reply.reply, reply: data.reply },
      ]);
    } catch {
      setMsgs((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          text: "That one got away from me — the connection dropped. Try again, or call the studio on " +
            BRAND.phoneDisplay +
            " and a person will pick it up.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    if (!greeted.current) {
      greeted.current = true;
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs([
          {
            id: uid(),
            role: "assistant",
            text: "Good morning — Jess here, from the Tallow & Stone studio desk.\n\nAsk me anything about your place: what things cost, whether we work in your suburb, how a build runs, or when we could start. If I can't answer it properly I'll say so and find the person who can.",
          },
        ]);
      }, 900);
    }
  };

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
        <div
          className={`pop-in max-w-[268px] origin-bottom-right rounded-2xl rounded-br-sm border border-ink/10 bg-paper p-4 shadow-[0_18px_50px_-16px_rgba(20,18,15,0.35)] transition-all duration-500 ${
            teaser && !open
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <button
            onClick={openChat}
            className="block text-left text-[13px] leading-relaxed text-ink/75"
          >
            <span className="u-eyebrow mb-1.5 block text-clay">Jess · Studio desk</span>
            Hi — real person, not a bot pretending otherwise. Ask me what things cost or
            when we could come out.
          </button>
          <button
            onClick={() => setTeaser(false)}
            className="u-eyebrow mt-2 text-ink/30 hover:text-ink/60"
          >
            Dismiss
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : openChat())}
          className={`group relative flex items-center gap-3 rounded-full pl-5 pr-2 py-2 shadow-[0_16px_44px_-14px_rgba(20,18,15,0.5)] transition-all duration-500 ${
            open
              ? "bg-ink text-paper"
              : "bg-clay text-paper hover:bg-ink pulse-ring"
          }`}
          aria-label="Open the studio desk"
        >
          <span className="u-eyebrow hidden sm:block">
            {open ? "Close the desk" : "Ask the studio"}
          </span>
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-[17px] transition-colors ${
              open ? "bg-paper/12 text-paper" : "bg-paper/18 text-paper"
            }`}
          >
            {open ? "×" : "J"}
          </span>
        </button>
      </div>

      {/* Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[95] flex flex-col overflow-hidden transition-all duration-500 md:inset-x-auto md:bottom-7 md:right-7 md:h-[640px] md:w-[430px] md:rounded-[22px] ${
          open
            ? "pointer-events-auto h-[86vh] opacity-100"
            : "pointer-events-none h-0 translate-y-6 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-hidden border border-ink/12 bg-paper shadow-[0_30px_90px_-24px_rgba(20,18,15,0.45)]">
          {/* header */}
          <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-ink px-5 py-4 text-paper">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/12 font-display text-[16px]">
                J
              </span>
              <div>
                <p className="text-[14.5px] leading-none">Jess Navarro</p>
                <p className="u-eyebrow mt-1.5 flex items-center gap-1.5 text-paper/45">
                  <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#3ddc84]" />
                  Studio desk · replies in ~4 min
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="u-eyebrow text-paper/50 transition-colors hover:text-paper"
              aria-label="Close chat"
            >
              Close
            </button>
          </div>

          {/* messages */}
          <div
            ref={scroller}
            className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-6"
          >
            {msgs.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="msg-in flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[13.5px] leading-relaxed text-paper">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div className="msg-in flex gap-2.5">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay/12 font-display text-[12px] text-clay">
                      J
                    </span>
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="max-w-[92%] text-[13.5px] leading-[1.68] text-ink/80">
                        <Rich text={m.text} />
                      </div>

                      {m.reply?.estimate && (
                        <div className="rounded-xl border border-ink/12 bg-paper-2/70 p-4">
                          <p className="u-eyebrow text-ink/45">
                            {m.reply.estimate.title}
                          </p>
                          <p className="mt-2 font-display text-[26px] leading-none tracking-tight">
                            {money(m.reply.estimate.low)}
                            <span className="mx-2 text-ink/30">—</span>
                            {money(m.reply.estimate.high)}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/12">
                              <div
                                className="h-full rounded-full bg-clay transition-all duration-1000"
                                style={{ width: `${m.reply.estimate.confidence}%` }}
                              />
                            </div>
                            <span className="u-eyebrow text-ink/45">
                              {m.reply.estimate.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      )}

                      {m.reply?.cards?.map((c) => (
                        <Link
                          key={c.title}
                          href={c.href ?? "#"}
                          className="group flex items-center justify-between gap-4 rounded-xl border border-ink/12 bg-ink px-4 py-3.5 text-paper transition-colors hover:bg-clay"
                        >
                          <span>
                            <span className="block text-[13.5px]">{c.title}</span>
                            <span className="mt-1 block text-[12px] leading-snug text-paper/60">
                              {c.body}
                            </span>
                          </span>
                          <span className="shrink-0 transition-transform duration-500 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      ))}

                      {m.reply?.handoff && (
                        <div className="flex flex-wrap gap-2">
                          {m.reply.handoff.map((h) => (
                            <a
                              key={h.channel}
                              href={h.href}
                              target={h.channel === "whatsapp" ? "_blank" : undefined}
                              rel="noreferrer"
                              className={`u-eyebrow rounded-full px-4 py-2.5 transition-colors ${
                                h.channel === "whatsapp"
                                  ? "bg-[#1faa53] text-white hover:bg-[#17903f]"
                                  : "border border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink"
                              }`}
                            >
                              {h.label}
                            </a>
                          ))}
                        </div>
                      )}

                      {m.reply?.chips && m.reply.chips.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-0.5">
                          {m.reply.chips.map((c) => (
                            <button
                              key={c}
                              onClick={() => push(c)}
                              className="rounded-full border border-ink/15 px-3.5 py-2 text-[12.5px] text-ink/70 transition-all duration-300 hover:border-clay hover:bg-clay/8 hover:text-clay"
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex gap-2.5">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay/12 font-display text-[12px] text-clay">
                  J
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-paper-2 px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="dot h-[5px] w-[5px] rounded-full bg-ink/60"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="border-t border-ink/10 bg-paper px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                push(input);
              }}
              className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-2 py-1.5 transition-colors focus-within:border-ink/40"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cost, timing, your suburb…"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[13.5px] text-ink placeholder:text-ink/35 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-all hover:bg-clay disabled:opacity-30"
                aria-label="Send"
              >
                ↑
              </button>
            </form>
            <p className="u-eyebrow mt-2.5 px-2 text-ink/30">
              Real person on the other end of this during {BRAND.hours.split(" · ")[0]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
