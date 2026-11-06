// ============================================================
//  全局游戏状态 (GameState)
//  「减法重构」说明：
//  - 核心玩法为「观察舍友防骗」的互动视觉小说，无养成/周期/行动点。
//  - stats 仅保留：money（余额）、persuasion（说服力/防骗洞察力）。
//  - 舍友身上的 trust（信任值）是第二核心数值，用于解锁关键剧情选项。
//  - 已移除：anxiety（焦虑值）、social（社交网络）、dorm.atmosphere（宿舍氛围）。
//  - 主线为四章剧本式剧情（StoryChapters），通过线索解锁；
//    部分关键选项需达到「信任值 / 说服力」门槛方可选择。
// ============================================================

export const GameState = {
    player: {
        name: "林晓风",
        gender: "男",          // 玩家性别：'男' | '女'（开局选择）
        hometown: "",
        family: "",
        major: "",
        randomTrait: ""        // 随机身份标签
    },

    // 宿舍信息：默认同性同寝（四人间，除玩家外 3 名舍友）
    dorm: {
        size: 4                // 4 人间（除玩家外 3 名舍友）
    },

    // ✅ 精简后的核心指标
    stats: {
        money: 5000,           // 余额（不被骗不减少）
        persuasion: 50         // 说服力/防骗洞察力（影响劝导舍友成功率、解锁剧情选项）
    },

    // ✅ 舍友系统：玩家清醒地观察/干预舍友是否被骗
    //  status: 'normal'（正常）| 'suspicious'（可疑）| 'scammed'（深陷）
    //  scamProgress: 0~100，每经历一次诈骗阶段增加
    roommates: [
        { id: 'roomie_1', name: '张伟',   gender: '男', trust: 50, money: 5000, status: 'normal', scamProgress: 0 },
        { id: 'roomie_2', name: '李强',   gender: '男', trust: 50, money: 3000, status: 'normal', scamProgress: 0 },
        { id: 'roomie_3', name: '王胖子', gender: '男', trust: 50, money: 8000, status: 'normal', scamProgress: 0 }
    ],

    isMonthStartPhase: true,
    currentMonthEvent: null,
    // 当前事件针对的舍友 id（null 表示针对玩家自身/通用事件）
    currentEventTarget: null,
    historyLogs: [],
    eventStream: [],
    pendingEvent: null,

    // ✅ 策略改造：线索卡 + 道具背包
    inventory: {
        clues: [],     // 线索卡数组：{ id, name, icon, desc, keywords, roommateId, garbled }
        items: []      // 道具数组：{ id, name, icon, count }
    },

    flags: {
        recentlyScammed: false,
        observedRoommates: [],     // 已观察过的舍友 id（每名舍友只能观察一次）
        expelled: false            // 是否因学术不端被退学
    },

    // 舍友相关计数
    counters: {
        scamFailures: 0,        // 玩家自己被骗次数
        scamAvoids: 0,          // 玩家自己识破次数
        roommateSaved: 0,       // 成功挽救舍友次数
        roommateSavedMoney: 0,  // 挽救舍友累计资金
        roommateScammed: 0      // 舍友被骗次数
    },

    achievements: [],
    talents: [],
    currentForumPosts: [],

    // ✅ 剧本式剧情章节状态（《室友，你还好吗？》四章主线）
    storyChapter: {
        currentChapter: null,      // 当前进行的章节 id（null=无）
        currentScene: null,        // 当前幕的索引
        completedChapters: [],     // 已完成的章节 id 列表
        unlockedChapterIndex: 0,   // 已解锁到第几章（0=第一章可玩）
        history: [],               // 玩家在剧情中的选择记录
        firstEndings: {},          // ✅ 每章「首次通关」达成的结局快照 { chapterId: { endingId, type } }
        finalized: false,          // ✅ 是否已定档（点击「结束探索」后锁定最终段位）
        year: 1,                   // ✅ 当前学年：1=大一 2=大二 3=大三 4=大四（毕业后=5）
        seenEndings: {}            // ✅ 每章「已体验过的所有结局」集合 { chapterId: [endingId, ...] }
    }
};
