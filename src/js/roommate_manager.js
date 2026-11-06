// ============================================================
//  舍友状态机与随机生成 (RoommateManager)
//  职责：
//  1. 根据玩家性别 + 寝室人数（2/4人间）随机生成舍友，并赋予性格标签。
//  2. 维护舍友状态迁移：
//     normal → suspicious → scammed（短线诈骗）
//     normal → brainwashed（长线洗脑，用 brainwash 0~100 度量）
//  3. 结算信任度、被骗资金、宿舍氛围的联动。
//  4. 观察舍友（消耗行动点）返回一条随机情报。
//  5. 干预抗性判定：不同性格对「强硬/共情/证据/联合/钓鱼」五类干预有不同抗性。
//
//  新增字段说明（挂在每个 roommates 元素上）：
//  - personality:   性格标签（自负/贪财/单纯/暴躁/随和/多疑…）
//  - brainwash:     洗脑进度 0~100（长线洗脑事件的核心度量）
//  - activeLongScam: 当前进行中的长线骗局 id（null 表示无）
//  - longPhase:     长线骗局当前阶段（1=征兆 2=暴露 3=危机，0=未开始）
// ============================================================

import { GameState } from './state.js';

// 男/女姓名池（随机生成舍友）
const MALE_NAMES = ['张伟', '李强', '王鹏', '刘洋', '陈晨', '赵磊', '孙浩', '周杰', '吴昊', '郑爽', '冯斌', '褚健', '蒋涛', '韩磊', '唐凯'];
const FEMALE_NAMES = ['王芳', '李娜', '张静', '刘敏', '陈雪', '赵婷', '孙悦', '周颖', '吴丽', '郑洁', '冯璐', '褚妍', '蒋雯', '韩雪', '唐欣'];

// ✅ 具名舍友（剧情章节《室友，你还好吗？》的固定三名角色）
//  - 女性玩家：林澄 / 陈屿 / 许嘉树（文档原设定）
//  - 男性玩家：林诚 / 陈宇 / 徐家树（男性化对应名）
//  - id 固定，供剧情章节通过 roommateId 绑定。
const NAMED_ROOMMATES = {
    女: [
        { id: 'linCheng', name: '林澄',   nickname: '小澄', personality: 'suspicious', label: '学霸 · 极度在意保研' },
        { id: 'chenYu',   name: '陈屿',   nickname: '小屿', personality: 'naive',      label: '追星女孩 · 期待已久' },
        { id: 'xuJiashu', name: '许嘉树', nickname: '小嘉', personality: 'easygoing',  label: '活泼开朗 · 有点反常' }
    ],
    男: [
        { id: 'linCheng', name: '林诚',   nickname: '小诚', personality: 'suspicious', label: '学霸 · 极度在意保研' },
        { id: 'chenYu',   name: '陈宇',   nickname: '小宇', personality: 'naive',      label: '追星少年 · 期待已久' },
        { id: 'xuJiashu', name: '徐家树', nickname: '小树', personality: 'easygoing',  label: '活泼开朗 · 有点反常' }
    ]
};

// 随机身份标签（玩家自身，增加开局随机性，仅作文本描述不影响数值）
const RANDOM_TRAITS = [
    { trait: '学霸', desc: '成绩优异，但一心扑在书本上，对身边事有点迟钝。' },
    { trait: '社恐', desc: '不太爱说话，习惯独来独往，但内心细腻。' },
    { trait: '小富之家', desc: '家里条件不错，零花钱宽裕，也更容易被盯上。' },
    { trait: '贫困生', desc: '家境困难，靠勤工俭学维生，对赚钱机会格外心动。' },
    { trait: '游戏宅', desc: '沉迷游戏，对网络世界的套路敏感，对现实社交迟钝。' },
    { trait: '热心肠', desc: '乐于助人，朋友很多，但也容易轻信他人。' }
];

// ✅ 舍友性格标签池（鲜明且极端，驱动干预抗性）
// 每个性格定义了「易被骗」类型 + 「五类干预」的抗性系数（1=正常，>1=更难，<1=更容易）
const PERSONALITIES = [
    {
        id: 'arrogant', label: '极度自负', icon: '😤',
        desc: '总觉得别人都不如自己聪明，越劝他越逆反。',
        resistance: { shout: 1.5, empathize: 0.8, evidence: 0.7, ally: 1.2, bait: 1.0 },
        scamWeakness: '投资/理财类（自负者容易相信"自己比别人先看懂"）'
    },
    {
        id: 'greedy', label: '贪财如命', icon: '🤑',
        desc: '对"赚钱机会"毫无抵抗力，见钱眼开。',
        resistance: { shout: 1.1, empathize: 1.3, evidence: 1.0, ally: 1.0, bait: 0.6 },
        scamWeakness: '刷单/兼职/高息理财类'
    },
    {
        id: 'naive', label: '单纯傻白甜', icon: '🥺',
        desc: '人畜无害，特别容易轻信他人，证据能一击必中。',
        resistance: { shout: 1.4, empathize: 0.6, evidence: 0.4, ally: 0.5, bait: 1.2 },
        scamWeakness: '网恋杀猪盘/冒充好友类'
    },
    {
        id: 'hotheaded', label: '暴躁老哥', icon: '🔥',
        desc: '一点就着，硬碰硬会直接打起来，但吃软不吃硬。',
        resistance: { shout: 2.0, empathize: 0.7, evidence: 1.0, ally: 1.1, bait: 1.0 },
        scamWeakness: '游戏交易/代练类'
    },
    {
        id: 'easygoing', label: '随和老好人', icon: '😊',
        desc: '性格温和，好说话，谁劝都听，但也容易被骗子PUA。',
        resistance: { shout: 0.8, empathize: 0.5, evidence: 0.6, ally: 0.7, bait: 0.9 },
        scamWeakness: '刷单/交友类'
    },
    {
        id: 'suspicious', label: '多疑谨慎', icon: '🤨',
        desc: '对谁都不太信任，包括你，但一旦信任就很难动摇。',
        resistance: { shout: 1.3, empathize: 1.2, evidence: 0.8, ally: 1.0, bait: 1.4 },
        scamWeakness: '冒充权威/征信类'
    }
];

// 观察舍友时随机返回的情报池（正常 / 可疑 / 深陷 / 被洗脑 各若干条）
const OBSERVE_INTEL = {
    normal: [
        '你发现{name}最近作息规律，每天按时上课，没什么异常。',
        '你瞥见{name}在宿舍认真写作业，偶尔哼两句歌，心情不错。',
        '{name}今天又去打球了，回来后精神抖擞，跟你打了个招呼。',
        '你留意到{name}在电话里跟家里聊得很开心，似乎是报平安。'
    ],
    suspicious: [
        '你发现{name}最近总是避开室友接电话，神情慌张，还时不时看手机。',
        '{name}半夜还趴在电脑前，对着一个「代刷网课/返利」的页面，输入了自己的账号。',
        '{name}突然对「某理财平台」「稳赚」的话题特别来劲，还劝你也一起投。',
        '你注意到{name}频繁跟一个陌生网友聊天，对方头像看起来很像「成功人士」。',
        '{name}问你借钱的次数变多了，理由都含糊其辞。'
    ],
    scammed: [
        '{name}已经好几天没去上课，整天躺在床上对着手机，脸色很差。',
        '你听{name}躲着催债电话，语气里带着哭腔。',
        '{name}的银行卡似乎被刷空了，连食堂都只吃最便宜的套餐。',
        '{name}突然把微信头像换成黑底，朋友圈也删得干干净净。'
    ],
    brainwashed: [
        '{name}整天戴着耳机，嘴里念叨着"财富自由""阶层跃迁"之类的话。',
        '你发现{name}对你爱答不理，却对手机里的"导师"言听计从。',
        '{name}开始拉别人也去听那个"课"，眼神里透着狂热。',
        '{name}把生活费都"投资"出去了，还觉得这是"格局打开"。'
    ]
};

export const RoommateManager = {
    /** 获取性格池（供外部读取/展示） */
    getPersonalities() { return PERSONALITIES; },

    /**
     * 根据玩家性别和寝室人数初始化舍友，并随机分配性格
     *  - 四人间（3名舍友）→ 使用具名角色：林澄/陈屿/许嘉树
     *  - 二人间（1名舍友）→ 使用第一个具名角色：林澄
     *  - 具名舍友 id 固定（linCheng/chenYu/xuJiashu），供剧情章节绑定。
     */
    initRoommates(gender, size) {
        const namePool = gender === '女' ? FEMALE_NAMES : MALE_NAMES;
        const count = (size === 2) ? 1 : 3;
        const roommates = [];

        // 打乱名字池与性格池，随机抽取且尽量不重复性格
        const shuffledNames = [...namePool].sort(() => Math.random() - 0.5);
        const shuffledPersonality = [...PERSONALITIES].sort(() => Math.random() - 0.5);

        // ✅ 具名角色池（按性别）
        const namedPool = NAMED_ROOMMATES[gender] || NAMED_ROOMMATES['女'];

        for (let i = 0; i < count; i++) {
            // ✅ 优先使用具名角色（前3名固定），确保剧情章节能正确绑定
            const named = namedPool[i];
            const p = PERSONALITIES.find(x => x.id === (named ? named.personality : shuffledPersonality[i % shuffledPersonality.length].id)) || shuffledPersonality[i % shuffledPersonality.length];
            const name = named ? named.name : shuffledNames[i % shuffledNames.length];
            roommates.push({
                id: named ? named.id : `roomie_${i + 1}`,
                name,
                nickname: named ? named.nickname : ('小' + name.slice(-1)),
                gender,
                personality: p.id,          // ✅ 性格标签 id
                personalityLabel: p.label,  // ✅ 性格中文名
                personalityIcon: p.icon,    // ✅ 性格图标
                roleLabel: named ? named.label : '',   // ✅ 具名角色的身份描述
                trust: 40 + Math.floor(Math.random() * 30),
                money: 2000 + Math.floor(Math.random() * 6000),
                status: 'normal',           // normal | suspicious | scammed | brainwashed
                scamProgress: 0,            // 短线诈骗进度 0~100
                brainwash: 0,               // ✅ 长线洗脑进度 0~100
                activeLongScam: null,       // ✅ 当前长线骗局 id
                longPhase: 0,               // ✅ 长线阶段 0=未开始 1=征兆 2=暴露 3=危机
                alertness: 20 + Math.floor(Math.random() * 40)
            });
        }
        GameState.roommates = roommates;
        GameState.dorm.size = size;
    },

    /** 随机玩家身份标签 */
    rollRandomTrait() {
        const t = RANDOM_TRAITS[Math.floor(Math.random() * RANDOM_TRAITS.length)];
        GameState.player.randomTrait = t.trait;
        return t;
    },

    /** 获取某舍友的性格定义 */
    getPersonality(roommateId) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return null;
        return PERSONALITIES.find(p => p.id === r.personality) || null;
    },

    /** 获取一个随机的舍友作为事件目标（排除已彻底深陷者，可选排除被洗脑者） */
    pickTarget(opt = {}) {
        let list = GameState.roommates.filter(r => r.status !== 'scammed');
        if (opt.excludeBrainwashed) list = list.filter(r => r.status !== 'brainwashed');
        if (list.length === 0) return GameState.roommates[0] || null;
        return list[Math.floor(Math.random() * list.length)];
    },

    /**
     * ✅ 核心：干预抗性判定
     * 根据舍友性格的 resistance 系数，计算某类干预的成功率修正。
     * @param {string} roommateId
     * @param {string} interventionType  shout/empathize/evidence/ally/bait
     * @param {number} baseChance  基础成功率 0~1
     * @returns {number} 修正后的成功率 0~1
     */
    calcInterventionChance(roommateId, interventionType, baseChance) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return baseChance;
        const p = PERSONALITIES.find(x => x.id === r.personality);
        const factor = (p && p.resistance && p.resistance[interventionType]) || 1.0;
        return Math.max(0.05, Math.min(0.98, baseChance / factor));
    },

    /** 状态迁移：短线诈骗（保留原逻辑） */
    advanceScam(roommateId, progressDelta = 30) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return;
        r.scamProgress = Math.min(100, r.scamProgress + progressDelta);
        if (r.scamProgress >= 70) r.status = 'scammed';
        else if (r.scamProgress >= 30) r.status = 'suspicious';
    },

    /**
     * ✅ 长线洗脑进度推进
     * @param {string} roommateId
     * @param {string} scamId 长线骗局 id
     * @param {number} phase 1/2/3
     * @param {number} brainwashDelta 洗脑进度增量
     */
    advanceBrainwash(roommateId, scamId, phase, brainwashDelta = 35) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return;
        r.activeLongScam = scamId;
        r.longPhase = phase;
        r.brainwash = Math.min(100, r.brainwash + brainwashDelta);
        if (r.brainwash >= 60) {
            r.status = 'brainwashed';
        } else if (r.brainwash >= 30) {
            r.status = 'suspicious';
        }
    },

    /** 舍友彻底被骗（短线）。若持有反诈护盾则抵挡并返回 true（未结算损失）。 */
    applyScamLoss(roommateId, loseAmount) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return false;

        // ✅ 反诈护盾：抵挡一次舍友被骗
        if (this.hasItem('shield')) {
            this.consumeItem('shield');
            const msg = `🛡️ 反诈护盾生效！抵挡了 ${r.name} 的一次被骗，损失被挡下。`;
            GameState.eventStream.unshift(msg);
            GameState.historyLogs.unshift(msg);
            return true;
        }

        r.money = Math.max(0, r.money - loseAmount);
        r.status = 'scammed';
        r.scamProgress = 100;
        GameState.counters.roommateScammed++;
        return false;
    },

    /** 舍友彻底被洗脑（长线终点）。反诈护盾同样可抵挡。 */
    applyBrainwashLoss(roommateId, loseAmount) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return false;

        if (this.hasItem('shield')) {
            this.consumeItem('shield');
            const msg = `🛡️ 反诈护盾生效！抵挡了 ${r.name} 的一次洗脑损失。`;
            GameState.eventStream.unshift(msg);
            GameState.historyLogs.unshift(msg);
            return true;
        }

        r.money = Math.max(0, r.money - loseAmount);
        r.status = 'brainwashed';
        r.brainwash = 100;
        GameState.counters.roommateScammed++;
        return false;
    },

    /** 玩家成功挽救舍友（兼容短线与长线） */
    applySave(roommateId, savedMoney, trustDelta = 10) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return;
        r.status = 'normal';
        r.scamProgress = 0;
        r.brainwash = 0;          // ✅ 同时清空洗脑进度
        r.activeLongScam = null;  // ✅ 终止长线
        r.longPhase = 0;
        r.trust = Math.min(100, r.trust + trustDelta);
        GameState.counters.roommateSaved++;
        GameState.counters.roommateSavedMoney += savedMoney;
    },

    /** 干预手段：影响舍友信任度 */
    changeTrust(roommateId, delta) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return;
        r.trust = Math.max(0, Math.min(100, r.trust + delta));
    },

    /** 是否拥有某道具（count>0） */
    hasItem(itemId) {
        const it = GameState.inventory.items.find(i => i.id === itemId);
        return !!(it && it.count > 0);
    },

    /** 消耗某道具 1 个 */
    consumeItem(itemId) {
        const it = GameState.inventory.items.find(i => i.id === itemId);
        if (it && it.count > 0) { it.count--; return true; }
        return false;
    },

    /** 增加某道具（购买/获得） */
    addItem(itemId, count = 1) {
        let it = GameState.inventory.items.find(i => i.id === itemId);
        if (!it) {
            it = { id: itemId, name: itemId, icon: '🎁', count: 0 };
            GameState.inventory.items.push(it);
        }
        it.count += count;
    },

    /** 观察舍友，返回一条随机情报 */
    observe() {
        const r = this.pickTarget();
        if (!r) return null;
        const pool = OBSERVE_INTEL[r.status] || OBSERVE_INTEL.normal;
        const intel = pool[Math.floor(Math.random() * pool.length)].replace(/\{name\}/g, r.name);
        return { roommateId: r.id, name: r.name, status: r.status, intel };
    }
};
