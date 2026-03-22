import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Play,
  CheckCircle2,
  XCircle,
  Home,
  Trophy,
  ArrowRight,
  BookMarked,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// --- 弟子規完整資料庫 ---
const diZiGuiData = [
  // --- 入則孝 ---
  {
    id: 1,
    category: "入則孝",
    first: "父母呼",
    second: "應勿緩",
    meaning: "父母呼喚時，要立刻答應，不要遲緩。",
  },
  {
    id: 2,
    category: "入則孝",
    first: "父母命",
    second: "行勿懶",
    meaning: "父母交代的事情，要立刻動手去做，不可拖延偷懶。",
  },
  {
    id: 3,
    category: "入則孝",
    first: "父母教",
    second: "須敬聽",
    meaning: "父母教導我們做人處事的道理，必須恭敬地聆聽。",
  },
  {
    id: 4,
    category: "入則孝",
    first: "父母責",
    second: "須順承",
    meaning: "父母責備我們時，必須順從地接受，不可頂嘴。",
  },
  {
    id: 5,
    category: "入則孝",
    first: "冬則溫",
    second: "夏則凊",
    meaning: "冬天要讓父母溫暖，夏天要讓父母涼爽。",
  },
  {
    id: 6,
    category: "入則孝",
    first: "晨則省",
    second: "昏則定",
    meaning: "早晨要向父母請安，晚上要幫父母鋪床並道晚安。",
  },
  {
    id: 7,
    category: "入則孝",
    first: "出必告",
    second: "反必面",
    meaning: "出門前必須告訴父母，回家後必須當面稟報。",
  },
  {
    id: 8,
    category: "入則孝",
    first: "居有常",
    second: "業無變",
    meaning: "生活起居要規律正常，做事情要有恆心，不可見異思遷。",
  },
  {
    id: 9,
    category: "入則孝",
    first: "事雖小",
    second: "勿擅為",
    meaning: "事情雖然小，也不可以擅自做主而不稟告父母。",
  },
  {
    id: 10,
    category: "入則孝",
    first: "物雖小",
    second: "勿私藏",
    meaning: "物品雖然小，也不可以私自藏起來佔為己有。",
  },
  // --- 出則弟 ---
  {
    id: 11,
    category: "出則弟",
    first: "兄道友",
    second: "弟道恭",
    meaning: "當哥哥的要友愛弟妹，做弟妹的要懂得恭敬兄長。",
  },
  {
    id: 12,
    category: "出則弟",
    first: "兄弟睦",
    second: "孝在中",
    meaning: "兄弟姊妹能和睦相處，這就是對父母盡孝了。",
  },
  {
    id: 13,
    category: "出則弟",
    first: "財物輕",
    second: "怨何生",
    meaning: "把金錢財物看得很輕，兄弟間哪裡會產生怨恨呢？",
  },
  {
    id: 14,
    category: "出則弟",
    first: "言語忍",
    second: "忿自泯",
    meaning: "講話時能互相忍讓，不說傷人的話，憤怒自然就會消失。",
  },
  {
    id: 15,
    category: "出則弟",
    first: "或飲食",
    second: "或坐走",
    meaning: "不論是吃東西、喝飲料，或者是坐著、走路。",
  },
  {
    id: 16,
    category: "出則弟",
    first: "長者先",
    second: "幼者後",
    meaning: "都要讓長輩優先，晚輩則跟在後面。",
  },
  {
    id: 17,
    category: "出則弟",
    first: "長呼人",
    second: "即代叫",
    meaning: "長輩在呼喚別人時，應該立刻代為傳喚。",
  },
  {
    id: 18,
    category: "出則弟",
    first: "人不在",
    second: "己即到",
    meaning: "如果那個人不在，自己就應該立刻到長輩面前看有什麼需要幫忙的。",
  },
  {
    id: 19,
    category: "出則弟",
    first: "稱尊長",
    second: "勿呼名",
    meaning: "稱呼長輩時，不可以直呼其名。",
  },
  {
    id: 20,
    category: "出則弟",
    first: "對尊長",
    second: "勿見能",
    meaning: "在長輩面前，不要賣弄自己的才能。",
  },
  {
    id: 21,
    category: "出則弟",
    first: "長者立",
    second: "幼勿坐",
    meaning: "長輩站立著的時候，晚輩不可以先坐下。",
  },
  {
    id: 22,
    category: "出則弟",
    first: "長者坐",
    second: "命乃坐",
    meaning: "長輩坐下後，吩咐我們坐，才可以坐下。",
  },
  {
    id: 23,
    category: "出則弟",
    first: "事諸父",
    second: "如事父",
    meaning: "對待別人的叔伯，要像對待自己的父親一樣恭敬。",
  },
  {
    id: 24,
    category: "出則弟",
    first: "事諸兄",
    second: "如事兄",
    meaning: "對待別人的兄長，要像對待自己的哥哥一樣友愛。",
  },
  // --- 謹 ---
  {
    id: 25,
    category: "謹",
    first: "朝起早",
    second: "夜眠遲",
    meaning: "早上要起得早，晚上要晚點睡(多用功學習)。",
  },
  {
    id: 26,
    category: "謹",
    first: "老易至",
    second: "惜此時",
    meaning: "時光飛逝，人很容易變老，所以要珍惜現在的青春時光。",
  },
  {
    id: 27,
    category: "謹",
    first: "晨必盥",
    second: "兼漱口",
    meaning: "早晨起床必須洗臉，同時也要漱口刷牙，保持整潔。",
  },
  {
    id: 28,
    category: "謹",
    first: "便溺回",
    second: "輒淨手",
    meaning: "上完廁所回來後，一定要立刻把手洗乾淨。",
  },
  {
    id: 29,
    category: "謹",
    first: "冠必正",
    second: "紐必結",
    meaning: "帽子要戴得端正，衣服的鈕扣一定要扣好。",
  },
  {
    id: 30,
    category: "謹",
    first: "襪與履",
    second: "俱緊切",
    meaning: "穿的襪子和鞋子，都要穿得平整緊湊、合腳。",
  },
  {
    id: 31,
    category: "謹",
    first: "步從容",
    second: "立端正",
    meaning: "走路時步態要從容穩重，站立時姿勢要抬頭挺胸、端正。",
  },
  {
    id: 32,
    category: "謹",
    first: "勿踐閾",
    second: "勿跛倚",
    meaning: "進出門不要踩在門檻上，站立時身體不要歪斜依靠著牆。",
  },
  {
    id: 33,
    category: "謹",
    first: "勿箕踞",
    second: "勿搖髀",
    meaning: "坐著時不要雙腿張開像畚箕，也不要隨便抖動大腿。",
  },
  {
    id: 34,
    category: "謹",
    first: "緩揭簾",
    second: "勿有聲",
    meaning: "進門時揭開門簾的動作要輕緩，不要發出巨大的聲響。",
  },
  // --- 信 ---
  {
    id: 35,
    category: "信",
    first: "凡出言",
    second: "信為先",
    meaning: "只要開口說話，首先一定要講究誠實與信用。",
  },
  {
    id: 36,
    category: "信",
    first: "詐與妄",
    second: "奚可焉",
    meaning: "欺詐騙人或是胡言亂語，這些行為怎麼可以去做呢？",
  },
  {
    id: 37,
    category: "信",
    first: "話說多",
    second: "不如少",
    meaning: "話說得太多，不如說得少而精確（言多必失）。",
  },
  {
    id: 38,
    category: "信",
    first: "惟其是",
    second: "勿佞巧",
    meaning: "說話要實事求是，不要花言巧語、巧言令色。",
  },
  {
    id: 39,
    category: "信",
    first: "刻薄語",
    second: "穢污詞",
    meaning: "刻薄傷人的話語，以及骯髒下流的言詞。",
  },
  {
    id: 40,
    category: "信",
    first: "市井氣",
    second: "切戒之",
    meaning: "那些市井無賴的粗俗習氣與髒話，一定要徹底戒除。",
  },
  {
    id: 41,
    category: "信",
    first: "見未真",
    second: "勿輕言",
    meaning: "事情還沒有看清楚真相之前，不要隨便發表意見。",
  },
  {
    id: 42,
    category: "信",
    first: "知未的",
    second: "勿輕傳",
    meaning: "對於還不確定真實性的事情，不要隨便傳播、當謠言製造者。",
  },
  {
    id: 43,
    category: "信",
    first: "事非宜",
    second: "勿輕諾",
    meaning: "如果覺得事情不合理或自己做不到，不要輕易答應別人。",
  },
  {
    id: 44,
    category: "信",
    first: "苟輕諾",
    second: "進退錯",
    meaning: "如果輕易答應了，到時候做不到就會進退兩難、失去信用。",
  },
  // --- 汎愛眾 ---
  {
    id: 45,
    category: "汎愛眾",
    first: "凡是人",
    second: "皆須愛",
    meaning: "只要是人，我們都要懷抱著愛心去互相對待。",
  },
  {
    id: 46,
    category: "汎愛眾",
    first: "天同覆",
    second: "地同載",
    meaning: "因為我們都生活在同一片天空下，同一塊土地上。",
  },
  {
    id: 47,
    category: "汎愛眾",
    first: "己有能",
    second: "勿自私",
    meaning: "自己有能力，不要自私自利，要樂於幫助別人。",
  },
  {
    id: 48,
    category: "汎愛眾",
    first: "人所能",
    second: "勿輕訾",
    meaning: "別人有能力，也不要隨便貶低或嫉妒對方。",
  },
  {
    id: 49,
    category: "汎愛眾",
    first: "勿諂富",
    second: "勿驕貧",
    meaning: "不要去討好巴結富有的人，也不要在窮人面前驕傲自大。",
  },
  {
    id: 50,
    category: "汎愛眾",
    first: "勿厭故",
    second: "勿喜新",
    meaning: "不要厭棄老朋友，也不要只喜歡結交新朋友。",
  },
  {
    id: 51,
    category: "汎愛眾",
    first: "人有短",
    second: "切莫揭",
    meaning: "別人有缺點，千萬不要去揭穿張揚。",
  },
  {
    id: 52,
    category: "汎愛眾",
    first: "人有私",
    second: "切莫說",
    meaning: "別人有隱私或秘密，千萬不要到處亂說。",
  },
  {
    id: 53,
    category: "汎愛眾",
    first: "道人善",
    second: "即是善",
    meaning: "稱讚別人的優點，這本身就是一件好事。",
  },
  {
    id: 54,
    category: "汎愛眾",
    first: "揚人惡",
    second: "即是惡",
    meaning: "宣揚別人的過錯，這本身就是一件壞事。",
  },
  // --- 親仁 ---
  {
    id: 55,
    category: "親仁",
    first: "同是人",
    second: "類不齊",
    meaning: "雖然大家都是人，但品行和道德高低卻很不一樣。",
  },
  {
    id: 56,
    category: "親仁",
    first: "流俗眾",
    second: "仁者希",
    meaning: "跟著世俗隨波逐流的人很多，真正有仁德的人卻很少。",
  },
  {
    id: 57,
    category: "親仁",
    first: "能親仁",
    second: "無限好",
    meaning: "如果能親近有仁德的人，好處是無窮無盡的。",
  },
  {
    id: 58,
    category: "親仁",
    first: "德日進",
    second: "過日少",
    meaning: "品德會一天比一天進步，過錯會一天比一天減少。",
  },
  // --- 餘力學文 ---
  {
    id: 59,
    category: "餘力學文",
    first: "不力行",
    second: "但學文",
    meaning: "如果不去努力實踐品德，只是死讀書。",
  },
  {
    id: 60,
    category: "餘力學文",
    first: "長浮華",
    second: "成何人",
    meaning: "只會增長浮誇不實的習氣，會變成什麼樣的人呢？",
  },
  {
    id: 61,
    category: "餘力學文",
    first: "讀書法",
    second: "有三到",
    meaning: "讀書的方法，有三個方面要確實做到。",
  },
  {
    id: 62,
    category: "餘力學文",
    first: "心眼口",
    second: "信皆要",
    meaning: "心要專一、眼要看仔細、口要讀出聲，這三者都非常重要。",
  },
  {
    id: 63,
    category: "餘力學文",
    first: "寬為限",
    second: "緊用功",
    meaning: "讀書計畫的時間可以定得寬裕些，但執行時要抓緊時間用功。",
  },
  {
    id: 64,
    category: "餘力學文",
    first: "心有疑",
    second: "隨札記",
    meaning: "心裡有疑問時，要隨時用筆記記下來，向人請教。",
  },
];

const categories = [
  "全部",
  "入則孝",
  "出則弟",
  "謹",
  "信",
  "汎愛眾",
  "親仁",
  "餘力學文",
];

// --- 實用工具函數 ---
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const generateOptions = (correctAnswer, type, currentId) => {
  let pool = [];
  if (type === "sentence") {
    pool = diZiGuiData
      .filter((item) => item.id !== currentId)
      .map((item) => item.second);
  } else if (type === "meaning") {
    pool = diZiGuiData
      .filter((item) => item.id !== currentId)
      .map((item) => `${item.first}，${item.second}`);
  }
  const shuffledPool = shuffleArray(pool);
  const options = [correctAnswer, ...shuffledPool.slice(0, 3)];
  return shuffleArray(options);
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [gameModeTitle, setGameModeTitle] = useState("");
  const [activeFilter, setActiveFilter] = useState("全部");
  const [isWaitingForNext, setIsWaitingForNext] = useState(false); // 控制是否顯示下一題按鈕

  const scrollContainerRef = useRef(null);
  const nextButtonRef = useRef(null);

  // 初始化遊戲
  const startGame = (mode) => {
    let newQuestions = [];
    const shuffledData = shuffleArray(diZiGuiData).slice(0, 5); // 隨機抽 5 題

    if (mode === "sentence") {
      setGameModeTitle("經典接龍");
      newQuestions = shuffledData.map((item) => ({
        questionText: `${item.first}，_____`,
        correctAnswer: item.second,
        options: generateOptions(item.second, "sentence", item.id),
        meaning: item.meaning,
        category: item.category,
      }));
      setCurrentScreen("play_sentence");
    } else if (mode === "meaning") {
      setGameModeTitle("白話解碼");
      newQuestions = shuffledData.map((item) => ({
        questionText: item.meaning,
        correctAnswer: `${item.first}，${item.second}`,
        options: generateOptions(
          `${item.first}，${item.second}`,
          "meaning",
          item.id
        ),
        meaning: "",
        category: item.category,
      }));
      setCurrentScreen("play_meaning");
    }

    setQuestions(newQuestions);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setIsWaitingForNext(false);
  };

  const handleAnswerClick = (option) => {
    if (selectedAnswer !== null) return;

    const currentQ = questions[currentQIndex];
    const correct = option === currentQ.correctAnswer;

    setSelectedAnswer(option);
    setIsAnswerCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 20);
    }

    // 改為手動進入下一題，顯示按鈕
    setIsWaitingForNext(true);

    // 延遲一點點讓畫面渲染完成後，自動將底部按鈕捲動到可見範圍
    setTimeout(() => {
      if (nextButtonRef.current) {
        nextButtonRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setIsWaitingForNext(false);
      // 捲回頂部
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      setCurrentScreen("result");
    }
  };

  // --- 畫面組件 ---
  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 h-full my-auto py-4">
      <div className="bg-amber-100 p-4 sm:p-6 rounded-full shadow-inner mb-2 sm:mb-4 shrink-0 flex items-center justify-center relative">
        <Sparkles className="absolute -top-2 -right-2 text-amber-500 w-6 h-6 animate-pulse" />
        <BookMarked className="text-amber-800 w-12 h-12 sm:w-16 sm:h-16" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 tracking-widest text-center shrink-0">
        弟子規
      </h1>
      <div className="bg-amber-800 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-2 shadow-sm">
        完整典藏版
      </div>
      <p className="text-amber-700 text-base sm:text-lg mb-4 sm:mb-8 text-center max-w-xs shrink-0">
        收錄完整七大篇章，
        <br />
        傳承經典智慧，培養良好品德。
      </p>

      <div className="w-full max-w-sm space-y-3 sm:space-y-4 shrink-0">
        <button
          onClick={() => {
            setActiveFilter("全部");
            setCurrentScreen("learn");
          }}
          className="w-full flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl shadow-md border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-400 transition-all text-amber-900 font-semibold text-base sm:text-lg"
        >
          <span className="flex items-center">
            <BookOpen className="mr-3 w-5 h-5 sm:w-6 sm:h-6" /> 溫故知新
            (章節學習)
          </span>
          <ArrowRight size={20} className="text-amber-500" />
        </button>

        <button
          onClick={() => startGame("sentence")}
          className="w-full flex items-center justify-between p-3 sm:p-4 bg-emerald-600 rounded-xl shadow-md border-2 border-emerald-700 hover:bg-emerald-500 transition-all text-white font-semibold text-base sm:text-lg"
        >
          <span className="flex items-center">
            <Play className="mr-3 w-5 h-5 sm:w-6 sm:h-6" /> 經典接龍 (句子填空)
          </span>
          <ArrowRight size={20} className="text-emerald-300" />
        </button>

        <button
          onClick={() => startGame("meaning")}
          className="w-full flex items-center justify-between p-3 sm:p-4 bg-sky-600 rounded-xl shadow-md border-2 border-sky-700 hover:bg-sky-500 transition-all text-white font-semibold text-base sm:text-lg"
        >
          <span className="flex items-center">
            <Play className="mr-3 w-5 h-5 sm:w-6 sm:h-6" /> 白話解碼 (字義配對)
          </span>
          <ArrowRight size={20} className="text-sky-300" />
        </button>
      </div>
    </div>
  );

  const renderLearn = () => {
    const filteredData =
      activeFilter === "全部"
        ? diZiGuiData
        : diZiGuiData.filter((item) => item.category === activeFilter);

    return (
      <div className="flex flex-col h-full w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4 shrink-0 pt-2">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-900 flex items-center">
            <BookOpen className="mr-2" /> 溫故知新
          </h2>
          <button
            onClick={() => setCurrentScreen("menu")}
            className="p-2 bg-amber-200 text-amber-800 rounded-full hover:bg-amber-300 transition-colors"
          >
            <Home size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* 分類標籤滑動區 */}
        <div className="flex overflow-x-auto custom-scrollbar pb-3 mb-2 space-x-2 shrink-0 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-colors ${
                activeFilter === cat
                  ? "bg-amber-600 text-white border-amber-700 shadow-sm"
                  : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2 custom-scrollbar pb-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-amber-100 relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
              <div className="flex justify-between items-start mb-1 sm:mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-widest">
                  {item.first}，{item.second}
                </h3>
                <span className="text-xs px-2 py-1 rounded font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {item.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGame = () => {
    const currentQ = questions[currentQIndex];
    if (!currentQ) return null;

    return (
      <div className="flex flex-col w-full max-w-md mx-auto h-full">
        <div className="flex items-center justify-between mb-4 sm:mb-6 shrink-0 pt-2">
          <button
            onClick={() => setCurrentScreen("menu")}
            className="p-2 bg-amber-200 text-amber-800 rounded-full hover:bg-amber-300 transition-colors"
          >
            <Home size={20} className="sm:w-6 sm:h-6" />
          </button>
          <div className="text-sm sm:text-base font-bold text-amber-800 bg-amber-100 px-3 py-1 sm:px-4 rounded-full">
            {gameModeTitle} - 第 {currentQIndex + 1} / {questions.length} 題
          </div>
          <div className="text-base sm:text-lg font-bold text-emerald-600">
            {score} 分
          </div>
        </div>

        {/* 將 pb-8 增加為 pb-24，保留底部足夠空間讓內容不被裁切 */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-24 flex flex-col relative"
        >
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border-2 border-amber-100 mb-4 sm:mb-6 flex flex-col items-center text-center min-h-[140px] sm:min-h-[160px] justify-center relative shrink-0">
            <span className="absolute top-3 right-3 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded border border-amber-100">
              {currentQ.category}
            </span>
            <h2
              className={`font-bold text-gray-800 mt-2 ${
                currentScreen === "play_sentence"
                  ? "text-3xl sm:text-4xl tracking-widest"
                  : "text-lg sm:text-xl leading-relaxed"
              }`}
            >
              {currentQ.questionText}
            </h2>

            {/* 答對/答錯回饋圖示 */}
            {selectedAnswer && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-2xl animate-fade-in z-10">
                {isAnswerCorrect ? (
                  <div className="flex flex-col items-center animate-bounce">
                    <CheckCircle2
                      size={64}
                      className="sm:w-20 sm:h-20 text-emerald-500 mb-2"
                    />
                    <span className="text-emerald-600 font-bold text-lg sm:text-xl">
                      答對了！
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center animate-shake">
                    <XCircle
                      size={64}
                      className="sm:w-20 sm:h-20 text-rose-500 mb-2"
                    />
                    <span className="text-rose-600 font-bold text-lg sm:text-xl">
                      再接再厲！
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full shrink-0">
            {currentQ.options.map((option, index) => {
              let btnClass =
                "bg-white text-gray-800 border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-400";
              if (selectedAnswer !== null) {
                if (option === currentQ.correctAnswer) {
                  btnClass =
                    "bg-emerald-100 text-emerald-800 border-2 border-emerald-500 ring-2 ring-emerald-300";
                } else if (option === selectedAnswer && !isAnswerCorrect) {
                  btnClass =
                    "bg-rose-100 text-rose-800 border-2 border-rose-500 opacity-70";
                } else {
                  btnClass =
                    "bg-gray-50 text-gray-400 border-2 border-gray-200 opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-3 sm:p-4 rounded-xl text-base sm:text-lg font-semibold transition-all shadow-sm min-h-[56px] ${btnClass} ${
                    currentScreen === "play_meaning" ? "tracking-widest" : ""
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* 顯示解答的白話文，並提供手動下一題按鈕 */}
          {isWaitingForNext && (
            <div className="mt-4 sm:mt-6 animate-fade-in shrink-0 flex flex-col space-y-4">
              {currentScreen === "play_sentence" && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left shadow-sm">
                  <span className="font-bold text-amber-900 block mb-1">
                    📝 白話文解釋：
                  </span>
                  <span className="text-amber-800 text-sm leading-relaxed">
                    {currentQ.meaning}
                  </span>
                </div>
              )}

              <button
                ref={nextButtonRef}
                onClick={handleNextQuestion}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-md flex items-center justify-center transition-colors"
              >
                {currentQIndex < questions.length - 1 ? "下一題" : "查看成績"}{" "}
                <ChevronRight className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    let message = "";
    if (score === 100) message = "太棒了！你是《弟子規》全能小達人！🌟";
    else if (score >= 60) message = "表現不錯喔！繼續保持！👍";
    else message = "再多複習一下，下次一定會更好！💪";

    return (
      <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto space-y-6 sm:space-y-8 text-center py-4">
        <div className="relative shrink-0">
          <Trophy
            size={80}
            className="sm:w-[100px] sm:h-[100px] text-amber-400 animate-pulse"
          />
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-red-500 text-white font-bold text-lg sm:text-xl w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
            {score}
          </div>
        </div>

        <div className="shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
            測驗結束
          </h2>
          <p className="text-lg sm:text-xl text-amber-700 px-4">{message}</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md w-full border border-amber-100 shrink-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-3 sm:mb-4">
            總結 (綜合測驗)
          </h3>
          <div className="flex justify-between items-center text-lg sm:text-xl mb-2">
            <span className="text-gray-500">總題數</span>
            <span className="font-bold text-gray-800">
              {questions.length} 題
            </span>
          </div>
          <div className="flex justify-between items-center text-lg sm:text-xl">
            <span className="text-gray-500">答對題數</span>
            <span className="font-bold text-emerald-600">{score / 20} 題</span>
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen("menu")}
          className="w-full flex items-center justify-center p-3 sm:p-4 bg-amber-500 rounded-xl shadow-md hover:bg-amber-400 transition-all text-white font-bold text-base sm:text-lg shrink-0 mt-auto sm:mt-0"
        >
          <Home className="mr-2 w-5 h-5 sm:w-6 sm:h-6" /> 回到主選單
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-2 sm:p-4 font-sans selection:bg-amber-200">
      {/* 遊戲容器 */}
      <div className="w-full max-w-md bg-stone-50 h-[95dvh] sm:h-[800px] sm:max-h-[90vh] rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden relative border-[4px] sm:border-[8px] border-white flex flex-col">
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

        {/* 內容區塊 */}
        <div className="relative z-10 w-full h-full p-4 sm:p-6 flex flex-col min-h-0">
          {currentScreen === "menu" && renderMenu()}
          {currentScreen === "learn" && renderLearn()}
          {(currentScreen === "play_sentence" ||
            currentScreen === "play_meaning") &&
            renderGame()}
          {currentScreen === "result" && renderResult()}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        /* 隱藏預設捲軸，改用自訂細捲軸 */
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fcd34d; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fbbf24; 
        }
      `,
        }}
      />
    </div>
  );
}
