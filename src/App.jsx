import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import ArtifactModel from "./components/ArtifactModel";
import CandiBentar from "./components/CandiBentar";
import { UI, JA } from "./i18n";

// ================= GAYA PRESTIGE ACADEMIC NAVY & GOLD =================
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&display=swap');

.f-display { font-family: 'Cinzel Decorative', serif; }
.f-body { font-family: 'Cormorant Garamond', Georgia, serif; }
.lang-ja .f-display, .lang-ja .f-body { font-family: 'Noto Serif JP', serif; }
.lang-ja .italic { font-style: normal; }

.gold-ribbon { background: linear-gradient(90deg, #9a6b17 0%, #e9c46a 50%, #c8952c 100%); }
.navy-dark { background-color: #0b1a47; }
.gold-text-gradient { 
  background: linear-gradient(90deg, #9a6b17 0%, #e9c46a 50%, #c8952c 100%); 
  -webkit-background-clip: text; 
  background-clip: text; 
  color: transparent; 
}

@keyframes slideUpFade { 
  from { opacity: 0; transform: translateY(20px); filter: blur(4px); } 
  to { opacity: 1; transform: none; filter: blur(0); } 
}
.animate-item { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 150ms; }
.delay-300 { animation-delay: 200ms; }
.delay-400 { animation-delay: 250ms; }

.style-scrollbar::-webkit-scrollbar { width: 6px; }
.style-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
.style-scrollbar::-webkit-scrollbar-thumb { background: rgba(200, 149, 44, 0.4); border-radius: 10px; }
.style-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(200, 149, 44, 0.8); }

.glass-panel-navy {
  background: rgba(11, 26, 71, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(200, 149, 44, 0.3);
  box-shadow: 0 8px 32px 0 rgba(6, 17, 46, 0.5);
}

@media (prefers-reduced-motion: reduce) { .animate-item { animation: none; filter: none; } }
`;

function Ornamen({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`w-48 h-5 text-[#c8952c] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M0 12H88M152 12H240" />
      <path d="M120 2l8 10-8 10-8-10z" fill="currentColor" />
      <path d="M104 12c-6-8-14-8-16 0 2 8 10 8 16 0zM136 12c6-8 14-8 16 0-2 8-10 8-16 0z" />
      <circle cx="96" cy="12" r="1.6" fill="currentColor" />
      <circle cx="144" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function LoadingOverlay({ label = "Memuat" }) {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0b1a47]/90 backdrop-blur-md transition-opacity duration-500">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-[#c8952c]/20 border-t-[#c8952c] animate-spin" />
        <div className="f-display text-[#e9c46a] tracking-widest bg-[#06112e]/90 px-8 py-3 border border-[#c8952c]/40 text-sm rounded-full shadow-[0_0_15px_rgba(200,149,44,0.3)]">
          {label} {progress.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

// --- DATA KOLEKSI ---
const collections = [
  { id: 1, title: "Anggada", julukan: "Duta Perdamaian dari Kiskenda", kubu: "Pihak Rama", tagline: "Satu kakinya menancap, tak seorang pun di Alengka sanggup menggesernya.", watak: ["Setia", "Berani", "Cerdik"], description: "Anggada adalah ksatria wanara (manusia kera) yang tangguh, putra dari Subali. Ia menjadi salah satu panglima andalan Sri Rama yang sangat berjasa dalam misi penyerangan ke kerajaan Alengka.", momen: "Diutus Rama sebagai duta ke istana Rahwana. Ia menancapkan kakinya ke lantai dan menantang siapa pun mengangkatnya.", pesan: "Kekuatan sejati tidak perlu berteriak. Keteguhan sudah cukup membuat lawan gentar.", modelPath: "/models/ANGGADA low.fbx", scale: 0.05 },
  { id: 2, title: "Dewi Sita", julukan: "Putri Mantili, Teladan Kesetiaan", kubu: "Pihak Rama", tagline: "Diculik karena kecantikannya, dikenang karena keteguhannya.", watak: ["Suci", "Sabar", "Teguh"], description: "Istri dari Sri Rama yang melambangkan kesucian, kesetiaan, dan keteguhan hati. Penculikan Dewi Sita oleh Rahwana adalah pemicu utama meletusnya perang besar epik Ramayana.", momen: "Ditawan di Taman Asoka, Sita menolak semua bujukan Rahwana dan tetap menanti Rama.", pesan: "Kesetiaan dan harga diri tetap utuh walau seluruh keadaan berusaha menggoyahkannya.", modelPath: "/models/dewi sita low.fbx", scale: 0.05 },
  { id: 3, title: "Hanoman", julukan: "Kera Putih Utusan Rama", kubu: "Pihak Rama", tagline: "Melompati samudera, membakar Alengka, kembali membawa kabar.", watak: ["Perkasa", "Setia", "Rendah Hati"], description: "Pahlawan besar berwujud kera putih yang memiliki kekuatan dewa. Dedikasi dan kesetiaannya kepada Sri Rama tidak tertandingi.", momen: "Ditangkap pasukan Rahwana, ekornya dibakar. Hanoman justru melompat dari atap ke atap dan menyulut ibu kota Alengka.", pesan: "Pengabdian tulus tanpa pamrih adalah bentuk kekuatan tertinggi.", modelPath: "/models/hanoman low.fbx", scale: 0.05 },
  { id: 4, title: "Jatayu", julukan: "Garuda Penjaga Hutan Dandaka", kubu: "Pihak Rama", tagline: "Tahu dirinya kalah, tetap memilih melawan.", watak: ["Gagah", "Rela Berkorban", "Setia Kawan"], description: "Burung garuda purba, sahabat Prabu Dasarata. Jatayu mengorbankan nyawanya dengan gagah berani saat mencoba menyelamatkan Dewi Sita dari cengkeraman Rahwana.", momen: "Mencegat Rahwana yang menerbangkan Sita. Sayapnya ditebas, tetapi ia bertahan hidup untuk memberi tahu Rama.", pesan: "Keberanian diukur dari kemauan membela yang lemah, bukan dari peluang menang.", modelPath: "/models/jatayu low.fbx", scale: 0.05 },
  { id: 5, title: "Kumbakarna", julukan: "Raksasa yang Membela Tanah Air", kubu: "Pihak Alengka", tagline: "Ia tahu kakaknya salah, tetapi tidak membiarkan negerinya runtuh sendirian.", watak: ["Jujur", "Kesatria", "Dilematis"], description: "Adik kandung Rahwana yang berwujud raksasa mengerikan, namun berhati ksatria dan jujur. Ia maju ke medan perang murni demi membela tanah airnya.", momen: "Terbangun dari tidur panjangnya, Kumbakarna menasihati Rahwana agar mengembalikan Sita.", pesan: "Cinta tanah air tidak sama dengan membenarkan kesalahan pemimpinnya.", modelPath: "/models/kumbakarna low.fbx", scale: 0.05 },
  { id: 6, title: "Patih Prahasta", julukan: "Panglima Agung Alengka", kubu: "Pihak Alengka", tagline: "Setia pada tugas, bahkan ketika arahnya sudah keliru.", watak: ["Disiplin", "Loyal", "Berwibawa"], description: "Paman dari Rahwana sekaligus Patih andalan kerajaan Alengka. Walaupun mengetahui kakaknya berada di jalan yang salah, ia tetap setia memimpin pasukan.", momen: "Memimpin pasukan raksasa menghadapi barisan wanara dalam pertempuran besar di gerbang Alengka.", pesan: "Kesetiaan buta bisa menyeret orang baik ke pihak yang salah.", modelPath: "/models/patih prahasta low.fbx", scale: 0.05 },
  { id: 7, title: "Rahwana", julukan: "Dasamuka, Raja Sepuluh Wajah", kubu: "Pihak Alengka", tagline: "Sakti, cerdas, dan hancur oleh keangkuhannya sendiri.", watak: ["Sakti", "Angkuh", "Ambisius"], description: "Raja iblis berwajah sepuluh (Dasamuka) yang sangat sakti. Amarah, keserakahan, dan keangkuhannya untuk memiliki Dewi Sita membawanya menuju kehancuran total.", momen: "Menculik Sita dan menolak setiap nasihat untuk mengembalikannya, sampai akhirnya gugur oleh panah Rama.", pesan: "Kepintaran dan kekuasaan tanpa pengendalian diri berujung pada kehancuran.", modelPath: "/models/rahwana low.fbx", scale: 0.05 },
  { id: 8, title: "Sri Rama", julukan: "Titisan Wisnu, Penegak Darma", kubu: "Pihak Rama", tagline: "Rela kehilangan takhta demi menepati janji.", watak: ["Bijaksana", "Tenang", "Berprinsip"], description: "Pangeran pewaris tahta Ayodhya, tokoh protagonis utama pembela darma (kebenaran). Dengan bersenjatakan panah sakti, ia berjuang menumpas angkara murka.", momen: "Menjalani 14 tahun pengasingan, lalu memimpin pasukan wanara menyeberangi lautan untuk menjemput Sita.", pesan: "Menegakkan kebenaran sering menuntut pengorbanan pribadi yang besar.", modelPath: "/models/rama low.fbx", scale: 0.05 },
  { id: 9, title: "Sempati", julukan: "Garuda Bersayap Patah", kubu: "Pihak Rama", tagline: "Tak lagi bisa terbang, tetapi penglihatannya menuntun pasukan.", watak: ["Penyayang", "Waspada", "Bijak"], description: "Kakak dari Jatayu yang kehilangan sayapnya saat melindungi adiknya dari sengatan matahari. Sempati kemudian memberikan informasi krusial kepada pasukan wanara.", momen: "Dari tebing pantai, ia melihat Sita ditawan di Alengka dan memberi tahu para wanara arah yang harus ditempuh.", pesan: "Keterbatasan tidak menghapus kemampuan untuk memberi arti bagi orang lain.", modelPath: "/models/sempati low.fbx", scale: 0.05 },
  { id: 10, title: "Sugriwa", julukan: "Raja Para Wanara", kubu: "Pihak Rama", tagline: "Kehilangan takhta, lalu membalas budi dengan seluruh pasukannya.", watak: ["Setia Janji", "Strategis", "Pemimpin"], description: "Raja para wanara yang tahtanya direbut oleh kakaknya, Subali. Setelah dibantu oleh Rama, ia membalas budi dengan mengerahkan seluruh pasukan keranya.", momen: "Bersekutu dengan Rama, ia mengerahkan ribuan wanara dari segala penjuru untuk mencari Sita dan menyerbu Alengka.", pesan: "Persekutuan yang dibangun di atas budi dan janji lebih kuat daripada pasukan mana pun.", modelPath: "/models/sugriwa low.fbx", scale: 0.05 },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lang, setLang] = useState("id");
  const t = UI[lang];
  const base = collections[currentIndex];
  const currentItem = lang === "ja" ? { ...base, ...JA[base.id] } : base;
  const isRama = base.kubu === "Pihak Rama";

  const handleNext = () => setCurrentIndex((p) => (p + 1) % collections.length);
  const handlePrev = () => setCurrentIndex((p) => (p - 1 + collections.length) % collections.length);

  const navBtn = "flex items-center justify-center p-3 rounded-full bg-[#0b1a47]/85 text-[#e9c46a] hover:bg-[#13296b] hover:text-[#ffffff] border border-[#c8952c]/50 transition-all duration-300 backdrop-blur-md shadow-[0_4px_15px_rgba(6,17,46,0.6)] hover:shadow-[0_0_20px_rgba(200,149,44,0.4)] hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8952c]";

  return (
    <div className={`bg-[#0b1a47] text-[#1c2233] f-body w-full h-screen overflow-hidden flex flex-col ${lang === 'ja' ? 'lang-ja' : ''}`}>
      <style>{STYLES}</style>

      {/* Tombol Toggle Bahasa (Glassmorphism + Rounded) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex glass-panel-navy rounded-full overflow-hidden p-1 shadow-lg">
        {[
          ["id", "ID"],
          ["ja", "日本語"],
        ].map(([code, label]) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              lang === code
                ? "gold-ribbon text-[#0b1a47] shadow-md"
                : "text-[#e9c46a] hover:bg-[#13296b]/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* GALERI 3D UTAMA */}
      <section className="w-full flex-1 min-h-0 flex flex-col md:flex-row relative bg-[#0b1a47] overflow-hidden">
        
        {/* KANVAS 3D */}
        <div 
          className="relative w-full md:w-[60%] h-[45vh] md:h-full flex flex-col shadow-[10px_0_30px_rgba(6,17,46,0.8)] z-10 border-r border-[#d5dbe6]/20 md:border-r-[#c8952c]/30"
          style={{ background: "linear-gradient(135deg, #06112e 0%, #0d2050 35%, #132a68 70%, #1a3880 100%)" }}
        >
          <LoadingOverlay label={t.loading} />
          <CandiBentar />
          <div className="absolute top-0 left-0 w-full h-1.5 gold-ribbon z-10" />

          {/* Header Galeri */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 pointer-events-none drop-shadow-xl">
            <h2 className="f-display gold-text-gradient text-2xl md:text-4xl font-bold tracking-wide">
              {t.gallery}
            </h2>
            <p className="text-sm md:text-base text-[#e9c46a]/90 mt-1 uppercase tracking-widest font-semibold">
              {t.sub}
            </p>
          </div>

          {/* Navigasi Kiri & Kanan (Desktop) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-10 hidden md:block">
            <button onClick={handlePrev} aria-label={t.prev} className={navBtn}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-10 hidden md:block">
            <button onClick={handleNext} aria-label={t.next} className={navBtn}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Indikator dan Navigasi Mobile (Tengah Bawah) */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-6 z-10">
            <button onClick={handlePrev} aria-label={t.prev} className={`${navBtn} md:hidden`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="glass-panel-navy rounded-full px-6 py-2 flex items-center shadow-xl">
              <span className="f-display text-sm tracking-[0.25em] text-[#e9c46a] font-semibold">
                {String(currentIndex + 1).padStart(2, "0")} <span className="text-[#c8952c]/60 mx-1">/</span> {String(collections.length).padStart(2, "0")}
              </span>
            </div>
            <button onClick={handleNext} aria-label={t.next} className={`${navBtn} md:hidden`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" castShadow shadow-bias={-0.0001} />
            <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#132a68" />
            <spotLight position={[0, 5, 0]} intensity={1.2} angle={0.5} penumbra={1} color="#e9c46a" />
            
            <Suspense key={currentItem.modelPath} fallback={null}>
              <ArtifactModel modelPath={currentItem.modelPath} scale={currentItem.scale} onInteract={() => {}} />
            </Suspense>
            
            <OrbitControls makeDefault autoRotate autoRotateSpeed={0.8} enablePan={false} enableZoom={true} minDistance={2} maxDistance={7} maxPolarAngle={Math.PI / 1.8} />
          </Canvas>
        </div>

        {/* PLAKAT KURATOR */}
        <div className="w-full md:w-[40%] h-[55vh] md:h-full bg-[#ffffff] p-6 md:p-12 overflow-y-auto style-scrollbar relative z-0">
          <div key={currentItem.id} className="flex flex-col h-full max-w-xl mx-auto">
            
            {/* Header Kubu & No */}
            <div className="animate-item flex justify-between items-center border-b border-[#d5dbe6] pb-5 mb-8">
              <span className={`px-4 py-1.5 rounded-sm border text-xs md:text-sm font-bold tracking-[0.2em] uppercase ${
                isRama
                  ? "border-[#13296b]/30 bg-[#eef4fb] text-[#13296b]"
                  : "border-[#9a6b17]/40 bg-[#fff9ee] text-[#9a6b17]"
              }`}>
                {t.kubu[base.kubu]}
              </span>
              <span className="text-sm font-semibold text-[#9a6b17] tracking-[0.2em]">
                {t.no} {String(currentItem.id).padStart(3, "0")}
              </span>
            </div>

            <div className="flex-grow">
              <h2 className="animate-item delay-100 f-display text-[#13296b] text-4xl md:text-5xl font-bold leading-tight mb-3">
                {currentItem.title}
              </h2>
              <p className="animate-item delay-100 text-lg md:text-xl text-[#9a6b17] mb-5 font-medium tracking-wide">
                {currentItem.julukan}
              </p>
              
              <div className="animate-item delay-100 mb-8 -ml-1">
                <Ornamen />
              </div>

              <blockquote className="animate-item delay-200 border-l-[3px] border-[#c8952c] bg-[#eef4fb] p-5 md:p-6 mb-8 rounded-r-lg shadow-sm">
                <p className="text-base md:text-lg italic text-[#1c2233] leading-relaxed">
                  "{currentItem.tagline}"
                </p>
              </blockquote>

              <h4 className="animate-item delay-300 f-display text-xs md:text-sm text-[#13296b] mb-3 tracking-[0.2em] uppercase font-bold">
                {t.history}
              </h4>
              <p className="animate-item delay-300 text-base md:text-lg text-[#5f6678] leading-relaxed mb-8">
                {currentItem.description}
              </p>

              <div className="animate-item delay-400 bg-[#f8fafc] border border-[#d5dbe6] p-5 md:p-6 rounded-lg mb-8 shadow-sm">
                <span className="f-display block text-xs md:text-sm text-[#13296b] mb-4 tracking-[0.2em] uppercase font-bold">
                  {t.traits}
                </span>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {currentItem.watak.map((w) => (
                    <span
                      key={w}
                      className="px-4 py-1.5 text-sm md:text-base text-[#13296b] border border-[#d5dbe6] bg-[#eef4fb] rounded-full shadow-sm hover:border-[#c8952c] hover:bg-[#ffffff] transition-colors font-medium"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div className="animate-item delay-400 relative overflow-hidden bg-[#f8fafc] p-6 md:p-8 rounded-lg border border-[#d5dbe6] mb-6 shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1.5 gold-ribbon" />
                <h4 className="f-display text-xs md:text-sm text-[#13296b] mt-2 mb-3 tracking-[0.2em] uppercase font-bold">
                  {t.moment}
                </h4>
                <p className="text-base md:text-lg text-[#1c2233] leading-relaxed">
                  {currentItem.momen}
                </p>
              </div>
            </div>

            <div className="animate-item delay-400 border-t border-[#d5dbe6] pt-8 mt-4 text-center">
              <h4 className="f-display text-xs md:text-sm text-[#9a6b17] mb-3 tracking-[0.2em] uppercase font-bold">
                {t.moral}
              </h4>
              <p className="text-base md:text-lg text-[#5f6678] leading-relaxed italic font-medium px-4">
                "{currentItem.pesan}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer ornamen penutup */}
      <div className="z-20 relative shrink-0">
        <div className="w-full h-1.5 md:h-2 gold-ribbon" />
        <div className="w-full h-2 md:h-3 navy-dark" />
      </div>
    </div>
  );
}