"use client";

import { useState, useEffect } from "react";
import {
    ShoppingBag,
    Send,
    Plus,
    Leaf,
    Sparkles,
    MessageSquare,
    Heart,
    Zap,
    Shield,
    Sun,
    MapPin,
    Phone,
    Clock,
    Camera,
    Smile,
    Activity,
    X,
    Minus,
    Trash2,
    Loader2,
    CheckCircle2,
    CreditCard,
    Wallet,
    QrCode,
    ChevronRight,
    Moon,
    Brain,
    CloudRain,
    Lock,
} from "lucide-react";

export default function VibeJuice() {
    // ============ STATE MANAGEMENT ============
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userName, setUserName] = useState("Tamu");
    const [userAvatar, setUserAvatar] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginInput, setLoginInput] = useState("");
    const [isGoogleSimOpen, setIsGoogleSimOpen] = useState(false);
    const [googleSimLoading, setGoogleSimLoading] = useState(false);
    const [customGoogleEmail, setCustomGoogleEmail] = useState("");
    const [customGoogleName, setCustomGoogleName] = useState("");
    const [showCustomGoogleForm, setShowCustomGoogleForm] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [selectedMood, setSelectedMood] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const [expandedItem, setExpandedItem] = useState(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [isPaymentSelectionOpen, setIsPaymentSelectionOpen] = useState(false);
    const [isQrisOpen, setIsQrisOpen] = useState(false);
    const [isTransferOpen, setIsTransferOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [orderType, setOrderType] = useState("Dine-in");
    const [tableNumber, setTableNumber] = useState("");
    const [itemToCustomize, setItemToCustomize] = useState(null);
    const [sugarLevel, setSugarLevel] = useState("Normal");
    const [iceLevel, setIceLevel] = useState("Normal");
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [hoveredStar, setHoveredStar] = useState(0);
    const [reviews, setReviews] = useState([
        { id: 1, name: "Alya R.", rating: 5, comment: "Jus-nya segar banget! Rekomendasi dari AI-nya tepat sekali, cocok sama kondisi saya hari itu. Bakal balik lagi!", orderType: "Dine-in", time: "2 jam lalu" },
        { id: 2, name: "Dimas P.", rating: 5, comment: "Konsep JuiceVibe ini keren banget. AI consultant-nya benar-benar ngerti kebutuhan tubuh saya. Green Spinach-nya top!", orderType: "Takeaway", time: "5 jam lalu" },
        { id: 3, name: "Sari M.", rating: 4, comment: "Crimson Comfort-nya recommended banget buat yang lagi PMS. Rasanya enak dan efeknya kerasa. Terima kasih JuiceVibe!", orderType: "Dine-in", time: "1 hari lalu" },
    ]);
    const [isUpsellOpen, setIsUpsellOpen] = useState(false);
    const [upsellSuggestion, setUpsellSuggestion] = useState(null);
    const [isLoadingUpsell, setIsLoadingUpsell] = useState(false);

    // ============ VIBE ANALYTICS & HEALTH SCORE STATE ============
    const [vibeScores, setVibeScores] = useState({
        energy: 78,
        calmness: 82,
        detox: 85,
    });
    const [vibeHistory, setVibeHistory] = useState([
        { date: "Senin", mood: "Lelah", score: 68 },
        { date: "Selasa", mood: "Stres", score: 72 },
        { date: "Rabu", mood: "Cemas", score: 78 },
        { date: "Hari Ini", mood: "Segar", score: 81 },
    ]);
    const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
    const [aiIsTyping, setAiIsTyping] = useState(false);
    const [lastUserMessage, setLastUserMessage] = useState("");
    const [isCartAnimating, setIsCartAnimating] = useState(false);

    // Google Client ID - Ganti dengan Google Client ID asli Anda jika ingin menghubungkan dengan Google Console asli
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

    // Helper decode JWT Google token
    const decodeJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Gagal mendecode JWT token Google:", e);
            return null;
        }
    };

    // Muat script Google Identity Services SDK secara dinamis
    useEffect(() => {
        if (typeof window !== "undefined") {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            return () => {
                const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
            };
        }
    }, []);

    const triggerGoogleSignIn = () => {
        if (typeof window !== "undefined" && window.google && GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID") {
            try {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response) => {
                        const payload = decodeJwt(response.credential);
                        if (payload) {
                            setUserName(payload.name);
                            setUserAvatar(payload.picture);
                            setUserEmail(payload.email);
                            setIsLoginOpen(false);
                            showToast(`Selamat datang, ${payload.name}!`);
                        }
                    }
                });

                const client = window.google.accounts.oauth2.initTokenClient({
                    client_id: GOOGLE_CLIENT_ID,
                    scope: 'openid profile email',
                    callback: async (tokenResponse) => {
                        if (tokenResponse && tokenResponse.access_token) {
                            try {
                                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                                });
                                const data = await res.json();
                                if (data) {
                                    setUserName(data.name || data.given_name);
                                    setUserAvatar(data.picture);
                                    setUserEmail(data.email);
                                    setIsLoginOpen(false);
                                    showToast(`Selamat datang, ${data.name || data.given_name}!`);
                                }
                            } catch (err) {
                                console.error("Error fetching userinfo:", err);
                                runGoogleSimulation();
                            }
                        }
                    }
                });
                client.requestAccessToken();
            } catch (err) {
                console.error("Gagal memulai Google Auth:", err);
                runGoogleSimulation();
            }
        } else {
            runGoogleSimulation();
        }
    };

    const runGoogleSimulation = () => {
        setIsLoginOpen(false);
        setIsGoogleSimOpen(true);
    };

    const handleSelectSimAccount = (name, email, avatar) => {
        setGoogleSimLoading(true);
        setTimeout(() => {
            setUserName(name);
            setUserAvatar(avatar);
            setUserEmail(email);
            setGoogleSimLoading(false);
            setIsGoogleSimOpen(false);
            showToast(`Berhasil masuk sebagai ${name} via Google!`);
        }, 1200);
    };

    const moodScores = {
        "Stres Tugas": { energy: 45, calmness: 35, detox: 60 },
        "Kurang Tidur": { energy: 30, calmness: 55, detox: 50 },
        "Bad Mood": { energy: 50, calmness: 40, detox: 70 },
        "Butuh Energi": { energy: 40, calmness: 70, detox: 65 },
        "Nyeri Haid": { energy: 35, calmness: 45, detox: 55 }
    };

    // --- PERSISTENCE LOAD ---
    useEffect(() => {
        const cachedScores = localStorage.getItem("juicevibe_scores");
        const cachedHistory = localStorage.getItem("juicevibe_history");
        if (cachedScores) {
            setVibeScores(JSON.parse(cachedScores));
        }
        if (cachedHistory) {
            setVibeHistory(JSON.parse(cachedHistory));
        }
    }, []);

    const updateVibeScores = (newScores, moodLabel) => {
        setVibeScores(newScores);
        localStorage.setItem("juicevibe_scores", JSON.stringify(newScores));

        const avgScore = Math.round((newScores.energy + newScores.calmness + newScores.detox) / 3);
        const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const todayName = dayNames[new Date().getDay()];

        setVibeHistory((prev) => {
            const updated = [...prev];
            if (updated.length >= 5) {
                updated.shift();
            }
            updated.push({
                date: todayName,
                mood: moodLabel || "Curhat AI",
                score: avgScore
            });
            localStorage.setItem("juicevibe_history", JSON.stringify(updated));
            return updated;
        });
    };

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleDownloadPrescription = () => {
        try {
            const canvas = document.createElement("canvas");
            canvas.width = 480;
            canvas.height = 700;
            const ctx = canvas.getContext("2d");

            // Fill background white
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Green header block
            ctx.fillStyle = "#064e3b";
            ctx.fillRect(0, 0, canvas.width, 140);

            // Header titles
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.font = "bold 22px Arial, sans-serif";
            ctx.fillText("Resep Vibe-Check AI", canvas.width / 2, 60);

            ctx.font = "bold 11px Arial, sans-serif";
            ctx.fillStyle = "#34d399";
            ctx.fillText("JUICEVIBE AI WELLNESS CLINIC", canvas.width / 2, 90);

            // Metadata labels & values
            ctx.fillStyle = "#1e293b";
            ctx.textAlign = "left";

            ctx.font = "bold 9px Arial, sans-serif";
            ctx.fillStyle = "#94a3b8";
            ctx.fillText("NAMA PEMESAN", 40, 185);
            ctx.textAlign = "right";
            ctx.fillText("TANGGAL PERIKSA", canvas.width - 40, 185);

            const clientName = customerName || userName;
            const today = new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

            ctx.fillStyle = "#334155";
            ctx.font = "bold 13px Arial, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(clientName, 40, 208);
            ctx.textAlign = "right";
            ctx.fillText(today, canvas.width - 40, 208);

            // Dashed Divider line
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 3]);
            ctx.beginPath();
            ctx.moveTo(40, 230);
            ctx.lineTo(canvas.width - 40, 230);
            ctx.stroke();
            ctx.setLineDash([]); // reset

            // Health Indexes labels
            ctx.textAlign = "left";
            ctx.font = "bold 9px Arial, sans-serif";
            ctx.fillStyle = "#94a3b8";
            ctx.fillText("PETA INDEKS KESEHATAN", 40, 255);

            // Stamina, Ketenangan, Detoks boxes
            const drawScoreBox = (x, label, val, colorHex) => {
                ctx.fillStyle = "#f0fdf4";
                ctx.strokeStyle = "#d1fae5";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x, 270, 120, 75, 12);
                } else {
                    ctx.rect(x, 270, 120, 75);
                }
                ctx.fill();
                ctx.stroke();

                ctx.textAlign = "center";
                ctx.font = "bold 10px Arial, sans-serif";
                ctx.fillStyle = "#64748b";
                ctx.fillText(label, x + 60, 298);

                ctx.font = "bold 16px Arial, sans-serif";
                ctx.fillStyle = colorHex;
                ctx.fillText(val, x + 60, 325);
            };

            drawScoreBox(40, "Stamina", `${vibeScores.energy}%`, "#ea580c");
            drawScoreBox(180, "Ketenangan", `${vibeScores.calmness}%`, "#7c3aed");
            drawScoreBox(320, "Detoks", `${vibeScores.detox}%`, "#059669");

            // Diagnosis Box
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#f1f5f9";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(40, 365, canvas.width - 80, 95, 16);
            } else {
                ctx.rect(40, 365, canvas.width - 80, 95);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#059669";
            ctx.font = "bold 10px Arial, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText("✦ DIAGNOSIS BARISTA AI", 55, 392);

            ctx.fillStyle = "#475569";
            ctx.font = "italic 11px Arial, sans-serif";
            const diagnosis = recommendation ? (recommendation.autoAddMessage || recommendation.description) : "Berdasarkan taksiran rekam jejak, tubuh Anda memerlukan asupan vitamin harian untuk mengembalikan vitalitas optimal.";

            // Wrap text function
            const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
                const words = text.split(" ");
                let line = "";
                for (let n = 0; n < words.length; n++) {
                    let testLine = line + words[n] + " ";
                    let metrics = context.measureText(testLine);
                    let testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        context.fillText(line, x, y);
                        line = words[n] + " ";
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                context.fillText(line, x, y);
            };
            wrapText(ctx, `"${diagnosis}"`, 55, 415, canvas.width - 110, 16);

            // Recommendation Box
            ctx.fillStyle = "#f0fdf4";
            ctx.strokeStyle = "#d1fae5";
            ctx.lineWidth = 2;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(40, 480, canvas.width - 80, 75, 16);
            } else {
                ctx.rect(40, 480, canvas.width - 80, 75);
            }
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#059669";
            ctx.font = "bold 9px Arial, sans-serif";
            ctx.fillText("REKOMENDASI JUS UTAMA", 55, 508);

            const juiceName = recommendation ? recommendation.name : "Apel Fuji Murni";
            ctx.fillStyle = "#064e3b";
            ctx.font = "bold 15px Arial, sans-serif";
            ctx.fillText(juiceName, 55, 532);

            // AI badge
            ctx.fillStyle = "#059669";
            ctx.beginPath();
            ctx.arc(canvas.width - 75, 517, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.font = "bold 12px Arial, sans-serif";
            ctx.fillText("AI", canvas.width - 75, 521);

            // Dashed Divider 2
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 3]);
            ctx.beginPath();
            ctx.moveTo(40, 580);
            ctx.lineTo(canvas.width - 40, 580);
            ctx.stroke();
            ctx.setLineDash([]); // reset

            // QR Validation Section
            ctx.fillStyle = "#94a3b8";
            ctx.font = "bold 9px Arial, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText("VERIFIKASI RESEP", 40, 608);

            ctx.fillStyle = "#64748b";
            ctx.font = "normal 8.5px Arial, sans-serif";
            ctx.fillText("Pindai kode QR secara resmi di kasir JuiceVibe untuk", 40, 626);
            ctx.fillText("memvalidasi preskripsi ini secara resmi dengan platform.", 40, 638);

            // Draw QR code icon lookalike in canvas
            const qrX = canvas.width - 88;
            const qrY = 600;
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(qrX, qrY, 48, 48);

            // Outer white areas of QR position blocks
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(qrX + 4, qrY + 4, 14, 14);
            ctx.fillRect(qrX + 30, qrY + 4, 14, 14);
            ctx.fillRect(qrX + 4, qrY + 30, 14, 14);
            ctx.fillRect(qrX + 30, qrY + 30, 14, 14);

            // Inner dark center blocks
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(qrX + 8, qrY + 8, 6, 6);
            ctx.fillRect(qrX + 34, qrY + 8, 6, 6);
            ctx.fillRect(qrX + 8, qrY + 34, 6, 6);

            // Random tiny pixel patterns inside QR
            ctx.fillRect(qrX + 22, qrY + 8, 4, 4);
            ctx.fillRect(qrX + 22, qrY + 16, 4, 4);
            ctx.fillRect(qrX + 16, qrY + 22, 4, 4);
            ctx.fillRect(qrX + 34, qrY + 22, 4, 4);
            ctx.fillRect(qrX + 22, qrY + 34, 4, 4);
            ctx.fillRect(qrX + 30, qrY + 38, 4, 4);

            // Trigger actual download of PNG
            const link = document.createElement("a");
            link.download = `Resep-JuiceVibe-${clientName.replace(/\s+/g, "-")}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();

            showToast("Kartu preskripsi kesehatan Anda berhasil diunduh!");
            setIsPrescriptionOpen(false);
        } catch (error) {
            console.error(error);
            showToast("Gagal mengunduh preskripsi, silakan coba lagi.");
        }
    };

    // --- SCROLL REVEAL ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                }
            }),
            { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // ============ MOCK DATA ============
    const moodOptions = [
        { icon: Brain, label: "Stres Tugas", mood: "stress", color: "text-purple-500" },
        { icon: Moon, label: "Kurang Tidur", mood: "tired", color: "text-blue-400" },
        { icon: CloudRain, label: "Bad Mood", mood: "badmood", color: "text-slate-500" },
        { icon: Zap, label: "Butuh Energi", mood: "energy", color: "text-orange-500" },
        { icon: Heart, label: "Nyeri Haid", mood: "pms", color: "text-rose-400" },
    ];
    const comboMenu = [
        // 1. Anti-Stress & Mood Booster
        {
            id: 1,
            name: "Berry-Calm Smoothie",
            category: "Anti-Stress",
            moodTag: "Stres Tugas",
            ingredients: "Strawberry, Blueberry, Susu Almond, Madu",
            benefits: "Kaya antioksidan dan vitamin C yang membantu menurunkan hormon kortisol (stres) serta menenangkan sistem saraf.",
            price: 28000,
            icon: Heart,
            color: "bg-rose-950/40 border-rose-900/50 text-rose-300"
        },
        {
            id: 2,
            name: "Matcha-Zen Cooler",
            category: "Anti-Stress",
            moodTag: "Bad Mood",
            ingredients: "Bubuk Matcha Pure, Melon Hijau, Air Kelapa",
            benefits: "Kandungan L-Theanine merangsang gelombang alfa di otak, menciptakan rasa rileks mendalam tanpa bikin ngantuk.",
            price: 30000,
            icon: Smile,
            color: "bg-emerald-950/40 border-emerald-900/50 text-emerald-300"
        },
        {
            id: 3,
            name: "Sweet Serenity Pulse",
            category: "Anti-Stress",
            moodTag: "Bad Mood",
            ingredients: "Pisang, Kurma, Oat, Susu Rendah Lemak",
            benefits: "Mengandung triptofan tinggi yang diubah tubuh menjadi serotonin (hormon kebahagiaan). Cocok untuk memperbaiki suasana hati.",
            price: 26000,
            icon: Smile,
            color: "bg-amber-950/40 border-amber-900/50 text-amber-300"
        },

        // 2. Mental Focus & Brain Power
        {
            id: 4,
            name: "Citrus Focus Pulse",
            category: "Focus",
            moodTag: "Butuh Fokus",
            ingredients: "Jeruk Sunkist, Wortel, Jahe Merah",
            benefits: "Kombinasi beta-karoten dan sirkulasi hangat dari jahe melancarkan aliran darah ke otak untuk mempertajam daya ingat.",
            price: 27000,
            icon: Zap,
            color: "bg-orange-950/40 border-orange-900/50 text-orange-300"
        },
        {
            id: 5,
            name: "Avocortex Cream",
            category: "Focus",
            moodTag: "Butuh Fokus",
            ingredients: "Alpukat, Daun Mint, Susu Cair, Matcha Glaze",
            benefits: "Lemak tak jenuh tunggal menjaga kesehatan sel otak, didukung mint segar yang langsung mengusir kantuk dan brain fog.",
            price: 32000,
            icon: Activity,
            color: "bg-green-950/40 border-green-900/50 text-green-300"
        },
        {
            id: 6,
            name: "Beetroot Brainstorm",
            category: "Focus",
            moodTag: "Butuh Fokus",
            ingredients: "Buah Bit, Apel Merah, Lemon",
            benefits: "Nitrat alami buah bit meningkatkan suplai oksigen ke lobus frontal otak, membuat lu berpikir lebih cepat dan kreatif.",
            price: 29000,
            icon: Sparkles,
            color: "bg-purple-950/40 border-purple-900/50 text-purple-300"
        },

        // 3. Energy Booster & Anti-Fatigue
        {
            id: 7,
            name: "Iron Shield Green",
            category: "Energy",
            moodTag: "Kurang Tidur/Lemes",
            ingredients: "Daun Bayam, Nanas Madu, Mentimun",
            benefits: "Zat besi tinggi memicu produksi hemoglobin. Ampuh mengusir tubuh lemas, lesu, dan mengembalikan energi yang terkuras.",
            price: 25000,
            icon: Zap,
            color: "bg-lime-950/40 border-lime-900/50 text-lime-300"
        },
        {
            id: 8,
            name: "Tropical Spark",
            category: "Energy",
            moodTag: "Kurang Tidur/Lemes",
            ingredients: "Mangga, Gula Aren Cair, Air Kelapa Muda",
            benefits: "Sumber glukosa dan elektrolit alami yang sangat cepat diserap oleh tubuh untuk memulihkan stamina secara instan.",
            price: 28000,
            icon: Sun,
            color: "bg-yellow-950/40 border-yellow-900/50 text-yellow-300"
        },
        {
            id: 9,
            name: "Ginger-Glow Hydra",
            category: "Energy",
            moodTag: "Kurang Tidur/Lemes",
            ingredients: "Air Lemon, Jahe Geprek, Madu, Kunyit Mentah",
            benefits: "Efek hangat jahe memperlancar metabolisme tubuh dan mengatasi perut kembung atau begah akibat begadang.",
            price: 26000,
            icon: Activity,
            color: "bg-amber-950/40 border-amber-900/50 text-amber-300"
        },

        // 4. Immunity & Body Defense
        {
            id: 10,
            name: "Golden Shield",
            category: "Immunity",
            moodTag: "Butuh Energi",
            ingredients: "Wortel, Jeruk Nipis, Kunyit, Apel Hijau",
            benefits: "Kaya Vitamin A dan senyawa kurkumin sebagai anti-inflamasi kuat untuk memperkuat benteng imun dari virus flu.",
            price: 27000,
            icon: Shield,
            color: "bg-yellow-950/40 border-yellow-900/50 text-yellow-300"
        },
        {
            id: 11,
            name: "Red Immune Elixir",
            category: "Immunity",
            moodTag: "Butuh Energi",
            ingredients: "Semangka, Stroberi, Daun Mint",
            benefits: "Kandungan likopen dan vitamin C bertindak asik antioksidan kuat untuk menjaga hidrasi tubuh tetap optimal.",
            price: 26000,
            icon: Heart,
            color: "bg-red-950/40 border-red-900/50 text-red-300"
        },
        {
            id: 12,
            name: "Kiwi-Kombat Detox",
            category: "Immunity",
            moodTag: "Butuh Energi",
            ingredients: "Buah Kiwi, Belimbing, Pakcoy Muda",
            benefits: "Vitamin C dosis tinggi mengaktifkan sel darah putih untuk mempercepat pemulihan saat gejala meriang mulai menyerang.",
            price: 29000,
            icon: Shield,
            color: "bg-teal-950/40 border-teal-900/50 text-teal-300"
        },

        // 5. Skin Glow & Freshness
        {
            id: 13,
            name: "Glow-Up Collagen",
            category: "Glowing",
            moodTag: "Butuh Energi",
            ingredients: "Tomat Merah, Wortel, Apel Fuji",
            benefits: "Kadar likopen dan beta-karoten tinggi merangsang kolagen alami agar kulit wajah tampak lebih cerah merona.",
            price: 28000,
            icon: Sparkles,
            color: "bg-orange-950/40 border-orange-900/50 text-orange-300"
        },
        {
            id: 14,
            name: "Green Cleanse Detox",
            category: "Glowing",
            moodTag: "Stres Tugas",
            ingredients: "Seledri Stik, Mentimun, Apel Hijau",
            benefits: "Kombinasi hidrasi maksimal berfungsi meluruhkan racun-racun tubuh sehingga kulit terbebas dari jerawat.",
            price: 30000,
            icon: Leaf,
            color: "bg-green-950/40 border-green-900/50 text-green-300"
        },
        {
            id: 15,
            name: "Velvet Dragon Smooth",
            category: "Glowing",
            moodTag: "Bad Mood",
            ingredients: "Buah Naga Merah, Sirsak, Yogurt Plain",
            benefits: "Serat tinggi dan bakteri baik yogurt melancarkan pencernaan, berdampak pada kulit yang terlihat bersih dan segar.",
            price: 29000,
            icon: Heart,
            color: "bg-purple-950/40 border-purple-200 text-purple-300"
        },
        // 6. Women's Care & Comfort
        {
            id: 16,
            name: "Crimson Comfort",
            category: "Women Care",
            moodTag: "Nyeri Haid",
            ingredients: "Kunyit Asam, Jahe Merah, Gula Aren, Madu",
            benefits: "Anti-inflamasi kuat dari kunyit dan efek relaksasi dari jahe terbukti secara klinis meredakan kram perut (dismenore) dan menenangkan otot rahim.",
            price: 27000,
            icon: Heart,
            color: "bg-rose-950/40 border-rose-900/50 text-rose-300"
        },
        {
            id: 17,
            name: "Iron Bloom Shield",
            category: "Women Care",
            moodTag: "Nyeri Haid",
            ingredients: "Buah Bit, Bayam Merah, Jeruk Sunkist, Apel Merah",
            benefits: "Kaya zat besi dan vitamin C untuk mengganti sel darah merah yang hilang saat menstruasi, mencegah anemia dan rasa lemas berlebihan.",
            price: 29000,
            icon: Sparkles,
            color: "bg-red-950/40 border-red-900/50 text-red-300"
        },
        {
            id: 18,
            name: "Golden Moon Soothe",
            category: "Women Care",
            moodTag: "Nyeri Haid",
            ingredients: "Nanas, Pepaya, Jahe Merah, Air Kelapa",
            benefits: "Enzim bromelain dari nanas efektif merelaksasi ketegangan otot rahim, sementara air kelapa mengembalikan cairan tubuh yang hilang selama siklus.",
            price: 28000,
            icon: Moon,
            color: "bg-amber-950/40 border-amber-900/50 text-amber-300"
        }
    ];

    const singleJuiceMenu = [
        { id: 101, name: "Apel Fuji Murni", image: "/images/apple.png", price: 15000, unit: "per cup", origin: "Lokal", benefits: ["Kaya antioksidan", "Menjaga kesehatan jantung", "Tinggi serat untuk pencernaan"] },
        { id: 102, name: "Bayam Hijau", image: "/images/spinach.png", price: 18000, unit: "per cup", origin: "Organik", benefits: ["Tinggi zat besi", "Memperkuat tulang", "Meningkatkan fungsi otak"] },
        { id: 103, name: "Sari Lemon Shot", image: "/images/lemon.png", price: 15000, unit: "per shot", origin: "Premium", benefits: ["Sumber Vitamin C terbaik", "Membantu detoksifikasi", "Meningkatkan imunitas"] },
        { id: 104, name: "Wortel Cold-Press", image: "/images/carrot.png", price: 15000, unit: "per cup", origin: "Lokal", benefits: ["Menjaga kesehatan mata", "Menurunkan risiko kanker", "Memperkuat imunitas"] },
        { id: 105, name: "Stroberi Segar", image: "/images/strawberry.png", price: 20000, unit: "per cup", origin: "Organik", benefits: ["Mencerahkan kulit", "Mencegah penuaan dini", "Kaya antioksidan"] },
        { id: 106, name: "Sari Jahe Shot", image: "/images/ginger.png", price: 15000, unit: "per shot", origin: "Herbal Lokal", benefits: ["Meredakan peradangan", "Meningkatkan metabolisme", "Meredakan mual"] },
        { id: 107, name: "Bit Merah", image: "/images/beetroot.png", price: 15000, unit: "per cup", origin: "Lokal", benefits: ["Detoks hati alami", "Meningkatkan stamina darah", "Menurunkan tekanan darah"] },
        { id: 108, name: "Detoks Seledri", image: "/images/celery.png", price: 20000, unit: "per cup", origin: "Premium", benefits: ["Menghidrasi tubuh", "Mengontrol asam urat", "Pembersih ginjal"] },
        { id: 109, name: "Timun Segar", image: "/images/cucumber.png", price: 12000, unit: "per cup", origin: "Lokal", benefits: ["Super hidrasi kulit", "Mengurangi kantung mata", "Membuang racun (detoks)"] },
        { id: 110, name: "Nanas Booster", image: "/images/pineapple.png", price: 20000, unit: "per cup", origin: "Subang", benefits: ["Kaya enzim pencernaan", "Meredakan batuk", "Anti-inflamasi kuat"] },
        { id: 111, name: "Semangka Segar", image: "/images/watermelon.png", price: 18000, unit: "per cup", origin: "Lokal", benefits: ["Pencegah dehidrasi", "Mengandung lycopene", "Baik untuk pemulihan otot"] },
        { id: 112, name: "Jeruk Murni", image: "/images/orange.png", price: 18000, unit: "per cup", origin: "Impor", benefits: ["Suntikan energi instan", "Kolagen alami kulit", "Boost sistem imun"] },
        { id: 113, name: "Mangga Manis", image: "/images/mango.png", price: 20000, unit: "per cup", origin: "Lokal", benefits: ["Meningkatkan mood", "Melancarkan pencernaan", "Vitamin A tinggi"] },
        { id: 114, name: "Alpukat Lembut", image: "/images/avocado.png", price: 25000, unit: "per cup", origin: "Premium", benefits: ["Lemak baik (HDL)", "Mengenyangkan lebih lama", "Nutrisi otak optimal"] },
        { id: 115, name: "Tomat Antioksidan", image: "/images/tomato.png", price: 16000, unit: "per cup", origin: "Organik", benefits: ["Antioksidan kuat", "Melindungi kulit dari UV", "Mendukung kesehatan jantung"] },
        { id: 116, name: "Melon Segar", image: "/images/melon.png", price: 18000, unit: "per cup", origin: "Lokal", benefits: ["Kaya hidrasi", "Mendinginkan tubuh", "Baik untuk mata"] },
        { id: 117, name: "Buah Naga Merah", image: "/images/dragonfruit.png", price: 25000, unit: "per cup", origin: "Organik", benefits: ["Tinggi antioksidan", "Melancarkan pencernaan", "Meningkatkan daya tahan"] },
        { id: 118, name: "Jambu Biji Merah", image: "/images/guava.png", price: 20000, unit: "per cup", origin: "Lokal", benefits: ["Vitamin C ekstra", "Meningkatkan trombosit", "Mencegah sembelit"] },
        { id: 119, name: "Kiwi Hijau", image: "/images/kiwi.png", price: 23000, unit: "per cup", origin: "Impor", benefits: ["Meningkatkan kualitas tidur", "Kaya vitamin E", "Memperkuat imun"] },
        { id: 120, name: "Pir Manis", image: "/images/pear.png", price: 25000, unit: "per cup", origin: "Impor", benefits: ["Meredakan panas dalam", "Tinggi serat", "Pereda batuk alami"] },
        { id: 121, name: "Delima Merah", image: "/images/pomegranate.png", price: 25000, unit: "per cup", origin: "Impor", benefits: ["Kaya polifenol", "Mencegah peradangan", "Menjaga daya ingat"] },
        { id: 122, name: "Sirsak Segar", image: "/images/soursop.png", price: 23000, unit: "per cup", origin: "Lokal", benefits: ["Anti-kanker alami", "Meredakan asam urat", "Meningkatkan energi"] },
        { id: 123, name: "Detoks Kale Hijau", image: "/images/kale.png", price: 25000, unit: "per cup", origin: "Organik", benefits: ["Raja superfood", "Detoksifikasi kuat", "Tinggi vitamin K"] },
        { id: 124, name: "Belimbing Manis", image: "/images/starfruit.png", price: 24000, unit: "per cup", origin: "Lokal", benefits: ["Menurunkan darah tinggi", "Rendah kalori", "Meredakan nyeri sendi"] }
    ];

    // ============ FUNCTIONS ============
    const handleMoodClick = (label) => {
        setSelectedMood(label);
        setUserInput(`Saya sedang ${label.toLowerCase()}, tolong racikkan jus yang cocok untuk kondisi saya.`);
        setRecommendation(null);
        const scores = moodScores[label];
        if (scores) {
            updateVibeScores(scores, label);
        }
    };

    const handleConsultation = async () => {
        if (!userInput.trim()) return;

        const messageToSend = userInput;
        setLastUserMessage(messageToSend);
        setUserInput("");
        setIsLoading(true);
        setAiIsTyping(true);
        setRecommendation(null);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageToSend })
            });

            const data = await res.json();

            if (!res.ok) {
                showToast("Gagal menghubungi AI Server: " + (data.error || "Coba lagi."));
                return;
            }

            setRecommendation(data);
            setSelectedMood(null);
            if (data.scores) {
                updateVibeScores(data.scores, messageToSend.slice(0, 15) + (messageToSend.length > 15 ? "..." : ""));
            }

            // Parser for [ACTION:ADD_CART:ID_JUS] or autoAddToCart from Gemini
            let actionMatch = null;
            const messageString = JSON.stringify(data);
            const actionRegex = /\[ACTION:ADD_CART:(\d+)\]/;
            const match = messageString.match(actionRegex);
            if (match) {
                actionMatch = parseInt(match[1], 10);
            }

            const menuIdToAdd = actionMatch || (data.autoAddToCart ? data.matchedMenuId : null);

            if (menuIdToAdd) {
                const menuItem = singleJuiceMenu.find(item => item.id === menuIdToAdd) || comboMenu.find(item => item.id === menuIdToAdd);
                if (menuItem) {
                    const customizedId = `${menuItem.id}-Normal-Normal`;
                    setCartItems((prevItems) => {
                        const existingItem = prevItems.find(i => i.id === customizedId);
                        if (existingItem) {
                            return prevItems.map(i => i.id === customizedId ? { ...i, quantity: i.quantity + 1 } : i);
                        }
                        return [...prevItems, {
                            ...menuItem,
                            id: customizedId,
                            quantity: 1,
                            sugarLevel: "Normal",
                            iceLevel: "Normal"
                        }];
                    });

                    // Trigger micro-interaction on cart
                    setIsCartAnimating(true);
                    setTimeout(() => {
                        setIsCartAnimating(false);
                    }, 800);

                    showToast(`AI otomatis menambahkan ${menuItem.name} ke keranjang!`);
                }
            }
        } catch (error) {
            console.error("Client Error:", error);
            showToast("Terjadi kesalahan jaringan saat memanggil Gemini API.");
        } finally {
            setIsLoading(false);
            setAiIsTyping(false);
        }
    };

    const handleAddToCart = (item) => {
        setItemToCustomize(item);
        setSugarLevel("Normal");
        setIceLevel("Normal");
    };

    const handleConfirmAddToCart = () => {
        if (!itemToCustomize) return;
        const customizedId = `${itemToCustomize.id}-${sugarLevel}-${iceLevel}`;

        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === customizedId);
            if (existingItem) {
                return prevItems.map(i => i.id === customizedId ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prevItems, {
                ...itemToCustomize,
                id: customizedId,
                quantity: 1,
                sugarLevel,
                iceLevel
            }];
        });
        showToast(`${itemToCustomize.name} ditambahkan ke keranjang!`);
        setItemToCustomize(null);
    };

    const handleAddRecommendedToCart = () => {
        if (recommendation) {
            handleAddToCart({
                id: `ai-${recommendation.name.replace(/\s+/g, '-').toLowerCase()}`,
                name: recommendation.name,
                price: recommendation.price,
            });
        }
    };

    const handleUpdateQuantity = (id, delta) => {
        setCartItems((prevItems) => prevItems.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const handleRemoveFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const handleCheckout = async () => {
        if (!customerName.trim()) {
            showToast("Silakan isi Nama Pemesan terlebih dahulu!");
            return;
        }
        if (orderType === "Dine-in" && !tableNumber.trim()) {
            showToast("Silakan isi Nomor Meja untuk pesanan Dine-in!");
            return;
        }

        // Trigger AI upsell if cart has 2+ distinct items
        if (cartItems.length >= 2) {
            setIsCartOpen(false);
            setIsLoadingUpsell(true);
            setIsUpsellOpen(true);
            try {
                const res = await fetch("/api/upsell", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cartItems })
                });
                const data = await res.json();
                if (data.upsell) {
                    setUpsellSuggestion(data);
                } else {
                    setIsUpsellOpen(false);
                    setIsPaymentSelectionOpen(true);
                }
            } catch {
                setIsUpsellOpen(false);
                setIsPaymentSelectionOpen(true);
            } finally {
                setIsLoadingUpsell(false);
            }
        } else {
            setIsCartOpen(false);
            setIsPaymentSelectionOpen(true);
        }
    };

    const handleSelectPayment = (method) => {
        setIsPaymentSelectionOpen(false);
        if (method === 'qris') {
            setIsQrisOpen(true);
        } else if (method === 'transfer') {
            setIsTransferOpen(true);
            setSelectedBank(null);
        } else {
            setIsCheckingOut(true);
            setTimeout(() => {
                setIsCheckingOut(false);
                setCheckoutSuccess(true);
                setCartItems([]);
            }, 1500);
        }
    };

    const handleConfirmQris = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setIsQrisOpen(false);
            setCheckoutSuccess(true);
            setCartItems([]);
        }, 1500);
    };

    const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const filteredCombos =
        activeTab === "All"
            ? comboMenu
            : comboMenu.filter((combo) => combo.category === activeTab);

    // ============ RENDER ============
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/90 to-slate-950 text-slate-100">
            {/* ========== HEADER BAR ========== */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
                    {/* Left: Brand */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <img src="/images/logo.png" alt="JuiceVibe Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover" />
                        <div className="flex flex-col">
                            <h1 className="text-xl md:text-3xl font-bold text-emerald-400 tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Juice<span className="text-orange-500">Vibe</span>
                            </h1>
                            <p className="text-[9px] md:text-xs text-emerald-400/80 font-medium tracking-widest uppercase -mt-0.5">
                                AI-Powered Wellness Juice Bar
                            </p>
                        </div>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#about" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">About Us</a>
                        <a href="#ai-station" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">AI Station</a>
                        <a href="#combo" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">Combo Juice</a>
                        <a href="#single" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">Single Juice</a>
                        <a href="#contact" className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors">Contact</a>
                    </nav>

                    {/* Right: Cart & Profile */}
                    <div className="flex items-center gap-2 md:gap-6">
                        <div
                            onClick={() => setIsCartOpen(true)}
                            className={`flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-orange-950/40 border border-orange-500/30 cursor-pointer hover:bg-orange-900/40 transition-all ${isCartAnimating ? "animate-bounce scale-110 border-orange-500 bg-orange-950 shadow-md duration-300" : "duration-200"}`}
                        >
                            <ShoppingBag className={`w-4 h-4 md:w-5 md:h-5 text-orange-400 ${isCartAnimating ? "animate-pulse" : ""}`} />
                            <span className="text-xs md:text-sm font-semibold text-orange-300">
                                {totalCartItems}
                            </span>
                        </div>
                        <div
                            onClick={() => {
                                setLoginInput(userName);
                                setIsLoginOpen(true);
                            }}
                            className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-emerald-950/40 border border-emerald-500/30 cursor-pointer hover:bg-emerald-900/40 transition-colors"
                            title="Klik untuk mengubah profil"
                        >
                            {userAvatar ? (
                                <img src={userAvatar} alt={userName} className="w-5.5 h-5.5 md:w-7 md:h-7 rounded-full object-cover border border-emerald-500/20" />
                            ) : (
                                <div className="w-5.5 h-5.5 md:w-7 md:h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">{userName.charAt(0).toUpperCase()}</div>
                            )}
                            <div className="flex flex-col items-start leading-none text-left">
                                <span className="text-xs md:text-sm font-medium text-emerald-300">{userName}</span>
                                {userEmail && <span className="text-[8px] md:text-[10px] text-emerald-300/70 font-light mt-0.5">{userEmail}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ========== HERO / ABOUT SECTION ========== */}
            <section id="about" className="relative text-white min-h-[calc(100vh-76px)] flex items-center justify-center py-12 px-4 md:py-16 md:px-6 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/juice_banner_bg.png')" }}>
                {/* Overlay gelap agar teks tetap terbaca dengan jelas */}
                <div className="absolute inset-0 bg-black/60 z-0"></div>
                {/* Gradient transisi lembut ke background gelap di bawahnya */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-0 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-emerald-700 border-2 border-emerald-500/60 text-emerald-100 text-xs md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6 inline-block shadow-sm animate-hero-1">
                        Welcome to JuiceVibe
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight drop-shadow-md animate-hero-2">
                        Nutrisi Cerdas Sesuai <span className="animate-gradient-text">Mood Anda</span>.
                    </h2>
                    <p className="text-sm md:text-lg text-white leading-relaxed mb-8 md:mb-10 font-medium max-w-2xl mx-auto drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] animate-hero-3">
                        JuiceVibe bukan sekadar toko jus pada umumnya. Kami menggunakan teknologi AI terdepan untuk menganalisis kondisi fisik dan psikologis Anda hari ini, lalu meracik kombinasi jus segar yang paling tepat untuk mengembalikan energi, fokus, dan mood Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 animate-hero-4 max-w-[320px] sm:max-w-none mx-auto w-full">
                        <div className="flex items-center justify-center gap-2.5 md:gap-3.5 px-5 py-3 md:px-8 md:py-4 w-full sm:w-auto bg-white/10 hover:bg-white/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-sm border-[3px] md:border-4 border-white/30">
                            <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-orange-400" />
                            <span className="text-sm md:text-lg font-bold">Analisis AI Akurat</span>
                        </div>
                        <div className="flex items-center justify-center gap-2.5 md:gap-3.5 px-5 py-3 md:px-8 md:py-4 w-full sm:w-auto bg-white/10 hover:bg-white/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-sm border-[3px] md:border-4 border-white/30">
                            <Leaf className="w-5 h-5 md:w-7 md:h-7 text-emerald-300" />
                            <span className="text-sm md:text-lg font-bold">100% Bahan Organik</span>
                        </div>
                        <div className="flex items-center justify-center gap-2.5 md:gap-3.5 px-5 py-3 md:px-8 md:py-4 w-full sm:w-auto bg-white/10 hover:bg-white/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-sm border-[3px] md:border-4 border-white/30">
                            <Zap className="w-5 h-5 md:w-7 md:h-7 text-yellow-400" />
                            <span className="text-sm md:text-lg font-bold">Instan Energy Boost</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== OUR VALUES SECTION ========== */}
            <section id="about" className="max-w-7xl mx-auto px-6 py-14">
                <div className="text-center mb-10 reveal">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-950/60 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4 inline-block border border-emerald-900/50">
                        Nilai Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                        Mengapa Memilih <span className="text-emerald-400 animate-pulse">JuiceVibe</span>?
                    </h2>
                    <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                        Lebih dari sekadar kedai jus — kami adalah mitra kesehatan Anda sehari-hari yang didukung oleh alam dan teknologi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Value 1 */}
                    <div className="group bg-slate-900/60 rounded-2xl p-7 border border-slate-800 shadow-lg hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-300 reveal reveal-delay-1">
                        <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-800/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-500 transition-colors duration-300">
                            <Leaf className="w-7 h-7 text-emerald-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mb-2">100% Bahan Segar</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Setiap jus dibuat dari bahan-bahan segar pilihan yang dipetik langsung dari petani lokal terpercaya setiap pagi, tanpa bahan pengawet atau pewarna buatan.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="group bg-slate-900/60 rounded-2xl p-7 border border-orange-100/10 shadow-lg hover:shadow-orange-900/10 hover:-translate-y-2 transition-all duration-300 reveal reveal-delay-2">
                        <div className="w-14 h-14 bg-orange-950/60 border border-orange-800/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                            <Sparkles className="w-7 h-7 text-orange-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mb-2">Rekomendasi Berbasis AI</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Didukung oleh teknologi Google Gemini AI, sistem kami menganalisis kondisi fisik dan psikologis Anda untuk meracik kombinasi jus yang paling tepat dan personal.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="group bg-slate-900/60 rounded-2xl p-7 border border-teal-100/10 shadow-lg hover:shadow-teal-900/10 hover:-translate-y-2 transition-all duration-300 reveal reveal-delay-3">
                        <div className="w-14 h-14 bg-teal-950/60 border border-teal-800/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-teal-500 transition-colors duration-300">
                            <Shield className="w-7 h-7 text-teal-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mb-2">Zero Waste & Ramah Lingkungan</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Kami berkomitmen terhadap lingkungan dengan menggunakan kemasan biodegradable, mendaur ulang sisa buah menjadi kompos, dan mengurangi jejak karbon di setiap proses.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== MAIN WORKSPACE ========== */}
            <main id="ai-station" className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8">
                {/* Section Title */}
                <div className="text-center mb-4 reveal">
                    <span className="px-4 py-1.5 rounded-full bg-orange-950/60 text-orange-300 text-xs font-bold uppercase tracking-widest mb-3 inline-block border border-orange-900/50">
                        AI Station
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                        Personalized AI <span className="text-emerald-400 animate-pulse">Wellness Consultant</span>
                    </h2>
                    <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
                        Analisis suasana hati dan kondisi fisik Anda untuk mendapatkan racikan nutrisi jus yang paling optimal.
                    </p>
                </div>

                {/* WORKSPACE ROW: AI CONSULTANT & ANALYTICS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* KOLOM KIRI (col-span-2): AI CONSULTANT STATION */}
                    <section className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 md:p-8 shadow-lg reveal space-y-8">
                        {/* Greeting Header */}
                        <div className="flex items-start gap-4 pb-6 border-b border-slate-800">
                            <div className="w-12 h-12 rounded-2xl bg-orange-950/40 border border-orange-500/30 flex items-center justify-center flex-shrink-0 shadow-md">
                                <Sparkles className="w-6 h-6 text-orange-500 animate-float" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-emerald-400">
                                    Halo, {userName}!
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed mt-1">
                                    Bagaimana kondisi psikologis & fisikmu hari ini? Biarkan AI kami menganalisis dan merekomendasikan racikan jus kesehatan terbaik untuk moodmu.
                                </p>
                            </div>
                        </div>

                        {/* Mood Quick Toggles */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                                Pilih Kondisimu:
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {moodOptions.map((mood) => (
                                    <div
                                        key={mood.mood}
                                        onClick={() => handleMoodClick(mood.label)}
                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 text-center flex flex-col items-center justify-center ${selectedMood === mood.label
                                            ? "bg-emerald-950/60 border-emerald-500/80 shadow-md text-emerald-300 font-bold"
                                            : "bg-slate-950/40 border-slate-800 hover:border-emerald-500/30 hover:bg-slate-900/40 text-slate-400"
                                            }`}
                                    >
                                        <div className="mb-2">
                                            <mood.icon className={`w-5 h-5 ${mood.color}`} />
                                        </div>
                                        <p className="text-[11px] font-bold leading-tight">
                                            {mood.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Input Box */}
                        <div className="space-y-3 pt-6 border-t border-slate-800">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                                Atau Ceritakan Keluhan Bebasmu:
                            </label>
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleConsultation();
                                    }
                                }}
                                disabled={isLoading}
                                placeholder="Contoh: Saya kurang tidur dan butuh energi untuk meeting penting..."
                                className="w-full h-40 p-4 text-sm border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none bg-slate-950/80 text-slate-100 placeholder-slate-500/50 disabled:opacity-50"
                            />
                            <button
                                onClick={handleConsultation}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        AI Sedang Meracik...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-2" />
                                        Konsultasi dengan AI
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Conversation Stream */}
                        {(lastUserMessage || aiIsTyping || recommendation) && (
                            <div className="bg-slate-955/40 border border-slate-800/60 rounded-2xl p-5 space-y-4 shadow-inner animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <label className="text-xs font-bold text-slate-450 uppercase tracking-widest block mb-2">Percakapan Konsultasi</label>

                                <div className="space-y-4">
                                    {/* User Chat Bubble */}
                                    {lastUserMessage && (
                                        <div className="flex justify-end animate-in fade-in slide-in-from-right-2 duration-300">
                                            <div className="max-w-[75%] bg-emerald-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-sm shadow-md">
                                                <p className="font-semibold text-[10px] text-emerald-100 mb-0.5 uppercase tracking-wide">Anda</p>
                                                <p className="leading-relaxed">{lastUserMessage}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Barista AI Typing Indicator */}
                                    {aiIsTyping && (
                                        <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300">
                                            <div className="max-w-[75%] bg-emerald-950/40 border border-emerald-900/50 text-emerald-300 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-start gap-2.5">
                                                <div className="w-6 h-6 bg-emerald-700 text-white rounded-full flex items-center justify-center font-extrabold text-[9px] mt-0.5 flex-shrink-0 animate-pulse">
                                                    AI
                                                </div>
                                                <div>
                                                    <p className="font-bold text-emerald-400 text-[10px] uppercase tracking-wide mb-1">Barista JuiceVibe</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-medium text-emerald-300/80">JuiceVibe AI sedang meracik menu...</span>
                                                        <div className="flex gap-1">
                                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Barista AI Recommendation Result */}
                                    {recommendation && !aiIsTyping && (
                                        <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300">
                                            <div className="w-full bg-gradient-to-br from-slate-900/90 via-emerald-950/20 to-slate-900/90 rounded-2xl border border-emerald-800/40 p-5 shadow-md">
                                                <div className="flex items-start gap-3 mb-4">
                                                    <div className="w-7 h-7 bg-emerald-700 text-white rounded-full flex items-center justify-center font-extrabold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                                                        AI
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-extrabold text-emerald-400">
                                                            {recommendation.name}
                                                        </h3>
                                                        <p className="text-xs text-emerald-300/90 font-medium mt-0.5 leading-relaxed bg-emerald-950/50 px-2.5 py-1.5 rounded-lg border border-emerald-900/45">
                                                            {recommendation.autoAddMessage || recommendation.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-5 pt-3 border-t border-slate-800">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-0.5">
                                                            Khasiat & Kandungan:
                                                        </p>
                                                        <p className="text-xs text-slate-300 leading-relaxed">
                                                            {recommendation.benefits}
                                                        </p>
                                                    </div>
                                                    {recommendation.scientific && (
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-0.5">
                                                                Penjelasan Ilmiah:
                                                            </p>
                                                            <p className="text-[11px] text-slate-400 italic leading-relaxed">
                                                                &ldquo;{recommendation.scientific}&rdquo;
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                                                    <div>
                                                        <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Harga Menu</span>
                                                        <span className="text-xl font-extrabold text-emerald-400">
                                                            Rp {recommendation.price.toLocaleString("id-ID")}
                                                        </span>
                                                    </div>
                                                    {recommendation.price > 0 ? (
                                                        <button
                                                            onClick={handleAddRecommendedToCart}
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-xs"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                            Masukkan Keranjang
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs font-bold text-slate-400 italic bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                                                            Saran Selesai
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                    {/* ===== KOLOM KANAN (col-span-1): VIBE ANALYTICS DASHBOARD ===== */}
                    <div className="lg:col-span-1">
                        <section className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 shadow-lg reveal space-y-6 lg:sticky lg:top-24">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                                <h3 className="font-bold text-base text-emerald-300">Vibe Health Analytics</h3>
                            </div>

                            {/* Circular Progress (Overall Health Score) */}
                            <div className="flex flex-col items-center justify-center py-5 bg-gradient-to-br from-emerald-950/40 to-teal-950/30 rounded-2xl border border-emerald-800/40 relative overflow-hidden">
                                <div className="relative w-28 h-28 flex items-center justify-center">
                                    {/* SVG Circular Dial */}
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="56"
                                            cy="56"
                                            r="45"
                                            stroke="#e2e8f0"
                                            strokeWidth="7"
                                            fill="transparent"
                                        />
                                        <circle
                                            cx="56"
                                            cy="56"
                                            r="45"
                                            stroke="url(#emeraldGradient)"
                                            strokeWidth="7"
                                            fill="transparent"
                                            strokeDasharray={2 * Math.PI * 45}
                                            strokeDashoffset={2 * Math.PI * 45 * (1 - Math.round((vibeScores.energy + vibeScores.calmness + vibeScores.detox) / 3) / 100)}
                                            className="transition-all duration-1000 ease-out"
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#059669" />
                                                <stop offset="100%" stopColor="#10b981" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute flex flex-col items-center justify-center">
                                        <span className="text-3xl font-extrabold text-emerald-400">
                                            {Math.round((vibeScores.energy + vibeScores.calmness + vibeScores.detox) / 3)}%
                                        </span>
                                        <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Vibe Index</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-3 font-medium text-center px-4 leading-relaxed">
                                    Kondisi mental &amp; fisik terpadu Anda saat ini.
                                </p>
                            </div>

                            {/* Individual Sliders */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span className="text-slate-300 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-orange-500" /> Energi &amp; Stamina</span>
                                        <span className="text-emerald-400">{vibeScores.energy}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${vibeScores.energy}%` }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span className="text-slate-300 flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-purple-500" /> Ketenangan &amp; Fokus</span>
                                        <span className="text-emerald-400">{vibeScores.calmness}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${vibeScores.calmness}%` }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span className="text-slate-300 flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-emerald-500" /> Detoks &amp; Kejernihan</span>
                                        <span className="text-emerald-400">{vibeScores.detox}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${vibeScores.detox}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Vibe Timeline Logs */}
                            <div className="pt-4 border-t border-slate-800">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Rekam Jejak Mood</label>
                                <div className="space-y-3">
                                    {vibeHistory.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                                <span className="font-semibold text-slate-300">{item.date}</span>
                                                <span className="text-slate-400 max-w-[100px] truncate">({item.mood})</span>
                                            </div>
                                            <span className="font-bold text-emerald-400">{item.score}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Preskripsi Digital Action */}
                            <button
                                onClick={() => setIsPrescriptionOpen(true)}
                                className="w-full py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold rounded-xl text-xs transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                <CreditCard className="w-4 h-4" />
                                Cetak Kartu Preskripsi AI
                            </button>
                        </section>
                    </div>
                </div>

                {/* ===== KOLOM BAWAH: REKOMENDASI JUS COMBO ===== */}
                <section id="combo" className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-emerald-400 animate-float" />
                        <h2 className="text-xl font-bold text-emerald-400">Rekomendasi Jus Combo</h2>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 flex-wrap pb-2 border-b border-slate-800/80">
                        {["All", "Anti-Stress", "Energy", "Immunity", "Glowing", "Women Care"].map(
                            (category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveTab(category)}
                                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${activeTab === category
                                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md"
                                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                                        }`}
                                >
                                    {category}
                                </button>
                            )
                        )}
                    </div>

                    {/* Combo Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal reveal-scale items-start">
                        {filteredCombos.map((combo) => {
                            const IconComponent = combo.icon;
                            return (
                                <div
                                    key={combo.id}
                                    onClick={() => setExpandedItem(expandedItem === combo.id ? null : combo.id)}
                                    className="cursor-pointer group bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-md hover:border-slate-700/80 transition-all duration-300 md:hover:translate-y-[-4px] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] flex flex-col h-full"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-emerald-400">
                                                    {combo.name}
                                                </h3>
                                                <IconComponent className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium mb-2">
                                                {combo.category}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mood Tag & Ingredients */}
                                    <div className="mb-4 space-y-3 flex-1">
                                        <div className="flex flex-wrap gap-1">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${combo.color}`}>
                                                {combo.moodTag}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-300 bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/45">
                                            <p className="font-semibold text-emerald-400 mb-1">Bahan Utama:</p>
                                            <p className="leading-relaxed">{combo.ingredients}</p>

                                            {/* Expandable Benefits */}
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === combo.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                <p className="font-semibold text-emerald-400 mb-1">Khasiat:</p>
                                                <p className="leading-relaxed text-slate-400 italic">{combo.benefits}</p>
                                            </div>

                                            <p className="text-[10px] text-emerald-400/70 mt-2 text-center italic">
                                                {expandedItem === combo.id ? "Ketuk untuk menutup" : "Ketuk untuk melihat khasiat"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price & Add Button */}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                                        <div>
                                            <span className="text-lg font-bold text-emerald-400">
                                                Rp {combo.price.toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(combo);
                                            }}
                                            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Pesan Combo
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ========== SINGLE JUICE SECTION ========== */}
                <section id="single" className="mt-6 pt-10 border-t border-slate-850">
                    <div className="flex items-center gap-3 mb-6 reveal">
                        <div className="p-2.5 bg-emerald-950/60 border border-emerald-800/40 rounded-xl">
                            <Leaf className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100">Single Juices</h2>
                            <p className="text-sm text-slate-200">Pilihan jus murni 100% cold-pressed untuk asupan nutrisi instan dan spesifik.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal reveal-scale">
                        {singleJuiceMenu.map((item) => (
                            <div key={item.id} className="relative overflow-hidden group rounded-2xl border border-slate-800/80 p-4 hover:shadow-xl hover:border-slate-700/80 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300 md:hover:-translate-y-1.5 flex flex-col h-full text-center min-h-[240px] cursor-pointer" onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}>
                                {/* Background Image & Dark Overlay */}
                                <div className="absolute inset-0 w-full h-full z-0 rounded-2xl overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                                </div>

                                {/* Content on top of background */}
                                <div className={`relative z-10 flex flex-col h-full transition-opacity duration-300 ${expandedItem === item.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md mt-4 pointer-events-none">{item.name}</h3>
                                    <span className="inline-block px-3 py-1 text-[10px] font-bold bg-emerald-500/90 text-white rounded-full mb-auto mx-auto border border-emerald-400/50 backdrop-blur-sm shadow-sm pointer-events-none">
                                        {item.origin}
                                    </span>

                                    <div className="mt-8 pt-3 border-t border-white/20 w-full">
                                        <div className="text-white font-bold text-lg drop-shadow-md pointer-events-none">
                                            Rp {item.price.toLocaleString("id-ID")}
                                        </div>
                                        <div className="text-xs text-emerald-100 mb-3 drop-shadow-sm font-medium pointer-events-none">
                                            {item.unit}
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                                            className="w-full flex items-center justify-center gap-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all duration-200 text-xs shadow-md border border-emerald-400/50"
                                        >
                                            <Plus className="w-3 h-3" /> Tambah
                                        </button>
                                    </div>
                                </div>

                                {/* Detail Manfaat (Flip/Overlay Overlay) */}
                                <div className={`absolute inset-0 z-20 rounded-2xl bg-emerald-900/85 backdrop-blur-md p-5 flex flex-col items-center justify-center text-center transition-all duration-300 ${expandedItem === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <h4 className="text-white font-bold text-lg mb-3 border-b border-emerald-500/50 pb-2 w-full leading-tight">Manfaat<br />{item.name}</h4>
                                    <ul className="space-y-2 mb-4 w-full text-left">
                                        {item.benefits && item.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-emerald-50 text-xs">
                                                <Leaf className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                <span className="leading-snug">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-[10px] text-emerald-300 mt-auto opacity-80">(Ketuk lagi untuk menutup)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ========== TESTIMONIALS SECTION ========== */}
            <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-14 border-t border-slate-850">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 reveal">
                        <span className="px-4 py-1.5 rounded-full bg-amber-950/60 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 inline-block border border-amber-900/50">
                            Ulasan Pelanggan
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                            Kata Mereka tentang <span className="text-emerald-400">JuiceVibe</span>
                        </h2>
                        <p className="text-slate-400 mt-3 text-sm">Bergabunglah dengan ribuan pelanggan yang telah merasakan manfaatnya.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {reviews.map((review, idx) => (
                            <div key={review.id} className={`bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-850 shadow-md hover:shadow-lg hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 reveal reveal-scale reveal-delay-${Math.min(idx + 1, 5)}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-200 text-sm">{review.name}</p>
                                        <p className="text-xs text-slate-405">{review.orderType} &middot; {review.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className={`text-lg ${review.rating >= star ? "text-amber-400" : "text-slate-805"}`}>★</span>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-350 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CONTACT & LOCATION SECTION ========== */}
            <section id="contact" className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-850 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-900/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-850 shadow-md">
                    {/* Contact Info */}
                    <div className="space-y-8 reveal reveal-left">
                        <div>
                            <h2 className="text-3xl font-extrabold text-emerald-450 tracking-tight mb-3">Kunjungi JuiceVibe</h2>
                            <p className="text-slate-300 leading-relaxed max-w-md">Rasakan kesegaran jus cold-pressed terbaik yang diracik langsung di depan mata Anda. Konsultasikan mood Anda langsung bersama barista AI kami di lokasi.</p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-950/60 border border-emerald-900/50 rounded-xl shadow-sm text-emerald-400">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-200 mb-1">Lokasi Kami</h4>
                                    <p className="text-sm text-slate-400">Jl. Wellness Center No. 88, Senopati<br />Jakarta Selatan, 12190</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-950/60 border border-emerald-900/50 rounded-xl shadow-sm text-emerald-400">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-200 mb-1">Jam Operasional</h4>
                                    <p className="text-sm text-slate-400">Senin - Jumat: 07:00 - 21:00<br />Sabtu - Minggu: 06:00 - 22:00</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-950/60 border border-emerald-900/50 rounded-xl shadow-sm text-emerald-400">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-200 mb-1">Hubungi Kami</h4>
                                    <p className="text-sm text-slate-400">+62 811-2345-6789<br />hello@juicevibe.id</p>
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-md">
                            <Camera className="w-5 h-5" />
                            Ikuti @JuiceVibe.id
                        </button>
                    </div>

                    {/* Dummy Map Illustration */}
                    <div className="w-full h-full min-h-[350px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center group cursor-pointer hover:border-emerald-500/50 transition-all duration-300 reveal reveal-right reveal-delay-2">
                        {/* Map Background Image */}
                        <div className="absolute inset-0 bg-[url('/images/dark_map.png')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"></div>
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300"></div>

                        <MapPin className="w-16 h-16 text-emerald-400 mb-3 relative z-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <div className="bg-slate-900/95 backdrop-blur-md px-6 py-3 rounded-xl shadow-xl border border-slate-800 relative z-10 text-center">
                            <h4 className="font-bold text-slate-100 text-sm mb-0.5">JuiceVibe Flagship Store</h4>
                            <p className="text-xs text-slate-400 hover:underline">Buka di Google Maps</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <footer className="mt-12 py-6 border-t border-slate-850 bg-slate-950/80">
                <div className="max-w-7xl mx-auto px-6 text-center text-xs text-slate-500">
                    <p>Powered by Advanced AI Wellness Consultant &middot; Fresh Juice, Fresh Vibes</p>
                </div>
            </footer>

            {/* ========== CART DRAWER OVERLAY ========== */}
            <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-900/95 border-l border-slate-800/80 shadow-2xl transition-transform duration-300 transform flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex items-center justify-between p-6 border-b border-slate-800">
                        <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" /> Keranjang ({totalCartItems})
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                                <ShoppingBag className="w-16 h-16 text-emerald-450 mb-4 animate-pulse" />
                                <p className="text-slate-400 font-medium">Keranjangmu masih kosong.</p>
                                <p className="text-sm text-slate-500 mt-1">Yuk pilih jus mood booster-mu hari ini!</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-slate-955/40 rounded-2xl border border-slate-850">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-emerald-400 mb-1">{item.name}</h4>
                                        {(item.sugarLevel || item.iceLevel) && (
                                            <p className="text-xs text-emerald-300 mb-1 font-medium bg-emerald-950/40 inline-block px-2.5 py-0.5 rounded-md border border-emerald-900/60">
                                                Sugar: {item.sugarLevel} | Ice: {item.iceLevel}
                                            </p>
                                        )}
                                        <p className="text-emerald-400 font-semibold text-sm mb-3">Rp {item.price.toLocaleString("id-ID")}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
                                                <button onClick={() => handleUpdateQuantity(item.id, -1)} className="px-3 py-1.5 text-emerald-450 hover:bg-slate-805 transition-colors">
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="px-2 font-medium text-sm w-6 text-center text-slate-200">{item.quantity}</span>
                                                <button onClick={() => handleUpdateQuantity(item.id, 1)} className="px-3 py-1.5 text-emerald-455 hover:bg-slate-805 transition-colors">
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <button onClick={() => handleRemoveFromCart(item.id)} className="p-2 text-rose-400 hover:bg-rose-955/30 rounded-lg transition-colors ml-auto">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="p-6 border-t border-slate-800/80 bg-slate-950/60">

                            {/* Order Details Form */}
                            <div className="mb-6 space-y-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 shadow-md">
                                <div>
                                    <label className="block text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wide">Nama Pemesan</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Ketik nama Anda..."
                                        className="w-full p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-950/60 text-slate-100 placeholder-slate-600 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wide">Tipe Pesanan</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setOrderType("Dine-in")}
                                            className={`py-2 rounded-lg border text-sm font-bold transition-all ${orderType === "Dine-in" ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900/60 hover:text-emerald-400"}`}
                                        >
                                            Dine-in
                                        </button>
                                        <button
                                            onClick={() => setOrderType("Takeaway")}
                                            className={`py-2 rounded-lg border text-sm font-bold transition-all ${orderType === "Takeaway" ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900/60 hover:text-emerald-400"}`}
                                        >
                                            Takeaway
                                        </button>
                                    </div>
                                </div>

                                {orderType === "Dine-in" && (
                                    <div className="animate-in slide-in-from-top-2 duration-300">
                                        <label className="block text-xs font-bold text-emerald-400 mb-1.5 uppercase tracking-wide">Nomor Meja</label>
                                        <input
                                            type="text"
                                            value={tableNumber}
                                            onChange={(e) => setTableNumber(e.target.value)}
                                            placeholder="Contoh: 12"
                                            className="w-full p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-950/60 text-slate-100 placeholder-slate-600 text-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold text-slate-300">Total Pembayaran</span>
                                <span className="text-xl font-bold text-emerald-400">Rp {totalCartPrice.toLocaleString("id-ID")}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Lanjutkan Pembayaran
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ========== PAYMENT SELECTION MODAL ========== */}
            <div className={`fixed inset-0 z-[105] flex items-center justify-center transition-opacity duration-300 ${isPaymentSelectionOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsPaymentSelectionOpen(false)}></div>
                <div className={`bg-slate-900/95 border border-slate-800/80 rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col ${isPaymentSelectionOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-emerald-400">Metode Pembayaran</h3>
                        <button onClick={() => setIsPaymentSelectionOpen(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <button onClick={() => handleSelectPayment('qris')} className="w-full flex items-center justify-between p-4 border border-slate-850 rounded-xl hover:bg-slate-800 hover:border-emerald-500/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-950/60 border border-emerald-900/40 text-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                                    <QrCode className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-200">QRIS</h4>
                                    <p className="text-xs text-slate-400">Gopay, OVO, Dana, LinkAja</p>
                                </div>
                            </div>
                            <span className="text-emerald-400 font-bold">Pilih</span>
                        </button>

                        <button onClick={() => handleSelectPayment('transfer')} className="w-full flex items-center justify-between p-4 border border-slate-850 rounded-xl hover:bg-slate-800 hover:border-emerald-500/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-950/60 border border-blue-900/40 text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-200">Transfer Bank</h4>
                                    <p className="text-xs text-slate-400">BCA, Mandiri, BNI, BRI</p>
                                </div>
                            </div>
                            <span className="text-emerald-400 font-bold">Pilih</span>
                        </button>

                        <button onClick={() => handleSelectPayment('cash')} className="w-full flex items-center justify-between p-4 border border-slate-850 rounded-xl hover:bg-slate-800 hover:border-emerald-500/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-950/60 border border-orange-900/40 text-orange-400 rounded-lg group-hover:scale-110 transition-transform">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-200">Bayar di Kasir</h4>
                                    <p className="text-xs text-slate-400">Tunai atau Kartu Debit/Kredit</p>
                                </div>
                            </div>
                            <span className="text-emerald-400 font-bold">Pilih</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ========== QRIS DUMMY MODAL ========== */}
            <div className={`fixed inset-0 z-[110] flex items-center justify-center transition-opacity duration-300 ${isQrisOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isCheckingOut && setIsQrisOpen(false)}></div>
                <div className={`bg-slate-900/95 border border-slate-800/80 rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col items-center text-center ${isQrisOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-1">Scan QRIS</h3>
                    <p className="text-slate-450 mb-6 text-sm">Scan menggunakan aplikasi e-wallet Anda.</p>

                    <div className="bg-white p-3 rounded-2xl border-4 border-slate-805 shadow-sm mb-6 relative">
                        {/* A dummy QR Code using an open API */}
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=JuiceVibeHackathonProject"
                            alt="Dummy QR Code"
                            className="w-48 h-48 rounded-lg"
                        />
                    </div>

                    <div className="bg-emerald-950/60 border border-emerald-900/40 text-emerald-300 w-full p-4 rounded-xl mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wide mb-1">Total Tagihan</p>
                        <p className="text-xl font-bold">Rp {totalCartPrice.toLocaleString("id-ID")}</p>
                    </div>

                    <button
                        onClick={handleConfirmQris}
                        disabled={isCheckingOut}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isCheckingOut ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Memverifikasi...</>
                        ) : (
                            "Saya Sudah Bayar"
                        )}
                    </button>

                    <button
                        onClick={() => setIsQrisOpen(false)}
                        disabled={isCheckingOut}
                        className="mt-4 text-slate-400 hover:text-slate-200 font-medium text-sm transition-colors disabled:opacity-50"
                    >
                        Batalkan
                    </button>
                </div>
            </div>

            {/* ========== TRANSFER BANK MODAL ========== */}
            <div className={`fixed inset-0 z-[110] flex items-center justify-center transition-opacity duration-300 ${isTransferOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isCheckingOut && setIsTransferOpen(false)}></div>
                <div className={`bg-slate-900/95 border border-slate-805 rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col ${isTransferOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-2xl font-bold text-emerald-450 mb-1 text-center">Transfer Bank</h3>

                    {!selectedBank ? (
                        <>
                            <p className="text-slate-450 mb-6 text-sm text-center">Pilih bank tujuan transfer Anda.</p>
                            <div className="space-y-3 mb-6">
                                {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
                                    <button
                                        key={bank}
                                        onClick={() => setSelectedBank(bank)}
                                        className="w-full flex items-center justify-between p-4 border border-slate-800 rounded-xl hover:bg-slate-850 hover:border-emerald-500/55 transition-all font-bold text-slate-200"
                                    >
                                        {bank} Virtual Account
                                        <ChevronRight className="w-5 h-5 text-emerald-450" />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsTransferOpen(false)}
                                className="w-full mt-2 text-slate-400 hover:text-slate-200 font-medium text-sm transition-colors"
                            >
                                Batalkan
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-slate-450 mb-6 text-sm text-center">Transfer sesuai nominal ke nomor Virtual Account di bawah.</p>

                            <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-5 mb-6 text-center">
                                <p className="text-xs font-bold text-slate-500 mb-1">{selectedBank} Virtual Account</p>
                                <p className="text-2xl font-mono font-bold tracking-widest text-emerald-450">8890 1234 5678</p>
                            </div>

                            <div className="bg-emerald-950/60 text-emerald-300 w-full p-4 rounded-xl mb-6 text-center">
                                <p className="text-xs font-semibold uppercase tracking-wide mb-1">Total Tagihan</p>
                                <p className="text-xl font-bold">Rp {totalCartPrice.toLocaleString("id-ID")}</p>
                            </div>

                            <button
                                onClick={() => {
                                    setIsCheckingOut(true);
                                    setTimeout(() => {
                                        setIsCheckingOut(false);
                                        setIsTransferOpen(false);
                                        setCheckoutSuccess(true);
                                        setCartItems([]);
                                    }, 1500);
                                }}
                                disabled={isCheckingOut}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isCheckingOut ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Memverifikasi...</>
                                ) : (
                                    "Saya Sudah Transfer"
                                )}
                            </button>

                            <button
                                onClick={() => !isCheckingOut && setSelectedBank(null)}
                                disabled={isCheckingOut}
                                className="mt-4 text-slate-400 hover:text-slate-200 font-medium text-sm transition-colors text-center w-full disabled:opacity-50"
                            >
                                Ganti Bank
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* ========== CHECKOUT SUCCESS MODAL ========== */}
            <div className={`fixed inset-0 z-[120] flex items-center justify-center transition-opacity duration-300 ${checkoutSuccess ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setCheckoutSuccess(false)}></div>
                <div className={`bg-slate-900/95 border border-slate-800/80 rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col items-center text-center ${checkoutSuccess ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <div className="w-20 h-20 bg-emerald-950/60 border border-emerald-800/40 rounded-full flex items-center justify-center mb-5">
                        <CheckCircle2 className="w-10 h-10 text-emerald-450 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-2">Pembayaran Berhasil!</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                        {orderType === "Dine-in"
                            ? `Pesanan jus Anda sedang diracik oleh Barista kami dan akan segera diantarkan ke Meja ${tableNumber}. Terima kasih, Kak ${customerName || userName}!`
                            : `Pesanan Takeaway Anda sedang diracik dan akan segera siap diambil. Terima kasih, Kak ${customerName || userName}!`}
                    </p>
                    <button
                        onClick={() => {
                            setCheckoutSuccess(false);
                            setIsReviewOpen(true);
                            setReviewRating(5);
                            setReviewText("");
                        }}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors mb-3"
                    >
                        Beri Ulasan
                    </button>
                    <button
                        onClick={() => setCheckoutSuccess(false)}
                        className="w-full py-3 bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium rounded-xl transition-colors text-sm"
                    >
                        Lewati, Kembali ke Beranda
                    </button>
                </div>
            </div>
            {/* ========== KARTU PRESKRIPSI DIGITAL MODAL ========== */}
            <div className={`fixed inset-0 z-[150] flex items-center justify-center transition-opacity duration-300 ${isPrescriptionOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsPrescriptionOpen(false)}></div>
                <div className={`bg-slate-900/95 border border-slate-800/80 rounded-[32px] max-w-md w-full max-h-[90vh] mx-4 relative z-[160] shadow-2xl transition-transform duration-300 transform overflow-hidden flex flex-col ${isPrescriptionOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    {/* Brand Header */}
                    <div className="bg-gradient-to-r from-emerald-900 to-teal-950 p-6 text-center text-white relative flex-shrink-0 border-b border-slate-800">
                        <button
                            onClick={() => setIsPrescriptionOpen(false)}
                            className="absolute top-4 right-4 text-emerald-350 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold">Resep Vibe-Check AI</h3>
                        <p className="text-xs text-emerald-300 mt-1">JuiceVibe AI Wellness Clinic</p>
                    </div>

                    {/* Prescription Details */}
                    <div className="p-6 space-y-6 bg-slate-950/30 overflow-y-auto flex-1">
                        {/* Patient info */}
                        <div className="grid grid-cols-2 gap-4 text-xs pb-4 border-b border-dashed border-slate-800">
                            <div>
                                <span className="text-slate-400 block uppercase tracking-wider font-semibold">Nama Pemesan</span>
                                <span className="text-slate-200 font-bold text-sm block mt-0.5">{customerName || userName}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-400 block uppercase tracking-wider font-semibold">Tanggal Periksa</span>
                                <span className="text-slate-200 font-bold text-sm block mt-0.5">{new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Health Indexes */}
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Peta Indeks Kesehatan</span>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-900/80 border border-slate-800/60 p-3 rounded-xl text-center">
                                    <Zap className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                    <span className="text-[10px] font-bold text-slate-400 block">Stamina</span>
                                    <span className="text-base font-extrabold text-emerald-400">{vibeScores.energy}%</span>
                                </div>
                                <div className="bg-slate-900/80 border border-slate-800/60 p-3 rounded-xl text-center">
                                    <Brain className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                                    <span className="text-[10px] font-bold text-slate-400 block">Ketenangan</span>
                                    <span className="text-base font-extrabold text-emerald-400">{vibeScores.calmness}%</span>
                                </div>
                                <div className="bg-slate-900/80 border border-slate-800/60 p-3 rounded-xl text-center">
                                    <Leaf className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                                    <span className="text-[10px] font-bold text-slate-400 block">Detoks</span>
                                    <span className="text-base font-extrabold text-emerald-400">{vibeScores.detox}%</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis Diagnosis */}
                        <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-2xl">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Sparkles className="w-4 h-4 text-emerald-450 animate-float" />
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Diagnosis Barista AI</span>
                            </div>
                            <p className="text-xs text-slate-350 leading-relaxed italic">
                                {recommendation ? `"${recommendation.autoAddMessage || recommendation.description}"` : `"Berdasarkan taksiran rekam jejak, tubuh Anda memerlukan asupan vitamin harian untuk mengembalikan vitalitas optimal."`}
                            </p>
                        </div>

                        {/* Prescribed Juice */}
                        <div className="bg-emerald-950/40 border border-emerald-900/50 rounded-2xl p-4 flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Rekomendasi Jus Utama</span>
                                <span className="text-base font-extrabold text-emerald-350 mt-1 block">
                                    {recommendation ? recommendation.name : "Apel Fuji Murni"}
                                </span>
                            </div>
                            <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold">
                                AI
                            </div>
                        </div>

                        {/* QR Code Validation */}
                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-dashed border-slate-800">
                            <div className="flex-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verifikasi Resep</span>
                                <p className="text-[9px] text-slate-500 mt-1 leading-snug">Pindai kode QR untuk memvalidasi preskripsi ini secara resmi dengan platform Google Vibe.</p>
                            </div>
                            <div className="p-1.5 bg-white border border-slate-800 rounded-xl flex-shrink-0">
                                <QrCode className="w-12 h-12 text-slate-700" />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-slate-900/80 border-t border-slate-800/80 flex gap-3 flex-shrink-0">
                        <button
                            onClick={handleDownloadPrescription}
                            className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                        >
                            Unduh PDF / PNG
                        </button>
                        <button
                            onClick={() => setIsPrescriptionOpen(false)}
                            className="py-3 px-5 bg-slate-950/60 hover:bg-slate-805 text-slate-350 border border-slate-800 font-bold rounded-xl text-xs transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>

            {/* ========== TOAST NOTIFICATION ========== */}
            <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 transform ${toastMessage ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"}`}>
                <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700">
                    {toastMessage}
                </div>
            </div>

            {/* ========== CUSTOMIZATION MODAL ========== */}
            <div className={`fixed inset-0 z-[130] flex items-center justify-center transition-opacity duration-300 ${itemToCustomize ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setItemToCustomize(null)}></div>
                <div className={`bg-slate-900/95 border border-slate-800/80 rounded-3xl p-6 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col ${itemToCustomize ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-xl font-bold text-emerald-400 mb-1">{itemToCustomize?.name}</h3>
                    <p className="text-slate-400 mb-6 text-sm">Sesuaikan tingkat kemanisan dan es.</p>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide">Tingkat Kemanisan</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Normal', 'Less', 'No Sugar'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setSugarLevel(level)}
                                        className={`py-2 rounded-lg border text-xs font-bold transition-all ${sugarLevel === level ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900/60 hover:text-emerald-400"}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide">Tingkat Es</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Normal', 'Less', 'No Ice'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setIceLevel(level)}
                                        className={`py-2 rounded-lg border text-xs font-bold transition-all ${iceLevel === level ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900/60 hover:text-emerald-400"}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleConfirmAddToCart}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all duration-200"
                    >
                        Simpan &amp; Tambah
                    </button>
                </div>
            </div>

            {/* ========== REVIEW MODAL ========== */}
            <div className={`fixed inset-0 z-[140] flex items-center justify-center transition-opacity duration-300 ${isReviewOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsReviewOpen(false)}></div>
                <div className={`bg-slate-900/95 border border-slate-800/80 rounded-3xl p-7 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform ${isReviewOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-xl font-bold text-slate-100 mb-1">Bagaimana Pengalamanmu?</h3>
                    <p className="text-slate-400 text-sm mb-5">Ulasanmu sangat berarti bagi kami, Kak {customerName}!</p>

                    {/* Star Rating */}
                    <div className="flex justify-center gap-2 mb-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setReviewRating(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                className="text-4xl transition-transform hover:scale-125"
                            >
                                <span className={(hoveredStar || reviewRating) >= star ? "text-amber-400" : "text-slate-700"}>
                                    ★
                                </span>
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-xs font-semibold text-amber-500 mb-5">
                        {["Sangat Buruk", "Buruk", "Cukup", "Bagus", "Sangat Memuaskan!"][(hoveredStar || reviewRating) - 1]}
                    </p>

                    {/* Comment */}
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Ceritakan pengalamanmu... (opsional)"
                        rows={3}
                        className="w-full p-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none mb-5 bg-slate-950/60 text-slate-100 placeholder-slate-600"
                    />

                    <button
                        onClick={() => {
                            const newReview = {
                                id: Date.now(),
                                name: customerName || "Pelanggan Anonim",
                                rating: reviewRating,
                                comment: reviewText || "Pengalaman yang menyenangkan!",
                                orderType: orderType,
                                time: "Baru saja"
                            };
                            setReviews(prev => [newReview, ...prev]);
                            setIsReviewOpen(false);
                            showToast("Terima kasih atas ulasanmu!");
                        }}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors"
                    >
                        Kirim Ulasan
                    </button>
                </div>
            </div>

            {/* ========== LOGIN MODAL ========== */}
            <div className={`fixed inset-0 z-[160] flex items-center justify-center transition-opacity duration-300 ${isLoginOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsLoginOpen(false)}></div>
                <div className={`bg-slate-900/95 border border-slate-800/80 rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform ${isLoginOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>

                    <button
                        onClick={() => setIsLoginOpen(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {userEmail ? (
                        <div className="flex flex-col items-center mb-6 mt-2">
                            {userAvatar ? (
                                <img src={userAvatar} alt={userName} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 mb-3 shadow-lg" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-slate-100">{userName}</h3>
                            <p className="text-slate-400 text-sm mt-1">{userEmail}</p>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-900/50 text-blue-400 text-xs font-semibold mt-3">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.633 0-8.343-3.77-8.343-8.414s3.71-8.414 8.343-8.414c2.167 0 3.996.809 5.38 2.119l3.197-3.197C18.847 2.052 15.787 1 12.24 1 6.046 1 12.24 6.046 12.24 12.24s5.046 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.746-.08-1.3-.22-1.942H12.24z" />
                                </svg>
                                Akun Google Aktif
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center mb-6 mt-2 text-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-900/55 flex items-center justify-center text-emerald-450 mb-4 shadow-sm">
                                <Lock className="w-8 h-8 text-emerald-450" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-100">Login Diperlukan</h3>
                            <p className="text-slate-455 text-sm mt-2 leading-relaxed">
                                Silakan masuk dengan akun Google Anda untuk mengakses fitur personalisasi AI dan melanjutkan pemesanan.
                            </p>
                        </div>
                    )}

                    {userEmail ? (
                        <button
                            onClick={() => {
                                setUserName("Tamu");
                                setUserAvatar(null);
                                setUserEmail("");
                                setLoginInput("");
                                setIsLoginOpen(false);
                                showToast("Berhasil keluar dari akun Google.");
                            }}
                            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            Keluar dari Akun
                        </button>
                    ) : (
                        <button
                            onClick={triggerGoogleSignIn}
                            type="button"
                            className="w-full py-3.5 px-4 border border-slate-800 rounded-xl hover:bg-slate-900/40 active:bg-slate-800 text-slate-200 font-bold text-sm flex items-center justify-center gap-3 transition-colors shadow-sm bg-slate-950/40"
                        >
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                />
                            </svg>
                            Masuk dengan Google
                        </button>
                    )}
                </div>
            </div>

            {/* ========== AI UPSELL MODAL ========== */}
            <div className={`fixed inset-0 z-[150] flex items-end sm:items-center justify-center transition-opacity duration-300 ${isUpsellOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { if (!isLoadingUpsell) { setIsUpsellOpen(false); setIsPaymentSelectionOpen(true); } }}></div>
                <div className={`bg-slate-900/95 border border-slate-850 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md mx-0 sm:mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform overflow-hidden ${isUpsellOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"}`}>

                    {/* Barista AI Header */}
                    <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-emerald-450 animate-pulse" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Barista AI</p>
                            <p className="text-emerald-300 text-xs">Rekomendasi personal untuk Anda</p>
                        </div>
                        <button onClick={() => { setIsUpsellOpen(false); setIsPaymentSelectionOpen(true); }} className="ml-auto text-emerald-300 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        {isLoadingUpsell ? (
                            <div className="flex flex-col items-center gap-3 py-8">
                                <Loader2 className="w-8 h-8 text-emerald-555 animate-spin" />
                                <p className="text-sm text-slate-400">Barista AI sedang menganalisis pesanan Anda...</p>
                            </div>
                        ) : upsellSuggestion ? (
                            <>
                                {/* Chat bubble */}
                                <div className="bg-emerald-955/40 border border-emerald-900/50 rounded-2xl rounded-tl-sm p-4 mb-5">
                                    <p className="text-sm text-slate-300 leading-relaxed">{upsellSuggestion.barista_message}</p>
                                </div>

                                {/* Product card */}
                                <div className="border border-slate-800 bg-slate-950/40 rounded-2xl p-4 mb-5 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-955/50 border border-emerald-800/45 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Leaf className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-200">{upsellSuggestion.suggestedName}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{upsellSuggestion.nutritionReason}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs text-slate-500 line-through">Rp {upsellSuggestion.originalPrice?.toLocaleString("id-ID")}</p>
                                        <p className="text-emerald-400 font-bold">Rp {upsellSuggestion.discountedPrice?.toLocaleString("id-ID")}</p>
                                        <span className="inline-block bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                                            -{upsellSuggestion.discountPercent}% Bundle
                                        </span>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <button
                                    onClick={() => {
                                        const item = singleJuiceMenu.find(m => m.id === upsellSuggestion.matchedMenuId);
                                        if (item) {
                                            const upsellId = `upsell-${item.id}`;
                                            setCartItems(prev => {
                                                const exists = prev.find(i => i.id === upsellId);
                                                if (exists) return prev.map(i => i.id === upsellId ? { ...i, quantity: i.quantity + 1 } : i);
                                                return [...prev, { ...item, id: upsellId, price: upsellSuggestion.discountedPrice, quantity: 1, sugarLevel: 'Normal', iceLevel: 'Normal', upsellItem: true }];
                                            });
                                        }
                                        setIsUpsellOpen(false);
                                        setUpsellSuggestion(null);
                                        setIsPaymentSelectionOpen(true);
                                        showToast(`${upsellSuggestion.suggestedName} ditambahkan dengan diskon ${upsellSuggestion.discountPercent}%!`);
                                    }}
                                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors mb-3 flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambahkan dan Lanjutkan Bayar
                                </button>
                                <button
                                    onClick={() => { setIsUpsellOpen(false); setUpsellSuggestion(null); setIsPaymentSelectionOpen(true); }}
                                    className="w-full py-3 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors text-center"
                                >
                                    Tidak, lanjutkan pembayaran
                                </button>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* ========== GOOGLE SIMULATOR MODAL ========== */}
            <div className={`fixed inset-0 z-[170] flex items-center justify-center transition-opacity duration-300 ${isGoogleSimOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { if (!googleSimLoading) setIsGoogleSimOpen(false); }}></div>
                <div className={`bg-slate-900 border border-slate-800 rounded-[28px] max-w-sm md:max-w-[850px] w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform overflow-hidden ${isGoogleSimOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>

                    {/* Header Bar */}
                    <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/60">
                        <div className="flex items-center gap-2.5">
                            {/* Google G Logo */}
                            <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-slate-200 font-sans tracking-tight">Sign in with Google</span>
                        </div>
                        {!googleSimLoading && (
                            <button
                                onClick={() => setIsGoogleSimOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-slate-250 transition-colors"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {googleSimLoading && (
                        /* Top linear loading indicator */
                        <div className="w-full h-1 bg-[#132237] overflow-hidden relative">
                            <div className="h-full bg-[#1a73e8] absolute top-0 left-0 animate-pulse w-full"></div>
                        </div>
                    )}

                    {googleSimLoading ? (
                        <div className="p-10 py-20 flex flex-col items-center justify-center gap-4 text-center">
                            <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-red-500 border-b-yellow-500 border-l-green-500 animate-spin"></div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-200">Connecting to Google account...</p>
                                <p className="text-xs text-slate-400 mt-1">Processing secure verification</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 p-6 md:p-10 bg-slate-900">

                            {/* Left Column: App Branding */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center md:justify-start pt-2">
                                {/* JuiceVibe Logo Icon */}
                                <img
                                    src="/images/logo.png"
                                    alt="JuiceVibe Logo"
                                    className="w-12 h-12 rounded-xl object-cover mb-6 shadow-sm border border-slate-800"
                                />

                                <h2 className="text-[28px] md:text-[32px] font-normal tracking-tight text-slate-100 font-sans leading-tight">
                                    Choose an account
                                </h2>
                                <p className="text-[15px] text-slate-400 font-sans mt-2.5">
                                    to continue to <span className="text-[#1a73e8] font-medium hover:underline cursor-pointer">JuiceVibe</span>
                                </p>
                            </div>

                            {/* Right Column: Accounts / Form */}
                            <div className="flex flex-col justify-between min-h-[300px]">
                                {showCustomGoogleForm ? (
                                    /* Google Custom Account Sign-In Form */
                                    <div className="space-y-5 animate-in fade-in duration-300">
                                        <div>
                                            <h3 className="text-lg font-medium text-slate-200 mb-1">Gunakan akun Google lain</h3>
                                            <p className="text-xs text-slate-400">Masukkan info akun yang ingin disimulasikan</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={customGoogleName}
                                                    onChange={(e) => setCustomGoogleName(e.target.value)}
                                                    required
                                                    className="peer w-full px-3.5 py-3 text-sm text-slate-100 bg-slate-950/40 border border-slate-800 rounded-[4px] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all placeholder-transparent"
                                                    placeholder="Nama Lengkap"
                                                    id="google-name-input"
                                                />
                                                <label
                                                    htmlFor="google-name-input"
                                                    className="absolute left-3 -top-2 px-1 text-xs text-slate-400 bg-slate-900 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3.5 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#1a73e8] peer-focus:left-3"
                                                >
                                                    Nama Lengkap
                                                </label>
                                            </div>

                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={customGoogleEmail}
                                                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                                                    required
                                                    className="peer w-full px-3.5 py-3 text-sm text-slate-100 bg-slate-950/40 border border-slate-800 rounded-[4px] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all placeholder-transparent"
                                                    placeholder="Email Google"
                                                    id="google-email-input"
                                                />
                                                <label
                                                    htmlFor="google-email-input"
                                                    className="absolute left-3 -top-2 px-1 text-xs text-slate-400 bg-slate-900 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3.5 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#1a73e8] peer-focus:left-3"
                                                >
                                                    Email Google
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-6">
                                            <button
                                                type="button"
                                                onClick={() => setShowCustomGoogleForm(false)}
                                                className="text-[#1a73e8] hover:bg-blue-950/30 font-bold text-sm px-4 py-2.5 rounded transition-all"
                                            >
                                                Kembali
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (customGoogleName.trim() && customGoogleEmail.trim()) {
                                                        const simulatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(customGoogleName)}&background=0D9488&color=fff&size=128&bold=true`;
                                                        handleSelectSimAccount(customGoogleName.trim(), customGoogleEmail.trim(), simulatedAvatar);
                                                    }
                                                }}
                                                disabled={!customGoogleName.trim() || !customGoogleEmail.trim()}
                                                className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-sm px-6 py-2.5 rounded shadow-sm hover:shadow active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                Masuk
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Google Accounts List Grid */
                                    <div className="space-y-1 divide-y divide-slate-800/60">

                                        {/* Account 1 */}
                                        <button
                                            onClick={() => handleSelectSimAccount("RYU ADHI NUGROHO", "ryu.adhi3@sma.belajar.id", "https://ui-avatars.com/api/?name=Ryu+Adhi+Nugroho&background=1a73e8&color=fff&bold=true")}
                                            className="w-full text-left py-3.5 px-2 flex items-center justify-between hover:bg-slate-800/50 transition-colors rounded-xl"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-lg">
                                                    R
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-200 tracking-wide">RYU ADHI NUGROHO</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">ryu.adhi3@sma.belajar.id</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400 pr-1 font-medium">Signed out</span>
                                        </button>

                                        {/* Account 2 */}
                                        <button
                                            onClick={() => handleSelectSimAccount("Ryu Adhi Nugroho", "ryuadhi.n@gmail.com", "https://ui-avatars.com/api/?name=Ryu+Adhi+Nugroho&background=e91e63&color=fff&bold=true")}
                                            className="w-full text-left py-3.5 px-2 flex items-center justify-between hover:bg-slate-800/50 transition-colors rounded-xl"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-10 h-10 rounded-full bg-[#e91e63] text-white flex items-center justify-center font-bold text-lg">
                                                    R
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-200">Ryu Adhi Nugroho</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">ryuadhi.n@gmail.com</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400 pr-1 font-medium">Signed out</span>
                                        </button>

                                        {/* Account 3 */}
                                        <button
                                            onClick={() => handleSelectSimAccount("Ryu Adhi Nugroho", "2510511156@mahasiswa.upnvj.ac.id", "https://ui-avatars.com/api/?name=Ryu+Adhi+Nugroho&background=607d8b&color=fff&bold=true")}
                                            className="w-full text-left py-3.5 px-2 flex items-center justify-between hover:bg-slate-800/50 transition-colors rounded-xl"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-10 h-10 rounded-full bg-[#607d8b] text-white flex items-center justify-center font-bold text-lg">
                                                    R
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-200">Ryu Adhi Nugroho</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">2510511156@mahasiswa.upnvj.ac.id</p>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Account 4 */}
                                        <button
                                            onClick={() => handleSelectSimAccount("Ryu Adhi Nugroho", "ryuadhn@gmail.com", "https://ui-avatars.com/api/?name=Ryu+Adhi+Nugroho&background=f59e0b&color=fff&bold=true")}
                                            className="w-full text-left py-3.5 px-2 flex items-center justify-between hover:bg-slate-800/50 transition-colors rounded-xl"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                {/* Emblem Avatar (mimicking custom logo) */}
                                                <div className="w-10 h-10 rounded-full border border-slate-800 overflow-hidden flex items-center justify-center bg-amber-950/30">
                                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12" r="10" fill="#f59e0b" />
                                                        <circle cx="12" cy="12" r="8" fill="#10b981" />
                                                        <path d="M12 7 L14 10 L17 10 L15 12 L16 15 L12 13 L8 15 L9 12 L7 10 L10 10 Z" fill="#ffffff" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-200">Ryu Adhi Nugroho</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">ryuadhn@gmail.com</p>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Use Another Account Row */}
                                        <button
                                            onClick={() => {
                                                setCustomGoogleName("");
                                                setCustomGoogleEmail("");
                                                setShowCustomGoogleForm(true);
                                            }}
                                            className="w-full text-left py-3.5 px-2 flex items-center gap-3.5 hover:bg-slate-800/50 transition-colors rounded-xl text-[#1a73e8] font-bold"
                                        >
                                            <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 bg-slate-950/40">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-[#1a73e8] hover:text-[#1557b0] transition-colors">Use another account</span>
                                        </button>
                                    </div>
                                )}

                                {/* Bottom Google Disclaimers */}
                                <div className="mt-8 text-[11px] text-slate-400 leading-relaxed text-left font-sans">
                                    Before using this app, you can review JuiceVibe&apos;s{" "}
                                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1a73e8] hover:underline font-medium">Privacy Policy</a>{" "}
                                    and{" "}
                                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1a73e8] hover:underline font-medium">Terms of Service</a>.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}