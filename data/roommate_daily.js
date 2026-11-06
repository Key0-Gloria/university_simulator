// ============================================================
//  宿舍日常互动与情感羁绊事件池 (RoommateDaily)
//  设计说明：
//  - 这些是「非诈骗」的舍友日常互动，是建立信任、提升宿舍氛围的核心。
//  - 三大类：温情向 / 矛盾向 / 宿舍建设向。
//  - 每个事件 3-4 个选项，选项除影响金钱/心情外，
//    必含 affectRoommate（改变舍友 trust 信任度 / 精神状态）。
//  - affectRoommate 可选字段：
//    { trust: 数字,  status: 'normal'|'suspicious'|'scammed'|'brainwashed',
//      mood: 'happy'|'calm'|'down'|'angry',  }  （mood 用于情感波动）
//  - 分类字段 category: 'warm' | 'conflict' | 'build'
// ============================================================

export const RoommateDaily = [
    // ==================== 一、温情向 (warm) ====================
    {
        id: 'rd_01', category: 'warm', title: '🌙 舍友深夜发烧，你陪{ta}去急诊',
        desc: '半夜两点，你被舍友的呻吟声吵醒。{ta}烧到了39度多，脸色潮红，浑身发抖。校医院早就关门了，最近的急诊在3公里外。',
        options: [
            { text: '披上衣服，打车陪{ta}去急诊', effect: { money: -30, social: 8, anxiety: 8 }, tip: '你在急诊守了{ta}一整晚，天亮时{ta}烧退了，红着眼眶说"{bro}，以后有事说话"。', log: '深夜陪舍友去急诊', danger: 'safe', affectRoommate: { trust: 20, mood: 'calm' } },
            { text: '帮{ta}找退烧药，让{ta}先扛一扛', effect: { social: 2, anxiety: 5 }, tip: '你翻出药箱，给{ta}吃了退烧药。{ta}半夜还是很难受，但天一亮烧就退了。', log: '给舍友找退烧药', danger: 'safe', affectRoommate: { trust: 6, mood: 'calm' } },
            { text: '太困了，翻个身继续睡', effect: { social: -6 }, tip: '第二天你才知道，{ta}一个人硬撑着去了医院，回来时脸色苍白，也没提你。', log: '未理会生病的舍友', danger: 'low', affectRoommate: { trust: -10, mood: 'down' } }
        ]
    },
    {
        id: 'rd_02', category: 'warm', title: '💔 你失恋了，舍友陪你喝酒',
        desc: '你刚被分手，一个人坐在床上发呆。舍友看出了你的低落，拎着两罐啤酒凑过来："走，天台坐坐？"',
        options: [
            { text: '跟舍友去天台，边喝边倒苦水', effect: { social: 10, anxiety: -15 }, tip: '你借着酒劲把委屈全倒了出来，舍友陪你骂了一晚上。哭过之后，心里舒坦多了。', log: '和舍友天台谈心', danger: 'safe', affectRoommate: { trust: 12, mood: 'happy' } },
            { text: '婉拒，想一个人静静', effect: { social: -2, anxiety: 5 }, tip: '舍友把酒留给了你，拍了拍你肩膀离开了。你一个人坐到了天亮。', log: '独自消化失恋', danger: 'low', affectRoommate: { trust: 0, mood: 'down' } }
        ]
    },
    {
        id: 'rd_03', category: 'warm', title: '🍜 舍友从家里带了特产给你',
        desc: '舍友周末回了趟家，返校时提了一大袋家乡特产，笑呵呵地塞给你："尝尝，我妈做的，可好吃了。"',
        options: [
            { text: '开心地收下，当面夸好吃', effect: { social: 8, anxiety: -5 }, tip: '你吃得津津有味，还夸了几句。舍友眼睛都笑弯了，说下次还给你带。', log: '收下并称赞舍友特产', danger: 'safe', affectRoommate: { trust: 10, mood: 'happy' } },
            { text: '客气推辞，说不用了', effect: { social: -3 }, tip: '你摆摆手说不用，舍友有点尴尬地把袋子收了回去。', log: '婉拒舍友特产', danger: 'low', affectRoommate: { trust: -5, mood: 'down' } }
        ]
    },
    {
        id: 'rd_04', category: 'warm', title: '📱 舍友失手打碎了你的杯子',
        desc: '舍友拿东西时不小心碰掉了你的马克杯，"啪"一声摔得粉碎。{ta}愣在原地，满脸歉意地看着你。',
        options: [
            { text: '笑着说"没事，正好想换个新的"', effect: { social: 6, anxiety: -3 }, tip: '你一句"没事"化解了{ta}的尴尬，{ta}连声道歉，说下次请你喝奶茶。', log: '宽慰打碎杯子的舍友', danger: 'safe', affectRoommate: { trust: 10, mood: 'calm' } },
            { text: '让{ta}赔一个', effect: { social: -3, money: 20 }, tip: '你坚持让{ta}赔，{ta}虽不情愿但还是转了钱。之后几天你们都有点别扭。', log: '让舍友赔偿杯子', danger: 'low', affectRoommate: { trust: -8, mood: 'down' } },
            { text: '嘴上说没事，心里却很不爽', effect: { social: -2, anxiety: 5 }, tip: '你表面大度，心里却一直膈应，之后总忍不住拿这事说事。', log: '表面大度实则介怀', danger: 'low', affectRoommate: { trust: -3, mood: 'down' } }
        ]
    },

    // ==================== 二、矛盾向 (conflict) ====================
    {
        id: 'rd_05', category: 'conflict', title: '😠 舍友用了你的东西没放回原处',
        desc: '你回来发现自己的充电宝被舍友拿去用了，用完还随手扔在桌上，连充电线都缠得乱七八糟。',
        options: [
            { text: '心平气和地提醒{ta}"用完记得放回"', effect: { social: 3, anxiety: -3 }, tip: '你好声好气地说了句，舍友连声道歉，答应以后会注意。', log: '平和提醒舍友', danger: 'safe', affectRoommate: { trust: 2, mood: 'calm' } },
            { text: '憋在心里，不说', effect: { anxiety: 8 }, tip: '你越想越气，晚上翻来覆去睡不着，觉得{ta}不尊重你。', log: '默默隐忍', danger: 'low', affectRoommate: { trust: 0, mood: 'down' } },
            { text: '发火，直接质问{ta}', effect: { social: -8, anxiety: 5 }, tip: '你劈头盖脸一通质问，舍友也来了脾气，两人吵了起来。', log: '因借物发火争吵', danger: 'low', affectRoommate: { trust: -12, mood: 'angry' } }
        ]
    },
    {
        id: 'rd_06', category: 'conflict', title: '🌙 作息冲突：舍友打游戏到半夜',
        desc: '你明早有早课，可舍友正戴着耳机打游戏，键盘敲得啪啪响，还时不时爆几句粗口，你根本睡不着。',
        options: [
            { text: '礼貌地让{ta}小声点或早点睡', effect: { social: 3, anxiety: -5 }, tip: '你客气地提醒了{ta}，{ta}嘟囔了句"马上"，压低了声音。', log: '礼貌协商作息', danger: 'safe', affectRoommate: { trust: 1, mood: 'calm' } },
            { text: '戴耳塞硬扛', effect: { anxiety: 10 }, tip: '你翻出耳塞塞上，但还是一夜没睡好，第二天顶着一对黑眼圈。', log: '忍气吞声熬夜', danger: 'low', affectRoommate: { trust: 0, mood: 'down' } },
            { text: '吼{ta}"能不能安静点"', effect: { social: -10, anxiety: 5 }, tip: '你忍无可忍吼了一嗓子，两人当场翻脸，宿舍气氛冷到冰点。', log: '因作息爆发争吵', danger: 'low', affectRoommate: { trust: -15, mood: 'angry' } }
        ]
    },
    {
        id: 'rd_07', category: 'conflict', title: '💸 舍友又没还上次借的钱',
        desc: '你借给舍友200元说好这个月还，可眼看月底了，{ta}提都不提，还新买了双球鞋。',
        options: [
            { text: '委婉提醒{ta}"手头紧"', effect: { money: 200, social: -2 }, tip: '你旁敲侧击提醒，{ta}恍然大悟，赶紧把钱还了，还连声道歉。', log: '委婉讨回借款', danger: 'safe', affectRoommate: { trust: -2, mood: 'calm' } },
            { text: '当面直接要', effect: { money: 200, social: -6 }, tip: '你直截了当地开口要钱，{ta}脸上挂不住，把钱甩给你，但心里有疙瘩。', log: '直接讨债', danger: 'low', affectRoommate: { trust: -10, mood: 'angry' } },
            { text: '算了，不差这点钱', effect: { money: -200, anxiety: 5 }, tip: '你碍于面子没好意思开口，这笔钱就这样打水漂了。', log: '放弃讨债', danger: 'low', affectRoommate: { trust: 3, mood: 'happy' } }
        ]
    },

    // ==================== 三、宿舍建设向 (build) ====================
    {
        id: 'rd_08', category: 'build', title: '🧺 合资买一台宿舍洗衣机',
        desc: '宿舍的衣服总要手洗太累，有人提议大家合伙买台二手洗衣机，一人出150元。',
        options: [
            { text: '爽快出资，积极参与选购', effect: { money: -150, social: 8, anxiety: -8 }, tip: '你带头出钱还帮忙挑了台好的，从此宿舍告别手洗，大家都念你的好。', log: '合资买洗衣机', danger: 'safe', affectRoommate: { trust: 10, mood: 'happy' } },
            { text: '觉得没必要，不参与', effect: {}, tip: '你嫌贵没参与。洗衣机买回来后，每次用你都不太好意思。', log: '不参与合资', danger: 'low', affectRoommate: { trust: -4, mood: 'calm' } }
        ]
    },
    {
        id: 'rd_09', category: 'build', title: '📚 期末互相抽背知识点',
        desc: '期末临近，舍友提议大家互相抽背重点，查漏补缺。',
        options: [
            { text: '积极参与，互相当"考官"', effect: { gpa: 0.06, social: 8 }, tip: '你俩轮流抽背，效率奇高，最后都考得不错。', log: '与舍友互相抽背', danger: 'safe', affectRoommate: { trust: 8, mood: 'happy' } },
            { text: '觉得浪费自己时间，婉拒', effect: { gpa: 0.02 }, tip: '你选择独自复习，效率也不错，只是少了点交流。', log: '独自复习', danger: 'low', affectRoommate: { trust: -3, mood: 'calm' } }
        ]
    },
    {
        id: 'rd_10', category: 'build', title: '🪴 一起布置宿舍绿植角',
        desc: '舍友提议在窗台养几盆绿植，让宿舍更有生气。{ta}问你要不要一起张罗。',
        options: [
            { text: '一起挑花盆、栽绿萝', effect: { money: -20, social: 8, anxiety: -5 }, tip: '你们忙活了一下午，窗台多了抹绿意，看着就心情好。', log: '一起布置绿植角', danger: 'safe', affectRoommate: { trust: 8, mood: 'happy' } },
            { text: '觉得养花麻烦，不参与', effect: {}, tip: '你嫌麻烦没参加，后来看那几盆绿萝长得不错，有点眼馋。', log: '不参与布置', danger: 'low', affectRoommate: { trust: -2, mood: 'calm' } }
        ]
    }
];
