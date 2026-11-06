// ============================================================
//  刷值小剧情池 (GrindStories)
//  设计说明：
//  - 「和舍友互动」触发的短小剧情，围绕舍友展开，用于刷取
//    「说服力」与「信任值」两大核心数值。
//  - 分两类：
//    kind: 'scam'    真诈骗小剧情 —— 识破骗局 → 说服力 +
//    kind: 'mystery' 迷惑疑似非诈骗 —— 虚惊一场 → 信任值 +
//  - gender 字段（性别针对性）：
//    null   通用（男女线路都会触发）
//    'male' 仅男性线路舍友触发（如裸聊敲诈、游戏代练）
//    'female' 仅女性线路舍友触发（如杀猪盘、美妆代购）
//  - 每个事件绑定一位舍友（roll 时随机绑定），选项结算
//    correct 标记正确项（正确→数值收益，错误→小幅惩罚/损失）。
//  - 字段：id/kind/gender/title/desc/options[{text,tip,effect,affectRoommate,correct}]
//    占位符 {name}/{ta}/{bro}/{nickname}/{lover}/{lover_sex} 由性别解析替换。
// ============================================================

export const GrindStories = [
    // ==================== 一、通用诈骗小剧情 (scam, gender: null) ====================
    {
        id: 'gs_scam_01', kind: 'scam', gender: null,
        title: '🔔 一条"学费退还"的短信',
        desc: '你看到{name}拿着手机，正对着一条短信皱眉："【教务处】同学你好，你本学年多缴的教材费 368 元需退回，请点击链接填写银行卡信息确认退款。"\n\n{ta}小声嘀咕："退钱还要填银行卡？该不会是骗子吧……不过金额好像对得上。"',
        options: [
            { text: '提醒{ta}别点，先打学校财务处电话核实', tip: '{name}拨通了学校财务处电话，对方明确表示"学校从不会通过短信链接退费"。{ta}惊出一身冷汗，赶紧删了短信。', effect: { persuasion: 6 }, affectRoommate: { trust: 8 }, correct: true },
            { text: '"金额能对上，应该没问题，填吧"', tip: '{name}按提示填了银行卡和验证码，几分钟后卡里被划走了 1200 元。', effect: { persuasion: -2 }, affectRoommate: { trust: -5, status: 'scammed', scamProgress: 100 }, correct: false }
        ]
    },
    {
        id: 'gs_scam_02', kind: 'scam', gender: null,
        title: '💼 一个"高薪兼职"的诱惑',
        desc: '{name}兴奋地跟你说，{ta}在某个兼职群里看到一条"在家日结 300+"的招聘，工作内容是"帮商家刷单返现"。对方让{ta}先垫付一笔"激活费" 300 元。\n\n{ta}："客服说垫付的钱做完任务立刻退，还返现 80。"',
        options: [
            { text: '提醒{ta}：刷单本身就是违法，垫付更是骗局', tip: '你告诉{ta}"正规兼职从不需要你先垫钱"。{ta}查了反诈宣传，果断退群举报。', effect: { persuasion: 6 }, affectRoommate: { trust: 8 }, correct: true },
            { text: '"听着挺赚的，先试一单呗"', tip: '{name}垫付了 300 元，对方又以"连单任务"为由让{ta}继续垫钱，{ta}又转了 500 才醒悟。', effect: { persuasion: -2 }, affectRoommate: { trust: -5, money: -800, status: 'scammed', scamProgress: 100 }, correct: false }
        ]
    },
    {
        id: 'gs_scam_03', kind: 'scam', gender: null,
        title: '📞 一通"公检法"的来电',
        desc: '{name}脸色发白地挂掉电话，说对方自称"市公安经侦"，称{ta}的银行卡涉嫌洗钱，要{ta}把资金转到"安全账户"配合调查，还要求{ta}保密、不能告诉任何人。\n\n{ta}："他连我的身份证号都报出来了……"',
        options: [
            { text: '告诉{ta}：真警察不会让转账到"安全账户"', tip: '你斩钉截铁地说"公检法绝不会在电话里要求转账"。{ta}缓过神来，主动拨打 110 核实，确认是诈骗。', effect: { persuasion: 7 }, affectRoommate: { trust: 9 }, correct: true },
            { text: '"身份证号都对，可能真是警察"', tip: '{name}按照对方指引转了 3000 元，等再打过去电话已无法接通。', effect: { persuasion: -2 }, affectRoommate: { trust: -5, money: -3000, status: 'scammed', scamProgress: 100 }, correct: false }
        ]
    },
    {
        id: 'gs_scam_04', kind: 'scam', gender: null,
        title: '🎁 一个"免费送皮肤"的链接',
        desc: '打游戏时，{name}点开一个弹窗，里面写着"登录即送稀有皮肤，仅限今日"。{ta}正犹豫要不要输入游戏账号密码。',
        options: [
            { text: '提醒{ta}：天上不会掉皮肤，这是盗号链接', tip: '你让{ta}关掉弹窗，去官方渠道核对，果然查无此活动。{ta}避免了账号被盗。', effect: { persuasion: 6 }, affectRoommate: { trust: 8 }, correct: true },
            { text: '"送皮肤不拿白不拿"', tip: '{name}输入了账号密码，第二天账号就被盗了，还绑定了陌生人手机号，花了很久才找回。', effect: { persuasion: -2 }, affectRoommate: { trust: -4 }, correct: false }
        ]
    },

    // ==================== 二、男性专属骗局 (gender: 'male') ====================
    {
        id: 'gs_scam_male_01', kind: 'scam', gender: 'male',
        title: '📹 一条"裸聊"的暧昧邀约',
        desc: '{name}半夜红着脸跟你说，{ta}在交友软件上认识了个"小姐姐"，聊得火热，对方突然提出要视频裸聊"增进感情"。视频刚接通没几秒，对方就挂断了，随后发来一段{ta}的露脸画面，威胁："不转钱就把视频发给你通讯录所有人。"\n\n{ta}又羞又怕，手都在抖。',
        options: [
            { text: '告诉{ta}：这是裸聊敲诈，绝不要转账，立刻报警', tip: '你让{ta}停止转账、保留聊天截图和威胁证据，果断拨打 110。警方明确这是典型的"裸聊敲诈"，{ta}才松了口气。', effect: { persuasion: 7 }, affectRoommate: { trust: 9 }, correct: true },
            { text: '"先转点钱消灾吧，别让视频外传"', tip: '{name}转了 5000 元"封口费"，对方却变本加厉继续索要，{ta}越陷越深，最后报警才止损。', effect: { persuasion: -2 }, affectRoommate: { trust: -5, money: -5000, status: 'scammed', scamProgress: 100 }, correct: false }
        ]
    },
    {
        id: 'gs_scam_male_02', kind: 'scam', gender: 'male',
        title: '🎮 一笔"游戏代练/账号交易"的陷阱',
        desc: '{name}想出手自己的游戏账号，在贴吧挂了个帖子。很快有"买家"联系，说要走一个"平台担保"，发来一个交易链接，让{ta}先交 200 元"保证金"。\n\n{ta}："他说平台要押金，交易完就退。"',
        options: [
            { text: '提醒{ta}：正规平台从不会先收"保证金"', tip: '你让{ta}去游戏官方客服核实，确认根本没有这个"担保平台"。{ta}拉黑了对方，避免了损失。', effect: { persuasion: 6 }, affectRoommate: { trust: 8 }, correct: true },
            { text: '"交个保证金也正常，试试呗"', tip: '{name}转了 200 元保证金，对方又让{ta}交"解冻费"，{ta}又转了 600 才意识到被骗。', effect: { persuasion: -2 }, affectRoommate: { trust: -5, money: -800, status: 'scammed', scamProgress: 100 }, correct: false }
        ]
    },

    // ==================== 三、女性专属骗局 (gender: 'female') ====================
    {
        id: 'gs_scam_female_01', kind: 'scam', gender: 'female',
        title: '💘 一场"高富帅"的网恋杀猪盘',
        desc: '{name}最近认识了个"条件很好"的男网友，对方嘘寒问暖、无微不至，还经常发健身照和"事业有成"的朋友圈。聊了一段时间后，对方开始"不经意"地透露自己在玩一个"稳赚"的投资平台，想带{ta}一起"理财"。\n\n{ta}有点心动："他说他自己都投了二十万。"',
        options: [
            { text: '提醒{ta}：这是典型杀猪盘，先恋爱后带你投资', tip: '你让{ta}警惕"稳赚不赔"的话术，并搜出几篇一模一样的杀猪盘套路案例。{ta}看完后背发凉，果断拉黑。', effect: { persuasion: 7 }, affectRoommate: { trust: 9 }, correct: true },
            { text: '"他都投那么多，应该靠谱，跟着投点呗"', tip: '{name}先投了 2000 元"试水"，果然小赚，随后越投越多，直到平台打不开才意识到被骗，损失惨重。', effect: { persuasion: -2 }, affectRoommate: { trust: -5, money: -5000, status: 'scammed', scamProgress: 100 }, correct: false }
        ]
    },
    {
        id: 'gs_scam_female_02', kind: 'scam', gender: 'female',
        title: '👜 一个"低价美妆代购"的坑',
        desc: '{name}在群里看到有人发"专柜撤柜、大牌口红/精华 5 折代购"，价格诱人。对方说"先款后货"，还发来一堆"买家秀"和"订单截图"。{ta}正犹豫要不要下单。',
        options: [
            { text: '提醒{ta}：先款后货 + 远低于市场价 = 高风险', tip: '你让{ta}去正规渠道比价、查看对方资质，并提醒"先款后货"没有保障。{ta}放弃了这笔交易。', effect: { persuasion: 6 }, affectRoommate: { trust: 8 }, correct: true },
            { text: '"这么便宜，买到就是赚到"', tip: '{name}转了 800 元，对方收款后直接拉黑。{ta}这才明白"低价代购"是套路。', effect: { persuasion: -2 }, affectRoommate: { trust: -5, money: -800, status: 'scammed', scamProgress: 100 }, correct: false }
        ]
    },

    // ==================== 四、迷惑疑似非诈骗 (mystery, gender: null) ====================
    {
        id: 'gs_myst_01', kind: 'mystery', gender: null,
        title: '🕵️ {name}鬼鬼祟祟地在转账',
        desc: '你路过阳台，看见{name}正背对着你，手机屏幕停在转账页面，{ta}慌慌张张地切走了屏幕。你心里一紧：这场景太像被骗了。',
        options: [
            { text: '先不急着下结论，旁敲侧击关心一下', tip: '你试探着问了一句，{ta}不好意思地笑了："我在给家里寄钱，我妈最近生病了，不想让你们担心。"虚惊一场。', effect: { persuasion: 3 }, affectRoommate: { trust: 12 }, correct: true },
            { text: '直接质问{ta}"你是不是被骗了"', tip: '{ta}先是一愣，随后有些委屈："我是给家里转钱，你把我当什么了。"气氛一时尴尬。', effect: { persuasion: -1 }, affectRoommate: { trust: -10 }, correct: false }
        ]
    },
    {
        id: 'gs_myst_02', kind: 'mystery', gender: null,
        title: '📦 {name}偷偷摸摸收了个快递',
        desc: '{name}最近总往楼下跑，拿快递时遮遮掩掩，还不让你看里面是什么。联想到最近"杀猪盘""刷单返利"的案例，你越想越不安。',
        options: [
            { text: '找个轻松的时机，好奇地问问', tip: '{name}红着脸打开快递，是一盒精心包装的礼物——原来是{ta}的生日快到了，{ta}在偷偷准备送给你的惊喜。', effect: { persuasion: 3 }, affectRoommate: { trust: 12 }, correct: true },
            { text: '趁{ta}不在，偷偷拆开看看', tip: '{name}回来发现快递被拆过，脸色很难看："你动我东西了？"你一时语塞，两人的信任有了裂痕。', effect: { persuasion: -2 }, affectRoommate: { trust: -15 }, correct: false }
        ]
    },
    {
        id: 'gs_myst_03', kind: 'mystery', gender: null,
        title: '🌙 {name}半夜抱着手机聊天',
        desc: '凌晨一点，{name}还窝在被子里，手机屏幕的光映在{ta}脸上，{ta}时不时笑出声。你担心{ta}是不是遇到了"网恋杀猪盘"的骗子。',
        options: [
            { text: '白天时笑着打听"最近有啥开心事"', tip: '{name}小声说："我跟我对象在攒钱去毕业旅行呢，刚在商量攻略。"原来是异地恋，一切正常。', effect: { persuasion: 3 }, affectRoommate: { trust: 11 }, correct: true },
            { text: '严肃地提醒{ta}"网恋小心被杀猪盘"', tip: '{ta}尴尬地解释那是{ta}谈了两年的对象，不是你想象的那样。你的一番"好意"让{ta}有点下不来台。', effect: { persuasion: -1 }, affectRoommate: { trust: -8 }, correct: false }
        ]
    },
    {
        id: 'gs_myst_04', kind: 'mystery', gender: null,
        title: '💳 {name}突然问你借一笔钱',
        desc: '{name}支支吾吾地开口，想跟你借 800 元，理由是"手头周转不开"。借钱这事太敏感，你心里警铃大作，又怕误伤了{ta}。',
        options: [
            { text: '先问清用途，再决定借不借', tip: '你耐心一问，{ta}红着脸说家里临时有事，医保报销还没下来，先垫付一下。你借给{ta}，{ta}千恩万谢，一周后就还了。', effect: { persuasion: 2 }, affectRoommate: { trust: 12 }, correct: true },
            { text: '一口回绝"你该不会是被骗了吧"', tip: '{ta}愣住，低声说了句"算了"就走开了。后来你才知道{ta}家里确实出了急事，你的怀疑伤了{ta}的心。', effect: { persuasion: -1 }, affectRoommate: { trust: -12 }, correct: false }
        ]
    },
    {
        id: 'gs_myst_05', kind: 'mystery', gender: null,
        title: '📱 {name}手机里多了个陌生 App',
        desc: '你瞥见{name}在用一个从没见过的 App，界面花花绿绿的，还有"任务""提现"之类的字样。你第一反应是：这会不会是诈骗软件？',
        options: [
            { text: '好奇地问{ta}"这是啥软件"', tip: '{name}大方展示："这是我们摄影社团的接单小程序，接单做图赚点零花钱，正规平台。"你恍然大悟。', effect: { persuasion: 3 }, affectRoommate: { trust: 10 }, correct: true },
            { text: '当场让{ta}卸载"这肯定是骗子"', tip: '{ta}一脸无语："这是我们社团的接单平台，我用好几个月了。"你的武断让{ta}觉得你大惊小怪。', effect: { persuasion: -1 }, affectRoommate: { trust: -8 }, correct: false }
        ]
    }
];
