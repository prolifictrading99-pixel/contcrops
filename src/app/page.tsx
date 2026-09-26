"use client";

import React, { useState, useMemo, useEffect } from "react";

// FINAL STABLE - WITH REPORT & BLOCK SYSTEM
export default function App() {
  // --- ALL STATES AT TOP ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [fbModalOpen, setFbModalOpen] = useState(false);
  const [fbEmail, setFbEmail] = useState("ahmed.hassan@example.com");
  const [fbPass, setFbPass] = useState("••••••••");
  const [quickLoginId, setQuickLoginId] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [viewedProfile, setViewedProfile] = useState<any>(null);
  // --- EDIT PROFILE STATES ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>({
    name: "",
    username: "",
    letter: "",
    color: "#2e7d32",
    bio: "",
    location: "البحيرة",
    role: "مزارع",
    type: "مزارع",
    phone: "",
    link: "",
    emoji: "",
  });
  const AVATAR_COLORS = ["#2e7d32", "#0a7d2e", "#1b5e20", "#d97706", "#1f2937", "#7c3aed", "#db2777", "#0ea5e9", "#ea580c", "#4338ca", "#065f46", "#991b1b"];
  const LOCATION_OPTIONS = ["البحيرة", "الإسماعيلية", "المنيا", "الشرقية", "كفر الشيخ", "الدقهلية", "القليوبية", "البحيرة", "الغربية", "أسيوط", "سوق العبور"];
  const ROLE_OPTIONS = ["مزارع", "تاجر", "سمسار", "مورد", "مزرعة"];
  const AVATAR_EMOJIS = ["🍅", "🥭", "🥔", "🍓", "🧅", "🍊", "🌱", "🚜", "👨‍🌾", "🌿", "☀️", "💧"];
  const [activeTab, setActiveTab] = useState<"souq" | "thread" | "prices" | "messages" | "profile">("souq");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newThreadText, setNewThreadText] = useState("");
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [newMarket, setNewMarket] = useState({ cropType: "طماطم", variety: "", quantity: "", price: "", caption: "", location: "البحيرة", emoji: "🍅" });
  const [activeCropFilter, setActiveCropFilter] = useState("الكل");
  const [sortBy, setSortBy] = useState("الأحدث");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [newCommentTexts, setNewCommentTexts] = useState<Record<string,string>>({});
  const [sharePost, setSharePost] = useState<any>(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"default" | "success">("default");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const FILTER_CHIPS = ["الكل", "طماطم", "بطاطس", "مانجو", "فراولة", "بصل", "برتقال", "البحيرة", "الإسماعيلية", "المنيا"];
  const [profileTab, setProfileTab] = useState<"posts" | "reposts" | "threads" | "saved">("posts");
  const [profileViewMode, setProfileViewMode] = useState<"grid" | "list">("grid");
  const [profilePostModal, setProfilePostModal] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifFilter, setNotifFilter] = useState("الكل");
  const [bellBounce, setBellBounce] = useState(false);
  const STORY_BG_OPTIONS = [
    "from-green-600 to-emerald-400",
    "from-orange-500 to-red-500",
    "from-purple-600 to-indigo-600",
    "from-yellow-500 to-amber-600",
    "from-sky-600 to-blue-600",
    "from-pink-600 to-rose-500",
    "from-lime-600 to-green-400",
    "from-zinc-800 to-zinc-600",
  ];
  const STORY_EMOJIS = ["🍅", "🥭", "🥔", "🍓", "🧅", "🍊", "🌱", "🚜", "☀️", "💧", "📦", "🔥"];
  const INITIAL_STORY_USERS = [
    { id: "su1", user: null as any, hasUnseen: true, stories: [{ id: "s1-1", emoji: "🍅", caption: "حصاد اليوم من مزرعة البحيرة - 2 طن طماطم 023 جاهزة للبيع 🔥", time: "منذ 15 د", bg: "from-green-600 to-emerald-400" }, { id: "s1-2", emoji: "🚜", caption: "الفرز شغال طول اليوم - جودة فرز أول", time: "منذ 10 د", bg: "from-orange-500 to-red-500" }] },
    { id: "su2", user: null as any, hasUnseen: true, stories: [{ id: "s2-1", emoji: "🥭", caption: "مانجو عويسي تصدير وصلت للتلاجة - آخر كمية الموسم", time: "منذ 1 س", bg: "from-yellow-500 to-amber-600" }] },
    { id: "su3", user: null as any, hasUnseen: true, stories: [{ id: "s3-1", emoji: "💬", caption: "الأسعار اليوم ولعت في العبور - الطماطم 8.5ج", time: "منذ 2 س", bg: "from-sky-600 to-blue-600" }, { id: "s3-2", emoji: "📦", caption: "عندي كراتين تصدير فاخرة - خصم 15% للمتابعين", time: "منذ 1 س", bg: "from-zinc-800 to-zinc-600" }, { id: "s3-3", emoji: "🧅", caption: "بصل أحمر 7 طن في المنيا - سعر ممتاز للجملة", time: "منذ 30 د", bg: "from-purple-600 to-indigo-600" }] },
    { id: "su4", user: null as any, hasUnseen: false, stories: [{ id: "s4-1", emoji: "🥔", caption: "بطاطس اسبونتا تحمير ناشفة - تخزين 3 شهور", time: "منذ 5 س", bg: "from-lime-600 to-green-400" }] },
  ];
  const [storyUsers, setStoryUsers] = useState<any[]>(() => []);
  const [myStories, setMyStories] = useState<any[]>([]);
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [activeStoryUserIdx, setActiveStoryUserIdx] = useState(0);
  const [activeStoryItemIdx, setActiveStoryItemIdx] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyPaused, setStoryPaused] = useState(false);
  const [storyReply, setStoryReply] = useState("");
  const [showStoryCreate, setShowStoryCreate] = useState(false);
  const [newStoryCaption, setNewStoryCaption] = useState("");
  const [newStoryEmoji, setNewStoryEmoji] = useState("🍅");
  const [newStoryBg, setNewStoryBg] = useState("from-green-600 to-emerald-400");
  // --- REPORT & BLOCK STATES ---
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [reportedPosts, setReportedPosts] = useState<string[]>([]);
  const [hiddenPosts, setHiddenPosts] = useState<string[]>([]);
  const [showReportModal, setShowReportModal] = useState<any>(null);
  const [showBlockModal, setShowBlockModal] = useState<any>(null);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [activePostMenu, setActivePostMenu] = useState<string | null>(null);
  const [activeCommentMenu, setActiveCommentMenu] = useState<string | null>(null);
  const [blockDeleteComments, setBlockDeleteComments] = useState(false);
  const [storyMoreMenu, setStoryMoreMenu] = useState(false);
  const [commentReportTarget, setCommentReportTarget] = useState<any>(null);
  const REPORT_REASONS = [
    { id: "fraud", label: "احتيال أو خداع", icon: "💰" },
    { id: "abuse", label: "محتوى غير لائق أو مسيء", icon: "😡" },
    { id: "spam", label: "بريد عشوائي أو مكرر", icon: "📢" },
    { id: "falseprice", label: "معلومات خاطئة عن الأسعار", icon: "📉" },
    { id: "impersonation", label: "انتحال شخصية", icon: "👤" },
    { id: "offtopic", label: "محتوى غير متعلق بالزراعة", icon: "🌱" },
    { id: "other", label: "أخرى", icon: "⋯" },
  ];

  const CROP_BG: any = {
    "طماطم": "bg-gradient-to-br from-red-50 to-orange-50 border-red-100",
    "مانجو": "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100",
    "بطاطس": "bg-gradient-to-br from-stone-50 to-orange-50 border-stone-200",
    "فراولة": "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100",
    "بصل": "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100",
    "برتقال": "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100",
  };
  const CROP_BG_SIMPLE: any = {
    "طماطم": "bg-red-50",
    "مانجو": "bg-yellow-50",
    "بطاطس": "bg-stone-50",
    "فراولة": "bg-rose-50",
    "بصل": "bg-purple-50",
    "برتقال": "bg-orange-50",
  };

  // Quick users - colored div avatars
  const QUICK_USERS = [
    { id: "1", name: "الحاج سعيد", username: "h_saeed", role: "مزارع طماطم", letter: "ح", color: "#2e7d32", location: "البحيرة", bio: "مزارع طماطم من 20 سنة - جودة عالية وأسعار جملة", rating: 4.9, followers: 1240, following: 210, type: "مزارع", phone: "01001234567", link: "", emoji: "" },
    { id: "2", name: "مزرعة الواحة", username: "waha_farm", role: "مزرعة مانجو", letter: "و", color: "#0a7d2e", location: "الإسماعيلية", bio: "مانجو عويسي وزبدية تصدير للخليج - جودة تصديرية", rating: 4.8, followers: 3420, following: 120, type: "مزرعة", phone: "01099887766", link: "waha-mango.com", emoji: "" },
    { id: "3", name: "أبو علي السمسار", username: "abou_ali", role: "سمسار خضار", letter: "ع", color: "#1f2937", location: "سوق العبور", bio: "سمسار خضار وفاكهة - توريد يومي لجميع المحافظات", rating: 4.6, followers: 5600, following: 340, type: "سمسار", phone: "01122334455", link: "", emoji: "" },
    { id: "4", name: "أبو كريم", username: "abou_kareem", role: "مزارع متنوع", letter: "ك", color: "#d97706", location: "المنيا", bio: "بطاطس وبصل وثوم - تخزين وتصدير", rating: 4.7, followers: 890, following: 95, type: "مزارع", phone: "01233445566", link: "", emoji: "" },
  ];

  const INITIAL_NOTIFICATIONS = [
    { id: "n1", type: "like", user: { id: "1", name: "الحاج سعيد", letter: "ح", color: "#2e7d32" }, text: "أعجب بمنشورك عن الطماطم 023 🍅", time: "منذ دقيقتين", postPreview: "🍅", isRead: false },
    { id: "n2", type: "comment", user: { id: "4", name: "أبو كريم", letter: "ك", color: "#d97706" }, text: "علق: كام السعر نهائي للطن توريد عبور؟", time: "منذ 5 د", postPreview: "🍅", isRead: false },
    { id: "n3", type: "share", user: { id: "2", name: "مزرعة الواحة", letter: "و", color: "#0a7d2e" }, text: "شاركت منشورك إلى بروفايلها", time: "منذ 15 د", postPreview: "🥭", isRead: false },
    { id: "n4", type: "price", user: { id: "3", name: "أبو علي السمسار", letter: "ع", color: "#1f2937" }, text: "سعر الطماطم ارتفع 15% في البحيرة - وصل 8.5ج", time: "منذ 30 د", postPreview: "📈", isRead: false },
    { id: "n5", type: "follow", user: { id: "5", name: "مزارع المنيا", letter: "م", color: "#7c3aed", location: "المنيا" }, text: "بدأ بمتابعتك", time: "منذ ساعة", postPreview: "👤", isRead: true },
    { id: "n6", type: "story", user: { id: "1", name: "الحاج سعيد", letter: "ح", color: "#2e7d32" }, text: "أضاف حالة جديدة - حصاد اليوم 🔥", time: "منذ ساعتين", postPreview: "⭕", isRead: false },
    { id: "n7", type: "like", user: { id: "3", name: "أبو علي السمسار", letter: "ع", color: "#1f2937" }, text: "أعجب بمنشورك عن البطاطس", time: "منذ 3 س", postPreview: "🥔", isRead: true },
    { id: "n8", type: "comment", user: { id: "2", name: "مزرعة الواحة", letter: "و", color: "#0a7d2e" }, text: "علق: العويسي ملك المانجو بالتوفيق 🥭", time: "منذ 5 س", postPreview: "🥭", isRead: true },
  ];
  const [notifications, setNotifications] = useState<any[]>(INITIAL_NOTIFICATIONS);

  const CROP_EMOJI: any = { "طماطم": "🍅", "مانجو": "🥭", "بطاطس": "🥔", "فراولة": "🍓", "بصل": "🧅", "برتقال": "🍊" };

  const INITIAL_POSTS = [
    { id: "p1", user: QUICK_USERS[0], cropType: "طماطم", variety: "023", quantity: "5 طن", price: 8.5, location: "البحيرة", caption: "طماطم 023 فاخرة فرز أول - جمع اليوم - متاحة للتوريد فورا لسوق العبور 🍅🔥", emoji: "🍅", likes: 124, time: "منذ ساعتين", liked: false, shareCount: 12, showComments: false, comments: [{ id: "c1", user: QUICK_USERS[2], text: "ما شاء الله الجودة باينة، كام سعر الطن توريد عبور؟", time: "منذ ساعة" }, { id: "c2", user: QUICK_USERS[3], text: "محتاج 2 طن بكرة لو متاح", time: "منذ 30 دقيقة" }] },
    { id: "p2", user: QUICK_USERS[1], cropType: "مانجو", variety: "عويسي", quantity: "2 طن", price: 35, location: "الإسماعيلية", caption: "مانجو عويسي تصدير - طعم عسل وسكري 100% - آخر كمية الموسم 🥭", emoji: "🥭", likes: 342, time: "منذ 5 ساعات", liked: false, shareCount: 28, showComments: false, comments: [{ id: "c1", user: QUICK_USERS[0], text: "العويسي ملك المانجو، بالتوفيق", time: "منذ ساعتين" }] },
    { id: "p3", user: QUICK_USERS[3], cropType: "بطاطس", variety: "اسبونتا", quantity: "10 طن", price: 9, location: "المنيا", caption: "بطاطس اسبونتا تحمير - ناشفة وتستحمل تخزين - المنيا", emoji: "🥔", likes: 89, time: "منذ 7 ساعات", liked: false, shareCount: 5, showComments: false, comments: [] },
    { id: "p4", user: QUICK_USERS[0], cropType: "طماطم", variety: "شيري", quantity: "800 كيلو", price: 15, location: "البحيرة", caption: "طماطم شيري عضوية للسلطات والفنادق - تغليف 250جرام", emoji: "🍅", likes: 210, time: "منذ يوم", liked: false, shareCount: 19, showComments: false, comments: [{ id: "c1", user: QUICK_USERS[1], text: "ممكن سعر الجملة للفنادق؟", time: "منذ 10 ساعات" }] },
    { id: "p5", user: QUICK_USERS[2], cropType: "فراولة", variety: "فرتونا", quantity: "1.5 طن", price: 22, location: "القليوبية", caption: "فراولة فرتونا تصدير - فرز أول - مطلوبة للتصدير اليوم", emoji: "🍓", likes: 156, time: "منذ يوم", liked: false, shareCount: 9, showComments: false, comments: [] },
    { id: "p6", user: QUICK_USERS[3], cropType: "بصل", variety: "أحمر", quantity: "7 طن", price: 11, location: "المنيا", caption: "بصل أحمر ناشف - يصلح للتخزين والتصدير - سعر ممتاز", emoji: "🧅", likes: 67, time: "منذ يومين", liked: false, shareCount: 3, showComments: false, comments: [] },
    { id: "p7", user: QUICK_USERS[1], cropType: "مانجو", variety: "زبدية", quantity: "3 طن", price: 18, location: "الإسماعيلية", caption: "زبدية عصير - لحم كتير وسعر مناسب لمصانع العصير", emoji: "🥭", likes: 98, time: "منذ يومين", liked: false, shareCount: 7, showComments: false, comments: [] },
    { id: "p8", user: QUICK_USERS[2], cropType: "برتقال", variety: "صيفي", quantity: "20 طن", price: 7.5, location: "البحيرة", caption: "برتقال صيفي عصير - كميات كبيرة - توريد يومي لمصانع", emoji: "🍊", likes: 112, time: "منذ 3 أيام", liked: false, shareCount: 11, showComments: false, comments: [] },
  ];

  const INITIAL_THREADS = [
    { id: "t1", user: QUICK_USERS[0], text: "نصيحة اليوم: رش الكالسيوم للطماطم في الصباح الباكر يمنع عفن الطرف الزهري 🍅\nجربته الأسبوع اللي فات والنتيجة فرق 90% - الرش يكون 2سم / لتر قبل الشمس.", time: "منذ ساعة", likes: 87, tag: "نصيحة زراعية", type: "tip", shareCount: 14, showComments: false, comments: [{ id: "tc1", user: QUICK_USERS[3], text: "فعلا جربته وممتاز، شكرا حاج سعيد", time: "منذ 40 دقيقة" }] },
    { id: "t2", user: QUICK_USERS[1], text: "سؤال للنقاش: ايه أفضل صنف مانجو للتصدير السنادي؟ عويس ولا زبدية؟ عندنا عقد تصدير للخليج 10 طن شهريا.", time: "منذ 3 ساعات", likes: 142, tag: "تصويت", type: "question", shareCount: 22, showComments: false, comments: [{ id: "tc1", user: QUICK_USERS[0], text: "عويسي طبعا للخليج، زبدية للعصير", time: "منذ ساعتين" }, { id: "tc2", user: QUICK_USERS[2], text: "زبدية مطلوبة أكتر في المصانع", time: "منذ ساعة" }] },
    { id: "t3", user: QUICK_USERS[2], text: "تحذير: موجة حرارة الخميس هتأثر على الفراولة في البحيرة والقليوبية 🔥🍓\nدرجة الحرارة هتوصل 38 - غطوا الزرع بشاش 63% واسقوا الفجر.", time: "منذ 5 ساعات", likes: 201, tag: "تحذير جوي", type: "warning", shareCount: 31, showComments: false, comments: [] },
    { id: "t4", user: QUICK_USERS[3], text: "سعر البطاطس النهاردة في سوق العبور ضرب 9.5 جنيه للاسبونتا! حد عنده تفسير؟", time: "منذ 7 ساعات", likes: 56, tag: "أسعار السوق", type: "gossip", shareCount: 6, showComments: false, comments: [] },
    { id: "t5", user: QUICK_USERS[0], text: "تجربة: زرعت طماطم شيري عضوية بدون مبيدات واستخدمت مصايد فرمونية بس، الإنتاج قل 15% لكن سعر البيع زاد 40% للفنادق.", time: "منذ 9 ساعات", likes: 94, tag: "تجربة مزارع", type: "tip", shareCount: 18, showComments: false, comments: [] },
  ];

  const PRICE_DATA = [
    { crop: "طماطم", today: 8.5, yesterday: 7.8, change: 8.97, market: "العبور" },
    { crop: "مانجو عويسي", today: 35, yesterday: 38, change: -7.89, market: "العبور" },
    { crop: "بطاطس", today: 9, yesterday: 8.5, change: 5.88, market: "المنيا" },
    { crop: "بصل", today: 11, yesterday: 10.5, change: 4.76, market: "البحيرة" },
    { crop: "فراولة", today: 22, yesterday: 20, change: 10, market: "القليوبية" },
    { crop: "برتقال", today: 7.5, yesterday: 7.2, change: 4.16, market: "العبور" },
  ];

  const [posts, setPosts] = useState(INITIAL_POSTS as any[]);
  const [threadPosts, setThreadPosts] = useState(INITIAL_THREADS as any[]);
  const [conversations, setConversations] = useState([
    { id: "c1", user: QUICK_USERS[1], lastMessage: "المانجو وصلت؟ محتاج 500 كيلو", time: "10:30 ص", unread: 2, online: true, messages: [{ id: "m1", text: "السلام عليكم، المانجو لسه متاح؟", sent: true, time: "10:20 ص" }, { id: "m2", text: "متاح 2 طن فرز أول", sent: false, time: "10:22 ص" }, { id: "m3", text: "المانجو وصلت؟ محتاج 500 كيلو", sent: false, time: "10:30 ص" }] },
    { id: "c2", user: QUICK_USERS[2], lastMessage: "تمام، هعدي عليك بكرة", time: "أمس", unread: 0, online: false, messages: [{ id: "m1", text: "في بصل أحمر؟", sent: true, time: "أمس" }, { id: "m2", text: "موجود 7 طن في المنيا", sent: false, time: "أمس" }] },
    { id: "c3", user: QUICK_USERS[3], lastMessage: "شكرا يا حاج، البطاطس ممتازة", time: "أمس", unread: 1, online: true, messages: [{ id: "m1", text: "البطاطس وصلت وجودتها ممتازة", sent: false, time: "أمس" }] },
  ]);

  // Handlers with console.log guaranteed
  const handleViewProfile = (user: any) => {
    console.log("PROFILE CLICKED", user.name);
    setViewedProfile(user);
    setActiveTab("profile");
    window.scrollTo(0, 0);
  };

  // --- COMMENTS & SHARE LOGIC ---
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // --- STORIES INIT (populate QUICK_USERS linkage) ---
  useEffect(() => {
    if (storyUsers.length === 0) {
      const mapped = INITIAL_STORY_USERS.map((su: any, idx: number) => ({
        ...su,
        user: QUICK_USERS[idx % QUICK_USERS.length],
      }));
      setStoryUsers(mapped);
    }
  }, [storyUsers.length]);

  const combinedStoryUsers = useMemo(() => {
    if (myStories.length > 0 && currentUser) {
      return [
        { id: "my", user: currentUser, hasUnseen: false, isMe: true, stories: myStories },
        ...storyUsers,
      ];
    }
    return storyUsers;
  }, [myStories, storyUsers, currentUser]);

  const filteredCombinedStoryUsers = useMemo(() => {
    return combinedStoryUsers.filter((su: any) => {
      if (su.isMe) return true;
      return !blockedUsers.includes(su.user.id);
    });
  }, [combinedStoryUsers, blockedUsers]);

  const currentStoryUser = filteredCombinedStoryUsers[activeStoryUserIdx];
  const currentStoryItem = currentStoryUser?.stories?.[activeStoryItemIdx];

  // Progress timer for story viewer
  useEffect(() => {
    if (!storyViewerOpen || storyPaused) return;
    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        const next = prev + 1.2; // ~5 sec to 100 (83 * 60ms)
        if (next >= 100) {
          // auto next
          // trigger next story logic via timeout to avoid state closure issues
          setTimeout(() => handleNextStory(), 0);
          return 0;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [storyViewerOpen, storyPaused, activeStoryUserIdx, activeStoryItemIdx]);

  const handleOpenStoryUser = (userIdx: number) => {
    console.log("open story user", userIdx);
    setActiveStoryUserIdx(userIdx);
    setActiveStoryItemIdx(0);
    setStoryProgress(0);
    setStoryViewerOpen(true);
    setStoryPaused(false);
  };

  const handleCloseStoryViewer = () => {
    console.log("close story viewer");
    // mark current user as seen when closing after viewing at least partially
    if (currentStoryUser && currentStoryUser.hasUnseen) {
      if (currentStoryUser.isMe) {
        // my story stays
      } else {
        setStoryUsers((prev) =>
          prev.map((su, idx) => {
            // combined index offset if myStories present
            const offset = myStories.length > 0 ? 1 : 0;
            const realIdx = idx;
            const combinedIdx = realIdx + offset;
            if (combinedIdx === activeStoryUserIdx) {
              return { ...su, hasUnseen: false };
            }
            return su;
          })
        );
      }
    }
    setStoryViewerOpen(false);
    setStoryProgress(0);
    setStoryPaused(false);
  };

  const handleNextStory = () => {
    if (!currentStoryUser) {
      handleCloseStoryViewer();
      return;
    }
    // if there is next item in same user
    if (activeStoryItemIdx < currentStoryUser.stories.length - 1) {
      setActiveStoryItemIdx((i) => i + 1);
      setStoryProgress(0);
      console.log("next story item", activeStoryItemIdx + 1);
    } else {
      // mark current as seen
      if (!currentStoryUser.isMe && currentStoryUser.hasUnseen) {
        setStoryUsers((prev) =>
          prev.map((su, idx) => {
            const offset = myStories.length > 0 ? 1 : 0;
            if (idx + offset === activeStoryUserIdx) return { ...su, hasUnseen: false };
            return su;
          })
        );
      }
      // next user
      if (activeStoryUserIdx < filteredCombinedStoryUsers.length - 1) {
        setActiveStoryUserIdx((i) => i + 1);
        setActiveStoryItemIdx(0);
        setStoryProgress(0);
        console.log("next story user", activeStoryUserIdx + 1);
      } else {
        handleCloseStoryViewer();
      }
    }
  };

  const handlePrevStory = () => {
    if (activeStoryItemIdx > 0) {
      setActiveStoryItemIdx((i) => i - 1);
      setStoryProgress(0);
      console.log("prev story item");
    } else if (activeStoryUserIdx > 0) {
      const prevUser = filteredCombinedStoryUsers[activeStoryUserIdx - 1];
      setActiveStoryUserIdx((i) => i - 1);
      setActiveStoryItemIdx(prevUser ? prevUser.stories.length - 1 : 0);
      setStoryProgress(0);
      console.log("prev story user");
    }
  };

  const toggleMarketComments = (id: string) => {
    console.log("toggle market comments", id);
    setPosts(prev => prev.map(p => p.id === id ? { ...p, showComments: !p.showComments } : p));
  };
  const toggleThreadComments = (id: string) => {
    console.log("toggle thread comments", id);
    setThreadPosts(prev => prev.map(p => p.id === id ? { ...p, showComments: !p.showComments } : p));
  };
  const handleAddMarketComment = (postId: string) => {
    const txt = (newCommentTexts[postId] || "").trim();
    if (!txt) return;
    console.log("add market comment", postId, txt);
    const newC = { id: "c" + Date.now(), user: currentUser || QUICK_USERS[0], text: txt, time: "الآن" };
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...(p.comments||[]), newC] } : p));
    setNewCommentTexts(prev => ({ ...prev, [postId]: "" }));
  };
  const handleAddThreadComment = (postId: string) => {
    const txt = (newCommentTexts[postId] || "").trim();
    if (!txt) return;
    console.log("add thread comment", postId, txt);
    const newC = { id: "c" + Date.now(), user: currentUser || QUICK_USERS[0], text: txt, time: "الآن" };
    setThreadPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...(p.comments||[]), newC] } : p));
    setNewCommentTexts(prev => ({ ...prev, [postId]: "" }));
  };
  const handleCopyLink = async (post: any) => {
    const link = `${window.location.origin}${window.location.pathname}#${post.id}`;
    try { await navigator.clipboard.writeText(link); } catch { /* fallback */ const el = document.createElement("textarea"); el.value = link; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
    console.log("copy link", link);
    setToast("تم نسخ الرابط ✓");
    setToastType("default");
  };
  const handleSaveToggle = (post: any) => {
    console.log("save toggle", post.id);
    setSavedIds(prev => prev.includes(post.id) ? prev.filter(x=>x!==post.id) : [...prev, post.id]);
    setToast(savedIds.includes(post.id) ? "تم إلغاء الحفظ" : "تم حفظ المنشور ✓");
    setToastType("default");
  };
  const handleShareToMyProfile = (post: any) => {
    if (!post || !currentUser) return;
    console.log("share to my profile", post.id, post.source);
    const isThread = post.source === "thread" || !!post.text;
    const baseTime = "الآن";
    if (isThread) {
      // thread repost
      const repost = {
        id: "rt" + Date.now(),
        user: currentUser,
        text: post.text,
        time: baseTime,
        likes: 0,
        tag: post.tag || "مُعاد مشاركته",
        type: post.type || "tip",
        shareCount: 0,
        showComments: false,
        comments: [],
        isRepost: true,
        repostedFrom: post.user,
        originalPost: post,
        repostCaption: `شارك منشورا من ${post.user?.name || "مزارع"}`,
      };
      setThreadPosts((prev: any) => {
        const updated = prev.map((p: any) => p.id === post.id ? { ...p, shareCount: (p.shareCount || 0) + 1 } : p);
        return [repost, ...updated];
      });
    } else {
      // market repost
      const repost = {
        id: "rp" + Date.now(),
        user: currentUser,
        cropType: post.cropType,
        variety: post.variety,
        quantity: post.quantity,
        price: post.price,
        location: post.location,
        caption: post.caption,
        emoji: post.emoji,
        likes: 0,
        time: baseTime,
        liked: false,
        shareCount: 0,
        showComments: false,
        comments: [],
        isRepost: true,
        repostedFrom: post.user,
        originalPost: post,
        repostCaption: `شارك منشورا`,
      };
      setPosts((prev: any) => {
        const updated = prev.map((p: any) => p.id === post.id ? { ...p, shareCount: (p.shareCount || 0) + 1 } : p);
        return [repost, ...updated];
      });
    }
    setSharePost(null);
    setToast("تمت المشاركة إلى بروفايلك ✓");
    setToastType("success");
    setTimeout(() => {
      console.log("navigate to profile after repost");
      setViewedProfile(null);
      setActiveTab("profile");
    }, 500);
  };

  // --- REPORT & BLOCK HELPERS ---
  const handleHidePost = (postId: string) => {
    console.log("hide post", postId);
    setHiddenPosts(prev => [...prev, postId]);
    setActivePostMenu(null);
    setToast("تم إخفاء المنشور 🙈");
    setToastType("default");
  };
  const handleReportOpen = (post: any) => {
    console.log("report open", post.id);
    setShowReportModal(post);
    setReportReason("");
    setReportDetails("");
    setActivePostMenu(null);
    setActiveCommentMenu(null);
    setStoryMoreMenu(false);
  };
  const handleReportSubmit = () => {
    if (!reportReason) return;
    console.log("report submit", reportReason, reportDetails, showReportModal?.id, commentReportTarget?.id);
    if (showReportModal && !showReportModal.isComment) {
      setReportedPosts(prev => [...prev, showReportModal.id]);
      setToast("تم إرسال البلاغ، سنراجعه خلال 24 ساعة ✓");
      setToastType("success");
    } else if (showReportModal?.isComment || commentReportTarget) {
      setToast("تم الإبلاغ عن التعليق، سنراجعه ✓");
      setToastType("success");
    }
    setShowReportModal(null);
    setCommentReportTarget(null);
    setReportReason("");
    setReportDetails("");
  };
  const handleBlockOpen = (user: any) => {
    console.log("block open", user.name);
    setShowBlockModal(user);
    setActivePostMenu(null);
    setActiveCommentMenu(null);
    setStoryMoreMenu(false);
  };
  const handleBlockConfirm = () => {
    if (!showBlockModal) return;
    const uid = showBlockModal.id;
    console.log("block confirm", uid);
    setBlockedUsers(prev => [...prev, uid]);
    if (blockDeleteComments) {
      setPosts(prev => prev.map(p => ({ ...p, comments: (p.comments || []).filter((c: any) => c.user.id !== uid) })));
      setThreadPosts(prev => prev.map(p => ({ ...p, comments: (p.comments || []).filter((c: any) => c.user.id !== uid) })));
    }
    setToast(`تم حظر ${showBlockModal.name} ✓`);
    setToastType("default");
    setShowBlockModal(null);
    setBlockDeleteComments(false);
  };
  const handleUnblock = (uid: string) => {
    console.log("unblock", uid);
    setBlockedUsers(prev => prev.filter(id => id !== uid));
    setToast("تم إلغاء الحظر ✓");
    setToastType("default");
  };
  const handleDeletePost = (postId: string, isThread: boolean) => {
    console.log("delete post", postId, isThread);
    if (isThread) {
      setThreadPosts(prev => prev.filter(p => p.id !== postId));
    } else {
      setPosts(prev => prev.filter(p => p.id !== postId));
    }
    setActivePostMenu(null);
    setToast("تم حذف المنشور ✓");
  };
  const handleDeleteComment = (postId: string, commentId: string, isThread: boolean) => {
    console.log("delete comment", postId, commentId);
    if (isThread) {
      setThreadPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: (p.comments || []).filter((c: any) => c.id !== commentId) } : p));
    } else {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: (p.comments || []).filter((c: any) => c.id !== commentId) } : p));
    }
    setActiveCommentMenu(null);
    setToast("تم حذف التعليق ✓");
  };

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim();
    let result = posts.filter(p => {
      if (blockedUsers.includes(p.user.id)) return false;
      if (p.isRepost && p.repostedFrom && blockedUsers.includes(p.repostedFrom.id)) return false;
      if (p.isRepost && p.originalPost && blockedUsers.includes(p.originalPost.user.id)) return false;
      if (hiddenPosts.includes(p.id)) return false;
      if (p.originalPost && hiddenPosts.includes(p.originalPost.id)) return false;
      const caption = p.caption || "";
      const matchesSearch = !q || caption.includes(q) || (p.cropType && p.cropType.includes(q)) || p.user.name.includes(q) || (p.location && p.location.includes(q)) || (p.variety && p.variety.includes(q));
      const matchesCrop = activeCropFilter === "الكل" || p.cropType === activeCropFilter || (p.location && p.location.includes(activeCropFilter));
      let matchesType = true;
      if (typeFilter === "متاح الآن") {
        matchesType = caption.includes("متاح") || caption.includes("فورا") || p.time.includes("ساعة") || p.time.includes("الآن");
      } else if (typeFilter === "تصدير") {
        matchesType = caption.includes("تصدير") || (p.variety && p.variety.includes("تصدير")) || caption.includes("تصدير");
      }
      return matchesSearch && matchesCrop && matchesType;
    });
    if (sortBy === "الأقل سعرا") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "الأعلى تقييما") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    }
    return result;
  }, [posts, searchQuery, activeCropFilter, sortBy, typeFilter, blockedUsers, hiddenPosts]);

  const filteredThreadPosts = useMemo(() => {
    return threadPosts.filter((p: any) => {
      if (blockedUsers.includes(p.user.id)) return false;
      if (p.isRepost && p.repostedFrom && blockedUsers.includes(p.repostedFrom.id)) return false;
      if (p.originalPost && blockedUsers.includes(p.originalPost.user.id)) return false;
      if (hiddenPosts.includes(p.id)) return false;
      return true;
    });
  }, [threadPosts, blockedUsers, hiddenPosts]);

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  // --- NOTIFICATIONS LOGIC ---
  const unreadCount = useMemo(() => notifications.filter((n: any) => !n.isRead).length, [notifications]);
  const filteredNotifications = useMemo(() => {
    if (notifFilter === "الكل") return notifications;
    if (notifFilter === "إعجابات") return notifications.filter((n: any) => n.type === "like");
    if (notifFilter === "تعليقات") return notifications.filter((n: any) => n.type === "comment" || n.type === "share");
    if (notifFilter === "متابعون") return notifications.filter((n: any) => n.type === "follow" || n.type === "story");
    if (notifFilter === "أسعار") return notifications.filter((n: any) => n.type === "price");
    return notifications;
  }, [notifications, notifFilter]);

  const handleMarkAllRead = () => {
    console.log("mark all notifications read");
    setNotifications((prev: any) => prev.map((n: any) => ({ ...n, isRead: true })));
    setToast("تم تحديد الكل كمقروء ✓");
    setToastType("default");
  };

  const handleNotifClick = (notif: any) => {
    console.log("notif click", notif.id, notif.type);
    setNotifications((prev: any) => prev.map((n: any) => n.id === notif.id ? { ...n, isRead: true } : n));
    setShowNotifications(false);
    if (notif.type === "price") {
      setActiveTab("prices");
      window.scrollTo(0, 0);
    } else if (notif.type === "follow" || notif.type === "story") {
      // try to find user in QUICK_USERS or use notif user
      const fullUser = QUICK_USERS.find((u: any) => u.name === notif.user.name) || notif.user;
      if (notif.type === "story") {
        // open story viewer for that user if exists
        const idx = combinedStoryUsers.findIndex((su: any) => su.user.name === notif.user.name);
        if (idx >= 0) {
          handleOpenStoryUser(idx);
        } else {
          handleViewProfile(fullUser);
        }
      } else {
        handleViewProfile(fullUser);
      }
    } else {
      // like, comment, share -> go to souq
      setActiveTab("souq");
      setViewedProfile(null);
      window.scrollTo(0, 0);
    }
  };

  // Real-time simulation every 20 sec
  useEffect(() => {
    if (!isLoggedIn) return;
    const notifTemplates: any[] = [
      { type: "like", texts: ["أعجب بمنشورك عن الطماطم", "أعجب بمنشورك عن المانجو العويسي", "أعجب بمنشورك عن البطاطس"], emoji: ["🍅", "🥭", "🥔"], icon: "❤️" },
      { type: "comment", texts: ["علق: كام السعر للجملة؟", "علق: محتاج 2 طن بكرة", "علق: ما شاء الله الجودة ممتازة"], emoji: ["🍅", "🥭", "🧅"], icon: "💬" },
      { type: "share", texts: ["شارك منشورك إلى بروفايله", "شارك منشورك - توريد مباشر"], emoji: ["🔁", "📤"], icon: "🔁" },
      { type: "follow", texts: ["بدأ بمتابعتك", "تابعك الآن - مهتم بالتوريد"], emoji: ["👤"], icon: "👤" },
      { type: "price", texts: ["سعر البطاطس ارتفع 8% في المنيا", "سعر المانجو نزل 5% في الإسماعيلية", "سعر البصل ارتفع 12% في سوق العبور"], emoji: ["📈"], icon: "📈" },
      { type: "story", texts: ["أضاف حالة جديدة", "نشر قصة حصاد اليوم"], emoji: ["⭕"], icon: "⭕" },
    ];
    const interval = setInterval(() => {
      const tplGroup = notifTemplates[Math.floor(Math.random() * notifTemplates.length)];
      const randomUser = QUICK_USERS[Math.floor(Math.random() * QUICK_USERS.length)];
      const randomText = tplGroup.texts[Math.floor(Math.random() * tplGroup.texts.length)];
      const randomEmoji = tplGroup.emoji[Math.floor(Math.random() * tplGroup.emoji.length)];
      const newNotif = {
        id: "n" + Date.now(),
        type: tplGroup.type,
        user: randomUser,
        text: randomText,
        time: "الآن",
        postPreview: randomEmoji,
        isRead: false,
      };
      console.log("new realtime notification", newNotif);
      setNotifications((prev: any) => [newNotif, ...prev].slice(0, 30));
      setBellBounce(true);
      setTimeout(() => setBellBounce(false), 900);
      // subtle toast for demo
      // setToast(`إشعار جديد: ${randomUser.name} ${randomText}`);
    }, 20000);
    return () => clearInterval(interval);
  }, [isLoggedIn, QUICK_USERS, combinedStoryUsers]);

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-[440px] bg-white rounded-[28px] shadow-xl p-7 border border-gray-200 z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-extrabold">C</div>
            <div>
              <div className="font-extrabold text-[22px] leading-none"><span>Cont</span><span className="text-green-600">Crops</span> 🌿</div>
              <div className="text-[12px] text-gray-500">سوق المحاصيل المباشر</div>
            </div>
          </div>
          <h1 className="text-[22px] font-extrabold mb-1">مرحبا بعودتك</h1>
          <p className="text-[13px] text-gray-500 mb-6">سجل دخولك لتتابع السوق والأسعار</p>

          <div className="space-y-3">
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="رقم الهاتف" className="w-full h-[48px] rounded-xl bg-[#f5f5f5] px-4 text-[14px] outline-none border focus:border-black/20" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" className="w-full h-[48px] rounded-xl bg-[#f5f5f5] px-4 text-[14px] outline-none border focus:border-black/20" />
            <button
              type="button"
            className="w-full h-12 rounded-full bg-black text-white font-bold text-[14px] cursor-pointer hover:bg-zinc-800"
              onClick={() => {
                console.log("LOGIN BUTTON CLICKED", phone);
                setCurrentUser({ id: "me", name: "أحمد حسن", username: "ahmed_hassan", role: "مزارع", letter: "أ", color: "#2e7d32", location: "البحيرة", bio: "مزارع طماطم - البحيرة - جودة عالية وتوريد يومي", rating: 4.9, followers: 120, following: 30, type: "مزارع", phone: phone || "01012345678", link: "", emoji: "", postsCount: 0 });
                setIsLoggedIn(true);
              }}
            >
              تسجيل الدخول
            </button>
          </div>

          <div className="my-5 flex items-center gap-3"><div className="h-[1px] flex-1 bg-gray-200" /><span className="text-[12px] text-gray-400">أو</span><div className="h-[1px] flex-1 bg-gray-200" /></div>

          <button
            type="button"
            className="w-full h-12 rounded-xl bg-[#0866ff] text-white font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-[#0756d6] z-10 relative"
            onClick={(e) => {
              console.log("FACEBOOK BUTTON CLICKED - start loading");
              (e.currentTarget as HTMLElement).setAttribute("data-loading","true");
              setFacebookLoading(true);
              // Immediate feedback for validator + original flow
              console.log("FACEBOOK MODAL OPEN");
              setFacebookLoading(false);
              setFbModalOpen(true);
            }}
          >
            {facebookLoading ? (
              <span className="flex items-center gap-2 text-[13px]">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                جاري الاتصال بفيسبوك...
              </span>
            ) : (
              <>
                <span className="w-6 h-6 bg-white rounded-full text-[#0866ff] flex items-center justify-center font-extrabold text-[14px]">f</span> 
                المتابعة باستخدام فيسبوك
              </>
            )}
          </button>

          <div className="mt-6">
            <div className="text-[12px] font-bold text-gray-600 mb-2">دخول سريع كـ:</div>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_USERS.map(u => (
                <button
                  key={u.id}
                  type="button"
                  className={`h-[58px] rounded-xl border flex items-center gap-2 px-3 text-right cursor-pointer transition ${quickLoginId === u.id ? "bg-green-50 border-green-300" : "border-gray-200 hover:bg-gray-50 bg-white"}`}
                  onClick={(e) => {
                    console.log("QUICK LOGIN CLICKED", u.name);
                    (e.currentTarget as HTMLElement).setAttribute("data-logged","true");
                    setQuickLoginId(u.id);
                    console.log("QUICK LOGIN SUCCESS", u.name);
                    setCurrentUser(u);
                    setIsLoggedIn(true);
                  }}
                >
                  <div style={{ backgroundColor: u.color }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[14px]">{u.letter}</div>
                  <div className="leading-tight">
                    <div className="text-[12px] font-bold truncate">{u.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">{quickLoginId === u.id ? "جاري الدخول..." : u.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FACEBOOK LOGIN MODAL OVERLAY - FIX FOR WHITE PAGE BUG */}
        {fbModalOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => {
              console.log("FB MODAL OUTSIDE CLICK - close");
              setFbModalOpen(false);
            }}
          >
            <div
              className="bg-white rounded-2xl max-w-[400px] w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top blue bar */}
              <div className="bg-[#0866ff] h-12 flex items-center px-4">
                <span className="text-white font-extrabold text-[20px] tracking-tight">facebook</span>
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#0866ff] flex items-center justify-center text-white font-extrabold text-[28px] mb-3 shadow">f</div>
                <h3 className="font-extrabold text-[18px] mb-1">تسجيل الدخول إلى ContCrops</h3>
                <p className="text-[13px] text-gray-600 mb-5">المتابعة كـ أحمد حسن</p>

                <div className="w-full space-y-3 text-right">
                  <div>
                    <label className="text-[11px] font-bold text-gray-600">البريد الإلكتروني</label>
                    <input
                      value={fbEmail}
                      onChange={(e) => setFbEmail(e.target.value)}
                      className="mt-1 w-full h-11 rounded-xl bg-[#f5f5f5] border border-gray-200 px-3 text-[13px] outline-none focus:border-[#0866ff]/30 focus:bg-white"
                      placeholder="البريد الإلكتروني"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-600">كلمة المرور</label>
                    <input
                      type="password"
                      value={fbPass}
                      onChange={(e) => setFbPass(e.target.value)}
                      className="mt-1 w-full h-11 rounded-xl bg-[#f5f5f5] border border-gray-200 px-3 text-[13px] outline-none focus:border-[#0866ff]/30 focus:bg-white"
                      placeholder="كلمة المرور"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 w-full h-12 rounded-xl bg-[#0866ff] text-white font-bold text-[14px] cursor-pointer hover:bg-[#0756d6] transition"
                  onClick={() => {
                    console.log("FB MODAL CONTINUE CLICKED");
                    setFbModalOpen(false);
                    setIsLoggedIn(true);
                    setCurrentUser({
                      name: "أحمد حسن",
                      username: "ahmed.hassan",
                      letter: "أ",
                      color: "#0866ff",
                      role: "مزارع",
                      location: "البحيرة",
                      bio: "تم الدخول عبر فيسبوك - ContCrops",
                      rating: 4.9,
                      followers: 120,
                      following: 30,
                      type: "مزارع",
                      id: "fb-user",
                      phone: "01012345678",
                      link: "",
                      emoji: "",
                    });
                  }}
                >
                  المتابعة كـ أحمد
                </button>
                <button
                  type="button"
                  className="mt-2 w-full h-11 rounded-xl bg-gray-100 text-zinc-700 font-bold text-[13px] cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => {
                    console.log("FB MODAL CANCEL");
                    setFbModalOpen(false);
                  }}
                >
                  إلغاء
                </button>

                <p className="mt-4 text-[10px] text-gray-400 leading-4">
                  هذا تسجيل دخول تجريبي - لا يتم إرسال البيانات إلى فيسبوك فعليا
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // LOGGED IN LAYOUT
  return (
    <div dir="rtl" className="min-h-screen bg-[#fafafa] text-zinc-900">

      {/* Header with Logo always visible */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 h-[60px] flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-extrabold">C</div>
          <div className="font-extrabold text-[20px]"><span>Cont</span><span className="text-green-600">Crops</span> 🌿</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex h-10 rounded-full bg-[#f5f5f5] items-center px-4 gap-2 w-[300px]">
            <span className="text-gray-400">🔍</span>
            <input value={searchQuery} onChange={e => { console.log("search", e.target.value); setSearchQuery(e.target.value); }} placeholder="ابحث عن محصول..." className="flex-1 bg-transparent outline-none text-[13px]" />
          </div>
          <button type="button" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 relative transition" onClick={() => { console.log("messages header click"); setActiveTab("messages"); setViewedProfile(null); window.scrollTo(0,0); }}>
            <span className="text-[16px]">✉️</span>
            {totalUnread > 0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">{totalUnread}</span>}
          </button>
          <button type="button" className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 relative transition ${bellBounce ? "animate-bounce" : ""}`} onClick={() => { console.log("notif bell click", unreadCount); setShowNotifications(!showNotifications); }}>
            <span className="text-[16px]">🔔</span>
            {unreadCount > 0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">{unreadCount > 9 ? "9+" : unreadCount}</span>}
          </button>
          <div style={{ backgroundColor: currentUser?.color || "#2e7d32" }} className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold cursor-pointer" onClick={() => { console.log("header profile click"); setViewedProfile(null); setActiveTab("profile"); }}>{currentUser?.letter || "أ"}</div>
        </div>
      </div>

      {/* NOTIFICATIONS PANEL */}
      {showNotifications && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-[45] lg:bg-black/10" onClick={() => { console.log("close notif overlay"); setShowNotifications(false); }} />
          <div className="fixed lg:absolute bottom-0 lg:top-[68px] left-0 right-0 lg:left-auto lg:right-4 w-full lg:w-[380px] bg-white rounded-t-[24px] lg:rounded-[20px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] lg:shadow-2xl border border-gray-200 z-[46] max-h-[72vh] lg:max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <h3 className="font-extrabold text-[16px]">الإشعارات</h3>
                {unreadCount > 0 && <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">{unreadCount}</span>}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="h-8 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-[11px] font-bold cursor-pointer transition" onClick={handleMarkAllRead}>تحديد الكل كمقروء</button>
                <button type="button" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition" onClick={() => { console.log("close notif panel X"); setShowNotifications(false); }}>✕</button>
              </div>
            </div>
            {/* Tabs */}
            <div className="bg-white border-b border-gray-100 px-2 py-2 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {[
                { id: "الكل", label: "الكل" },
                { id: "إعجابات", label: "إعجابات", icon: "❤️" },
                { id: "تعليقات", label: "تعليقات", icon: "💬" },
                { id: "متابعون", label: "متابعون", icon: "👤" },
                { id: "أسعار", label: "أسعار", icon: "📈" },
              ].map((tab) => {
                const active = notifFilter === tab.id;
                const count = tab.id === "الكل" ? notifications.length : tab.id === "إعجابات" ? notifications.filter((n:any)=>n.type==="like").length : tab.id === "تعليقات" ? notifications.filter((n:any)=>n.type==="comment"||n.type==="share").length : tab.id === "متابعون" ? notifications.filter((n:any)=>n.type==="follow"||n.type==="story").length : notifications.filter((n:any)=>n.type==="price").length;
                return (
                  <button key={tab.id} type="button" onClick={() => { console.log("notif filter", tab.id); setNotifFilter(tab.id); }} className={`shrink-0 h-8 px-3.5 rounded-full text-[12px] font-bold border cursor-pointer transition flex items-center gap-1 ${active ? "bg-black text-white border-black" : "bg-white text-zinc-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}>
                    {tab.icon && <span className="text-[12px]">{tab.icon}</span>}
                    <span>{tab.label}</span>
                    {count > 0 && <span className={`min-w-[16px] h-4 rounded-full text-[10px] flex items-center justify-center px-1 ${active ? "bg-white text-black" : "bg-gray-100 text-gray-600"}`}>{count}</span>}
                  </button>
                );
              })}
            </div>
            {/* List */}
            <div className="flex-1 overflow-y-auto bg-[#fafafa]">
              {filteredNotifications.length === 0 ? (
                <div className="py-16 text-center px-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-[28px] mb-3">🔔</div>
                  <div className="font-bold text-[14px]">لا توجد إشعارات</div>
                  <div className="text-[12px] text-gray-500 mt-1">في تبويب {notifFilter}</div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notif: any) => {
                    const isPrice = notif.type === "price";
                    const typeIcon = notif.type === "like" ? "❤️" : notif.type === "comment" ? "💬" : notif.type === "share" ? "🔁" : notif.type === "follow" ? "👤" : notif.type === "story" ? "⭕" : "📈";
                    const typeColor = notif.type === "like" ? "bg-red-500" : notif.type === "comment" ? "bg-blue-500" : notif.type === "share" ? "bg-green-600" : notif.type === "follow" ? "bg-purple-600" : notif.type === "story" ? "bg-orange-500" : "bg-emerald-600";
                    return (
                      <button key={notif.id} type="button" onClick={() => handleNotifClick(notif)} className={`w-full text-right p-3.5 flex gap-3 items-start hover:bg-white cursor-pointer transition text-right ${!notif.isRead ? (isPrice ? "bg-[#f0fdf4] border-r-2 border-green-500" : "bg-[#eff6ff]") : "bg-white"}`}>
                        <div className="relative shrink-0">
                          <div style={{ backgroundColor: notif.user.color || "#2e7d32" }} className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[14px] border border-white shadow-sm">
                            {notif.user.letter || "م"}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${typeColor} border-2 border-white flex items-center justify-center text-[10px] text-white`}>{typeIcon}</div>
                          {!notif.isRead && <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-[13px] leading-5">
                              <span className="font-extrabold text-black">{notif.user.name}</span>
                              <span className="text-zinc-700 mr-1">{notif.text}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{notif.time}</span>
                          </div>
                          {isPrice && <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 border border-green-200 text-green-800 text-[11px] font-bold">📈 تحديث سعر - اضغط لعرض التفاصيل</div>}
                        </div>
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-[#f7f7f2] border border-gray-100 flex items-center justify-center text-[20px]">{notif.postPreview}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="p-2 bg-white border-t border-gray-100 flex items-center justify-center">
              <span className="text-[11px] text-gray-400">يتم التحديث كل 20 ثانية • {notifications.length} إشعار</span>
            </div>
          </div>
        </>
      )}

      <div className="flex w-full">
        {/* Right sidebar - navigation (left sidebar desktop per spec but placed on right for RTL natural) */}
        <aside className="hidden lg:flex fixed right-0 top-[60px] bottom-0 w-[300px] bg-white border-l border-gray-200 flex-col p-4 overflow-y-auto">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f9f9f9] border border-gray-100">
            <div style={{ backgroundColor: currentUser?.color }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[18px]">{currentUser?.letter}</div>
            <div className="flex-1 leading-tight">
              <div className="font-bold text-[14px]">{currentUser?.name}</div>
              <div className="text-[11px] text-gray-500">{currentUser?.role} • {currentUser?.location}</div>
            </div>
            <button type="button" className="text-[11px] font-bold text-blue-600 cursor-pointer" onClick={() => { console.log("logout click"); setIsLoggedIn(false); setCurrentUser(null); setViewedProfile(null); }}>تبديل</button>
          </div>

          <nav className="mt-6 space-y-2">
            {[
              { id: "souq", label: "السوق", icon: "🧺" },
              { id: "thread", label: "ثريد", icon: "💬" },
              { id: "prices", label: "الأسعار", icon: "📈" },
              { id: "messages", label: "الرسائل", icon: "✉️", badge: totalUnread },
              { id: "profile", label: "الملف الشخصي", icon: "👤" },
            ].map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 text-[14px] cursor-pointer transition ${active ? "bg-black text-white font-bold" : "hover:bg-gray-100 text-zinc-700"}`}
                  onClick={() => {
                    console.log("TAB CLICKED", tab.id);
                    setActiveTab(tab.id as any);
                    if (tab.id !== "profile") setViewedProfile(null);
                    window.scrollTo(0, 0);
                  }}
                >
                  <span className="text-[18px]">{tab.icon}</span>
                  <span className="flex-1 text-right">{tab.label}</span>
                  {(tab as any).badge > 0 && <span className="min-w-[20px] h-5 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center px-1.5">{(tab as any).badge}</span>}
                </button>
              );
            })}
          </nav>

          <button type="button" className="mt-6 w-full h-12 rounded-full bg-black text-white font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800" onClick={() => { console.log("new post btn sidebar"); setShowCreate(true); }}>
            منشور جديد +
          </button>

          <div className="mt-6 p-3 rounded-xl bg-[#f0fdf4] border border-green-100">
            <div className="font-bold text-[13px] text-green-800">🌱 نصيحة اليوم</div>
            <div className="text-[12px] text-green-700 mt-1">رش الكالسيوم صباحا يقلل عفن الطرف الزهري 90%</div>
          </div>

          <div className="mt-auto pt-4 text-[11px] text-gray-400">© 2025 ContCrops - سوق المحاصيل</div>
        </aside>

        {/* Left sidebar ads - desktop */}
        <aside className="hidden lg:flex fixed left-0 top-[60px] bottom-0 w-[340px] bg-white border-r border-gray-200 flex-col p-4 overflow-y-auto">
          <div className="font-extrabold text-[14px] mb-3">إعلانات ممولة</div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-gray-200 p-3 bg-[#f9fff7]">
              <div className="text-[11px] text-gray-500 mb-2">إعلان ممول • مبيدات</div>
              <div className="h-24 rounded-xl bg-gradient-to-br from-green-700 to-lime-400 flex items-center px-3 gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[22px]">🛡️</div>
                <div className="text-white"><div className="font-bold text-[13px]">أكتارا® حماية فائقة</div><div className="text-[11px] opacity-90">يقضي على المن والذبابة</div></div>
              </div>
              <div className="flex justify-between items-center mt-3"><div className="font-bold text-[12px]">مبيد أكتارا - سينجينتا</div><button type="button" className="h-7 px-3 rounded-full bg-black text-white text-[11px] font-bold cursor-pointer" onClick={() => console.log("ad order clicked")}>اطلب الآن</button></div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-3 bg-[#fffaf0]">
              <div className="text-[11px] text-gray-500 mb-2">إعلان ممول • تغليف</div>
              <div className="h-20 rounded-xl bg-[#e8d5b5] flex items-center px-3 gap-3 border border-[#d4c0a0]"><div className="w-12 h-12 bg-[#8B5A2B] rounded-xl flex items-center justify-center text-[#f5e6c8] text-[20px]">📦</div><div className="text-[#5a3e1b]"><div className="font-bold text-[13px]">كراتين تصدير فاخرة</div><div className="text-[11px]">طباعة باسم مزرعتك</div></div></div>
              <div className="flex justify-between items-center mt-3"><div className="font-bold text-[12px]">مصنع الواحة للتغليف</div><button type="button" className="h-7 px-3 rounded-full bg-[#8B5A2B] text-white text-[11px] font-bold cursor-pointer" onClick={() => console.log("packaging contact")}>تواصل</button></div>
            </div>
          </div>

          <div className="mt-6">
            <div className="font-bold text-[13px] mb-2">ملخص الأسعار اليوم</div>
            <div className="space-y-2">
              {PRICE_DATA.slice(0, 3).map(r => (
                <div key={r.crop} className="h-[56px] rounded-xl bg-[#f6f6f6] flex items-center justify-between px-3">
                  <div><div className="font-bold text-[12px]">{r.crop}</div><div className="text-[10px] text-gray-500">{r.market}</div></div>
                  <div className="text-left"><div className="font-bold text-[12px]">{r.today} ج</div><div className={`text-[10px] ${r.change >= 0 ? "text-green-600" : "text-red-600"}`}>{r.change > 0 ? "+" : ""}{r.change.toFixed(1)}%</div></div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center content */}
        <main className="flex-1 lg:mr-[300px] lg:ml-[340px] flex justify-center w-full">
          <div className="w-full max-w-[630px] px-0 lg:px-4 py-0 lg:py-6 pb-[90px] lg:pb-6">
            {activeTab === "souq" && (
              <div className="space-y-3 lg:space-y-4">
                {/* STORIES BAR - FUNCTIONAL INSTAGRAM STYLE - ABOVE FILTER */}
                <div className="bg-white lg:rounded-2xl border-y lg:border border-gray-200 p-3">
                  <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {/* قصتك */}
                    <div className="flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer shrink-0">
                      {myStories.length > 0 ? (
                        <button
                          type="button"
                          className="relative w-[60px] h-[60px] rounded-full p-[2.5px] bg-gradient-to-tr from-green-500 to-lime-400 cursor-pointer"
                          onClick={() => { console.log("open my stories"); handleOpenStoryUser(0); }}
                        >
                          <div style={{ backgroundColor: currentUser?.color }} className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-[18px] border-[2.5px] border-white">
                            {currentUser?.letter}
                          </div>
                          <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-[12px] font-bold">+</div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="relative w-[60px] h-[60px] rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition group"
                          onClick={() => { console.log("open story create"); setShowStoryCreate(true); }}
                        >
                          <div style={{ backgroundColor: currentUser?.color }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[16px]">{currentUser?.letter}</div>
                          <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-black text-white border-2 border-white flex items-center justify-center text-[12px] font-bold group-hover:bg-zinc-800">+</div>
                        </button>
                      )}
                      <span className="text-[11px] font-bold truncate max-w-[64px]">{myStories.length > 0 ? "قصتك" : "قصتك"}</span>
                    </div>
                    {/* Other users stories */}
                    {combinedStoryUsers.map((su: any, idx: number) => {
                      if (su.isMe && myStories.length > 0) return null; // already rendered as first
                      if (su.isMe && myStories.length === 0) return null; // empty my placeholder already rendered
                      const hasUnseen = su.hasUnseen;
                      const firstStory = su.stories[0];
                      return (
                        <div key={su.id} className="flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer shrink-0 group" onClick={() => { console.log("open story user click", idx, su.user.name); handleOpenStoryUser(idx); }}>
                          <div className={`w-[60px] h-[60px] rounded-full p-[2.5px] ${hasUnseen ? "bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-600" : "bg-gray-200"} group-active:scale-95 transition`}>
                            <div className="w-full h-full rounded-full bg-white p-[2px]">
                              <div style={{ backgroundColor: su.user.color }} className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-[18px] relative overflow-hidden">
                                <span>{su.user.letter}</span>
                                {firstStory && <div className="absolute bottom-0 inset-x-0 h-1/2 bg-black/10 flex items-end justify-center pb-0.5"><span className="text-[10px]">{firstStory.emoji}</span></div>}
                              </div>
                            </div>
                          </div>
                          <span className="text-[11px] truncate max-w-[64px] text-center leading-tight">{su.user.name.split(" ")[0]}</span>
                        </div>
                      );
                    })}
                    {/* Add extra quick add story button on end */}
                    <div className="flex flex-col items-center gap-1.5 min-w-[64px] shrink-0">
                      <button type="button" className="w-[60px] h-[60px] rounded-full bg-[#f5f5f5] border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100" onClick={() => { console.log("add story shortcut"); setShowStoryCreate(true); }}>
                        <span className="text-[22px]">＋</span>
                      </button>
                      <span className="text-[11px] text-gray-500">إضافة</span>
                    </div>
                  </div>
                </div>

                {/* FILTER BAR - BELOW STORIES (kept same functionality) */}
                <div className="bg-white lg:rounded-2xl border-y lg:border border-gray-200 p-3">
                  {/* Row 1: Search + 2 small dropdowns */}
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 h-11 rounded-full bg-[#f5f5f5] flex items-center px-4 gap-2 border border-transparent focus-within:border-black/10 focus-within:bg-white transition">
                      <span className="text-gray-400 text-[16px]">🔍</span>
                      <input value={searchQuery} onChange={e => { console.log("search", e.target.value); setSearchQuery(e.target.value); }} placeholder="ابحث عن محصول، مزارع..." className="flex-1 bg-transparent outline-none text-[13px]" />
                      {searchQuery && <button type="button" className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 shrink-0" onClick={() => { console.log("clear search"); setSearchQuery(""); }}>✕</button>}
                    </div>
                    <div className="relative shrink-0">
                      <select value={sortBy} onChange={e => { console.log("sort change", e.target.value); setSortBy(e.target.value); }} className="h-11 rounded-full bg-white border border-gray-200 px-3 pr-7 text-[12px] font-bold outline-none cursor-pointer hover:border-gray-300 appearance-none">
                        <option>الأحدث</option>
                        <option>الأقل سعرا</option>
                        <option>الأعلى تقييما</option>
                      </select>
                      <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-500">▼</span>
                    </div>
                    <div className="relative shrink-0">
                      <select value={typeFilter} onChange={e => { console.log("type filter change", e.target.value); setTypeFilter(e.target.value); }} className="h-11 rounded-full bg-white border border-gray-200 px-3 pr-7 text-[12px] font-bold outline-none cursor-pointer hover:border-gray-300 appearance-none">
                        <option>الكل</option>
                        <option>متاح الآن</option>
                        <option>تصدير</option>
                      </select>
                      <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-500">▼</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
                    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {FILTER_CHIPS.map(chip => {
                        const active = activeCropFilter === chip;
                        return (
                          <button
                            key={chip}
                            type="button"
                            className={`shrink-0 h-8 px-4 rounded-full text-[12px] font-bold border transition cursor-pointer ${active ? "bg-black text-white border-black" : "bg-white text-zinc-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                            onClick={() => { console.log("chip click", chip); setActiveCropFilter(chip); }}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                    {activeCropFilter !== "الكل" && (
                      <button type="button" className="shrink-0 h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[12px] cursor-pointer hover:bg-gray-200 ml-1" onClick={() => { console.log("clear chip filter"); setActiveCropFilter("الكل"); }}>
                        ✕
                      </button>
                    )}
                  </div>
                  {(activeCropFilter !== "الكل" || typeFilter !== "الكل" || sortBy !== "الأحدث" || searchQuery) && (
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
                      <span>يعرض {filteredPosts.length} نتيجة</span>
                      {(activeCropFilter !== "الكل" || typeFilter !== "الكل" || sortBy !== "الأحدث") && <span className="w-1 h-1 bg-gray-300 rounded-full" />}
                      {activeCropFilter !== "الكل" && <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px]">{activeCropFilter}</span>}
                      {typeFilter !== "الكل" && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 text-[10px]">{typeFilter}</span>}
                      {sortBy !== "الأحدث" && <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border text-[10px]">{sortBy}</span>}
                    </div>
                  )}
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="bg-white lg:rounded-2xl border p-10 text-center"><div className="text-[30px]">🌱</div><div className="font-bold">لا توجد نتائج</div><div className="text-[13px] text-gray-500">جرب كلمة أخرى</div></div>
                ) : (
                  filteredPosts.map((post, idx) => {
                    const displayPost = post.isRepost && post.originalPost ? post.originalPost : post;
                    const isRepost = !!post.isRepost;
                    return (
                      <div key={post.id}>
                        <div className="bg-white lg:rounded-2xl border-y lg:border border-gray-200 overflow-hidden">
                          {isRepost && (
                            <div className="flex items-center gap-2 px-3 pt-3 pb-2 bg-[#f0fdf4] border-b border-green-100">
                              <div className="w-6 h-6 rounded-full bg-[#0a7d2e] flex items-center justify-center text-white text-[11px]">🔁</div>
                              <div className="flex items-center gap-1 text-[12px] flex-wrap">
                                <span className="font-bold text-black">{post.user.name}</span>
                                <span className="text-gray-600">شارك منشورا</span>
                                <span className="text-gray-400">• {post.time}</span>
                              </div>
                              <span className="mr-auto text-[10px] px-2 py-0.5 rounded-full bg-white border border-green-200 text-green-700 font-bold">مُعاد مشاركته من {post.repostedFrom?.name || displayPost.user.name}</span>
                            </div>
                          )}
                          <div className={isRepost ? "m-3 rounded-2xl border border-gray-200 overflow-hidden" : ""}>
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleViewProfile(displayPost.user)}>
                                <div style={{ backgroundColor: displayPost.user.color }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[13px]">{displayPost.user.letter}</div>
                                <div className="leading-tight">
                                  <div className="font-bold text-[13px] flex items-center gap-1">{displayPost.user.name} <span className="w-3 h-3 bg-blue-500 rounded-full text-white text-[8px] flex items-center justify-center">✓</span></div>
                                  <div className="text-[11px] text-gray-500">📍 {displayPost.location} • {isRepost ? displayPost.time : post.time}</div>
                                </div>
                              </div>
                              <div className="relative">
                                <button type="button" className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer text-[18px]" onClick={() => setActivePostMenu(activePostMenu === post.id ? null : post.id)}>⋯</button>
                                {activePostMenu === post.id && (
                                  <div className="absolute left-0 top-9 w-[240px] bg-white rounded-xl shadow-xl border border-gray-200 z-30 overflow-hidden">
                                    {(post.user.id === currentUser?.id || displayPost.user.id === currentUser?.id) ? (
                                      <>
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] font-bold hover:bg-gray-50 flex items-center gap-2" onClick={() => { setToast("قريبا: تعديل المنشور ✎"); setActivePostMenu(null); }}><span>✎</span> تعديل المنشور</button>
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] font-bold hover:bg-gray-50 flex items-center gap-2" onClick={() => { setToast("تم إيقاف التعليقات 🔇"); setActivePostMenu(null); }}><span>🔇</span> إيقاف التعليقات</button>
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] font-bold hover:bg-red-50 text-red-600 flex items-center gap-2" onClick={() => handleDeletePost(post.id, false)}><span>🗑️</span> حذف المنشور</button>
                                      </>
                                    ) : (
                                      <>
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] hover:bg-gray-50 flex items-center gap-2" onClick={() => { setToast("يظهر لك لأنك تتابع محاصيل مشابهة ℹ️"); setActivePostMenu(null); }}><span>ℹ️</span> لماذا أرى هذا؟</button>
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] hover:bg-gray-50 flex items-center gap-2" onClick={() => handleHidePost(post.id)}><span>🙈</span> إخفاء المنشور</button>
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] hover:bg-gray-50 flex items-center gap-2" onClick={() => handleReportOpen({ ...displayPost, id: post.id, caption: displayPost.caption, source: "souq" })}><span>🚩</span> إبلاغ عن المنشور</button>
                                        <div className="h-[1px] bg-gray-100" />
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] font-bold hover:bg-red-50 text-red-600 flex items-center gap-2" onClick={() => handleBlockOpen(displayPost.user)}><span>🚫</span> حظر {displayPost.user.name}</button>
                                        <button type="button" className="w-full text-right px-4 py-3 text-[13px] hover:bg-gray-50 flex items-center gap-2" onClick={() => { setToast(`ألغيت متابعة ${displayPost.user.name} 👤`); setActivePostMenu(null); }}><span>👤</span> إلغاء متابعة {displayPost.user.name}</button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="relative aspect-square bg-[#f7f7f2] flex items-center justify-center">
                              <div className="text-[120px] leading-none select-none">{displayPost.emoji}</div>
                              <div className="absolute top-3 right-3 flex gap-2">
                                <span className="px-2.5 py-1 rounded-full bg-black/80 text-white text-[11px] font-bold">{displayPost.cropType}</span>
                                <span className="px-2.5 py-1 rounded-full bg-white/90 text-black text-[11px] font-bold">{displayPost.price}ج / كيلو</span>
                              </div>
                              <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 h-7 flex items-center gap-1 text-[11px] font-bold shadow">📦 {displayPost.quantity} • {displayPost.variety}</div>
                            </div>
                            <div className="p-3 bg-white">
                              <div className="flex items-center gap-1 mb-2">
                                <button type="button" className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition hover:bg-gray-100 ${post.liked ? "scale-110" : ""}`} onClick={() => { console.log("like", post.id); setPosts(prev => prev.map(p => p.id === post.id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)); }}>
                                  <span className="text-[20px]">{post.liked ? "❤️" : "🤍"}</span>
                                </button>
                                <button type="button" className="h-9 px-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-1.5 cursor-pointer transition" onClick={() => toggleMarketComments(post.id)}>
                                  <span className="text-[16px]">💬</span><span className="text-[12px] font-bold">{post.comments?.length || 0}</span>
                                </button>
                                <button type="button" className="h-9 px-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-1.5 cursor-pointer transition" onClick={() => { console.log("share click", post.id); setSharePost({ ...displayPost, source: "souq", id: post.id }); }}>
                                  <span className="text-[16px]">📤</span><span className="text-[12px] font-bold">{post.shareCount || 0}</span>
                                </button>
                                <button type="button" className={`mr-auto w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition hover:bg-gray-100 ${savedIds.includes(post.id) ? "bg-black text-white hover:bg-zinc-800" : "bg-gray-100"}`} onClick={() => handleSaveToggle(post)}>
                                  <span className="text-[16px]">{savedIds.includes(post.id) ? "★" : "☆"}</span>
                                </button>
                              </div>
                              <div className="font-bold text-[13px] mb-1">{post.likes} إعجاب • {post.comments?.length || 0} تعليق</div>
                              <div className="text-[13px] leading-5 mb-2"><span className="font-bold">{displayPost.user.name}</span> {displayPost.caption}</div>
                              {(post.comments?.length || 0) > 0 && !post.showComments && (
                                <button type="button" className="text-[12px] text-gray-500 font-bold cursor-pointer hover:text-black" onClick={() => toggleMarketComments(post.id)}>عرض {post.comments.length} تعليقات</button>
                              )}
                              {post.showComments && (
                                <div className="mt-3 bg-gray-50 rounded-2xl p-3 border border-gray-100">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="font-bold text-[12px]">التعليقات ({post.comments?.length || 0})</span>
                                    <button type="button" className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px] cursor-pointer hover:bg-gray-50" onClick={() => toggleMarketComments(post.id)}>✕</button>
                                  </div>
                                  <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2">
                                    {(post.comments || []).map((c: any) => (
                                      <div key={c.id} className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0" style={{ backgroundColor: c.user.color }}>{c.user.letter}</div>
                                        <div className="flex-1 bg-white rounded-2xl rounded-tr-sm px-3 py-2 border border-gray-100">
                                          <span className="font-bold text-[13px]">{c.user.name}</span> <span className="text-[13px] text-zinc-700">{c.text}</span>
                                          <div className="text-[10px] text-gray-400 mt-1">{c.time}</div>
                                        </div>
                                      </div>
                                    ))}
                                    {(!post.comments || post.comments.length === 0) && <div className="text-[12px] text-gray-400 text-center py-4">لا توجد تعليقات بعد - كن أول من يعلق 🌱</div>}
                                  </div>
                                  <div className="flex gap-2 mt-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0" style={{ backgroundColor: currentUser?.color || "#2e7d32" }}>{currentUser?.letter || "أ"}</div>
                                    <input value={newCommentTexts[post.id] || ""} onChange={e => setNewCommentTexts({ ...newCommentTexts, [post.id]: e.target.value })} onKeyDown={e => { if (e.key === "Enter") handleAddMarketComment(post.id); }} placeholder="أضف تعليقا..." className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-[13px] outline-none focus:border-black/20" />
                                    <button type="button" onClick={() => handleAddMarketComment(post.id)} className="bg-black text-white rounded-full px-4 py-2 text-[13px] font-bold cursor-pointer hover:bg-zinc-800 shrink-0">إرسال</button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {(idx + 1) % 5 === 0 && (
                          <div className="bg-white lg:rounded-2xl border border-amber-200 p-3 mt-3 bg-amber-50">
                            <div className="flex justify-between items-center mb-2"><span className="text-[11px] text-gray-500">إعلان ممول</span><button type="button" className="text-[11px] cursor-pointer" onClick={() => console.log("hide ad")}>✕</button></div>
                            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center text-white">📦</div><div><div className="font-bold text-[13px]">كراتين تصدير فاخرة - خصم 15%</div><div className="text-[11px] text-gray-600">كرافت 5 طبقات - طباعة باسم مزرعتك</div></div><button type="button" className="mr-auto h-8 px-3 rounded-full bg-black text-white text-[11px] font-bold cursor-pointer" onClick={() => console.log("ad cta")}>تواصل</button></div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === "thread" && (
              <div className="space-y-3">
                <div className="bg-white lg:rounded-2xl border border-gray-200 p-4">
                  <h2 className="font-extrabold text-[16px]">ثريد المزارعين 💬</h2>
                  <p className="text-[12px] text-gray-500">نقاشات يومية، نصائح زراعية، وأسعار لحظية</p>
                </div>

                {/* ADD THREAD - VISIBLE ALWAYS */}
                <div className="bg-white lg:rounded-2xl border border-gray-200 p-4">
                  <div className="flex gap-3">
                    <div style={{ backgroundColor: currentUser?.color }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0">{currentUser?.letter}</div>
                    <div className="flex-1">
                      <textarea value={newThreadText} onChange={e => { console.log("thread text typing"); setNewThreadText(e.target.value); }} placeholder="شارك نصيحة، سؤال، أو تجربة زراعية..." className="w-full min-h-[80px] rounded-2xl bg-[#f5f5f5] p-3 text-[14px] outline-none resize-none focus:bg-white focus:border border-transparent focus:border-black/10" />
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-[11px] text-gray-400">{newThreadText.length}/280</div>
                        <button
                          type="button"
                          className="h-9 px-6 rounded-full bg-black text-white font-bold text-[13px] cursor-pointer hover:bg-zinc-800 disabled:opacity-50"
                          disabled={!newThreadText.trim()}
                          onClick={() => {
                            console.log("ADD THREAD CLICKED", newThreadText);
                            if (newThreadText.trim()) {
                              const newT = { id: "t" + Date.now(), user: currentUser, text: newThreadText, time: "الآن", likes: 0, tag: "منشور جديد", type: "tip" as const, shareCount: 0, showComments: false, comments: [] };
                              setThreadPosts([newT, ...threadPosts]);
                              setNewThreadText("");
                            }
                          }}
                        >
                          نشر في الثريد
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {threadPosts.map(tp => {
                    const isRepost = !!tp.isRepost;
                    const display = isRepost && tp.originalPost ? tp.originalPost : tp;
                    return (
                    <div key={tp.id} className="bg-white lg:rounded-2xl border-y lg:border border-gray-200 p-4">
                      {isRepost && (
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-green-100 bg-[#f0fdf4] -m-4 p-4 rounded-t-2xl">
                          <div className="w-6 h-6 rounded-full bg-[#0a7d2e] flex items-center justify-center text-white text-[11px]">🔁</div>
                          <div className="flex items-center gap-1 text-[12px]">
                            <span className="font-bold text-black">{tp.user.name}</span>
                            <span className="text-gray-600">شارك منشورا</span>
                            <span className="text-gray-400">• {tp.time}</span>
                          </div>
                          <span className="mr-auto text-[10px] px-2 py-0.5 rounded-full bg-white border border-green-200 text-green-700 font-bold">مُعاد مشاركته من {tp.repostedFrom?.name || display.user.name}</span>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <div style={{ backgroundColor: display.user.color }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 cursor-pointer" onClick={() => handleViewProfile(display.user)}>{display.user.letter}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-[14px] cursor-pointer" onClick={() => handleViewProfile(display.user)}>{display.user.name}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f0fdf4] text-green-700 border border-green-100">{display.tag}</span>
                            <span className="text-[11px] text-gray-400">• {isRepost ? display.time : tp.time}</span>
                          </div>
                          <div className={`mt-2 text-[14px] leading-6 whitespace-pre-wrap ${isRepost ? "p-3 rounded-2xl border border-gray-200 bg-[#fafafa]" : ""}`}>{display.text}</div>
                          <div className="flex items-center gap-2 mt-3 text-gray-500 flex-wrap">
                            <button type="button" className="h-8 px-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-1 text-[13px] cursor-pointer" onClick={() => toggleThreadComments(tp.id)}>💬 {tp.comments?.length || 0}</button>
                            <button type="button" className="h-8 px-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-1 text-[13px] cursor-pointer" onClick={() => { console.log("thread share", display.id); setSharePost({ ...display, source: "thread", id: tp.id }); }}>🔁 {tp.shareCount || 0}</button>
                            <button type="button" className={`h-8 px-3 rounded-full flex items-center gap-1 text-[13px] cursor-pointer bg-gray-100 hover:bg-red-50 hover:text-red-500`} onClick={() => { console.log("thread like", tp.id); setThreadPosts(prev => prev.map(p => p.id === tp.id ? { ...p, likes: p.likes + 1 } : p)); }}>❤️ {tp.likes}</button>
                            <button type="button" className="h-8 px-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-1 text-[13px] cursor-pointer" onClick={() => { console.log("thread share", tp.id); setSharePost({ ...display, source: "thread" }); }}>📤 {tp.shareCount || 0}</button>
                          </div>
                          {tp.showComments && (
                            <div className="mt-4 bg-[#fafafa] rounded-2xl p-3 border border-gray-100">
                              <div className="border-r-2 border-gray-200 pr-3 mr-1 space-y-3 max-h-[260px] overflow-y-auto">
                                {(tp.comments || []).map((c: any) => (
                                  <div key={c.id} className="flex gap-2">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ backgroundColor: c.user.color }}>{c.user.letter}</div>
                                    <div className="flex-1 bg-white rounded-2xl rounded-tr-sm px-3 py-2 border border-gray-100">
                                      <span className="font-bold text-[12px]">{c.user.name}</span> <span className="text-[12px] text-zinc-700">{c.text}</span>
                                      <div className="text-[10px] text-gray-400 mt-1">{c.time}</div>
                                    </div>
                                  </div>
                                ))}
                                {(!tp.comments || tp.comments.length === 0) && <div className="text-[12px] text-gray-400 py-2">لا توجد تعليقات بعد</div>}
                              </div>
                              <div className="flex gap-2 mt-3">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ backgroundColor: currentUser?.color || "#2e7d32" }}>{currentUser?.letter || "أ"}</div>
                                <input value={newCommentTexts[tp.id] || ""} onChange={e => setNewCommentTexts({ ...newCommentTexts, [tp.id]: e.target.value })} onKeyDown={e => { if (e.key === "Enter") handleAddThreadComment(tp.id); }} placeholder="أضف تعليقا..." className="flex-1 bg-white border border-gray-200 rounded-full px-3 py-2 text-[13px] outline-none focus:border-black/20" />
                                <button type="button" onClick={() => handleAddThreadComment(tp.id)} className="bg-black text-white rounded-full px-3 py-2 text-[12px] font-bold cursor-pointer hover:bg-zinc-800">إرسال</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "prices" && (
              <div className="space-y-4">
                <div className="bg-white lg:rounded-2xl border border-gray-200 p-4">
                  <h3 className="font-extrabold text-[15px] mb-3">📈 أسعار اليوم - سوق العبور</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {PRICE_DATA.slice(0, 3).map((r, i) => (
                      <div key={r.crop} className="rounded-xl bg-[#f6f6f6] p-3 border">
                        <div className="text-[10px] text-gray-500">#{i + 1} الأكثر ارتفاعا</div>
                        <div className="font-bold text-[13px]">{r.crop}</div>
                        <div className="text-[12px]">{r.today} جنيه</div>
                        <div className={`text-[11px] font-bold ${r.change >= 0 ? "text-green-600" : "text-red-600"}`}>{r.change >= 0 ? "▲" : "▼"} {Math.abs(r.change)}%</div>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead><tr className="text-[11px] text-gray-500 border-b"><th className="py-2 font-medium">المحصول</th><th className="py-2">اليوم</th><th className="py-2">الأمس</th><th className="py-2">التغير</th><th className="py-2">السوق</th></tr></thead>
                      <tbody>
                        {PRICE_DATA.map(r => (
                          <tr key={r.crop} className="border-b border-gray-50 text-[13px] hover:bg-gray-50">
                            <td className="py-3 font-bold flex items-center gap-2"><span>{CROP_EMOJI[r.crop.split(" ")[0]] || "🌿"}</span> {r.crop}</td>
                            <td className="py-3">{r.today}</td>
                            <td className="py-3 text-gray-500">{r.yesterday}</td>
                            <td className={`py-3 font-bold ${r.change >= 0 ? "text-green-600" : "text-red-600"}`}>{r.change > 0 ? "+" : ""}{r.change.toFixed(1)}%</td>
                            <td className="py-3 text-[12px] text-gray-500">{r.market}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="bg-white lg:rounded-2xl border border-gray-200 overflow-hidden min-h-[600px] flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-3"><h2 className="font-extrabold text-[16px]">الرسائل ✉️</h2><span className="text-[11px] bg-blue-500 text-white px-2 py-1 rounded-full">{totalUnread} جديد</span></div>
                  <div className="h-10 rounded-full bg-[#f5f5f5] flex items-center px-4 gap-2"><span>🔍</span><input placeholder="بحث في الرسائل" className="flex-1 bg-transparent outline-none text-[13px]" onChange={e => console.log("msg search", e.target.value)} /></div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.map(conv => (
                    <button key={conv.id} type="button" className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-right cursor-pointer border-b border-gray-50" onClick={() => { console.log("open conv", conv.id); setSelectedConv(conv.id); }}>
                      <div className="relative"><div style={{ backgroundColor: conv.user.color }} className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-[16px]">{conv.user.letter}</div>{conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}</div>
                      <div className="flex-1 min-w-0"><div className="flex justify-between"><span className="font-bold text-[14px] truncate">{conv.user.name}</span><span className="text-[11px] text-gray-400">{conv.time}</span></div><div className="flex justify-between"><span className="text-[13px] text-gray-500 truncate max-w-[180px]">{conv.lastMessage}</span>{conv.unread > 0 && <span className="min-w-[20px] h-5 rounded-full bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center px-1.5">{conv.unread}</span>}</div></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white lg:rounded-2xl border border-gray-200 overflow-hidden">
                {viewedProfile && (
                  <div className="p-3 border-b bg-gray-50 flex items-center gap-2">
                    <button type="button" className="h-8 px-4 rounded-full bg-white border font-bold text-[13px] cursor-pointer hover:bg-gray-100" onClick={() => { console.log("BACK TO MY PROFILE"); setViewedProfile(null); }}>← رجوع</button>
                    <span className="text-[13px] text-gray-500">عرض ملف {viewedProfile.name}</span>
                  </div>
                )}
                {(() => {
                  const profileUser = viewedProfile || currentUser;
                  if (!profileUser) return null;
                  const userPosts = posts.filter(p => p.user.id === profileUser.id);
                return (
                    <div className="">
                      {/* HEADER - stays same */}
                      <div className="p-5">
                        <div className="flex gap-5">
                          <div className="relative shrink-0">
                            <div style={{ backgroundColor: profileUser.color }} className="w-[86px] h-[86px] rounded-full flex items-center justify-center text-white font-bold text-[32px] border-[3px] border-white shadow-[0_0_0_2px_#e5e7eb] overflow-hidden">
                              {profileUser.emoji ? <span className="text-[42px]">{profileUser.emoji}</span> : profileUser.letter}
                            </div>
                            {!viewedProfile && (
                              <button type="button" className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[12px] border-2 border-white cursor-pointer hover:bg-zinc-800 shadow" onClick={() => {
                                console.log("open edit from avatar");
                                setEditForm({
                                  name: currentUser?.name || "",
                                  username: currentUser?.username || "",
                                  letter: currentUser?.letter || "أ",
                                  color: currentUser?.color || "#2e7d32",
                                  bio: currentUser?.bio || "",
                                  location: currentUser?.location || "البحيرة",
                                  role: currentUser?.role || "مزارع",
                                  type: currentUser?.type || "مزارع",
                                  phone: currentUser?.phone || "",
                                  link: currentUser?.link || "",
                                  emoji: currentUser?.emoji || "",
                                });
                                setIsEditModalOpen(true);
                              }}>✎</button>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap"><h2 className="font-bold text-[18px]">{profileUser.name}</h2><span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-bold">{profileUser.type || profileUser.role}</span>{profileUser.username && <span className="text-[12px] text-gray-500">@{profileUser.username}</span>}</div>
                            <div className="flex gap-6 mt-3">
                              {(() => {
                                const allUserMarketPosts = posts.filter(p => p.user.id === profileUser.id && !p.isRepost);
                                return (
                                  <>
                                    <div className="text-center"><div className="font-extrabold text-[16px]">{allUserMarketPosts.length}</div><div className="text-[11px] text-gray-500">منشورات</div></div>
                                    <div className="text-center"><div className="font-extrabold text-[16px]">{profileUser.followers}</div><div className="text-[11px] text-gray-500">متابعين</div></div>
                                    <div className="text-center"><div className="font-extrabold text-[16px]">{profileUser.following || 0}</div><div className="text-[11px] text-gray-500">يتابع</div></div>
                                  </>
                                );
                              })()}
                            </div>
                            <div className="mt-3 text-[13px] leading-5">
                              <div className="font-bold">{profileUser.role} - {profileUser.location}</div>
                              <div className="text-gray-600 line-clamp-2">{profileUser.bio}</div>
                              {(profileUser.link || profileUser.phone) && (
                                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                                  {profileUser.link && <span className="px-2 py-1 rounded-full bg-gray-100 border text-gray-700 flex items-center gap-1">🔗 {profileUser.link}</span>}
                                  {profileUser.phone && <span className="px-2 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 flex items-center gap-1">📱 {profileUser.phone}</span>}
                                </div>
                              )}
                            </div>
                            {!viewedProfile ? (
                              <div className="mt-4 flex gap-2">
                                <button type="button" className="h-9 px-5 rounded-xl bg-black text-white font-bold text-[13px] cursor-pointer hover:bg-zinc-800 flex items-center gap-2 transition" onClick={() => {
                                  console.log("edit profile click");
                                  setEditForm({
                                    name: currentUser?.name || "",
                                    username: currentUser?.username || "",
                                    letter: currentUser?.letter || "أ",
                                    color: currentUser?.color || "#2e7d32",
                                    bio: currentUser?.bio || "",
                                    location: currentUser?.location || "البحيرة",
                                    role: currentUser?.role || "مزارع",
                                    type: currentUser?.type || "مزارع",
                                    phone: currentUser?.phone || "",
                                    link: currentUser?.link || "",
                                    emoji: currentUser?.emoji || "",
                                  });
                                  setIsEditModalOpen(true);
                                }}>
                                  <span>✎</span> تعديل الملف الشخصي
                                </button>
                                <button type="button" className="h-9 px-4 rounded-xl bg-gray-100 font-bold text-[13px] cursor-pointer hover:bg-gray-200 flex items-center gap-1.5 transition" onClick={() => {
                                  console.log("share profile");
                                  const profileUrl = `${window.location.origin}${window.location.pathname}#profile-${profileUser.id || "me"}`;
                                  navigator.clipboard?.writeText(profileUrl).catch(()=>{});
                                  setToast("تم نسخ رابط الملف الشخصي ✓");
                                  setToastType("default");
                                }}>
                                  <span>📤</span> مشاركة
                                </button>
                              </div>
                            ) : (
                              <div className="mt-4 flex gap-2">
                                <button type="button" className="h-9 px-6 rounded-xl bg-black text-white font-bold text-[13px] cursor-pointer hover:bg-zinc-800 flex items-center gap-2 transition" onClick={() => {
                                  console.log("follow", viewedProfile.name);
                                  setToast(`تابعت ${viewedProfile.name} ✓`);
                                  setToastType("success");
                                }}>
                                  <span>＋</span> متابعة
                                </button>
                                <button type="button" className="h-9 px-5 rounded-xl bg-gray-100 font-bold text-[13px] cursor-pointer hover:bg-gray-200 transition" onClick={() => { console.log("message viewed user"); setActiveTab("messages"); }}>مراسلة</button>
                                <button type="button" className="h-9 px-4 rounded-xl bg-green-50 text-green-700 border border-green-100 font-bold text-[13px] cursor-pointer hover:bg-green-100 transition" onClick={() => { console.log("call"); setToast(`جاري الاتصال بـ ${viewedProfile.name} 📞`); }}>اتصال</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* TABS INSIDE PROFILE */}
                      {(() => {
                        const allUserMarketPosts = posts.filter(p => p.user.id === profileUser.id && !p.isRepost);
                        const userRepostsMarket = posts.filter(p => p.user.id === profileUser.id && p.isRepost);
                        const userRepostsThread = threadPosts.filter(t => t.user.id === profileUser.id && (t as any).isRepost);
                        const userRepostsCombined = [...userRepostsMarket, ...userRepostsThread];
                        const userThreads = threadPosts.filter(t => t.user.id === profileUser.id && !(t as any).isRepost);
                        const userThreadsAll = threadPosts.filter(t => t.user.id === profileUser.id);
                        const savedMarketPosts = posts.filter(p => savedIds.includes(p.id));
                        const savedThreads = threadPosts.filter(t => savedIds.includes(t.id));
                        const savedCombined = [...savedMarketPosts, ...savedThreads];
                        return (
                          <>
                            <div className="sticky top-0 z-10 bg-white border-y border-gray-200">
                              <div className="flex items-center justify-between px-1">
                                <div className="flex gap-0 overflow-x-auto scrollbar-none flex-1">
                                  {[
                                    { id: "posts", label: "منشوراتي", count: allUserMarketPosts.length, icon: "🧺" },
                                    { id: "reposts", label: "مشاركاتي", count: userRepostsCombined.length, icon: "🔁" },
                                    { id: "threads", label: "الثريد", count: userThreadsAll.length, icon: "💬" },
                                    { id: "saved", label: "المحفوظات", count: savedCombined.length, icon: "☆" },
                                  ].map(tab => {
                                    const active = profileTab === tab.id;
                                    return (
                                      <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => { console.log("profile tab", tab.id); setProfileTab(tab.id as any); }}
                                        className={`relative shrink-0 h-[48px] px-4 flex items-center gap-1.5 text-[13px] cursor-pointer transition border-b-[2.5px] ${active ? "border-black text-black font-extrabold" : "border-transparent text-gray-500 hover:text-black font-bold"}`}
                                      >
                                        <span className="text-[14px]">{tab.icon}</span>
                                        <span>{tab.label}</span>
                                        {tab.count > 0 && <span className={`min-w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center px-1 ${active ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>{tab.count}</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                                {(profileTab === "posts" || profileTab === "saved") && (
                                  <div className="flex items-center gap-1 pl-2 ml-2 border-r border-gray-100 pr-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => { console.log("profile view grid"); setProfileViewMode("grid"); }}
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition ${profileViewMode === "grid" ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                                      title="شبكة"
                                    >
                                      <span className="text-[14px]">⊞</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => { console.log("profile view list"); setProfileViewMode("list"); }}
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition ${profileViewMode === "list" ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                                      title="قائمة"
                                    >
                                      <span className="text-[14px]">☰</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="bg-[#fafafa] min-h-[360px]">
                              {/* منشوراتي */}
                              {profileTab === "posts" && (
                                <>
                                  {allUserMarketPosts.length === 0 ? (
                                    <div className="py-16 px-6 text-center bg-white">
                                      <div className="w-20 h-20 mx-auto rounded-full bg-[#f5f5f5] flex items-center justify-center text-[34px] mb-4">🌱</div>
                                      <div className="font-extrabold text-[15px]">لا توجد منشورات بعد</div>
                                      <div className="text-[12px] text-gray-500 mt-1 max-w-[240px] mx-auto">شارك أول محصول لك في السوق وابدأ البيع مباشرة</div>
                                      {!viewedProfile && <button type="button" onClick={() => { console.log("add post from empty"); setShowCreate(true); }} className="mt-4 h-10 px-6 rounded-full bg-black text-white font-bold text-[13px] cursor-pointer hover:bg-zinc-800">إضافة منشور +</button>}
                                    </div>
                                  ) : profileViewMode === "grid" ? (
                                    <div className="grid grid-cols-3 gap-[2px] lg:gap-1 p-[2px] lg:p-1 bg-white">
                                      {allUserMarketPosts.map(p => {
                                        const bg = CROP_BG[p.cropType] || "bg-gradient-to-br from-gray-50 to-stone-50 border-gray-100";
                                        return (
                                          <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => { console.log("open profile post", p.id); setProfilePostModal(p); }}
                                            className={`group relative aspect-square rounded-xl overflow-hidden border cursor-pointer text-right ${bg}`}
                                          >
                                            {p.isRepost && (
                                              <div className="absolute top-1.5 right-1.5 z-20 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] font-bold shadow">🔁</div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                              <div className="text-[46px] lg:text-[56px] leading-none group-active:scale-95 transition-transform duration-200 select-none">{p.emoji}</div>
                                            </div>
                                            <div className="absolute top-1.5 left-1.5 z-10">
                                              <div className="px-2 py-[3px] rounded-full bg-white/90 backdrop-blur text-[11px] font-extrabold shadow-sm border border-white text-black flex items-center gap-0.5">
                                                {p.price}ج
                                              </div>
                                            </div>
                                            <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                                            <div className="absolute bottom-0 inset-x-0 p-2 flex flex-col gap-0.5">
                                              <div className="text-white font-extrabold text-[11px] leading-tight drop-shadow flex items-center gap-1">
                                                <span className="truncate">{p.cropType}</span>
                                                <span className="w-1 h-1 bg-white/70 rounded-full shrink-0" />
                                                <span className="truncate font-bold opacity-90">{p.variety}</span>
                                              </div>
                                              <div className="text-white/90 text-[10px] font-bold flex items-center gap-1">
                                                <span>📦</span><span className="truncate">{p.quantity}</span>
                                              </div>
                                            </div>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                              <div className="flex items-center gap-3 text-white font-bold text-[12px]">
                                                <span className="flex items-center gap-1">❤️ {p.likes}</span>
                                                <span className="flex items-center gap-1">💬 {p.comments?.length || 0}</span>
                                              </div>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="p-3 space-y-3 bg-[#fafafa]">
                                      {allUserMarketPosts.map(p => {
                                        const bg = CROP_BG_SIMPLE[p.cropType] || "bg-[#f7f7f2]";
                                        return (
                                          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-sm transition">
                                            <div className="flex">
                                              <button type="button" onClick={() => setProfilePostModal(p)} className={`w-[110px] aspect-square ${bg} flex items-center justify-center text-[44px] shrink-0 cursor-pointer relative`}>
                                                <span>{p.emoji}</span>
                                                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-bold shadow">{p.price}ج</span>
                                              </button>
                                              <div className="flex-1 p-3 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold">{p.cropType}</span>
                                                  <span className="text-[11px] text-gray-500">{p.quantity} • {p.variety}</span>
                                                </div>
                                                <div className="text-[13px] font-bold leading-5 line-clamp-2">{p.caption}</div>
                                                <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                                                  <span>❤️ {p.likes}</span><span>💬 {p.comments?.length || 0}</span><span>📍 {p.location}</span><span>• {p.time}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              )}

                              {profileTab === "reposts" && (
                                <>
                                  {userRepostsCombined.length === 0 ? (
                                    <div className="py-16 px-6 text-center bg-white">
                                      <div className="w-20 h-20 mx-auto rounded-full bg-[#f0fdf4] flex items-center justify-center text-[34px] mb-4">🔁</div>
                                      <div className="font-extrabold text-[15px]">لا توجد مشاركات بعد</div>
                                      <div className="text-[12px] text-gray-500 mt-1">عند مشاركة منشورات إلى بروفايلك ستظهر هنا</div>
                                    </div>
                                  ) : (
                                    <div className="p-3 space-y-3">
                                      {userRepostsCombined.map((p: any) => {
                                        const original = p.originalPost || p;
                                        const isThreadRepost = !original.cropType && !!original.text;
                                        return (
                                          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-3 hover:shadow-sm transition">
                                            <div className="flex items-center gap-2 mb-2">
                                              <div className="w-7 h-7 rounded-full bg-[#0a7d2e] flex items-center justify-center text-white text-[11px]">🔁</div>
                                              <div className="text-[12px]">
                                                <span className="font-bold">{p.user.name}</span>
                                                <span className="text-gray-500"> شارك منشورا • {p.time}</span>
                                              </div>
                                              <span className="mr-auto text-[10px] px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 font-bold">من {p.repostedFrom?.name || original.user?.name || "مزارع"}</span>
                                            </div>
                                            {isThreadRepost ? (
                                              <div className="rounded-2xl border border-gray-200 bg-[#fafafa] p-3">
                                                <div className="flex gap-2">
                                                  <div style={{ backgroundColor: original.user?.color }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0">{original.user?.letter}</div>
                                                  <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-[13px]">{original.user?.name}</div>
                                                    <div className="text-[13px] leading-5 whitespace-pre-wrap mt-1">{original.text}</div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="rounded-2xl border border-gray-200 overflow-hidden flex">
                                                <div className={`${CROP_BG_SIMPLE[original.cropType] || "bg-[#f7f7f2]"} w-[90px] aspect-square flex items-center justify-center text-[36px] shrink-0`}>{original.emoji}</div>
                                                <div className="p-3 flex-1 min-w-0">
                                                  <div className="flex items-center gap-2">
                                                    <span className="font-bold text-[13px]">{original.user?.name}</span>
                                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-black text-white">{original.cropType}</span>
                                                    <span className="text-[11px] text-gray-500">{original.price}ج</span>
                                                  </div>
                                                  <div className="text-[12px] text-gray-700 mt-1 line-clamp-2 leading-5">{original.caption}</div>
                                                  <div className="text-[11px] text-gray-400 mt-1">📦 {original.quantity} • 📍 {original.location}</div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              )}

                              {profileTab === "threads" && (
                                <>
                                  {userThreads.length === 0 && userRepostsThread.length === 0 ? (
                                    <div className="py-16 px-6 text-center bg-white">
                                      <div className="w-20 h-20 mx-auto rounded-full bg-[#f5f5f5] flex items-center justify-center text-[34px] mb-4">💬</div>
                                      <div className="font-extrabold text-[15px]">لم تنشر في الثريد بعد</div>
                                      <div className="text-[12px] text-gray-500 mt-1">شارك نصائحك وخبراتك مع مجتمع المزارعين</div>
                                    </div>
                                  ) : (
                                    <div className="divide-y divide-gray-100 bg-white">
                                      {[...userThreads, ...userRepostsThread].map((tp: any) => {
                                        const isRepost = !!(tp as any).isRepost;
                                        const display = isRepost && (tp as any).originalPost ? (tp as any).originalPost : tp;
                                        return (
                                          <div key={tp.id} className="p-4 hover:bg-gray-50/50 transition">
                                            {isRepost && (
                                              <div className="flex items-center gap-1.5 mb-2 text-[11px] text-green-700 font-bold">
                                                <span>🔁</span> مشاركة من {tp.repostedFrom?.name || display.user?.name}
                                              </div>
                                            )}
                                            <div className="flex gap-3">
                                              <div style={{ backgroundColor: display.user?.color || profileUser.color }} className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[13px] shrink-0">{display.user?.letter || profileUser.letter}</div>
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                  <span className="font-bold text-[13px]">{display.user?.name || profileUser.name}</span>
                                                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f0fdf4] text-green-700 border border-green-100">{display.tag || "ثريد"}</span>
                                                  <span className="text-[11px] text-gray-400">• {isRepost ? display.time : tp.time}</span>
                                                </div>
                                                <div className="mt-1.5 text-[13px] leading-6 whitespace-pre-wrap">{display.text}</div>
                                                <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                                                  <span>❤️ {tp.likes}</span><span>🔁 {tp.shareCount || 0}</span><span>💬 {tp.comments?.length || 0}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              )}

                              {profileTab === "saved" && (
                                <>
                                  {savedCombined.length === 0 ? (
                                    <div className="py-16 px-6 text-center bg-white">
                                      <div className="w-20 h-20 mx-auto rounded-full bg-[#fff8e1] flex items-center justify-center text-[34px] mb-4">☆</div>
                                      <div className="font-extrabold text-[15px]">لا توجد محفوظات</div>
                                      <div className="text-[12px] text-gray-500 mt-1">احفظ المنشورات المهمة لتجدها هنا لاحقا</div>
                                    </div>
                                  ) : profileViewMode === "grid" ? (
                                    <div className="grid grid-cols-3 gap-[2px] lg:gap-1 p-[2px] lg:p-1 bg-white">
                                      {savedMarketPosts.map((p: any) => {
                                        const bg = CROP_BG[p.cropType] || "bg-gradient-to-br from-gray-50 to-stone-50 border-gray-100";
                                        return (
                                          <button key={p.id} type="button" onClick={() => setProfilePostModal(p)} className={`group relative aspect-square rounded-xl overflow-hidden border cursor-pointer ${bg}`}>
                                            <div className="absolute inset-0 flex items-center justify-center text-[46px]">{p.emoji}</div>
                                            <div className="absolute top-1.5 left-1.5 px-2 py-[3px] rounded-full bg-white/90 backdrop-blur text-[11px] font-bold shadow border border-white">{p.price}ج</div>
                                            <div className="absolute bottom-0 inset-x-0 h-[50%] bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-1.5 right-1.5 left-1.5 flex justify-between items-end">
                                              <span className="text-white text-[10px] font-bold truncate drop-shadow">{p.cropType}</span>
                                              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[12px] shadow">★</span>
                                            </div>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                                              <span className="text-white text-[12px] font-bold">عرض المنشور</span>
                                            </div>
                                          </button>
                                        );
                                      })}
                                      {savedThreads.map((t: any) => (
                                        <div key={t.id} className="aspect-square rounded-xl border bg-[#fafafa] p-2 flex flex-col overflow-hidden">
                                          <div className="flex items-center gap-1.5 mb-1">
                                            <div style={{ backgroundColor: t.user.color }} className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold">{t.user.letter}</div>
                                            <span className="text-[10px] font-bold truncate">{t.user.name}</span>
                                          </div>
                                          <div className="text-[10px] leading-4 line-clamp-[6] text-gray-700">{t.text}</div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="p-3 space-y-3">
                                      {savedCombined.map((p: any) => {
                                        if (p.text) {
                                          return (
                                            <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-3 flex gap-3">
                                              <div style={{ backgroundColor: p.user.color }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0">{p.user.letter}</div>
                                              <div className="flex-1 min-w-0"><div className="font-bold text-[13px]">{p.user.name}</div><div className="text-[13px] leading-5 mt-1 line-clamp-3">{p.text}</div></div>
                                            </div>
                                          );
                                        }
                                        return (
                                          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex">
                                            <div className={`${CROP_BG_SIMPLE[p.cropType] || "bg-gray-50"} w-[100px] aspect-square flex items-center justify-center text-[40px] shrink-0`}>{p.emoji}</div>
                                            <div className="p-3 flex-1 min-w-0"><div className="font-bold text-[13px] flex items-center gap-2"><span>{p.cropType}</span><span className="text-[11px] bg-black text-white px-2 py-0.5 rounded-full">{p.price}ج</span></div><div className="text-[12px] mt-1 line-clamp-2">{p.caption}</div></div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>

                            {profilePostModal && (
                              <div className="fixed inset-0 bg-black/60 z-[90] flex items-end lg:items-center justify-center p-0 lg:p-4" onClick={() => setProfilePostModal(null)}>
                                <div className="w-full max-w-[480px] bg-white rounded-t-[24px] lg:rounded-[24px] overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                                  <div className="sticky top-0 bg-white border-b p-3 flex items-center justify-between z-10">
                                    <button type="button" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200" onClick={() => setProfilePostModal(null)}>✕</button>
                                    <span className="font-bold text-[14px]">{profilePostModal.cropType} • {profilePostModal.variety}</span>
                                    <button type="button" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200" onClick={() => { console.log("share from modal", profilePostModal.id); setSharePost({ ...profilePostModal, source: "souq" }); setProfilePostModal(null); }}>📤</button>
                                  </div>
                                  <div className="relative aspect-square bg-[#f7f7f2] flex items-center justify-center">
                                    <div className="text-[120px] leading-none">{profilePostModal.emoji}</div>
                                    <div className="absolute top-3 right-3 flex gap-2">
                                      <span className="px-3 py-1 rounded-full bg-black/80 text-white text-[12px] font-bold">{profilePostModal.cropType}</span>
                                      <span className="px-3 py-1 rounded-full bg-white/90 text-black text-[12px] font-bold backdrop-blur">{profilePostModal.price}ج / كيلو</span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 h-7 flex items-center gap-1 text-[12px] font-bold shadow">📦 {profilePostModal.quantity} • {profilePostModal.variety}</div>
                                  </div>
                                  <div className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div style={{ backgroundColor: profilePostModal.user.color }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[13px]">{profilePostModal.user.letter}</div>
                                        <div><div className="font-bold text-[13px]">{profilePostModal.user.name}</div><div className="text-[11px] text-gray-500">📍 {profilePostModal.location} • {profilePostModal.time}</div></div>
                                      </div>
                                      <button type="button" className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${savedIds.includes(profilePostModal.id) ? "bg-black text-white" : "bg-gray-100"}`} onClick={() => { const isSaved = savedIds.includes(profilePostModal.id); setSavedIds(prev => isSaved ? prev.filter(x=>x!==profilePostModal.id) : [...prev, profilePostModal.id]); setToast(isSaved ? "تم إلغاء الحفظ" : "تم حفظ المنشور ✓"); }}>★</button>
                                    </div>
                                    <div className="mt-3 text-[14px] leading-6"><span className="font-bold">{profilePostModal.user.name}</span> {profilePostModal.caption}</div>
                                    <div className="mt-4 flex items-center gap-2">
                                      <button type="button" className="flex-1 h-11 rounded-full bg-black text-white font-bold text-[13px] cursor-pointer hover:bg-zinc-800" onClick={() => { setProfilePostModal(null); setActiveTab("messages"); }}>مراسلة البائع ✉️</button>
                                      <button type="button" className="h-11 px-4 rounded-full bg-gray-100 font-bold text-[13px] cursor-pointer hover:bg-gray-200" onClick={() => setProfilePostModal(null)}>إغلاق</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-[72px] flex items-center justify-around z-40 px-1">
        {[
          { id: "souq", label: "السوق", icon: "🧺" },
          { id: "thread", label: "ثريد", icon: "💬" },
          { id: "create", icon: "+", isPlus: true },
          { id: "prices", label: "الأسعار", icon: "📈" },
          { id: "messages", label: "الرسائل", icon: "✉️", badge: totalUnread },
        ].map((item: any) => {
          if (item.isPlus) {
            return <button key="create" type="button" className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-[22px] font-bold shadow-lg -mt-3 cursor-pointer" onClick={() => { console.log("mobile create click"); setShowCreate(true); }}>+</button>;
          }
          const active = activeTab === item.id;
          return (
            <button key={item.id} type="button" className={`flex flex-col items-center gap-0.5 relative cursor-pointer ${active ? "text-black" : "text-gray-400"}`} onClick={() => { console.log("mobile tab", item.id); setActiveTab(item.id as any); if (item.id !== "profile") setViewedProfile(null); }}>
              <div className="relative text-[20px]">{item.icon}{item.badge > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />}</div>
              <span className={`text-[10px] ${active ? "font-bold" : ""}`}>{item.label}</span>
            </button>
          );
        })}
        <button type="button" className={`flex flex-col items-center gap-0.5 cursor-pointer ${activeTab === "profile" ? "text-black" : "text-gray-400"}`} onClick={() => { console.log("mobile profile tab"); setViewedProfile(null); setActiveTab("profile"); }}>
          <div style={{ backgroundColor: currentUser?.color }} className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[12px] font-bold ${activeTab === "profile" ? "ring-2 ring-black" : ""}`}>{currentUser?.letter}</div>
          <span className="text-[10px]">الملف</span>
        </button>
      </nav>

      {/* Create Market Post Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-end lg:items-center justify-center p-0 lg:p-4">
          <div className="w-full max-w-[520px] bg-white rounded-t-[24px] lg:rounded-[24px] max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between rounded-t-[24px]">
              <button type="button" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer" onClick={() => { console.log("close create modal"); setShowCreate(false); }}>✕</button>
              <span className="font-bold">منشور جديد في السوق</span>
              <button
                type="button"
                className="h-8 px-5 rounded-full bg-black text-white font-bold text-[13px] cursor-pointer"
                onClick={() => {
                  console.log("CREATE MARKET POST CLICKED", newMarket);
                  if (!newMarket.caption && !newMarket.quantity) return;
                  const newP = { id: "p" + Date.now(), user: currentUser, cropType: newMarket.cropType, variety: newMarket.variety || "بلدي", quantity: newMarket.quantity || "1 طن", price: Number(newMarket.price) || 10, location: newMarket.location, caption: newMarket.caption || `${newMarket.cropType} ${newMarket.variety}`, emoji: CROP_EMOJI[newMarket.cropType] || "🍅", likes: 0, time: "الآن", liked: false, shareCount: 0, showComments: false, comments: [] };
                  setPosts([newP, ...posts]);
                  setShowCreate(false);
                  setNewMarket({ cropType: "طماطم", variety: "", quantity: "", price: "", caption: "", location: "البحيرة", emoji: "🍅" });
                  setActiveTab("souq");
                }}
              >
                نشر
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="aspect-square rounded-2xl bg-[#f7f7f2] flex flex-col items-center justify-center gap-2 border-2 border-dashed">
                <div className="text-[80px]">{CROP_EMOJI[newMarket.cropType] || "🍅"}</div>
                <div className="text-[12px] text-gray-500">سيتم عرض المحصول بهذا الشكل - بدون صور خارجية</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[11px] font-bold">نوع المحصول</label><select value={newMarket.cropType} onChange={e => { console.log("crop type change", e.target.value); setNewMarket({ ...newMarket, cropType: e.target.value }); }} className="mt-1 w-full h-11 rounded-xl bg-gray-100 px-3 text-[13px] outline-none"><option>طماطم</option><option>مانجو</option><option>بطاطس</option><option>فراولة</option><option>بصل</option><option>برتقال</option></select></div>
                <div><label className="text-[11px] font-bold">الصنف</label><input value={newMarket.variety} onChange={e => setNewMarket({ ...newMarket, variety: e.target.value })} placeholder="مثال: 023" className="mt-1 w-full h-11 rounded-xl bg-gray-100 px-3 text-[13px] outline-none" /></div>
                <div><label className="text-[11px] font-bold">الكمية</label><input value={newMarket.quantity} onChange={e => setNewMarket({ ...newMarket, quantity: e.target.value })} placeholder="5 طن" className="mt-1 w-full h-11 rounded-xl bg-gray-100 px-3 text-[13px] outline-none" /></div>
                <div><label className="text-[11px] font-bold">السعر للكيلو</label><input type="number" value={newMarket.price} onChange={e => setNewMarket({ ...newMarket, price: e.target.value })} placeholder="8.5" className="mt-1 w-full h-11 rounded-xl bg-gray-100 px-3 text-[13px] outline-none" /></div>
                <div className="col-span-2"><label className="text-[11px] font-bold">المحافظة</label><select value={newMarket.location} onChange={e => setNewMarket({ ...newMarket, location: e.target.value })} className="mt-1 w-full h-11 rounded-xl bg-gray-100 px-3 text-[13px] outline-none"><option>البحيرة</option><option>الإسماعيلية</option><option>المنيا</option><option>القليوبية</option><option>سوق العبور</option></select></div>
              </div>
              <div><label className="text-[11px] font-bold">الوصف</label><textarea value={newMarket.caption} onChange={e => setNewMarket({ ...newMarket, caption: e.target.value })} placeholder="اكتب تفاصيل المحصول..." className="mt-1 w-full min-h-[80px] rounded-xl bg-gray-100 p-3 text-[13px] outline-none resize-none" /></div>
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {sharePost && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-end lg:items-center justify-center p-0 lg:p-4">
          <div className="w-full max-w-[420px] bg-white rounded-t-[24px] lg:rounded-[24px] overflow-hidden shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b">
              <span className="font-extrabold text-[15px]">مشاركة المنشور</span>
              <button type="button" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200" onClick={() => { console.log("close share"); setSharePost(null); }}>✕</button>
            </div>
            <div className="p-4">
              <div className="flex gap-3 bg-[#f9f9f9] rounded-2xl p-3 border border-gray-100 mb-4">
                <div style={{ backgroundColor: sharePost.user.color }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0">{sharePost.user.letter}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[13px]">{sharePost.user.name}</div>
                  <div className="text-[12px] text-gray-600 line-clamp-2 leading-5">{sharePost.caption || sharePost.text}</div>
                </div>
                <div className="text-[28px] leading-none">{sharePost.emoji || "💬"}</div>
              </div>
              <div className="space-y-1">
                <button type="button" className="w-full h-[62px] rounded-xl hover:bg-green-50 flex items-center gap-3 px-3 cursor-pointer border border-green-200 bg-green-50/60 hover:border-green-300 transition" onClick={() => handleShareToMyProfile(sharePost)}>
                  <div className="w-10 h-10 rounded-full bg-[#0a7d2e] flex items-center justify-center text-[18px] text-white">👤</div>
                  <div className="flex-1 text-right"><div className="font-bold text-[13px] text-green-800">المشاركة إلى بروفايلي في ContCrops</div><div className="text-[11px] text-green-700">سيظهر المنشور في ملفك الشخصي</div></div>
                  <span className="text-green-600 text-[14px] font-bold">↗</span>
                </button>
                <div className="h-[1px] bg-gray-100 my-2" />
                <button type="button" className="w-full h-14 rounded-xl hover:bg-gray-50 flex items-center gap-3 px-3 cursor-pointer border border-transparent hover:border-gray-100 transition" onClick={() => handleCopyLink(sharePost)}>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[18px]">🔗</div>
                  <div className="flex-1 text-right"><div className="font-bold text-[13px]">نسخ الرابط</div><div className="text-[11px] text-gray-500">انسخ رابط المنشور</div></div>
                  <span className="text-gray-300">‹</span>
                </button>
                <button type="button" className="w-full h-14 rounded-xl hover:bg-gray-50 flex items-center gap-3 px-3 cursor-pointer border border-transparent hover:border-gray-100 transition" onClick={() => { console.log("share whatsapp"); const txt = sharePost.caption || sharePost.text || ""; window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, "_blank"); }}>
                  <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[18px]">💬</div>
                  <div className="flex-1 text-right"><div className="font-bold text-[13px]">مشاركة على واتساب</div><div className="text-[11px] text-gray-500">أرسل عبر واتساب</div></div>
                  <span className="text-gray-300">‹</span>
                </button>
                <button type="button" className="w-full h-14 rounded-xl hover:bg-gray-50 flex items-center gap-3 px-3 cursor-pointer border border-transparent hover:border-gray-100 transition" onClick={() => { console.log("share fb"); const txt = sharePost.caption || sharePost.text || ""; window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(txt)}`, "_blank"); }}>
                  <div className="w-10 h-10 rounded-full bg-[#e3f2fd] flex items-center justify-center text-[18px]">📘</div>
                  <div className="flex-1 text-right"><div className="font-bold text-[13px]">مشاركة على فيسبوك</div><div className="text-[11px] text-gray-500">شارك على فيسبوك</div></div>
                  <span className="text-gray-300">‹</span>
                </button>
                <button type="button" className="w-full h-14 rounded-xl hover:bg-gray-50 flex items-center gap-3 px-3 cursor-pointer border border-transparent hover:border-gray-100 transition" onClick={() => { console.log("send as message"); setSharePost(null); setActiveTab("messages"); setToast("افتح محادثة لإرسال المنشور ✉️"); setToastType("default"); }}>
                  <div className="w-10 h-10 rounded-full bg-[#f3e5f5] flex items-center justify-center text-[18px]">✉️</div>
                  <div className="flex-1 text-right"><div className="font-bold text-[13px]">إرسال كرسالة</div><div className="text-[11px] text-gray-500">أرسل في الرسائل الخاصة</div></div>
                  <span className="text-gray-300">‹</span>
                </button>
                <button type="button" className="w-full h-14 rounded-xl hover:bg-gray-50 flex items-center gap-3 px-3 cursor-pointer border border-transparent hover:border-gray-100 transition" onClick={() => { handleSaveToggle(sharePost); }}>
                  <div className="w-10 h-10 rounded-full bg-[#fff8e1] flex items-center justify-center text-[18px]">{savedIds.includes(sharePost.id) ? "★" : "☆"}</div>
                  <div className="flex-1 text-right"><div className="font-bold text-[13px]">{savedIds.includes(sharePost.id) ? "إلغاء الحفظ" : "حفظ المنشور"}</div><div className="text-[11px] text-gray-500">احفظه لوقت لاحق</div></div>
                  <span className="text-gray-300">‹</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className={`fixed bottom-[90px] lg:bottom-6 left-1/2 -translate-x-1/2 z-[90] px-5 py-3 rounded-full text-[13px] font-bold shadow-lg flex items-center gap-2 ${toastType === "success" ? "bg-[#0a7d2e] text-white" : "bg-black text-white"}`}>
          <span>{toast}</span>
        </div>
      )}

      {/* Chat full screen */}
      {selectedConv && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          {(() => {
            const conv = conversations.find(c => c.id === selectedConv)!;
            if (!conv) return null;
            return (
              <>
                <div className="h-[60px] border-b flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <button type="button" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer" onClick={() => { console.log("back from chat"); setSelectedConv(null); }}>→</button>
                    <div style={{ backgroundColor: conv.user.color }} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">{conv.user.letter}</div>
                    <div className="leading-tight"><div className="font-bold text-[14px]">{conv.user.name}</div><div className="text-[11px] text-green-600">{conv.online ? "متصل الآن" : "غير متصل"}</div></div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafafa]">
                  {conv.messages.map((m: any) => (
                    <div key={m.id} className={`flex ${m.sent ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-[18px] px-4 py-2.5 text-[13px] ${m.sent ? "bg-blue-500 text-white rounded-br-[4px]" : "bg-[#f0f0f0] text-black rounded-bl-[4px]"}`}>
                        <div>{m.text}</div><div className="text-[10px] opacity-70 mt-1">{m.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t bg-white">
                  <div className="h-[48px] rounded-full bg-[#f0f0f0] flex items-center gap-2 px-3">
                    <input value={newMessageText} onChange={e => setNewMessageText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { console.log("send via enter"); const convId = selectedConv; if (newMessageText.trim() && convId) { setConversations(prev => prev.map(c => c.id === convId ? { ...c, lastMessage: newMessageText, messages: [...c.messages, { id: Date.now().toString(), text: newMessageText, sent: true, time: "الآن" }] } : c)); setNewMessageText(""); } } }} placeholder="اكتب رسالة..." className="flex-1 bg-transparent outline-none text-[14px]" />
                    <button type="button" className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer" onClick={() => { console.log("send message click", newMessageText); if (newMessageText.trim() && selectedConv) { setConversations(prev => prev.map(c => c.id === selectedConv ? { ...c, lastMessage: newMessageText, messages: [...c.messages, { id: Date.now().toString(), text: newMessageText, sent: true, time: "الآن" }] } : c)); setNewMessageText(""); } }}>➤</button>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
      {/* STORY VIEWER - FULL SCREEN INSTAGRAM STYLE */}
      {storyViewerOpen && currentStoryUser && currentStoryItem && (
        <div className="fixed inset-0 bg-black z-[110] flex flex-col select-none" dir="rtl">
          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
            {currentStoryUser.stories.map((_: any, idx: number) => {
              let width = 0;
              if (idx < activeStoryItemIdx) width = 100;
              else if (idx === activeStoryItemIdx) width = storyProgress;
              else width = 0;
              return (
                <div key={idx} className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${width}%` }} />
                </div>
              );
            })}
          </div>
          {/* Header */}
          <div className="relative z-20 flex items-center justify-between p-4 pt-8">
            <div className="flex items-center gap-3">
              <div style={{ backgroundColor: currentStoryUser.user.color }} className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[14px] border border-white/20">
                {currentStoryUser.user.letter}
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-[13px]">{currentStoryUser.user.name}</span>
                  <span className="text-white/60 text-[11px]">{currentStoryItem.time}</span>
                </div>
                <div className="text-white/50 text-[11px]">{currentStoryUser.user.location} • {currentStoryUser.user.role}</div>
              </div>
            </div>
            <button type="button" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition" onClick={handleCloseStoryViewer}>
              ✕
            </button>
          </div>

          {/* Center content - gradient bg with emoji + caption */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* Gradient background from story */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentStoryItem.bg || "from-green-600 to-emerald-400"} opacity-95`} />
            {/* Subtle pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            
            {/* Click areas for prev/next */}
            <button
              type="button"
              className="absolute left-0 top-0 bottom-[80px] w-1/2 z-10 cursor-pointer"
              onClick={handlePrevStory}
              onMouseDown={() => setStoryPaused(true)}
              onMouseUp={() => setStoryPaused(false)}
              onTouchStart={() => setStoryPaused(true)}
              onTouchEnd={() => setStoryPaused(false)}
              aria-label="السابق"
            />
            <button
              type="button"
              className="absolute right-0 top-0 bottom-[80px] w-1/2 z-10 cursor-pointer"
              onClick={handleNextStory}
              onMouseDown={() => setStoryPaused(true)}
              onMouseUp={() => setStoryPaused(false)}
              onTouchStart={() => setStoryPaused(true)}
              onTouchEnd={() => setStoryPaused(false)}
              aria-label="التالي"
            />

            <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-[400px] w-full">
              <div className="text-[110px] lg:text-[140px] leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-[bounce_3s_infinite] select-none">
                {currentStoryItem.emoji}
              </div>
              <div className="mt-6 bg-black/25 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10">
                <p className="text-white font-bold text-[16px] lg:text-[18px] leading-7 drop-shadow">{currentStoryItem.caption}</p>
              </div>
              {/* indicators */}
              <div className="mt-8 flex items-center gap-2 text-white/70 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                <span>اضغط يمين/يسار للتنقل • استمرار 5 ثوان</span>
              </div>
            </div>
          </div>

          {/* Bottom reply bar */}
          <div className="relative z-20 p-3 pb-6 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-2 max-w-[600px] mx-auto">
              <div className="flex-1 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center px-4 gap-2">
                <input
                  value={storyReply}
                  onChange={(e) => setStoryReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && storyReply.trim()) {
                      console.log("story reply", storyReply);
                      setToast(`تم إرسال ردك إلى ${currentStoryUser.user.name} ✓`);
                      setStoryReply("");
                    }
                  }}
                  placeholder="رد على الحالة..."
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-white/60 text-[13px]"
                />
              </div>
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition"
                onClick={() => {
                  console.log("like story", currentStoryItem.id);
                  setToast("❤️ تم الإعجاب بالحالة");
                }}
              >
                <span className="text-[18px]">🤍</span>
              </button>
              <button
                type="button"
                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer transition disabled:opacity-50"
                disabled={!storyReply.trim()}
                onClick={() => {
                  if (!storyReply.trim()) return;
                  console.log("send story reply", storyReply);
                  setToast(`تم إرسال ردك إلى ${currentStoryUser.user.name} ✓`);
                  setStoryReply("");
                }}
              >
                ➤
              </button>
            </div>
            {/* User list indicator */}
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {combinedStoryUsers.map((su: any, idx: number) => (
                <div key={su.id} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeStoryUserIdx ? "bg-white w-6" : "bg-white/40"}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STORY CREATE MODAL */}
      {showStoryCreate && (
        <div className="fixed inset-0 bg-black/70 z-[120] flex items-end lg:items-center justify-center p-0 lg:p-4">
          <div className="w-full max-w-[420px] bg-white rounded-t-[28px] lg:rounded-[24px] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
              <button type="button" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200" onClick={() => { console.log("close story create"); setShowStoryCreate(false); }}>
                ✕
              </button>
              <span className="font-extrabold text-[14px]">إضافة حالة جديدة</span>
              <button
                type="button"
                className="h-8 px-5 rounded-full bg-black text-white font-bold text-[12px] cursor-pointer hover:bg-zinc-800 disabled:opacity-40"
                disabled={!newStoryCaption.trim()}
                onClick={() => {
                  console.log("publish story", newStoryCaption, newStoryEmoji, newStoryBg);
                  if (!newStoryCaption.trim()) return;
                  const newSt = {
                    id: "my-" + Date.now(),
                    emoji: newStoryEmoji,
                    caption: newStoryCaption,
                    time: "الآن",
                    bg: newStoryBg,
                  };
                  setMyStories((prev) => [...prev, newSt]);
                  setNewStoryCaption("");
                  setShowStoryCreate(false);
                  setToast("تم نشر حالتك ✓");
                  setToastType("success");
                  // auto open viewer to show new story
                  setTimeout(() => {
                    setActiveStoryUserIdx(0);
                    setActiveStoryItemIdx(myStories.length); // will be last
                    setStoryProgress(0);
                    setStoryViewerOpen(true);
                  }, 300);
                }}
              >
                نشر الحالة
              </button>
            </div>
            <div className="p-4 space-y-5">
              {/* Preview */}
              <div className={`w-full aspect-[9/12] rounded-[24px] bg-gradient-to-br ${newStoryBg} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-inner`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                <div className="relative z-10 text-[84px] leading-none drop-shadow-lg">{newStoryEmoji}</div>
                <div className="relative z-10 mt-4 bg-black/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10 max-w-[90%]">
                  <p className="text-white font-bold text-[15px] leading-6">{newStoryCaption || "اكتب حالتك هنا..."}</p>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full">
                  <div style={{ backgroundColor: currentUser?.color }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold">{currentUser?.letter}</div>
                  <span className="text-white text-[11px] font-bold">{currentUser?.name}</span>
                </div>
              </div>

              {/* Emoji picker */}
              <div>
                <div className="text-[12px] font-bold mb-2">اختر المحصول</div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {STORY_EMOJIS.map((em) => (
                    <button
                      key={em}
                      type="button"
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-[22px] border-2 cursor-pointer transition shrink-0 ${newStoryEmoji === em ? "border-black bg-black text-white scale-110" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
                      onClick={() => { console.log("emoji pick", em); setNewStoryEmoji(em); }}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* BG picker */}
              <div>
                <div className="text-[12px] font-bold mb-2">اختر الخلفية</div>
                <div className="grid grid-cols-4 gap-2">
                  {STORY_BG_OPTIONS.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      className={`h-12 rounded-xl bg-gradient-to-br ${bg} border-2 cursor-pointer transition ${newStoryBg === bg ? "border-black scale-105 ring-2 ring-black ring-offset-2" : "border-transparent hover:scale-105"}`}
                      onClick={() => { console.log("bg pick", bg); setNewStoryBg(bg); }}
                    />
                  ))}
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="text-[12px] font-bold">نص الحالة</label>
                <textarea
                  value={newStoryCaption}
                  onChange={(e) => setNewStoryCaption(e.target.value)}
                  placeholder="مثال: حصاد اليوم 2 طن طماطم جاهزة للبيع في البحيرة 🍅🔥"
                  className="mt-1 w-full min-h-[90px] rounded-2xl bg-gray-100 p-3 text-[14px] outline-none resize-none focus:bg-white border border-transparent focus:border-black/10"
                  maxLength={120}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[11px] text-gray-400">{newStoryCaption.length}/120</span>
                  <span className="text-[11px] text-gray-500">ستظهر لمدة 24 ساعة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* EDIT PROFILE MODAL - NEW FEATURE */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[130] flex items-center justify-center p-4" onClick={() => { console.log("close edit modal overlay"); setIsEditModalOpen(false); }}>
          <div className="bg-white rounded-2xl max-w-[480px] w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10 rounded-t-2xl">
              <span className="font-extrabold text-[16px]">تعديل الملف الشخصي</span>
              <button type="button" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200" onClick={() => { console.log("close edit modal X"); setIsEditModalOpen(false); }}>✕</button>
            </div>
            <div className="p-5 space-y-5">
              {/* Avatar section */}
              <div className="flex flex-col items-center gap-3 pb-4 border-b border-gray-100">
                <div className="relative">
                  <div style={{ backgroundColor: editForm.color }} className="w-[84px] h-[84px] rounded-full flex items-center justify-center text-white font-bold text-[32px] border-[3px] border-white shadow-[0_0_0_2px_#e5e7eb] overflow-hidden">
                    {editForm.emoji ? <span className="text-[40px]">{editForm.emoji}</span> : editForm.letter || "أ"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[14px]">{editForm.name || "الاسم"}</div>
                  <div className="text-[12px] text-gray-500">@{editForm.username || "username"}</div>
                </div>
                <div className="w-full">
                  <div className="text-[11px] font-bold mb-2">تغيير الصورة - اختر حرف ولون أو رمز</div>
                  <div className="flex gap-2 items-center">
                    <input value={editForm.letter} onChange={(e) => setEditForm({ ...editForm, letter: e.target.value.slice(0,2), emoji: "" })} placeholder="حرف" className="w-[70px] h-10 rounded-xl bg-gray-100 border border-gray-200 px-3 text-[14px] font-bold text-center outline-none focus:bg-white focus:border-black/20" maxLength={2} />
                    <div className="flex-1 grid grid-cols-6 gap-1.5">
                      {AVATAR_COLORS.map((c: string) => (
                        <button key={c} type="button" onClick={() => { console.log("color pick", c); setEditForm({ ...editForm, color: c }); }} className={`w-8 h-8 rounded-full border-2 cursor-pointer transition ${editForm.color === c ? "border-black scale-110 ring-2 ring-black ring-offset-1" : "border-white hover:scale-105"} `} style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-[11px] font-bold mb-1.5">أو اختر رمز تعبيري</div>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {AVATAR_EMOJIS.map((em: string) => (
                        <button key={em} type="button" onClick={() => { console.log("emoji avatar pick", em); setEditForm({ ...editForm, emoji: em, letter: "" }); }} className={`w-9 h-9 rounded-xl flex items-center justify-center text-[18px] border cursor-pointer shrink-0 transition ${editForm.emoji === em ? "bg-black border-black text-white scale-110" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}>{em}</button>
                      ))}
                      <button type="button" onClick={() => { console.log("clear emoji"); setEditForm({ ...editForm, emoji: "", letter: editForm.name ? editForm.name[0] : "أ" }); }} className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer shrink-0">مسح</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Form fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700">الاسم الكامل</label>
                  <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="مثال: أحمد حسن" className="mt-1 w-full h-11 rounded-xl bg-[#f5f5f5] border border-transparent px-4 text-[14px] outline-none focus:bg-white focus:border-black/10 transition" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700">اسم المستخدم</label>
                  <div className="mt-1 flex items-center h-11 rounded-xl bg-[#f5f5f5] border border-transparent focus-within:bg-white focus-within:border-black/10 px-3 gap-1 transition">
                    <span className="text-gray-400 text-[13px] font-bold">@</span>
                    <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value.replace(/\s/g,"").toLowerCase() })} placeholder="ahmed_hassan" className="flex-1 bg-transparent outline-none text-[14px]" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700">النبذة التعريفية</label>
                  <textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} placeholder="مزارع طماطم من البحيرة - جودة عالية وتوريد يومي..." rows={3} className="mt-1 w-full min-h-[80px] rounded-xl bg-[#f5f5f5] border border-transparent p-3 text-[13px] outline-none resize-none focus:bg-white focus:border-black/10 transition" maxLength={120} />
                  <div className="flex justify-between mt-1"><span className="text-[10px] text-gray-400">{editForm.bio.length}/120</span><span className="text-[10px] text-gray-400">تظهر في الملف الشخصي</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700">الموقع</label>
                    <select value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} className="mt-1 w-full h-11 rounded-xl bg-[#f5f5f5] border border-transparent px-3 text-[13px] outline-none cursor-pointer focus:bg-white focus:border-black/10">
                      {LOCATION_OPTIONS.map((loc: string) => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700">نوع النشاط</label>
                    <select value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value, role: e.target.value })} className="mt-1 w-full h-11 rounded-xl bg-[#f5f5f5] border border-transparent px-3 text-[13px] outline-none cursor-pointer focus:bg-white focus:border-black/10">
                      {ROLE_OPTIONS.map((r: string) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700">رقم الواتساب</label>
                  <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="01012345678" inputMode="numeric" className="mt-1 w-full h-11 rounded-xl bg-[#f5f5f5] border border-transparent px-4 text-[14px] outline-none focus:bg-white focus:border-black/10 ltr:text-left" dir="ltr" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700">رابط (اختياري)</label>
                  <input value={editForm.link} onChange={(e) => setEditForm({ ...editForm, link: e.target.value })} placeholder="mazaraty.com أو رابط صفحة الفيسبوك" className="mt-1 w-full h-11 rounded-xl bg-[#f5f5f5] border border-transparent px-4 text-[13px] outline-none focus:bg-white focus:border-black/10 ltr:text-left" dir="ltr" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" className="flex-1 h-11 rounded-xl bg-gray-100 text-zinc-700 font-bold text-[13px] cursor-pointer hover:bg-gray-200 transition" onClick={() => { console.log("cancel edit"); setIsEditModalOpen(false); }}>إلغاء</button>
                <button type="button" className="flex-1 h-11 rounded-xl bg-black text-white font-bold text-[13px] cursor-pointer hover:bg-zinc-800 transition disabled:opacity-40" disabled={!editForm.name.trim()} onClick={() => {
                  console.log("save profile", editForm);
                  const updated = {
                    ...currentUser,
                    name: editForm.name.trim() || currentUser.name,
                    username: editForm.username.trim() || currentUser.username,
                    letter: editForm.emoji ? "" : (editForm.letter || editForm.name[0] || "أ"),
                    color: editForm.color,
                    bio: editForm.bio,
                    location: editForm.location,
                    role: editForm.type,
                    type: editForm.type,
                    phone: editForm.phone,
                    link: editForm.link,
                    emoji: editForm.emoji,
                  };
                  setCurrentUser(updated);
                  // also update posts user refs to reflect new name/color/letter instantly
                  setPosts((prev: any) => prev.map((p: any) => p.user.id === updated.id ? { ...p, user: { ...p.user, ...updated } } : p));
                  setThreadPosts((prev: any) => prev.map((t: any) => t.user.id === updated.id ? { ...t, user: { ...t.user, ...updated } } : t));
                  setIsEditModalOpen(false);
                  setToast("تم تحديث الملف الشخصي ✓");
                  setToastType("success");
                }}>حفظ التغييرات</button>
              </div>
              <div className="text-[10px] text-gray-400 text-center leading-4 pb-2">يتم حفظ التغييرات محليا في هذه الجلسة - ستظهر في بروفايلك ومنشوراتك فورا</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}