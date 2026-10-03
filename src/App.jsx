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

// Data koleksi dipindah ke luar komponen agar tidak dibuat ulang setiap render
const collections = [
  {
    id: 1,
    title: "Anggada",
    julukan: "Duta Perdamaian dari Kiskenda",
    kubu: "Pihak Rama",
    tagline: "Satu kakinya menancap, tak seorang pun di Alengka sanggup menggesernya.",
    watak: ["Setia", "Berani", "Cerdik"],
    description:
      "Anggada adalah ksatria wanara (manusia kera) yang tangguh, putra dari Subali. Ia menjadi salah satu panglima andalan Sri Rama yang sangat berjasa dalam misi penyerangan ke kerajaan Alengka.",
    momen:
      "Diutus Rama sebagai duta ke istana Rahwana. Ia menancapkan kakinya ke lantai dan menantang siapa pun mengangkatnya. Tak ada yang berhasil.",
    pesan: "Kekuatan sejati tidak perlu berteriak. Keteguhan sudah cukup membuat lawan gentar.",
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
      "Ditawan di Taman Asoka, Sita menolak semua bujukan Rahwana dan tetap menanti Rama. Kesuciannya kemudian dibuktikan lewat ujian api.",
    pesan: "Kesetiaan dan harga diri tetap utuh walau seluruh keadaan berusaha menggoyahkannya.",
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
      "Pahlawan besar berwujud kera putih yang memiliki kekuatan dewa. Dedikasi dan kesetiaannya kepada Sri Rama tidak tertandingi. Ia adalah utusan pertama yang berhasil menyusup ke Alengka.",
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
      "Burung garuda purba, sahabat Prabu Dasarata. Jatayu mengorbankan nyawanya dengan gagah berani saat mencoba menyelamatkan Dewi Sita dari cengkeraman Rahwana yang sedang terbang.",
    momen:
      "Mencegat Rahwana yang menerbangkan Sita. Sayapnya ditebas, tetapi ia bertahan hidup cukup lama untuk memberi tahu Rama ke mana Sita dibawa.",
    pesan: "Keberanian diukur dari kemauan membela yang lemah, bukan dari peluang menang.",
    modelPath: "/models/jatayu low.fbx",
    scale: 0.05,
  },
  {
    id: 5,
    title: "Kumbakarna",
    julukan: "Raksasa yang Membela Tanah Air",
    kubu: "Pihak Alengka",
    tagline: "Ia tahu kakaknya salah, tetapi tidak membiarkan negerinya runtuh sendirian.",
    watak: ["Jujur", "Kesatria", "Dilematis"],
    description:
      "Adik kandung Rahwana yang berwujud raksasa mengerikan, namun berhati ksatria dan jujur. Ia maju ke medan perang bukan untuk membela kejahatan kakaknya, melainkan murni demi membela tanah airnya.",
    momen:
      "Terbangun dari tidur panjangnya, Kumbakarna menasihati Rahwana agar mengembalikan Sita. Setelah ditolak, ia tetap maju bertempur demi Alengka.",
    pesan: "Cinta tanah air tidak sama dengan membenarkan kesalahan pemimpinnya.",
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
      "Paman dari Rahwana sekaligus Patih andalan kerajaan Alengka. Walaupun mengetahui kakaknya berada di jalan yang salah, ia tetap setia memimpin pasukan raksasa hingga gugur di medan laga.",
    momen:
      "Memimpin pasukan raksasa menghadapi barisan wanara dalam pertempuran besar di gerbang Alengka, dan gugur di sana.",
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
      "Raja iblis berwajah sepuluh (Dasamuka) yang sangat sakti. Amarah, keserakahan, dan keangkuhannya untuk memiliki Dewi Sita membawanya menuju kehancuran total di tangan Rama.",
    momen:
      "Menculik Sita dan menolak setiap nasihat untuk mengembalikannya, sampai akhirnya gugur oleh panah Rama.",
    pesan: "Kepintaran dan kekuasaan tanpa pengendalian diri berujung pada kehancuran.",
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
      "Pangeran pewaris tahta Ayodhya, tokoh protagonis utama pembela darma (kebenaran). Dengan bersenjatakan panah sakti, ia berjuang menumpas angkara murka di muka bumi.",
    momen:
      "Menjalani 14 tahun pengasingan, lalu memimpin pasukan wanara menyeberangi lautan untuk menjemput Sita.",
    pesan: "Menegakkan kebenaran sering menuntut pengorbanan pribadi yang besar.",
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
      "Kakak dari Jatayu yang kehilangan sayapnya saat melindungi adiknya dari sengatan matahari. Sempati kemudian memberikan informasi krusial kepada pasukan wanara mengenai keberadaan Dewi Sita di Alengka.",
    momen:
      "Dari tebing pantai, ia melihat Sita ditawan di Alengka dan memberi tahu para wanara arah yang harus ditempuh.",
    pesan: "Keterbatasan tidak menghapus kemampuan untuk memberi arti bagi orang lain.",
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
      "Raja para wanara yang tahtanya direbut oleh kakaknya, Subali. Setelah dibantu oleh Rama, ia membalas budi dengan mengerahkan seluruh pasukan keranya untuk menggempur Alengka.",
    momen:
      "Bersekutu dengan Rama, ia mengerahkan ribuan wanara dari segala penjuru untuk mencari Sita dan menyerbu Alengka.",
    pesan: "Persekutuan yang dibangun di atas budi dan janji lebih kuat daripada pasukan mana pun.",
    modelPath: "/models/sugriwa low.fbx",
    scale: 0.05,
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = collections[currentIndex];
  const isRama = currentItem.kubu === "Pihak Rama";

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-museum-dark text-gray-200 overflow-hidden">

      {/* BAGIAN KIRI / ATAS DI HP */}
      <div className="relative w-full md:w-[65%] h-[50vh] md:h-full flex flex-col">
        <LoadingOverlay />

        <div className="absolute top-4 left-6 md:top-8 md:left-10 z-10 pointer-events-none">
          <h1 className="text-xl md:text-3xl font-serif text-museum-gold tracking-widest uppercase">Epos Ramayana</h1>
          <p className="text-[10px] md:text-sm text-museum-copper mt-1 md:mt-2 tracking-widest uppercase">Pameran Virtual Karakter 3D</p>
        </div>

        <div className="absolute bottom-4 md:bottom-8 left-0 w-full flex justify-center items-center gap-4 md:gap-6 z-10">
          <button onClick={handlePrev} className="p-2.5 md:p-3 bg-museum-gray/90 hover:bg-museum-gold hover:text-black border border-neutral-700 rounded-full transition-all backdrop-blur-sm cursor-pointer shadow-lg">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="text-xs md:text-sm tracking-widest uppercase font-light bg-museum-gray/90 px-4 md:px-6 py-2 md:py-3 rounded-full border border-neutral-700 backdrop-blur-sm shadow-lg">
            Arsip {currentIndex + 1} / {collections.length}
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
              scale={currentItem.scale}
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

      {/* BAGIAN KANAN / BAWAH DI HP */}
      <div className="w-full md:w-[35%] h-[50vh] md:h-full bg-[#181818] border-t md:border-t-0 md:border-l border-neutral-800 p-6 md:p-8 shadow-2xl z-20 overflow-y-auto">
        <div key={currentItem.id} className="animate-fade-in flex flex-col gap-5 md:gap-6">

          {/* Header: pihak + nomor */}
          <div className="flex justify-between items-center">
            <span
              className={`px-3 py-1 border text-[10px] tracking-[0.25em] uppercase rounded-sm ${
                isRama
                  ? "border-museum-gold/40 bg-museum-gold/10 text-museum-gold"
                  : "border-red-500/40 bg-red-500/10 text-red-400"
              }`}
            >
              {currentItem.kubu}
            </span>
            <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-wider">
              {String(currentIndex + 1).padStart(2, "0")} / {String(collections.length).padStart(2, "0")}
            </span>
          </div>

          {/* Nama, julukan, kutipan */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-museum-gold leading-tight">
              {currentItem.title}
            </h2>
            <p className="text-xs md:text-sm text-museum-copper tracking-wide mt-1">
              {currentItem.julukan}
            </p>
            <p className="mt-4 pl-4 border-l-2 border-museum-gold/60 text-sm italic text-gray-400 leading-relaxed">
              {currentItem.tagline}
            </p>
          </div>

          {/* Deskripsi */}
          <p className="text-gray-300 leading-relaxed text-xs md:text-sm font-light">
            {currentItem.description}
          </p>

          {/* Watak */}
          <div>
            <h4 className="text-[10px] md:text-[11px] font-semibold text-neutral-500 uppercase tracking-widest mb-2">
              Watak
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentItem.watak.map((w) => (
                <span
                  key={w}
                  className="px-3 py-1 text-xs text-gray-300 border border-neutral-700 rounded-full bg-black/20"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Momen terkenal */}
          <div className="bg-black/30 p-4 rounded border border-neutral-800">
            <h4 className="text-[10px] md:text-[11px] font-semibold text-museum-gold uppercase tracking-widest mb-1.5">
              Momen Terkenal
            </h4>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light">
              {currentItem.momen}
            </p>
          </div>

          {/* Pesan moral */}
          <div className="bg-black/40 p-4 rounded-lg border-l-2 border-museum-gold">
            <h4 className="text-[10px] md:text-[11px] font-bold text-museum-gold uppercase tracking-wider mb-1">
              Pesan dari Kisah Ini
            </h4>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              {currentItem.pesan}
            </p>
          </div>

          {/* Petunjuk interaksi */}
          <p className="pt-3 border-t border-neutral-800 text-[10px] text-neutral-500 tracking-widest uppercase text-center">
            Seret untuk memutar · Gulir untuk memperbesar
          </p>
        </div>
      </div>

    </div>
  );
}

export default App;
