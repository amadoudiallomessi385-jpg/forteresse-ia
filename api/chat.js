export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Non autorisé');
    
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; // Le Gardien utilise la clé cachée dans Vercel

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Réponds comme un guerrier protecteur à : " + message }] }]
            })
        });
        const data = await response.json();
        res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
    } catch (error) {
        res.status(500).json({ error: "Le Donjon est inaccessible pour le moment." });
    }
}
