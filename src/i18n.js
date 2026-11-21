// Teks antarmuka. Kunci "kubu" tetap Indonesia di data (dipakai untuk logika warna),
// hanya tampilannya yang diterjemahkan lewat UI[lang].kubu.
export const UI = {
  id: {
    loading: 'Memuat',
    gallery: 'Galeri 3D',
    sub: 'Epos Ramayana — Koleksi Karakter Interaktif',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    history: 'Catatan Sejarah',
    traits: 'Atribut Watak',
    moment: 'Momen Kunci',
    moral: 'Pesan Moral Epik',
    no: 'No.',
    kubu: { 'Pihak Rama': 'Pihak Rama', 'Pihak Alengka': 'Pihak Alengka' },
  },
  en: {
    loading: 'Loading',
    gallery: '3D Gallery',
    sub: 'Ramayana Epic — Interactive Character Collection',
    prev: 'Previous',
    next: 'Next',
    history: 'Historical Notes',
    traits: 'Character Traits',
    moment: 'Key Moment',
    moral: 'Epic Moral',
    no: 'No.',
    kubu: { 'Pihak Rama': "Rama's Side", 'Pihak Alengka': "Alengka's Side" },
  },
  ja: {
    loading: '読み込み中',
    gallery: '3Dギャラリー',
    sub: 'ラーマーヤナ叙事詩 — インタラクティブ・キャラクター展示',
    prev: '前へ',
    next: '次へ',
    history: '歴史ノート',
    traits: '性格',
    moment: '重要な場面',
    moral: '叙事詩の教訓',
    no: 'No.',
    kubu: { 'Pihak Rama': 'ラーマ陣営', 'Pihak Alengka': 'ランカー陣営' },
  },
};

// Terjemahan Jepang per karakter (berdasarkan id). Menimpa field teks di data asli.
export const JA = {
  1: {
    title: 'アンガダ',
    julukan: 'キシュキンダーの和平の使者',
    tagline: '片足を床に突き立てれば、ランカーの誰にも動かせない。',
    watak: ['忠誠', '勇敢', '機知'],
    description: 'アンガダは、ヴァーリの子である屈強なヴァーナラ(猿人)の戦士。ラーマ王子の頼れる将軍の一人として、ランカー王国への進軍で大きな功績を挙げた。',
    momen: 'ラーマの使者としてラーヴァナの宮殿を訪れ、足を床に突き立てて、誰でもよいから持ち上げてみよと挑んだ。',
    pesan: '真の強さは叫ぶ必要がない。揺るがぬ心だけで、敵を怯ませることができる。',
  },
  2: {
    title: 'シータ姫',
    julukan: 'ミティラーの王女、貞節の鑑',
    tagline: '美しさゆえにさらわれ、揺るがぬ心ゆえに語り継がれる。',
    watak: ['清らか', '忍耐', '不屈'],
    description: 'ラーマ王子の妻であり、清らかさ・貞節・不屈の心の象徴。ラーヴァナによるシータの誘拐が、ラーマーヤナの大戦争の引き金となった。',
    momen: 'アショーカ園に囚われたシータは、ラーヴァナのあらゆる誘惑を退け、ラーマの到来を待ち続けた。',
    pesan: 'どんな状況に揺さぶられようとも、貞節と誇りは損なわれない。',
  },
  3: {
    title: 'ハヌマーン',
    julukan: 'ラーマに仕えた白き猿',
    tagline: '大海を跳び越え、ランカーを焼き、知らせを携えて戻った。',
    watak: ['怪力', '忠誠', '謙虚'],
    description: '神の力を宿した白い猿の大英雄。ラーマへの献身と忠誠は並ぶ者がない。',
    momen: 'ラーヴァナの軍に捕らえられ、尻尾に火をつけられた。ハヌマーンは屋根から屋根へ跳び移り、ランカーの都に火を放った。',
    pesan: '見返りを求めない誠実な奉仕こそ、最高の強さである。',
  },
  4: {
    title: 'ジャターユ',
    julukan: 'ダンダカの森を守る神鳥ガルダ',
    tagline: '敗れると知りながら、それでも戦うことを選んだ。',
    watak: ['勇壮', '自己犠牲', '友情'],
    description: '太古の神鳥ガルダで、ダシャラタ王の友。シータをラーヴァナの手から救おうとして、勇敢にも命を捧げた。',
    momen: 'シータを連れ去るラーヴァナの前に立ちはだかった。翼を斬られたが、ラーマに事の次第を伝えるまで生き延びた。',
    pesan: '勇気とは、勝てるかどうかではなく、弱き者を守ろうとする意志で測られる。',
  },
  5: {
    title: 'クンバカルナ',
    julukan: '祖国を守った巨人',
    tagline: '兄が間違っていると知りながら、祖国が独りで滅びるのを見過ごさなかった。',
    watak: ['誠実', '武人', '葛藤'],
    description: 'ラーヴァナの実弟。恐ろしい巨人の姿をしているが、心は高潔で誠実な武人。ひとえに祖国を守るために戦場へ赴いた。',
    momen: '長い眠りから目覚めたクンバカルナは、ラーヴァナにシータを返すよう諫めた。',
    pesan: '祖国への愛は、指導者の過ちを正当化することとは違う。',
  },
  6: {
    title: 'プラハスタ将軍',
    julukan: 'ランカーの大将軍',
    tagline: '進む道が誤っていても、務めには忠実であり続けた。',
    watak: ['規律', '忠義', '威厳'],
    description: 'ラーヴァナの叔父にして、ランカー王国を支える宰相兼将軍。一族の者が誤った道にいると知りながら、なお軍を率いて忠義を貫いた。',
    momen: 'ランカーの城門での大決戦で、巨人軍を率いてヴァーナラの軍勢に立ち向かった。',
    pesan: '盲目的な忠誠は、善良な人をも誤った側へ引きずり込む。',
  },
  7: {
    title: 'ラーヴァナ',
    julukan: '十の顔を持つ王ダシャムカ',
    tagline: '強大で聡明でありながら、己の傲慢によって滅びた。',
    watak: ['強大', '傲慢', '野心'],
    description: '十の顔を持つ(ダシャムカ)魔王で、絶大な力を誇る。シータを手に入れようとする怒り・貪欲・傲慢が、彼を完全な破滅へ導いた。',
    momen: 'シータを連れ去り、返すようにという忠告をすべて退けた末、ラーマの矢に倒れた。',
    pesan: '自制を欠いた知恵と権力は、破滅に行き着く。',
  },
  8: {
    title: 'シュリー・ラーマ',
    julukan: 'ヴィシュヌの化身、ダルマの守護者',
    tagline: '約束を守るため、王位さえ手放した。',
    watak: ['賢明', '冷静', '信念'],
    description: 'アヨーディヤーの王位継承者で、ダルマ(正義)を守る物語の主人公。神の弓矢を携え、邪悪を討ち滅ぼすために戦う。',
    momen: '14年の追放生活を送った後、ヴァーナラの軍を率いて海を渡り、シータを迎えに向かった。',
    pesan: '正義を貫くには、しばしば大きな自己犠牲が求められる。',
  },
  9: {
    title: 'サンパーティ',
    julukan: '翼を失った神鳥ガルダ',
    tagline: 'もう飛べなくとも、その眼差しが軍を導いた。',
    watak: ['慈愛', '警戒', '賢明'],
    description: '弟ジャターユを太陽の熱から守って翼を失った兄。のちにヴァーナラの軍へ決定的な情報を授けた。',
    momen: '海辺の崖から、シータがランカーに囚われているのを見つけ、進むべき方角をヴァーナラたちに教えた。',
    pesan: '限りがあっても、他者のために意味をもたらす力は失われない。',
  },
  10: {
    title: 'スグリーヴァ',
    julukan: 'ヴァーナラの王',
    tagline: '王座を失い、恩に報いるため全軍を差し出した。',
    watak: ['約束に忠実', '戦略家', '指導者'],
    description: '兄ヴァーリに王座を奪われたヴァーナラの王。ラーマに助けられた恩に報いるため、猿の全軍を動員した。',
    momen: 'ラーマと同盟を結び、各地から何千ものヴァーナラを集めてシータを捜し、ランカーへ攻め込んだ。',
    pesan: '恩義と約束に根ざした同盟は、どんな軍勢よりも強い。',
  },
};

// Terjemahan Inggris per karakter (berdasarkan id). Menimpa field teks di data asli.
export const EN = {
  1: {
    title: 'Anggada',
    julukan: 'Envoy of Peace from Kiskenda',
    tagline: 'Once he planted one foot, no one in Alengka could budge him.',
    watak: ['Loyal', 'Brave', 'Clever'],
    description:
      'Anggada is a formidable vanara (monkey warrior), son of Subali. He served as one of Sri Rama’s trusted commanders, playing a vital role in the campaign against the kingdom of Alengka.',
    momen:
      'Sent by Rama as an envoy to Rahwana’s court, he planted his foot firmly on the floor and challenged anyone to lift it.',
    pesan:
      'True strength needs no shouting. Steadfastness alone is enough to make any adversary tremble.',
  },
  2: {
    title: 'Dewi Sita',
    julukan: 'Princess of Mantili, Paragon of Devotion',
    tagline: 'Abducted for her beauty, remembered for her steadfastness.',
    watak: ['Pure', 'Patient', 'Steadfast'],
    description:
      'The wife of Sri Rama, symbolizing purity, devotion, and unwavering resolve. Rahwana’s abduction of Dewi Sita became the catalyst for the great Ramayana war.',
    momen:
      'Held captive in the Asoka Garden, Sita rejected every enticement from Rahwana and faithfully awaited Rama.',
    pesan:
      'Loyalty and dignity remain intact even when every circumstance tries to shake them.',
  },
  3: {
    title: 'Hanoman',
    julukan: 'The White Ape, Messenger of Rama',
    tagline: 'Leapt across the ocean, set Alengka ablaze, and returned with news.',
    watak: ['Mighty', 'Loyal', 'Humble'],
    description:
      'A great hero in the form of a white ape endowed with divine strength. His dedication and loyalty to Sri Rama are unmatched.',
    momen:
      'Captured by Rahwana’s forces with his tail set on fire, Hanoman leapt from roof to roof and set the capital of Alengka ablaze.',
    pesan:
      'Selfless, sincere devotion is the highest form of strength.',
  },
  4: {
    title: 'Jatayu',
    julukan: 'Garuda Guardian of Dandaka Forest',
    tagline: 'Knowing he would lose, he chose to fight anyway.',
    watak: ['Gallant', 'Self-Sacrificing', 'Devoted Friend'],
    description:
      'An ancient garuda bird and close friend of King Dasarata. Jatayu gallantly gave his life trying to rescue Dewi Sita from Rahwana’s clutches.',
    momen:
      'He intercepted Rahwana mid-flight as he carried Sita away. Though his wings were severed, he clung to life long enough to inform Rama.',
    pesan:
      'Courage is measured by the will to defend the weak, not by the odds of winning.',
  },
  5: {
    title: 'Kumbakarna',
    julukan: 'The Giant Who Defended His Homeland',
    tagline: 'He knew his brother was wrong, yet refused to let his homeland fall alone.',
    watak: ['Honest', 'Chivalrous', 'Conflicted'],
    description:
      'Rahwana’s younger brother who bore a fearsome giant form yet possessed a noble, honest warrior’s heart. He marched to battle solely to defend his homeland.',
    momen:
      'Awakened from his long slumber, Kumbakarna counseled Rahwana to return Sita.',
    pesan:
      'Love for one’s homeland does not mean justifying a leader’s wrongdoing.',
  },
  6: {
    title: 'Patih Prahasta',
    julukan: 'Grand Commander of Alengka',
    tagline: 'Faithful to his duty, even when the cause had gone astray.',
    watak: ['Disciplined', 'Loyal', 'Commanding'],
    description:
      'Rahwana’s uncle and the trusted chief minister and commander of Alengka. Even knowing his kin walked the wrong path, he remained loyal in leading the army.',
    momen:
      'He led the giant forces against the vanara ranks in the fierce battle at the gates of Alengka.',
    pesan:
      'Blind loyalty can drag even good people onto the wrong side.',
  },
  7: {
    title: 'Rahwana',
    julukan: 'Dasamuka, the Ten-Faced King',
    tagline: 'Powerful, brilliant, and undone by his own arrogance.',
    watak: ['Powerful', 'Arrogant', 'Ambitious'],
    description:
      'The ten-faced demon king (Dasamuka) of immense power. His wrath, greed, and arrogance in coveting Dewi Sita led him to total ruin.',
    momen:
      'He abducted Sita and rejected every counsel to return her, until he finally fell to Rama’s arrow.',
    pesan:
      'Intelligence and power without self-restraint lead inevitably to ruin.',
  },
  8: {
    title: 'Sri Rama',
    julukan: 'Avatar of Vishnu, Upholder of Dharma',
    tagline: 'Willing to surrender a throne to keep his word.',
    watak: ['Wise', 'Composed', 'Principled'],
    description:
      'Crown prince of Ayodhya and the central hero upholding dharma (righteousness). Armed with his sacred bow, he strives to vanquish evil.',
    momen:
      'He endured 14 years of exile, then led the vanara army across the sea to rescue Sita.',
    pesan:
      'Upholding truth often demands great personal sacrifice.',
  },
  9: {
    title: 'Sempati',
    julukan: 'The Wing-Broken Garuda',
    tagline: 'No longer able to fly, yet his vision guided the army.',
    watak: ['Caring', 'Vigilant', 'Wise'],
    description:
      'Jatayu’s elder brother who lost his wings shielding his younger sibling from the scorching sun. Sempati later provided crucial intelligence to the vanara army.',
    momen:
      'From a coastal cliff, he spotted Sita held captive in Alengka and showed the vanaras the direction they needed to take.',
    pesan:
      'Limitations never erase one’s ability to bring meaning to others.',
  },
  10: {
    title: 'Sugriwa',
    julukan: 'King of the Vanaras',
    tagline: 'Lost his throne, then repaid a debt of gratitude with his entire army.',
    watak: ['True to His Word', 'Strategic', 'Leader'],
    description:
      'King of the vanaras whose throne was usurped by his brother, Subali. After being aided by Rama, he repaid the kindness by mobilizing his entire ape army.',
    momen:
      'Allied with Rama, he marshaled thousands of vanaras from every corner to search for Sita and storm Alengka.',
    pesan:
      'An alliance built on gratitude and kept promises is stronger than any army.',
  },
};
