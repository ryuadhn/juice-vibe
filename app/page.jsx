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
} from "lucide-react";

export default function VibeJuice() {
    // ============ STATE MANAGEMENT ============
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userName, setUserName] = useState("Ryu");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginInput, setLoginInput] = useState("");
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

    const moodScores = {
        "Stres Tugas": { energy: 45, calmness: 35, detox: 60 },
        "Kurang Tidur": { energy: 30, calmness: 55, detox: 50 },
        "Bad Mood": { energy: 50, calmness: 40, detox: 70 },
        "Butuh Energi": { energy: 40, calmness: 70, detox: 65 },
        "Nyeri Haid": { energy: 35, calmness: 45, detox: 55 }
    };

    // ============ PERSISTENCE LOAD ============
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

    // ============ SCROLL REVEAL ============
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                }
            }),
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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
            color: "bg-rose-50 border-rose-200 text-rose-700"
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
            color: "bg-emerald-50 border-emerald-200 text-emerald-700"
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
            color: "bg-amber-50 border-amber-200 text-amber-700"
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
            color: "bg-orange-50 border-orange-200 text-orange-700"
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
            color: "bg-green-50 border-green-200 text-green-700"
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
            color: "bg-purple-50 border-purple-200 text-purple-700"
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
            color: "bg-lime-50 border-lime-200 text-lime-700"
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
            color: "bg-yellow-50 border-yellow-200 text-yellow-700"
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
            color: "bg-amber-50 border-amber-200 text-amber-700"
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
            color: "bg-yellow-50 border-yellow-200 text-yellow-700"
        },
        {
            id: 11,
            name: "Red Immune Elixir",
            category: "Immunity",
            moodTag: "Butuh Energi",
            ingredients: "Semangka, Stroberi, Daun Mint",
            benefits: "Kandungan likopen dan vitamin C bertindak sebagai antioksidan kuat untuk menjaga hidrasi tubuh tetap optimal.",
            price: 26000,
            icon: Heart,
            color: "bg-red-50 border-red-200 text-red-700"
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
            color: "bg-teal-50 border-teal-200 text-teal-700"
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
            color: "bg-orange-50 border-orange-200 text-orange-700"
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
            color: "bg-green-50 border-green-200 text-green-700"
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
            color: "bg-purple-50 border-purple-200 text-purple-700"
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
            color: "bg-rose-50 border-rose-200 text-rose-700"
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
            color: "bg-red-50 border-red-200 text-red-700"
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
            color: "bg-amber-50 border-amber-200 text-amber-700"
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50">
            {/* ========== HEADER BAR ========== */}
            <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-emerald-100/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Left: Brand */}
                    <div className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="JuiceVibe Logo" className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex flex-col">
                            <h1 className="text-2xl md:text-3xl font-bold text-emerald-700 tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Juice<span className="text-orange-500">Vibe</span>
                            </h1>
                            <p className="text-[10px] md:text-xs text-emerald-600/70 font-light tracking-widest uppercase -mt-0.5">
                                AI-Powered Wellness Juice Bar
                            </p>
                        </div>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-sm font-semibold text-emerald-800 hover:text-orange-500 transition-colors">Home</a>
                        <a href="#about" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">About Us</a>
                        <a href="#combo" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Combo Juice</a>
                        <a href="#single" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Single Juice</a>
                        <a href="#contact" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Contact</a>
                    </nav>

                    {/* Right: Cart & Profile */}
                    <div className="flex items-center gap-6">
                        <div
                            onClick={() => setIsCartOpen(true)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200/60 cursor-pointer hover:bg-orange-100 transition-all ${isCartAnimating ? "animate-bounce scale-110 border-orange-500 bg-orange-100 shadow-md duration-300" : "duration-200"}`}
                        >
                            <ShoppingBag className={`w-5 h-5 text-orange-600 ${isCartAnimating ? "animate-pulse" : ""}`} />
                            <span className="text-sm font-semibold text-orange-700">
                                {totalCartItems}
                            </span>
                        </div>
                        <div
                            onClick={() => {
                                setLoginInput(userName);
                                setIsLoginOpen(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/40 border border-emerald-200/60 cursor-pointer hover:bg-emerald-100/80 transition-colors"
                            title="Klik untuk mengubah profil"
                        >
                            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">{userName.charAt(0).toUpperCase()}</div>
                            <span className="text-sm font-medium text-emerald-700">{userName}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* ========== HERO / ABOUT SECTION ========== */}
            <section id="about" className="bg-emerald-800 text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none animate-spin-slow">
                    <Leaf className="w-96 h-96 transform rotate-45 translate-x-1/3 -translate-y-1/3" />
                </div>
                <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none animate-float-slow">
                    <Sparkles className="w-64 h-64 transform -translate-x-1/3 translate-y-1/4" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-700 border border-emerald-600/50 text-emerald-100 text-xs font-bold uppercase tracking-widest mb-6 inline-block shadow-sm animate-hero-1">
                        Welcome to JuiceVibe Dashboard
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-md animate-hero-2">
                        Nutrisi Cerdas Sesuai <span className="animate-gradient-text">Mood Anda</span>.
                    </h2>
                    <p className="text-lg md:text-xl text-emerald-100/90 leading-relaxed mb-10 font-light animate-hero-3">
                        JuiceVibe bukan sekadar toko jus pada umumnya. Kami menggunakan teknologi AI terdepan untuk menganalisis kondisi fisik dan psikologis Anda hari ini, lalu meracik kombinasi jus segar yang paling tepat untuk mengembalikan energi, fokus, dan mood Anda.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 animate-hero-4">
                        <div className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl backdrop-blur-sm border border-white/5">
                            <Sparkles className="w-5 h-5 text-orange-400" />
                            <span className="text-sm font-semibold">Analisis AI Akurat</span>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl backdrop-blur-sm border border-white/5">
                            <Leaf className="w-5 h-5 text-emerald-300" />
                            <span className="text-sm font-semibold">100% Bahan Organik</span>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl backdrop-blur-sm border border-white/5">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm font-semibold">Instan Energy Boost</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== OUR VALUES SECTION ========== */}
            <section id="about" className="max-w-7xl mx-auto px-6 py-14">
                <div className="text-center mb-10 reveal">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4 inline-block border border-emerald-200">
                        Nilai Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                        Mengapa Memilih <span className="text-emerald-600">JuiceVibe</span>?
                    </h2>
                    <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                        Lebih dari sekadar kedai jus — kami adalah mitra kesehatan Anda sehari-hari yang didukung oleh alam dan teknologi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Value 1 */}
                    <div className="group bg-white rounded-2xl p-7 border border-emerald-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 reveal reveal-delay-1">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-500 transition-colors duration-300">
                            <Leaf className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">100% Bahan Segar</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Setiap jus dibuat dari bahan-bahan segar pilihan yang dipetik langsung dari petani lokal terpercaya setiap pagi, tanpa bahan pengawet atau pewarna buatan.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="group bg-white rounded-2xl p-7 border border-orange-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 reveal reveal-delay-2">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                            <Sparkles className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">AI-Powered Recommendation</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Didukung oleh teknologi Google Gemini AI, sistem kami menganalisis kondisi fisik dan psikologis Anda untuk meracik kombinasi jus yang paling tepat dan personal.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="group bg-white rounded-2xl p-7 border border-teal-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 reveal reveal-delay-3">
                        <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-teal-500 transition-colors duration-300">
                            <Shield className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Zero Waste & Ramah Lingkungan</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Kami berkomitmen terhadap lingkungan dengan menggunakan kemasan biodegradable, mendaur ulang sisa buah menjadi kompos, dan mengurangi jejak karbon di setiap proses.
                        </p>
                    </div>
                </div>
            </section>


            {/* ========== MAIN WORKSPACE ========== */}
            <main id="ai-station" className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
                {/* ===== WORKSPACE ROW: AI CONSULTANT & ANALYTICS ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* ===== KOLOM KIRI (col-span-2): AI CONSULTANT STATION ===== */}
                    <section className="lg:col-span-2 space-y-6">
                        {/* Greeting */}
                        <div className="bg-white rounded-2xl border border-emerald-100/60 p-6 shadow-sm reveal">
                            <div className="flex items-start gap-3">
                                <Sparkles className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1 animate-float" />
                                <div>
                                    <h2 className="text-lg font-semibold text-emerald-800 mb-1">
                                        Halo, {userName}!
                                    </h2>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Bagaimana kondisi psikologis & fisikmu hari ini? Biarkan AI
                                        kami merekomendasikan jus kesehatan yang perfect untuk moodmu
                                        saat ini.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mood Quick Toggles */}
                        <div className="reveal reveal-left reveal-delay-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                                Pilih Kondisimu:
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {moodOptions.map((mood) => (
                                    <div
                                        key={mood.mood}
                                        onClick={() => handleMoodClick(mood.label)}
                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 text-center flex flex-col items-center justify-center ${selectedMood === mood.label
                                            ? "bg-emerald-100/80 border-emerald-500 shadow-md"
                                            : "bg-white border-emerald-100/40 hover:border-emerald-300 hover:bg-emerald-50/40"
                                            }`}
                                    >
                                        <div className="mb-2">
                                            <mood.icon className={`w-5 h-5 ${mood.color}`} />
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-700 leading-tight">
                                            {mood.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Input Box */}
                        <div className="bg-white rounded-2xl border border-emerald-100/60 p-5 shadow-sm reveal reveal-right reveal-delay-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
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
                                className="w-full h-24 p-3 text-sm border border-emerald-100/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none bg-slate-50 text-slate-800 placeholder-slate-400 disabled:opacity-50"
                            />
                            <button
                                onClick={handleConsultation}
                                disabled={isLoading}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        AI Sedang Meracik...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Konsultasi dengan AI
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Conversation Stream */}
                        {(lastUserMessage || aiIsTyping || recommendation) && (
                            <div className="bg-slate-50 border border-emerald-100/60 rounded-2xl p-5 space-y-4 shadow-inner reveal">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Percakapan Konsultasi</label>

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
                                            <div className="max-w-[75%] bg-emerald-50 border border-emerald-100/50 text-emerald-900 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-start gap-2.5">
                                                <div className="w-6 h-6 bg-emerald-700 text-white rounded-full flex items-center justify-center font-extrabold text-[9px] mt-0.5 flex-shrink-0 animate-pulse">
                                                    AI
                                                </div>
                                                <div>
                                                    <p className="font-bold text-emerald-800 text-[10px] uppercase tracking-wide mb-1">Barista JuiceVibe</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-medium text-emerald-700/80">JuiceVibe AI sedang meracik menu...</span>
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
                                            <div className="w-full bg-gradient-to-br from-emerald-100/70 to-emerald-50/90 rounded-2xl border border-emerald-300/40 p-5 shadow-md">
                                                <div className="flex items-start gap-3 mb-4">
                                                    <div className="w-7 h-7 bg-emerald-700 text-white rounded-full flex items-center justify-center font-extrabold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                                                        AI
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-extrabold text-emerald-800">
                                                            {recommendation.name}
                                                        </h3>
                                                        <p className="text-xs text-emerald-700/90 font-medium mt-0.5 leading-relaxed bg-emerald-100/40 px-2.5 py-1.5 rounded-lg border border-emerald-200/30">
                                                            {recommendation.autoAddMessage || recommendation.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-5 pt-3 border-t border-emerald-200/50">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                                                            Khasiat & Kandungan:
                                                        </p>
                                                        <p className="text-xs text-slate-700 leading-relaxed">
                                                            {recommendation.benefits}
                                                        </p>
                                                    </div>
                                                    {recommendation.scientific && (
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                                                                Penjelasan Ilmiah:
                                                            </p>
                                                            <p className="text-[11px] text-slate-600 italic leading-relaxed">
                                                                "{recommendation.scientific}"
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-emerald-200/50">
                                                    <div>
                                                        <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Harga Menu</span>
                                                        <span className="text-xl font-extrabold text-emerald-700">
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
                                                        <span className="text-xs font-bold text-slate-500 italic bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
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
                    <section className="bg-white rounded-3xl border border-emerald-100/60 p-6 shadow-sm reveal space-y-6 lg:sticky lg:top-24">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-600 animate-pulse" />
                            <h3 className="font-bold text-base text-emerald-800">Vibe Health Analytics</h3>
                        </div>

                        {/* Circular Progress (Overall Health Score) */}
                        <div className="flex flex-col items-center justify-center py-5 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-100/40 relative overflow-hidden">
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
                                    <span className="text-3xl font-extrabold text-emerald-800">
                                        {Math.round((vibeScores.energy + vibeScores.calmness + vibeScores.detox) / 3)}%
                                    </span>
                                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Vibe Index</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 font-medium text-center px-4 leading-relaxed">
                                Kondisi mental & fisik terpadu Anda saat ini.
                            </p>
                        </div>

                        {/* Individual Sliders */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-slate-600 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-orange-500" /> Energi & Stamina</span>
                                    <span className="text-emerald-700">{vibeScores.energy}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${vibeScores.energy}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-slate-600 flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-purple-500" /> Ketenangan & Fokus</span>
                                    <span className="text-emerald-700">{vibeScores.calmness}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${vibeScores.calmness}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-slate-600 flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-emerald-500" /> Detoks & Kejernihan</span>
                                    <span className="text-emerald-700">{vibeScores.detox}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${vibeScores.detox}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Vibe Timeline Logs */}
                        <div className="pt-4 border-t border-emerald-100/50">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Rekam Jejak Mood</label>
                            <div className="space-y-3">
                                {vibeHistory.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                            <span className="font-semibold text-slate-700">{item.date}</span>
                                            <span className="text-slate-400 max-w-[100px] truncate">({item.mood})</span>
                                        </div>
                                        <span className="font-bold text-emerald-600">{item.score}%</span>
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

                {/* ===== KOLOM BAWAH: REKOMENDASI JUS COMBO ===== */}
                <section id="combo" className="space-y-6 reveal">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-emerald-600 animate-float" />
                        <h2 className="text-xl font-bold text-emerald-800">Rekomendasi Jus Combo</h2>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 flex-wrap pb-2 border-b border-emerald-100/40">
                        {["All", "Anti-Stress", "Energy", "Immunity", "Glowing", "Women Care"].map(
                            (category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveTab(category)}
                                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${activeTab === category
                                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md"
                                        : "bg-white border border-emerald-200/60 text-slate-700 hover:border-emerald-400 hover:text-emerald-600"
                                        }`}
                                >
                                    {category}
                                </button>
                            )
                        )}
                    </div>

                    {/* Combo Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal reveal-scale">
                        {filteredCombos.map((combo) => {
                            const IconComponent = combo.icon;
                            return (
                                <div
                                    key={combo.id}
                                    onClick={() => setExpandedItem(expandedItem === combo.id ? null : combo.id)}
                                    className="cursor-pointer group bg-white rounded-xl border border-emerald-100/50 p-5 hover:shadow-lg hover:border-emerald-300/60 transition-all duration-300 hover:translate-y-[-4px]"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-emerald-800">
                                                    {combo.name}
                                                </h3>
                                                <IconComponent className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium mb-2">
                                                {combo.category}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mood Tag & Ingredients */}
                                    <div className="mb-4 space-y-3">
                                        <div className="flex flex-wrap gap-1">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${combo.color}`}>
                                                {combo.moodTag}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-emerald-50">
                                            <p className="font-semibold text-emerald-700 mb-1">Bahan Utama:</p>
                                            <p className="leading-relaxed">{combo.ingredients}</p>

                                            {/* Expandable Benefits */}
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === combo.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                <p className="font-semibold text-emerald-700 mb-1">Khasiat:</p>
                                                <p className="leading-relaxed text-slate-500 italic">{combo.benefits}</p>
                                            </div>

                                            <p className="text-[10px] text-emerald-500/70 mt-2 text-center italic">
                                                {expandedItem === combo.id ? "Ketuk untuk menutup" : "Ketuk untuk melihat khasiat"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price & Add Button */}
                                    <div className="flex items-center justify-between pt-3 border-t border-emerald-100/40">
                                        <div>
                                            <span className="text-lg font-bold text-emerald-700">
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
                <section id="single" className="mt-6 pt-10 border-t border-emerald-100/60">
                    <div className="flex items-center gap-3 mb-6 reveal">
                        <div className="p-2.5 bg-emerald-100/60 rounded-xl">
                            <Leaf className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-emerald-800">Single Vibe Juices</h2>
                            <p className="text-sm text-emerald-600/70">Pilihan jus murni 100% cold-pressed untuk asupan nutrisi instan dan spesifik.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal reveal-scale">
                        {singleJuiceMenu.map((item) => (
                            <div key={item.id} className="relative overflow-hidden group rounded-2xl border border-emerald-100/60 p-4 hover:shadow-xl hover:border-emerald-300/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full text-center min-h-[240px] cursor-pointer" onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}>
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
            <section className="bg-gradient-to-br from-emerald-50 to-slate-50 py-14">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 reveal">
                        <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4 inline-block border border-amber-200">
                            Ulasan Pelanggan
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                            Kata Mereka tentang <span className="text-emerald-600">JuiceVibe</span>
                        </h2>
                        <p className="text-slate-500 mt-3 text-sm">Bergabunglah dengan ribuan pelanggan yang telah merasakan manfaatnya.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {reviews.map((review, idx) => (
                            <div key={review.id} className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 reveal reveal-scale reveal-delay-${Math.min(idx + 1, 5)}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{review.name}</p>
                                        <p className="text-xs text-slate-400">{review.orderType} · {review.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className={`text-lg ${review.rating >= star ? "text-amber-400" : "text-slate-200"}`}>★</span>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CONTACT & LOCATION SECTION ========== */}
            <section id="contact" className="max-w-7xl mx-auto px-6 py-12 border-t border-emerald-100/60 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-emerald-50/50 rounded-3xl p-8 md:p-12 border border-emerald-100/60 shadow-sm">
                    {/* Contact Info */}
                    <div className="space-y-8 reveal reveal-left">
                        <div>
                            <h2 className="text-3xl font-extrabold text-emerald-800 tracking-tight mb-3">Kunjungi JuiceVibe</h2>
                            <p className="text-emerald-600/80 leading-relaxed max-w-md">Rasakan kesegaran jus cold-pressed terbaik yang diracik langsung di depan mata Anda. Konsultasikan mood Anda langsung bersama barista AI kami di lokasi.</p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-100/50 text-emerald-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-1">Lokasi Kami</h4>
                                    <p className="text-sm text-slate-500">Jl. Wellness Center No. 88, Senopati<br />Jakarta Selatan, 12190</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-100/50 text-emerald-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-1">Jam Operasional</h4>
                                    <p className="text-sm text-slate-500">Senin - Jumat: 07:00 - 21:00<br />Sabtu - Minggu: 06:00 - 22:00</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-100/50 text-emerald-600">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-1">Hubungi Kami</h4>
                                    <p className="text-sm text-slate-500">+62 811-2345-6789<br />hello@juicevibe.id</p>
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-md">
                            <Camera className="w-5 h-5" />
                            Ikuti @JuiceVibe.id
                        </button>
                    </div>

                    {/* Dummy Map Illustration */}
                    <div className="w-full h-full min-h-[350px] bg-emerald-100/40 rounded-2xl border-2 border-emerald-200/50 relative overflow-hidden flex flex-col items-center justify-center group cursor-pointer hover:border-emerald-300 transition-colors reveal reveal-right reveal-delay-2">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-20"></div>
                        <MapPin className="w-16 h-16 text-emerald-500 mb-3 relative z-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300" />
                        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-emerald-100 relative z-10 text-center">
                            <h4 className="font-bold text-emerald-800">JuiceVibe Flagship Store</h4>
                            <p className="text-xs text-slate-500 mt-1">Buka di Google Maps</p>
                        </div>
                        {/* Map decorative circles */}
                        <div className="absolute w-64 h-64 border-4 border-emerald-200/40 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                    </div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <footer className="mt-12 py-6 border-t border-emerald-100/40 bg-white/50">
                <div className="max-w-7xl mx-auto px-6 text-center text-xs text-slate-500">
                    <p>Powered by Advanced AI Wellness Consultant &middot; Fresh Juice, Fresh Vibes</p>
                </div>
            </footer>

            {/* ========== CART DRAWER OVERLAY ========== */}
            <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex items-center justify-between p-6 border-b border-emerald-100">
                        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" /> Keranjang ({totalCartItems})
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                                <ShoppingBag className="w-16 h-16 text-emerald-300 mb-4" />
                                <p className="text-slate-500 font-medium">Keranjangmu masih kosong.</p>
                                <p className="text-sm text-slate-400 mt-1">Yuk pilih jus mood booster-mu hari ini!</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-emerald-100/50">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-emerald-800 mb-1">{item.name}</h4>
                                        {(item.sugarLevel || item.iceLevel) && (
                                            <p className="text-xs text-slate-500 mb-1 font-medium bg-emerald-100/50 inline-block px-2 py-0.5 rounded-md border border-emerald-200">
                                                Sugar: {item.sugarLevel} | Ice: {item.iceLevel}
                                            </p>
                                        )}
                                        <p className="text-emerald-600 font-semibold text-sm mb-3">Rp {item.price.toLocaleString("id-ID")}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center bg-white border border-emerald-200 rounded-lg overflow-hidden shadow-sm">
                                                <button onClick={() => handleUpdateQuantity(item.id, -1)} className="px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors">
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="px-2 font-medium text-sm w-6 text-center">{item.quantity}</span>
                                                <button onClick={() => handleUpdateQuantity(item.id, 1)} className="px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors">
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <button onClick={() => handleRemoveFromCart(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors ml-auto">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="p-6 border-t border-emerald-100 bg-emerald-50/30">

                            {/* Order Details Form */}
                            <div className="mb-6 space-y-4 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                                <div>
                                    <label className="block text-xs font-bold text-emerald-800 mb-1.5 uppercase tracking-wide">Nama Pemesan</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Ketik nama Anda..."
                                        className="w-full p-2.5 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-emerald-800 mb-1.5 uppercase tracking-wide">Tipe Pesanan</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setOrderType("Dine-in")}
                                            className={`py-2 rounded-lg border text-sm font-bold transition-all ${orderType === "Dine-in" ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"}`}
                                        >
                                            Dine-in
                                        </button>
                                        <button
                                            onClick={() => setOrderType("Takeaway")}
                                            className={`py-2 rounded-lg border text-sm font-bold transition-all ${orderType === "Takeaway" ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"}`}
                                        >
                                            Takeaway
                                        </button>
                                    </div>
                                </div>

                                {orderType === "Dine-in" && (
                                    <div className="animate-in slide-in-from-top-2 duration-300">
                                        <label className="block text-xs font-bold text-emerald-800 mb-1.5 uppercase tracking-wide">Nomor Meja</label>
                                        <input
                                            type="text"
                                            value={tableNumber}
                                            onChange={(e) => setTableNumber(e.target.value)}
                                            placeholder="Contoh: 12"
                                            className="w-full p-2.5 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 text-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold text-slate-600">Total Pembayaran</span>
                                <span className="text-xl font-bold text-emerald-800">Rp {totalCartPrice.toLocaleString("id-ID")}</span>
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
                <div className={`bg-white rounded-3xl p-6 md:p-8 max-w-md w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col ${isPaymentSelectionOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-emerald-800">Metode Pembayaran</h3>
                        <button onClick={() => setIsPaymentSelectionOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <button onClick={() => handleSelectPayment('qris')} className="w-full flex items-center justify-between p-4 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <QrCode className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-700">QRIS</h4>
                                    <p className="text-xs text-slate-500">Gopay, OVO, Dana, LinkAja</p>
                                </div>
                            </div>
                            <span className="text-emerald-600 font-bold">Pilih</span>
                        </button>

                        <button onClick={() => handleSelectPayment('transfer')} className="w-full flex items-center justify-between p-4 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-700">Transfer Bank</h4>
                                    <p className="text-xs text-slate-500">BCA, Mandiri, BNI, BRI</p>
                                </div>
                            </div>
                            <span className="text-emerald-600 font-bold">Pilih</span>
                        </button>

                        <button onClick={() => handleSelectPayment('cash')} className="w-full flex items-center justify-between p-4 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-700">Bayar di Kasir</h4>
                                    <p className="text-xs text-slate-500">Tunai atau Kartu Debit/Kredit</p>
                                </div>
                            </div>
                            <span className="text-emerald-600 font-bold">Pilih</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ========== QRIS DUMMY MODAL ========== */}
            <div className={`fixed inset-0 z-[110] flex items-center justify-center transition-opacity duration-300 ${isQrisOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isCheckingOut && setIsQrisOpen(false)}></div>
                <div className={`bg-white rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col items-center text-center ${isQrisOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-1">Scan QRIS</h3>
                    <p className="text-slate-500 mb-6 text-sm">Scan menggunakan aplikasi e-wallet Anda.</p>

                    <div className="bg-white p-2 rounded-2xl border-4 border-emerald-800 shadow-sm mb-6 relative">
                        {/* A dummy QR Code using an open API */}
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=JuiceVibeHackathonProject"
                            alt="Dummy QR Code"
                            className="w-48 h-48 rounded-lg"
                        />
                    </div>

                    <div className="bg-emerald-50 text-emerald-800 w-full p-4 rounded-xl mb-6">
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
                        className="mt-4 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors disabled:opacity-50"
                    >
                        Batalkan
                    </button>
                </div>
            </div>

            {/* ========== TRANSFER BANK MODAL ========== */}
            <div className={`fixed inset-0 z-[110] flex items-center justify-center transition-opacity duration-300 ${isTransferOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isCheckingOut && setIsTransferOpen(false)}></div>
                <div className={`bg-white rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col ${isTransferOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-1 text-center">Transfer Bank</h3>

                    {!selectedBank ? (
                        <>
                            <p className="text-slate-500 mb-6 text-sm text-center">Pilih bank tujuan transfer Anda.</p>
                            <div className="space-y-3 mb-6">
                                {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
                                    <button
                                        key={bank}
                                        onClick={() => setSelectedBank(bank)}
                                        className="w-full flex items-center justify-between p-4 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all font-bold text-slate-700"
                                    >
                                        {bank} Virtual Account
                                        <ChevronRight className="w-5 h-5 text-emerald-500" />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsTransferOpen(false)}
                                className="w-full mt-2 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
                            >
                                Batalkan
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-slate-500 mb-6 text-sm text-center">Transfer sesuai nominal ke nomor Virtual Account di bawah.</p>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-center">
                                <p className="text-xs font-bold text-slate-500 mb-1">{selectedBank} Virtual Account</p>
                                <p className="text-2xl font-mono font-bold tracking-widest text-emerald-800">8890 1234 5678</p>
                            </div>

                            <div className="bg-emerald-50 text-emerald-800 w-full p-4 rounded-xl mb-6 text-center">
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
                                className="mt-4 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors text-center w-full disabled:opacity-50"
                            >
                                Ganti Bank
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* ========== CHECKOUT SUCCESS MODAL ========== */}
            <div className={`fixed inset-0 z-[120] flex items-center justify-center transition-opacity duration-300 ${checkoutSuccess ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCheckoutSuccess(false)}></div>
                <div className={`bg-white rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col items-center text-center ${checkoutSuccess ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-2">Pembayaran Berhasil!</h3>
                    <p className="text-slate-500 mb-6 leading-relaxed text-sm">
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
                        className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-colors text-sm"
                    >
                        Lewati, Kembali ke Beranda
                    </button>
                </div>
            </div>
            {/* ========== KARTU PRESKRIPSI DIGITAL MODAL ========== */}
            <div className={`fixed inset-0 z-[150] flex items-center justify-center transition-opacity duration-300 ${isPrescriptionOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsPrescriptionOpen(false)}></div>
                <div className={`bg-white rounded-[32px] max-w-md w-full max-h-[90vh] mx-4 relative z-[160] shadow-2xl transition-transform duration-300 transform overflow-hidden flex flex-col ${isPrescriptionOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    {/* Brand Header */}
                    <div className="bg-emerald-800 p-6 text-center text-white relative flex-shrink-0">
                        <button
                            onClick={() => setIsPrescriptionOpen(false)}
                            className="absolute top-4 right-4 text-emerald-100 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Activity className="w-6 h-6 text-emerald-300 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold">Resep Vibe-Check AI</h3>
                        <p className="text-xs text-emerald-200 mt-1">JuiceVibe AI Wellness Clinic</p>
                    </div>

                    {/* Prescription Details */}
                    <div className="p-6 space-y-6 bg-slate-50/50 overflow-y-auto flex-1">
                        {/* Patient info */}
                        <div className="grid grid-cols-2 gap-4 text-xs pb-4 border-b border-dashed border-emerald-200">
                            <div>
                                <span className="text-slate-400 block uppercase tracking-wider font-semibold">Nama Pemesan</span>
                                <span className="text-slate-700 font-bold text-sm block mt-0.5">{customerName || userName}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-400 block uppercase tracking-wider font-semibold">Tanggal Periksa</span>
                                <span className="text-slate-700 font-bold text-sm block mt-0.5">{new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Health Indexes */}
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Peta Indeks Kesehatan</span>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white border border-emerald-100 p-3 rounded-xl text-center">
                                    <Zap className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                    <span className="text-[10px] font-bold text-slate-500 block">Stamina</span>
                                    <span className="text-base font-extrabold text-emerald-700">{vibeScores.energy}%</span>
                                </div>
                                <div className="bg-white border border-emerald-100 p-3 rounded-xl text-center">
                                    <Brain className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                                    <span className="text-[10px] font-bold text-slate-500 block">Ketenangan</span>
                                    <span className="text-base font-extrabold text-emerald-700">{vibeScores.calmness}%</span>
                                </div>
                                <div className="bg-white border border-emerald-100 p-3 rounded-xl text-center">
                                    <Leaf className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                                    <span className="text-[10px] font-bold text-slate-500 block">Detoks</span>
                                    <span className="text-base font-extrabold text-emerald-700">{vibeScores.detox}%</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis Diagnosis */}
                        <div className="bg-white border border-emerald-100/60 p-4 rounded-2xl">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Sparkles className="w-4 h-4 text-emerald-600 animate-float" />
                                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Diagnosis Barista AI</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                {recommendation ? `"${recommendation.autoAddMessage || recommendation.description}"` : `"Berdasarkan taksiran rekam jejak, tubuh Anda memerlukan asupan vitamin harian untuk mengembalikan vitalitas optimal."`}
                            </p>
                        </div>

                        {/* Prescribed Juice */}
                        <div className="bg-emerald-50 border-2 border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">Rekomendasi Jus Utama</span>
                                <span className="text-base font-extrabold text-emerald-950 mt-1 block">
                                    {recommendation ? recommendation.name : "Apel Fuji Murni"}
                                </span>
                            </div>
                            <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold">
                                AI
                            </div>
                        </div>

                        {/* QR Code Validation */}
                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-dashed border-emerald-200">
                            <div className="flex-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verifikasi Resep</span>
                                <p className="text-[9px] text-slate-500 mt-1 leading-snug">Pindai kode QR untuk memvalidasi preskripsi ini secara resmi dengan platform Google Vibe.</p>
                            </div>
                            <div className="p-1.5 bg-white border border-emerald-100 rounded-xl flex-shrink-0">
                                <QrCode className="w-12 h-12 text-slate-700" />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-white border-t border-slate-100 flex gap-3 flex-shrink-0">
                        <button
                            onClick={() => {
                                showToast("Kartu preskripsi kesehatan Anda berhasil diunduh!");
                                setIsPrescriptionOpen(false);
                            }}
                            className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                        >
                            Unduh PDF / PNG
                        </button>
                        <button
                            onClick={() => setIsPrescriptionOpen(false)}
                            className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-colors"
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
                <div className={`bg-white rounded-3xl p-6 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform flex flex-col ${itemToCustomize ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-xl font-bold text-emerald-800 mb-1">{itemToCustomize?.name}</h3>
                    <p className="text-slate-500 mb-6 text-sm">Sesuaikan tingkat kemanisan dan es.</p>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Tingkat Kemanisan</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Normal', 'Less', 'No Sugar'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setSugarLevel(level)}
                                        className={`py-2 rounded-lg border text-xs font-bold transition-all ${sugarLevel === level ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Tingkat Es</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Normal', 'Less', 'No Ice'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setIceLevel(level)}
                                        className={`py-2 rounded-lg border text-xs font-bold transition-all ${iceLevel === level ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"}`}
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
                        Simpan & Tambah
                    </button>
                </div>
            </div>

            {/* ========== REVIEW MODAL ========== */}
            <div className={`fixed inset-0 z-[140] flex items-center justify-center transition-opacity duration-300 ${isReviewOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsReviewOpen(false)}></div>
                <div className={`bg-white rounded-3xl p-7 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform ${isReviewOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">Bagaimana Pengalamanmu?</h3>
                    <p className="text-slate-500 text-sm mb-5">Ulasanmu sangat berarti bagi kami, Kak {customerName}!</p>

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
                                <span className={(hoveredStar || reviewRating) >= star ? "text-amber-400" : "text-slate-200"}>
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
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none mb-5 bg-slate-50"
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
                <div className={`bg-white rounded-3xl p-8 max-w-sm w-full mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform ${isLoginOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>

                    <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
                            {loginInput.charAt(0).toUpperCase() || "?"}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Siapa Nama Anda?</h3>
                        <p className="text-slate-500 text-sm mt-1">Agar pengalaman JuiceVibe Anda lebih personal.</p>
                    </div>

                    <input
                        type="text"
                        value={loginInput}
                        onChange={(e) => setLoginInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && loginInput.trim()) {
                                setUserName(loginInput.trim());
                                setIsLoginOpen(false);
                            }
                        }}
                        placeholder="Ketik nama Anda..."
                        autoFocus
                        className="w-full p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm mb-4 text-center font-semibold text-slate-700 bg-slate-50"
                    />

                    <button
                        onClick={() => {
                            if (loginInput.trim()) {
                                setUserName(loginInput.trim());
                                setIsLoginOpen(false);
                                showToast(`Selamat datang, ${loginInput.trim()}!`);
                            }
                        }}
                        disabled={!loginInput.trim()}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Mulai Session
                    </button>
                </div>
            </div>

            {/* ========== AI UPSELL MODAL ========== */}
            <div className={`fixed inset-0 z-[150] flex items-end sm:items-center justify-center transition-opacity duration-300 ${isUpsellOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { if (!isLoadingUpsell) { setIsUpsellOpen(false); setIsPaymentSelectionOpen(true); } }}></div>
                <div className={`bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md mx-0 sm:mx-4 relative z-10 shadow-2xl transition-transform duration-300 transform overflow-hidden ${isUpsellOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"}`}>

                    {/* Barista AI Header */}
                    <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Barista AI</p>
                            <p className="text-emerald-200 text-xs">Rekomendasi personal untuk Anda</p>
                        </div>
                        <button onClick={() => { setIsUpsellOpen(false); setIsPaymentSelectionOpen(true); }} className="ml-auto text-white/60 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        {isLoadingUpsell ? (
                            <div className="flex flex-col items-center gap-3 py-8">
                                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                                <p className="text-sm text-slate-500">Barista AI sedang menganalisis pesanan Anda...</p>
                            </div>
                        ) : upsellSuggestion ? (
                            <>
                                {/* Chat bubble */}
                                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl rounded-tl-sm p-4 mb-5">
                                    <p className="text-sm text-slate-700 leading-relaxed">{upsellSuggestion.barista_message}</p>
                                </div>

                                {/* Product card */}
                                <div className="border border-slate-200 rounded-2xl p-4 mb-5 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Leaf className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">{upsellSuggestion.suggestedName}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{upsellSuggestion.nutritionReason}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs text-slate-400 line-through">Rp {upsellSuggestion.originalPrice?.toLocaleString("id-ID")}</p>
                                        <p className="text-emerald-700 font-bold">Rp {upsellSuggestion.discountedPrice?.toLocaleString("id-ID")}</p>
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
                                    className="w-full py-3 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
                                >
                                    Tidak, lanjutkan pembayaran
                                </button>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

        </div>
    );
}