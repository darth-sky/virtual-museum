import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress } from '@react-three/drei';
import ArtifactModel from './components/ArtifactModel';

function LoadingOverlay() {
  const { progress, active } = useProgress();
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-museum-dark/80 backdrop-blur-sm transition-opacity">
      <div className="text-museum-gold font-mono tracking-widest bg-black/50 px-6 py-3 rounded border border-museum-gold/30 text-sm">
        MEMUAT {progress.toFixed(0)}%
      </div>
    </div>
  );
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const collections = [
    {
      id: 1,
      title: "Topeng Barong",
      year: "Era Klasik",
      material: "Kayu Pule / Sakral",
      origin: "Gianyar, Bali",
      description: "Barong adalah simbol kebaikan dalam mitologi Bali, digambarkan sebagai raja roh yang melindungi manusia. Topeng ini melambangkan perlindungan agung dan sering ditampilkan dalam tarian sakral untuk mengusir kekuatan jahat.",
      curatorNote: "Perhatikan detail ukiran pada wajah dan mahkotanya yang memadukan berbagai unsur mitologi pelindung.",
      modelPath: "/models/Barong.glb"
    },
    {
      id: 2,
      title: "Topeng Celuluk",
      year: "Era Klasik",
      material: "Kayu Nangka",
      origin: "Bali Selatan",
      description: "Celuluk adalah salah satu jenis leak, makhluk mitologi bawahan Rangda. Memiliki ciri khas mata melotot dan gigi tajam yang panjang. Dalam pertunjukan, karakter ini sering membawa elemen horor sekaligus komedi.",
      curatorNote: "Struktur rahang dan gigi yang ekstrem dibuat untuk menonjolkan karakter antagonis yang menakutkan.",
      modelPath: "/models/celuluk.glb"
    },
    {
      id: 3,
      title: "Topeng Gandi",
      year: "Era Klasik",
      material: "Kayu Kepuh",
      origin: "Singaraja, Bali",
      description: "Karakter khas dalam pementasan dramatari Bali. Setiap lekukan pada wajah topeng ini merepresentasikan watak dan perannya yang spesifik di dalam struktur cerita tradisional.",
      curatorNote: "Garis senyum dan mata pada topeng ini dipahat untuk memberikan ilusi ekspresi yang berubah saat penari bergerak.",
      modelPath: "/models/Gandi.glb"
    },
    {
      id: 4,
      title: "Topeng Lenda",
      year: "Era Klasik",
      material: "Kayu Pule",
      origin: "Bali Tengah",
      description: "Lenda (sering disandingkan dengan Lendi) merupakan karakter penyihir atau pengikut aliran kiri dalam pementasan Calonarang. Karakter ini mewakili ujian bagi manusia dalam menjaga keseimbangan spiritual.",
      curatorNote: "Warna dan guratan wajahnya secara sengaja dibuat mencolok untuk mengintimidasi lawan mainnya di panggung.",
      modelPath: "/models/lenda.glb"
    },
    {
      id: 5,
      title: "Topeng Merdah",
      year: "Era Klasik",
      material: "Kayu Jati",
      origin: "Tabanan, Bali",
      description: "Merdah adalah salah satu dari Punakawan (abdi/pelayan) yang berwatak baik. Ia bertugas menerjemahkan bahasa Kawi kuno ke bahasa Bali awam agar penonton dapat memahami pesan moral dari cerita yang dibawakan.",
      curatorNote: "Warna kemerahan pada wajahnya melambangkan keberanian dan humor yang menjadi ciri khas penengah cerita.",
      modelPath: "/models/merdah.glb"
    },
    {
      id: 6,
      title: "Topeng Punta",
      year: "Era Klasik",
      material: "Kayu Nangka",
      origin: "Klungkung, Bali",
      description: "Punta adalah karakter abdi dalem (bersama Wijil) yang biasanya melayani tokoh protagonis berkedudukan tinggi seperti raja atau pangeran. Pembawaannya berwibawa namun tetap dekat dengan rakyat.",
      curatorNote: "Ekspresinya dipahat sedikit lebih serius dibandingkan Punakawan lainnya, menunjukkan statusnya sebagai pendamping kaum bangsawan.",
      modelPath: "/models/punta.glb"
    }
  ];

  const currentItem = collections[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length);
  };

  return (
    // Menggunakan flex-col untuk HP, dan md:flex-row untuk layar komputer
    <div className="flex flex-col md:flex-row h-screen w-full bg-museum-dark text-gray-200 overflow-hidden">
      
      {/* BAGIAN KIRI / ATAS DI HP: Ruang Pameran 3D (Tinggi 50% di HP, 100% di Laptop) */}
      <div className="relative w-full md:w-[65%] h-[50vh] md:h-full flex flex-col">
        <LoadingOverlay />

        {/* Header Responsif */}
        <div className="absolute top-4 left-6 md:top-8 md:left-10 z-10 pointer-events-none">
          <h1 className="text-xl md:text-3xl font-serif text-museum-gold tracking-widest uppercase">Museum Topeng</h1>
          <p className="text-[10px] md:text-sm text-museum-copper mt-1 md:mt-2 tracking-widest uppercase">Koleksi Mitologi & Seni Tari Bali</p>
        </div>

        {/* Navigasi Tombol (Lebih ramah sentuhan jari di HP) */}
        <div className="absolute bottom-4 md:bottom-8 left-0 w-full flex justify-center items-center gap-4 md:gap-6 z-10">
          <button onClick={handlePrev} className="p-2.5 md:p-3 bg-museum-gray/90 hover:bg-museum-gold hover:text-black border border-neutral-700 rounded-full transition-all backdrop-blur-sm cursor-pointer shadow-lg">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="text-xs md:text-sm tracking-widest uppercase font-light bg-museum-gray/90 px-4 md:px-6 py-2 md:py-3 rounded-full border border-neutral-700 backdrop-blur-sm shadow-lg">
            Koleksi {currentIndex + 1} / {collections.length}
          </div>

          <button onClick={handleNext} className="p-2.5 md:p-3 bg-museum-gray/90 hover:bg-museum-gold hover:text-black border border-neutral-700 rounded-full transition-all backdrop-blur-sm cursor-pointer shadow-lg">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
          <color attach="background" args={['#121212']} />
          
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />

          <Suspense key={currentItem.modelPath} fallback={null}>
            <ArtifactModel 
              modelPath={currentItem.modelPath}
              onInteract={() => {}} 
            />
          </Suspense>

          <OrbitControls 
            makeDefault 
            autoRotate 
            autoRotateSpeed={0.5} 
            enablePan={false} 
            minDistance={1.5} 
            maxDistance={6} 
          />
        </Canvas>
      </div>

      {/* BAGIAN KANAN / BAWAH DI HP: Panel Informasi (Tinggi 50% di HP, 100% di Laptop dengan Scroll) */}
      <div className="w-full md:w-[35%] h-[50vh] md:h-full bg-[#181818] border-t md:border-t-0 md:border-l border-neutral-800 p-6 md:p-8 flex flex-col justify-between shadow-2xl z-20 overflow-y-auto">
        
        {/* Konten Atas */}
        <div>
          <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-neutral-800 pb-3 md:pb-4">
            <span className="px-2.5 md:px-3 py-1 bg-museum-gold/10 border border-museum-gold/30 text-museum-gold text-[9px] md:text-[10px] tracking-[0.25em] uppercase rounded-sm">
              Arsip Koleksi #0{currentIndex + 1}
            </span>
            <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-wider">GLOBAL MUSEUM</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-museum-gold mb-1">{currentItem.title}</h2>
          <p className="text-xs md:text-sm font-light text-museum-copper tracking-wide mb-4 md:mb-6">{currentItem.year}</p>
          
          {/* Kotak Spesifikasi */}
          <div className="grid grid-cols-2 gap-3 mb-4 md:mb-6 bg-black/20 p-3 md:p-4 rounded border border-neutral-800/80">
            <div>
              <span className="block text-[9px] md:text-[10px] text-neutral-500 uppercase tracking-widest">Bahan Utama</span>
              <span className="text-xs text-gray-300 font-medium">{currentItem.material}</span>
            </div>
            <div>
              <span className="block text-[9px] md:text-[10px] text-neutral-500 uppercase tracking-widest">Asal Wilayah</span>
              <span className="text-xs text-gray-300 font-medium">{currentItem.origin}</span>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2 mb-4 md:mb-6">
            <h4 className="text-[11px] md:text-xs font-semibold text-neutral-400 uppercase tracking-widest">Deskripsi Artefak</h4>
            <p className="text-gray-300 leading-relaxed text-xs font-light text-justify">
              {currentItem.description}
            </p>
          </div>
        </div>

        {/* Konten Bawah */}
        <div className="mt-4 md:mt-0">
          <div className="bg-black/40 p-3.5 md:p-4 rounded-lg border-l-2 border-museum-gold mb-4 md:mb-6">
            <h4 className="text-[10px] md:text-[11px] font-bold text-museum-gold uppercase tracking-wider mb-1 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Catatan Kurator
            </h4>
            <p className="text-gray-400 text-xs italic">"{currentItem.curatorNote}"</p>
          </div>

          {/* Footer Panel */}
          <div className="pt-3 md:pt-4 border-t border-neutral-800 flex justify-between items-center text-[9px] md:text-[10px] text-neutral-500 tracking-widest uppercase">
            <span>Status: Dipamerkan</span>
            <span>Interaksi: Aktif</span>
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default App;