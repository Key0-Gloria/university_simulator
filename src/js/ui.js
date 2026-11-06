import { GameState } from './state.js';
import { CONFIG } from './config.js';
import { EventEngine } from './engine.js';
import { EndingManager } from './endings.js';
import { AntiFraudCourse } from '../../data/anti_fraud_course.js';
import { CluePool, RoommateClues, CampusContact } from '../../data/clues.js';
import { StoryChapters } from '../../data/story_chapters.js';
import { RoommateManager } from './roommate_manager.js';

// ============================================================
//  UI 控制器（「减法重构」后：纯互动视觉小说式）
//  - 无周期 / 无行动点 / 无养成数值
//  - 玩家可无限点击「观察舍友」与「和舍友互动」
//  - 四章剧情通过「观察舍友收集线索」解锁
//  - 主动点击「结束探索」触发防诈段位结局
// ============================================================

export const UI = {
    selectedGender: '男',

    init() {
        this.renderIdentitySelector();
    },

    renderIdentitySelector() {
        const view = document.getElementById('app-view');
        view.innerHTML = `
            <div class="p-6 flex flex-col justify-center min-h-full overflow-y-auto">
                <h1 class="text-3xl font-bold text-slate-900 mb-1">${CONFIG.gameTitle}</h1>
                <p class="text-sm text-slate-500 mb-6 leading-relaxed">观察你的舍友，在骗子找上门之前，守护他们远离诈骗。</p>

                <div class="bg-white p-4 rounded-xl shadow-xs border border-slate-200 mb-6">
                    <label class="block text-xs font-semibold text-slate-400 uppercase mb-2">🚻 你的性别</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="UI.selectGender('男')" id="btn-gender-male" class="py-3 rounded-xl border-2 transition-all font-bold text-sm border-blue-500 bg-blue-50 text-blue-700">👦 男</button>
                        <button onclick="UI.selectGender('女')" id="btn-gender-female" class="py-3 rounded-xl border-2 transition-all font-bold text-sm border-slate-200 bg-white text-slate-600 opacity-70">👧 女</button>
                    </div>
                    <p class="text-xs text-slate-400 mt-2 leading-relaxed">💡 选择后，你将与同性的三名舍友同住，观察并守护他们。</p>
                </div>

                <button id="btn-start" onclick="UI.startGame()" class="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 transition">开始观察 👀</button>
            </div>
        `;
    },

    selectGender(gender) {
        this.selectedGender = gender;
        const btnMale = document.getElementById('btn-gender-male');
        const btnFemale = document.getElementById('btn-gender-female');
        if (btnMale && btnFemale) {
            btnMale.className = 'py-3 rounded-xl border-2 transition-all font-bold text-sm ' + (gender === '男' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 opacity-70');
            btnFemale.className = 'py-3 rounded-xl border-2 transition-all font-bold text-sm ' + (gender === '女' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-slate-200 bg-white text-slate-600 opacity-70');
        }
    },

    startGame() {
        GameState.player.gender = this.selectedGender;

        // 精简数值：初始余额 5000，说服力 50（信任值由舍友初始化决定）
        GameState.stats.money = 5000;
        GameState.stats.persuasion = 50;

        // 随机身份标签（用于丰富文本，不影响数值）
        const trait = RoommateManager.rollRandomTrait();
        GameState.player.randomTrait = trait ? trait.trait : '';

        // 初始化舍友（四人间，按性别）
        RoommateManager.initRoommates(this.selectedGender, 4);

        // 重置剧情章节状态
        GameState.storyChapter.currentChapter = null;
        GameState.storyChapter.currentScene = null;
        GameState.storyChapter.completedChapters = [];
        GameState.storyChapter.unlockedChapterIndex = 0;
        GameState.storyChapter.history = [];
        GameState.storyChapter.firstEndings = {};
        GameState.storyChapter.finalized = false;
        GameState.storyChapter.year = 1;
        GameState.storyChapter.seenEndings = {};
        GameState.flags.observedRoommates = [];
        GameState.flags.expelled = false;
        GameState.inventory.clues = [];
        GameState.inventory.items = [];

        GameState.eventStream.unshift(`🏠 你的四人间室友是：${GameState.roommates.map(r => r.name).join('、')}。`);
        if (trait && trait.desc) GameState.eventStream.unshift(`🏷️ 随机身份：你是一个「${trait.trait}」。${trait.desc}`);

        document.getElementById('phone-dock').classList.remove('hidden');

        GameState.isMonthStartPhase = false;
        GameState.currentMonthEvent = null;
        this.switchApp('home');
        this.showCognitionIntro();
    },

    // ============================================================
    //  👀 观察舍友（无行动点限制，每名舍友观察一次收集线索）
    // ============================================================
    observeRoommate() {
        if (!GameState.flags.observedRoommates) GameState.flags.observedRoommates = [];
        const observed = GameState.flags.observedRoommates;
        const modal = document.getElementById('global-modal');
        const allDone = GameState.roommates.every(r => observed.includes(r.id));
        modal.innerHTML = `
            <div class="bg-white p-5 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 space-y-3">
                <h3 class="font-bold text-base text-slate-900">👀 观察哪位舍友？</h3>
                <p class="text-xs text-slate-500 leading-relaxed">每位舍友只需观察一次，收集线索即可解锁 ta 的故事线。</p>
                ${GameState.roommates.map(r => {
                    const done = observed.includes(r.id);
                    return done
                        ? `<div class="w-full text-left text-xs bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center opacity-60">
                            <span class="text-slate-500">${r.personalityIcon || '👤'} ${r.name} <span class="text-xs text-slate-400">${r.personalityLabel || ''}</span></span>
                            <span class="text-xs text-emerald-600 font-bold">✓ 已观察</span>
                        </div>`
                        : `<button onclick="UI.observeTarget('${r.id}')" class="w-full text-left text-xs bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 p-3 rounded-xl transition flex justify-between items-center">
                            <span class="font-medium text-slate-700">${r.personalityIcon || '👤'} ${r.name} <span class="text-xs text-slate-400">${r.personalityLabel || ''}</span></span>
                            <span class="text-xs text-sky-600 font-bold">观察</span>
                        </button>`;
                }).join('')}
                ${allDone ? '<p class="text-xs text-amber-600 text-center">三名舍友都已观察过了。</p>' : ''}
                <button onclick="document.getElementById('global-modal').classList.add('hidden')" class="w-full bg-slate-100 text-slate-600 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200 transition">取消</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    observeTarget(roommateId) {
        document.getElementById('global-modal').classList.add('hidden');
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) { this.switchApp('home'); return; }
        const clue = this.collectClue(roommateId);
        this.showClueCardModal(clue, r.name);
    },

    collectClue(roommateId) {
        const base = RoommateClues[roommateId] || CluePool[Math.floor(Math.random() * CluePool.length)];
        const clue = { ...base, roommateId, garbled: false };

        const r = GameState.roommates.find(x => x.id === roommateId) || null;
        clue.desc = EventEngine.resolveGenderText(clue.desc || '', r);
        clue.name = EventEngine.resolveGenderText(clue.name || '', r);

        GameState.inventory.clues.push(clue);
        if (GameState.inventory.clues.length > 8) GameState.inventory.clues.shift();

        // ✅ 观察收集线索 = 提升防骗洞察力（说服力）
        GameState.stats.persuasion = Math.max(0, Math.min(100, GameState.stats.persuasion + 5));

        if (!GameState.flags.observedRoommates) GameState.flags.observedRoommates = [];
        if (!GameState.flags.observedRoommates.includes(roommateId)) {
            GameState.flags.observedRoommates.push(roommateId);
        }
        return clue;
    },

    showClueCardModal(clue, name) {
        const modal = document.getElementById('global-modal');
        modal.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 space-y-3">
                <div class="text-center">
                    <div class="text-5xl mb-2">${clue.icon}</div>
                    <h3 class="font-bold text-lg text-slate-900">${clue.name}</h3>
                    <span class="inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1 bg-emerald-100 text-emerald-700">✅ 已获取线索</span>
                </div>
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <p class="text-xs text-slate-500 mb-1">你悄悄观察了舍友 <strong class="text-slate-700">${name}</strong>：</p>
                    <p class="text-sm text-slate-700 leading-relaxed">${clue.desc}</p>
                </div>
                <p class="text-xs text-slate-400 text-center">🧩 这条线索已收录，${name} 的故事线已解锁。<span class="text-blue-600 font-bold">说服力 +5</span></p>
                <button onclick="UI.afterObserveClue()" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">收下线索，继续</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    afterObserveClue() {
        const modal = document.getElementById('global-modal');
        modal.classList.add('hidden');
        this.switchApp('home');
    },

    eventStreamUnshiftWithLog(msg) {
        GameState.eventStream.unshift(msg);
        GameState.historyLogs.unshift(msg);
    },

    // ============================================================
    //  💬 和舍友互动（无行动点限制，触发舍友相关的刷值小剧情）
    // ============================================================
    interactWithRoommate() {
        const roll = Math.random();
        let ev = null;
        // ✅ 80% 触发新刷值小剧情（诈骗/迷惑疑似），20% 保留日常/互动
        if (roll < 0.80) {
            ev = EventEngine.rollGrindStoryEvent();
        } else if (roll < 0.90) {
            ev = EventEngine.rollRoommateDailyEvent();
        } else {
            ev = EventEngine.rollRoommateInteractionEvent();
        }

        if (!ev) { this.switchApp('home'); return; }

        GameState.currentMonthEvent = ev;
        GameState.isMonthStartPhase = true;
        this.switchApp('home');
    },

    // ============================================================
    //  🧋 请喝奶茶（花金钱快速刷信任值）
    // ============================================================
    MILK_TEA_COST: 30,    // 每杯奶茶花费
    MILK_TEA_TRUST: 15,   // 每杯奶茶提升的信任值

    openMilkTeaModal() {
        const modal = document.getElementById('global-modal');
        const affordable = GameState.stats.money >= this.MILK_TEA_COST;

        const roommateBtns = GameState.roommates.map(r => `
            <button onclick="UI.buyMilkTea('${r.id}')" ${affordable ? '' : 'disabled'} class="w-full text-left text-sm ${affordable ? 'bg-amber-50 hover:bg-amber-100 border-amber-300' : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'} border p-3.5 rounded-xl transition flex justify-between items-center">
                <span class="font-bold text-slate-800">${r.personalityIcon || '🧋'} ${r.name}</span>
                <span class="text-xs text-slate-500">信任 ${Math.round(r.trust)} → <span class="text-amber-600 font-bold">${Math.min(100, Math.round(r.trust) + this.MILK_TEA_TRUST)}</span></span>
            </button>
        `).join('');

        modal.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
                <div class="text-center border-b pb-3">
                    <div class="text-4xl mb-2">🧋</div>
                    <h3 class="font-bold text-lg text-slate-900">请舍友喝奶茶</h3>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">花 ¥${this.MILK_TEA_COST} 请一位舍友喝奶茶，快速提升 ta 的信任值 +${this.MILK_TEA_TRUST}。</p>
                </div>

                <div class="flex justify-between items-center bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm">
                    <span class="text-slate-600">💰 当前余额</span>
                    <span class="font-bold ${affordable ? 'text-emerald-600' : 'text-red-600'}">¥${GameState.stats.money}</span>
                </div>

                <div class="space-y-2">${roommateBtns}</div>

                ${!affordable ? '<p class="text-xs text-red-500 text-center leading-relaxed">余额不足，请先去赚点钱（通关剧情/识破骗局不会扣钱）。</p>' : ''}

                <button onclick="document.getElementById('global-modal').classList.add('hidden')" class="w-full bg-slate-100 text-slate-600 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition">取消</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    buyMilkTea(roommateId) {
        if (GameState.stats.money < this.MILK_TEA_COST) {
            this.openMilkTeaModal();
            return;
        }
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return;

        GameState.stats.money -= this.MILK_TEA_COST;
        RoommateManager.changeTrust(roommateId, this.MILK_TEA_TRUST);

        const bro = EventEngine.resolveGenderText('{bro}', r);
        const modal = document.getElementById('global-modal');
        modal.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
                <div class="text-center">
                    <div class="text-4xl mb-2">🧋</div>
                    <h3 class="font-bold text-lg text-slate-900">请 ${r.name} 喝了杯奶茶</h3>
                </div>
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                    <p class="text-sm text-slate-700 leading-relaxed">${r.name} 接过奶茶，笑着说了句"谢啦${bro}"。你们的关系又近了一点。</p>
                </div>
                <div class="flex justify-center gap-2 flex-wrap">
                    <span class="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-200">💰 -¥${this.MILK_TEA_COST}</span>
                    <span class="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200">🤝 信任 +${this.MILK_TEA_TRUST}</span>
                </div>
                <button onclick="document.getElementById('global-modal').classList.add('hidden'); UI.renderMilkTeaResultClose();" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">好的</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    renderMilkTeaResultClose() {
        this.switchApp('home');
    },

    // ============================================================
    //  🔀 视图切换
    // ============================================================
    switchApp(appName) {
        // 特殊结局（学术不端退学）
        const ending = EndingManager.checkEnding();
        const view = document.getElementById('app-view');

        if (ending) {
            this.renderEndingScreen(ending, view);
            return;
        }

        if (GameState.isMonthStartPhase && appName === 'home') {
            const ev = GameState.currentMonthEvent;

            // 剧本式剧情章节：走独立渲染
            if (ev && ev._isChapterEvent) {
                this.renderChapterSceneView(ev, view);
                return;
            }

            if (ev) {
                this.renderEventView(ev, view);
                return;
            }
        }

        if (appName === 'home') {
            view.innerHTML = this.renderHome();
        } else if (appName === 'course') {
            view.innerHTML = this.renderCourse();
        }
        this.highlightActiveTab(appName);
    },

    highlightActiveTab(appName) {
        const dock = document.getElementById('phone-dock');
        if (!dock) return;
        dock.querySelectorAll('button[data-app]').forEach(btn => {
            const active = btn.getAttribute('data-app') === appName;
            btn.classList.toggle('text-blue-600', active);
            btn.classList.toggle('font-semibold', active);
            btn.classList.toggle('text-slate-400', !active);
        });
    },

    // ============================================================
    //  🏠 主页渲染（观察 + 互动 + 四章剧情入口 + 结束探索）
    // ============================================================
    /** 舍友平均信任值（四舍五入取整，用于主页概览） */
    avgTrust() {
        if (!GameState.roommates.length) return 0;
        const sum = GameState.roommates.reduce((s, r) => s + r.trust, 0);
        return Math.round(sum / GameState.roommates.length);
    },

    renderHome() {
        const yearLabel = EventEngine.getCurrentYearLabel();
        const graduated = EventEngine.isGraduated();
        const completedCount = GameState.storyChapter.completedChapters.length;
        const totalChapters = EventEngine.getTotalChapters();
        return `
            <div class="p-5 flex flex-col min-h-full gap-3">
                <div class="bg-slate-900 text-white p-4 rounded-2xl shadow-md">
                    <div class="flex justify-between items-center text-sm">
                        <span class="font-bold">${CONFIG.gameTitle}</span>
                        <button onclick="UI.openStatusModal()" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xs">📊 状态</button>
                    </div>
                    <div class="flex justify-between items-center pt-2 border-t border-slate-800 text-xs text-slate-300">
                        <span>💰 ¥${GameState.stats.money}</span>
                        <span>🗣️ 说服力 ${Math.round(GameState.stats.persuasion)}</span>
                        <span>🤝 平均信任 ${this.avgTrust()}</span>
                    </div>
                    <div class="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center">
                        <span class="text-sm font-bold ${graduated ? 'text-amber-300' : 'text-white'}">${yearLabel}</span>
                        <span class="text-xs text-slate-400">主线剧情 ${completedCount} / ${totalChapters}</span>
                    </div>
                    ${graduated ? `<p class="text-xs text-amber-300 mt-1 leading-relaxed">🎓 恭喜毕业！四段故事都已通关，你可以继续探索其他结局，不会影响已评定的段位。</p>` : ''}
                </div>

                ${this.renderRoommatePanel()}

                <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-2.5">
                    <h3 class="text-sm font-bold text-slate-500">你的行动</h3>
                    <p class="text-xs text-slate-400 leading-relaxed">💡 剧情里有些关键选项需要足够的 <strong class="text-slate-600">信任值</strong> 或 <strong class="text-slate-600">说服力</strong> 才能解锁，多观察、多互动就能把它们刷起来。</p>

                    <button onclick="UI.observeRoommate()" class="w-full text-left text-sm bg-sky-50 hover:bg-sky-100 border border-sky-300 p-4 rounded-xl transition font-bold text-sky-900 flex justify-between items-center shadow-sm">
                        <span>👀 观察舍友</span>
                        <span class="text-xs bg-sky-200 text-sky-700 px-2 py-0.5 rounded">收集线索 · 解锁剧情</span>
                    </button>

                    <button onclick="UI.interactWithRoommate()" class="w-full text-left text-sm bg-pink-50 hover:bg-pink-100 border border-pink-300 p-4 rounded-xl transition font-bold text-pink-900 flex justify-between items-center shadow-sm">
                        <span>💬 和舍友互动</span>
                        <span class="text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded">提升信任 · 涨说服力</span>
                    </button>

                    <button onclick="UI.openMilkTeaModal()" class="w-full text-left text-sm bg-amber-50 hover:bg-amber-100 border border-amber-300 p-4 rounded-xl transition font-bold text-amber-900 flex justify-between items-center shadow-sm">
                        <span>🧋 请喝奶茶</span>
                        <span class="text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded">花 ¥30 · 信任 +15</span>
                    </button>
                </div>

                ${this.renderChapterEntry()}

                <button onclick="UI.endExplore()" class="w-full bg-slate-900 text-white font-medium py-3 rounded-xl text-sm hover:bg-slate-800 transition">结束探索 · 查看段位 ➔</button>
            </div>
        `;
    },

    /** 舍友状态追踪面板 */
    renderRoommatePanel() {
        const statusMap = { normal: '🟢 正常', suspicious: '🟡 可疑', scammed: '🔴 深陷', brainwashed: '🧠 被洗脑' };
        const statusColor = { normal: 'text-emerald-600', suspicious: 'text-amber-600', scammed: 'text-red-600', brainwashed: 'text-violet-600' };
        const items = GameState.roommates.map(r => `
            <div class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div class="flex items-center space-x-2 flex-1">
                    <span class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-sm">${r.personalityIcon || (r.gender === '女' ? '👧' : '👦')}</span>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold text-slate-700">${r.name}</span>
                            <span class="text-xs font-bold ${statusColor[r.status]}">${statusMap[r.status] || '🟢 正常'}</span>
                        </div>
                        <div class="text-xs text-slate-400 mt-0.5">信任 ${Math.round(r.trust)} · 余额 ¥${r.money}</div>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-bold text-slate-500">👥 舍友状态</span>
                    <button onclick="UI.openStatusModal()" class="text-xs text-blue-500 font-bold">详情</button>
                </div>
                ${items}
            </div>
        `;
    },

    // ============================================================
    //  📖 四章剧情入口（线索解锁机制）
    // ============================================================
    renderChapterEntry() {
        const chapters = EventEngine.listChapters();
        const statusMeta = {
            completed: { label: '✓ 已通关', cls: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
            inProgress: { label: '▶ 进行中', cls: 'bg-violet-100 text-violet-700 border-violet-300' },
            available: { label: '可开始', cls: 'bg-blue-100 text-blue-700 border-blue-300' },
            locked: { label: '🔒 未解锁', cls: 'bg-slate-100 text-slate-400 border-slate-200' }
        };
        const cards = chapters.map(({ chapter, displayTitle, status }) => {
            const m = statusMeta[status];
            const locked = status === 'locked';
            const action = locked ? `UI.lockedChapterHint('${chapter.id}')` : `UI.startStoryChapter('${chapter.id}')`;

            // 解锁提示文案：舍友章节需观察线索；玩家章节需体验三名舍友结局
            let lockedHint = '';
            if (locked) {
                lockedHint = chapter.roommateId === 'player'
                    ? '<span class="block text-xs text-amber-600 mt-1 leading-relaxed">🔒 体验三名舍友的任一结局后自动解锁</span>'
                    : '<span class="block text-xs text-amber-600 mt-1 leading-relaxed">🔍 观察对应舍友收集线索后解锁</span>';
            }

            // 结局进度（通关后显示）
            const progress = EventEngine.getChapterEndingProgress(chapter.id);
            const progressText = (status === 'completed' && progress.total > 0)
                ? `<span class="block text-xs text-slate-400 mt-1">已体验结局 ${progress.seenCount}/${progress.total}${progress.allSeen ? ' ✅' : ''}</span>`
                : '';

            return `
                <button onclick="${action}" class="w-full text-left text-sm ${locked ? 'bg-slate-50 opacity-80' : 'bg-white hover:bg-violet-50'} border ${locked ? 'border-slate-200' : 'border-slate-200 hover:border-violet-300'} p-4 rounded-xl transition flex justify-between items-center shadow-sm">
                    <span class="flex-1">
                        <span class="font-bold ${locked ? 'text-slate-500' : 'text-slate-800'}">${chapter.icon} ${displayTitle.replace(/^[一二三四]、/, '')}</span>
                        <span class="block text-xs text-slate-400 mt-0.5 leading-relaxed">${chapter.theme}</span>
                        ${lockedHint}
                        ${progressText}
                    </span>
                    <span class="text-xs px-2 py-0.5 rounded font-bold shrink-0 ${m.cls}">${m.label}</span>
                </button>
            `;
        }).join('');

        return `
            <div class="space-y-2">
                <div class="flex justify-between items-center px-0.5">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">📖 主线剧情</span>
                    <span class="text-xs text-slate-400">自由选择，按你的节奏探索</span>
                </div>
                ${cards}
            </div>
        `;
    },

    lockedChapterHint(chapterId) {
        const chapter = StoryChapters.find(c => c.id === chapterId);
        if (!chapter) return;
        const r = chapter.roommateId !== 'player' ? GameState.roommates.find(x => x.id === chapter.roommateId) : null;
        const hint = chapter.roommateId === 'player'
            ? '先体验三名舍友的故事（各自达成一个结局），就能解锁你自己的故事。'
            : `先通过「观察舍友」收集关于 ${r ? r.name : '这位舍友'} 的真实线索，即可解锁 ta 的故事线。`;
        alert(hint);
    },

    // ============================================================
    //  🎬 事件渲染（舍友互动/观察触发的事件）
    // ============================================================
    renderEventView(ev, view) {
        const streamHtml = GameState.eventStream.slice(0, 5).map(log => {
            let colorClass = "text-slate-500";
            if (log.includes('❌') || log.includes('失败') || log.includes('骗')) colorClass = "text-red-500";
            if (log.includes('✅') || log.includes('成功')) colorClass = "text-emerald-500";
            return `<div class="text-xs leading-relaxed border-l-2 border-slate-300 pl-2 mb-1 ${colorClass}">${log}</div>`;
        }).join('');

        const tagMap = {
            _isRoommateEvent: '👀 舍友异常',
            _isLongScamEvent: '🧠 长线洗脑',
            _isDailyEvent: '🏠 日常羁绊',
            _isInteractionEvent: '👥 舍友互动',
            _isJudgeEvent: '🧠 舍友判断',
            _isMultiEvent: '👥 舍友联动',
            _isGrindStory: '🎭 舍友小剧场'
        };
        let tag = '📋 突发事件';
        for (const k in tagMap) if (ev[k]) tag = tagMap[k];

        view.innerHTML = `
            <div class="p-5 flex flex-col min-h-full gap-3">
                <div class="bg-white border-slate-200 border p-4 rounded-2xl shadow-sm">
                    <div class="text-xs text-slate-400 mb-2">${tag}</div>
                    <h2 class="text-base font-bold text-slate-900 mb-2 leading-relaxed">${ev.title}</h2>
                    <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-3">${ev.desc}</p>
                </div>

                ${streamHtml ? `
                <div class="bg-slate-50 rounded-xl p-3">
                    <h4 class="text-xs font-bold text-slate-400 mb-1.5 uppercase">📜 近期履历</h4>
                    ${streamHtml}
                </div>` : ''}

                <div class="space-y-2">
                    ${ev.options.map((opt, idx) => {
                        let dangerDot = '<span class="text-emerald-500 mr-1.5">🟢</span>';
                        if (opt.danger === 'high') dangerDot = '<span class="text-red-500 mr-1.5">🔴</span>';
                        else if (opt.danger === 'low') dangerDot = '<span class="text-amber-500 mr-1.5">🟡</span>';
                        return `
                            <button onclick="UI.handleMonthStartOption(${idx})" class="w-full text-left text-sm bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 p-3.5 rounded-xl transition flex items-start shadow-sm leading-relaxed">
                                ${dangerDot}
                                <span>${opt.text}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    handleMonthStartOption(idx) {
        const ev = GameState.currentMonthEvent;
        const opt = ev.options[idx];

        let resultText = "";

        // 剧本式剧情章节事件：走多幕分支对话逻辑
        if (ev._isChapterEvent) {
            // ✅ 门槛二次校验：防止绕过
            if (opt.require) {
                const check = EventEngine.checkOptionRequire(opt, ev._targetRoommateId || null);
                if (!check.ok) {
                    this.showLockedOptionHint(idx);
                    return;
                }
            }
            this.handleChapterOption(opt, ev);
            return;
        }

        // 舍友干预事件：走专门的干预判定
        if (ev._isRoommateEvent && opt.intervention) {
            const targetId = GameState.currentEventTarget || (ev._targetRoommateId);
            const resolution = EventEngine.resolveIntervention(opt, targetId, ev);

            const logIcon = resolution.success ? '✅' : '❌';
            GameState.eventStream.unshift(`${logIcon} [舍友] ${opt.log}`);
            GameState.historyLogs.unshift(`[舍友] ${opt.log}`);

            this.showResultFeedback(
                `${resolution.resultText}\n\n${resolution.extraTip}`,
                resolution.success ? `挽救 ¥${resolution.savedMoney}` : '舍友被骗',
                () => {
                    GameState.isMonthStartPhase = false;
                    this.switchApp('home');
                }
            );
            return;
        }

        // 长线洗脑事件：走长线结算
        if (ev._isLongScamEvent) {
            const resolution = EventEngine.resolveLongScam(opt, ev);
            const logIcon = resolution.success ? '✅' : '❌';
            GameState.eventStream.unshift(`${logIcon} [长线] ${opt.log || ev.title}`);
            GameState.historyLogs.unshift(`[长线] ${opt.log || ev.title}`);

            this.showResultFeedback(
                `${resolution.resultText}\n\n${resolution.extraTip}`,
                resolution.success ? '成功挽回舍友' : '洗脑加深',
                () => {
                    GameState.isMonthStartPhase = false;
                    this.switchApp('home');
                }
            );
            return;
        }

        // 日常互动事件：结算 affectRoommate
        if (ev._isDailyEvent && opt.affectRoommate) {
            const targetId = GameState.currentEventTarget || ev._targetRoommateId;
            EventEngine.applyInteraction(opt, targetId);
            const r = GameState.roommates.find(x => x.id === targetId);
            if (r && opt.affectRoommate.trust) {
                resultText += ` 与${r.name}的关系${opt.affectRoommate.trust > 0 ? '升温' : '降温'}。 `;
            }
        }

        // 刷值小剧情（舍友相关的诈骗/迷惑疑似）：专门结算
        if (ev._isGrindStory) {
            const targetId = GameState.currentEventTarget || ev._targetRoommateId;
            const r = GameState.roommates.find(x => x.id === targetId);

            // 应用舍友结算（trust/status/money/scamProgress）
            if (opt.affectRoommate) {
                if (opt.affectRoommate.trust !== undefined) RoommateManager.changeTrust(targetId, opt.affectRoommate.trust);
                if (opt.affectRoommate.status !== undefined) r.status = opt.affectRoommate.status;
                if (opt.affectRoommate.scamProgress !== undefined) r.scamProgress = Math.max(0, Math.min(100, opt.affectRoommate.scamProgress));
                if (opt.affectRoommate.money !== undefined) r.money = Math.max(0, r.money + opt.affectRoommate.money);
                if (opt.affectRoommate.status === 'scammed') GameState.counters.roommateScammed++;
            }

            // 应用玩家说服力结算
            if (opt.effect && opt.effect.persuasion !== undefined) {
                GameState.stats.persuasion = Math.max(0, Math.min(100, GameState.stats.persuasion + opt.effect.persuasion));
            }

            const good = opt.correct === true;
            const resultTitle = good
                ? (ev._grindKind === 'scam' ? '✅ 识破骗局！' : '🤝 虚惊一场！')
                : (ev._grindKind === 'scam' ? '❌ 误判了……' : '⚠️ 误会了……');
            // 同时展示说服力与信任值变化
            const gains = [];
            if (opt.effect && opt.effect.persuasion !== undefined && opt.effect.persuasion !== 0) {
                gains.push(`🗣️ 说服力 ${opt.effect.persuasion > 0 ? '+' : ''}${opt.effect.persuasion}`);
            }
            if (opt.affectRoommate && opt.affectRoommate.trust !== undefined && opt.affectRoommate.trust !== 0) {
                gains.push(`🤝 信任值 ${opt.affectRoommate.trust > 0 ? '+' : ''}${opt.affectRoommate.trust}`);
            }
            const statText = gains.join(' · ');

            this.eventStreamUnshiftWithLog(`${good ? '✅' : '❌'} [小剧场] ${opt.text.substring(0, 12)}...`);

            this.showResultFeedback(`${resultTitle}\n\n${opt.tip}`, statText, () => {
                GameState.isMonthStartPhase = false;
                this.switchApp('home');
            });
            return;
        }

        // 通用 effect 结算（精简后仅剩 money/persuasion）
        if (opt.effect) {
            if (opt.effect.money) { GameState.stats.money += Math.round(opt.effect.money); resultText += `资金 ${opt.effect.money > 0 ? '+' : ''}${Math.round(opt.effect.money)}。 `; }
            if (opt.effect.persuasion || opt.effect.alertness) { const a = Math.round(opt.effect.persuasion || opt.effect.alertness || 0); GameState.stats.persuasion = Math.max(0, Math.min(100, GameState.stats.persuasion + a)); resultText += `说服力 ${a > 0 ? '+' : ''}${a}。 `; }
        }

        // 舍友互动事件：结算 affectRoommate
        if (ev._isInteractionEvent && opt.affectRoommate) {
            const targetId = GameState.currentEventTarget || ev._targetRoommateId;
            EventEngine.applyInteraction(opt, targetId);
            const r = GameState.roommates.find(x => x.id === targetId);
            if (r && opt.affectRoommate.trust) {
                resultText += ` 与${r.name}的关系${opt.affectRoommate.trust > 0 ? '升温' : '降温'}。 `;
            }
        }

        // 判定式舍友事件：结算对错
        if (ev._isJudgeEvent && opt.affectRoommate) {
            const targetId = GameState.currentEventTarget || ev._targetRoommateId;
            EventEngine.applyJudgeEvent(opt, targetId);
            const r = GameState.roommates.find(x => x.id === targetId);
            if (opt.isScam === true) {
                resultText += ` 你判断正确，${r ? r.name : '舍友'}躲过一劫！ `;
            } else {
                resultText += ` 你判断失误，${r ? r.name : '舍友'}陷了进去…… `;
            }
        }

        // 多舍友联动事件：结算多人
        if (ev._isMultiEvent && opt.affectRoommates) {
            EventEngine.applyMultiEvent(opt);
            resultText += ` 多个舍友的命运就此改变。 `;
        }

        if (opt.danger === 'high' || opt.isCorrect === false) {
            GameState.counters.scamFailures++;
            GameState.flags.recentlyScammed = true;
        } else if (opt.danger === 'safe' || opt.isCorrect === true) {
            GameState.counters.scamAvoids++;
            GameState.flags.recentlyScammed = false;
        }

        if (opt.flag) {
            GameState.flags[opt.flag] = true;
        }

        let logIcon = opt.danger === 'high' ? '❌' : (opt.danger === 'safe' ? '✅' : '📝');
        let logMsg = `[${ev.title.replace(/【.*?】/g, '').substring(0, 6)}] ${opt.text.substring(0, 10)}... ${resultText}`;

        GameState.eventStream.unshift(`${logIcon} ${logMsg}`);
        GameState.historyLogs.unshift(`[事件] ${opt.log || ev.title}`);

        this.showResultFeedback(opt.tip, resultText, () => {
            GameState.isMonthStartPhase = false;
            this.switchApp('home');
        });
    },

    showResultFeedback(tip, statChanges, onClose) {
        const modal = document.getElementById('global-modal');
        modal.innerHTML = `
            <div class="bg-slate-900/95 text-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-700 space-y-4 transform transition-all duration-300 scale-95 opacity-0" id="feedback-card">
                <div class="text-center"><div class="text-4xl mb-2">📜</div><h3 class="font-bold text-lg mb-1 tracking-wider text-amber-400">事件结算</h3></div>
                <div class="bg-slate-800 p-4 rounded-xl border border-slate-700"><p class="text-sm leading-relaxed text-slate-200 text-center whitespace-pre-line">${tip}</p></div>
                <div class="flex flex-wrap gap-2 justify-center">${statChanges ? `<span class="text-xs bg-slate-800 text-emerald-400 px-3 py-1 rounded-full border border-slate-700">${statChanges}</span>` : ''}</div>
                <button id="btn-close-feedback" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm mt-4 transition">继续</button>
            </div>
        `;
        modal.classList.remove('hidden');
        requestAnimationFrame(() => { document.getElementById('feedback-card').classList.remove('scale-95', 'opacity-0'); document.getElementById('feedback-card').classList.add('scale-100', 'opacity-100'); });
        document.getElementById('btn-close-feedback').onclick = () => { modal.classList.add('hidden'); onClose(); };
    },

    // ============================================================
    //  📖 剧本式剧情章节（四章主线）
    // ============================================================
    startStoryChapter(chapterId) {
        let ev = null;

        if (chapterId) {
            const chapter = StoryChapters.find(c => c.id === chapterId);
            if (!chapter) { this.switchApp('home'); return; }

            const isInProgress = GameState.storyChapter.currentChapter === chapterId;
            const isCompleted = GameState.storyChapter.completedChapters.includes(chapterId);
            if (!isInProgress && !isCompleted) {
                const entry = EventEngine.listChapters().find(x => x.chapter.id === chapterId);
                if (entry && entry.status === 'locked') { this.lockedChapterHint(chapterId); return; }
            }

            if (isInProgress && GameState.storyChapter.currentScene !== null && GameState.storyChapter.currentScene !== undefined) {
                ev = EventEngine.buildChapterSceneEvent(chapter, GameState.storyChapter.currentScene);
            }
            if (!ev) {
                ev = EventEngine.startChapterById(chapterId);
            }
        } else if (GameState.storyChapter.currentChapter) {
            const chapter = EventEngine.getCurrentChapter();
            if (chapter && GameState.storyChapter.currentScene !== null && GameState.storyChapter.currentScene !== undefined) {
                ev = EventEngine.buildChapterSceneEvent(chapter, GameState.storyChapter.currentScene);
            }
            if (!ev) {
                ev = EventEngine.startChapter(GameState.storyChapter.currentChapter);
            }
        } else {
            this.switchApp('home');
            return;
        }

        if (!ev) { this.switchApp('home'); return; }
        GameState.currentMonthEvent = ev;
        GameState.isMonthStartPhase = true;
        this.switchApp('home');
    },

    /**
     * 🚪 中途退出剧情：保存当前进度并回到主页。
     *  - 不清空 currentChapter/currentScene，下次进入该章节时从当前幕继续。
     *  - 用于数值不足时先退出刷值，再回来接着玩。
     */
    exitChapter() {
        const chapterId = GameState.storyChapter.currentChapter;
        GameState.currentMonthEvent = null;
        GameState.isMonthStartPhase = false;
        if (chapterId) {
            const chapter = StoryChapters.find(c => c.id === chapterId);
            const r = chapter && chapter.roommateId !== 'player' ? GameState.roommates.find(x => x.id === chapter.roommateId) : null;
            const name = r ? r.name : '自己';
            this.eventStreamUnshiftWithLog(`🚪 你暂时退出了「${chapter ? chapter.icon : ''}${name}」的剧情，进度已保存，可随时回来继续。`);
        }
        this.switchApp('home');
    },

    /**
     * ✅ 提示玩家某选项尚未解锁（门槛不足），并引导刷值
     */
    showLockedOptionHint(idx) {
        const ev = GameState.currentMonthEvent;
        const opt = ev && ev.options ? ev.options[idx] : null;
        if (!opt || !opt.require) return;
        const check = EventEngine.checkOptionRequire(opt, ev._targetRoommateId || null);
        const modal = document.getElementById('global-modal');
        const target = GameState.roommates.find(x => x.id === ev._targetRoommateId) || null;
        const targetName = target ? target.name : '舍友';
        const guide = check.missing.some(m => m.includes('信任'))
            ? `去「和舍友互动」多陪陪 ${targetName}，或用共情方式劝导，能提升 ta 的信任值。`
            : `去「观察舍友」收集线索、或在互动事件中成功识破骗局，都能提升说服力。`;
        modal.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 space-y-3">
                <div class="text-center">
                    <div class="text-4xl mb-2">🔒</div>
                    <h3 class="font-bold text-lg text-slate-900">这个选项暂时还选不了</h3>
                </div>
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p class="text-sm text-slate-700 leading-relaxed">需要：${check.missing.join('　')}</p>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">💡 ${guide}</p>
                <button onclick="document.getElementById('global-modal').classList.add('hidden')" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">知道了</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    handleChapterOption(opt, ev) {
        const chapterId = ev._chapterId;
        const result = EventEngine.advanceChapter(opt, chapterId);

        if (opt.tip) {
            GameState.eventStream.unshift(`💬 ${opt.tip}`);
        }

        if (result.type === 'ending') {
            if (result.chapter && result.ending) {
                const firstTime = !GameState.storyChapter.completedChapters.includes(result.chapter.id);
                EventEngine.completeChapter(result.chapter.id, result.endingId, result.ending.type);

                // ✅ 首次通关第四章（自己的故事）→ 主动弹出毕业结算画面
                if (firstTime && result.chapter.id === 'chapter_player') {
                    this.renderGraduationModal(result.chapter, result.endingId, result.ending);
                } else {
                    this.renderChapterEnding(result.chapter, result.endingId, result.ending, { firstTime });
                }
            } else {
                this.switchApp('home');
            }
        } else if (result.type === 'scene') {
            const nextEv = EventEngine.buildChapterSceneEvent(result.chapter, result.sceneIndex);
            if (nextEv) {
                GameState.currentMonthEvent = nextEv;
                GameState.isMonthStartPhase = true;
                this.switchApp('home');
            } else {
                this.switchApp('home');
            }
        } else {
            this.switchApp('home');
        }
    },

    /**
     * 🎓 毕业结算画面：首次通关第四章（自己的故事）时主动弹出
     *  - 展示毕业仪式感 + 防诈段位评定 + 通关统计 + 后续探索提示。
     */
    renderGraduationModal(chapter, endingId, ending) {
        const rank = EndingManager.getRankEnding();
        const modal = document.getElementById('global-modal');

        const rankColor = rank.type === 'good' ? 'text-amber-600' : (rank.type === 'bad' ? 'text-red-600' : 'text-slate-700');

        const completedCount = GameState.storyChapter.completedChapters.length;
        const totalChapters = EventEngine.getTotalChapters();
        const goodCount = Object.values(GameState.storyChapter.firstEndings || {}).filter(e => e.type === 'good').length;
        const scammedCount = GameState.roommates.filter(r => r.status === 'scammed').length;
        const safeCount = GameState.roommates.length - scammedCount;

        modal.innerHTML = `
            <div class="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-700 space-y-4 max-h-[85vh] overflow-y-auto p-6">
                <div class="text-center border-b border-slate-700 pb-4">
                    <div class="text-6xl mb-3">🎓</div>
                    <h3 class="font-bold text-2xl text-amber-300 mb-1">恭喜毕业！</h3>
                    <p class="text-sm text-slate-300 leading-relaxed">四段故事，四年光阴，你一路守护着这间宿舍走到了最后。</p>
                </div>

                <div class="bg-slate-800/80 rounded-xl p-4 text-center border border-slate-700">
                    <span class="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 bg-amber-100 text-amber-700">防诈段位评定</span>
                    <div class="font-bold text-xl ${rankColor}">${rank.title}</div>
                    <p class="text-sm text-slate-300 mt-2 leading-relaxed whitespace-pre-line">${rank.desc}</p>
                </div>

                <div class="grid grid-cols-3 gap-2 text-center">
                    <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                        <div class="text-2xl mb-1">📖</div>
                        <div class="text-sm font-bold">${completedCount}/${totalChapters}</div>
                        <div class="text-xs text-slate-400">通关剧情</div>
                    </div>
                    <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                        <div class="text-2xl mb-1">✨</div>
                        <div class="text-sm font-bold">${goodCount}/${totalChapters}</div>
                        <div class="text-xs text-slate-400">首次好结局</div>
                    </div>
                    <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                        <div class="text-2xl mb-1">🛡️</div>
                        <div class="text-sm font-bold">${safeCount}/${GameState.roommates.length}</div>
                        <div class="text-xs text-slate-400">舍友安然</div>
                    </div>
                </div>

                <div class="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                    <p class="text-sm text-slate-300 leading-relaxed text-center">🌟 毕业后，你仍可以回到任意章节，探索未体验过的结局——这不会改变已评定的段位。</p>
                </div>

                <button onclick="UI.viewGraduationChapterDetail()" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm transition">📄 查看本章结局详情</button>
                <button onclick="document.getElementById('global-modal').classList.add('hidden'); UI.switchApp('home');" class="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold text-sm transition">🏠 回宿舍</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    /** 从毕业结算画面跳转到第四章的详细结局卡（反诈课堂） */
    viewGraduationChapterDetail() {
        const chapter = StoryChapters.find(c => c.id === 'chapter_player');
        if (!chapter) { this.switchApp('home'); return; }
        const endingId = GameState.storyChapter.firstEndings['chapter_player']?.endingId || 'safe';
        const ending = chapter.endings[endingId] || chapter.endings.safe;
        this.renderChapterEnding(chapter, endingId, ending, { firstTime: false });
    },

    renderChapterEnding(chapter, endingId, ending, opts = {}) {
        const endingCard = EventEngine.buildChapterEnding(chapter, endingId, ending);
        const modal = document.getElementById('global-modal');

        const pointsHtml = (endingCard.lesson.points || []).map(p => `<li class="text-sm text-slate-600 leading-relaxed">${p}</li>`).join('');
        const tipsHtml = (endingCard.lesson.tips || []).map(t => `<li class="text-sm text-slate-600 leading-relaxed">💡 ${t}</li>`).join('');
        const psychHtml = (endingCard.lesson.psychology || []).map(p => `<li class="text-sm text-slate-600 leading-relaxed">${p}</li>`).join('');

        const typeColor = endingCard.endingType === 'good' ? 'text-emerald-600' : (endingCard.endingType === 'bad' ? 'text-red-600' : 'text-amber-600');
        const typeIcon = endingCard.endingType === 'good' ? '🏆' : (endingCard.endingType === 'bad' ? '💔' : '🤝');

        // ✅ 学年推进提示（首次通关时）
        const firstTime = opts.firstTime === true;
        const graduated = EventEngine.isGraduated();
        const yearLabel = EventEngine.getCurrentYearLabel();
        const yearBanner = firstTime
            ? (graduated
                ? `<div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                       <div class="text-2xl mb-1">🎓</div>
                       <p class="text-sm font-bold text-amber-800">恭喜，你毕业了！</p>
                       <p class="text-xs text-amber-700 mt-1 leading-relaxed">四段故事都已通关。你可以继续探索其他结局，这不会影响已评定的段位。</p>
                   </div>`
                : `<div class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                       <div class="text-2xl mb-1">📅</div>
                       <p class="text-sm font-bold text-blue-800">时光流转，你进入了 ${yearLabel}</p>
                       <p class="text-xs text-blue-700 mt-1 leading-relaxed">新的学年，新的故事在等你。</p>
                   </div>`)
            : '';

        // ✅ 本章结局进度（已体验结局数 / 总结局数）
        const progress = EventEngine.getChapterEndingProgress(chapter.id);
        const allSeenThisChapter = progress.allSeen;

        // ✅ 全结局达成（所有章节的全部结局都体验完）
        const allEndingsSeen = EventEngine.isAllEndingsSeen();

        const allSeenBanner = allEndingsSeen ? `
            <div class="bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-200 rounded-xl p-4 text-center">
                <div class="text-3xl mb-1">🎊</div>
                <p class="text-sm font-bold text-violet-800">你已体验完所有故事的全部结局！</p>
                <p class="text-xs text-violet-700 mt-1.5 leading-relaxed">一路走来，你识破了无数骗局，也读懂了每一个室友的心事。愿这份清醒与温柔，陪你走过往后漫长又安稳的岁月。🌸</p>
            </div>` : '';

        modal.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
                <div class="text-center border-b pb-3">
                    <div class="text-4xl mb-2">${typeIcon}</div>
                    <span class="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${endingCard.endingType === 'good' ? 'bg-emerald-100 text-emerald-700' : (endingCard.endingType === 'bad' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}">${chapter.icon} ${endingCard.theme}</span>
                    <h3 class="font-bold text-lg ${typeColor}">${endingCard.endingTitle}</h3>
                </div>

                ${yearBanner}

                <div class="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span>本章结局进度</span>
                    <span class="${allSeenThisChapter ? 'text-emerald-600 font-bold' : ''}">${progress.seenCount} / ${progress.total} 个结局</span>
                </div>

                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">${endingCard.endingDesc}</p>
                </div>

                <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 class="text-sm font-bold text-blue-800 mb-2">${endingCard.lesson.title}</h4>
                    <ul class="space-y-1.5 list-disc pl-4">${pointsHtml}</ul>
                </div>

                <div class="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <h4 class="text-sm font-bold text-amber-800 mb-2">反诈小贴士</h4>
                    <ul class="space-y-1.5 list-none">${tipsHtml}</ul>
                </div>

                ${psychHtml ? `
                <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h4 class="text-sm font-bold text-indigo-800 mb-2">🧠 真实心理画像：为什么好人也会中招</h4>
                    <ul class="space-y-1.5 list-disc pl-4">${psychHtml}</ul>
                </div>` : ''}

                <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <h4 class="text-sm font-bold text-emerald-800 mb-2">📞 校园安全，我们可以找谁？</h4>
                    <div class="space-y-1.5">
                        ${CampusContact.map(c => `
                            <div class="text-xs leading-relaxed">
                                <span class="text-slate-500">· ${c.situation}</span>
                                <span class="block text-emerald-700 font-medium">　${c.help}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${allSeenBanner}

                <button onclick="document.getElementById('global-modal').classList.add('hidden'); UI.switchApp('course');" class="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-500 transition">📘 翻开通识课，看看为什么会这样</button>

                <button onclick="UI.closeChapterEnding()" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">继续探索</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    closeChapterEnding() {
        const modal = document.getElementById('global-modal');
        modal.classList.add('hidden');
        GameState.isMonthStartPhase = false;
        this.switchApp('home');
    },

    renderChapterSceneView(ev, view) {
        const sceneNum = ev._sceneIndex + 1;
        if (!this.chapterOptionsOpen) this.chapterOptionsOpen = {};

        const clueHtml = ev.clue ? `
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                <div class="text-sm font-bold text-amber-800 mb-1">${ev.clue.label}</div>
                <div class="text-xs text-amber-700 leading-relaxed">${ev.clue.detail}</div>
            </div>
        ` : '';

        // 选项折叠状态：以场景事件 id 为 key（避免不同幕之间共享展开状态）
        const sceneKey = ev.id || (`scene_${ev._sceneIndex}`);
        const optionsOpen = !!this.chapterOptionsOpen[sceneKey];

        // 选项列表 HTML（展开时渲染）
        const optionsHtml = ev.options.map((opt, idx) => {
            const req = opt.require;
            let lockHtml = '';
            let locked = false;
            let onClick = `UI.handleMonthStartOption(${idx})`;
            if (req) {
                const check = EventEngine.checkOptionRequire(opt, ev._targetRoommateId || null);
                locked = !check.ok;
                if (locked) {
                    onClick = `UI.showLockedOptionHint(${idx})`;
                    lockHtml = `<span class="block text-xs text-amber-600 mt-1 leading-relaxed">🔒 需 ${check.missing.join('、')}</span>`;
                } else {
                    lockHtml = `<span class="block text-xs text-emerald-600 mt-1 leading-relaxed">✅ 已满足条件</span>`;
                }
            }
            return `
                <button onclick="${onClick}" class="w-full text-left text-sm ${locked ? 'bg-slate-100 opacity-70 cursor-not-allowed border-slate-200' : 'bg-slate-50 hover:bg-violet-50 border-slate-200 hover:border-violet-300'} border text-slate-700 p-3.5 rounded-xl transition shadow-sm leading-relaxed">
                    ${opt.text}
                    ${lockHtml}
                </button>
            `;
        }).join('');

        view.innerHTML = `
            <div class="flex-1 min-h-0 flex flex-col overflow-hidden">
                <div class="px-5 pt-5 pb-3 bg-slate-900 text-white shrink-0">
                    <div class="flex justify-between items-center text-sm">
                        <span class="font-bold">${ev._chapterIcon} ${ev._chapterTitle}</span>
                        <span class="text-slate-400 text-xs">第 ${sceneNum} 幕</span>
                    </div>
                    <div class="text-xs text-slate-400 mt-1 leading-relaxed">${ev._theme}</div>
                </div>

                <!-- 正文区：独立滚动 -->
                <div class="flex-1 overflow-y-auto px-5 py-4 min-h-0">
                    <span class="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-md mb-2 shadow-sm">📖 主线剧情</span>
                    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
                        <h2 class="text-base font-bold text-slate-900 mb-3 leading-relaxed">${ev.title}</h2>
                        <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-4">${ev.desc}</p>
                        ${clueHtml}
                    </div>
                </div>

                <!-- 底部：选项折叠区 + 退出按钮 -->
                <div class="px-5 pb-5 pt-3 border-t border-slate-200 bg-white/60 backdrop-blur shrink-0">
                    <button onclick="UI.toggleChapterOptions('${sceneKey}')" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2">
                        <span>💬 做出你的选择</span>
                        <span class="text-xs text-slate-300">${optionsOpen ? '▲ 收起' : '▼ 展开'}</span>
                    </button>

                    <div class="mt-3 space-y-2 ${optionsOpen ? '' : 'hidden'} max-h-[45vh] overflow-y-auto">
                        ${optionsHtml}
                    </div>

                    <button onclick="UI.exitChapter()" class="mt-3 w-full text-slate-400 hover:text-slate-600 text-xs py-1.5 rounded-lg font-medium transition text-center">🚪 中途退出剧情（返回主页）</button>
                </div>
            </div>
        `;
    },

    /** 切换剧情场景的选项折叠/展开状态 */
    toggleChapterOptions(sceneKey) {
        if (!this.chapterOptionsOpen) this.chapterOptionsOpen = {};
        this.chapterOptionsOpen[sceneKey] = !this.chapterOptionsOpen[sceneKey];
        const view = document.getElementById('app-view');
        const ev = GameState.currentMonthEvent;
        if (view && ev && ev._isChapterEvent) {
            this.renderChapterSceneView(ev, view);
        }
    },

    // ============================================================
    //  🏁 结束探索 · 防诈段位结局
    // ============================================================
    endExplore() {
        const rank = EndingManager.getRankEnding();
        const modal = document.getElementById('global-modal');

        const rankColor = rank.type === 'good' ? 'text-amber-600' : (rank.type === 'bad' ? 'text-red-600' : 'text-slate-700');

        // ✅ 首次通关结果统计（用于展示）
        const goodCount = Object.values(GameState.storyChapter.firstEndings || {}).filter(e => e.type === 'good').length;
        const completedCount = GameState.storyChapter.completedChapters.length;
        const graduated = EventEngine.isGraduated();
        const allEndingsSeen = EventEngine.isAllEndingsSeen();

        // 全结局达成祝福（所有章节全部结局都体验完）
        const allSeenBadge = allEndingsSeen
            ? `<div class="bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-200 rounded-xl p-4 text-center mb-2">
                   <div class="text-3xl mb-1">🎊</div>
                   <p class="text-sm font-bold text-violet-800">你已体验完所有故事的全部结局！</p>
                   <p class="text-xs text-violet-700 mt-1.5 leading-relaxed">一路走来，你识破了无数骗局，也读懂了每一个室友的心事。愿这份清醒与温柔，陪你走过往后漫长又安稳的岁月。🌸</p>
               </div>`
            : '';

        // 毕业徽章（四章全通关时展示）
        const graduateBadge = graduated
            ? `<div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center mb-2">
                   <div class="text-2xl mb-1">🎓</div>
                   <p class="text-sm font-bold text-amber-800">你毕业了</p>
                   <p class="text-xs text-amber-700 mt-1 leading-relaxed">四段故事都已通关。毕业后你仍可以回到任意章节，探索未体验过的结局——这不会改变已评定的段位。</p>
               </div>`
            : '';

        // 终局（反诈之神/孤独的清醒者/全通关）不再提供「继续探索」
        const isFinal = rank.isFinal === true || completedCount >= 4;
        const continueBtn = allEndingsSeen
            ? `<button onclick="location.reload()" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">🌟 重新开始新的旅程</button>`
            : (isFinal
                ? `<button onclick="document.getElementById('global-modal').classList.add('hidden'); UI.switchApp('home');" class="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition">🔍 回宿舍继续探索其他结局</button>
                   <button onclick="location.reload()" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">🏆 重新开始新的旅程</button>`
                : `<button onclick="document.getElementById('global-modal').classList.add('hidden'); UI.switchApp('home');" class="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition">继续探索</button>
                   <button onclick="location.reload()" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">重新开始</button>`);

        modal.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
                <div class="text-center border-b pb-3">
                    <div class="text-5xl mb-2">🎖️</div>
                    <span class="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 bg-amber-100 text-amber-700">防诈段位评定</span>
                    <h3 class="font-bold text-2xl ${rankColor}">${rank.title}</h3>
                </div>

                ${allSeenBadge}
                ${graduateBadge}

                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">${rank.desc}</p>
                </div>

                <div class="grid grid-cols-2 gap-2 text-center">
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div class="text-2xl mb-1">📖</div>
                        <div class="text-sm font-bold text-slate-800">${completedCount} / ${EventEngine.getTotalChapters()} 章</div>
                        <div class="text-xs text-slate-400">已通关剧情</div>
                    </div>
                    <div class="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div class="text-2xl mb-1">✨</div>
                        <div class="text-sm font-bold text-slate-800">${goodCount} / ${EventEngine.getTotalChapters()} 章</div>
                        <div class="text-xs text-slate-400">首次达成好结局</div>
                    </div>
                </div>

                <p class="text-xs text-slate-400 text-center leading-relaxed">📌 段位以「首次通关」的结果为准，重玩探索其他结局不会改变已评定的段位。</p>

                ${continueBtn}
            </div>
        `;
        modal.classList.remove('hidden');
    },

    renderEndingScreen(ending, view) {
        view.innerHTML = `
            <div class="p-6 flex flex-col justify-center items-center min-h-full text-center bg-gradient-to-b from-slate-50 to-white">
                <div class="text-6xl mb-4">${ending.type === 'good' ? '🏆' : '💔'}</div>
                <h2 class="text-2xl font-bold mb-3 ${ending.type === 'good' ? 'text-amber-600' : 'text-red-600'}">${ending.title}</h2>
                <p class="text-sm text-slate-600 mb-6 leading-relaxed whitespace-pre-line bg-white p-5 rounded-xl border border-slate-200 shadow-sm w-full text-left">${ending.desc}</p>
                <button onclick="location.reload()" class="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-slate-800 transition">再玩一次</button>
            </div>
        `;
    },

    // ============================================================
    //  📊 状态面板
    // ============================================================
    openStatusModal() {
        const modal = document.getElementById('global-modal');

        const statusMap = { normal: '🟢 正常', suspicious: '🟡 可疑', scammed: '🔴 深陷', brainwashed: '🧠 被洗脑' };
        const statusColor = { normal: 'text-emerald-600', suspicious: 'text-amber-600', scammed: 'text-red-600', brainwashed: 'text-violet-600' };
        const roommateHtml = GameState.roommates.map(r => `
            <div class="flex justify-between bg-slate-50 p-2.5 rounded-lg items-center">
                <div class="flex items-center space-x-2">
                    <span>${r.personalityIcon || (r.gender === '女' ? '👧' : '👦')}</span>
                    <span class="font-bold text-slate-700">${r.name}</span>
                </div>
                <div class="flex items-center space-x-3">
                    <span class="text-xs ${statusColor[r.status]} font-bold">${statusMap[r.status]}</span>
                    <span class="text-xs text-slate-500">信任${Math.round(r.trust)}</span>
                </div>
            </div>
        `).join('');

        modal.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
                <div class="flex justify-between items-center border-b pb-3">
                    <h3 class="font-bold text-slate-900 text-base">📊 我的状态</h3>
                    <button onclick="UI.closeStatusModal()" class="text-slate-400 font-bold text-lg">&times;</button>
                </div>
                <div class="space-y-2 text-sm text-slate-700">
                    <div class="flex justify-between bg-slate-50 p-2.5 rounded-lg"><span>姓名:</span> <strong>${GameState.player.name}（${GameState.player.gender}）</strong></div>
                    <div class="flex justify-between bg-emerald-50 p-2.5 rounded-lg text-emerald-900"><span>💰 余额:</span> <strong class="${GameState.stats.money < 0 ? 'text-red-600' : ''}">¥${GameState.stats.money}</strong></div>
                    <div class="flex justify-between bg-blue-50 p-2.5 rounded-lg text-blue-900"><span>🗣️ 说服力:</span> <strong>${Math.round(GameState.stats.persuasion)} / 100</strong></div>
                    <div class="border-t border-slate-200 pt-2 mt-2">
                        <div class="text-sm font-bold text-slate-500 mb-1">👥 舍友信任值</div>
                        <p class="text-xs text-slate-400 mb-2 leading-relaxed">信任值越高，关键剧情选项越容易解锁、劝说成功率越高。</p>
                        <div class="space-y-1.5">${roommateHtml}</div>
                    </div>
                </div>
                <button onclick="UI.closeStatusModal()" class="w-full bg-slate-900 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800">关闭</button>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    closeStatusModal() { document.getElementById('global-modal').classList.add('hidden'); },

    // ============================================================
    //  🧭 开场认知破冰
    // ============================================================
    showCognitionIntro() {
        const m = document.getElementById('global-modal');
        const intro = AntiFraudCourse.cognitionIntro;
        const paras = intro.paragraphs.map(p => `<p class="text-sm text-slate-600 leading-relaxed mb-2">${p}</p>`).join('');
        m.innerHTML = `
            <div class="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 space-y-3 max-h-[85vh] overflow-y-auto">
                <div class="text-center">
                    <div class="text-4xl mb-2">🧭</div>
                    <h3 class="font-bold text-lg text-slate-900">${intro.title}</h3>
                </div>
                ${paras}
                <button onclick="UI.closeCognitionIntro()" class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition">我明白了，开始游戏</button>
            </div>
        `;
        m.classList.remove('hidden');
    },

    closeCognitionIntro() {
        document.getElementById('global-modal').classList.add('hidden');
    },

    // ============================================================
    //  📘 反诈通识课
    // ============================================================
    renderCourse() {
        const C = AntiFraudCourse;
        const listHtml = (arr, cls) => (arr || []).map(x => `<li class="text-sm text-slate-600 leading-relaxed">${x}</li>`).join('');
        if (!this.courseExpanded) this.courseExpanded = {};

        // 认知破冰卡片：默认折叠，点击展开
        const introOpen = !!this.courseExpanded['_intro'];
        const introCard = `
            <div class="bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-2xl shadow-md overflow-hidden">
                <button onclick="UI.toggleCourseCard('_intro')" class="w-full flex items-center justify-between p-5 text-left">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">🧭</span>
                        <span class="font-bold text-base">${C.cognitionIntro.title}</span>
                    </div>
                    <span class="text-slate-300 text-sm">${introOpen ? '▲ 收起' : '▼ 展开'}</span>
                </button>
                <div class="px-5 pb-5 ${introOpen ? '' : 'hidden'}">
                    ${C.cognitionIntro.paragraphs.map(p => `<p class="text-sm text-slate-200 leading-relaxed mb-1.5">${p}</p>`).join('')}
                </div>
            </div>
        `;

        // 五个模块卡片：默认只显示图标+标题+摘要，点击展开详情
        const moduleCards = C.modules.map(m => {
            const open = !!this.courseExpanded[m.id];
            return `
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <button onclick="UI.toggleCourseCard('${m.id}')" class="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 transition">
                    <span class="text-2xl shrink-0">${m.icon}</span>
                    <div class="flex-1">
                        <h3 class="font-bold text-sm text-slate-900">${m.title}</h3>
                        <p class="text-xs text-slate-400 mt-0.5 leading-relaxed">${m.summary}</p>
                    </div>
                    <span class="text-slate-400 text-sm shrink-0">${open ? '▲' : '▼'}</span>
                </button>
                <div class="px-4 pb-4 space-y-3 ${open ? '' : 'hidden'}">
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 uppercase mb-1">核心认知</h4>
                        <ul class="list-disc pl-4 space-y-1">${listHtml(m.keyPoints)}</ul>
                    </div>
                    <div class="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <h4 class="text-xs font-bold text-amber-700 uppercase mb-1">真实心理画像</h4>
                        <ul class="list-disc pl-4 space-y-1">${listHtml(m.psychology)}</ul>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <h4 class="text-xs font-bold text-blue-700 uppercase mb-1">实操指南 · 话术 / 求助</h4>
                        <ul class="list-disc pl-4 space-y-1">${listHtml(m.guidance)}</ul>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        const quizCard = `
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <h3 class="font-bold text-sm text-slate-900 mb-1">📝 反诈小测：结论给出现实心理</h3>
                <p class="text-xs text-slate-400 mb-3 leading-relaxed">做题是第三视角，你一眼能看出答案；但真实发生时，情绪会替你做决定。</p>
                <div id="quiz-section">${this.renderQuizSection()}</div>
            </div>
        `;

        const summaryCard = `
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <h3 class="font-bold text-sm text-slate-900 mb-3">🎯 教育的四个目的</h3>
                <div class="grid grid-cols-2 gap-2">
                    ${C.summary.map(s => `
                        <div class="bg-slate-50 border border-slate-200 rounded-xl p-3">
                            <div class="text-xl mb-1">${s.icon}</div>
                            <div class="text-sm font-bold text-slate-800">${s.title}</div>
                            <div class="text-xs text-slate-500 leading-relaxed mt-0.5">${s.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return `
            <div class="p-5 space-y-4 min-h-full overflow-y-auto pb-10 bg-slate-50">
                <div class="mb-1">
                    <h2 class="text-lg font-bold text-slate-800">📘 反诈通识课</h2>
                    <p class="text-sm text-slate-500 mt-1 leading-relaxed">从五个维度重新理解诈骗：安全意识 · 幸存者意识 · 法律意识 · 心理意识</p>
                </div>
                ${introCard}
                ${moduleCards}
                ${quizCard}
                ${summaryCard}
            </div>
        `;
    },

    /** 切换通识课卡片的展开/折叠状态 */
    toggleCourseCard(id) {
        if (!this.courseExpanded) this.courseExpanded = {};
        this.courseExpanded[id] = !this.courseExpanded[id];
        const view = document.getElementById('app-view');
        if (view) view.innerHTML = this.renderCourse();
    },

    renderQuizSection() {
        const C = AntiFraudCourse;
        if (!this.courseQuiz) this.courseQuiz = {};
        return C.quiz.map(q => {
            const answered = this.courseQuiz[q.id];
            const optsHtml = q.options.map((opt, oi) => {
                let style = 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-700';
                let mark = '';
                if (answered !== undefined) {
                    if (oi === answered) {
                        style = opt.correct ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold' : 'bg-red-100 border-red-300 text-red-900 font-bold';
                        mark = opt.correct ? ' ✅' : ' ❌';
                    } else if (opt.correct) {
                        style = 'bg-emerald-50 border-emerald-200 text-emerald-800';
                        mark = ' ✅';
                    }
                }
                return `<button onclick="UI.answerQuiz('${q.id}', ${oi})" class="w-full text-left text-sm ${style} border p-3 rounded-lg transition mb-1.5 leading-relaxed">${opt.text}${mark}</button>`;
            }).join('');

            const feedback = answered !== undefined ? `
                <div class="bg-slate-900 text-white p-3 rounded-xl text-sm leading-relaxed mt-2">
                    <div class="font-bold mb-1">📣 现实里会怎样</div>
                    <div>${q.options[answered].reveal}</div>
                    <div class="mt-1.5 pt-1.5 border-t border-white/20 text-slate-200">${q.conclusion}</div>
                </div>
            ` : '';

            return `
                <div class="mb-4 pb-3 border-b border-slate-100 last:border-0">
                    <p class="text-sm text-slate-700 font-medium mb-2 leading-relaxed">${q.scenario}</p>
                    ${optsHtml}
                    ${feedback}
                </div>
            `;
        }).join('');
    },

    answerQuiz(qId, oi) {
        if (!this.courseQuiz) this.courseQuiz = {};
        this.courseQuiz[qId] = oi;
        const el = document.getElementById('quiz-section');
        if (el) el.innerHTML = this.renderQuizSection();
    }
};

window.UI = UI;
