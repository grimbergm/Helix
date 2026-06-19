import { useState, useEffect, useRef, useCallback } from "react";
import { Moon, Star, Coins, ShoppingBag, BarChart2, User, Flame, Zap, Award, ChevronRight, Check, ArrowLeft, Sun, Coffee, Leaf, Heart, Clock, TrendingUp, Calendar, Bell, Settings, Gift, X, Play, Pause, SkipForward, Battery, Wifi, Signal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import helixLogo from "./assets/Helix_logo.jpeg";

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
    { id: 1, name: "Yoga Mat Pro", discount: "20% OFF", cost: 150, icon: "🧘", category: "Wellness", color: "#a39171" },
    { id: 2, name: "Green Tea Bundle", discount: "FREE sample", cost: 80, icon: "🍵", category: "Nutrition", color: "#059669" },
    { id: 3, name: "Silk Pillow", discount: "50% OFF", cost: 300, icon: "🛏️", category: "Sleep", color: "#db2777" },
    { id: 4, name: "Lavender Mist", discount: "30% OFF", cost: 120, icon: "🌿", category: "Aromatherapy", color: "#a39171" },
    { id: 5, name: "Herbal Snack Box", discount: "1 FREE box", cost: 200, icon: "🌰", category: "Nutrition", color: "#d97706" },
    { id: 6, name: "Sleep Mask", discount: "40% OFF", cost: 90, icon: "😴", category: "Sleep", color: "#5d2e0a" },
    { id: 7, name: "Meditation App", discount: "3 months FREE", cost: 250, icon: "🧠", category: "Wellness", color: "#a39171" },
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

// ─── WELCOME SCREEN ───────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }) {
    return (
        <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#522E1E",
            height: "100vh",
            padding: "24px",
            textAlign: "center"
        }}>
            <div style={{ marginBottom: "40px" }}>
                <img
                    src={helixLogo}
                    alt="Helix Logo"
                    style={{ width: "240px", height: "auto" }}
                />
            </div>

            <button
                onClick={onNext}
                style={{
                    padding: "16px 48px",
                    borderRadius: "30px",
                    border: "1px solid #a39171",
                    background: "transparent",
                    color: "#e5d3b3",
                    fontSize: "18px",
                    fontFamily: "'Playfair Display', serif",
                    cursor: "pointer",
                    marginTop: "20px"
                }}
            >
                Start Journey
            </button>
        </div>
    );
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
                        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8b4513" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx={cx} cy={cy} r={r + 18} fill="url(#moonGlow)" />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(163, 145, 113,0.15)" strokeWidth="3" />
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
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#e5d3b3" />
                    </linearGradient>
                </defs>
                <circle cx={cx} cy={cy} r={60 * (0.3 + progress * 0.7)}
                        fill={`rgba(212,175,55,${0.08 + progress * 0.15})`} />
                <circle cx={cx} cy={cy} r={44 * (0.3 + progress * 0.7)}
                        fill={`rgba(212,175,55,${0.12 + progress * 0.18})`} />
                <circle cx={cx} cy={cy} r={32} fill={`rgba(212,175,55,${0.15 + progress * 0.5})`} />
                <circle cx={cx - 10} cy={cy - 5} r={22} fill="rgba(26, 15, 10, 0.95)" />
                {[[-28, -32], [30, -28], [36, 20], [-34, 18]].map(([dx, dy], i) => (
                    <circle key={i} cx={cx + dx} cy={cy + dy} r={1.5 + Math.sin(i) * 0.5}
                            fill={`rgba(229, 211, 179,${0.3 + progress * 0.6})`} />
                ))}
            </svg>
            <div style={{
                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 2
            }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: "rgba(229, 211, 179, 0.6)", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{phase}</div>
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
                fontFamily: "'Playfair Display', serif",
                fontSize: 52,
                fontWeight: 550,
                color: "#e5d3b3",
                letterSpacing: 2,
                lineHeight: 1
            }}>
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 12, color: "rgba(163, 145, 113, 0.6)", marginTop: 6, letterSpacing: 1 }}>
                REMAINING
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
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(139, 69, 19, 0.08))",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            borderRadius: 100,
            padding: isLg ? "8px 18px" : "4px 10px",
        }}>
            <div style={{
                width: isLg ? 22 : 14, height: isLg ? 22 : 14,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4af37, #b8860b)",
                display: "flex", alignItems: "center", justifyContent: "center"
            }}>
                <span style={{ fontSize: isLg ? 12 : 8 }}>✦</span>
            </div>
            <span style={{
                fontSize: isLg ? 20 : 13, fontWeight: 300,
                color: "#d4af37", fontFamily: "'Inter', sans-serif"
            }}>{amount}</span>
            {isLg && <span style={{ fontSize: 11, color: "#a39171", fontWeight: "500", letterSpacing: 1.5, marginLeft: "6px" }}>COINS</span>}
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
            background: "rgba(26, 15, 10, 0.98)",
            borderTop: "1px solid rgba(163, 145, 113, 0.15)",
            backdropFilter: "blur(20px)",
            padding: "10px 0 6px",
        }}>
            {tabs.map(({ id, icon: Icon, label }) => {
                const isActive = active === id;
                return (
                    <button key={id} onClick={() => onChange(id)} style={{
                        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                        gap: 4, border: "none", background: "transparent", cursor: "pointer",
                    }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: isActive ? "rgba(163, 145, 113, 0.15)" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.3s",
                        }}>
                            <Icon size={20} color={isActive ? "#e5d3b3" : "rgba(163, 145, 113, 0.4)"} />
                        </div>
                        <span style={{
                            fontSize: 10, fontWeight: isActive ? 400 : 300, letterSpacing: 1,
                            color: isActive ? "#e5d3b3" : "rgba(163, 145, 113, 0.4)",
                            fontFamily: "'Inter', sans-serif",
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
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxSizing: "border-box",
                    padding: "0 10px" }}>
                    <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)}
                           style={{
                               background: "rgba(44, 24, 16, 0.4)",
                               border: "1px solid rgba(163, 145, 113, 0.2)",
                               borderRadius: 16, padding: "20px", fontSize: 42,
                               color: "#e5d3b3", fontFamily: "'Playfair Display', serif",
                               outline: "none", textAlign: "center", width: "100%", boxSizing: "border-box", display: "block",
                               margin: "0 auto"
                           }} />
                </div>
            )
        },
        {
            title: "Wind-down window",
            sub: "How long before bed to unplug?",
            content: (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[30, 60, 90].map(d => (
                        <button key={d} onClick={() => setDuration(d)} style={{
                            padding: "20px", borderRadius: 16,
                            background: duration === d ? "rgba(163, 145, 113, 0.15)" : "rgba(163, 145, 113, 0.04)",
                            border: `1px solid ${duration === d ? "rgba(163, 145, 113, 0.4)" : "rgba(163, 145, 113, 0.1)"}`,
                            color: duration === d ? "#e5d3b3" : "#a39171",
                            fontSize: 16, fontWeight: 300, cursor: "pointer",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            fontFamily: "'Inter', sans-serif",
                        }}>
                            <span>{d} minutes</span>
                            {duration === d && <Check size={18} color="#e5d3b3" />}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "You're all set ✦",
            sub: "Helix will reward your rest",
            content: (
                <div style={{display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "32px",
                    padding: "20px 0",
                    width: "100%"}}>
                    <div style={{ fontSize: 64, lineHeight: 1 }}>🌙</div>
                    <div style={{color: "#a39171",
                        fontSize: 15,
                        lineHeight: "1.6",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                        marginBottom: "12px"}}>
                        Your pre-sleep routine starts at<br />
                        <span style={{ color: "#e5d3b3", fontWeight: 400, fontSize: 34, fontFamily: "'Playfair Display', serif", display: "block", letterSpacing: "1px" }}>
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
        <div style={{
            padding: "40px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            height: "100%",
            boxSizing: "border-box",
            flex: 1
        }}>
            {/* Barra de progreso */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 10 }}>
                {/* ... mapping de los puntitos */}
            </div>

            {/* Bloque de Título y Subtítulo */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <h2 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 400, color: "#e5d3b3", fontFamily: "'Playfair Display', serif" }}>
                    {steps[step].title}
                </h2>
                <p style={{ margin: 0, color: "#a39171", fontSize: 14, fontWeight: "500", letterSpacing: "0.5px" }}>
                    {steps[step].sub}
                </p>
            </div>

            {/* Bloque Central - Input de hora o botones */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "40px 0"
            }}>
                <div style={{ width: "100%" }}>{steps[step].content}</div>
            </div>

            {/* Botón de acción */}
            <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete({ bedtime, duration })}
                    style={{
                        padding: "18px", borderRadius: 16, cursor: "pointer",
                        background: "linear-gradient(135deg, #5d2e0a 0%, #3d1f07 100%)",
                        border: "1px solid rgba(229, 211, 179, 0.2)",
                        color: "#e5d3b3",
                        fontFamily: "'Playfair Display', serif",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        fontSize: 14,
                        width: "100%",
                        marginTop: "auto"
                    }}>
                {step < steps.length - 1 ? "Next Step" : "Begin Routine ✦"}
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: 11, color: "#a39171", letterSpacing: 2, textTransform: "uppercase" }}>Pre-sleep Routine</div>
                        <div style={{ fontSize: 16, fontWeight: 300, color: "#e5d3b3" }}>
                            {penalized ? <span style={{ color: "#f87171" }}>Penalized ✗</span> : "Active ✦"}
                        </div>
                    </div>
                    <CoinBadge amount={Math.floor(progress * config.duration)} />
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
                    <BreathingRing progress={progress} phase={breathPhase} />
                    <CountdownTimer seconds={sessionSeconds} total={sessionTotal} />
                </div>

                <div style={{
                    background: "rgba(44, 24, 16, 0.4)",
                    border: "1px solid rgba(163, 145, 113, 0.1)",
                    borderRadius: 20, padding: "18px"
                }}>
                    <div style={{ fontSize: 10, color: "#a39171", letterSpacing: 2, marginBottom: 8 }}>EVENING FACT 💡</div>
                    <p style={{ margin: 0, fontSize: 14, color: "#e5d3b3", lineHeight: 1.6, fontFamily: "'Inter', sans-serif", fontWeight: 200 }}>{fact}</p>
                </div>

                <button onClick={onStop} style={{
                    padding: "16px", borderRadius: 16, border: "1px solid rgba(239,68,68,0.2)",
                    background: "rgba(239,68,68,0.05)", color: "#f87171",
                    fontSize: 13, textTransform: "uppercase", letterSpacing: 2
                }}>
                    End Routine
                </button>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px 24px", gap: 24 }}>
            <div>
                <div style={{ fontSize: 14, color: "#a39171", fontFamily: "'Inter', sans-serif", fontWeight: 550  }}>Good evening 🌙</div>
                <h1 style={{ margin: "6px 0 0", fontSize: 34, fontWeight: 550, color: "#e5d3b3", fontFamily: "'Playfair Display', serif" }}>
                    Ready to Unwind?
                </h1>
            </div>

            <div style={{
                background: "rgba(44, 24, 16, 0.6)",
                border: "1px solid rgba(163, 145, 113, 0.15)",
                borderRadius: 24, padding: "24px",
            }}>
                <div style={{ fontSize: 11, color: "#a39171", letterSpacing: 2, marginBottom: 10, fontWeight: 550 }}>YOUR BALANCE
                </div>
                <CoinBadge amount={coins} size="lg" />
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {STREAK_DATA.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{
                            width: "100%", aspectRatio: "1", borderRadius: 12,
                            background: d.done ? "rgba(163, 145, 113, 0.15)" : "rgba(44, 24, 16, 0.4)",
                            border: `1px solid ${d.done ? "rgba(163, 145, 113, 0.3)" : "rgba(163, 145, 113, 0.1)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#d4af37"
                        }}>
                            {d.done ? "✦" : ""}
                        </div>
                        <span style={{ fontSize: 10, color: "#a39171", fontWeight: "600",
                            letterSpacing: "0.5px" }}>{d.day}</span>
                    </div>
                ))}
            </div>

            {/* Config info */}
            <div style={{
                background: "rgba(44, 24, 16, 0.6)", border: "1px solid rgba(51,65,85,0.4)",
                borderRadius: 16, padding: "14px 16px",
                display: "flex", justifyContent: "space-between"
            }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#a39171", fontWeight: "600", letterSpacing: "1px", fontFamily: "'Inter', sans-serif" }}>BEDTIME</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#e5d3b3", fontFamily: "'Space Mono', monospace" }}>
                        {config.bedtime}
                    </div>
                </div>

                <div style={{ width: 1, background: "rgba(163, 145, 113, 0.2)" }} />

                <div style={{ textAlign: "center" }}>
                    {/* Update WIND-DOWN label */}
                    <div style={{ fontSize: 10, color: "#a39171", fontWeight: "600", letterSpacing: "1px", fontFamily: "'Inter', sans-serif" }}>WIND-DOWN</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#e5d3b3", fontFamily: "'Space Mono', monospace" }}>
                        {config.duration}m
                    </div>
                </div>

                <div style={{ width: 1, background: "rgba(163, 145, 113, 0.2)" }} />

                <div style={{ textAlign: "center" }}>
                    {/* Update REWARD label */}
                    <div style={{ fontSize: 10, color: "#a39171", fontWeight: "600", letterSpacing: "1px", fontFamily: "'Inter', sans-serif" }}>REWARD</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fbbf24", fontFamily: "'Space Mono', monospace" }}>
                        +{config.duration}✦
                    </div>
                </div>
            </div>


            <div style={{ flex: 1 }} />

            <button onClick={onStart} style={{
                padding: "20px", borderRadius: 20, border: "1px solid rgba(229, 211, 179, 0.2)", cursor: "pointer",
                background: "linear-gradient(135deg, #5d2e0a 0%, #3d1f07 100%)",
                color: "#e5d3b3", fontSize: 15, fontFamily: "'Playfair Display', serif",
                textTransform: "uppercase", letterSpacing: "3px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}>
                Start Pre-sleep Routine ✦
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
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px" }}>
            <div style={{ marginBottom: 20 }}>
                <h2 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 550, color: "#e5d3b3", fontFamily: "'Playfair Display', serif" }}>
                    Wellness Market
                </h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, color: "#a39171", fontSize: 14 }}>Redeem your HELIX coins</p>
                    <CoinBadge amount={coins} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, overflow: "auto", flex: 1 }}>
                {MARKETPLACE_ITEMS.map(item => (
                    <div key={item.id} onClick={() => setSelected(item)} style={{
                        background: "rgba(44, 24, 16, 0.4)", border: "1px solid rgba(163, 145, 113, 0.15)",
                        borderRadius: 20, padding: "18px", cursor: "pointer",
                        opacity: redeemed.has(item.id) ? 0.4 : 1,
                    }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 550, color: "#e5d3b3", marginBottom: 6 }}>
                            {item.name}
                        </div>
                        <div style={{
                            display: "inline-block", padding: "4px 10px", borderRadius: 100,
                            background: `rgba(163, 145, 113, 0.1)`, border: `1px solid rgba(163, 145, 113, 0.2)`,
                            fontSize: 10, color: "#a39171", marginBottom: 12
                        }}>
                            {item.discount}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#d4af37" }} />
                            <span style={{ fontSize: 14, fontWeight: 200, color: "#d4af37" }}>{item.cost}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── STATS SCREEN ─────────────────────────────────────────────────────────────
function StatsScreen({ sleepStartTime, setSleepStartTime, setCoins }) {
    const [energyInput, setEnergyInput] = useState(4);
    const [energyData, setEnergyData] = useState(ENERGY_DATA);
    const [earnedTonight, setEarnedTonight] = useState(0);

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

        if (sleepStartTime) {
            const wakeTime = new Date();
            const differenceInMs = wakeTime - sleepStartTime;
            const hoursSlept = differenceInMs / (1000 * 60 * 60);
            const coinsEarned = Math.max(1, Math.floor(hoursSlept * 50));

            setCoins(prevCoins => prevCoins + coinsEarned);
            setEarnedTonight(coinsEarned);
            setSleepStartTime(null);
        }
    };

    const StatCard = ({ label, value, unit }) => (
        <div style={{
            background: "rgba(44, 24, 16, 0.5)",
            border: "1px solid rgba(163, 145, 113, 0.15)",
            borderRadius: "20px",
            padding: "18px",
            boxSizing: "border-box"
        }}>
            {/* 🌟 AQUÍ CORREGIMOS EL INPUT DE COLOR ELIMINANDO EL !IMPORTANT SINTÁCTICO 🌟 */}
            <div style={{
                fontSize: "11px",
                color: "#a39171",
                fontWeight: "600",
                letterSpacing: "1.5px",
                marginBottom: "8px",
                fontFamily: "'Inter', sans-serif",
                display: "block"
            }}>
                {label}
            </div>

            <div style={{ fontSize: "24px", fontWeight: "400", color: "#e5d3b3", fontFamily: "'Playfair Display', serif" }}>
                {value}<span style={{ fontSize: "12px", color: "#a39171", marginLeft: "4px" }}>{unit}</span>
            </div>
        </div>
    );

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px", gap: 20, overflowY: "auto" }}>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 550, color: "#e5d3b3", fontFamily: "'Playfair Display', serif" }}>Sleep Impact</h2>

            {earnedTonight > 0 && (
                <div style={{
                    background: "rgba(212, 175, 55, 0.1)", border: "1px solid #d4af37",
                    borderRadius: 16, padding: "14px", color: "#e5d3b3", textAlignment: "center",
                    fontFamily: "'Playfair Display', serif", letterSpacing: "1px"
                }}>
                    ✨ MORNING HARVEST: +{earnedTonight} HELIX COINS ADDED TO YOUR WALLET
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <StatCard label="BLUE LIGHT AVOIDED" value={totalAvoided} unit="min" />
                <StatCard label="HELIX COINS EARNED" value={totalCoins} unit="✦" />
                <StatCard label="BEST STREAK" value={streak} unit=" nights" />
                <StatCard label="AVG ENERGY" value={(energyData.reduce((a,b) => a + b.level, 0) / energyData.length).toFixed(1)} unit="/5" />
            </div>

            {/* Coins Chart */}
            <div style={{ background: "rgba(44, 24, 16, 0.4)", border: "1px solid rgba(163, 145, 113, 0.1)", borderRadius: "20px", padding: "20px", height: "220px", boxSizing: "border-box" }}>

                {/* 🌟 TEXTO SÓLIDO EN LUGAR DE SINTAXIS CSS PRORROTIADA 🌟 */}
                <div style={{
                    fontSize: "11px",
                    color: "#a39171",
                    fontWeight: "600",
                    marginBottom: "20px",
                    letterSpacing: "1.5px",
                    fontFamily: "'Inter', sans-serif",
                    display: "block"
                }}>
                    COINS EARNED — THIS WEEK
                </div>
                <div style={{ width: '100%', height: 140 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={WEEKLY_COINS}>
                            <XAxis dataKey="day" tick={{ fill: "#a39171", fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: 'rgba(163, 145, 113, 0.05)' }}
                                contentStyle={{ background: "#1a0f0a", border: "1px solid #a39171", borderRadius: 10 }}
                                itemStyle={{ color: "#e5d3b3" }}
                            />
                            <Bar dataKey="coins" radius={[4, 4, 0, 0]}>
                                {WEEKLY_COINS.map((entry, i) => (
                                    <Cell key={i} fill={entry.coins > 0 ? "#a39171" : "rgba(163, 145, 113, 0.1)"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Energy Chart */}
            <div style={{ background: "rgba(44, 24, 16, 0.4)", border: "1px solid rgba(163, 145, 113, 0.1)", borderRadius: "20px", padding: "20px", boxSizing: "border-box" }}>

                {/* 🌟 CORRECCIÓN DEL TÍTULO DE ENERGÍA 🌟 */}
                <div style={{
                    fontSize: "11px",
                    color: "#a39171",
                    fontWeight: "600",
                    marginBottom: "20px",
                    letterSpacing: "1.5px",
                    fontFamily: "'Inter', sans-serif",
                    display: "block"
                }}>
                    MORNING ENERGY LEVELS
                </div>
                <div style={{ width: '100%', height: "100px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={energyData} barSize={22}>
                            <XAxis dataKey="day" tick={{ fill: "#a39171", fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis hide domain={[0, 5]} />
                            <Bar dataKey="level" radius={[6, 6, 0, 0]}>
                                {energyData.map((entry, i) => (
                                    <Cell key={i} fill={entry.level >= 4 ? "#d4af37" : "#a39171"} fillOpacity={0.4 + (entry.level * 0.12)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ marginTop: 20, borderTop: "1px solid rgba(163, 145, 113, 0.15)", paddingTop: 20 }}>
                    <div style={{ fontSize: 11, color: "#a39171", marginBottom: 15, textAlign: 'center', letterSpacing: 1 }}>
                        LOG TODAY'S MORNING ENERGY
                    </div>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                        {[1, 2, 3, 4, 5].map(v => (
                            <button key={v} onClick={() => submitEnergy(v)} style={{
                                width: 45, height: 45, borderRadius: 12, border: energyInput === v ? "1px solid #d4af37" : "1px solid rgba(163, 145, 113, 0.2)",
                                background: energyInput === v ? "rgba(212, 175, 55, 0.1)" : "rgba(44, 24, 16, 0.4)",
                                color: "#e5d3b3",
                                fontSize: 18, cursor: "pointer", transition: 'all 0.3s'
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
        { icon: "🏆", label: "Level", value: "Lunar Apprentice", color: "#e5d3b3" },
        { icon: "🌙", label: "Total Nights", value: "24", color: "#a39171" },
        { icon: "✦", label: "Lifetime Coins", value: "1,840", color: "#fbbf24" },
        { icon: "🔥", label: "Best Streak", value: "9 nights", color: "#f97316" },
    ];
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px", gap: 30 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{
                    width: 90, height: 90, borderRadius: "50%",
                    background: "linear-gradient(135deg, #5d2e0a, #2c1810)", border: "2px solid #a39171",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 42, boxShadow: "0 0 40px rgba(163, 145, 113, 0.2)"
                }}>🌙</div>
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 550, color: "#e5d3b3", fontFamily: "'Playfair Display', serif" }}>Helix User</h3>
                    <p style={{ margin: 0, color: "#a39171", fontSize: 13, letterSpacing: 1 }}>Joined May 2025</p>
                </div>
                <CoinBadge amount={coins} size="lg" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {rows.map((row, i) => (
                    <div key={i} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "rgba(44, 24, 16, 0.6)", border: "1px solid rgba(51,65,85,0.4)",
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
                marginTop: "auto", padding: "14px", borderRadius: 14, border: "1px solid rgba(163, 145, 113, 0.2)",
                background: "transparent", color: "#a39171", fontSize: 12, cursor: "pointer", letterSpacing: 2
            }}>
                RESET SETUP
            </button>
        </div>
    );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function HelixApp() {
    const [showSplash, setShowSplash] = useState(true);
    const [configured, setConfigured] = useState(false);
    const [config, setConfig] = useState({ bedtime: "22:30", duration: 60 });
    const [tab, setTab] = useState("home");
    const [coins, setCoins] = useState(420);
    const [sessionActive, setSessionActive] = useState(false);
    const [sessionSeconds, setSessionSeconds] = useState(0);
    const [factIndex, setFactIndex] = useState(0);

    // Fixed: Properly declared internal component state
    const [sleepStartTime, setSleepStartTime] = useState(null);

    const sessionTotal = config.duration * 60;
    const { penalized, warningVisible, resetPenalty } = useVisibilityTracking(sessionActive);

    useEffect(() => {
        if (!sessionActive) return;
        setSessionSeconds(sessionTotal);
        const id = setInterval(() => {
            setSessionSeconds(prev => {
                if (prev <= 1) {
                    setSessionActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [sessionActive]);

    useEffect(() => {
        if (!sessionActive) return;
        const id = setInterval(() => setFactIndex(i => i + 1), 20000);
        return () => clearInterval(id);
    }, [sessionActive]);

    const handleStart = () => {
        resetPenalty();
        setSessionActive(true);
        setSleepStartTime(new Date());
    };

    const handleStop = () => {
        setSessionActive(false);
    };

    return (
        <div style={{
            width: "100%",
            maxWidth: 420,
            margin: "0 auto",
            minHeight: "100dvh",
            height: "100dvh",
            background: "linear-gradient(170deg, #1a0f0a 0%, #2c1810 40%, #1a0f0a 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden", // Completely blocks page leakage
            fontFamily: "'Inter', sans-serif",
            fontWeight: "200",
            boxSizing: "border-box"
        }}>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@100;300;400&display=swap" rel="stylesheet" />

            {showSplash ? (
                <WelcomeScreen onNext={() => setShowSplash(false)} />
            ) : !configured ? (
                <SetupWizard onComplete={(cfg) => { setConfig(cfg); setConfigured(true); }} />
            ) : (
                <>

                    <div style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "calc(100% - 60px)",
                        overflowY: "auto",
                        WebkitOverflowScrolling: "touch"
                    }}>
                        {tab === "home" && (
                            <HomeScreen
                                config={config} coins={coins} onStart={handleStart} sessionActive={sessionActive}
                                sessionSeconds={sessionSeconds} sessionTotal={sessionTotal} onStop={handleStop}
                                penalized={penalized} factIndex={factIndex}
                            />
                        )}
                        {tab === "shop" && <ShopScreen coins={coins} onRedeem={(cost) => setCoins(c => c - cost)} />}
                        {tab === "stats" && (
                            <StatsScreen
                                sleepStartTime={sleepStartTime}
                                setSleepStartTime={setSleepStartTime}
                                setCoins={setCoins}
                            />
                        )}
                        {tab === "profile" && <ProfileScreen coins={coins} onReset={() => setConfigured(false)} />}
                    </div>
                    <TabBar active={tab} onChange={setTab} />
                </>
            )}
        </div>
    );
}