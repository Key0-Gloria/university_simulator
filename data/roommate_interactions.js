// ============================================================
//  舍友互动事件池 (RoommateInteractions)
//  设计说明：
//  - 这些是「非诈骗」的舍友日常互动，丰富与舍友的关系维度。
//  - 通过互动影响：信任度(trust)、宿舍氛围(dorm.atmosphere)、
//    玩家属性(money/social/persuasion/anxiety/gpa)、舍友状态。
//  - 部分互动与诈骗联动：例如「发现舍友可疑」→ 可触发干预；
//    「安慰被骗的舍友」→ 帮{ta}走出阴霾、恢复氛围。
//  - 字段与主事件池兼容：id/title/desc/options[{text,effect,tip,log,danger}]
//    额外字段：interaction 标记、affectRoommate(可选，直接改舍友状态)。
// ============================================================

export const RoommateInteractions = [
    // ==================== 一、增进感情类 ====================
    {
        id: 'r_01', title: '🍜 深夜食堂：和舍友拼一份夜宵',
        desc: '熄灯后，舍友的肚子突然咕咕叫了起来。{ta}探头问你要不要一起点外卖，两人平摊一份麻辣烫和烤串。',
        options: [
            { text: '欣然答应，边吃边聊', effect: { money: -20, social: 5, anxiety: -10 }, log: '和舍友拼夜宵，聊到深夜。', tip: '热气腾腾的夜宵和掏心窝的话，让你们的距离更近了一步。', danger: 'safe', affectRoommate: { trust: 8 } },
            { text: '减肥呢，谢绝', effect: { anxiety: 5 }, log: '拒绝了舍友的夜宵邀请。', tip: '你摸了摸肚子，忍住了。', danger: 'low', affectRoommate: { trust: -3 } }
        ]
    },
    {
        id: 'r_02', title: '🎮 开黑到深夜：{bro}齐心',
        desc: '舍友拉你一起双排上分，说今晚一定要晋级。你看着{ta}还差一局就升段的账号，有点心动。',
        options: [
            { text: '陪{ta}冲一波', effect: { social: 8, anxiety: -10, gpa: -0.03 }, log: '和舍友开黑上分。', tip: '你们配合默契，一波三连胜，兴奋得差点吵醒隔壁。', danger: 'low', affectRoommate: { trust: 10 } },
            { text: '明早还有课，先睡了', effect: { gpa: 0.03 }, log: '拒绝开黑，按时休息。', tip: '你戴上耳塞睡了个安稳觉。', danger: 'safe', affectRoommate: { trust: -2 } }
        ]
    },
    {
        id: 'r_03', title: '🏀 一起打球流汗',
        desc: '舍友抱着篮球问你打不打球，说操场正好有空位。你最近也确实有点闷。',
        options: [
            { text: '去！出出汗', effect: { social: 6, anxiety: -15, gpa: -0.02 }, log: '和舍友一起打球。', tip: '一场球下来，你浑身舒畅，和舍友的关系也更铁了。', danger: 'safe', affectRoommate: { trust: 8 } },
            { text: '懒得出门', effect: { anxiety: 5 }, log: '拒绝了打球邀请。', tip: '你瘫在床上刷手机。', danger: 'low', affectRoommate: { trust: -2 } }
        ]
    },
    {
        id: 'r_04', title: '🎂 帮舍友过生日',
        desc: '今天是某位舍友的生日，{ta}却很低调，说随便过过。你想着要不要给{ta}个惊喜。',
        options: [
            { text: '偷偷订个小蛋糕，一起庆祝', effect: { money: -40, social: 12, anxiety: -10 }, log: '为舍友庆生。', tip: '当烛光亮起，舍友眼眶都红了，说好久没人记得{ta}生日。', danger: 'safe', affectRoommate: { trust: 15 } },
            { text: '口头说句生日快乐', effect: { social: 2 }, log: '口头祝福舍友。', tip: '你发了条祝福，仅此而已。', danger: 'low', affectRoommate: { trust: 2 } }
        ]
    },
    {
        id: 'r_05', title: '📚 和舍友组队复习',
        desc: '期末临近，舍友提议一起约自习，互相监督、互相答疑。',
        options: [
            { text: '一起泡图书馆', effect: { gpa: 0.06, social: 6 }, log: '和舍友组队复习。', tip: '互相督促让效率翻倍，你们还轮流给对方讲题。', danger: 'safe', affectRoommate: { trust: 8 } },
            { text: '习惯一个人学', effect: { gpa: 0.03 }, log: '独自复习。', tip: '你婉拒了，{ta}也没强求。', danger: 'low', affectRoommate: { trust: -2 } }
        ]
    },

    // ==================== 二、舍友遇到小麻烦类 ====================
    {
        id: 'r_06', title: '💸 舍友手头紧找你借钱',
        desc: '舍友这月生活费提前花光了，面露难色地开口问你借200元，说下月家里打了钱就还。',
        options: [
            { text: '爽快借给{ta}', effect: { money: -200, social: 8 }, log: '借钱给舍友。', tip: '{ta}感激得不行。下月{ta}果然连本带利还了你，还请了杯奶茶。', danger: 'low', affectRoommate: { trust: 15 } },
            { text: '说自己也不宽裕，婉拒', effect: { social: -3 }, log: '婉拒了舍友借钱。', tip: '{ta}有点失望，但也能理解。', danger: 'low', affectRoommate: { trust: -8 } }
        ]
    },
    {
        id: 'r_07', title: '🔧 帮舍友修电脑',
        desc: '舍友的笔记本电脑突然蓝屏打不开，急得团团转，因为里面有还没交的课程论文。',
        options: [
            { text: '上手帮{ta}排查', effect: { social: 8, persuasion: 3 }, log: '帮舍友修好电脑。', tip: '你花了一个多小时修好了，还帮{ta}把论文也导了出来。', danger: 'safe', affectRoommate: { trust: 12 } },
            { text: '让{ta}去校门口找维修店', effect: { social: -2 }, log: '建议舍友去维修店。', tip: '{ta}只能花100块去修，心里有点不是滋味。', danger: 'low', affectRoommate: { trust: -3 } }
        ]
    },
    {
        id: 'r_08', title: '🎒 舍友想翘课让你帮忙签到',
        desc: '舍友昨晚通宵，今早起不来，求你帮忙在课上代签个到。',
        options: [
            { text: '帮{ta}签到', effect: { social: 4, persuasion: -3 }, log: '帮舍友代签到。', tip: '你冒着被老师抓的风险帮了{ta}，但{ta}似乎觉得理所当然。', danger: 'low', affectRoommate: { trust: 6 } },
            { text: '劝{ta}起来，签到帮不了{ta}', effect: { persuasion: 5, social: -2 }, log: '拒绝代签并劝学。', tip: '你语重心长劝{ta}别荒废学业，{ta}嘴上不服但心里记着。', danger: 'safe', affectRoommate: { trust: -2 } }
        ]
    },

    // ==================== 三、诈骗联动类（观察/发现/挽救）====================
    {
        id: 'r_09', title: '👀 舍友最近总躲着接电话',
        desc: '你发现舍友最近总是一个人跑到阳台接电话，回来时脸色都不太好，还时不时盯着手机发呆。',
        options: [
            { text: '主动关心，问问{ta}是不是遇到麻烦了', effect: { social: 6 }, log: '主动关心舍友。', tip: '{ta}支支吾吾，最后才说自己好像加了个奇怪的"理财群"。你警觉起来。', danger: 'low', affectRoommate: { trust: 10 }, flagScamCheck: true },
            { text: '尊重隐私，不打听', effect: { anxiety: 5 }, log: '没有过问舍友私事。', tip: '你选择沉默，但心里隐隐不安。', danger: 'low', affectRoommate: { trust: -2 } }
        ]
    },
    {
        id: 'r_10', title: '😰 舍友被骗后情绪崩溃',
        desc: '你发现舍友一个人坐在床上发呆，手机里是一条条催债短信。{ta}红着眼圈说，自己好像被人骗走了一大笔钱。',
        options: [
            { text: '陪着{ta}，劝{ta}报警并帮{ta}整理证据', effect: { social: 10, persuasion: 5, anxiety: 5 }, log: '陪伴并帮舍友报警。', tip: '你陪{ta}报了警，还帮{ta}截图整理了转账记录。虽然{ta}损失惨重，但好歹有了方向。', danger: 'safe', affectRoommate: { trust: 20, status: 'normal', scamProgress: 0 } },
            { text: '安慰两句就走开', effect: { social: 2 }, log: '简单安慰舍友。', tip: '你不知道该怎么开口，只能拍拍{ta}肩膀。', danger: 'low', affectRoommate: { trust: 3 } }
        ]
    },
    {
        id: 'r_11', title: '⚠️ 舍友拉你一起"赚快钱"',
        desc: '舍友神秘兮兮地凑过来："我最近发现个稳赚的兼职，动动手指日入好几百，你也来试试，我带你。"',
        options: [
            { text: '觉得不对劲，劝{ta}别陷进去', effect: { persuasion: 8, social: -3 }, log: '劝阻舍友参与可疑兼职。', tip: '你给{ta}讲了刷单返利的套路，{ta}半信半疑，但总算没继续投钱。', danger: 'safe', affectRoommate: { trust: -5, status: 'normal', scamProgress: 0 } },
            { text: '跟着{ta}一起试试', effect: { money: -300, anxiety: 20 }, log: '轻信舍友推荐的"兼职"。', tip: '结果是个刷单局，你俩的钱都打了水漂。', danger: 'high', affectRoommate: { trust: 5 } }
        ]
    },
    {
        id: 'r_12', title: '📱 发现舍友在给别人转"解冻费"',
        desc: '你无意中瞥见舍友正在给一个陌生账号转账，备注写着"解冻费"。你心里咯噔一下——这很像连环诈骗。',
        options: [
            { text: '立刻阻止，告诉{ta}这是骗局', effect: { persuasion: 8, social: 3 }, log: '及时阻止舍友转账。', tip: '你一把按住{ta}的手，讲清了"解冻费"的套路，{ta}惊出一身冷汗。', danger: 'safe', affectRoommate: { trust: 10, status: 'normal', scamProgress: 0 } },
            { text: '装作没看见', effect: { anxiety: 10 }, log: '未阻止舍友转账。', tip: '几天后你才知道，{ta}那天被骗走了3000块。', danger: 'high', affectRoommate: { status: 'scammed', scamProgress: 100 } }
        ]
    },

    // ==================== 四、宿舍集体生活类 ====================
    {
        id: 'r_13', title: '🧹 周末宿舍大扫除',
        desc: '宿舍堆了一个星期的外卖盒和脏衣服，舍长提议周末一起大扫除，分工合作。',
        options: [
            { text: '积极响应，主动承包拖地', effect: { social: 8, anxiety: -5 }, log: '参与宿舍大扫除。', tip: '大家一起把宿舍收拾得焕然一新，还评上了卫生红旗。', danger: 'safe', affectRoommate: { trust: 8 } },
            { text: '装睡逃避', effect: { social: -8 }, log: '逃避大扫除。', tip: '舍友们在忙，你躲在被窝，最后被舍长揪了出来。', danger: 'low', affectRoommate: { trust: -10 } }
        ]
    },
    {
        id: 'r_14', title: '🌙 宿舍夜谈会',
        desc: '熄灯后，不知谁起了个头，聊起了各自的理想和未来。气氛渐渐热络起来。',
        options: [
            { text: '敞开心扉，分享自己的故事', effect: { social: 10, anxiety: -10 }, log: '参与宿舍夜谈。', tip: '那晚你们聊到凌晨，彼此的心结都解开了不少。', danger: 'safe', affectRoommate: { trust: 12 } },
            { text: '装睡，闭口不谈', effect: {}, log: '没有参与夜谈。', tip: '你翻了个身，假装已经睡着。', danger: 'low', affectRoommate: { trust: -2 } }
        ]
    },
    {
        id: 'r_15', title: '🍚 宿舍集体拼单囤货',
        desc: '双十一到了，舍友提议大家拼单买日用品和零食，凑满减更划算。',
        options: [
            { text: '一起拼单，算得明明白白', effect: { money: -60, social: 6 }, log: '参与宿舍拼单。', tip: '你精打细算，帮大家省了不少钱，也囤了一堆快乐。', danger: 'low', affectRoommate: { trust: 6 } },
            { text: '自己单独买', effect: { money: -30 }, log: '独自购物。', tip: '你懒得算账，自己下单了。', danger: 'low', affectRoommate: { trust: -1 } }
        ]
    },
    {
        id: 'r_16', title: '🚬 舍友在宿舍抽烟',
        desc: '舍友又躲在阳台抽烟，烟味飘进了屋里，你有点受不了。',
        options: [
            { text: '委婉提醒{ta}去外面抽', effect: { social: -2, anxiety: -5 }, log: '提醒舍友别在宿舍抽烟。', tip: '你委婉说了，{ta}愣了一下，默默掐灭了烟。', danger: 'low', affectRoommate: { trust: -3 } },
            { text: '忍一忍，不说', effect: { anxiety: 10 }, log: '忍受二手烟。', tip: '你皱着眉打开了窗户。', danger: 'low', affectRoommate: { trust: 2 } }
        ]
    },

    // ==================== 五、学习/成长互助类 ====================
    {
        id: 'r_17', title: '🏆 和舍友一起报名竞赛',
        desc: '学校发布了一个创新创业大赛，舍友拉你组队，说两个人配合更有戏。',
        options: [
            { text: '加入组队，认真备赛', effect: { gpa: 0.05, social: 8, anxiety: 8 }, log: '和舍友组队参赛。', tip: '你们熬了几个通宵打磨方案，虽然没进决赛，但收获满满。', danger: 'safe', affectRoommate: { trust: 12 } },
            { text: '太忙了，婉拒', effect: {}, log: '拒绝组队参赛。', tip: '你怕耽误学习，没参加。', danger: 'low', affectRoommate: { trust: -3 } }
        ]
    },
    {
        id: 'r_18', title: '💪 舍友拉你一起晨跑打卡',
        desc: '舍友最近迷上了跑步，热情地邀请你每天早起一起晨跑。',
        options: [
            { text: '一起晨跑，养成好习惯', effect: { social: 6, anxiety: -8, gpa: 0.02 }, log: '和舍友一起晨跑。', tip: '坚持几周后，你精神好了不少，和舍友也成了"跑友"。', danger: 'safe', affectRoommate: { trust: 8 } },
            { text: '起不来，算了', effect: { anxiety: 5 }, log: '放弃晨跑。', tip: '你错过了，继续睡懒觉。', danger: 'low', affectRoommate: { trust: -2 } }
        ]
    },
    {
        id: 'r_19', title: '🎯 舍友分享求职/考研经验',
        desc: '高年级的舍友刚考完研，主动跟你分享了一堆备考干货和踩过的坑。',
        options: [
            { text: '认真倾听，做笔记', effect: { gpa: 0.04, persuasion: 3, social: 4 }, log: '认真听取舍友经验。', tip: '这些经验帮你少走了很多弯路。', danger: 'safe', affectRoommate: { trust: 6 } },
            { text: '觉得用不上，敷衍了事', effect: {}, log: '敷衍舍友分享。', tip: '你听得心不在焉，{ta}有点失落。', danger: 'low', affectRoommate: { trust: -4 } }
        ]
    },

    // ==================== 六、矛盾与和解类 ====================
    {
        id: 'r_20', title: '😤 和舍友闹矛盾',
        desc: '因为一点小事（比如谁动了你的东西、作息冲突），你和某位舍友起了争执，气氛一度很僵。',
        options: [
            { text: '主动服软，找机会和好', effect: { social: 6, anxiety: -8 }, log: '主动与舍友和解。', tip: '你买了瓶饮料递过去，两人相视一笑，误会解除。', danger: 'safe', affectRoommate: { trust: 10 } },
            { text: '冷战到底，不理{ta}', effect: { social: -8, anxiety: 10 }, log: '与舍友冷战。', tip: '你们谁都不理谁，宿舍气氛降到了冰点。', danger: 'low', affectRoommate: { trust: -12 } }
        ]
    },
    {
        id: 'r_21', title: '🔑 忘带钥匙，舍友来解围',
        desc: '你下课回来发现宿舍钥匙落在教室里了，正发愁，舍友恰好也回来，帮你开了门。',
        options: [
            { text: '真诚道谢，请{ta}喝饮料', effect: { money: -6, social: 6 }, log: '感谢舍友解围。', tip: '一杯饮料，换来一份温暖的人情。', danger: 'safe', affectRoommate: { trust: 6 } },
            { text: '随口说了声谢谢', effect: { social: 1 }, log: '随口道谢。', tip: '你觉得理所当然。', danger: 'low', affectRoommate: { trust: 0 } }
        ]
    },
    {
        id: 'r_22', title: '🛏️ 深夜照顾生病的舍友',
        desc: '半夜舍友发烧咳嗽，难受得睡不着。你被{ta}的动静吵醒。',
        options: [
            { text: '起来帮{ta}倒水、找药', effect: { social: 10, anxiety: 5 }, log: '深夜照顾生病的舍友。', tip: '你守了{ta}一晚上，{ta}感动得说以后你生病{ta}也照顾你。', danger: 'safe', affectRoommate: { trust: 18 } },
            { text: '翻个身继续睡', effect: { social: -5 }, log: '未理会生病的舍友。', tip: '第二天你才知道{ta}半夜去了医务室。', danger: 'low', affectRoommate: { trust: -8 } }
        ]
    }
];

// ============================================================
//  判定式舍友事件 (RoommateJudgeEvents)
//  玩法：玩家需要判断舍友描述的「机会」是不是骗局。
//  - type: 'judge'，选项带 isScam: true/false 标记。
//  - 答对：persuasion/social 提升 + 舍友信任；答错：可能害了舍友。
// ============================================================
export const RoommateJudgeEvents = [
    {
        id: 'rj_01', type: 'judge', title: '🧠 舍友的"暴富机会"',
        desc: '舍友兴奋地跟你说，{ta}加了个"投资群"，群主说投1000一个月变3000，稳赚不赔。{ta}问你觉得靠谱吗？',
        options: [
            { text: '明确告诉{ta}：这是杀猪盘骗局', isScam: true, effect: { persuasion: 8, social: 4 }, tip: '你一眼看穿"稳赚不赔"的谎言，成功拦下了{ta}。', log: '识破杀猪盘，救下舍友', danger: 'safe', affectRoommate: { trust: 12, status: 'normal', scamProgress: 0 } },
            { text: '觉得可以试试，支持{ta}投', isScam: false, effect: { anxiety: 15 }, tip: '你判断失误，舍友投进去的钱全打了水漂。', log: '误判杀猪盘，舍友被骗', danger: 'high', affectRoommate: { status: 'scammed', scamProgress: 100 } }
        ]
    },
    {
        id: 'rj_02', type: 'judge', title: '🧠 舍友收到"中奖"短信',
        desc: '舍友拿着手机给你看："我中了某某节目一等奖，奖金8万，但要先交2000元个人所得税才能领。"{ta}问你这靠谱吗？',
        options: [
            { text: '告诉{ta}：先交钱的中奖都是诈骗', isScam: true, effect: { persuasion: 8, social: 4 }, tip: '你提醒{ta}"天上不会掉馅饼"，{ta}及时收手。', log: '识破中奖诈骗，救下舍友', danger: 'safe', affectRoommate: { trust: 10, status: 'normal', scamProgress: 0 } },
            { text: '觉得可能是真的，让{ta}试试', isScam: false, effect: { anxiety: 10 }, tip: '你判断失误，舍友交了"税"后对方失联。', log: '误判中奖骗局，舍友被骗', danger: 'high', affectRoommate: { status: 'scammed', scamProgress: 100 } }
        ]
    },
    {
        id: 'rj_03', type: 'judge', title: '🧠 舍友的"低价代购"',
        desc: '舍友说认识个"海外代购"，大牌护肤品只要专柜3折，但要先付全款，{ta}有点心动。',
        options: [
            { text: '提醒{ta}：低价代购先付款多骗局', isScam: true, effect: { persuasion: 8, social: 4 }, tip: '你提醒{ta}"低价背后是陷阱"，{ta}打消了念头。', log: '识破代购骗局，救下舍友', danger: 'safe', affectRoommate: { trust: 10, status: 'normal', scamProgress: 0 } },
            { text: '觉得划算，让{ta}买', isScam: false, effect: { anxiety: 10 }, tip: '舍友付款后被拉黑。', log: '误判代购，舍友被骗', danger: 'high', affectRoommate: { status: 'scammed', scamProgress: 100 } }
        ]
    },
    {
        id: 'rj_04', type: 'judge', title: '🧠 舍友的"高薪模特"机会',
        desc: '舍友被"星探"看中，说日薪上千，但要先交1980元拍"模卡"。{ta}问你要不要去。',
        options: [
            { text: '告诉{ta}：先交"模卡费"的是骗局', isScam: true, effect: { persuasion: 8, social: 4 }, tip: '你识破"高薪模特"套路，拦住了{ta}。', log: '识破模特骗局，救下舍友', danger: 'safe', affectRoommate: { trust: 12, status: 'normal', scamProgress: 0 } },
            { text: '觉得是机会，鼓励{ta}去', isScam: false, effect: { anxiety: 15 }, tip: '舍友交了钱，对方失联。', log: '误判模特骗局，舍友被骗', danger: 'high', affectRoommate: { status: 'scammed', scamProgress: 100 } }
        ]
    },
    {
        id: 'rj_05', type: 'judge', title: '🧠 舍友的"刷单兼职"',
        desc: '舍友找了个"刷单兼职"，说先垫付100元刷一单就返120。{ta}问你要不要一起。',
        options: [
            { text: '告诉{ta}：刷单垫付是诈骗陷阱', isScam: true, effect: { persuasion: 8, social: 4 }, tip: '你提醒{ta}"先垫付的都是刷单骗局"，{ta}及时退出。', log: '识破刷单骗局，救下舍友', danger: 'safe', affectRoommate: { trust: 10, status: 'normal', scamProgress: 0 } },
            { text: '觉得能赚钱，一起刷', isScam: false, effect: { money: -100, anxiety: 15 }, tip: '你们垫付后，对方卷款跑路。', log: '误判刷单，双双被骗', danger: 'high', affectRoommate: { status: 'scammed', scamProgress: 100 } }
        ]
    },
    {
        id: 'rj_06', type: 'judge', title: '🧠 舍友的"公检法"来电',
        desc: '舍友慌张地说接到"公安局"电话，说{ta}涉嫌洗钱，要{ta}把钱转到"安全账户"。{ta}问你该怎么办。',
        options: [
            { text: '告诉{ta}：公检法没有"安全账户"，是诈骗', isScam: true, effect: { persuasion: 10, social: 5 }, tip: '你稳住{ta}，让{ta}挂断并打96110核实，救了{ta}一命。', log: '识破冒充公检法，救下舍友', danger: 'safe', affectRoommate: { trust: 15, status: 'normal', scamProgress: 0 } },
            { text: '觉得对方语气严肃，让{ta}配合', isScam: false, effect: { anxiety: 20 }, tip: '舍友把钱转进"安全账户"，全没了。', log: '误判公检法，舍友被骗', danger: 'high', affectRoommate: { status: 'scammed', scamProgress: 100 } }
        ]
    }
];

// ============================================================
//  多舍友联动事件 (RoommateMultiEvents)
//  玩法：两个及以上舍友同时卷入，玩家的抉择影响多人。
//  - type: 'multi'，options 带 affectRoommates: [id, ...] 数组。
// ============================================================
export const RoommateMultiEvents = [
    {
        id: 'rm_01', type: 'multi', title: '👥 两个舍友一起被拉进"刷单群"',
        desc: '你发现两个舍友都在一个"兼职刷单群"里，正商量着一起垫付做任务。',
        options: [
            { text: '及时叫停，给两人讲清刷单套路', effect: { persuasion: 10, social: 6 }, tip: '你晓之以理，两人都退了群。', log: '同时救下两名舍友', danger: 'safe', affectRoommates: [{ trust: 12, status: 'normal', scamProgress: 0 }, { trust: 12, status: 'normal', scamProgress: 0 }] },
            { text: '只提醒关系好的那个', effect: { social: 3 }, tip: '你只救了一个，另一个还是陷进去了。', log: '只救下一名舍友', danger: 'high', affectRoommates: [{ trust: 12, status: 'normal', scamProgress: 0 }, { trust: -5, status: 'scammed', scamProgress: 100 }] },
            { text: '没当回事', effect: { anxiety: 15 }, tip: '两人都被骗了，宿舍氛围跌入谷底。', log: '两名舍友都被骗', danger: 'high', affectRoommates: [{ trust: -8, status: 'scammed', scamProgress: 100 }, { trust: -8, status: 'scammed', scamProgress: 100 }] }
        ]
    },
    {
        id: 'rm_02', type: 'multi', title: '👥 舍友之间因"借钱"闹矛盾',
        desc: '两个舍友因为之前借钱的事起了争执，气氛很僵，还牵扯到你。',
        options: [
            { text: '主动调解，帮{ta}们算清账目', effect: { social: 8, anxiety: 5 }, tip: '你当和事佬，两人握手言和。', log: '调解舍友矛盾', danger: 'safe', affectRoommates: [{ trust: 10 }, { trust: 10 }] },
            { text: '躲开，让{ta}们自己解决', effect: { anxiety: 8 }, tip: '{ta}们冷战了很久，宿舍气氛紧张。', log: '回避矛盾', danger: 'low', affectRoommates: [{ trust: -3 }, { trust: -3 }] }
        ]
    },
    {
        id: 'rm_03', type: 'multi', title: '👥 宿舍集体接到"中奖"诈骗',
        desc: '宿舍几个人同时收到了"某某活动中奖"的短信，有人已经开始心动。',
        options: [
            { text: '当众揭穿骗局，提醒大家别信', effect: { persuasion: 10, social: 8 }, tip: '你一番科普，大家纷纷删除短信。', log: '集体识破中奖骗局', danger: 'safe', affectRoommates: [{ trust: 8 }, { trust: 8 }, { trust: 8 }] },
            { text: '只提醒关系最好的那个', effect: { social: 2 }, tip: '其他人可能还是会中招。', log: '只提醒一人', danger: 'high', affectRoommates: [{ trust: 10 }, { trust: -3, status: 'scammed', scamProgress: 80 }, { trust: -3, status: 'scammed', scamProgress: 80 }] }
        ]
    },
    {
        id: 'rm_04', type: 'multi', title: '👥 舍友拉你一起"投资"还拉了别人',
        desc: '一个舍友被"理财导师"洗脑，还想拉你和另一个舍友一起投钱。',
        options: [
            { text: '坚决劝阻，并给两人科普杀猪盘', effect: { persuasion: 12, social: 6 }, tip: '你成功让两人都清醒过来。', log: '劝回两名舍友', danger: 'safe', affectRoommates: [{ trust: 15, status: 'normal', scamProgress: 0 }, { trust: 10, status: 'normal', scamProgress: 0 }] },
            { text: '自己拒绝，但没拦别人', effect: { social: 2 }, tip: '你自己没投，但另一个舍友被拉进去了。', log: '自己独善其身', danger: 'high', affectRoommates: [{ trust: -5, status: 'scammed', scamProgress: 100 }, { trust: -3, status: 'scammed', scamProgress: 100 }] }
        ]
    }
];

