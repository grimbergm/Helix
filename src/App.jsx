import { useState, useEffect, useRef, useCallback } from "react";
import { Moon, Star, Coins, ShoppingBag, BarChart2, User, Flame, Zap, Award, ChevronRight, Check, ArrowLeft, Sun, Coffee, Leaf, Heart, Clock, TrendingUp, Calendar, Bell, Settings, Gift, X, Play, Pause, SkipForward, Battery, Wifi, Signal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

const BLUE_LIGHT_FACTS = [
  "Blue light suppresses melatonin production for up to 3 hours after exposure.",
  "The average teen spends 7+ hours on screens daily — 40% more than a decade ago.",
  "Reducing screen use 90 minutes before bed can improve sleep onset by 25%.",
  "Your eyes absorb 80% of blue light from phone screens held 12 inches away.",
  "Sleep before midnight is 3× more restorative than sleep after midnight.",
  "Just 2 nights of poor sleep reduces cognitive performance by 30%.",
  "Amber-tinted glasses block 98% of blue light wavelengths.",
  "The circadian rhythm syncs to light — your phone tricks it into thinking it's noon.",
];

const MARKETPLACE_ITEMS = [
  { id: 1, name: "Yoga Mat Pro", discount: "20% OFF", cost: 150, icon: "🧘", category: "Wellness", color: "#7c3aed" },
  { id: 2, name: "Green Tea Bundle", discount: "FREE sample", cost: 80, icon: "🍵", category: "Nutrition", color: "#059669" },
  { id: 3, name: "Silk Pillow", discount: "50% OFF", cost: 300, icon: "🛏️", category: "Sleep", color: "#db2777" },
  { id: 4, name: "Lavender Mist", discount: "30% OFF", cost: 120, icon: "🌿", category: "Aromatherapy", color: "#7c3aed" },
  { id: 5, name: "Herbal Snack Box", discount: "1 FREE box", cost: 200, icon: "🌰", category: "Nutrition", color: "#d97706" },
  { id: 6, name: "Sleep Mask", discount: "40% OFF", cost: 90, icon: "😴", category: "Sleep", color: "#2563eb" },
  { id: 7, name: "Meditation App", discount: "3 months FREE", cost: 250, icon: "🧠", category: "Wellness", color: "#7c3aed" },
  { id: 8, name: "Blue-Light Glasses", discount: "25% OFF", cost: 180, icon: "👓", category: "Protection", color: "#0891b2" },
];

const STREAK_DATA = [
  { day: "M", done: true }, { day: "T", done: true }, { day: "W", done: true },
  { day: "T", done: false }, { day: "F", done: true }, { day: "S", done: true },
  { day: "S", done: true },
];

const WEEKLY_COINS = [
  { day: "Mon", coins: 45 }, { day: "Tue", coins: 60 }, { day: "Wed", coins: 55 },
  { day: "Thu", coins: 0 }, { day: "Fri", coins: 80 }, { day: "Sat", coins: 95 },
  { day: "Sun", coins: 70 },
];

const ENERGY_DATA = [
  { day: "Mon", level: 3 }, { day: "Tue", level: 4 }, { day: "Wed", level: 4 },
  { day: "Thu", level: 2 }, { day: "Fri", level: 4 }, { day: "Sat", level: 5 },
  { day: "Sun", level: 4 },
];

function useVisibilityTracking(active) {
  const [penalized, setPenalized] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  useEffect(() => {
    if (!active) return;
    const handle = () => {
      if (document.hidden) {
        setPenalized(true);
        setWarningVisible(true);
        setTimeout(() => setWarningVisible(false), 3000);
      }
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, [active]);
  return { penalized, warningVisible, resetPenalty: () => setPenalized(false) };
}

// ─── BREATHING RING ───────────────────────────────────────────────────────────
function BreathingRing({ progress, phase }) {
  const size = 220;
  const cx = size / 2, cy = size / 2;
  const r = 82;
  const circumference = 2 * Math.PI * r;
  const strokeDash = circumference * progress;

  return (
      <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
        <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Outer glow */}
          <circle cx={cx} cy={cy} r={r + 18} fill="url(#moonGlow)" />
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="3" />
          {/* Progress arc */}
          <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
              strokeDashoffset={0}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: "stroke-dasharray 0.5s ease" }}
          />
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          {/* Moon fill based on progress */}
          <circle cx={cx} cy={cy} r={60 * (0.3 + progress * 0.7)}
                  fill={`rgba(251,191,36,${0.08 + progress * 0.15})`} />
          <circle cx={cx} cy={cy} r={44 * (0.3 + progress * 0.7)}
                  fill={`rgba(251,191,36,${0.12 + progress * 0.18})`} />
          {/* Moon crescent */}
          <circle cx={cx} cy={cy} r={32} fill={`rgba(251,191,36,${0.15 + progress * 0.5})`} />
          <circle cx={cx - 10} cy={cy - 5} r={22} fill="rgba(15,10,40,0.85)" />
          {/* Stars */}
          {[[-28, -32], [30, -28], [36, 20], [-34, 18]].map(([dx, dy], i) => (
              <circle key={i} cx={cx + dx} cy={cy + dy} r={1.5 + Math.sin(i) * 0.5}
                      fill={`rgba(248,250,252,${0.3 + progress * 0.6})`} />
          ))}
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 2
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "rgba(167,139,250,0.7)", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{phase}</div>
        </div>
      </div>
  );
}

// ─── COUNTDOWN TIMER ─────────────────────────────────────────────────────────
function CountdownTimer({ seconds, total }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 52,
          fontWeight: 400,
          color: "#e2e8f0",
          letterSpacing: 2,
          lineHeight: 1
        }}>
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <div style={{ fontSize: 12, color: "rgba(148,163,184,0.6)", marginTop: 6, letterSpacing: 1 }}>
          REMAINING
        </div>
      </div>
  );
}

// ─── STATUS BAR ──────────────────────────────────────────────────────────────
function StatusBar() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return (
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 20px 6px", fontSize: 12, color: "rgba(226,232,240,0.6)",
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <span style={{ fontWeight: 600 }}>{h}:{m}</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Signal size={12} /><Wifi size={12} /><Battery size={14} />
        </div>
      </div>
  );
}

// ─── COIN BADGE ──────────────────────────────────────────────────────────────
function CoinBadge({ amount, size = "sm" }) {
  const isLg = size === "lg";
  return (
      <div style={{
        display: "inline-flex", alignItems: "center", gap: isLg ? 8 : 4,
        background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))",
        border: "1px solid rgba(251,191,36,0.25)",
        borderRadius: 100,
        padding: isLg ? "8px 18px" : "4px 10px",
      }}>
        <div style={{
          width: isLg ? 22 : 14, height: isLg ? 22 : 14,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ fontSize: isLg ? 12 : 8 }}>✦</span>
        </div>
        <span style={{
          fontSize: isLg ? 20 : 13, fontWeight: 700,
          color: "#fbbf24", fontFamily: "'Space Mono', monospace"
        }}>{amount}</span>
        {isLg && <span style={{ fontSize: 11, color: "rgba(251,191,36,0.6)", letterSpacing: 1 }}>HELIX</span>}
      </div>
  );
}

// ─── TAB BAR ─────────────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: "home", icon: Moon, label: "Home" },
    { id: "shop", icon: ShoppingBag, label: "Shop" },
    { id: "stats", icon: BarChart2, label: "Stats" },
    { id: "profile", icon: User, label: "Profile" },
  ];
  return (
      <div style={{
        display: "flex",
        background: "rgba(15,10,40,0.95)",
        borderTop: "1px solid rgba(99,102,241,0.15)",
        backdropFilter: "blur(20px)",
        padding: "8px 0 4px",
      }}>
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
              <button key={id} onClick={() => onChange(id)} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                gap: 3, border: "none", background: "transparent", cursor: "pointer",
                padding: "4px 0",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: isActive ? "rgba(99,102,241,0.2)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}>
                  <Icon size={18} color={isActive ? "#a78bfa" : "rgba(148,163,184,0.5)"} />
                </div>
                <span style={{
                  fontSize: 10, fontWeight: isActive ? 600 : 400, letterSpacing: 0.5,
                  color: isActive ? "#a78bfa" : "rgba(148,163,184,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{label}</span>
              </button>
          );
        })}
      </div>
  );
}

// ─── SETUP WIZARD ─────────────────────────────────────────────────────────────
function SetupWizard({ onComplete }) {
  const [step, setStep] = useState(0);
  const [bedtime, setBedtime] = useState("22:30");
  const [duration, setDuration] = useState(60);

  const steps = [
    {
      title: "When do you sleep?",
      sub: "Set your target bedtime",
      content: (
          <div style={{ textAlign: "center" }}>
            <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)}
                   style={{
                     background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
                     borderRadius: 16, padding: "16px 24px", fontSize: 32,
                     color: "#e2e8f0", fontFamily: "'Space Mono', monospace",
                     outline: "none", textAlign: "center", width: "100%", boxSizing: "border-box"
                   }} />
          </div>
      )
    },
    {
      title: "Wind-down window",
      sub: "How long before bed to unplug?",
      content: (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[30, 60, 90].map(d => (
                <button key={d} onClick={() => setDuration(d)} style={{
                  padding: "18px 24px", borderRadius: 16,
                  background: duration === d ? "rgba(99,102,241,0.25)" : "rgba(99,102,241,0.06)",
                  border: `1px solid ${duration === d ? "rgba(99,102,241,0.5)" : "rgba(99,102,241,0.15)"}`,
                  color: duration === d ? "#a78bfa" : "#94a3b8",
                  fontSize: 16, fontWeight: 600, cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <span>{d} minutes</span>
                  {duration === d && <Check size={18} color="#a78bfa" />}
                </button>
            ))}
          </div>
      )
    },
    {
      title: "You're all set ✦",
      sub: "Helix will reward your rest",
      content: (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🌙</div>
            <div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
              Your pre-sleep routine starts at<br />
              <span style={{ color: "#a78bfa", fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>
              {(() => {
                const [h, m] = bedtime.split(":").map(Number);
                const total = h * 60 + m - duration;
                const nh = ((total / 60 | 0) + 24) % 24;
                const nm = ((total % 60) + 60) % 60;
                return `${String(nh).padStart(2,"0")}:${String(nm).padStart(2,"0")}`;
              })()}
            </span>
            </div>
          </div>
      )
    }
  ];

  return (
      <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {steps.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 24 : 8, height: 8, borderRadius: 100,
                background: i <= step ? "#a78bfa" : "rgba(99,102,241,0.2)",
                transition: "all 0.3s"
              }} />
          ))}
        </div>

        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 700, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
            {steps[step].title}
          </h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{steps[step].sub}</p>
        </div>

        <div style={{ flex: 1 }}>{steps[step].content}</div>

        <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete({ bedtime, duration })}
                style={{
                  padding: "16px", borderRadius: 16, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "#fff", fontSize: 16, fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 24px rgba(99,102,241,0.3)",
                }}>
          {step < steps.length - 1 ? "Continue" : "Start Sleeping Better ✦"}
        </button>
      </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ config, coins, onStart, sessionActive, sessionSeconds, sessionTotal, onStop, penalized, warningVisible, factIndex }) {
  const progress = sessionActive ? 1 - (sessionSeconds / sessionTotal) : 0;
  const fact = BLUE_LIGHT_FACTS[factIndex % BLUE_LIGHT_FACTS.length];

  const getBreathPhase = () => {
    const cycle = 8;
    const t = (Date.now() / 1000) % cycle;
    if (t < 4) return "breathe in";
    return "breathe out";
  };
  const [breathPhase, setBreathPhase] = useState(getBreathPhase());
  useEffect(() => {
    if (!sessionActive) return;
    const id = setInterval(() => setBreathPhase(getBreathPhase()), 500);
    return () => clearInterval(id);
  }, [sessionActive]);

  if (sessionActive) {
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", gap: 20 }}>
          {/* Warning toast */}
          {warningVisible && (
              <div style={{
                position: "fixed", top: 60, left: 20, right: 20, zIndex: 100,
                background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: 14, padding: "12px 16px",
                color: "#fca5a5", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 8
              }}>
                ⚠️ You left Helix — coins paused for this session
              </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
                Pre-sleep Routine
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
                {penalized ? <span style={{ color: "#f87171" }}>Penalized ✗</span> : "Active ✦"}
              </div>
            </div>
            <CoinBadge amount={Math.floor(progress * config.duration)} />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <BreathingRing progress={progress} phase={breathPhase} />
            <CountdownTimer seconds={sessionSeconds} total={sessionTotal} />
          </div>

          {/* Fact card */}
          <div style={{
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)",
            borderRadius: 16, padding: "14px 16px"
          }}>
            <div style={{ fontSize: 10, color: "#6366f1", letterSpacing: 2, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
              💡 BLUE LIGHT FACT
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{fact}</p>
          </div>

          <button onClick={onStop} style={{
            padding: "14px", borderRadius: 14, border: "1px solid rgba(239,68,68,0.3)",
            background: "rgba(239,68,68,0.08)", color: "#f87171",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            End Session
          </button>
        </div>
    );
  }

  return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", gap: 20 }}>
        {/* Greeting */}
        <div>
          <div style={{ fontSize: 13, color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>Good evening 🌙</div>
          <h1 style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 800, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
            Ready to unwind?
          </h1>
        </div>

        {/* Wallet card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(124,58,237,0.1))",
          border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: "20px",
        }}>
          <div style={{ fontSize: 11, color: "#6366f1", letterSpacing: 2, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            YOUR BALANCE
          </div>
          <CoinBadge amount={coins} size="lg" />
          <div style={{ marginTop: 12, fontSize: 12, color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>
            🔥 6-night streak • +15 bonus tonight
          </div>
        </div>

        {/* Streak row */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {STREAK_DATA.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: "100%", aspectRatio: "1", borderRadius: 10,
                  background: d.done ? "rgba(99,102,241,0.25)" : "rgba(51,65,85,0.3)",
                  border: `1px solid ${d.done ? "rgba(99,102,241,0.4)" : "rgba(51,65,85,0.3)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12
                }}>
                  {d.done ? "✦" : ""}
                </div>
                <span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>{d.day}</span>
              </div>
          ))}
        </div>

        {/* Config info */}
        <div style={{
          background: "rgba(15,23,42,0.5)", border: "1px solid rgba(51,65,85,0.4)",
          borderRadius: 16, padding: "14px 16px",
          display: "flex", justifyContent: "space-between"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>BEDTIME</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#a78bfa", fontFamily: "'Space Mono', monospace" }}>
              {config.bedtime}
            </div>
          </div>
          <div style={{ width: 1, background: "rgba(51,65,85,0.4)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>WIND-DOWN</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#a78bfa", fontFamily: "'Space Mono', monospace" }}>
              {config.duration}m
            </div>
          </div>
          <div style={{ width: 1, background: "rgba(51,65,85,0.4)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Sans', sans-serif" }}>REWARD</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fbbf24", fontFamily: "'Space Mono', monospace" }}>
              +{config.duration}✦
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* CTA */}
        <button onClick={onStart} style={{
          padding: "18px", borderRadius: 18, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
          color: "#fff", fontSize: 17, fontWeight: 800,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
          letterSpacing: 0.5,
          position: "relative", overflow: "hidden"
        }}>
          <span>Start Pre-Sleep Routine ✦</span>
        </button>
      </div>
  );
}

// ─── SHOP SCREEN ─────────────────────────────────────────────────────────────
function ShopScreen({ coins, onRedeem }) {
  const [redeemed, setRedeemed] = useState(new Set());
  const [selected, setSelected] = useState(null);

  const handleRedeem = (item) => {
    if (coins >= item.cost && !redeemed.has(item.id)) {
      onRedeem(item.cost);
      setRedeemed(prev => new Set([...prev, item.id]));
      setSelected(null);
    }
  };

  return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
            Wellness Market
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, color: "#64748b", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Redeem your HELIX coins</p>
            <CoinBadge amount={coins} />
          </div>
        </div>

        {/* Modal */}
        {selected && (
            <div style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(5,5,20,0.85)", display: "flex",
              alignItems: "flex-end", padding: 16
            }} onClick={() => setSelected(null)}>
              <div style={{
                background: "rgba(15,10,40,0.98)", border: "1px solid rgba(99,102,241,0.25)",
                borderRadius: 24, padding: 24, width: "100%", boxSizing: "border-box"
              }} onClick={e => e.stopPropagation()}>
                <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>{selected.icon}</div>
                <h3 style={{ margin: "0 0 4px", textAlign: "center", fontSize: 20, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
                  {selected.name}
                </h3>
                <p style={{ margin: "0 0 16px", textAlign: "center", color: "#64748b", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                  {selected.discount}
                </p>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                  <CoinBadge amount={selected.cost} size="lg" />
                </div>
                <button onClick={() => handleRedeem(selected)} disabled={coins < selected.cost || redeemed.has(selected.id)}
                        style={{
                          width: "100%", padding: 16, borderRadius: 14, border: "none",
                          background: coins >= selected.cost && !redeemed.has(selected.id)
                              ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                              : "rgba(51,65,85,0.4)",
                          color: coins >= selected.cost && !redeemed.has(selected.id) ? "#fff" : "#475569",
                          fontSize: 15, fontWeight: 700, cursor: coins >= selected.cost ? "pointer" : "not-allowed",
                          fontFamily: "'DM Sans', sans-serif",
                        }}>
                  {redeemed.has(selected.id) ? "✓ Redeemed" : coins >= selected.cost ? "Redeem Now" : "Not enough coins"}
                </button>
              </div>
            </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, overflow: "auto", flex: 1 }}>
          {MARKETPLACE_ITEMS.map(item => (
              <div key={item.id} onClick={() => setSelected(item)} style={{
                background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.4)",
                borderRadius: 18, padding: 16, cursor: "pointer",
                opacity: redeemed.has(item.id) ? 0.5 : 1,
                position: "relative", overflow: "hidden"
              }}>
                {redeemed.has(item.id) && (
                    <div style={{
                      position: "absolute", top: 8, right: 8,
                      background: "#10b981", borderRadius: 100, width: 20, height: 20,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11
                    }}>✓</div>
                )}
                <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                  {item.name}
                </div>
                <div style={{
                  display: "inline-block", padding: "3px 8px", borderRadius: 100,
                  background: `${item.color}22`, border: `1px solid ${item.color}44`,
                  fontSize: 10, color: item.color, marginBottom: 10, fontFamily: "'DM Sans', sans-serif"
                }}>
                  {item.discount}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)"
                  }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24", fontFamily: "'Space Mono', monospace" }}>
                {item.cost}
              </span>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

// ─── STATS SCREEN ─────────────────────────────────────────────────────────────
function StatsScreen() {
  const [energyInput, setEnergyInput] = useState(4);
  const [energyData, setEnergyData] = useState(ENERGY_DATA);

  const totalAvoided = WEEKLY_COINS.reduce((a, b) => a + (b.coins > 0 ? 60 : 0), 0);
  const totalCoins = WEEKLY_COINS.reduce((a, b) => a + b.coins, 0);
  const streak = 6;

  const submitEnergy = (val) => {
    setEnergyInput(val);
    setEnergyData(prev => {
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], level: val };
      return copy;
    });
  };

  const StatCard = ({ label, value, unit, color }) => (
      <div style={{
        background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.4)",
        borderRadius: 16, padding: "16px",
      }}>
        <div style={{ fontSize: 11, color: "#475569", letterSpacing: 1, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
          {label}
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: color || "#e2e8f0", fontFamily: "'Space Mono', monospace" }}>
          {value}<span style={{ fontSize: 14, color: "#475569" }}>{unit}</span>
        </div>
      </div>
  );

  return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", gap: 20, overflowY: "auto" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
          Sleep Impact
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <StatCard label="BLUE LIGHT AVOIDED" value={totalAvoided} unit="min" color="#a78bfa" />
          <StatCard label="COINS EARNED" value={totalCoins} unit="✦" color="#fbbf24" />
          <StatCard label="BEST STREAK" value={streak} unit=" nights" color="#34d399" />
          <StatCard label="AVG ENERGY" value={(energyData.reduce((a,b) => a + b.level, 0) / energyData.length).toFixed(1)} unit="/5" color="#60a5fa" />
        </div>

        {/* Coins chart */}
        <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 11, color: "#475569", letterSpacing: 1, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
            COINS EARNED — THIS WEEK
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={WEEKLY_COINS} barSize={22}>
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 10, fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                  contentStyle={{ background: "rgba(15,10,40,0.95)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 10, color: "#e2e8f0" }}
                  labelStyle={{ color: "#a78bfa" }}
              />
              <Bar dataKey="coins" radius={[6, 6, 0, 0]}>
                {WEEKLY_COINS.map((entry, i) => (
                    <Cell key={i} fill={entry.coins > 0 ? "#7c3aed" : "rgba(51,65,85,0.3)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Energy chart */}
        <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 11, color: "#475569", letterSpacing: 1, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
            MORNING ENERGY LEVELS
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={energyData} barSize={22}>
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 5]} />
              <Bar dataKey="level" radius={[6, 6, 0, 0]}>
                {energyData.map((entry, i) => (
                    <Cell key={i} fill={`hsl(${entry.level * 30 + 120}, 60%, 50%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Log today's energy */}
          <div style={{ marginTop: 12, borderTop: "1px solid rgba(51,65,85,0.4)", paddingTop: 12 }}>
            <div style={{ fontSize: 11, color: "#475569", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
              Log today's morning energy:
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} onClick={() => submitEnergy(v)} style={{
                    width: 40, height: 40, borderRadius: 12, border: "none",
                    background: energyInput === v ? "rgba(99,102,241,0.3)" : "rgba(51,65,85,0.3)",
                    color: energyInput === v ? "#a78bfa" : "#64748b",
                    fontSize: 16, cursor: "pointer", fontWeight: 700
                  }}>
                    {["😴", "😐", "🙂", "😊", "⚡"][v - 1]}
                  </button>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────────────────────
function ProfileScreen({ coins, onReset }) {
  const rows = [
    { icon: "🏆", label: "Level", value: "Lunar Apprentice", color: "#a78bfa" },
    { icon: "🌙", label: "Total Nights", value: "24", color: "#60a5fa" },
    { icon: "✦", label: "Lifetime Coins", value: "1,840", color: "#fbbf24" },
    { icon: "🔥", label: "Best Streak", value: "9 nights", color: "#f97316" },
  ];
  return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", gap: 20 }}>
        {/* Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, border: "3px solid rgba(99,102,241,0.3)",
            boxShadow: "0 0 30px rgba(99,102,241,0.3)"
          }}>🌙</div>
          <div>
            <h3 style={{ margin: "0 0 2px", textAlign: "center", fontSize: 20, fontWeight: 800, color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
              Helix User
            </h3>
            <p style={{ margin: 0, textAlign: "center", color: "#64748b", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              Joined May 2025
            </p>
          </div>
          <CoinBadge amount={coins} size="lg" />
        </div>

        {/* Stats rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.4)",
                borderRadius: 14, padding: "14px 16px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{row.icon}</span>
                  <span style={{ fontSize: 14, color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>{row.label}</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: row.color, fontFamily: "'DM Sans', sans-serif" }}>{row.value}</span>
              </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["Notifications", "Privacy", "About Helix"].map((label, i) => (
              <button key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "transparent", border: "none", padding: "10px 0",
                borderBottom: "1px solid rgba(51,65,85,0.3)", cursor: "pointer",
                color: "#64748b", fontSize: 14, fontFamily: "'DM Sans', sans-serif"
              }}>
                <span>{label}</span>
                <ChevronRight size={16} color="#475569" />
              </button>
          ))}
        </div>

        <button onClick={onReset} style={{
          padding: "12px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.25)",
          background: "rgba(239,68,68,0.06)", color: "#f87171",
          fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
        }}>
          Reset Setup
        </button>
      </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function HelixApp() {
  const [configured, setConfigured] = useState(false);
  const [config, setConfig] = useState({ bedtime: "22:30", duration: 60 });
  const [tab, setTab] = useState("home");
  const [coins, setCoins] = useState(420);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  const sessionTotal = config.duration * 60;
  const { penalized, warningVisible, resetPenalty } = useVisibilityTracking(sessionActive);

  // Countdown tick
  useEffect(() => {
    if (!sessionActive) return;
    setSessionSeconds(sessionTotal);
    const id = setInterval(() => {
      setSessionSeconds(prev => {
        if (prev <= 1) {
          setSessionActive(false);
          if (!penalized) setCoins(c => c + config.duration);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [sessionActive]);

  // Rotate facts
  useEffect(() => {
    if (!sessionActive) return;
    const id = setInterval(() => setFactIndex(i => i + 1), 20000);
    return () => clearInterval(id);
  }, [sessionActive]);

  const handleStart = () => {
    resetPenalty();
    setSessionActive(true);
  };

  const handleStop = () => {
    setSessionActive(false);
    if (!penalized) {
      const elapsed = sessionTotal - sessionSeconds;
      const earned = Math.floor((elapsed / sessionTotal) * config.duration);
      if (earned > 0) setCoins(c => c + earned);
    }
  };

  const handleRedeem = (cost) => setCoins(c => c - cost);

  const screenProps = { coins, config };

  return (
      <div style={{
        width: "100%", maxWidth: 420, margin: "0 auto",
        minHeight: "100vh", height: "100%",
        background: "linear-gradient(170deg, #0a0618 0%, #0f0a28 40%, #0a1628 100%)",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Ambient orbs */}
        <div style={{
          position: "absolute", width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          top: -80, right: -60, pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          bottom: 100, left: -60, pointerEvents: "none"
        }} />

        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

        {!configured ? (
            <SetupWizard onComplete={(cfg) => { setConfig(cfg); setConfigured(true); }} />
        ) : (
            <>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
                {tab === "home" && (
                    <HomeScreen
                        {...screenProps}
                        onStart={handleStart}
                        sessionActive={sessionActive}
                        sessionSeconds={sessionSeconds}
                        sessionTotal={sessionTotal}
                        onStop={handleStop}
                        penalized={penalized}
                        warningVisible={warningVisible}
                        factIndex={factIndex}
                    />
                )}
                {tab === "shop" && <ShopScreen coins={coins} onRedeem={handleRedeem} />}
                {tab === "stats" && <StatsScreen />}
                {tab === "profile" && <ProfileScreen coins={coins} onReset={() => setConfigured(false)} />}
              </div>
              <TabBar active={tab} onChange={setTab} />
            </>
        )}
      </div>
  );
}