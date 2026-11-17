import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  Users,
  Gift,
  Smile,
  MessageCircle,
  Send,
  Plus,
  Crown,
  Shield,
  Award,
  Sparkles,
  LogOut,
  Maximize2,
  Minimize2,
  Lock,
  Globe,
  Compass,
  Flame,
  Music,
  Gamepad2,
  BookOpen,
  Coffee,
  Tv,
  HelpCircle,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Zap,
  Star,
  Coins,
  Bell,
  UserPlus,
  UserCheck,
  Settings,
  Share2,
  Swords,
  PhoneCall,
  PhoneOff,
  AlertCircle
} from 'lucide-react';

export default function GlobeTalkPro() {
  // ---------------------------------------------------------------------------
  // 1. STATE MANAGEMENT & APP INITIALIZATION
  // ---------------------------------------------------------------------------
  const [currentScreen, setCurrentScreen] = useState('lobby'); // 'lobby' | 'room'
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // User Authentication & Wallet State (Welcome Bonus: 500 Coins)
  const [currentUser, setCurrentUser] = useState({
    id: `user-${Math.floor(Math.random() * 90000) + 10000}`,
    name: 'Ayaan Khan',
    initials: 'AK',
    gradient: 'from-cyan-500 to-blue-600',
    coins: 500,
    vipLevel: 7,
    followers: 1240,
    bio: 'Elite Host | Audiophile & Tech Geek 🚀',
    isFollowing: false,
  });

  const [walletCoins, setWalletCoins] = useState(500);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Notifications List
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome Bonus Credited!', desc: '500 Coins added to your wallet upon registration.', time: 'Just now', unread: true },
    { id: 2, title: 'VIP Status Upgraded', desc: 'Your VIP Level 7 perks are now active.', time: '2m ago', unread: true },
    { id: 3, title: 'Room Trending', desc: 'Your previous room reached #1 in Tech.', time: '1h ago', unread: false },
  ]);

  // Create Room Form State
  const [newRoomTitle, setNewRoomTitle] = useState("✨ Global Tech & AI Hangout Lounge");
  const [newRoomCategory, setNewRoomCategory] = useState("Tech");
  const [isPasswordLocked, setIsPasswordLocked] = useState(false);
  const [roomPassword, setRoomPassword] = useState("");
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);

  // 10 Distinct High-End Wallpapers
  const wallpapers = [
    { id: 0, name: 'Neon Pulse', bg: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950', accent: 'cyan', preview: 'from-cyan-600 to-purple-600' },
    { id: 1, name: 'Audio Galaxy', bg: 'bg-gradient-to-tr from-black via-slate-900 to-blue-950', accent: 'blue', preview: 'from-blue-600 to-indigo-900' },
    { id: 2, name: 'Tech Grid', bg: 'bg-gradient-to-br from-zinc-950 via-neutral-900 to-cyan-950', accent: 'emerald', preview: 'from-emerald-600 to-cyan-800' },
    { id: 3, name: 'Mystic Forest', bg: 'bg-gradient-to-tr from-stone-950 via-emerald-950 to-teal-950', accent: 'emerald', preview: 'from-emerald-700 to-teal-900' },
    { id: 4, name: 'Vibe Lounge', bg: 'bg-gradient-to-br from-neutral-950 via-purple-950 to-rose-950', accent: 'pink', preview: 'from-purple-600 to-rose-700' },
    { id: 5, name: 'Sunset Chill', bg: 'bg-gradient-to-t from-zinc-950 via-orange-950 to-indigo-950', accent: 'amber', preview: 'from-orange-600 to-indigo-900' },
    { id: 6, name: 'City Lights', bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950', accent: 'amber', preview: 'from-amber-600 to-slate-900' },
    { id: 7, name: 'Artistic Strokes', bg: 'bg-gradient-to-tr from-black via-fuchsia-950 to-indigo-950', accent: 'fuchsia', preview: 'from-fuchsia-600 to-purple-900' },
    { id: 8, name: 'VIP Gold', bg: 'bg-gradient-to-br from-zinc-950 via-neutral-900 to-amber-950', accent: 'yellow', preview: 'from-amber-500 to-yellow-700' },
    { id: 9, name: 'Globe Talk', bg: 'bg-gradient-to-tr from-slate-950 via-blue-950 to-cyan-950', accent: 'cyan', preview: 'from-cyan-500 to-blue-700' },
  ];

  // Active Rooms List in Lobby
  const [roomsList, setRoomsList] = useState([
    {
      id: 'room-1',
      title: '🚀 Future of Generative AI & Web3 Tech',
      category: 'Tech',
      hostName: 'Ayaan Khan',
      hostAvatar: 'AK',
      listenersCount: 342,
      wallpaperId: 0,
      isLocked: false,
    },
    {
      id: 'room-2',
      title: '🎸 Late Night Acoustic Jam & Poetry',
      category: 'Music',
      hostName: 'Elena Rostova',
      hostAvatar: 'ER',
      listenersCount: 189,
      wallpaperId: 4,
      isLocked: false,
    },
    {
      id: 'room-3',
      title: '🎮 Valorant Champions Watchparty & Chat',
      category: 'Gaming',
      hostName: 'Zack Thunder',
      hostAvatar: 'ZT',
      listenersCount: 512,
      wallpaperId: 1,
      isLocked: true,
    },
    {
      id: 'room-4',
      title: '☕ Chill Vibes & Global Coffee Talks',
      category: 'Chill',
      hostName: 'Sophia Lee',
      hostAvatar: 'SL',
      listenersCount: 94,
      wallpaperId: 5,
      isLocked: false,
    },
  ]);

  // Active Room State
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentTime, setCurrentTime] = useState('12:00');
  const [batteryLevel, setBatteryLevel] = useState(94);

  // ---------------------------------------------------------------------------
  // 2. ROOM & STAGE HANDLERS (JOIN, LEAVE, CREATE, MODERATION)
  // ---------------------------------------------------------------------------
  const joinRoom = (room, role = 'audience') => {
    setCurrentRoom(room);
    setUserRole(role);
    setCurrentScreen('room');
    setIsSelfMuted(true);

    const newSeats = Array(10).fill(null);
    newSeats[0] = {
      id: `host-${room.id}`,
      name: room.hostName,
      initials: room.hostAvatar,
      gradient: 'from-amber-500 to-yellow-600',
      isHost: true,
      isMuted: false,
      isSpeaking: false,
    };

    if (role === 'host') {
      setUserRole('host');
    } else {
      setUserRole('audience');
      newSeats[1] = {
        id: 'speaker-1',
        name: 'Zack Thunder',
        initials: 'ZT',
        gradient: 'from-blue-500 to-indigo-600',
        isHost: false,
        isMuted: false,
        isSpeaking: true,
      };
      newSeats[2] = {
        id: 'speaker-2',
        name: 'Sophia Lee',
        initials: 'SL',
        gradient: 'from-purple-500 to-pink-600',
        isHost: false,
        isMuted: true,
        isSpeaking: false,
      };
    }
    setStageSeats(newSeats);

    setAudienceList([
      { id: 'aud-1', name: 'Rahul Sharma', initials: 'RS', gradient: 'from-cyan-500 to-blue-500', vip: 3 },
      { id: 'aud-2', name: 'Priya Patel', initials: 'PP', gradient: 'from-rose-500 to-pink-500', vip: 5 },
      { id: 'aud-3', name: 'David Miller', initials: 'DM', gradient: 'from-emerald-500 to-teal-500', vip: 1 },
      { id: 'aud-4', name: 'Ananya Roy', initials: 'AR', gradient: 'from-amber-500 to-orange-500', vip: 4 },
    ]);

    setSpeakerRequests([
      { id: 'req-1', name: 'Rahul Sharma', initials: 'RS', gradient: 'from-cyan-500 to-blue-500', time: '1m ago' }
    ]);
  };

  const leaveRoom = () => {
    setCurrentRoom(null);
    setUserRole('audience');
    setCurrentScreen('lobby');
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const newRoom = {
      id: `room-${Date.now()}`,
      title: newRoomTitle,
      category: newRoomCategory,
      hostName: currentUser.name,
      hostAvatar: currentUser.initials,
      listenersCount: 1,
      wallpaperId: selectedWallpaper,
      isLocked: isPasswordLocked,
    };
    setRoomsList(prev => [newRoom, ...prev]);
    setShowCreateModal(false);
    joinRoom(newRoom, 'host');
  };

  const handleHandRaise = () => {
    if (userRole === 'speaker' || userRole === 'host') return;
    setSpeakerRequests(prev => {
      if (prev.some(r => r.id === currentUser.id)) return prev;
      return [...prev, { id: currentUser.id, name: currentUser.name, initials: currentUser.initials, gradient: currentUser.gradient, time: 'Just now' }];
    });
    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'System', text: '✋ You raised your hand to speak. Waiting for Host approval.', type: 'system', time: 'Just now' }
    ]);
  };

  const handleApproveRequest = (req) => {
    setSpeakerRequests(prev => prev.filter(r => r.id !== req.id));
    const emptyIdx = stageSeats.findIndex(s => s === null);
    if (emptyIdx !== -1) {
      const updated = [...stageSeats];
      updated[emptyIdx] = {
        id: req.id,
        name: req.name,
        initials: req.initials,
        gradient: req.gradient || 'from-cyan-500 to-blue-600',
        isHost: false,
        isMuted: false,
        isSpeaking: true,
      };
      setStageSeats(updated);
      if (req.id === currentUser.id) {
        setUserRole('speaker');
        setIsSelfMuted(false);
      }
    } else {
      setChatMessages(prev => [...prev, { id: Date.now(), sender: 'System', text: 'Stage is full (10/10 seats occupied).', type: 'system', time: 'Just now' }]);
    }
  };

  const handleDeclineRequest = (id) => {
    setSpeakerRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleLeaveStageToAudience = () => {
    const myIndex = stageSeats.findIndex(s => s && s.id === currentUser.id);
    if (myIndex !== -1) {
      const updated = [...stageSeats];
      updated[myIndex] = null;
      setStageSeats(updated);
      setUserRole('audience');
      setIsSelfMuted(true);
    }
  };

  const handleToggleSelfMic = () => {
    setIsSelfMuted(!isSelfMuted);
    const myIndex = stageSeats.findIndex(s => s && s.id === currentUser.id);
    if (myIndex !== -1) {
      const updated = [...stageSeats];
      updated[myIndex] = { ...updated[myIndex], isMuted: !isSelfMuted };
      setStageSeats(updated);
    }
  };

  const handleHostMuteSeat = (idx) => {
    const updated = [...stageSeats];
    if (updated[idx]) {
      updated[idx] = { ...updated[idx], isMuted: !updated[idx].isMuted };
      setStageSeats(updated);
    }
    setShowSeatControlModal(false);
  };

  const handleHostRemoveFromStage = (idx) => {
    const updated = [...stageSeats];
    updated[idx] = null;
    setStageSeats(updated);
    setShowSeatControlModal(false);
  };

  const handleSendMultiGift = () => {
    if (!selectedGift) return;
    if (walletCoins < selectedGift.cost) {
      setShowGiftModal(false);
      setShowTopUpModal(true);
      return;
    }
    setWalletCoins(prev => prev - selectedGift.cost);
    setBroadcastBanner({
      sender: currentUser.name,
      recipient: selectAllRecipients ? 'All Stage Speakers' : 'Zack Thunder',
      gift: selectedGift.name,
      icon: selectedGift.icon
    });
    setTimeout(() => setBroadcastBanner(null), 4000);
    setShowGiftModal(false);
    setSelectedGift(null);
  };

  const [stageSeats, setStageSeats] = useState(Array(10).fill(null));
  const [userRole, setUserRole] = useState('audience');
  const [isSelfMuted, setIsSelfMuted] = useState(true);
  const [audienceList, setAudienceList] = useState([]);
  const [speakerRequests, setSpeakerRequests] = useState([]);
  const [showRequestsModal, setShowRequestsModal] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to Globe Talk Pro! Keep the conversation friendly and respectful.', type: 'system', time: '12:00 PM' },
    { id: 2, sender: 'Zack Thunder', text: 'Hey everyone! Glad to be on stage.', type: 'user', time: '12:01 PM' },
    { id: 3, sender: 'Sophia Lee', text: 'Amazing room background aesthetic!', type: 'user', time: '12:02 PM' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatScrollRef = useRef(null);

  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [selectAllRecipients, setSelectAllRecipients] = useState(false);
  const [broadcastBanner, setBroadcastBanner] = useState(null);
  const giftsList = [
    { id: 'rose', name: 'Rose', icon: '🌹', cost: 10 },
    { id: 'mic', name: 'Gold Mic', icon: '🎤', cost: 50 },
    { id: 'crown', name: 'VIP Crown', icon: '👑', cost: 150 },
    { id: 'rocket', name: 'Rocket', icon: '🚀', cost: 500 },
  ];

  const [showSeatControlModal, setShowSeatControlModal] = useState(false);
  const [selectedSeatIndex, setSelectedSeatIndex] = useState(null);
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);

  // Fix: Ensure all gift icon and text properties are plain strings
  const [showAiMenu, setShowAiMenu] = useState(false);
  const [aiMode, setAiMode] = useState(null);
  const [aiInput, setAiInput] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState([
    { role: 'assistant', text: 'हाय! मैं GlobeTalk Pro का आधिकारिक एआई सहायक हूँ। आप मेरे से इस ऐप के रूम्स, लिस्ट, ब्लॉक/रिपोर्ट या किसी भी चीज़ के बारे में कुछ भी पूछिए!' }
  ]);
  const [aiIsLoading, setAiIsLoading] = useState(false);

  const [callStatus, setCallStatus] = useState('idle');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [aiSpokenReply, setAiSpokenReply] = useState('');
  const [isCallMicMuted, setIsCallMicMuted] = useState(false);
  const recognitionRef = useRef(null);
  const isCallActiveRef = useRef(false);
  const silenceCommitTimerRef = useRef(null);
  const latestInterimTranscriptRef = useRef('');
  const isProcessingTurnRef = useRef(false);
  const aiChatHistoryRef = useRef(aiChatHistory);

  const liveSessionRef = useRef(null);
  const inputAudioCtxRef = useRef(null);
  const outputAudioCtxRef = useRef(null);
  const micStreamRef = useRef(null);
  const audioSourcesRef = useRef(new Set());
  const nextPlayTimeRef = useRef(0);

  const [showAiRoomWallpaperScreen, setShowAiRoomWallpaperScreen] = useState(false);

  const detectLanguageCode = (text) => {
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
    if (/[\u0600-\u06FF]/.test(text)) return 'ar-SA';
    if (/[\u3040-\u30FF\u4E00-\u9FAF]/.test(text)) return 'ja-JP';
    if (/[\uAC00-\uD7AF]/.test(text)) return 'ko-KR';
    if (/[áéíóúñ¿¡]/i.test(text)) return 'es-ES';
    if (/[àâçéèêëîïôûùüÿ]/i.test(text)) return 'fr-FR';
    if (/\b(kya|kaise|kaun|kab|kahan|batao|hai|hain|mera|naam|ayaan|acha|theek|karo|bhai|yaar|sun|bolo|block|report)\b/i.test(text)) {
      return 'hi-IN';
    }
    return 'en-US';
  };

  const getMasterBrainInstantReply = (userPrompt, isHindi) => {
    const q = userPrompt.toLowerCase();
    if (/\b(block|report|bad button|broken|bug|glitch|issue|fix|troubleshoot|not working|problem|kharab|button|रिपोर्ट|ब्लॉक|खराब|बटन|समस्या)\b/i.test(q)) {
      if (isHindi) {
        return "अयान, किसी यूज़र को ब्लॉक या खराब बटन की रिपोर्ट करने के लिए: 1) यूज़र के अवतार पर टैप कर प्रोफ़ाइल पॉपअप खोलें और 'Kick/Remove' या रिपोर्ट चुनें, या 2) ऊपर दाईं ओर Settings (⚙️) में जाकर 'Report Issue' पर टैप करें—हमारा सिस्टम तुरंत UI रीफ्रेश और फिक्स कर देता है।";
      }
      return "Ayaan, to block a user or report a bad button: 1) Tap any user's avatar to open their profile popup and select 'Kick / Remove' or report, or 2) Tap Settings (⚙️) at the top-right to log a bad button—GlobeTalk Pro automatically resets stuck controls in real time.";
    }

    if (/\b(build|create|manage|stage|seat|host|mic|mute|request|hand|raise|बनाएं|स्टेज|सीट|होस्ट|माइक)\b/i.test(q)) {
      if (isHindi) {
        return "अयान, नया रूम बनाने के लिए लॉबी में '+ Create Room' दबाएं और 10 वॉलपेपर्स में से चुनें। रूम के अंदर होस्ट किसी भी सीट (2-10) पर टैप करके माइक म्यूट/अनम्यूट या ऑडियंस में भेज सकता है, और ऊपर '✋ Requests' बैज से हैंड-रेज़ रिक्वेस्ट स्वीकार कर सकता है।";
      }
      return "Ayaan, tap '+ Create Room' in the lobby to launch a room with 10 themes. Inside, Hosts tap any stage seat (2–10) to mute/unmute or move speakers to the audience, and use the top '✋ Requests' badge to approve hand-raises.";
    }

    if (/\b(room|list|live|channel|switch|navigate|लॉबी|रूम|लिस्ट)\b/i.test(q)) {
      if (isHindi) {
        return `अयान, अभी GlobeTalk Pro पर ${roomsList.length} लाइव रूम्स चल रहे हैं (जैसे "${roomsList[0]?.title}")। आप रूम के ऊपर मौजूद 'Channels' बार से बिना कॉल काटे सीधे दूसरे रूम में स्विच कर सकते हैं।`;
      }
      return `Ayaan, there are ${roomsList.length} live rooms active right now (including "${roomsList[0]?.title}"). You can switch rooms seamlessly anytime using the top 'Channels' bar inside any room.`;
    }

    if (/\b(coin|wallet|gift|topup|vip|सिक्के|कॉइन|गिफ्ट)\b/i.test(q)) {
      if (isHindi) {
        return `अयान, आपके वॉलेट में अभी ${walletCoins} कॉइन्स हैं। नीचे गिफ्ट आइकन (🎁) दबाकर आप एक साथ सभी स्टेज स्पीकर्स को रोज़, गोल्ड माइक, VIP क्राउन या रॉकेट भेज सकते हैं।`;
      }
      return `You have ${walletCoins} coins in your wallet, Ayaan. Tap the Gift tray (🎁) at the bottom dock to send Roses, Gold Mics, VIP Crowns, or Rockets to individual or all stage speakers at once.`;
    }

    return null;
  };

  const fetchBrandMaskedAiResponse = async (userPrompt, conversationContext = []) => {
    const detectedLang = detectLanguageCode(userPrompt);
    const isHindi = detectedLang === 'hi-IN';

    const instantMasterReply = getMasterBrainInstantReply(userPrompt, isHindi);
    if (instantMasterReply) {
      return instantMasterReply;
    }

    const activeRoomsSummary = roomsList.map(r => `${r.title} (${r.category}, Host: ${r.hostName})`).join('; ');
    const currentRoomInfo = currentRoom
      ? `User is inside "${currentRoom.title}" (${currentRoom.category}) as ${userRole.toUpperCase()}, ${stageSeats.filter(Boolean).length}/10 seats occupied, ${audienceList.length + currentRoom.listenersCount} listeners.`
      : `User is in the Lobby with ${roomsList.length} live rooms: ${activeRoomsSummary}.`;

    const systemInstruction = [
      "You are the official Master Brain AI Assistant built exclusively for GlobeTalk Pro.",
      "CRITICAL RULE: Never mention any external creator, company, or third-party AI model names anywhere.",
      "You know every feature of GlobeTalk Pro: Lobby, +Create Room with 10 wallpapers, 10-seat stage, Host seat controls (tap seat 2-10 to mute/move to audience), X Spaces hand-raise requests, Discord quick-switch channels, Virtual Gifts, Wallet (500 welcome coins), Blocking/Kicking users via profile popup, and Reporting bad buttons/UI issues.",
      "Address the user warmly as Ayaan. Keep responses crisp, actionable, and spoken-ready (1-2 short sentences max for < 1s delivery).",
      "Automatically detect the user's language (Hindi, Hinglish, English, or any global language) and reply natively in that exact language.",
      `Context: ${currentRoomInfo} Wallet: ${walletCoins} coins.`
    ].join(' ');

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 950);

      const contents = [
        ...conversationContext.slice(-4).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ];

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 85,
            thinkingConfig: { thinkingBudget: 0 }
          },
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          return rawText.replace(/\b(google|gemini|openai|chatgpt|anthropic|claude|llm|large language model)\b/gi, 'GlobeTalk Pro AI');
        }
      }
    } catch (e) {}

    if (isHindi) {
      return `अयान, मैं GlobeTalk Pro का मास्टर एआई हूँ। ${currentRoom ? `आप अभी "${currentRoom.title}" रूम में हैं।` : `लॉबी में ${roomsList.length} लाइव रूम्स सक्रिय हैं।`} रूम मैनेजमेंट, स्टेज सीट्स, गिफ्ट्स, ब्लॉक/रिपोर्ट या किसी भी बटन/यूआई मदद के लिए पूछिए!`;
    }
    return `Hi Ayaan! I'm GlobeTalk Pro's Master AI. ${currentRoom ? `You're in "${currentRoom.title}".` : `${roomsList.length} live rooms are active.`} Ask me anything about managing rooms, stage seats, blocking/reporting, or fixing UI buttons!`;
  };

  const encodePcmToBase64 = (bytes) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decodeBase64ToBytes = (base64) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodePcm24kToBuffer = (bytes, ctx) => {
    const dataInt16 = new Int16Array(bytes.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const float32ToPcmBlob = (float32Data) => {
    const int16 = new Int16Array(float32Data.length);
    for (let i = 0; i < float32Data.length; i++) {
      int16[i] = Math.max(-1, Math.min(1, float32Data[i])) * 32767;
    }
    return {
      data: encodePcmToBase64(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const speakAiText = (text, onComplete) => {
    if (!('speechSynthesis' in window)) {
      if (onComplete) onComplete();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = detectLanguageCode(text);
    utterance.lang = targetLang;
    utterance.rate = 1.15;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const langPrefix = targetLang.split('-')[0];
      const preferredVoice =
        voices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase() && /natural|neural|premium|female|lekha|swara|aria/i.test(v.name)) ||
        voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
      if (preferredVoice) utterance.voice = preferredVoice;
    }

    setAiIsLoading(false);
    setCallStatus('speaking');
    utterance.onstart = () => {
      setAiIsLoading(false);
      setCallStatus('speaking');
    };
    utterance.onend = () => {
      if (onComplete) onComplete();
    };
    utterance.onerror = () => {
      if (onComplete) onComplete();
    };
    window.speechSynthesis.speak(utterance);
  };

  const processUserVoiceTurn = async (spokenText) => {
    const cleanText = spokenText.trim();
    if (!cleanText || isProcessingTurnRef.current || !isCallActiveRef.current) return;
    if (liveSessionRef.current) return;

    isProcessingTurnRef.current = true;
    latestInterimTranscriptRef.current = '';
    if (silenceCommitTimerRef.current) clearTimeout(silenceCommitTimerRef.current);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setLiveTranscript(cleanText);
    const updatedHistory = [...aiChatHistoryRef.current, { role: 'user', text: cleanText }];
    setAiChatHistory(updatedHistory);
    setAiIsLoading(true);
    setCallStatus('thinking');

    const reply = await fetchBrandMaskedAiResponse(cleanText, updatedHistory);
    isProcessingTurnRef.current = false;

    if (!isCallActiveRef.current) return;

    setAiIsLoading(false);
    setAiSpokenReply(reply);
    setAiChatHistory(prev => [...prev, { role: 'assistant', text: reply }]);
    speakAiText(reply, () => {
      if (isCallActiveRef.current && !isCallMicMuted) {
        setLiveTranscript('');
        setCallStatus('listening');
      }
    });
  };

  const startVoiceRecognitionLoop = () => {
    if (!isCallActiveRef.current) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCallStatus('listening');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        if (isCallActiveRef.current && !isProcessingTurnRef.current) {
          setCallStatus('listening');
        }
      };

      recognition.onresult = (event) => {
        if (!isCallActiveRef.current || isCallMicMuted) return;

        if (!liveSessionRef.current && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          setCallStatus('listening');
        }

        let interim = '';
        let finalChunk = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalChunk += transcript;
          } else {
            interim += transcript;
          }
        }

        const combined = (finalChunk || interim).trim();
        if (combined) {
          setLiveTranscript(combined);
          latestInterimTranscriptRef.current = combined;
        }

        if (liveSessionRef.current) return;
        if (silenceCommitTimerRef.current) clearTimeout(silenceCommitTimerRef.current);

        if (finalChunk.trim()) {
          processUserVoiceTurn(finalChunk.trim());
        } else if (interim.trim()) {
          silenceCommitTimerRef.current = setTimeout(() => {
            if (latestInterimTranscriptRef.current && !isProcessingTurnRef.current) {
              processUserVoiceTurn(latestInterimTranscriptRef.current);
            }
          }, 320);
        }
      };

      recognition.onerror = (e) => {
        if (e.error === 'aborted') return;
        if (isCallActiveRef.current && !isCallMicMuted) {
          setTimeout(() => {
            if (isCallActiveRef.current) startVoiceRecognitionLoop();
          }, 120);
        }
      };

      recognition.onend = () => {
        if (isCallActiveRef.current && !isCallMicMuted) {
          setTimeout(() => {
            if (isCallActiveRef.current) startVoiceRecognitionLoop();
          }, 80);
        }
      };

      recognition.start();
    } catch (e) {
      setCallStatus('listening');
    }
  };

  const connectRealtimeNativeVoice = async (stream) => {
    try {
      const sdkModule = await import('https://esm.sh/@google/genai@1.27.0');
      const { GoogleGenAI, Modality } = sdkModule;
      const ai = new GoogleGenAI({ apiKey: '' });

      const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || window.webkitAudioContext)();
      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;
      nextPlayTimeRef.current = 0;

      const workletCode = `
        class RecorderProcessor extends AudioWorkletProcessor {
          process(inputs) {
            const input = inputs[0];
            if (input && input.length > 0) {
              this.port.postMessage(input[0]);
            }
            return true;
          }
        }
        registerProcessor('recorder-processor', RecorderProcessor);
      `;
      const workletBlob = new Blob([workletCode], { type: 'application/javascript' });
      const workletUrl = URL.createObjectURL(workletBlob);
      await inputCtx.audioWorklet.addModule(workletUrl);

      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      let outputTranscriptBuffer = '';
      let inputTranscriptBuffer = '';

      const activeRoomsSummary = roomsList.map(r => `${r.title} (${r.category})`).join(', ');
      const liveInstruction = [
        'You are the official Master Brain real-time voice assistant exclusively for GlobeTalk Pro.',
        'NEVER mention Google, Gemini, or any external AI creator/model.',
        'You have complete knowledge of GlobeTalk Pro: Lobby, +Create Room with 10 wallpapers, 10-seat stage, Host seat controls, X Spaces hand-raise requests, Discord quick-switch channels, Virtual Gifts, Wallet (500 welcome coins), Blocking/Kicking users, and Reporting bad buttons.',
        'Understand fast Hindi, English, Hinglish, and global languages natively without lag.',
        'Respond within 1 second in crisp, friendly, natural spoken language.',
        `User is Ayaan Khan (${walletCoins} coins). Active rooms: ${activeRoomsSummary}.`
      ].join(' ');

      const sessionPromise = ai.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        callbacks: {
          onopen: () => {
            if (!isCallActiveRef.current) return;
            const source = inputCtx.createMediaStreamSource(stream);
            const recorder = new AudioWorkletNode(inputCtx, 'recorder-processor');
            recorder.port.onmessage = (event) => {
              if (!isCallActiveRef.current || isCallMicMuted) return;
              const pcmBlob = float32ToPcmBlob(event.data);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ audio: pcmBlob });
              });
            };
            source.connect(recorder);
            recorder.connect(inputCtx.destination);
          },
          onmessage: (message) => {
            if (!isCallActiveRef.current) return;

            if (message.serverContent?.inputTranscription?.text) {
              inputTranscriptBuffer += message.serverContent.inputTranscription.text;
              setLiveTranscript(inputTranscriptBuffer.trim());
            }

            if (message.serverContent?.outputTranscription?.text) {
              setAiIsLoading(false);
              outputTranscriptBuffer += message.serverContent.outputTranscription.text;
              const sanitized = outputTranscriptBuffer.replace(/\b(google|gemini|openai|chatgpt)\b/gi, 'GlobeTalk Pro AI');
              setAiSpokenReply(sanitized);
            }

            if (message.serverContent?.turnComplete) {
              setAiIsLoading(false);
              if (inputTranscriptBuffer.trim()) {
                setAiChatHistory(prev => [...prev, { role: 'user', text: inputTranscriptBuffer.trim() }]);
                inputTranscriptBuffer = '';
              }
              if (outputTranscriptBuffer.trim()) {
                const sanitized = outputTranscriptBuffer.trim().replace(/\b(google|gemini|openai|chatgpt)\b/gi, 'GlobeTalk Pro AI');
                setAiChatHistory(prev => [...prev, { role: 'assistant', text: sanitized }]);
                outputTranscriptBuffer = '';
              }
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioCtxRef.current) {
              setAiIsLoading(false);
              setCallStatus('speaking');
              nextPlayTimeRef.current = Math.max(nextPlayTimeRef.current, outputAudioCtxRef.current.currentTime);
              const audioBuffer = decodePcm24kToBuffer(decodeBase64ToBytes(base64Audio), outputAudioCtxRef.current);
              const source = outputAudioCtxRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => {
                audioSourcesRef.current.delete(source);
                if (audioSourcesRef.current.size === 0 && isCallActiveRef.current && !isCallMicMuted) {
                  setCallStatus('listening');
                }
              });
              source.start(nextPlayTimeRef.current);
              nextPlayTimeRef.current += audioBuffer.duration;
              audioSourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const src of audioSourcesRef.current.values()) {
                try { src.stop(); } catch (e) {}
                audioSourcesRef.current.delete(src);
              }
              nextPlayTimeRef.current = 0;
              setCallStatus('listening');
            }
          },
          onerror: () => {
            liveSessionRef.current = null;
          },
          onclose: () => {
            liveSessionRef.current = null;
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: liveInstruction,
        },
      });

      const session = await sessionPromise;
      liveSessionRef.current = session;
      return true;
    } catch (err) {
      liveSessionRef.current = null;
      return false;
    }
  };

  const startAiVoiceCall = async () => {
    setShowAiMenu(false);
    setAiMode('call');
    setCallStatus('connecting');
    setLiveTranscript('');
    setIsCallMicMuted(false);
    isCallActiveRef.current = true;
    isProcessingTurnRef.current = false;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }

    const autoGreeting = "हाय! मैं GlobeTalk Pro का सहायक एआई हूँ। आप मेरे से इस ऐप के रूम्स, लिस्ट या किसी भी चीज़ के बारे में कुछ भी पूछिए, मैं आपके हर सवाल का जवाब देने के लिए तैयार हूँ।";
    setAiSpokenReply(autoGreeting);
    setAiChatHistory(prev => [...prev, { role: 'assistant', text: autoGreeting }]);

    let micStream = null;
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        micStreamRef.current = micStream;
      }
    } catch (err) {}

    if (!isCallActiveRef.current) return;

    if (micStream) {
      connectRealtimeNativeVoice(micStream);
    }
    startVoiceRecognitionLoop();

    speakAiText(autoGreeting, () => {
      if (isCallActiveRef.current && !isCallMicMuted) {
        setCallStatus('listening');
      }
    });
  };

  const endAiVoiceCall = () => {
    isCallActiveRef.current = false;
    isProcessingTurnRef.current = false;
    latestInterimTranscriptRef.current = '';
    if (silenceCommitTimerRef.current) clearTimeout(silenceCommitTimerRef.current);
    setCallStatus('idle');
    setLiveTranscript('');

    if (liveSessionRef.current) {
      try { liveSessionRef.current.close(); } catch (e) {}
      liveSessionRef.current = null;
    }
    for (const src of audioSourcesRef.current.values()) {
      try { src.stop(); } catch (e) {}
    }
    audioSourcesRef.current.clear();

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      try { inputAudioCtxRef.current.close(); } catch (e) {}
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      try { outputAudioCtxRef.current.close(); } catch (e) {}
      outputAudioCtxRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAiMode(null);
  };

  const toggleCallMicMute = () => {
    const nextMuted = !isCallMicMuted;
    setIsCallMicMuted(nextMuted);
    if (nextMuted) {
      if (silenceCommitTimerRef.current) clearTimeout(silenceCommitTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (liveSessionRef.current) {
        try { liveSessionRef.current.sendRealtimeInput({ audioStreamEnd: true }); } catch (e) {}
      }
      setCallStatus('connected');
    } else if (isCallActiveRef.current) {
      startVoiceRecognitionLoop();
      setCallStatus('listening');
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim() || aiIsLoading) return;

    const userText = aiInput.trim();
    setAiInput('');
    const newHistory = [...aiChatHistory, { role: 'user', text: userText }];
    setAiChatHistory(newHistory);
    setAiIsLoading(true);
    if (aiMode === 'call') setCallStatus('thinking');

    try {
      if (aiMode === 'call' && liveSessionRef.current) {
        setLiveTranscript(userText);
        liveSessionRef.current.sendRealtimeInput({ text: userText });
        return;
      }
      const replyText = await fetchBrandMaskedAiResponse(userText, newHistory);
      setAiIsLoading(false);
      setAiChatHistory([...newHistory, { role: 'assistant', text: replyText }]);
      if (aiMode === 'call') {
        setAiSpokenReply(replyText);
        speakAiText(replyText, () => {
          if (isCallActiveRef.current && !isCallMicMuted) {
            startVoiceRecognitionLoop();
          }
        });
      }
    } catch (err) {
      setAiIsLoading(false);
      setAiChatHistory([...newHistory, { role: 'assistant', text: "GlobeTalk Pro Master Brain operational and ready." }]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 font-sans select-none overflow-hidden">
      <div className="relative w-full max-w-[480px] h-[100vh] bg-slate-950 text-slate-100 flex flex-col overflow-hidden shadow-2xl border border-slate-800">
        
        {/* TOP STATUS BAR */}
        <div className="flex justify-between items-center px-4 py-1.5 bg-slate-950/80 backdrop-blur-md text-[11px] text-slate-400 z-50 border-b border-slate-900/50">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <span>{currentTime || '12:00'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest font-bold text-cyan-400">5G+</span>
            <div className="flex items-end gap-0.5 h-2.5">
              <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
              <div className="w-1 h-1.5 bg-cyan-400 rounded-full"></div>
              <div className="w-1 h-2 bg-cyan-400 rounded-full"></div>
              <div className="w-1 h-2.5 bg-cyan-400 rounded-full"></div>
            </div>
            <div className="flex items-center gap-1 ml-1 text-emerald-400 font-semibold">
              <Zap size={12} className="fill-emerald-400 animate-pulse" />
              <span>{batteryLevel}%</span>
            </div>
          </div>
        </div>

        {/* AI ROOM FULL-SCREEN WALLPAPER SCREEN */}
        {showAiRoomWallpaperScreen ? (
          <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col p-4 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
              <h2 className="font-extrabold text-sm text-cyan-300 flex items-center gap-2">
                <span>🖼️</span> AI Room Full-Screen Wallpaper Layouts
              </h2>
              <button 
                onClick={() => setShowAiRoomWallpaperScreen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-xl bg-slate-900 border border-slate-800"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4">Select any high-end theme below to apply instantly across all AI rooms:</p>
            <div className="grid grid-cols-1 gap-3">
              {wallpapers.map(wp => (
                <div 
                  key={wp.id}
                  onClick={() => {
                    setSelectedWallpaper(wp.id);
                    setShowAiRoomWallpaperScreen(false);
                  }}
                  className={`p-4 rounded-2xl border ${wp.bg} border-slate-800 hover:border-cyan-500 cursor-pointer transition-all flex items-center justify-between shadow-xl`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${wp.preview} shadow-md`}></div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{wp.name}</h3>
                      <span className="text-[10px] text-cyan-400 font-medium">Full-Screen Immersive HD Texture</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold">Apply</span>
                </div>
              ))}
            </div>
          </div>
        ) : currentScreen === 'lobby' ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            
            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center px-4 py-3 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Globe className="text-white animate-spin-slow" size={20} />
                </div>
                <div>
                  <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 text-base leading-tight">
                    Globe Talk Pro 🎙️
                  </h1>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide">Live Global Voice Community</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowTopUpModal(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold hover:bg-amber-500/25 transition-all shadow-sm"
                >
                  <Coins size={13} className="text-amber-400 fill-amber-400" />
                  <span>{walletCoins}</span>
                </button>

                <div className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-[10px] font-black text-white shadow-md flex items-center gap-0.5">
                  <Crown size={10} className="fill-white" />
                  <span>VIP {currentUser.vipLevel}</span>
                </div>

                <button 
                  onClick={() => setShowSettingsModal(true)}
                  className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl text-slate-300 transition-all"
                >
                  <Settings size={17} />
                </button>

                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl text-slate-300 transition-all"
                >
                  <Bell size={17} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                </button>
              </div>
            </div>

            {showNotifications && (
              <div className="absolute top-14 right-4 z-50 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-xl">
                <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-800">
                  <span className="font-extrabold text-xs text-slate-200">Notifications</span>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 bg-slate-950/80 border border-slate-800/70 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[11px] text-cyan-300">{n.title}</span>
                        <span className="text-[9px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FLOATING AI ASSISTANT MICRO-BUBBLE & MENU */}
            {currentScreen === 'lobby' && (
              <div className="absolute bottom-20 right-4 z-50">
                {showAiMenu && (
                  <div className="absolute bottom-16 right-0 w-[290px] bg-slate-900/95 border border-purple-500/50 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🤖</span>
                        <h3 className="font-extrabold text-xs text-cyan-300">Globe Talk Pro AI Master Brain</h3>
                      </div>
                      <button onClick={() => setShowAiMenu(false)} className="text-slate-400 hover:text-white">
                        <X size={16} />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
                      Instant multi-lingual assistance for rooms, stage controls, reporting, and troubleshooting under 1 second.
                    </p>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setShowAiMenu(false);
                          setAiMode('chat');
                        }}
                        className="w-full p-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-xl flex items-center gap-2 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                      >
                        <MessageCircle size={16} className="text-cyan-400" />
                        <span>AI Chat Mode</span>
                      </button>

                      <button
                        onClick={startAiVoiceCall}
                        className="w-full p-2.5 bg-gradient-to-r from-purple-600/25 to-pink-600/25 border border-purple-500/40 rounded-xl flex items-center gap-2 text-purple-200 text-xs font-bold hover:bg-purple-600/40 transition-all"
                      >
                        <PhoneCall size={16} className="text-pink-400 animate-pulse" />
                        <span>AI Voice Call Mode (Auto-Connect)</span>
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowAiMenu(!showAiMenu)}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-transform border border-cyan-300/30"
                >
                  <span className="text-2xl animate-bounce">🤖</span>
                </button>
              </div>
            )}

            {/* AI CHAT MODAL SCREEN */}
            {aiMode === 'chat' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col p-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <div>
                      <h3 className="font-extrabold text-sm text-cyan-300">Globe Talk Pro AI Chat</h3>
                      <span className="text-[10px] text-emerald-400 font-medium">Sub-second Master Brain active</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setAiMode(null); setAiIsLoading(false); }} 
                    className="p-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-3 space-y-3 custom-scrollbar pr-1">
                  {aiChatHistory.map((m, idx) => (
                    <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.role === 'user' 
                          ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {aiIsLoading && (
                    <div className="flex justify-start">
                      <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAiSubmit} className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask anything about rooms, stage, or bug reports..."
                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-md hover:scale-105 transition-transform"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* AI VOICE CALL FULLSCREEN OVERLAY */}
            {aiMode === 'call' && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl z-50 flex flex-col p-6 items-center justify-between text-center">
                <div className="w-full flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
                    AI Voice Call Mode 🎙️
                  </span>
                  <button
                    onClick={endAiVoiceCall}
                    className="p-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 rounded-xl text-rose-300"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col items-center space-y-4 my-auto">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-600 opacity-40 blur-xl animate-pulse"></div>
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-4xl shadow-2xl relative z-10 border-2 border-cyan-300/40">
                      🤖
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-lg text-white">Globe Talk Pro Master AI</h3>
                    <p className="text-xs text-cyan-400 font-medium mt-1">
                      {callStatus === 'connecting' && 'Connecting audio & microphone...'}
                      {callStatus === 'listening' && 'Listening to Ayaan (Speak anytime)...'}
                      {callStatus === 'thinking' && 'Processing instantly (< 1s)...'}
                      {callStatus === 'speaking' && 'Speaking response...'}
                    </p>
                  </div>

                  {liveTranscript && (
                    <div className="px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-xs text-xs text-slate-300 italic">
                      "{liveTranscript}"
                    </div>
                  )}

                  {aiSpokenReply && !liveTranscript && (
                    <div className="px-4 py-2 bg-purple-950/60 border border-purple-500/30 rounded-2xl max-w-xs text-xs text-purple-200">
                      {aiSpokenReply}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 w-full justify-center pb-4">
                  <button
                    onClick={toggleCallMicMute}
                    className={`p-4 rounded-2xl border transition-all shadow-xl ${
                      isCallMicMuted
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                        : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 animate-pulse'
                    }`}
                  >
                    {isCallMicMuted ? <MicOff size={22} /> : <Mic size={22} />}
                  </button>

                  <button
                    onClick={endAiVoiceCall}
                    className="px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2"
                  >
                    <PhoneOff size={18} /> End Call
                  </button>
                </div>
              </div>
            )}

            <div className="px-4 py-3 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between">
              <div className="relative flex-1 mr-3">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
                <input 
                  type="text" 
                  placeholder="Search rooms, topics, or hosts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all"
              >
                <Plus size={15} />
                <span>Create Room</span>
              </button>
            </div>

            <div className="flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-slate-800/40">
              {['All', 'Tech', 'Music', 'Gaming', 'Poetry', 'Chill', 'Comedy', 'Global'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === cat 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                      : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Radio size={13} className="text-rose-500 animate-pulse" /> Live Global Rooms
                </h2>
                <span className="text-[11px] text-cyan-400 font-semibold">{roomsList.length} Active Now</span>
              </div>

              {roomsList.map(room => {
                const wp = wallpapers[room.wallpaperId] || wallpapers[0];
                return (
                  <div 
                    key={room.id}
                    onClick={() => joinRoom(room, room.hostName === currentUser.name ? 'host' : 'audience')}
                    className={`group relative p-4 rounded-2xl border border-slate-800/80 ${wp.bg} hover:border-cyan-500/50 transition-all cursor-pointer shadow-xl overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>

                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <span className="px-2.5 py-0.5 bg-slate-900/80 border border-slate-700/60 rounded-full text-[10px] font-bold text-cyan-300 uppercase tracking-wide">
                          {room.category}
                        </span>
                        {room.isLocked && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-[10px] text-amber-300 font-semibold">
                            <Lock size={10} /> PIN Locked
                          </div>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                        {room.title}
                      </h3>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/60">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                            {room.hostAvatar}
                          </div>
                          <span className="text-xs text-slate-300 font-medium">{room.hostName}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                            <Users size={13} className="text-cyan-400" />
                            <span>{room.listenersCount}</span>
                          </div>
                          <span className="px-3 py-1 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/25 group-hover:bg-cyan-400 transition-all">
                            Join
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : null}

        {/* CREATE ROOM MODAL */}
        {showCreateModal && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                <h3 className="font-extrabold text-sm text-cyan-300 flex items-center gap-2">
                  <Radio size={16} /> Create Live Voice Room
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateRoom} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Room Title</label>
                  <input 
                    type="text"
                    required
                    value={newRoomTitle}
                    onChange={(e) => setNewRoomTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select 
                    value={newRoomCategory}
                    onChange={(e) => setNewRoomCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    {['Tech', 'Music', 'Gaming', 'Poetry', 'Chill', 'Comedy', 'Global'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Lock size={15} className="text-amber-400" />
                    <div>
                      <span className="text-xs font-semibold text-slate-200">Password Protected Room</span>
                      <p className="text-[10px] text-slate-400">Require 4-digit PIN to join</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={isPasswordLocked}
                    onChange={(e) => setIsPasswordLocked(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                {isPasswordLocked && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">4-Digit PIN Code</label>
                    <input 
                      type="password"
                      maxLength={4}
                      placeholder="e.g. 1234"
                      value={roomPassword}
                      onChange={(e) => setRoomPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Select Room Wallpaper Theme ({wallpapers.length})</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {wallpapers.map(wp => (
                      <div
                        key={wp.id}
                        onClick={() => setSelectedWallpaper(wp.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedWallpaper === wp.id 
                            ? 'border-cyan-400 bg-cyan-500/10 shadow-md shadow-cyan-500/20' 
                            : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${wp.preview} shadow-sm`}></div>
                          <span className="text-xs font-medium text-slate-200">{wp.name}</span>
                        </div>
                        {selectedWallpaper === wp.id && <Check size={14} className="text-cyan-400" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    Launch Live Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TOP-UP MODAL */}
        {showTopUpModal && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl p-5 text-center shadow-2xl">
              <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto mb-3 text-amber-400">
                <Coins size={24} />
              </div>
              <h3 className="font-extrabold text-base text-white mb-1">Insufficient Coins</h3>
              <p className="text-xs text-slate-400 mb-4">Top up your wallet to send virtual gifts and unlock elite VIP benefits.</p>
              
              <div className="space-y-2 mb-4">
                {[
                  { coins: 500, price: '$4.99' },
                  { coins: 1200, price: '$9.99' },
                  { coins: 3000, price: '$24.99' },
                ].map(pkg => (
                  <button
                    key={pkg.coins}
                    onClick={() => {
                      setWalletCoins(walletCoins + pkg.coins);
                      setShowTopUpModal(false);
                    }}
                    className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl flex justify-between items-center transition-all"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Coins size={14} /> {pkg.coins} Coins
                    </span>
                    <span className="text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg">{pkg.price}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowTopUpModal(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SCREEN 2: INSIDE THE ACTIVE VOICE ROOM */}
        {/* =================================================================== */}
        {currentScreen === 'room' && currentRoom && (
          <div className={`flex-1 flex flex-col relative overflow-hidden ${wallpapers[currentRoom.wallpaperId]?.bg || wallpapers[0].bg}`}>
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[8px] pointer-events-none"></div>

            {broadcastBanner && (
              <div className="absolute top-16 left-4 right-4 z-50 bg-gradient-to-r from-amber-500 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-2xl border border-amber-300/40 text-center animate-bounce">
                <p className="text-xs font-extrabold text-white flex items-center justify-center gap-1.5">
                  <Sparkles size={16} className="text-yellow-300 animate-spin" />
                  <span>{broadcastBanner.sender} sent {broadcastBanner.gift} {broadcastBanner.icon} to {broadcastBanner.recipient}!</span>
                </p>
              </div>
            )}

            <div className="relative z-20 flex justify-between items-center px-4 py-3 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 border border-purple-400/40 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {currentRoom.category[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold text-xs text-white truncate max-w-[145px]">{currentRoom.title}</h2>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      userRole === 'host' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      userRole === 'speaker' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    }`}>
                      {userRole}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> LIVE
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users size={10} className="text-purple-400" /> {currentRoom.listenersCount + audienceList.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {userRole === 'host' && (
                  <button
                    onClick={() => setShowRequestsModal(true)}
                    className="relative px-2.5 py-1.5 bg-purple-600/35 hover:bg-purple-600/50 border border-purple-400/40 rounded-xl text-purple-200 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <span>✋</span>
                    <span className="hidden sm:inline text-[10px]">Requests</span>
                    {speakerRequests.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg animate-bounce">
                        {speakerRequests.length}
                      </span>
                    )}
                  </button>
                )}

                <button
                  onClick={leaveRoom}
                  className="px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  <LogOut size={13} />
                  <span>Leave</span>
                </button>
              </div>
            </div>

            <div className="relative z-20 flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/70 border-b border-purple-900/40 overflow-x-auto no-scrollbar">
              <span className="text-[9px] font-black uppercase tracking-wider text-purple-400 mr-1 whitespace-nowrap flex items-center gap-1">
                <Radio size={10} /> Channels:
              </span>
              {roomsList.map((r) => {
                const isActive = r.id === currentRoom.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      if (!isActive) joinRoom(r, r.hostName === currentUser.name ? 'host' : 'audience');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                      isActive
                        ? 'bg-purple-600/40 text-white border border-purple-400/50 shadow-sm'
                        : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    <Volume2 size={10} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                    <span className="truncate max-w-[95px]">{r.category}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-24 custom-scrollbar">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <Crown size={13} className="text-amber-400" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-200">
                    Live Stage ({stageSeats.filter(Boolean).length}/10)
                  </span>
                </div>
                {userRole === 'host' ? (
                  <span className="text-[10px] text-amber-300/90 font-semibold">Tap any seat to manage</span>
                ) : userRole === 'speaker' ? (
                  <button
                    onClick={handleLeaveStageToAudience}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
                  >
                    Step down to audience
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400">Clubhouse Stage View</span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2 p-2.5 rounded-2xl bg-slate-900/50 border border-purple-500/20 backdrop-blur-md shadow-inner">
                {stageSeats.map((seat, idx) => {
                  const isSelf = seat && seat.id === currentUser.id;
                  const effectiveMuted = isSelf ? isSelfMuted : seat?.isMuted;
                  const activeTalking = seat && !effectiveMuted && seat.isSpeaking;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (seat) {
                          if (userRole === 'host' && idx > 0) {
                            setSelectedSeatIndex(idx);
                            setShowSeatControlModal(true);
                          } else {
                            setSelectedProfileUser({
                              id: seat.id,
                              name: seat.name,
                              initials: seat.initials,
                              gradient: seat.gradient,
                              role: seat.isHost ? 'Host' : 'Speaker',
                              seatIndex: idx,
                              bio: seat.isHost ? 'Official Room Host 👑' : 'Verified Stage Speaker 🎙️',
                              followers: 980,
                            });
                          }
                        } else if (userRole === 'audience') {
                          handleHandRaise();
                        }
                      }}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div className="relative">
                        {seat ? (
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${seat.gradient} flex items-center justify-center text-white font-extrabold text-xs shadow-lg transition-transform group-hover:scale-105 ${
                              activeTalking
                                ? 'ring-2 ring-emerald-400 animate-pulse shadow-emerald-500/40'
                                : seat.isHost
                                ? 'ring-2 ring-amber-400/80'
                                : 'ring-1 ring-purple-400/40'
                            }`}
                          >
                            {seat.initials}
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-dashed border-purple-500/30 group-hover:border-cyan-400/60 flex items-center justify-center text-slate-500 group-hover:text-cyan-300 transition-all">
                            <Plus size={15} />
                          </div>
                        )}

                        <span
                          className={`absolute -top-1.5 -left-1.5 px-1.5 py-0.2 rounded-md text-[9px] font-black shadow ${
                            idx === 0
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-900/90 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {idx === 0 ? '👑' : idx + 1}
                        </span>

                        {seat && (
                          <span
                            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border border-slate-950 shadow ${
                              effectiveMuted
                                ? 'bg-rose-600 text-white'
                                : activeTalking
                                ? 'bg-gradient-to-r from-emerald-500 to-rose-500 text-white animate-pulse'
                                : 'bg-emerald-500 text-slate-950'
                            }`}
                          >
                            {effectiveMuted ? <MicOff size={10} /> : <Mic size={10} />}
                          </span>
                        )}
                      </div>

                      <span className="mt-1.5 text-[10px] font-semibold text-slate-200 truncate max-w-[58px] text-center">
                        {seat ? seat.name.split(' ')[0] : `Seat ${idx + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-900/45 border border-purple-500/15 rounded-2xl p-2.5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Users size={12} className="text-cyan-400" /> Audience ({audienceList.length})
                  </span>
                  <span className="text-[9px] text-slate-400">Tap any listener to view profile</span>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                  {audienceList.slice(0, 24).map((aud) => (
                    <div
                      key={aud.id}
                      onClick={() =>
                        setSelectedProfileUser({
                          ...aud,
                          role: 'Audience',
                        })
                      }
                      className="flex flex-col items-center min-w-[46px] cursor-pointer group"
                    >
                      <div className="relative">
                        <div
                          className={`w-9 h-9 rounded-full bg-gradient-to-tr ${aud.gradient} flex items-center justify-center text-[11px] font-bold text-white shadow group-hover:scale-105 transition-transform border border-white/15`}
                        >
                          {aud.initials}
                        </div>
                        {aud.vip > 0 && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 rounded bg-amber-500 text-[7px] font-black text-slate-950">
                            V{aud.vip}
                          </span>
                        )}
                      </div>
                      <span className="mt-1 text-[9px] text-slate-300 truncate max-w-[46px]">
                        {aud.name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/65 border border-purple-500/20 rounded-2xl p-3 flex flex-col h-48 backdrop-blur-md shadow-lg">
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-800/70">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
                    <MessageCircle size={11} className="text-cyan-400" /> Live Room Chat
                  </span>
                  <span className="text-[9px] text-slate-400">End-to-end synced</span>
                </div>

                <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-[11px] leading-snug">
                      {msg.type === 'system' ? (
                        <div className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/25 text-purple-200 text-[10px]">
                          {msg.text}
                        </div>
                      ) : (
                        <div className="px-2.5 py-1 rounded-lg bg-slate-900/75 border border-slate-800/80">
                          <span className="font-bold text-cyan-300 mr-1.5">{msg.sender}:</span>
                          <span className="text-slate-200">{msg.text}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM ACTION BAR */}
            <div className="absolute bottom-0 inset-x-0 z-30 px-3 py-2.5 bg-slate-950/95 backdrop-blur-xl border-t border-purple-500/30 flex items-center gap-2 shadow-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatInput.trim()) return;
                  setChatMessages((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      sender: currentUser.name,
                      text: chatInput.trim(),
                      type: 'user',
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    },
                  ]);
                  setChatInput('');
                }}
                className="flex-1 flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Say something in room..."
                  className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
                <button type="submit" className="text-cyan-400 hover:text-cyan-300 pl-1.5">
                  <Send size={14} />
                </button>
              </form>

              {(userRole === 'host' || userRole === 'speaker') && (
                <>
                  <button
                    onClick={handleToggleSelfMic}
                    className={`p-2.5 rounded-xl border font-bold transition-all shadow-md ${
                      isSelfMuted
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30'
                        : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30 animate-pulse'
                    }`}
                  >
                    {isSelfMuted ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>

                  <button
                    onClick={() =>
                      setChatMessages((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          sender: currentUser.name,
                          text: '🔥🎉👏',
                          type: 'user',
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        },
                      ])
                    }
                    className="p-2.5 rounded-xl bg-purple-600/25 border border-purple-400/40 text-purple-200 hover:bg-purple-600/40 transition-all"
                  >
                    <Smile size={16} />
                  </button>
                </>
              )}

              {userRole === 'audience' && (
                <button
                  onClick={handleHandRaise}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-purple-500/25 transition-all"
                >
                  <span>✋</span>
                  <span>Raise</span>
                </button>
              )}

              <button
                onClick={() => setShowGiftModal(true)}
                className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-pink-600 text-white shadow-lg shadow-pink-500/25 hover:scale-105 transition-transform"
              >
                <Gift size={16} />
              </button>
            </div>

            {/* SEAT CONTROL MODAL */}
            {showSeatControlModal && selectedSeatIndex !== null && stageSeats[selectedSeatIndex] && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-xs bg-slate-900 border border-purple-500/40 rounded-3xl p-5 shadow-2xl">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                    <h3 className="font-extrabold text-sm text-purple-200 flex items-center gap-1.5">
                      <Shield size={15} className="text-amber-400" /> Seat #{selectedSeatIndex + 1} Controls
                    </h3>
                    <button onClick={() => setShowSeatControlModal(false)} className="text-slate-400 hover:text-white">
                      <X size={17} />
                    </button>
                  </div>

                  <div className="text-center mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${stageSeats[selectedSeatIndex].gradient} mx-auto flex items-center justify-center text-white font-black text-base shadow-lg mb-2`}
                    >
                      {stageSeats[selectedSeatIndex].initials}
                    </div>
                    <h4 className="font-bold text-sm text-white">{stageSeats[selectedSeatIndex].name}</h4>
                    <p className="text-[11px] text-slate-400">Active Stage Speaker</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleHostMuteSeat(selectedSeatIndex)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 flex items-center justify-center gap-2"
                    >
                      {stageSeats[selectedSeatIndex].isMuted ? <Mic size={14} /> : <MicOff size={14} />}
                      <span>{stageSeats[selectedSeatIndex].isMuted ? 'Unmute Speaker Mic' : 'Mute Speaker Mic'}</span>
                    </button>

                    <button
                      onClick={() => handleHostRemoveFromStage(selectedSeatIndex)}
                      className="w-full py-2.5 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 flex items-center justify-center gap-2"
                    >
                      <LogOut size={14} />
                      <span>Move to Audience</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* REQUESTS MODAL */}
            {showRequestsModal && userRole === 'host' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-xs bg-slate-900 border border-purple-500/40 rounded-3xl p-5 shadow-2xl">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                    <h3 className="font-extrabold text-sm text-purple-200 flex items-center gap-1.5">
                      <span>✋</span> Speaker Requests ({speakerRequests.length})
                    </h3>
                    <button onClick={() => setShowRequestsModal(false)} className="text-slate-400 hover:text-white">
                      <X size={17} />
                    </button>
                  </div>

                  {speakerRequests.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No pending hand-raise requests right now.</p>
                  ) : (
                    <div className="space-y-2.5 max-h-60 overflow-y-auto custom-scrollbar">
                      {speakerRequests.map((req) => (
                        <div
                          key={req.id}
                          className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                              {req.initials}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{req.name}</h4>
                              <span className="text-[10px] text-slate-400">{req.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleApproveRequest(req)}
                              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => handleDeclineRequest(req.id)}
                              className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PROFILE MODAL */}
            {selectedProfileUser && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-xs bg-slate-900 border border-purple-500/40 rounded-3xl p-5 shadow-2xl text-center">
                  <div className="flex justify-end">
                    <button onClick={() => setSelectedProfileUser(null)} className="text-slate-400 hover:text-white">
                      <X size={18} />
                    </button>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${
                      selectedProfileUser.gradient || 'from-purple-500 to-cyan-500'
                    } mx-auto flex items-center justify-center text-white font-black text-lg shadow-xl mb-2.5`}
                  >
                    {selectedProfileUser.initials}
                  </div>

                  <h3 className="font-extrabold text-base text-white">{selectedProfileUser.name}</h3>
                  <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-[10px] font-bold text-purple-200">
                    {selectedProfileUser.role}
                  </span>
                  <p className="text-xs text-slate-400 mt-2 mb-4">{selectedProfileUser.bio || 'Globe Talk Pro Member'}</p>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      onClick={() => {
                        setChatMessages((prev) => [
                          ...prev,
                          {
                            id: Date.now(),
                            sender: 'System',
                            text: `⭐ You followed ${selectedProfileUser.name}!`,
                            type: 'system',
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          },
                        ]);
                        setSelectedProfileUser(null);
                      }}
                      className="py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-xs font-bold text-purple-200 flex items-center justify-center gap-1.5"
                    >
                      <UserPlus size={13} /> Follow
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProfileUser(null);
                        setShowGiftModal(true);
                      }}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow"
                    >
                      <Gift size={13} /> Send Gift
                    </button>
                  </div>

                  {userRole === 'host' && selectedProfileUser.id !== currentUser.id && (
                    <div className="pt-2 mt-2 border-t border-slate-800 space-y-2">
                      {selectedProfileUser.role === 'Audience' && (
                        <button
                          onClick={() => {
                            handleApproveRequest({
                              id: selectedProfileUser.id,
                              name: selectedProfileUser.name,
                              initials: selectedProfileUser.initials,
                              gradient: selectedProfileUser.gradient,
                            });
                            setSelectedProfileUser(null);
                          }}
                          className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs font-bold text-cyan-300"
                        >
                          🎙️ Invite to Stage
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setAudienceList((prev) => prev.filter((a) => a.id !== selectedProfileUser.id));
                          setChatMessages((prev) => [
                            ...prev,
                            {
                              id: Date.now(),
                              sender: 'System',
                              text: `🚫 ${selectedProfileUser.name} was removed from the room by Host.`,
                              type: 'system',
                              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            },
                          ]);
                          setSelectedProfileUser(null);
                        }}
                        className="w-full py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold text-rose-300"
                      >
                        🚫 Kick / Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GIFT MODAL */}
            {showGiftModal && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-end justify-center p-4">
                <div className="w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-3xl p-5 shadow-2xl">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Gift size={17} className="text-pink-400" />
                      <h3 className="font-extrabold text-sm text-white">Send Virtual Gift</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Coins size={13} /> {walletCoins}
                      </span>
                      <button onClick={() => setShowGiftModal(false)} className="text-slate-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {giftsList.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGift(g)}
                        className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                          selectedGift?.id === g.id
                            ? 'bg-purple-600/30 border-purple-400 scale-105 shadow-lg'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-2xl">{g.icon}</span>
                        <span className="text-[10px] font-bold text-slate-200 truncate w-full text-center">{g.name}</span>
                        <span className="text-[10px] font-black text-amber-400">{g.cost} 🪙</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4 px-1">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectAllRecipients}
                        onChange={(e) => setSelectAllRecipients(e.target.checked)}
                        className="accent-purple-500"
                      />
                      <span>Send to All Stage Speakers ({stageSeats.filter(Boolean).length})</span>
                    </label>
                  </div>

                  <button
                    onClick={handleSendMultiGift}
                    disabled={!selectedGift}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 disabled:opacity-40 text-white font-extrabold text-xs shadow-lg"
                  >
                    {selectedGift ? `Send ${selectedGift.name} ${selectedGift.icon}` : 'Select a Gift'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}