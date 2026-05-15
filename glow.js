import { useState, useEffect, useRef } from "react";

const SKIN_TYPES = ["Normal", "Oily", "Dry", "Combination", "Sensitive"];
const CONCERNS_SKIN = ["Tanning", "Acne / Zits", "Pigmentation", "Blemishes", "Dark Circles", "Open Pores", "Dullness", "Anti-Ageing"];
const CONCERNS_HAIR = ["Hair Loss", "Dandruff", "Frizz & Dryness", "Slow Hair Growth", "Oily Scalp", "Split Ends", "Thinning"];
const ALLERGIES = ["Retinol", "Niacinamide", "AHA/BHA", "Fragrance", "Sulphates", "Parabens", "Alcohol", "Silicones"];
const PRICE_RANGES = ["Under ₹300", "₹300–₹800", "₹800–₹2000", "₹2000+"];

const TRADITIONAL_REMEDIES = {
  "Tanning": {
    remedy: "Besan + Haldi + Curd Ubtan",
    steps: ["Mix 2 tbsp besan, a pinch of haldi, and fresh curd.", "Apply on face & body, leave 20 min.", "Scrub gently while washing off."],
    icon: "🌾"
  },
  "Acne / Zits": {
    remedy: "Multani Mitti + Neem + Rose Water",
    steps: ["Make a paste of multani mitti, neem powder & rose water.", "Apply on affected areas, leave until dry.", "Rinse with cold water."],
    icon: "🌿"
  },
  "Pigmentation": {
    remedy: "Kesar + Sandalwood + Milk",
    steps: ["Soak 4-5 kesar strands in warm milk overnight.", "Add sandalwood powder to make a paste.", "Apply for 20 min, rinse with cool water."],
    icon: "🌸"
  },
  "Blemishes": {
    remedy: "Aloe Vera + Vitamin E + Rose Hip",
    steps: ["Extract fresh aloe vera gel.", "Mix with Vitamin E oil.", "Apply nightly as a spot treatment."],
    icon: "🌱"
  },
  "Dark Circles": {
    remedy: "Raw Potato + Cucumber + Cold Tea Bags",
    steps: ["Slice raw potato and cucumber thin.", "Place over closed eyes for 15 min.", "Alternatively, use cooled chamomile tea bags."],
    icon: "🥒"
  },
  "Open Pores": {
    remedy: "Egg White + Lemon + Turmeric Mask",
    steps: ["Whisk egg white with a few drops of lemon.", "Add a tiny pinch of turmeric.", "Apply, let dry, peel or wash off."],
    icon: "🥚"
  },
  "Dullness": {
    remedy: "Papaya + Honey + Oat Scrub",
    steps: ["Mash ripe papaya, add honey & oat flour.", "Massage on face in gentle circles.", "Leave 10 min, rinse for instant glow."],
    icon: "🍯"
  },
  "Anti-Ageing": {
    remedy: "Ashwagandha + Almond Oil + Saffron",
    steps: ["Mix ashwagandha powder with sweet almond oil.", "Add a few kesar strands.", "Massage on face every night before bed."],
    icon: "✨"
  },
  "Hair Loss": {
    remedy: "Bhringraj + Amla + Coconut Oil",
    steps: ["Heat coconut oil with bhringraj leaves & amla.", "Cool and strain the oil.", "Massage into scalp 2x a week overnight."],
    icon: "🥥"
  },
  "Dandruff": {
    remedy: "Neem Oil + Methi Seeds + Yogurt",
    steps: ["Soak methi seeds overnight, grind to paste.", "Add neem oil and plain yogurt.", "Apply on scalp, leave 30 min, wash with mild shampoo."],
    icon: "🌿"
  },
  "Frizz & Dryness": {
    remedy: "Banana + Honey + Olive Oil Mask",
    steps: ["Mash 1 ripe banana with 1 tbsp honey & olive oil.", "Apply from roots to tips.", "Cover with a shower cap for 1 hour, rinse."],
    icon: "🍌"
  },
  "Slow Hair Growth": {
    remedy: "Onion Juice + Castor Oil + Rosemary",
    steps: ["Extract juice from 1 onion.", "Mix with equal parts castor oil + rosemary oil.", "Massage into scalp, leave 1 hour, wash off."],
    icon: "🧅"
  },
  "Oily Scalp": {
    remedy: "Apple Cider Vinegar + Mint + Green Tea Rinse",
    steps: ["Brew green tea and add dried mint leaves, cool.", "Add 2 tbsp apple cider vinegar.", "Use as final rinse after shampooing."],
    icon: "🍵"
  },
  "Split Ends": {
    remedy: "Eggs + Avocado + Argan Oil Mask",
    steps: ["Mash half avocado, mix in 1 egg & argan oil.", "Apply from mid-length to ends.", "Leave 30 min, rinse with cold water."],
    icon: "🥑"
  },
  "Thinning": {
    remedy: "Fenugreek + Amla + Shikakai Paste",
    steps: ["Soak fenugreek overnight, grind with amla powder.", "Add shikakai powder and water.", "Apply on scalp, leave 45 min, rinse well."],
    icon: "🌾"
  }
};

const PRODUCTS = {
  "Tanning": {
    "Under ₹300": [
      { name: "Lotus Herbals WhiteGlow SPF 25", type: "Sunscreen + Brightening Gel", price: "₹235" },
      { name: "Lacto Calamine Skin Balance", type: "Lotion", price: "₹199" }
    ],
    "₹300–₹800": [
      { name: "Dot & Key Vitamin C Sunscreen SPF 50", type: "Sunscreen", price: "₹595" },
      { name: "Mamaearth Vitamin C Serum", type: "Serum", price: "₹449" }
    ],
    "₹800–₹2000": [
      { name: "Minimalist 10% Niacinamide + 1% Zinc", type: "Serum", price: "₹999" },
      { name: "Plum 15% Vitamin C Face Serum", type: "Serum", price: "₹1,099" }
    ],
    "₹2000+": [
      { name: "Skinkraft Customised Brightening Serum", type: "Serum", price: "₹2,499" },
      { name: "RE' EQUIL Skin Radiance Cream", type: "Cream", price: "₹2,199" }
    ]
  },
  "Acne / Zits": {
    "Under ₹300": [
      { name: "Himalaya Purifying Neem Face Wash", type: "Face Wash", price: "₹180" },
      { name: "Lacto Calamine Oil Control Lotion", type: "Lotion", price: "₹199" }
    ],
    "₹300–₹800": [
      { name: "Minimalist 2% Salicylic Acid Serum", type: "Serum", price: "₹549" },
      { name: "Dot & Key Acne Control Spot Corrector", type: "Spot Corrector", price: "₹645" }
    ],
    "₹800–₹2000": [
      { name: "Paula's Choice BHA Exfoliant 2%", type: "Exfoliant", price: "₹1,799" },
      { name: "Plum Green Tea Renewed Clarity Night Gel", type: "Night Gel", price: "₹899" }
    ],
    "₹2000+": [
      { name: "The Ordinary Salicylic Acid 2% Masque", type: "Mask", price: "₹2,100" },
      { name: "Murad Acne Control Clarifying Cleanser", type: "Cleanser", price: "₹3,200" }
    ]
  },
  "Pigmentation": {
    "Under ₹300": [
      { name: "Garnier Bright Complete Vitamin C Serum", type: "Serum", price: "₹279" },
      { name: "Everyuth Tan Removal Scrub", type: "Scrub", price: "₹175" }
    ],
    "₹300–₹800": [
      { name: "Mamaearth Bye Bye Blemishes Serum", type: "Serum", price: "₹549" },
      { name: "Minimalist Alpha Arbutin 2% + HA", type: "Serum", price: "₹599" }
    ],
    "₹800–₹2000": [
      { name: "Plum 20% Vitamin C Face Serum", type: "Serum", price: "₹1,499" },
      { name: "Kama Ayurveda Eladi Hydrating Cream", type: "Cream", price: "₹1,895" }
    ],
    "₹2000+": [
      { name: "Skinkraft Melasma Control Serum", type: "Serum", price: "₹2,799" },
      { name: "Tatcha The Dewy Skin Cream", type: "Moisturiser", price: "₹5,200" }
    ]
  },
  "Hair Loss": {
    "Under ₹300": [
      { name: "Vatika Enriched Coconut Hair Oil", type: "Hair Oil", price: "₹250" },
      { name: "Clinic Plus Keratin Shampoo", type: "Shampoo", price: "₹199" }
    ],
    "₹300–₹800": [
      { name: "Mamaearth Onion Hair Fall Control Shampoo", type: "Shampoo", price: "₹399" },
      { name: "WOW Skin Onion Conditioner", type: "Conditioner", price: "₹549" }
    ],
    "₹800–₹2000": [
      { name: "Pilgrim Redensyl Hair Growth Serum", type: "Scalp Serum", price: "₹999" },
      { name: "Biotique Bio Bhringraj Hair Oil", type: "Hair Oil", price: "₹895" }
    ],
    "₹2000+": [
      { name: "Kérastase Stimuliste Hair Serum", type: "Scalp Serum", price: "₹4,800" },
      { name: "Moroccanoil Treatment Original", type: "Hair Treatment", price: "₹3,499" }
    ]
  },
  "Dandruff": {
    "Under ₹300": [
      { name: "Nizoral Anti-Dandruff Shampoo", type: "Shampoo", price: "₹299" },
      { name: "Head & Shoulders Smooth & Silky", type: "Shampoo", price: "₹250" }
    ],
    "₹300–₹800": [
      { name: "Tresemmé Scalp Care Anti Dandruff", type: "Shampoo", price: "₹399" },
      { name: "Forest Essentials Ayurvedic Neem Hair Oil", type: "Hair Oil", price: "₹695" }
    ],
    "₹800–₹2000": [
      { name: "Kama Ayurveda Bringadi Intensive Hair Treatment", type: "Hair Oil", price: "₹1,595" },
      { name: "Minimalist Salicylic Acid Scalp Serum", type: "Scalp Serum", price: "₹999" }
    ],
    "₹2000+": [
      { name: "Kérastase Symbiose Moisturising Shampoo", type: "Shampoo", price: "₹3,750" },
      { name: "Philip Kingsley Flaky Itchy Scalp Shampoo", type: "Shampoo", price: "₹2,800" }
    ]
  }
};

const DEFAULT_PRODUCTS = {
  "Under ₹300": [
    { name: "Lotus Herbals SPF 40 Sunscreen", type: "Sunscreen", price: "₹285" },
    { name: "Neutrogena Ultra Sheer Body Lotion", type: "Body Lotion", price: "₹299" }
  ],
  "₹300–₹800": [
    { name: "Minimalist Hyaluronic Acid 2% Serum", type: "Serum", price: "₹499" },
    { name: "Simple Kind to Skin Micellar Water", type: "Toner/Cleanser", price: "₹349" }
  ],
  "₹800–₹2000": [
    { name: "Plum E-Luminence Deep Moisturising Lotion", type: "Body Lotion", price: "₹995" },
    { name: "WOW Apple Cider Vinegar Foaming Face Wash", type: "Face Wash", price: "₹850" }
  ],
  "₹2000+": [
    { name: "Forest Essentials Soundarya Radiance Serum", type: "Serum", price: "₹3,895" },
    { name: "Kama Ayurveda Rose Water Toner", type: "Toner", price: "₹2,200" }
  ]
};

const SERIOUS_CONDITIONS = ["Hair Loss", "Thinning", "Pigmentation", "Anti-Ageing"];

const COMMUNITY_POSTS_INIT = [
  { id: 1, user: "Priya M.", avatar: "PM", concern: "Pigmentation", text: "Been using raw kesar in milk for 3 months and my melasma has actually lightened! Anyone else tried this?", likes: 24, time: "2h ago", replies: [] },
  { id: 2, user: "Ananya K.", avatar: "AK", concern: "Hair Loss", text: "Onion juice + castor oil combo CHANGED my life. Regrowth visible in 6 weeks. Trust the process 🌿", likes: 41, time: "5h ago", replies: [] },
  { id: 3, user: "Ritika S.", avatar: "RS", concern: "Acne / Zits", text: "Switching to Minimalist Salicylic Acid cleared 80% of my congestion. Pair it with neem face wash!", likes: 18, time: "1d ago", replies: [] },
  { id: 4, user: "Divya T.", avatar: "DT", concern: "Tanning", text: "Besan + haldi + rose water every Sunday! My tan lightened in 2 weeks. Dadi's recipe never fails 💛", likes: 33, time: "2d ago", replies: [] }
];

const PETAL_POS = [
  { top: "5%", left: "3%", size: 22, rotate: 15, opacity: 0.18 },
  { top: "8%", right: "5%", size: 18, rotate: -20, opacity: 0.14 },
  { top: "30%", left: "1%", size: 16, rotate: 35, opacity: 0.12 },
  { top: "60%", right: "2%", size: 20, rotate: -10, opacity: 0.16 },
  { top: "80%", left: "4%", size: 14, rotate: 50, opacity: 0.1 },
  { top: "90%", right: "6%", size: 17, rotate: -40, opacity: 0.13 }
];

export default function GlowSanctuary() {
  const [page, setPage] = useState("home");
  const [skinType, setSkinType] = useState("");
  const [skinConcerns, setSkinConcerns] = useState([]);
  const [hairConcerns, setHairConcerns] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [priceRange, setPriceRange] = useState("₹300–₹800");
  const [profileDone, setProfileDone] = useState(false);
  const [activeTab, setActiveTab] = useState("skin");
  const [communityPosts, setCommunityPosts] = useState(COMMUNITY_POSTS_INIT);
  const [newPost, setNewPost] = useState("");
  const [newPostConcern, setNewPostConcern] = useState("General");
  const [replyText, setReplyText] = useState({});
  const [showReplyFor, setShowReplyFor] = useState(null);
  const [userName, setUserName] = useState("");
  const [nameEntered, setNameEntered] = useState(false);
  const [floatAnim, setFloatAnim] = useState(0);
  const animRef = useRef();

  useEffect(() => {
    let t = 0;
    const run = () => { t += 0.02; setFloatAnim(Math.sin(t) * 6); animRef.current = requestAnimationFrame(run); };
    animRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const allConcerns = [...skinConcerns, ...hairConcerns];
  const isSevere = allConcerns.some(c => SERIOUS_CONDITIONS.includes(c)) && allConcerns.length >= 3;

  const toggleArr = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  const getProducts = (concern) => (PRODUCTS[concern] || DEFAULT_PRODUCTS)[priceRange] || [];

  const handlePost = () => {
    if (!newPost.trim()) return;
    const initials = nameEntered ? userName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2) : "ME";
    setCommunityPosts([{ id: Date.now(), user: nameEntered ? userName : "You", avatar: initials, concern: newPostConcern, text: newPost, likes: 0, time: "just now", replies: [] }, ...communityPosts]);
    setNewPost("");
  };

  const handleReply = (postId) => {
    if (!replyText[postId]?.trim()) return;
    setCommunityPosts(communityPosts.map(p => p.id === postId ? { ...p, replies: [...p.replies, { user: nameEntered ? userName : "You", text: replyText[postId], time: "just now" }] } : p));
    setReplyText({ ...replyText, [postId]: "" });
    setShowReplyFor(null);
  };

  const PINK = "#F7CACA";
  const ROSE = "#E8729A";
  const GOLD = "#C9972A";
  const CREAM = "#FDF6EE";
  const PEACH = "#F9DDD0";
  const MAUVE = "#B57CA0";

  const styles = {
    root: { fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: `linear-gradient(160deg, ${CREAM} 0%, #FFF0F5 50%, #FDF6EE 100%)`, minHeight: "100vh", position: "relative", overflow: "hidden" },
    petal: (p) => ({ position: "fixed", fontSize: p.size, opacity: p.opacity, transform: `rotate(${p.rotate}deg)`, pointerEvents: "none", zIndex: 0, ...({ top: p.top, left: p.left, right: p.right, bottom: p.bottom }) }),
    nav: { background: "rgba(253,246,238,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${PINK}`, padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
    logo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: ROSE, letterSpacing: "0.04em", cursor: "pointer" },
    logoSub: { fontSize: 11, color: MAUVE, letterSpacing: "0.18em", display: "block", fontWeight: 400, textTransform: "uppercase", marginTop: -4 },
    navLinks: { display: "flex", gap: 28 },
    navBtn: (active) => ({ background: "none", border: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: active ? ROSE : "#8B5A6A", fontWeight: active ? 700 : 400, cursor: "pointer", letterSpacing: "0.04em", borderBottom: active ? `2px solid ${ROSE}` : "2px solid transparent", paddingBottom: 2, transition: "all 0.2s" }),
    hero: { textAlign: "center", padding: "80px 20px 60px", position: "relative", zIndex: 1 },
    heroTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 62, fontWeight: 700, color: "#3D1A2C", lineHeight: 1.15, margin: 0 },
    heroSub: { fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: MAUVE, fontWeight: 400, marginTop: 12, letterSpacing: "0.03em" },
    heroCta: { marginTop: 36, display: "flex", gap: 16, justifyContent: "center" },
    btnPrimary: { background: `linear-gradient(135deg, ${ROSE} 0%, #C06090 100%)`, color: "#fff", border: "none", borderRadius: 40, padding: "14px 36px", fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", boxShadow: "0 4px 20px rgba(200,100,140,0.3)", transition: "transform 0.15s, box-shadow 0.15s" },
    btnSecondary: { background: "transparent", color: ROSE, border: `1.5px solid ${ROSE}`, borderRadius: 40, padding: "13px 32px", fontFamily: "'Cormorant Garamond', serif", fontSize: 17, cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.2s" },
    card: { background: "rgba(255,255,255,0.82)", backdropFilter: "blur(8px)", border: `1px solid ${PINK}`, borderRadius: 24, padding: "28px 32px", marginBottom: 24 },
    sectionTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: "#3D1A2C", marginBottom: 6, letterSpacing: "0.02em" },
    sectionSub: { fontSize: 15, color: MAUVE, marginBottom: 24, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" },
    chipGroup: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 },
    chip: (sel) => ({ background: sel ? `linear-gradient(135deg, ${ROSE}, #C06090)` : "rgba(255,255,255,0.9)", color: sel ? "#fff" : "#7A3D5C", border: `1.5px solid ${sel ? ROSE : PINK}`, borderRadius: 30, padding: "8px 20px", fontSize: 14, fontFamily: "'Cormorant Garamond', serif", cursor: "pointer", fontWeight: sel ? 700 : 400, letterSpacing: "0.03em", transition: "all 0.15s" }),
    label: { fontSize: 13, color: MAUVE, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, display: "block", fontFamily: "'Cormorant Garamond', serif" },
    divider: { border: "none", borderTop: `1px solid ${PINK}`, margin: "24px 0" },
    remedyCard: { background: `linear-gradient(135deg, #FFF7F2 0%, #FFF0F8 100%)`, border: `1px solid ${PINK}`, borderRadius: 20, padding: "22px 26px", marginBottom: 16 },
    productCard: { background: "rgba(255,255,255,0.9)", border: `1px solid ${PINK}`, borderRadius: 16, padding: "16px 20px", marginBottom: 12 },
    productName: { fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#3D1A2C" },
    productType: { fontSize: 12, color: MAUVE, letterSpacing: "0.08em", textTransform: "uppercase" },
    productPrice: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: GOLD, marginTop: 4 },
    warningBox: { background: "#FFF0E5", border: `1.5px solid #F0A070`, borderRadius: 16, padding: "20px 24px", marginTop: 20, marginBottom: 20 },
    communityCard: { background: "rgba(255,255,255,0.86)", border: `1px solid ${PINK}`, borderRadius: 20, padding: "20px 24px", marginBottom: 16 },
    avatarCircle: { width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${ROSE}, ${MAUVE})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0 },
    tag: { background: PEACH, color: "#9B3D6A", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" },
    textarea: { width: "100%", border: `1px solid ${PINK}`, borderRadius: 14, padding: "12px 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#3D1A2C", background: "rgba(255,255,255,0.9)", resize: "vertical", minHeight: 80, outline: "none", boxSizing: "border-box" },
    input: { border: `1px solid ${PINK}`, borderRadius: 14, padding: "10px 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#3D1A2C", background: "rgba(255,255,255,0.9)", outline: "none" },
    select: { border: `1px solid ${PINK}`, borderRadius: 14, padding: "9px 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#3D1A2C", background: "rgba(255,255,255,0.9)", outline: "none", cursor: "pointer" },
    tabRow: { display: "flex", gap: 0, background: PEACH, borderRadius: 40, padding: 4, marginBottom: 28, width: "fit-content" },
    tab: (a) => ({ background: a ? "#fff" : "transparent", color: a ? ROSE : "#8B5A6A", border: "none", borderRadius: 36, padding: "10px 28px", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: a ? 700 : 400, cursor: "pointer", transition: "all 0.2s", boxShadow: a ? "0 2px 10px rgba(200,100,140,0.15)" : "none" }),
    floatOrb: (n) => ({ position: "fixed", borderRadius: "50%", pointerEvents: "none", zIndex: 0, opacity: 0.07, background: ROSE, [n === 1 ? "top" : "bottom"]: n === 1 ? "20%" : "10%", [n === 1 ? "right" : "left"]: n === 1 ? "-80px" : "-60px", width: n === 1 ? 300 : 220, height: n === 1 ? 300 : 220 })
  };

  const Petals = () => PETAL_POS.map((p, i) => <div key={i} style={styles.petal(p)}>🌸</div>);

  const HomeHero = () => (
    <div style={styles.hero}>
      <div style={{ fontSize: 18, color: MAUVE, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>✦ Your Skin. Your Story. Your Ritual. ✦</div>
      <h1 style={styles.heroTitle}>
        Glow from the<br />
        <span style={{ color: ROSE }}>inside out</span> 🌹
      </h1>
      <p style={styles.heroSub}>Personalised skincare & haircare inspired by ancient Indian wisdom<br />& modern dermatology — crafted just for you.</p>
      <div style={styles.heroCta}>
        <button style={styles.btnPrimary} onClick={() => setPage("profile")}>Begin Your Ritual ✨</button>
        <button style={styles.btnSecondary} onClick={() => setPage("community")}>Join the Glow Circle 🌸</button>
      </div>
      <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
        {[["🌿", "100% Natural Remedies"], ["💎", "Luxury Product Picks"], ["🌸", "Skin & Hair Both"], ["💬", "Community Glow Space"]].map(([icon, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: MAUVE, letterSpacing: "0.08em" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1 }}>
      <div style={styles.card}>
        <div style={styles.sectionTitle}>✨ Your Beauty Profile</div>
        <div style={styles.sectionSub}>Tell us about yourself so we can craft your personalised ritual</div>
        <hr style={styles.divider} />
        <label style={styles.label}>Your Name</label>
        <input style={{ ...styles.input, width: "100%", boxSizing: "border-box", marginBottom: 24 }} placeholder="e.g. Priya Sharma" value={userName} onChange={e => { setUserName(e.target.value); setNameEntered(!!e.target.value.trim()); }} />
        <label style={styles.label}>Skin Type</label>
        <div style={styles.chipGroup}>{SKIN_TYPES.map(s => <button key={s} style={styles.chip(skinType === s)} onClick={() => setSkinType(s)}>{s}</button>)}</div>
        <label style={styles.label}>Skin Concerns (pick all that apply)</label>
        <div style={styles.chipGroup}>{CONCERNS_SKIN.map(c => <button key={c} style={styles.chip(skinConcerns.includes(c))} onClick={() => toggleArr(skinConcerns, setSkinConcerns, c)}>{c}</button>)}</div>
        <label style={styles.label}>Hair Concerns (pick all that apply)</label>
        <div style={styles.chipGroup}>{CONCERNS_HAIR.map(c => <button key={c} style={styles.chip(hairConcerns.includes(c))} onClick={() => toggleArr(hairConcerns, setHairConcerns, c)}>{c}</button>)}</div>
        <label style={styles.label}>Chemical Allergies / Sensitivities</label>
        <div style={styles.chipGroup}>{ALLERGIES.map(a => <button key={a} style={styles.chip(allergies.includes(a))} onClick={() => toggleArr(allergies, setAllergies, a)}>{a}</button>)}</div>
        <label style={styles.label}>Budget Preference</label>
        <div style={styles.chipGroup}>{PRICE_RANGES.map(r => <button key={r} style={styles.chip(priceRange === r)} onClick={() => setPriceRange(r)}>{r}</button>)}</div>
        <button style={{ ...styles.btnPrimary, marginTop: 12, width: "100%" }} onClick={() => { setProfileDone(true); setPage("rituals"); }}>
          Reveal My Ritual 🌹
        </button>
      </div>
    </div>
  );

  const RitualPage = () => {
    const allCons = [...skinConcerns, ...hairConcerns];
    return (
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1 }}>
        {nameEntered && <div style={{ ...styles.sectionTitle, marginBottom: 4 }}>Welcome, {userName} 🌸</div>}
        <div style={{ ...styles.sectionTitle, color: ROSE }}>Your Personal Ritual</div>
        <div style={styles.sectionSub}>Curated just for {skinType || "your"} skin · Budget: {priceRange}</div>
        {allergies.length > 0 && (
          <div style={{ ...styles.warningBox, background: "#FFF5F5", border: `1.5px solid #F0A0A0` }}>
            <b style={{ color: "#C03050" }}>⚠ Allergy Note:</b> <span style={{ color: "#7A2040", fontSize: 14 }}>Based on your profile, avoid products containing: <b>{allergies.join(", ")}</b>. Always patch test before use.</span>
          </div>
        )}
        {isSevere && (
          <div style={styles.warningBox}>
            <b style={{ color: "#C06020" }}>🩺 Professional Consultation Recommended</b>
            <p style={{ color: "#7A4020", fontSize: 14, marginTop: 8 }}>With multiple concerns including {allCons.filter(c => SERIOUS_CONDITIONS.includes(c)).join(", ")}, we recommend consulting a <b>Dermatologist</b> (skin) and/or <b>Trichologist</b> (hair). Our suggestions are complementary, not medical advice.</p>
          </div>
        )}
        <div style={styles.tabRow}>
          <button style={styles.tab(activeTab === "skin")} onClick={() => setActiveTab("skin")}>🌿 Skin Rituals</button>
          <button style={styles.tab(activeTab === "hair")} onClick={() => setActiveTab("hair")}>💫 Hair Rituals</button>
          <button style={styles.tab(activeTab === "products")} onClick={() => setActiveTab("products")}>💄 Products</button>
        </div>

        {activeTab === "skin" && (
          skinConcerns.length === 0 ? <div style={{ color: MAUVE, fontStyle: "italic", textAlign: "center", padding: 40 }}>Go back and select your skin concerns to see rituals 🌸</div> :
          skinConcerns.map(concern => {
            const r = TRADITIONAL_REMEDIES[concern];
            return r ? (
              <div key={concern} style={styles.remedyCard}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700, color: "#3D1A2C" }}>{concern}</div>
                    <div style={{ fontSize: 15, color: ROSE, fontStyle: "italic" }}>{r.remedy}</div>
                  </div>
                </div>
                <ol style={{ margin: 0, paddingLeft: 20 }}>{r.steps.map((s, i) => <li key={i} style={{ fontSize: 14, color: "#6A3050", marginBottom: 6, lineHeight: 1.6 }}>{s}</li>)}</ol>
                {["Pigmentation", "Anti-Ageing"].includes(concern) && (
                  <div style={{ marginTop: 10, fontSize: 12, color: "#C06090", fontStyle: "italic" }}>💡 Consistent use for 4–6 weeks shows best results. Severe cases → Dermatologist.</div>
                )}
              </div>
            ) : null;
          })
        )}

        {activeTab === "hair" && (
          hairConcerns.length === 0 ? <div style={{ color: MAUVE, fontStyle: "italic", textAlign: "center", padding: 40 }}>Go back and select your hair concerns to see rituals 💫</div> :
          hairConcerns.map(concern => {
            const r = TRADITIONAL_REMEDIES[concern];
            return r ? (
              <div key={concern} style={styles.remedyCard}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700, color: "#3D1A2C" }}>{concern}</div>
                    <div style={{ fontSize: 15, color: ROSE, fontStyle: "italic" }}>{r.remedy}</div>
                  </div>
                </div>
                <ol style={{ margin: 0, paddingLeft: 20 }}>{r.steps.map((s, i) => <li key={i} style={{ fontSize: 14, color: "#6A3050", marginBottom: 6, lineHeight: 1.6 }}>{s}</li>)}</ol>
                {["Hair Loss", "Thinning"].includes(concern) && (
                  <div style={{ marginTop: 10, fontSize: 12, color: "#C06090", fontStyle: "italic" }}>⚠ Persistent or worsening hair loss? Please consult a <b>Trichologist</b>.</div>
                )}
              </div>
            ) : null;
          })
        )}

        {activeTab === "products" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={styles.label}>Price Range</label>
              <div style={styles.chipGroup}>{PRICE_RANGES.map(r => <button key={r} style={styles.chip(priceRange === r)} onClick={() => setPriceRange(r)}>{r}</button>)}</div>
            </div>
            {allCons.length === 0 ? <div style={{ color: MAUVE, fontStyle: "italic", textAlign: "center", padding: 40 }}>Select concerns in your profile to see product recommendations 💄</div> :
              allCons.map(concern => {
                const prods = getProducts(concern);
                return (
                  <div key={concern} style={{ marginBottom: 28 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "#3D1A2C", marginBottom: 10 }}>For {concern}</div>
                    {prods.map((p, i) => (
                      <div key={i} style={styles.productCard}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={styles.productName}>{p.name}</div>
                            <div style={styles.productType}>{p.type}</div>
                          </div>
                          <div style={styles.productPrice}>{p.price}</div>
                        </div>
                        {allergies.some(a => p.name.toLowerCase().includes(a.toLowerCase()) || p.type.toLowerCase().includes(a.toLowerCase())) && (
                          <div style={{ fontSize: 11, color: "#C03050", marginTop: 6 }}>⚠ Check ingredients for your allergy profile</div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })
            }
          </div>
        )}
      </div>
    );
  };

  const CommunityPage = () => (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1 }}>
      <div style={styles.sectionTitle}>🌸 Glow Circle</div>
      <div style={styles.sectionSub}>Share your journey, tips & wins with fellow glow-getters</div>
      <div style={styles.card}>
        <label style={styles.label}>Share Something Beautiful</label>
        <textarea style={styles.textarea} placeholder="Share a tip, ask a question, or celebrate your skin win..." value={newPost} onChange={e => setNewPost(e.target.value)} />
        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
          <select style={styles.select} value={newPostConcern} onChange={e => setNewPostConcern(e.target.value)}>
            <option>General</option>
            {[...CONCERNS_SKIN, ...CONCERNS_HAIR].map(c => <option key={c}>{c}</option>)}
          </select>
          <button style={styles.btnPrimary} onClick={handlePost}>Post to Circle ✨</button>
        </div>
      </div>
      {communityPosts.map(post => (
        <div key={post.id} style={styles.communityCard}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={styles.avatarCircle}>{post.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#3D1A2C", fontSize: 15 }}>{post.user}</span>
                <span style={styles.tag}>{post.concern}</span>
                <span style={{ fontSize: 12, color: MAUVE, marginLeft: "auto" }}>{post.time}</span>
              </div>
              <p style={{ margin: "0 0 12px", color: "#5A2A40", fontSize: 15, lineHeight: 1.7 }}>{post.text}</p>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <button style={{ ...styles.btnSecondary, padding: "6px 16px", fontSize: 13 }} onClick={() => setCommunityPosts(communityPosts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))}>
                  🌸 {post.likes}
                </button>
                <button style={{ background: "none", border: "none", color: MAUVE, fontFamily: "'Cormorant Garamond', serif", fontSize: 14, cursor: "pointer" }} onClick={() => setShowReplyFor(showReplyFor === post.id ? null : post.id)}>
                  💬 Reply
                </button>
              </div>
              {post.replies.length > 0 && (
                <div style={{ marginTop: 12, paddingLeft: 16, borderLeft: `2px solid ${PINK}` }}>
                  {post.replies.map((r, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: ROSE }}>{r.user}</span>
                      <span style={{ fontSize: 13, color: "#5A2A40", marginLeft: 8 }}>{r.text}</span>
                      <span style={{ fontSize: 11, color: MAUVE, marginLeft: 8 }}>{r.time}</span>
                    </div>
                  ))}
                </div>
              )}
              {showReplyFor === post.id && (
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <input style={{ ...styles.input, flex: 1 }} placeholder="Write a reply..." value={replyText[post.id] || ""} onChange={e => setReplyText({ ...replyText, [post.id]: e.target.value })} onKeyDown={e => e.key === "Enter" && handleReply(post.id)} />
                  <button style={styles.btnPrimary} onClick={() => handleReply(post.id)}>Send</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const AboutPage = () => (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 20px", position: "relative", zIndex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 52, marginBottom: 20 }}>🌹</div>
      <div style={styles.sectionTitle}>About Glow Sanctuary</div>
      <p style={{ color: "#6A3050", lineHeight: 1.9, fontSize: 17, fontFamily: "'Cormorant Garamond', serif" }}>
        Glow Sanctuary is a space born from love — for your skin, your hair, and yourself. Rooted in centuries of Indian herbal wisdom passed down through dadis and nanis, and enriched by modern skincare science, we believe every woman deserves to know her own glow.
      </p>
      <p style={{ color: "#6A3050", lineHeight: 1.9, fontSize: 17, fontFamily: "'Cormorant Garamond', serif" }}>
        We are not a replacement for medical care. For persistent or worsening conditions, we always recommend consulting a certified <b>Dermatologist</b> or <b>Trichologist</b>.
      </p>
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 20 }}>
        <button style={styles.btnPrimary} onClick={() => setPage("profile")}>Start My Ritual ✨</button>
        <button style={styles.btnSecondary} onClick={() => setPage("community")}>Join the Circle 🌸</button>
      </div>
    </div>
  );

  return (
    <div style={styles.root}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <Petals />
      <div style={styles.floatOrb(1)} />
      <div style={styles.floatOrb(2)} />
      <nav style={styles.nav}>
        <div style={{ cursor: "pointer" }} onClick={() => setPage("home")}>
          <span style={styles.logo}>🌹 Glow Sanctuary</span>
          <span style={styles.logoSub}>skin · hair · soul</span>
        </div>
        <div style={styles.navLinks}>
          {[["home", "Home"], ["profile", "My Profile"], ["rituals", "Rituals"], ["community", "Glow Circle"], ["about", "About"]].map(([p, l]) => (
            <button key={p} style={styles.navBtn(page === p)} onClick={() => setPage(p)}>{l}</button>
          ))}
        </div>
      </nav>
      <main>
        {page === "home" && <HomeHero />}
        {page === "profile" && <ProfilePage />}
        {page === "rituals" && (profileDone ? <RitualPage /> : <div style={{ textAlign: "center", padding: 60, color: MAUVE, fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>Please <button style={{ ...styles.btnSecondary, display: "inline" }} onClick={() => setPage("profile")}>complete your profile</button> first 🌸</div>)}
        {page === "community" && <CommunityPage />}
        {page === "about" && <AboutPage />}
      </main>
      <footer style={{ textAlign: "center", padding: "40px 20px", color: MAUVE, fontSize: 13, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.06em", borderTop: `1px solid ${PINK}`, position: "relative", zIndex: 1 }}>
        🌸 Glow Sanctuary — Made with love for every woman's ritual &nbsp;·&nbsp; Not a substitute for medical advice
      </footer>
    </div>
  );
}