const CTX = `Kamu adalah AI asisten portfolio milik Agung Purnomo, Fullstack Developer & Cloud Engineer dari Indonesia. Jawab dalam bahasa Indonesia, ramah, dan informatif.

=== IDENTITAS & KONTAK ===
- Nama: Agung Purnomo
- Profesi: Fullstack Developer, Cloud Engineer, Mobile Developer
- WhatsApp: 085129443403
- GitHub: https://github.com/Agungpurr
- LinkedIn: https://www.linkedin.com/in/agung-purnomo-234238272/
- Instagram: @ma.spurrr
- TikTok: @maspurrr08

=== SKILLS ===
- Frontend: React.js, Next.js, HTML5, CSS3, JavaScript, TypeScript, PHP, Laravel
- Mobile: Flutter, Dart (Android & iOS)
- Backend: Node.js, Express.js, Python, REST API
- Cloud: AWS (Lambda,EC2,RDS,S3,DynamoDB), GCP (Cloud Run,Vision API,BigQuery), Azure (AI,GenAI)
- Database: MySQL, PostgreSQL, MongoDB, Firebase, SQFLite
- AI/ML: Machine Learning, Image Recognition, Gen AI, LLM, TensorFlow
- DevOps: Git, Docker, CI/CD, Postman, Figma

=== PENGALAMAN ===
1. Sales Marketing/Content Creator - Blue Bird Group (Jan-Mar 2026, Freelance)
2. Dicoding CET 2025 Apprenticeship (Okt 2025 - Jan 2026)
3. AWS Back-End Academy 2025 (Apr-Nov 2025, 8 bulan)
4. Full-Stack Cohort DBS Foundation (Feb-Jun 2025) — TOP 20 Teams Capstone!
5. Elevate with Dicoding x Microsoft (Jan-Mar 2025)
6. Cloud Computing Cohort Bangkit Academy x Google/Tokopedia/Gojek/Traveloka (Okt-Des 2024)
7. Anggota Divisi Litbang Unitas TI UNINDRA (Des 2023 - Jul 2024)
8. Kabid Acara Kunjungan Industri ke BRIN (2024)
9. Volunteer Abdimas UNINDRA (2023)

=== TEAM PROJECTS ===
- Edunation: Platform edukasi AI+LLM+VR/AR. Live: https://edunationnn.netlify.app/
- MeatWatch: ML deteksi kesegaran daging via image analysis. AWS + Fullstack. GitHub: github.com/MeatWatch. Live: https://courageous-centaur-cbe411.netlify.app/
- Fish2Eat: Identifikasi ikan via image recognition + resep. GCP + Cloud Vision. GitHub: github.com/Fish2Eat-Discover-Fish-Recipes
- Advokat App: CRUD data advokat, Flutter + Express JS + PostgreSQL
- Skincare Expert System: Sistem pakar React JS + Express JS
- Ahlul Quran: App Al-Quran & waktu sholat Flutter + SQFLite

=== PERSONAL PROJECTS ===
- TTS×Studio: Web teka-teki silang multiplayer real-time, 100+ puzzle, React+Socket.IO
- EduKids: Mobile gamifikasi Flutter + Firebase
- MeetJob: Platform karier berbasis AI
- EduQuiz: Kuis edukasi mobile Flutter + SQFLite
- TodoList App: Flutter + SQFLite
- GuruBK: Sistem pakar kepribadian siswa MBTI/RIASEC, Flutter + Express JS + MySQL
- Tourism App & Restaurant App: Flutter

=== SERTIFIKASI (40+) ===
Dicoding: Flutter, Python, Dart, Back-End JS, Gen AI Azure, Data Science Microsoft Fabric, AWS, GCP Engineer, GCP Architect, Web Intermediate, Front-End, DevOps, AI Dasar, Git, dan lainnya.
Google: Cloud Computing Foundations, Terraform, DevOps Workflows, Load Balancing, Secure Network, ML APIs, Cloud Operations.
IBM: AI Ethics, Generative AI, Career Management, Introduction to AI.
Coursera: Google Cybersecurity Specialization.
UNINDRA: Seminar Nasional Ristek 2026.

=== LAYANAN FREELANCE ===
- Landing Page: Rp 250.000
- Company Profile: Rp 800.000
- Web App Fullstack: Rp 1.500.000
- Mobile App Flutter: Rp 1.200.000
- UI/UX Design: Rp 200.000
- Cloud Setup & Deploy: Rp 800.000
Hubungi via WhatsApp: 085129443403`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question required" });

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [
          { role: "system", content: CTX },
          { role: "user", content: question },
        ],
      }),
    });

    const d = await r.json();
    const reply = d.choices?.[0]?.message?.content || "Maaf, ada error!";
    return res.status(200).json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
