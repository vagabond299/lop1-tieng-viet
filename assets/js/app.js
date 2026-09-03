// CẤU HÌNH 12 CHỦ ĐỀ CHÍNH
const TOPICS_CONFIG = [
    { id: 1, title: "1. Bảng chữ cái ngộ nghĩnh", desc: "Nguyên âm, phụ âm, âm ghép", count: "100 câu", icon: "🅰️", color: "pink" },
    { id: 2, title: "2. Năm thanh điệu kì diệu", desc: "Sắc, huyền, hỏi, ngã, nặng", count: "91 câu", icon: "🎵", color: "purple" },
    { id: 3, title: "3. Ghép âm - vần", desc: "Vần xuôi & phức tạp", count: "52 câu", icon: "🧩", color: "blue" },
    { id: 4, title: "4. Điền chữ cái còn thiếu", desc: "Luật c/k, g/gh, ng/ngh, s/x", count: "52 câu", icon: "✍️", color: "amber" },
    { id: 5, title: "5. Bác sĩ bắt bệnh chính tả", desc: "Sửa lỗi từ & viết hoa", count: "54 câu", icon: "S/X", color: "rose", isCustomTextIcon: true },
    { id: 6, title: "6. Từ vựng mở rộng", desc: "Giác quan, hình ảnh thực tế", count: "185 câu", icon: "🌿", color: "emerald" },
    { id: 7, title: "7. Gia đình từ loại", desc: "Sự vật, hoạt động, đặc điểm", count: "153 câu", icon: "🧸", color: "teal" },
    { id: 8, title: "8. Nhà thông thái sắp câu", desc: "Ghép câu ngắn & câu dài", count: "55 câu", icon: "🧠", color: "indigo" },
    { id: 9, title: "9. Điền từ vào câu & tục ngữ", desc: "Tục ngữ dân gian", count: "52 câu", icon: "📜", color: "cyan" },
    { id: 10, title: "10. Đố vui bé ngoan (IQ)", desc: "Câu đố con vật, đồ dùng", count: "300 câu", icon: "🎯", color: "yellow" },
    { id: 11, title: "11. Đọc hiểu - trả lời", desc: "Truyện ngụ ngôn & thơ nhạc", count: "50 bài", icon: "📖", color: "pink" }
];

// BẢNG MÀU PASTEL CHO TỪNG CHỦ ĐỀ CON
const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-emerald-50/80 hover:bg-emerald-100 border-emerald-300 text-emerald-800", num: "text-emerald-600", badge: "bg-white text-emerald-600 border-emerald-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-800", num: "text-amber-600", badge: "bg-white text-amber-600 border-amber-200" },
    { card: "bg-sky-50/80 hover:bg-sky-100 border-sky-300 text-sky-800", num: "text-sky-600", badge: "bg-white text-sky-600 border-sky-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

const ROADMAP_DATA = [
    { week: 1, topicId: 2, title: "Tuần 1: Năm thanh điệu kì diệu" },
    { week: 2, topicId: 3, title: "Tuần 2: Ghép âm - vần (phần dễ)" },
    { week: 3, topicId: 3, title: "Tuần 3: Ghép âm - vần (vần khó)" },
    { week: 4, topicId: 4, title: "Tuần 4: Điền chữ cái còn thiếu" },
    { week: 5, topicId: 5, title: "Tuần 5: Bác sĩ bắt bệnh chính tả" },
    { week: 6, topicId: 6, title: "Tuần 6: Từ vựng mở rộng" },
    { week: 7, topicId: 7, title: "Tuần 7: Gia đình từ loại" },
    { week: 8, topicId: 8, title: "Tuần 8: Nhà thông thái sắp câu" },
    { week: 9, topicId: 9, title: "Tuần 9: Điền từ & tục ngữ" },
    { week: 10, topicId: 10, title: "Tuần 10: Đố vui bé ngoan (IQ)" },
    { week: 11, topicId: 11, title: "Tuần 11: Đọc hiểu - trả lời" },
    { week: 12, topicId: 12, title: "Tuần 12: Đấu trường thi thử tổng ôn" }
];

const examFileMap = {
    hocky1: { file: 'de_thi_tieng_viet_1.json', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_tieng_viet_1.json', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_tieng_viet_1.json', label: 'Học sinh giỏi', color: 'amber' }
};

let allTopicsDataCache = null;
const examsCache = {};
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxgPIbG8HsEph5Etfu9sNQExNtb3K3mjAtyVXIfj_5IRwCfAqFIEBVrDaLlT2kql9qvUQ/exec";

let currentUser = null;
let starGreenCount = 0;
let starRedCount = 0;
let activeTopicId = null;
let activeExamContext = null;
let activeRoadmapContext = null;
let activeQuestionsList = [];
let pendingTopicQuiz = null;
let currentQIndex = 0;
let score = 0;
let userAnswers = {};
let wrongAttemptsByQ = {};
let quizWrongAnswers = [];
let quizAnsweredLog = [];
let quizStartTime = null;

// XÁO TRỘN FISHER-YATES
function shuffleArray(arr) {
    if (!arr) return [];
    const a = arr.map(item => ({ ...item }));
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getCycleQuestions(questions, poolKey, batchSize = 10) {
    if (!questions || !questions.length) return [];
    const shuffled = shuffleArray(questions);
    const targetCount = Math.min(batchSize, shuffled.length);
    return shuffled.slice(0, targetCount);
}

function capitalizeFirstLetter(val) {
    if(!val) return '';
    const s = String(val).trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function beautifySubtopicName(name) {
    if(!name) return '';
    let s = name.trim();
    if(/đa giác quan/i.test(s)) return 'Trải nghiệm đa giác quan';
    if(/trái nghĩa.*đồng nghĩa/i.test(s) || /đồng nghĩa.*trái nghĩa/i.test(s)) return 'Trái nghĩa - đồng nghĩa';
    if(s.length > 25 && s.includes('(')) {
        s = s.replace(/\s*\([^)]*\)/g, '').trim();
    }
    return s;
}

// --- NẠP DỮ LIỆU TỪ FILE GỘP tat_ca_chude.json ---
async function fetchAllTopicsData() {
    if(allTopicsDataCache) return allTopicsDataCache;
    const res = await fetch('assets/data/kho_hoc_tieng_viet_1.json');
    if(!res.ok) throw new Error("Không thể tải file dữ liệu gộp tat_ca_chude.json");
    const data = await res.json();
    const topicsArr = Array.isArray(data) ? data : (data.topics || []);
    allTopicsDataCache = topicsArr;
    return topicsArr;
}

// --- RENDER GIAO DIỆN CHÍNH ---
function renderDashboardGrid() {
    const container = document.getElementById('view-dashboard-grid');
    if(!container) return;
    let html = '';
    
    TOPICS_CONFIG.forEach(t => {
        const iconHtml = t.isCustomTextIcon 
            ? `<div class="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center text-[11px] font-black text-rose-600 shadow-inner group-hover:scale-110 transition-transform shrink-0 tracking-tight">S/X</div>`
            : `<div class="w-8 h-8 bg-${t.color}-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-${t.color}-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">${t.icon}</div>`;

        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="pastel-card p-3 flex flex-col justify-between cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[95px]">
                <div class="flex items-center space-x-2.5">
                    ${iconHtml}
                    <h3 class="font-extrabold text-${t.color}-700 text-sm md:text-base leading-tight">${t.title}</h3>
                </div>
                <div class="flex justify-between items-center mt-2 pt-1.5 border-t border-pink-100 text-[11px] font-bold text-gray-500">
                    <span>${t.desc}</span>
                    <span class="bg-${t.color}-50 text-${t.color}-600 px-2 py-0.5 rounded-full">${t.count}</span>
                </div>
            </div>
        `;
    });

    html += `
        <div onclick="openExamHub()" class="pastel-card p-3 flex flex-col justify-between cursor-pointer hover:border-amber-400 transition-all group bg-gradient-to-br from-white to-amber-50/50 min-h-[95px]">
            <div class="flex items-center space-x-2.5">
                <div class="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-amber-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">🏆</div>
                <h3 class="font-extrabold text-amber-700 text-sm md:text-base leading-tight">12. Đấu trường đề thi</h3>
            </div>
            <div class="flex justify-between items-center mt-2 pt-1.5 border-t border-amber-100 text-[11px] font-bold text-amber-600">
                <span>Đăng nhập xem đề 🔒</span>
                <span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">HK1, HK2, HSG</span>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function renderExamHubGrid() {
    const container = document.getElementById('exam-categories-grid');
    if(!container) return;
    let html = '';
    for(const [key, info] of Object.entries(examFileMap)) {
        html += `
            <div class="bg-${info.color}-50/70 p-4 rounded-2xl border-2 border-${info.color}-200 space-y-2">
                <h3 class="font-extrabold text-${info.color}-600 text-base mb-1 text-center">${info.label}</h3>
                <button onclick="loadExamData('${key}', 0)" class="w-full py-2 bg-${info.color}-400 hover:bg-${info.color}-500 text-white font-bold rounded-xl text-xs pastel-btn shadow-sm">Đề số 1</button>
                <button onclick="loadExamData('${key}', 1)" class="w-full py-2 bg-${info.color}-400 hover:bg-${info.color}-500 text-white font-bold rounded-xl text-xs pastel-btn shadow-sm">Đề số 2</button>
                <button onclick="loadExamData('${key}', 2)" class="w-full py-2 bg-${info.color}-400 hover:bg-${info.color}-500 text-white font-bold rounded-xl text-xs pastel-btn shadow-sm">Đề số 3</button>
            </div>
        `;
    }
    container.innerHTML = html;
}

function updateNavTabs(level2Title, level2Icon, level3Title) {
    const tab2 = document.getElementById('header-level2-tab');
    const tab3 = document.getElementById('header-level3-tab');
    const homeBtn = document.getElementById('btn-header-home');

    if(level2Title) {
        document.getElementById('header-level2-title').textContent = level2Title;
        document.getElementById('header-level2-icon').textContent = level2Icon || '🌸';
        tab2.classList.remove('hidden');
        tab2.classList.add('flex');
        homeBtn.classList.add('opacity-80', 'hover:opacity-100');
    } else {
        tab2.classList.add('hidden');
        tab2.classList.remove('flex');
        homeBtn.classList.remove('opacity-80');
    }

    if(level3Title) {
        document.getElementById('header-level3-title').textContent = level3Title;
        tab3.classList.remove('hidden');
        tab3.classList.add('flex');
    } else {
        tab3.classList.add('hidden');
        tab3.classList.remove('flex');
    }
}

function returnToTopicLecture() {
    stopSpeaking();
    if(activeExamContext) {
        openExamHub();
    } else if(activeRoadmapContext) {
        openRoadmap();
    } else if(pendingTopicQuiz) {
        updateNavTabs(pendingTopicQuiz.topicName, TOPICS_CONFIG.find(t=>t.id===pendingTopicQuiz.topicNum)?.icon, null);
        switchAppView('view-lecture');
    }
}

function switchAppView(viewId) {
    stopSpeaking();
    ['view-dashboard-grid', 'view-lecture', 'view-quiz', 'view-roadmap', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if(!el) return;
        if(id === viewId) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

function goHome() {
    stopSpeaking();
    updateNavTabs(null, null, null);
    switchAppView('view-dashboard-grid');
}

function switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('form-register').classList.toggle('hidden', isLogin);
    document.getElementById('tab-btn-login').className = `py-2 rounded-xl font-extrabold text-xs md:text-sm pastel-btn ${isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    document.getElementById('tab-btn-register').className = `py-2 rounded-xl font-extrabold text-xs md:text-sm pastel-btn ${!isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    hideAuthError();
}

function updateMaHSPreview() {
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const stt = document.getElementById('reg-stt').value.trim();
    document.getElementById('mahs-preview').textContent = (lop && stt) ? `${lop}-${stt.padStart(2, '0')}` : '--';
}

function showAuthError(msg) {
    const el = document.getElementById('auth-error-msg');
    el.textContent = msg;
    el.classList.remove('hidden');
}
function hideAuthError() { document.getElementById('auth-error-msg').classList.add('hidden'); }

async function callAppsScript(action, payload) {
    const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action, payload })
    });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

async function doLogin() {
    hideAuthError();
    const maHS = document.getElementById('login-mahs').value.trim();
    const maPin = document.getElementById('login-mapin').value.trim();
    if(!maHS || !maPin) return showAuthError('Bé nhập đủ Mã ID và Mã PIN nhé!');

    const btn = document.getElementById('btn-do-login');
    btn.disabled = true; btn.textContent = 'Đang đăng nhập...';
    try {
        const result = await callAppsScript('login', { maHS, maPin });
        if(!result.ok) return showAuthError(result.error);
        currentUser = { ...result.student, isGuest: false };
        localStorage.setItem('tv1_mahs', maHS);
        localStorage.setItem('tv1_mapin', maPin);
        enterDashboard();
    } catch(err) {
        showAuthError('Lỗi kết nối: ' + err.message);
    } finally {
        btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-1"></i> Đăng nhập';
    }
}

async function doRegister() {
    hideAuthError();
    const hoTen = document.getElementById('reg-hoten').value.trim();
    const ngaySinhRaw = document.getElementById('reg-ngaysinh').value;
    const lop = document.getElementById('reg-lop').value.trim();
    const soThuTu = document.getElementById('reg-stt').value.trim();
    const maPin = document.getElementById('reg-mapin').value.trim();

    if(!hoTen || !ngaySinhRaw || !lop || !soThuTu || !maPin) return showAuthError('Bé điền đủ tất cả các ô có dấu * nhé!');
    if(!/^\d{4}$/.test(maPin)) return showAuthError('Mã PIN phải gồm đúng 4 chữ số!');

    const [y, m, d] = ngaySinhRaw.split('-');
    const ngaySinh = `${d}-${m}-${y.slice(2)}`;
    const btn = document.getElementById('btn-do-register');
    btn.disabled = true; btn.textContent = 'Đang đăng ký...';
    try {
        const result = await callAppsScript('register', { hoTen, ngaySinh, lop, soThuTu, maPin });
        if(!result.ok) return showAuthError(result.error);
        alert(`Đăng ký thành công! Mã ID của bé là: ${result.student.maHS}`);
        document.getElementById('login-mahs').value = result.student.maHS;
        switchAuthTab('login');
    } catch(err) {
        showAuthError('Lỗi kết nối: ' + err.message);
    } finally {
        btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-user-plus mr-1"></i> Đăng ký ngay';
    }
}

async function tryAutoLogin() {
    const maHS = localStorage.getItem('tv1_mahs');
    const maPin = localStorage.getItem('tv1_mapin');
    if(!maHS || !maPin) return;
    try {
        const res = await callAppsScript('login', { maHS, maPin });
        if(res.ok) { currentUser = { ...res.student, isGuest: false }; enterDashboard(); }
    } catch(e) {}
}

function logout() {
    currentUser = null;
    localStorage.removeItem('tv1_mahs');
    localStorage.removeItem('tv1_mapin');
    document.getElementById('screen-dashboard').classList.add('hidden');
    document.getElementById('screen-login').classList.remove('hidden');
}

function handleGuestMode() {
    currentUser = { name: "Khách (Guest)", isGuest: true };
    enterDashboard();
}

function enterDashboard() {
    document.getElementById('screen-login').classList.add('hidden');
    document.getElementById('screen-dashboard').classList.remove('hidden');
    updateUserInfoBox();
    resetStars();
    renderDashboardGrid();
    renderExamHubGrid();
    goHome();
}

function updateUserInfoBox() {
    const box = document.getElementById('user-info-box');
    if(!box) return;
    if(currentUser && !currentUser.isGuest) {
        box.innerHTML = `
            <div class="flex items-center space-x-2">
                <div class="text-right">
                    <div class="text-pink-600 font-extrabold text-xs md:text-sm leading-tight">${escapeHtml(currentUser.hoTen)}</div>
                    <div class="text-gray-500 font-semibold text-[10px]">ID: ${escapeHtml(currentUser.maHS)} | Lớp ${escapeHtml(currentUser.lop)}</div>
                </div>
                <button onclick="logout()" title="Đăng xuất" class="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-xl border border-rose-200 pastel-btn text-xs"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>`;
    } else {
        box.innerHTML = `<span class="text-amber-600 font-extrabold text-xs">Khách (Guest)</span><br><span class="text-gray-400 font-semibold text-[10px]">Chưa đăng nhập</span>`;
    }
}

function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const greenEl = document.getElementById('star-green-count');
    const redEl = document.getElementById('star-red-count');
    if(greenEl) greenEl.textContent = 0;
    if(redEl) redEl.textContent = 0;
}

// --- LUYỆN TẬP THEO CHỦ ĐỀ & LỘ TRÌNH TUẦN ---
function clickProgressOrExam(type) {
    if(!currentUser || currentUser.isGuest) return alert('Bé vui lòng đăng nhập để sử dụng tính năng này nhé!');
    if(type === 'progress') openRoadmap();
    else if(type === 'exam') openExamHub();
}

function openRoadmap() {
    stopSpeaking();
    updateNavTabs("Tiến trình tuần", "📅", null);
    renderRoadmapList();
    switchAppView('view-roadmap');
}

function renderRoadmapList() {
    const tuanHienTai = Number(currentUser.tuanHienTai) || 1;
    let html = '';
    ROADMAP_DATA.forEach(item => {
        const isDone = item.week < tuanHienTai;
        const isCurrent = item.week === tuanHienTai;
        const badge = isDone ? '<span class="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">✓ Đã qua</span>'
            : isCurrent ? '<span class="text-xs font-extrabold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full animate-pulse">⭐ Đang học</span>'
            : '<span class="text-xs font-extrabold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"><i class="fa-solid fa-lock"></i> Khóa</span>';
        
        const cls = isDone ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 cursor-pointer'
            : isCurrent ? 'border-pink-400 bg-pink-50 hover:bg-pink-100 cursor-pointer shadow-md'
            : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed';

        html += `
            <div ${!isDone && !isCurrent ? '' : `onclick="selectRoadmapWeek(${item.week})"`} class="w-full p-3 border-2 rounded-xl font-bold text-gray-700 flex items-center justify-between transition-all ${cls}">
                <span class="text-xs md:text-sm">${escapeHtml(item.title)}</span>${badge}
            </div>`;
    });
    document.getElementById('roadmap-list').innerHTML = html;
}

async function selectRoadmapWeek(weekNum) {
    stopSpeaking();
    const item = ROADMAP_DATA.find(r => r.week === weekNum);
    if(!item) return;
    if(item.topicId === 12) return openExamHub();

    activeRoadmapContext = { week: weekNum, topicId: item.topicId, chuDe: item.title };
    pendingTopicQuiz = null; activeExamContext = null;
    updateNavTabs("Tiến trình tuần", "📅", `Tuần ${weekNum}`);

    showLoadingOverlay(`Đang tải Tuần ${weekNum}...`);
    try {
        const topics = await fetchAllTopicsData();
        const topicObj = topics.find(t => Number(t.topic_id) === Number(item.topicId));
        hideLoadingOverlay();
        if(!topicObj || !topicObj.questions) throw new Error("Không tìm thấy dữ liệu chủ đề tương ứng");

        const weekQuestions = topicObj.questions.filter(q => Number(q.week) === weekNum);
        if(!weekQuestions.length) return alert('Tuần này đang chuẩn bị thêm câu hỏi, bé quay lại sau nhé!');
        
        const cycledQuestions = getCycleQuestions(weekQuestions, `roadmap_week_${weekNum}`, 10);
        startTopicQuiz(item.topicId, item.title, cycledQuestions, null);
    } catch(err) {
        hideLoadingOverlay();
        alert(`Lỗi tải dữ liệu tuần: ${err.message}`);
    }
}

async function openTopic(topicNum, topicName, icon) {
    stopSpeaking();
    activeTopicId = topicNum; activeExamContext = null; activeRoadmapContext = null;
    updateNavTabs(topicName, icon || '🌸', null);

    showLoadingOverlay(`Đang tải chủ đề "${topicName}"...`);
    try {
        const topics = await fetchAllTopicsData();
        const topicObj = topics.find(t => Number(t.topic_id) === Number(topicNum));
        hideLoadingOverlay();
        if(!topicObj || !topicObj.questions || !topicObj.questions.length) throw new Error("Chủ đề không có câu hỏi nào");
        
        showLectureAndSubtopics(topicNum, topicName, topicObj);
    } catch(err) {
        hideLoadingOverlay();
        alert(`Không thể tải chủ đề: ${err.message}`);
    }
}

function showLectureAndSubtopics(topicNum, topicName, topicObj) {
    pendingTopicQuiz = { topicNum, topicName, questions: topicObj.questions };
    
    document.getElementById('lecture-title').textContent = topicObj.lecture_title || `Bài giảng: ${topicName}`;
    document.getElementById('lecture-content').textContent = topicObj.lecture_content || 'Chào mừng bé yêu! Hãy chọn một mục nhỏ bên dưới để bắt đầu luyện tập nhé.';
    document.getElementById('view-lecture').dataset.audioText = topicObj.lecture_audio_text || topicObj.lecture_content || '';

    const groups = [], groupMap = {};
    topicObj.questions.forEach(q => {
        const k = q.sub_topic || 'Câu hỏi chung';
        if(!groupMap[k]) { groupMap[k] = []; groups.push(k); }
        groupMap[k].push(q);
    });
    pendingTopicQuiz.groups = groups; 
    pendingTopicQuiz.groupMap = groupMap;

    let subHtml = '';
    groups.forEach((subName, idx) => {
        const style = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const displayTitle = beautifySubtopicName(subName);

        subHtml += `
            <button onclick="selectSubtopic(${idx})" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-xs md:text-sm leading-snug"><strong class="${style.num} mr-1.5">${idx + 1}.</strong> ${escapeHtml(displayTitle)}</span>
                <span class="text-[10px] md:text-xs font-extrabold ${style.badge} px-2 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${groupMap[subName].length} câu</span>
            </button>`;
    });
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;

    updateNavTabs(topicName, TOPICS_CONFIG.find(t=>t.id===topicNum)?.icon || '🌸', null);
    switchAppView('view-lecture');
}

function speakLecture() {
    speakVietnamese(document.getElementById('view-lecture').dataset.audioText || '', 0.9, 1.05);
}

function selectSubtopic(idx) {
    stopSpeaking();
    if(!pendingTopicQuiz) return;
    const { topicNum, topicName, questions, groups, groupMap } = pendingTopicQuiz;
    const subLabel = idx !== null ? groups[idx] : null;
    const pool = idx !== null ? groupMap[subLabel] : questions;
    const finalTitle = subLabel ? `${topicName} - ${beautifySubtopicName(subLabel)}` : topicName;
    const poolKey = `topic_${topicNum}_sub_${subLabel ? subLabel.replace(/\s+/g, '_') : 'all'}`;

    const cycledQuestions = getCycleQuestions(pool, poolKey, 10);

    updateNavTabs(topicName, TOPICS_CONFIG.find(t=>t.id===topicNum)?.icon || '🌸', subLabel ? beautifySubtopicName(subLabel) : 'Tất cả các mục');
    startTopicQuiz(topicNum, finalTitle, cycledQuestions, subLabel);
}

function startTopicQuiz(topicNum, topicName, questions, subLabel) {
    stopSpeaking();
    activeQuestionsList = questions; 
    currentQIndex = 0; 
    score = 0;
    userAnswers = {};
    wrongAttemptsByQ = {};
    quizWrongAnswers = []; 
    quizAnsweredLog = []; 
    quizStartTime = Date.now();

    document.getElementById('total-q-idx').textContent = activeQuestionsList.length;
    document.getElementById('btn-back-subtopics').classList.toggle('hidden', !pendingTopicQuiz || !!activeExamContext);

    switchAppView('view-quiz');
    loadQuestion();
}

// --- ĐẤU TRƯỜNG ĐỀ THI (de_thi_tong_hop.json) ---
function openExamHub() {
    if(!currentUser || currentUser.isGuest) return alert('Bé vui lòng đăng nhập để vào Đấu trường đề thi nhé!');
    stopSpeaking();
    updateNavTabs("Đấu trường đề thi", "🏆", null);
    switchAppView('view-exam-hub');
}

function loadExamData(categoryKey, examIndex) {
    stopSpeaking();
    const mapInfo = examFileMap[categoryKey];
    if(!mapInfo) return;
    activeExamContext = { categoryKey, examIndex };

    if(examsCache[mapInfo.file]) return startExamQuiz(mapInfo, examsCache[mapInfo.file], categoryKey, examIndex);

    showLoadingOverlay(`Đang tải bộ đề thi...`);
    fetch(`assets/data/${mapInfo.file}`)
        .then(r => r.json())
        .then(data => {
            if(!data.exams || !data.exams.length) throw new Error("File không có đề thi nào");
            examsCache[mapInfo.file] = data;
            hideLoadingOverlay();
            startExamQuiz(mapInfo, data, categoryKey, examIndex);
        })
        .catch(err => { hideLoadingOverlay(); alert(`Lỗi tải đề thi: ${err.message}`); });
}

function startExamQuiz(mapInfo, data, categoryKey, examIndex) {
    stopSpeaking();
    const filteredExams = data.exams.filter(e => {
        const cat = (e.exam_category || '').toLowerCase();
        if(categoryKey === 'hocky1') return cat.includes('học kỳ 1') || cat.includes('hk1');
        if(categoryKey === 'hocky2') return cat.includes('học kỳ 2') || cat.includes('hk2');
        if(categoryKey === 'hsg') return cat.includes('giỏi') || cat.includes('hsg');
        return true;
    });

    const targetExam = filteredExams[examIndex] || data.exams[examIndex];
    if(!targetExam) return alert('Không tìm thấy đề thi tương ứng!');

    activeTopicId = null; 
    pendingTopicQuiz = null; 
    activeRoadmapContext = null;
    activeQuestionsList = targetExam.questions; 
    currentQIndex = 0; 
    score = 0;
    userAnswers = {};
    wrongAttemptsByQ = {};
    quizWrongAnswers = []; 
    quizAnsweredLog = []; 
    quizStartTime = Date.now();

    updateNavTabs("Đấu trường đề thi", "🏆", `${mapInfo.label} - Đề ${examIndex + 1}`);
    document.getElementById('total-q-idx').textContent = activeQuestionsList.length;
    document.getElementById('btn-back-subtopics').classList.add('hidden');
    switchAppView('view-quiz');
    loadQuestion();
}

// --- QUẢN LÝ CÂU HỎI TRẮC NGHIỆM ---
function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if(!q) return;
    document.getElementById('current-q-idx').textContent = currentQIndex + 1;

    let mediaHtml = '';
    if(q.image_url) {
        mediaHtml = `<img src="${q.image_url}" alt="minh họa" class="w-16 h-16 md:w-20 md:h-20 object-contain mb-1.5 floating" onerror="this.remove()">`;
    }

    const pText = q.reading_passage || q.passage_text;
    const pTitle = q.reading_title || q.passage_title;
    const passageHtml = pText ? `
        <div class="w-full max-w-2xl bg-pink-50/70 border-2 border-pink-200 rounded-2xl p-3 md:p-4 mb-2 text-left">
            ${pTitle ? `<p class="font-extrabold text-pink-600 text-xs md:text-sm mb-1">${escapeHtml(pTitle)}</p>` : ''}
            <p class="text-gray-700 text-xs md:text-sm whitespace-pre-line leading-relaxed">${escapeHtml(pText)}</p>
        </div>` : '';

    let html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="flex flex-wrap items-center justify-center gap-2 mb-3 md:mb-4 max-w-2xl text-center px-2">
            <h3 class="text-base md:text-xl font-extrabold text-gray-800 leading-snug inline">
                ${escapeHtml(q.question_text)}
            </h3>
            <button onclick="speakCurrentQuestion()" title="Nghe câu hỏi" class="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-extrabold rounded-xl border border-blue-200 text-xs shadow-sm pastel-btn align-middle">
                <i class="fa-solid fa-volume-high text-xs"></i>
                <span>Nghe câu hỏi</span>
            </button>
        </div>
        
        <div class="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:grid-flow-col gap-2.5">
    `;

    q.options.forEach((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        html += `
            <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-3 md:p-3.5 bg-pink-50/50 hover:bg-pink-100 border-2 border-pink-200 rounded-2xl font-bold text-gray-700 text-left transition-all flex items-center justify-between text-base md:text-lg shadow-sm">
                <span><strong class="text-pink-500 mr-2">${String.fromCharCode(65 + idx)}.</strong> ${escapeHtml(formattedOpt)}</span>
                <span class="option-icon text-pink-400"></span>
            </button>`;
    });
    html += `</div>`;

    document.getElementById('question-box').innerHTML = html;

    restoreQuestionState(q);
    updateNavButtons();

    setTimeout(() => {
        speakCurrentQuestion();
    }, 200);
}

function restoreQuestionState(q) {
    const isFreeMode = !activeRoadmapContext && !activeExamContext;
    const completedAnswer = userAnswers[currentQIndex];
    const wrongAttempts = wrongAttemptsByQ[currentQIndex] || [];

    if(isFreeMode && wrongAttempts.length > 0) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            if(wrongAttempts.includes(bOpt)) {
                b.classList.remove('bg-pink-50/50', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                b.disabled = true;
            }
        });
    }

    if(completedAnswer !== undefined) {
        const isCorrect = completedAnswer === q.answer;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');

            if(isFreeMode) {
                if(bOpt === q.answer) {
                    b.classList.remove('bg-pink-50/50', 'border-pink-200');
                    b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
                }
            } else {
                if(bOpt === completedAnswer) {
                    b.classList.remove('bg-pink-50/50', 'border-pink-200');
                    b.classList.add(isCorrect ? 'bg-green-100' : 'bg-red-200', isCorrect ? 'border-green-400' : 'border-red-500', isCorrect ? 'text-green-800' : 'text-red-900');
                }
                if(!isCorrect && bOpt === q.answer) {
                    b.classList.remove('bg-pink-50/50', 'border-pink-200');
                    b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
                }
            }
        });
    }
}

function updateNavButtons() {
    const btnPrev = document.getElementById('btn-prev-q');
    const nextText = document.getElementById('btn-next-text');
    const nextIcon = document.getElementById('btn-next-icon');

    if(currentQIndex === 0) {
        btnPrev.disabled = true;
        btnPrev.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
        btnPrev.disabled = false;
        btnPrev.classList.remove('opacity-40', 'cursor-not-allowed');
    }

    if(currentQIndex === activeQuestionsList.length - 1) {
        nextText.textContent = "Hoàn thành";
        nextIcon.className = "fa-solid fa-trophy ml-1.5";
    } else {
        nextText.textContent = "Câu sau";
        nextIcon.className = "fa-solid fa-arrow-right ml-1.5";
    }
}

function checkAnswer(selectedOpt) {
    const q = activeQuestionsList[currentQIndex];
    const isCorrect = selectedOpt === q.answer;
    const isFreeMode = !activeRoadmapContext && !activeExamContext;

    if(isFreeMode) {
        if(userAnswers[currentQIndex] !== undefined) return;

        if(isCorrect) {
            userAnswers[currentQIndex] = selectedOpt;
            score++;
            starGreenCount++;
            document.getElementById('star-green-count').textContent = starGreenCount;

            document.querySelectorAll('.option-btn').forEach(b => {
                b.disabled = true;
                if(b.getAttribute('data-opt') === q.answer) {
                    b.classList.remove('bg-pink-50/50', 'border-pink-200');
                    b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
                }
            });

            playAudio('correct');
            confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
            setTimeout(() => speakVietnamese(q.answer, 0.95, 1.05), 180);

            quizAnsweredLog.push({
                question_id: q.question_id,
                question_text: q.question_text,
                skill_tag: q.skill_tag || null,
                diem: q.diem ?? null,
                isCorrect: true,
                dap_an_chon: selectedOpt,
                dap_an_dung: q.answer
            });
        } else {
            if(!wrongAttemptsByQ[currentQIndex]) wrongAttemptsByQ[currentQIndex] = [];
            if(!wrongAttemptsByQ[currentQIndex].includes(selectedOpt)) {
                wrongAttemptsByQ[currentQIndex].push(selectedOpt);
                starRedCount++;
                document.getElementById('star-red-count').textContent = starRedCount;
                quizWrongAnswers.push({
                    question_id: q.question_id,
                    question_text: q.question_text,
                    dap_an_chon: selectedOpt,
                    dap_an_dung: q.answer
                });
            }

            document.querySelectorAll('.option-btn').forEach(b => {
                if(b.getAttribute('data-opt') === selectedOpt) {
                    b.classList.remove('bg-pink-50/50', 'border-pink-200');
                    b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                    b.disabled = true;
                }
            });

            playAudio('wrong');
            setTimeout(() => speakVietnamese(selectedOpt, 0.95, 1.05), 300);
        }
    } else {
        if(userAnswers[currentQIndex] !== undefined) return;
        userAnswers[currentQIndex] = selectedOpt;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');

            if(bOpt === selectedOpt) {
                b.classList.remove('bg-pink-50/50', 'border-pink-200');
                b.classList.add(isCorrect ? 'bg-green-100' : 'bg-red-200', isCorrect ? 'border-green-400' : 'border-red-500', isCorrect ? 'text-green-800' : 'text-red-900');
            }
            if(!isCorrect && bOpt === q.answer) {
                b.classList.remove('bg-pink-50/50', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            }
        });

        if(isCorrect) {
            score++;
            starGreenCount++;
            document.getElementById('star-green-count').textContent = starGreenCount;
            playAudio('correct');
            confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
            setTimeout(() => speakVietnamese(q.answer, 0.95, 1.05), 180);
        } else {
            starRedCount++;
            document.getElementById('star-red-count').textContent = starRedCount;
            playAudio('wrong');
            quizWrongAnswers.push({
                question_id: q.question_id,
                question_text: q.question_text,
                dap_an_chon: selectedOpt,
                dap_an_dung: q.answer
            });
            setTimeout(() => speakVietnamese(q.answer, 0.95, 1.05), 300);
        }

        quizAnsweredLog.push({
            question_id: q.question_id,
            question_text: q.question_text,
            skill_tag: q.skill_tag || null,
            diem: q.diem ?? null,
            isCorrect,
            dap_an_chon: selectedOpt,
            dap_an_dung: q.answer
        });
    }
}

function prevQuestion() {
    stopSpeaking();
    if(currentQIndex > 0) {
        currentQIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    stopSpeaking();
    const isFreeMode = !activeRoadmapContext && !activeExamContext;

    if(userAnswers[currentQIndex] === undefined) {
        if(isFreeMode) {
            alert('Bé hãy tìm đáp án đúng để hoàn thành câu này nhé!');
        } else {
            alert('Bé hãy chọn một đáp án trước khi qua câu tiếp theo nhé!');
        }
        return;
    }

    if(currentQIndex < activeQuestionsList.length - 1) {
        currentQIndex++;
        loadQuestion();
    } else {
        showResultScreen();
    }
}

function showResultScreen() {
    stopSpeaking();
    switchAppView('view-result');
    document.getElementById('res-correct-txt').textContent = `${score}/${activeQuestionsList.length}`;
    document.getElementById('res-star-txt').textContent = `+${score * 2} ⭐`;

    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    playAudio('win');

    if(currentUser && !currentUser.isGuest) {
        if(activeExamContext) saveExamResultToSheet();
        else if(activeRoadmapContext) saveWeeklyProgressToSheet();
    }
}

function retryQuiz() {
    stopSpeaking();
    currentQIndex = 0; 
    score = 0; 
    userAnswers = {};
    wrongAttemptsByQ = {};
    quizWrongAnswers = []; 
    quizAnsweredLog = []; 
    quizStartTime = Date.now();
    document.getElementById('total-q-idx').textContent = activeQuestionsList.length;
    switchAppView('view-quiz');
    loadQuestion();
}

async function saveExamResultToSheet() {
    const { categoryKey, examIndex } = activeExamContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const payload = {
        maHS: currentUser.maHS, examCategory: categoryKey, deSo: examIndex + 1, thoiGianLamBai,
        answeredQuestions: activeQuestionsList[0]?.skill_tag ? quizAnsweredLog : undefined,
        tongCauHoi: activeQuestionsList.length, soCauDung: score, wrongQuestions: quizWrongAnswers
    };
    try { await callAppsScript('saveExamResult', payload); } catch(e) {}
}

async function saveWeeklyProgressToSheet() {
    const { week, topicId, chuDe } = activeRoadmapContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    try {
        const res = await callAppsScript('saveWeeklyProgress', {
            maHS: currentUser.maHS, tuan: week, chuDe, topicId,
            tongCauHoi: activeQuestionsList.length, soCauDung: score, thoiGianLamBai, wrongQuestions: quizWrongAnswers
        });
        if(res.ok && res.unlockedNextWeek) {
            currentUser.tuanHienTai = res.tuanHienTai;
            setTimeout(() => alert(`🎉 Chúc mừng bé đạt từ 7 điểm trở lên! Tuần ${res.tuanHienTai} đã được mở khóa!`), 600);
        }
    } catch(e) {}
}

// --- TIỆN ÍCH & WEB SPEECH TTS BAN MAI ---
function formatDuration(ms) {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)} phút ${s % 60} giây`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function showLoadingOverlay(msg) {
    let el = document.getElementById('loading-overlay');
    if(!el) {
        el = document.createElement('div');
        el.id = 'loading-overlay';
        el.className = 'fixed inset-0 bg-black/30 flex items-center justify-center z-50';
        el.innerHTML = `<div class="bg-white px-6 py-4 rounded-2xl shadow-xl font-extrabold text-pink-600 flex items-center space-x-3"><i class="fa-solid fa-spinner fa-spin"></i><span id="loading-overlay-text"></span></div>`;
        document.body.appendChild(el);
    }
    document.getElementById('loading-overlay-text').textContent = msg;
    el.classList.remove('hidden');
}
function hideLoadingOverlay() { document.getElementById('loading-overlay')?.classList.add('hidden'); }

let cachedViVoice = null;
function findBestViVoice() {
    if(!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const vi = voices.filter(v => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
    return vi.find(v => !v.localService && /google/i.test(v.name))
        || vi.find(v => /google/i.test(v.name))
        || vi.find(v => !v.localService)
        || vi[0] || null;
}

function loadVietnameseVoice() {
    cachedViVoice = findBestViVoice();
    return cachedViVoice;
}

if('speechSynthesis' in window) {
    loadVietnameseVoice();
    window.speechSynthesis.onvoiceschanged = loadVietnameseVoice;
}

function stopSpeaking() { 
    if('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

function speakVietnamese(text, rate, pitch) {
    if(!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'vi-VN';
    u.rate = rate || 0.92;
    u.pitch = pitch || 1.05;
    const v = cachedViVoice || findBestViVoice();
    if(v) u.voice = v;
    window.speechSynthesis.speak(u);
}

function speakCurrentQuestion() {
    const q = activeQuestionsList[currentQIndex];
    if(!q) return;
    const textToRead = q.audio_text || q.reading_passage || q.passage_text || q.question_text;
    speakVietnamese(textToRead, 0.92, 1.05);
}

function playAudio(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();

        if(type === 'correct') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if(type === 'wrong') {
            [0, 0.14].forEach(delay => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(220, ctx.currentTime + delay);
                gain.gain.setValueAtTime(0.25, ctx.currentTime + delay);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.09);
                osc.start(ctx.currentTime + delay);
                osc.stop(ctx.currentTime + delay + 0.09);
            });
        } else if(type === 'win') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                setTimeout(() => {
                    const o = ctx.createOscillator(), g = ctx.createGain();
                    o.connect(g); g.connect(ctx.destination);
                    o.frequency.value = freq; g.gain.setValueAtTime(0.2, ctx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                    o.start(); o.stop(ctx.currentTime + 0.3);
                }, i * 150);
            });
        }
    } catch(e) {}
}

tryAutoLogin();