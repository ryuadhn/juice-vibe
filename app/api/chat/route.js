import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Menu catalog - MUST match IDs and names in page.jsx singleJuiceMenu
const menuCatalog = [
    { id: 101, name: "Apel Fuji Murni" },
    { id: 102, name: "Bayam Hijau" },
    { id: 103, name: "Sari Lemon Shot" },
    { id: 104, name: "Wortel Cold-Press" },
    { id: 105, name: "Stroberi Segar" },
    { id: 106, name: "Sari Jahe Shot" },
    { id: 107, name: "Bit Merah" },
    { id: 108, name: "Detoks Seledri" },
    { id: 109, name: "Timun Segar" },
    { id: 110, name: "Nanas Booster" },
    { id: 111, name: "Semangka Segar" },
    { id: 112, name: "Jeruk Murni" },
    { id: 113, name: "Mangga Manis" },
    { id: 114, name: "Alpukat Lembut" },
    { id: 115, name: "Tomat Antioksidan" },
    { id: 116, name: "Melon Segar" },
    { id: 117, name: "Buah Naga Merah" },
    { id: 118, name: "Jambu Biji Merah" },
    { id: 119, name: "Kiwi Hijau" },
    { id: 120, name: "Pir Manis" },
    { id: 121, name: "Delima Merah" },
    { id: 122, name: "Sirsak Segar" },
    { id: 123, name: "Detoks Kale Hijau" },
    { id: 124, name: "Belimbing Manis" },
];

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
            return NextResponse.json({ error: "API Key belum disetting di .env.local" }, { status: 500 });
        }

        const menuList = menuCatalog.map(m => `${m.id}="${m.name}"`).join(", ");

        const systemPrompt = `Anda adalah Barista AI di JuiceVibe. Analisis keluhan pelanggan, rekomendasikan jus terbaik, dan lakukan penaksiran kesehatan (skor 30-100) saat ini berdasarkan cerita keluhan mereka.

Menu tersedia: ${menuList}

Pilih menu yang PALING COCOK untuk keluhan. Balas HANYA JSON objek berikut (tanpa teks di luar JSON):
{
  "name": "nama jus kreatif",
  "description": "bahan-bahan",
  "benefits": "manfaat spesifik",
  "price": 20000,
  "scientific": "penjelasan singkat ilmiah",
  "autoAddToCart": true,
  "matchedMenuId": 107,
  "autoAddMessage": "Pesan AI singkat kenapa jus ini dipilih",
  "scores": {
    "energy": 75,
    "calmness": 85,
    "detox": 70
  }
}

Aturan matchedMenuId harus ID dari menu di atas.
Aturan Penaksiran Skor Kesehatan:
- energy: tingkat kesegaran/stamina fisik (skor rendah 30-60 jika mereka mengeluh capek, begadang, lemas; skor tinggi 70-100 jika fit).
- calmness: tingkat kedamaian pikiran/mental (skor rendah jika stres, cemas, pusing, marah; tinggi jika tenang).
- detox: tingkat kebersihan organ/pencernaan (skor rendah jika sembelit, jerawatan, panas dalam, terlalu banyak junk food).

Aturan Proteksi Input Acak/Tidak Relevan:
Jika input atau curhatan pengguna sama sekali tidak relevan dengan tema kesehatan, kondisi fisik, masalah psikologis/mood, atau pemesanan jus (misalnya user hanya mengetik teks acak seperti 'asdasd', 'wkwkwk', atau tes yang tidak jelas), jangan bingung dan jangan berikan rekomendasi jus asal-asalan. Jawablah dengan kepribadian barista JuiceVibe yang ramah dan jenaka, lalu arahkan mereka kembali secara halus untuk berkonsultasi seputar kondisi tubuh atau mood harian mereka agar kamu bisa memilihkan menu yang tepat. Dalam kasus ini, gunakan format JSON berikut:
{
  "name": "Sapaan Barista AI",
  "description": "Tidak ada produk yang direkomendasikan.",
  "benefits": "Kami siap membantu jika Anda ingin berkonsultasi seputar kesehatan atau mood Anda.",
  "price": 0,
  "scientific": "Tertawa dan obrolan santai adalah langkah awal menuju kebugaran!",
  "autoAddToCart": false,
  "matchedMenuId": null,
  "autoAddMessage": "[Isi dengan jawaban ramah, jenaka, dan mengarahkan kembali ke konsultasi kesehatan/mood]",
  "scores": null
}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
            }
        });

        let rawText = response.text.trim();
        // Strip any accidental markdown code fences
        rawText = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");

        const data = JSON.parse(rawText);
        return NextResponse.json(data);

    } catch (error) {
        console.error("Gemini API Error:", error.message || error);
        return NextResponse.json({ error: "Gagal mendapatkan rekomendasi dari AI" }, { status: 500 });
    }
}
