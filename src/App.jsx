import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import ArtifactModel from "./components/ArtifactModel";
import CandiBentar from "./components/CandiBentar";
import { UI, JA } from "./i18n";

// ================= GAYA BALI =================
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&display=swap');

.f-display { font-family: 'Cinzel Decorative', serif; }
.f-body { font-family: 'Cormorant Garamond', Georgia, serif; }
.lang-ja .f-display, .lang-ja .f-body { font-family: 'Noto Serif JP', serif; }
.lang-ja .italic { font-style: normal; }

.poleng { background: repeating-conic-gradient(#0a0605 0% 25%, #f1e6c8 0% 50%) 0 0 / 14px 14px; }
.tridatu { background: linear-gradient(90deg,#9b1c1c 33.3%,#f1e6c8 33.3% 66.6%,#0a0605 66.6%); }
.prada { background: linear-gradient(135deg,#f3d77a,#d4af37 45%,#8a6a1c); -webkit-background-clip: text; background-clip: text; color: transparent; }
.endek { background-color:#0f0907;
  background-image:
    linear-gradient(45deg, rgba(212,175,55,.07) 25%, transparent 25% 75%, rgba(212,175,55,.07) 75%),
    linear-gradient(45deg, rgba(155,28,28,.10) 25%, transparent 25% 75%, rgba(155,28,28,.10) 75%);
  background-size: 28px 28px; background-position: 0 0, 14px 14px; }
@keyframes fadeIn { from { opacity:0; transform: translateY(6px);} to { opacity:1; transform:none;} }
.animate-fade-in { animation: fadeIn .5s ease both; }
.style-scrollbar::-webkit-scrollbar { width: 6px; }
.style-scrollbar::-webkit-scrollbar-thumb { background: #8a6a1c; }
@media (prefers-reduced-motion: reduce) { .animate-fade-in { animation: none; } }
`;

function Ornamen({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`w-48 h-5 text-[#d4af37] ${className}`}
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
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0f0907]/90 backdrop-blur-md">
      <div className="f-display text-[#d4af37] tracking-widest bg-black/60 px-8 py-4 border border-[#d4af37]/40 text-sm">
        {label} {progress.toFixed(0)}%
      </div>
    </div>
  );
}

// --- DATA KOLEKSI ---
const collections = [
  {
    id: 1,
    title: "Anggada",
    julukan: "Duta Perdamaian dari Kiskenda",
    kubu: "Pihak Rama",
    tagline:
      "Satu kakinya menancap, tak seorang pun di Alengka sanggup menggesernya.",
    watak: ["Setia", "Berani", "Cerdik"],
    description:
      "Anggada adalah ksatria wanara (manusia kera) yang tangguh, putra dari Subali. Ia menjadi salah satu panglima andalan Sri Rama yang sangat berjasa dalam misi penyerangan ke kerajaan Alengka.",
    momen:
      "Diutus Rama sebagai duta ke istana Rahwana. Ia menancapkan kakinya ke lantai dan menantang siapa pun mengangkatnya.",
    pesan:
      "Kekuatan sejati tidak perlu berteriak. Keteguhan sudah cukup membuat lawan gentar.",
    modelPath: "/models/ANGGADA low.fbx",
    scale: 0.05,
  },
  {
    id: 2,
    title: "Dewi Sita",
    julukan: "Putri Mantili, Teladan Kesetiaan",
    kubu: "Pihak Rama",
    tagline: "Diculik karena kecantikannya, dikenang karena keteguhannya.",
    watak: ["Suci", "Sabar", "Teguh"],
    description:
      "Istri dari Sri Rama yang melambangkan kesucian, kesetiaan, dan keteguhan hati. Penculikan Dewi Sita oleh Rahwana adalah pemicu utama meletusnya perang besar epik Ramayana.",
    momen:
      "Ditawan di Taman Asoka, Sita menolak semua bujukan Rahwana dan tetap menanti Rama.",
    pesan:
      "Kesetiaan dan harga diri tetap utuh walau seluruh keadaan berusaha menggoyahkannya.",
    modelPath: "/models/dewi sita low.fbx",
    scale: 0.05,
  },
  {
    id: 3,
    title: "Hanoman",
    julukan: "Kera Putih Utusan Rama",
    kubu: "Pihak Rama",
    tagline: "Melompati samudera, membakar Alengka, kembali membawa kabar.",
    watak: ["Perkasa", "Setia", "Rendah Hati"],
    description:
      "Pahlawan besar berwujud kera putih yang memiliki kekuatan dewa. Dedikasi dan kesetiaannya kepada Sri Rama tidak tertandingi.",
    momen:
      "Ditangkap pasukan Rahwana, ekornya dibakar. Hanoman justru melompat dari atap ke atap dan menyulut ibu kota Alengka.",
    pesan: "Pengabdian tulus tanpa pamrih adalah bentuk kekuatan tertinggi.",
    modelPath: "/models/hanoman low.fbx",
    scale: 0.05,
  },
  {
    id: 4,
    title: "Jatayu",
    julukan: "Garuda Penjaga Hutan Dandaka",
    kubu: "Pihak Rama",
    tagline: "Tahu dirinya kalah, tetap memilih melawan.",
    watak: ["Gagah", "Rela Berkorban", "Setia Kawan"],
    description:
      "Burung garuda purba, sahabat Prabu Dasarata. Jatayu mengorbankan nyawanya dengan gagah berani saat mencoba menyelamatkan Dewi Sita dari cengkeraman Rahwana.",
    momen:
      "Mencegat Rahwana yang menerbangkan Sita. Sayapnya ditebas, tetapi ia bertahan hidup untuk memberi tahu Rama.",
    pesan:
      "Keberanian diukur dari kemauan membela yang lemah, bukan dari peluang menang.",
    modelPath: "/models/jatayu low.fbx",
    scale: 0.05,
  },
  {
    id: 5,
    title: "Kumbakarna",
    julukan: "Raksasa yang Membela Tanah Air",
    kubu: "Pihak Alengka",
    tagline:
      "Ia tahu kakaknya salah, tetapi tidak membiarkan negerinya runtuh sendirian.",
    watak: ["Jujur", "Kesatria", "Dilematis"],
    description:
      "Adik kandung Rahwana yang berwujud raksasa mengerikan, namun berhati ksatria dan jujur. Ia maju ke medan perang murni demi membela tanah airnya.",
    momen:
      "Terbangun dari tidur panjangnya, Kumbakarna menasihati Rahwana agar mengembalikan Sita.",
    pesan:
      "Cinta tanah air tidak sama dengan membenarkan kesalahan pemimpinnya.",
    modelPath: "/models/kumbakarna low.fbx",
    scale: 0.05,
  },
  {
    id: 6,
    title: "Patih Prahasta",
    julukan: "Panglima Agung Alengka",
    kubu: "Pihak Alengka",
    tagline: "Setia pada tugas, bahkan ketika arahnya sudah keliru.",
    watak: ["Disiplin", "Loyal", "Berwibawa"],
    description:
      "Paman dari Rahwana sekaligus Patih andalan kerajaan Alengka. Walaupun mengetahui kakaknya berada di jalan yang salah, ia tetap setia memimpin pasukan.",
    momen:
      "Memimpin pasukan raksasa menghadapi barisan wanara dalam pertempuran besar di gerbang Alengka.",
    pesan: "Kesetiaan buta bisa menyeret orang baik ke pihak yang salah.",
    modelPath: "/models/patih prahasta low.fbx",
    scale: 0.05,
  },
  {
    id: 7,
    title: "Rahwana",
    julukan: "Dasamuka, Raja Sepuluh Wajah",
    kubu: "Pihak Alengka",
    tagline: "Sakti, cerdas, dan hancur oleh keangkuhannya sendiri.",
    watak: ["Sakti", "Angkuh", "Ambisius"],
    description:
      "Raja iblis berwajah sepuluh (Dasamuka) yang sangat sakti. Amarah, keserakahan, dan keangkuhannya untuk memiliki Dewi Sita membawanya menuju kehancuran total.",
    momen:
      "Menculik Sita dan menolak setiap nasihat untuk mengembalikannya, sampai akhirnya gugur oleh panah Rama.",
    pesan:
      "Kepintaran dan kekuasaan tanpa pengendalian diri berujung pada kehancuran.",
    modelPath: "/models/rahwana low.fbx",
    scale: 0.05,
  },
  {
    id: 8,
    title: "Sri Rama",
    julukan: "Titisan Wisnu, Penegak Darma",
    kubu: "Pihak Rama",
    tagline: "Rela kehilangan takhta demi menepati janji.",
    watak: ["Bijaksana", "Tenang", "Berprinsip"],
    description:
      "Pangeran pewaris tahta Ayodhya, tokoh protagonis utama pembela darma (kebenaran). Dengan bersenjatakan panah sakti, ia berjuang menumpas angkara murka.",
    momen:
      "Menjalani 14 tahun pengasingan, lalu memimpin pasukan wanara menyeberangi lautan untuk menjemput Sita.",
    pesan:
      "Menegakkan kebenaran sering menuntut pengorbanan pribadi yang besar.",
    modelPath: "/models/rama low.fbx",
    scale: 0.05,
  },
  {
    id: 9,
    title: "Sempati",
    julukan: "Garuda Bersayap Patah",
    kubu: "Pihak Rama",
    tagline: "Tak lagi bisa terbang, tetapi penglihatannya menuntun pasukan.",
    watak: ["Penyayang", "Waspada", "Bijak"],
    description:
      "Kakak dari Jatayu yang kehilangan sayapnya saat melindungi adiknya dari sengatan matahari. Sempati kemudian memberikan informasi krusial kepada pasukan wanara.",
    momen:
      "Dari tebing pantai, ia melihat Sita ditawan di Alengka dan memberi tahu para wanara arah yang harus ditempuh.",
    pesan:
      "Keterbatasan tidak menghapus kemampuan untuk memberi arti bagi orang lain.",
    modelPath: "/models/sempati low.fbx",
    scale: 0.05,
  },
  {
    id: 10,
    title: "Sugriwa",
    julukan: "Raja Para Wanara",
    kubu: "Pihak Rama",
    tagline: "Kehilangan takhta, lalu membalas budi dengan seluruh pasukannya.",
    watak: ["Setia Janji", "Strategis", "Pemimpin"],
    description:
      "Raja para wanara yang tahtanya direbut oleh kakaknya, Subali. Setelah dibantu oleh Rama, ia membalas budi dengan mengerahkan seluruh pasukan keranya.",
    momen:
      "Bersekutu dengan Rama, ia mengerahkan ribuan wanara dari segala penjuru untuk mencari Sita dan menyerbu Alengka.",
    pesan:
      "Persekutuan yang dibangun di atas budi dan janji lebih kuat daripada pasukan mana pun.",
    modelPath: "/models/sugriwa low.fbx",
    scale: 0.05,
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lang, setLang] = useState("id");
  const t = UI[lang];
  const base = collections[currentIndex];
  const currentItem = lang === "ja" ? { ...base, ...JA[base.id] } : base;
  const isRama = base.kubu === "Pihak Rama";

  const handleNext = () => setCurrentIndex((p) => (p + 1) % collections.length);
  const handlePrev = () =>
    setCurrentIndex((p) => (p - 1 + collections.length) % collections.length);

  const navBtn =
    "p-3 bg-[#0f0907]/90 text-[#d4af37] hover:bg-[#d4af37] hover:text-black border border-[#d4af37]/50 transition-colors backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37]";

  return (
    // Menggunakan h-screen dan overflow-hidden agar seluruh halaman terkunci tanpa scroll bar luar
    <div className={`endek text-[#f1e6c8] f-body w-full h-screen overflow-hidden flex flex-col justify-between ${lang === 'ja' ? 'lang-ja' : ''}`}>
      <style>{STYLES}</style>

      {/* Tombol Toggle Bahasa */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 flex border border-[#d4af37]/50 bg-[#0f0907]/90">
        {[
          ["id", "ID"],
          ["ja", "日本語"],
        ].map(([code, label]) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`px-3 py-1.5 text-sm transition-colors ${
              lang === code
                ? "bg-[#d4af37] text-black"
                : "text-[#d4af37] hover:bg-[#d4af37]/20"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* GALERI 3D UTAMA (FULL SCREEN TERKUNCI) */}
      <section className="w-full h-[calc(100vh-1.75rem)] flex flex-col md:flex-row relative bg-black overflow-hidden">
        <div
          className="relative w-full md:w-[65%] h-[45vh] md:h-full flex flex-col border-r-2 border-[#d4af37]/50"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #3a1a10 0%, #150c08 55%, #000 100%)",
          }}
        >
          <LoadingOverlay label={t.loading} />
          <CandiBentar />
          <div className="absolute top-0 left-0 w-full h-2 poleng z-10" />

          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 pointer-events-none">
            <h2 className="f-display prada text-xl md:text-3xl font-bold">
              {t.gallery}
            </h2>
            <p className="text-sm md:text-base text-[#b87333] mt-1">
              {t.sub}
            </p>
          </div>

          <div className="absolute bottom-4 md:bottom-10 left-0 w-full flex justify-center items-center gap-4 md:gap-8 z-10">
            <button
              onClick={handlePrev}
              aria-label={t.prev}
              className={navBtn}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="f-display text-xs md:text-sm tracking-[0.2em] bg-[#0f0907]/90 px-6 py-3 border border-[#d4af37]/50 backdrop-blur-md text-[#d4af37]">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(collections.length).padStart(2, "0")}
            </div>
            <button
              onClick={handleNext}
              aria-label={t.next}
              className={navBtn}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              color="#fff8e7"
            />
            <directionalLight
              position={[-5, -5, -5]}
              intensity={0.3}
              color="#b87333"
            />
            <Suspense key={currentItem.modelPath} fallback={null}>
              <ArtifactModel
                modelPath={currentItem.modelPath}
                scale={currentItem.scale}
                onInteract={() => {}}
              />
            </Suspense>
            <OrbitControls
              makeDefault
              autoRotate
              autoRotateSpeed={0.5}
              enablePan={false}
              enableZoom={true} // <-- Diaktifkan agar bisa zoom model 3D
              minDistance={2}    // Batas minimal zoom
              maxDistance={7}    // Batas maksimal zoom
            />
          </Canvas>
        </div>

        {/* Plakat kurator (memiliki scrollbar internal sendiri jika teks panjang) */}
        <div className="w-full md:w-[35%] h-[55vh] md:h-full bg-gradient-to-b from-[#1c110b] to-[#0f0907] p-6 md:p-10 overflow-y-auto style-scrollbar relative">
          <div
            key={currentItem.id}
            className="animate-fade-in flex flex-col h-full"
          >
            <div className="flex justify-between items-center border-b border-[#d4af37]/30 pb-4 mb-6">
              <span
                className={`px-4 py-1.5 border text-sm tracking-[0.15em] ${
                  isRama
                    ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37]"
                    : "border-[#9b1c1c] bg-[#9b1c1c]/25 text-[#f08a7a]"
                }`}
              >
                {t.kubu[base.kubu]}
              </span>
              <span className="text-sm text-[#8a7a5a] tracking-widest">
                {t.no} {String(currentItem.id).padStart(3, "0")}
              </span>
            </div>

            <div className="flex-grow">
              <h2 className="f-display prada text-3xl md:text-4xl font-bold leading-tight mb-2">
                {currentItem.title}
              </h2>
              <p className="text-base md:text-lg text-[#b87333] mb-4">
                {currentItem.julukan}
              </p>
              <Ornamen className="mb-5 -ml-1" />

              <blockquote className="border-l-4 border-[#9b1c1c] bg-[#9b1c1c]/10 p-4 md:p-5 mb-6">
                <p className="text-base md:text-lg italic text-[#e6dbbd] leading-relaxed">
                  "{currentItem.tagline}"
                </p>
              </blockquote>

              <h4 className="f-display text-sm text-[#d4af37] mb-2">
                {t.history}
              </h4>
              <p className="text-base md:text-lg text-[#d9ceb0] leading-relaxed mb-6">
                {currentItem.description}
              </p>

              <div className="bg-black/40 p-4 md:p-5 border border-[#d4af37]/25 mb-6">
                <span className="f-display block text-sm text-[#d4af37] mb-3">
                  {t.traits}
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentItem.watak.map((w) => (
                    <span
                      key={w}
                      className="px-3 py-1 text-sm md:text-base text-[#f1e6c8] border border-[#d4af37]/40 bg-[#1c110b]"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden bg-[#1a100a] p-5 md:p-6 border border-[#d4af37]/30 mb-6">
                <div className="absolute top-0 left-0 w-full h-2 poleng" />
                <h4 className="f-display text-sm text-[#d4af37] mt-2 mb-2">
                  {t.moment}
                </h4>
                <p className="text-base md:text-lg text-[#d9ceb0] leading-relaxed">
                  {currentItem.momen}
                </p>
              </div>
            </div>

            <div className="border-t border-[#d4af37]/30 pt-6 mt-4 text-center">
              <h4 className="f-display text-sm text-[#b87333] mb-2">
                {t.moral}
              </h4>
              <p className="text-base md:text-lg text-[#cfc3a4] leading-relaxed italic">
                "{currentItem.pesan}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer ornamen penutup terkunci di bawah */}
      <div>
        <div className="w-full h-3 poleng" />
        <div className="w-full h-2 tridatu" />
      </div>
    </div>
  );
}