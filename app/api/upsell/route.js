import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const menuCatalog = [
    { id: 101, name: "Apel Fuji Murni", price: 15000 },
    { id: 102, name: "Bayam Hijau", price: 18000 },
    { id: 103, name: "Sari Lemon Shot", price: 15000 },
    { id: 104, name: "Wortel Cold-Press", price: 15000 },
    { id: 105, name: "Stroberi Segar", price: 20000 },
    { id: 106, name: "Sari Jahe Shot", price: 15000 },
    { id: 107, name: "Bit Merah", price: 28000 },
    { id: 108, name: "Detoks Seledri", price: 30000 },
    { id: 109, name: "Timun Segar", price: 20000 },
    { id: 110, name: "Nanas Booster", price: 28000 },
    { id: 111, name: "Semangka Segar", price: 25000 },
    { id: 112, name: "Jeruk Murni", price: 30000 },
    { id: 113, name: "Mangga Manis", price: 28000 },
    { id: 114, name: "Alpukat Lembut", price: 35000 },
    { id: 115, name: "Tomat Antioksidan", price: 25000 },
    { id: 116, name: "Melon Segar", price: 26000 },
    { id: 117, name: "Buah Naga Merah", price: 30000 },
    { id: 118, name: "Jambu Biji Merah", price: 25000 },
    { id: 119, name: "Kiwi Hijau", price: 35000 },
    { id: 120, name: "Pir Manis", price: 28000 },
    { id: 121, name: "Delima Merah", price: 38000 },
    { id: 122, name: "Sirsak Segar", price: 26000 },
    { id: 123, name: "Detoks Kale Hijau", price: 32000 },
    { id: 124, name: "Belimbing Manis", price: 24000 },
];

export async function POST(req) {
    try {
        const { cartItems } = await req.json();

        if (!cartItems || cartItems.length < 2) {
            return NextResponse.json({ upsell: false });
        }

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
            return NextResponse.json({ upsell: false });
        }

        const cartSummary = cartItems.map(i => i.name).join(", ");
        const cartIds = cartItems.map(i => i.id);
        const availableMenu = menuCatalog
            .filter(m => !cartIds.some(id => String(id).includes(String(m.id))))
            .map(m => `${m.id}="${m.name}"(Rp${m.price.toLocaleString("id-ID")})`).join(", ");

        const systemPrompt = `Anda adalah Barista AI JuiceVibe yang cerdas, ahli nutrisi, dan ramah. Analisis keranjang belanja customer dan pilih secara dinamis 1 jus tambahan dari daftar "Menu tersedia" yang PALING MELENGKAPI rasa atau khasiat dari produk yang sudah ada di keranjang mereka.

Keranjang saat ini: ${cartSummary}
Menu tersedia (belum di keranjang): ${availableMenu}

ATURAN REKOMENDASI DUSTIN (Barista AI):
1. Pilih HANYA SATU produk yang ada di daftar "Menu tersedia" di atas (tidak boleh memilih produk yang sudah ada di keranjang).
2. Lakukan analisa rasa & nutrisi secara nyata. Contoh:
   - Jika keranjang didominasi sayuran/hijau (Green Spinach, Celery), sarankan buah manis segar (Fuji Apple, Pure Orange, Sweet Pear) untuk menyeimbangkan rasa.
   - Jika keranjang didominasi imun shot/jahe, sarankan buah hydrator (Watermelon Rush, Cucumber Splash) untuk menetralkan rasa pedas jahe.
   - Jika keranjang bernutrisi olahraga, sarankan penambah energi atau protein/kalium (Avocado Smooth, Mango Delight).
3. Hitung discountedPrice = originalPrice * 0.85 (dibulatkan ke kelipatan terdekat).
4. Buat pesan barista_message yang sangat alami, personal, ramah, dan tidak kaku (seperti barista sungguhan menyapa ramah), jelaskan secara singkat khasiat gabungan keduanya dan sebutkan diskon 15%.

Balas dengan format JSON objek berikut tanpa ada teks tambahan di luar JSON:
{
    "upsell": true,
    "matchedMenuId": [ID jus terpilih dari daftar Menu tersedia, tipe number],
    "suggestedName": "[Nama jus terpilih, tipe string]",
    "originalPrice": [Harga asli jus terpilih, tipe number],
    "discountPercent": 15,
    "discountedPrice": [Harga diskon 15% dari jus terpilih, tipe number],
    "barista_message": "[Pesan personal ramah dari barista (1-2 kalimat) menjelaskan mengapa jus pilihan Anda ini melengkapi pesanan mereka secara rasa/nutrisi dan sebut diskon 15%]",
    "nutritionReason": "[Alasan singkat kombinasi nutrisi sehat antara keranjang saat ini dan menu baru]"
}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analisis keranjang: ${cartSummary}`,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
            }
        });

        let rawText = response.text.trim()
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "");

        const data = JSON.parse(rawText);
        return NextResponse.json(data);

    } catch (error) {
        console.error("Upsell API Error:", error.message || error);
        return NextResponse.json({ upsell: false });
    }
}
