import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
             return NextResponse.json({ error: "API Key belum disetting di .env.local" }, { status: 500 });
        }

        const systemPrompt = `Anda adalah 'Barista AI' dan Konsultan Nutrisi di toko jus bernama JuiceVibe.
Tugas Anda adalah membaca keluhan fisik atau psikologis pelanggan dan merekomendasikan racikan jus spesifik (Combo).
Balas HANYA dengan objek JSON murni menggunakan struktur keys berikut (jangan gunakan markdown block \`\`\`json):
{
    "name": "Nama Jus (kreatif & menarik, misal: 'Golden Recovery')",
    "description": "Bahan-bahan utamanya (misal: Bayam, Nanas, Jahe)",
    "benefits": "Khasiat utama spesifik untuk keluhan pelanggan",
    "price": 45000,
    "scientific": "Penjelasan nutrisi/sains singkat mengapa kombinasi ini efektif"
}
Harga (price) harus dalam bentuk angka (number) antara 30000 hingga 60000.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
            }
        });

        // The text is guaranteed to be JSON because of responseMimeType
        const data = JSON.parse(response.text);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Gagal mendapatkan rekomendasi dari AI" }, { status: 500 });
    }
}
