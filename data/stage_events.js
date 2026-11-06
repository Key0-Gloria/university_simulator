export const StageEvents = [
    // ==================== 【大一专属事件】 (minYear: 1, maxYear: 1) ====================
    {
        id: 'y1_01', minYear: 1, maxYear: 1, category: '校园推销', title: '【开学季】“免费”校园大流量王卡',
        desc: '宿舍里来了个自称“学长”的人，推销一种“免月租、大流量”的专属校园卡，只要交50元开卡费并上传身份证正反面就能立刻使用。他热情地递来宣传单，还拍着胸脯说“毕业后随时可注销”，可那张卡的归属公司你从未听过。',
        options: [
            { text: '图省事直接办一张', effect: { money: -50, alertness: -10, anxiety: 10 }, log: '办理了假校园卡，身份信息遭泄露。', isCorrect: false, tip: '❌ 这种非官方渠道的卡多为物联网卡或用来套取个人信息的。' },
            { text: '婉拒，去三大运营商正规营业厅办理', effect: { alertness: 10 }, log: '识破假学长推销套路。', isCorrect: true, tip: '✅ 办理通信业务必须认准官方营业厅。' }
        ]
    },
    {
        id: 'y1_02', minYear: 1, maxYear: 1, category: '培训陷阱', title: '【四六级】“保过协议班”内部名额',
        desc: '路过教学楼，看到“四六级保过协议班”的宣传。对方声称有内部原题，考不过全额退款，只需先交800元资料费。海报上“历年通过率98%”的红字格外刺眼，却没写清楚那98%里有多少人真考过了。',
        options: [
            { text: '交钱买心安，报班保过', effect: { money: -800, anxiety: 20 }, log: '交了保过班费用，结果对方跑路。', isCorrect: false, tip: '❌ 不存在所谓的内部原题，保过协议往往是文字游戏或卷款跑路的骗局。' },
            { text: '相信自己的实力，踏实背单词刷真题', effect: { gpa: 0.1 }, log: '拒绝保过班，靠自己备考。', isCorrect: true, tip: '✅ 学习没有捷径，正规备考最稳妥。' }
        ]
    },
    {
        id: 'y1_03', minYear: 1, maxYear: 1, category: '航班退改', title: '【航班取消】客服来电办理“理赔”',
        desc: '订了回家的机票后，接到“航空公司客服”电话，准确报出了你的姓名和航班号，称航班取消，要为你办理300元理赔，需提供银行卡号并下载屏幕共享软件。对方语气专业，连你的座位号都说得分毫不差。',
        options: [
            { text: '按要求下载软件并共享屏幕', effect: { money: -1500, anxiety: 30 }, log: '开启共享屏幕导致银行卡被洗劫一空。', isCorrect: false, tip: '❌ 任何要求下载会议软件、共享屏幕的理赔都是诈骗！' },
            { text: '直接挂断，通过官方App或拨打官方客服确认', effect: { alertness: 15 }, log: '通过官方渠道核实，避开了航班退改签诈骗。', isCorrect: true, tip: '✅ 遇到航班变动，务必通过官方渠道核实。' }
        ]
    },
    {
        id: 'y1_04', minYear: 1, maxYear: 1, category: '室友社交', title: '【聚餐】舍友提议周末去吃海底捞',
        desc: '大一刚开学，舍长提议大家一起出去吃顿好的增进感情。但人均消费要150元，这对你来说是一笔不小的开销。热气腾腾的火锅香气和室友们期待的眼神，让你有些犹豫。',
        options: [
            { text: '欣然前往，AA制买单', effect: { money: -150, social: 15, anxiety: -5 }, log: '和舍友聚餐，关系更加融洽。', isCorrect: true, tip: '✅ 适度社交是大学生活的一部分。' },
            { text: '谎称自己胃不舒服，不去聚餐', effect: { social: -10, money: 0 }, log: '为了省钱拒绝了舍友的聚餐。', isCorrect: true, tip: '⚠️ 省钱固然好，但也要注意维护宿舍关系。' }
        ]
    },

    // ==================== 【大二专属事件】 (minYear: 2, maxYear: 2) ====================
    {
        id: 'y2_01', minYear: 2, maxYear: 2, category: '黄牛票务', title: '【演唱会】一票难求的狂欢',
        desc: '你最喜欢的歌手来你的城市开演唱会，官方渠道一秒售罄。你在超话里看到有人原价出一张内场票，但要求加微信私下交易。对方发来的转账截图看起来很真，可那串微信号你并不熟悉。',
        options: [
            { text: '加微信直接转账买票', effect: { money: -1200, anxiety: 30 }, log: '私下转账买演唱会门票，被骗1200元。', isCorrect: false, tip: '❌ 私下交易毫无保障，极大概率是假票或直接拉黑。' },
            { text: '坚决走闲鱼等二手担保平台交易', effect: { money: -1000, social: 5 }, log: '走平台交易买到了转手的票。', isCorrect: true, tip: '✅ 买二手票一定要走担保平台，入场后再确认收货。' }
        ]
    },
    {
        id: 'y2_02', minYear: 2, maxYear: 2, category: '团餐跑路', title: '【充值】学校旁新开的网红轻食店',
        desc: '轻食店搞活动，充500送500，很多同学都办了卡。老板说这是为了回馈大学生，名额有限。店门口排起的长队和“最后一天”的标语，让你也动了充值的心思。',
        options: [
            { text: '觉得划算，果断充值500元', effect: { money: -500, anxiety: 20 }, log: '轻食店开业两周后卷款跑路，充值的钱打了水漂。', isCorrect: false, tip: '❌ 大学生是高发被割韭菜群体，大额预付费充值需高度警惕。' },
            { text: '不办卡，吃一次付一次', effect: { money: -30, alertness: 5 }, log: '坚持单次消费，虽然没占到便宜但也没踩坑。', isCorrect: true, tip: '✅ 避免大额预付费是保护钱包的基本操作。' }
        ]
    },
    {
        id: 'y2_03', minYear: 2, maxYear: 2, category: '黑中介', title: '【兼职】周末高薪家教，中介直推',
        desc: '看到兼职群里的高薪家教广告，联系后对方称需要先交200元“信息中介费”才能给你家长的联系方式。对方承诺“一对一、时薪高”，却对机构资质支支吾吾。',
        options: [
            { text: '交200元中介费接单', effect: { money: -200, anxiety: 10 }, log: '交了中介费后，对方给的家长电话是空号。', isCorrect: false, tip: '❌ 正规家教平台或学校勤工俭学中心绝不会提前收取高额中介费。' },
            { text: '拒绝交费，去学校勤工俭学中心找', effect: { alertness: 10 }, log: '避开了黑中介陷阱。', isCorrect: true, tip: '✅ 找兼职请认准官方认证的安全渠道。' }
        ]
    },

    // ==================== 【大三专属事件】 (minYear: 3, maxYear: 3) ====================
    {
        id: 'y3_01', minYear: 3, maxYear: 3, category: 'AI变声', title: '【求助】辅导员QQ发来的紧急借钱',
        desc: '收到辅导员QQ消息：“我微信限额了，急需2000元给领导包个红包，你先转我，明天还你。”你点开语音，声音和辅导员一模一样。可细想之下，辅导员从不用QQ谈私事，语气也透着几分生硬。',
        options: [
            { text: '老师有难，赶紧转账', effect: { money: -2000, anxiety: 25 }, log: '遭遇AI变声冒充辅导员诈骗。', isCorrect: false, tip: '❌ AI变声技术已成熟，凡是涉及转账必须当面核实。' },
            { text: '先打个电话给辅导员本人确认', effect: { alertness: 15, social: 5 }, log: '电话核实发现是诈骗。', isCorrect: true, tip: '✅ 涉及转账要求，必须多维度交叉核实。' }
        ]
    },
    {
        id: 'y3_02', minYear: 3, maxYear: 3, category: '学术诈骗', title: '【保研】核心期刊论文“包发”名额',
        desc: '大三为了保研加分，你急需发表一篇SCI。某保研机构承诺：“1.5万元包过，代写代发，不过全额退款。”对方发来一堆“已发表案例”，可那些期刊你翻了半天也没在正规数据库里查到。',
        options: [
            { text: '交钱买论文保研', effect: { money: -15000, gpa: -0.5, anxiety: 50 }, log: '买到假论文，不仅钱没了，还因学术造假被通报。', isCorrect: false, tip: '❌ 学术造假不仅违纪，更可能触犯法律，保研机构多为骗子。' },
            { text: '拒绝捷径，自己找导师做科研', effect: { gpa: 0.2, alertness: 10 }, log: '脚踏实地做科研，积累了真实学术经验。', isCorrect: true, tip: '✅ 学术道路没有捷径，诚信是底线。' }
        ]
    },
    {
        id: 'y3_03', minYear: 3, maxYear: 3, category: '投资理财', title: '【内幕】学长推荐的“稳赚不赔”量化平台',
        desc: '同系学长神秘地说：“这是内部渠道，量化交易，每天稳赚2%，投1万一个月变2万。”你看到群里很多人都在晒收益。那些“到账截图”整齐划一，却没人说得清钱到底投进了哪家实体公司。',
        options: [
            { text: '把攒的奖学金投进去', effect: { money: -5000, anxiety: 40 }, log: '遭遇杀猪盘理财，平台无法提现。', isCorrect: false, tip: '❌ 任何承诺“稳赚不赔、高收益”的都是骗局。' },
            { text: '警惕资金盘，拒绝并举报', effect: { alertness: 20 }, log: '识破杀猪盘套路，保护了财产。', isCorrect: true, tip: '✅ 天上不会掉馅饼，防范杀猪盘。' }
        ]
    },

    // ==================== 【大四专属事件】 (minYear: 4, maxYear: 4) ====================
    {
        id: 'y4_01', minYear: 4, maxYear: 4, category: '求职内推', title: '【校招】名企内部“保offer”名额',
        desc: '你正在焦急找工作，有人加你说：“认识某大厂HR，只需交5000元内推费，保你直接进终面，不通过全额退款。”对方的朋友圈晒着各种“offer捷报”，可那些公司的HR你从没在官网见过。',
        options: [
            { text: '交钱买内推机会', effect: { money: -5000, anxiety: 40 }, log: '交钱后被拉黑，错失春招黄金期。', isCorrect: false, tip: '❌ 大厂真实内推绝不会收费，收费内推全是诈骗！' },
            { text: '靠自己的实力去官网投递', effect: { gpa: 0.1, social: 5 }, log: '脚踏实地投递简历，积累了实战经验。', isCorrect: true, tip: '✅ 求职认准官方校招渠道，不要相信捷径。' }
        ]
    },
    {
        id: 'y4_02', minYear: 4, maxYear: 4, category: '健身房', title: '【毕业季】校园健身房“最后”优惠年卡',
        desc: '毕业前想练个好身材，健身房说“毕业季特惠，原价2000的年卡现在只要800，仅限今天”。店员一边催你签字，一边指着墙上“活动倒计时”的牌子，气氛 urgency 拉满。',
        options: [
            { text: '趁着便宜赶紧办一张', effect: { money: -800, anxiety: 30 }, log: '办卡后健身房连夜搬空器材跑路。', isCorrect: false, tip: '❌ 健身房预付费跑路是重灾区，尤其毕业季。' },
            { text: '选择单次付费或按周付费', effect: { money: -50 }, log: '选择了灵活的付费方式，避开了跑路风险。', isCorrect: true, tip: '✅ 抵制高额预付卡诱惑。' }
        ]
    },
    {
        id: 'y4_03', minYear: 4, maxYear: 4, category: '恋爱陷阱', title: '【网恋】毕业前的“黄昏恋”',
        desc: '毕业季，你在某社交软件上认识了一个非常聊得来的同城网友，对方很主动，但没聊几天就让你帮忙在一家平台上“买点东西”。对方发来的“情侣头像”和甜言蜜语，让你有些上头。',
        options: [
            { text: '为了爱情，果断帮忙付款', effect: { money: -1000, anxiety: 30 }, log: '遭遇杀猪盘，钱财和感情双双被骗。', isCorrect: false, tip: '❌ 网恋如果涉及金钱往来，大概率是骗子。' },
            { text: '拒绝付款，并要求线下真实见面', effect: { alertness: 15, social: 5 }, log: '果断拒绝，识破了对方的套路。', isCorrect: true, tip: '✅ 网恋需谨慎，守住钱包底线。' }
        ]
    }
];
