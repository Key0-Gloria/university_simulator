export const MassiveScamPool = [
    // ==================== 【一、 诈骗与陷阱事件】 (1-75) ====================
    {
        id: 's_01', category: '兼职诈骗', title: '【品牌宣发】新媒体商户矩阵日常数据维护',
        desc: '午后的手机弹出一条兼职群消息：“急招品牌商户日常曝光量维护员，无需经验，手机在线操作。先由系统分配测试任务，垫付小额货款立返本金加8%佣金，日结无上限。”你盯着“日结无上限”几个字，心里泛起一丝试探的念头。',
        options: [
            { text: '尝试按指引垫付100元进行第一单测试', effect: { money: -100, anxiety: 10 }, log: '轻信商户数据维护兼职，被骗100元。', isCorrect: false, danger: 'high', tip: '❌ 经典刷单诈骗变种！任何要求先行垫付资金的“数据维护”都是诈骗。' },
            { text: '直接将该群组屏蔽并退出', effect: { alertness: 10 }, log: '识破刷单变种骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！凡是需要垫付流动资金的网罗兼职均为违法违规陷阱。' }
        ]
    },
    {
        id: 's_02', category: '兼职诈骗', title: '【配音录制】有声书小说演播员招募',
        desc: '文娱平台上一条通告格外醒目：“面向高校招募有声书潜力演播员，按小时结算，零基础带薪培训。因名额有限，需缴纳399元专业声卡与导师对接费。”你想起自己一直想尝试配音，手指悬在支付键上。',
        options: [
            { text: '交纳399元费用以获取导师对接资格', effect: { money: -399, anxiety: 15 }, log: '交纳对接费后遭到拉黑。', isCorrect: false, danger: 'high', tip: '❌ 凡是以培训、对接、工本费名义先收费的全是诈骗。' },
            { text: '不予理会，直接关闭页面', effect: { alertness: 5 }, log: '避开语音配音培训骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！正规演播招聘绝不会在入职前收取任何费用。' }
        ]
    },
    {
        id: 's_03', category: '游戏交易', title: '【战局转让】绝版典藏账号极速出号',
        desc: '游戏社群里有人发消息：“因工作调动急出全皮肤高段位大号，原价大几千，现仅售300元。为省手续费，加微信直接发邮箱密码。”低价让你心动，可对方坚持不走平台，要你私下转账。',
        options: [
            { text: '通过微信私下转账300元购买', effect: { money: -300, anxiety: 15 }, log: '私下购买游戏账号被骗300元。', isCorrect: false, danger: 'high', tip: '❌ 私下直接转账没有任何平台安全保障，付款后必定失联。' },
            { text: '要求必须走官方交易猫或藏宝阁等担保平台', effect: { alertness: 10 }, log: '拒绝私下转账买号。', isCorrect: true, danger: 'safe', tip: '✅ 正确！虚拟交易务必通过官方安全通道。' }
        ]
    },
    {
        id: 's_04', category: '校园贷', title: '【数码分期】数码旗舰店“学生零首付特惠”',
        desc: '开学季，商场外展台人员热情推介：“最新款旗舰手机，大学生专享零首付、零利息分期，只需填个资料现场就能拿机。”你摸了摸空瘪的钱包，又看了眼那台亮闪闪的新手机。',
        options: [
            { text: '签署现场提供的非银金融机构分期协议', effect: { money: -1000, anxiety: 30 }, log: '陷入消费套路贷，背负高额隐形利息。', isCorrect: false, danger: 'high', tip: '❌ 警惕披着数码促销外衣的非正规校园贷与金融陷阱。' },
            { text: '婉言谢绝，认为没有即时消费必要', effect: { alertness: 15, gpa: 0.1 }, log: '拒绝诱导消费分期。', isCorrect: true, danger: 'safe', tip: '✅ 正确！树立健康理性的消费观，拒绝盲目超前消费。' }
        ]
    },
    {
        id: 's_05', category: '冒充师长', title: '【教务通知】辅导员发布的“学业测评材料费”',
        desc: '班级群里，昵称和头像都和辅导员一模一样的人发消息：“接教务处通知，本学期综合测评需紧急缴纳教材与资料审核费500元，请速转入指定私人账户。”群里已有几个同学回复“已转”。',
        options: [
            { text: '立刻按照群里指示扫码转账500元', effect: { money: -500, anxiety: 20 }, log: '遭遇冒充师长诈骗，损失500元。', isCorrect: false, danger: 'high', tip: '❌ 假冒老师通过私人社交账号要求转账的均为诈骗！' },
            { text: '感到蹊跷，决定去办公室或者打电话向辅导员核实', effect: { alertness: 15, social: 5 }, log: '当面核实，戳穿假辅导员骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！涉及任何资金往来的通知必须多渠道当面确认。' }
        ]
    },
    {
        id: 's_06', category: '冒充公检法', title: '【涉案协查】疾控与公安联合安全提示',
        desc: '一通外地“公安局”来电打破了安静：“你名下的某通信账户涉嫌发送诈骗信息、牵扯重大洗钱案，现依法对你进行线上资产清查与隔离保护。”对方语气严肃，还准确报出了你的身份证尾号。',
        options: [
            { text: '因害怕受牵连，配合对方将存款转入“安全账户”', effect: { money: -3000, anxiety: 40 }, log: '遭遇冒充公检法资产清查诈骗，巨额资金损失。', isCorrect: false, danger: 'high', tip: '❌ 没有任何公检法机关会通过电话设立“安全账户”！' },
            { text: '冷静挂断电话，拨打96110或联系校保卫处', effect: { alertness: 20 }, log: '成功识别冒充公检法诈骗。', isCorrect: true, danger: 'safe', tip: '✅ 正确！公检法办案绝不会远程要求转账。' }
        ]
    },
    {
        id: 's_07', category: '虚假退费', title: '【教育资助】国家助学金“精准学费清退通道”',
        desc: '陌生号码发来短信：“【全国学生资助管理中心】您的国家助学金及学费差额补贴已批复，请立即点击专属链接核验银行卡领取。”链接做得和官网一模一样，你差点就点了进去。',
        options: [
            { text: '点击短信中的链接填写银行卡号与短信验证码', effect: { money: -1500, anxiety: 25 }, log: '点击钓鱼链接，银行账户资金遭盗刷。', isCorrect: false, danger: 'high', tip: '❌ 索要短信验证码的资助通知全都是钓鱼诈骗！' },
            { text: '置之不理，向学校资助中心老师求证', effect: { alertness: 15 }, log: '识破虚假资助退费骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！所有官方补助均由学校财务直接打入学生校园卡。' }
        ]
    },
    {
        id: 's_08', category: '退款诈骗', title: '【物流异常】快递公司“官方全额理赔专线”',
        desc: '自称快递客服来电：“您网购的生鲜由于物流中转破损，现为您办理三倍退款，请下载指定视频会议App协助远程操作。”对方连你买了什么、花了多少都一清二楚，让你很难怀疑。',
        options: [
            { text: '下载会议软件并按客服提示开启屏幕共享', effect: { money: -2000, anxiety: 35 }, log: '开启屏幕共享泄露密码，存款被全数转走。', isCorrect: false, danger: 'high', tip: '❌ 开启屏幕共享等于向对方开放手机所有权限！' },
            { text: '直接挂断，通过官方电商App内客服咨询', effect: { alertness: 15 }, log: '识破网购退款诈骗。', isCorrect: true, danger: 'safe', tip: '✅ 正确！所有电商理赔退款均在官方App内完成，不经由私聊。' }
        ]
    },
    {
        id: 's_09', category: '闲鱼交易', title: '【二手交易】买家发送的“第三方验机授权”',
        desc: '闲鱼平台上售卖闲置平板，买家拍下后发来一张二维码图片：“我在二手严选平台做过授权认证了，你扫码确认一下订单才能生效。”图片里的网站域名和闲鱼只差一个字母。',
        options: [
            { text: '扫描买家发来的二维码并输入支付密码', effect: { money: -800, anxiety: 20 }, log: '扫描钓鱼二维码导致资金被扣。', isCorrect: false, danger: 'high', tip: '❌ 警惕买家发送的任何外部链接与第三方不明二维码。' },
            { text: '坚持只在闲鱼官方App流程内发货与查看订单', effect: { alertness: 10 }, log: '拒绝买家发送的钓鱼二维码。', isCorrect: true, danger: 'safe', tip: '✅ 正确！任何脱离官方平台的扫码操作均有极大风险。' }
        ]
    },
    {
        id: 's_10', category: '杀猪盘', title: '【心动连结】兴趣社群里结识的“理财导师”',
        desc: '某读书交友社群中结识了一位谈吐优雅的“行业精英”，相聊甚欢后对方随口透露：“我在维护的某境外外汇盘口最近有稳赚不赔的内幕行情，带你赚点零花钱。”几天的暧昧聊天让你逐渐卸下了防备。',
        options: [
            { text: '出于信任向对方推荐的投资平台充值2000元', effect: { money: -2000, anxiety: 40 }, log: '陷入杀猪盘理财骗局，资金无法提现。', isCorrect: false, danger: 'high', tip: '❌ 网络交友谈及投资理财的100%是杀猪盘骗局！' },
            { text: '立刻中止对话并将其拉黑举报', effect: { alertness: 25 }, log: '成功识别杀猪盘套路，及时止损。', isCorrect: true, danger: 'safe', tip: '✅ 正确！防范网络交友诱导投资。' }
        ]
    },
    {
        id: 's_11', category: 'AI换脸', title: '【亲友求助】微信视频连线中的“突发急事”',
        desc: '高中挚友突然通过微信视频发起连线：“我这边在国外遇到点突发海关扣留，急需2000元周转。”视频里看着确实是他的脸，但神情有些呆滞僵硬，背景也在微微闪烁。',
        options: [
            { text: '看清确实是对方的脸，立刻扫码转账', effect: { money: -2000, anxiety: 30 }, log: '遭遇AI换脸合成诈骗，被骗走2000元。', isCorrect: false, danger: 'high', tip: '❌ 警惕AI视频换脸技术，涉及借钱必须多维度交叉核实！' },
            { text: '要求对方说出特定暗号或直接拨打电话核实', effect: { alertness: 20 }, log: '通过暗号与电话核实戳穿AI诈骗。', isCorrect: true, danger: 'safe', tip: '✅ 正确！视频图像现在也能通过AI实时伪造。' }
        ]
    },
    {
        id: 's_12', category: '熟人杀猪', title: '【同窗挚友】老同学推荐的“内部品牌代运营”',
        desc: '许久不联系的高中同学突然发微信：“我现在带团队做电商代运营，急需帮店铺冲销量，垫付买下立刻返还本金加5%佣金，绝对靠谱。”你犹豫着，这真的是那个老同学吗？',
        options: [
            { text: '相信老同学不会骗自己，尝试垫付500元', effect: { money: -500, anxiety: 15 }, log: '因轻信被盗号或被洗脑的熟人参与刷单被骗。', isCorrect: false, danger: 'high', tip: '❌ 熟人社交账号被盗或被拉拢参与黑产的情况屡见不鲜！' },
            { text: '婉言谢绝，并提醒对方账号可能存在异常', effect: { alertness: 15, social: -5 }, log: '拒绝熟人推荐的垫付任务。', isCorrect: true, danger: 'safe', tip: '✅ 正确！涉及垫资返利的任务一律按诈骗处理。' }
        ]
    },
    {
        id: 's_13', category: '冒充急事', title: '【医院急电】外地家属突发意外的“手术费”',
        desc: '深夜手机接到陌生号码急电：“你是某某的家属吗？他/她在外地突发严重车祸正在ICU抢救，急需5万元现金交纳首期手术押金！”电话那头的哭腔让你瞬间慌了神。',
        options: [
            { text: '精神崩溃下急忙将积蓄按对方账号转过去', effect: { money: -1500, anxiety: 50 }, log: '遭遇恶劣的冒充车祸急救诈骗，钱财尽失。', isCorrect: false, danger: 'high', tip: '❌ 面对突发灾祸急电，务必保持冷静，多方核实。' },
            { text: '稳住心神，立刻拨打父母及家属电话进行确认', effect: { alertness: 25 }, log: '冷静核实发现家属平安无事。', isCorrect: true, danger: 'safe', tip: '✅ 正确！重病急救汇款要求必须通过多渠道交叉核实。' }
        ]
    },
    {
        id: 's_14', category: '校园网贷', title: '【校园网】“数字校园一卡通”系统安全升级',
        desc: '收到运营商短信：“因数字校园一卡通系统全面升级，原校园卡账户即将失效，请于今日内点击专属链接完成实名认证与资金迁移。”链接里甚至要求你输入校园卡支付密码。',
        options: [
            { text: '点击短信内链接并输入了校园卡号与密码', effect: { money: -800, alertness: -15 }, log: '点击钓鱼短信链接，校园卡与账户遭到盗刷。', isCorrect: false, danger: 'high', tip: '❌ 学校官方通知绝不会通过短信附带不明链接索要密码！' },
            { text: '不予理睬，向学校网络信息中心咨询', effect: { alertness: 15 }, log: '成功识别校园网钓鱼诈骗短信。', isCorrect: true, danger: 'safe', tip: '✅ 正确！系统升级以学校官网正式通告为准。' }
        ]
    },
    {
        id: 's_15', category: '求职陷阱', title: '【名企实习】某知名大厂“管培生入职前置手续”',
        desc: '通过某高端招聘平台面试通过一家大厂，HR通知：“为保障保密协议，需自费前往指定体检机构（800元），并缴纳2000元岗位保密保证金。”你看着大厂名头，心里既激动又隐隐不安。',
        options: [
            { text: '为了得到这份实习机会，咬牙缴纳了体检费与押金', effect: { money: -2800, anxiety: 30 }, log: '遭遇求职中介押金诈骗，随后HR失联。', isCorrect: false, danger: 'high', tip: '❌ 正规用人单位入职前绝对不以任何名义收取押金或保证金！' },
            { text: '指出其违反劳动法规定，果断拒绝', effect: { alertness: 20 }, log: '识破招聘违规押金套路。', isCorrect: true, danger: 'safe', tip: '✅ 正确！劳动法明确禁止用人单位收取押金。' }
        ]
    },
    {
        id: 's_16', category: '门票诈骗', title: '【演出票务】热门音乐节“内部工作票转让”',
        desc: '一票难求的音乐节开票即空，社交平台上有人私信：“我有主办方内部工作人员预留票，原价转让，微信转账后顺丰秒发电子兑换码。”对方还发来一张“购票成功”的截图。',
        options: [
            { text: '急于看演出，直接通过微信转账800元', effect: { money: -800, anxiety: 20 }, log: '向黄牛私下转账买票，随后被对方拉黑。', isCorrect: false, danger: 'high', tip: '❌ 脱离官方票务平台的私下转账99%是诈骗陷阱！' },
            { text: '坚持只在官方大麦、秀动等正规平台购票', effect: { alertness: 10 }, log: '拒绝非官方渠道私下购票。', isCorrect: true, danger: 'safe', tip: '✅ 正确！切勿轻信所谓的“内部渠道票”。' }
        ]
    },
    {
        id: 's_17', category: '黑租房', title: '【长租公寓】市中心“高性价比精装单身公寓”',
        desc: '网上看到一套极具吸引力的精装公寓，中介不断催促：“这套房源房东出国急租，看房人很多，必须今天先转1000元定金才能给你留房。”照片里的落地窗和布艺沙发让你很是心动。',
        options: [
            { text: '未看实房就直接通过微信转账交了定金', effect: { money: -1000, anxiety: 25 }, log: '遭遇虚假房源黑中介，定金被骗。', isCorrect: false, danger: 'high', tip: '❌ 未实地看房、未核验房产证前绝不提前支付定金！' },
            { text: '坚持必须实地看房并核验房屋产权后再谈签约', effect: { alertness: 15 }, log: '成功规避虚假房源陷阱。', isCorrect: true, danger: 'safe', tip: '✅ 正确！实地看房与核对产权是租房铁律。' }
        ]
    },
    {
        id: 's_18', category: '培训贷', title: '【能力提升】“0元入学AI全栈剪辑，包高薪接单”',
        desc: '某职业教育机构宣传：“0元入学学习高端AI视频剪辑，只需签署一份学习分期协议，毕业后接单收入轻松覆盖每月分期还款。”听起来像是零成本逆袭的捷径。',
        options: [
            { text: '签署了培训分期贷款协议开始课程', effect: { money: -1200, anxiety: 35 }, log: '陷入培训贷套路，课程质量低劣且背负高额分期债务。', isCorrect: false, danger: 'high', tip: '❌ “0元入学包接单”是典型的培训贷款套路！' },
            { text: '仔细审阅合同条款，拒绝签订金融贷款协议', effect: { alertness: 20 }, log: '拒绝培训贷套路。', isCorrect: true, danger: 'safe', tip: '✅ 正确！不轻易为不明教育产品签署贷款。' }
        ]
    },
    {
        id: 's_19', category: '跑分帮信', title: '【账户租赁】“闲置收款码日租金500元”',
        desc: '有人在交流群发布兼职需求：“招募商户收款码代理，只需将闲置银行卡或微信收款码借给团队周转一天，日租金500元，绝对安全合法。”高额的日租让你有些心动，却也说不清对方要这笔钱做什么。',
        options: [
            { text: '将自己的银行卡和收款码租给对方使用', effect: { money: 500, alertness: -40, anxiety: 50 }, log: '出租账户沦为电信诈骗洗钱帮凶，涉嫌帮信罪被警方调查。', isCorrect: false, danger: 'high', tip: '❌ 严重违法！出租出售两卡构成“帮信罪”，将面临严厉法律制裁！' },
            { text: '意识到这是洗钱帮信犯罪，立刻举报并拉黑', effect: { alertness: 25 }, log: '拒绝跑分洗钱犯罪诱惑。', isCorrect: true, danger: 'safe', tip: '✅ 正确！保护个人账户，坚决不出租出借。' }
        ]
    },
    {
        id: 's_20', category: '裸聊敲诈', title: '【互动交友】陌生网友发来的“私密互动邀请”',
        desc: '某社交软件上有陌生网友主动搭讪，互道晚安后对方发来一个链接：“下载这款加密互动直播App，里面可以看私密直播并和我一对一连麦。”暧昧的措辞撩得你心头微动。',
        options: [
            { text: '下载不明App并按提示注册登录互动', effect: { money: -3000, anxiety: 60 }, log: '手机通讯录被恶意窃取，遭到隐私视频敲诈勒索。', isCorrect: false, danger: 'high', tip: '❌ 陌生链接下载的App常带有木马病毒，专门用于窃取通讯录进行敲诈！' },
            { text: '直接拒绝并拉黑对方', effect: { alertness: 20 }, log: '果断拒绝网络色情陷阱。', isCorrect: true, danger: 'safe', tip: '✅ 正确！保持健康纯洁的网络社交习惯。' }
        ]
    },
    {
        id: 's_21', category: '论文买卖', title: '【学术辅助】“硕博顶尖团队保过毕业论文定制”',
        desc: '毕业季网页弹窗广告：“专业硕博团队提供高水准毕业论文定制与改重服务，包过知网重查，仅收1500元定金。”临近答辩的你，看着空白的文档，一时动了歪念。',
        options: [
            { text: '交纳1500元委托对方代写论文', effect: { money: -1500, gpa: -0.5, anxiety: 40 }, log: '论文质量低劣且遭到对方以向学校举报进行敲诈勒索。', isCorrect: false, danger: 'high', tip: '❌ 学术造假严重违反校规，且代写机构常进行二次敲诈！' },
            { text: '坚持独立撰写，遇到难题向导师和同学请教', effect: { gpa: +0.2, alertness: 10 }, log: '拒绝论文代写，凭自身努力顺利完成。', isCorrect: true, danger: 'safe', tip: '✅ 正确！学术诚信是每位学生的底线。' }
        ]
    },
    {
        id: 's_22', category: '美容贷', title: '【形象管理】美业机构“校园专属免费变美体验”',
        desc: '校门口被热情的美容顾问拦住：“同学有兴趣做个免费皮肤管理吗？我们是新店开业做校园推广，只需签个分期体验协议即可。”你本就对自己的皮肤不太自信，被说得有些意动。',
        options: [
            { text: '跟随前往并稀里糊涂签下了万元医美分期', effect: { money: -2000, anxiety: 35 }, log: '遭遇强制高消费与套路医美贷陷阱。', isCorrect: false, danger: 'high', tip: '❌ 所谓的免费体验往往是诱导你背负高额医美贷款的幌子。' },
            { text: '礼貌婉拒并快步离开', effect: { alertness: 15 }, log: '避开路边医美推销陷阱。', isCorrect: true, danger: 'safe', tip: '✅ 正确！对路边免费推销保持高度戒备。' }
        ]
    },
    {
        id: 's_23', category: '虚假抽奖', title: '【周年庆典】商场门口“幸运大转盘免费抽奖”',
        desc: '商场中庭摆着抽奖台：“恭喜您抽中特等奖！只需支付少量税费或登记身份证号即可免费领走品牌平板电脑。”周围几个“中奖者”正兴高采烈地抱走奖品。',
        options: [
            { text: '填写身份证号并缴纳了税费', effect: { alertness: -10, anxiety: 15 }, log: '个人隐私信息泄露，交了税费后奖品迟迟未到。', isCorrect: false, danger: 'high', tip: '❌ 街头常见的抽奖送大礼多为诱导消费或收集个人信息的骗局。' },
            { text: '微笑拒绝，直接走开', effect: { alertness: 10 }, log: '拒绝街头虚假抽奖。', isCorrect: true, danger: 'safe', tip: '✅ 正确！天下没有凭空掉下来的大奖。' }
        ]
    },
    {
        id: 's_24', category: '白条违约', title: '【金融安全】“金融监管合规：注销违规白条额度”',
        desc: '接到自称某金融平台客服电话：“根据国家最新监管政策，您在大学期间开通的账户不合规，如不配合注销将严重影响个人征信。”对方语气专业，还发来了带您名字的“注销工单”。',
        options: [
            { text: '按照对方远程指导将各平台额度提现并转入指定账户', effect: { money: -3500, anxiety: 50 }, log: '遭遇“注销征信”连环诈骗，巨额资产被骗。', isCorrect: false, danger: 'high', tip: '❌ 个人征信无法通过人工修改或注销！要求转账的全是诈骗！' },
            { text: '直接挂断，通过官方App客服核实账户状况', effect: { alertness: 20 }, log: '成功识别注销征信诈骗套路。', isCorrect: true, danger: 'safe', tip: '✅ 正确！征信问题一切以官方权威机构解释为准。' }
        ]
    },
    {
        id: 's_25', category: '微信冒充', title: '【高层领导】“院领导”突然添加微信布置任务',
        desc: '微信收到昵称和头像是某院长的申请，通过后对方发来消息：“我在外地开会不方便接电话，现在有一个紧急项目需给上级领导转账慰问金，你先垫付。”你想起院长确实在外地出差。',
        options: [
            { text: '以为是领导器重自己，立刻准备转账2000元', effect: { money: -2000, anxiety: 30 }, log: '遭遇经典冒充领导微信诈骗。', isCorrect: false, danger: 'high', tip: '❌ 领导绝不会通过个人私信无缘无故要求学生转账垫付！' },
            { text: '向学院办公室老师或辅导员当面求证', effect: { alertness: 15, social: 5 }, log: '核实发现该微信系假冒。', isCorrect: true, danger: 'safe', tip: '✅ 正确！涉及资金要求的领导私信必须当面核实。' }
        ]
    },
    {
        id: 's_26', category: '外卖退款', title: '【品质理赔】外卖商家发来的“专属理赔小程序”',
        desc: '收到陌生号码短信或私信：“您中午点的外卖餐品存在食品安全隐患，现进行双倍现金赔付，请点击附带链接输入银行卡完成退款。”你中午确实点了那家外卖，下意识就点了链接。',
        options: [
            { text: '点击链接并在弹出的网页中输入了银行卡密码', effect: { money: -600, anxiety: 20 }, log: '在钓鱼网页中泄露密码导致银行卡被扣款。', isCorrect: false, danger: 'high', tip: '❌ 正规外卖理赔直接在App售后处理，绝不需要输入银行卡密码！' },
            { text: '直接在美团/饿了么官方App里查看售后', effect: { alertness: 10 }, log: '通过官方途径处理外卖售后。', isCorrect: true, danger: 'safe', tip: '✅ 正确！售后理赔认准官方App内部通道。' }
        ]
    },
    {
        id: 's_27', category: '虚拟货币', title: '【前沿理财】学长带玩的“区块链数字资产投资”',
        desc: '同系学长神秘兮兮地拉你入群：“我在研究Web3和数字资产理财，只要存入特定代币，每天稳赚1%分红，带你轻松实现财务自由。”群里每天都有人晒到账截图。',
        options: [
            { text: '跟着学长注册并充值参与数字资产理财', effect: { money: -1500, anxiety: 35 }, log: '陷入虚拟币资金盘骗局，平台迅速卷款跑路。', isCorrect: false, danger: 'high', tip: '❌ 虚拟币理财属于非法金融活动，多为传销和资金盘骗局！' },
            { text: '婉言谢绝，并提醒对方谨防涉嫌非法金融', effect: { alertness: 15 }, log: '拒绝非法虚拟币投资诱惑。', isCorrect: true, danger: 'safe', tip: '✅ 正确！树立合规理财意识，远离虚拟货币炒作。' }
        ]
    },
    {
        id: 's_28', category: '盗号借钱', title: '【好友求助】异地好友发来的“临时借钱救急”',
        desc: '好友的社交账号突然发来消息：“手机在异地不慎遗失且没电了，现在用别人的号登录，急需500元转账买车票回家。”字里行间满是焦急，还准确说出了你们上次见面的细节。',
        options: [
            { text: '二话不说通过微信扫码转过去500元', effect: { money: -500, anxiety: 15 }, log: '好友账号被盗，转账落入骗子腰包。', isCorrect: false, danger: 'high', tip: '❌ 好友通过文字要求转账借钱时，极可能是账号被盗！' },
            { text: '立刻拨打对方手机号或者语音通话核实', effect: { alertness: 15 }, log: '拨打电话确认好友账号确遭盗用。', isCorrect: true, danger: 'safe', tip: '✅ 正确！语音或电话是识破账号被盗的最佳手段。' }
        ]
    },
    {
        id: 's_29', category: '卡牌抽奖', title: '【潮玩盲盒】小红书高价回收的“稀有盲盒抽奖”',
        desc: '社交平台上看到：“长期高价收购某热门系列限量版潮玩盲盒，抽中隐藏款直接高价回收，在我这购买中奖率100%。”你想起宿舍里还堆着好几个没拆的盲盒，不免心动。',
        options: [
            { text: '花500元在该店铺连续购买盲盒试图搏高价回收', effect: { money: -500, anxiety: 20 }, log: '参与虚假高价盲盒营销骗局，收到一堆廉价劣质公仔。', isCorrect: false, danger: 'high', tip: '❌ 所谓的“高价回收”多为诱导冲动消费的虚假营销套路！' },
            { text: '理性看待，不盲目跟风抽奖', effect: { alertness: 10 }, log: '拒绝盲盒营销与炒作陷阱。', isCorrect: true, danger: 'safe', tip: '✅ 正确！保持理性消费，不轻信虚假回收。' }
        ]
    },
    {
        id: 's_30', category: '考试买答案', title: '【等级考试】“四六级考前密训与实时无线电答案”',
        desc: '考前在教学楼公告栏看到小广告：“专业提供四六级内部密训资料与考中微型无线电答案，一次过关，不过全额退款。”你盯着那串微信号，复习的焦虑让你有些动摇。',
        options: [
            { text: '交纳600元订金购买作弊设备与答案', effect: { money: -600, gpa: -0.5, anxiety: 40 }, log: '被骗订金且携带作弊器材被巡考抓获，面临记过处分。', isCorrect: false, danger: 'high', tip: '❌ 考试作弊不仅违法违纪，所谓的买答案更全都是诈骗！' },
            { text: '撕掉小广告，踏实凭自身实力复习备考', effect: { gpa: +0.1, alertness: 15 }, log: '拒绝作弊与买答案骗局，诚信应考。', isCorrect: true, danger: 'safe', tip: '✅ 正确！坚持诚信考试，远离不良诱惑。' }
        ]
    },
    {
        id: 's_31', category: '共享单车', title: '【扫码盗刷】共享单车上的“升级版个人收款码”',
        desc: '准备骑共享单车去上课，上车前发现车身原本的官方二维码上被人恶意贴了一张新的微型个人收款二维码。阳光一照，两层码的边缘微微翘起。',
        options: [
            { text: '没有仔细分辨直接用手机扫码支付车费', effect: { money: -20, alertness: -5 }, log: '扫了假二维码，车费直接落入骗子个人账户。', isCorrect: false, danger: 'high', tip: '❌ 骑行前务必认准官方App内置扫码功能，警惕覆盖的假码！' },
            { text: '仔细检查发现异常，撕掉假码并用App内部扫码', effect: { alertness: 10 }, log: '识破单车假二维码骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！细心甄别能有效避免扫码陷阱。' }
        ]
    },
    {
        id: 's_32', category: '免费打字', title: '【文案录入】“知名出版社手稿录入兼职”',
        desc: '兼职群看到招聘：“急招图书手稿数字化录入员，字迹清晰，日结200元。因需开通内部传输通道，先交纳99元软件授权押金。”你心想打字谁不会，这活儿轻松。',
        options: [
            { text: '交纳99元开通所谓的录入系统权限', effect: { money: -99, anxiety: 10 }, log: '交纳押金后被对方直接踢出群聊。', isCorrect: false, danger: 'high', tip: '❌ 现代OCR识别技术早已普及，绝不存在高薪纯打字兼职！' },
            { text: '识破荒谬逻辑，直接忽略该招聘', effect: { alertness: 10 }, log: '避开打字员兼职诈骗。', isCorrect: true, danger: 'safe', tip: '✅ 正确！违背常识的高回报低门槛兼职全是陷阱。' }
        ]
    },
    {
        id: 's_33', category: '公考资料', title: '【公考捷径】“内部命题人押题密卷与面试高分协议”',
        desc: '公考交流群里有人私聊兜售：“独家渠道获取省考命题组内部押题密卷，买就送面试通关秘籍，800元一套。”正值备考焦虑期，你差点就信了。',
        options: [
            { text: '付款购买所谓的内部押题卷', effect: { money: -800, anxiety: 20 }, log: '买到的资料全是网上公开的过时拼凑习题。', isCorrect: false, danger: 'high', tip: '❌ 国家公考绝无内部密题！兜售押题资料的纯属骗子。' },
            { text: '通过正规出版社购买官方教材自主复习', effect: { gpa: +0.1, alertness: 10 }, log: '拒绝虚假押题，购买正版教材。', isCorrect: true, danger: 'safe', tip: '✅ 正确！脚踏实地复习才是公考上岸的唯一途径。' }
        ]
    },
    {
        id: 's_34', category: '校园街访', title: '【问卷调查】“校园双创项目免费送精美玩偶”',
        desc: '校园主干道上有学生模样的人拦住你：“同学帮个忙，做个大学生消费习惯问卷调查，填一下手机号和身份证号就送公仔。”你看着那只毛绒玩偶，正犹豫要不要填。',
        options: [
            { text: '配合填写了真实的手机号、姓名与身份证号', effect: { alertness: -10, anxiety: 10 }, log: '个人核心隐私被非法收集，随后频繁接到推销骚扰电话。', isCorrect: false, danger: 'high', tip: '❌ 街头问卷送礼品多为非法收集个人隐私信息的黑色产业链！' },
            { text: '婉言谢绝并迅速离开', effect: { alertness: 10 }, log: '拒绝路边不明问卷，保护个人隐私。', isCorrect: true, danger: 'safe', tip: '✅ 正确！不轻易向陌生人透露核心身份信息。' }
        ]
    },
    {
        id: 's_35', category: '软件代下', title: '【高效工具】“专业付费制软件破解免安装版”',
        desc: '期末做设计需要某款昂贵的专业软件，贴吧看到有人分享：“10元打包获取该专业软件绿色破解版，附带一键激活补丁。”囊中羞涩的你，看着那10元的价格犹豫了。',
        options: [
            { text: '付款10元下载并运行了该破解安装包', effect: { money: -10, alertness: -10, anxiety: 20 }, log: '安装包夹带木马病毒，导致电脑被远控、网银密码泄露。', isCorrect: false, danger: 'high', tip: '❌ 非官方破解软件常捆绑恶意木马，极易造成电脑资产受损！' },
            { text: '使用学校机房正版软件或开源替代工具', effect: { alertness: 10, gpa: +0.05 }, log: '使用正版与校内资源安全完成作业。', isCorrect: true, danger: 'safe', tip: '✅ 正确！支持正版软件，防范木马病毒。' }
        ]
    },
    {
        id: 's_36', category: '游戏解封', title: '【账号恢复】“内部渠道强行解封违规游戏号”',
        desc: '游戏号因违规被系统封禁半年，网上搜索到一个技术贴宣称：“独家黑客技术，300元走内部接口，10分钟强行解封任意违规账号。”你盯着那个客服二维码，想着号里还有不少皮肤。',
        options: [
            { text: '添加对方微信转账300元求助解封', effect: { money: -300, anxiety: 15 }, log: '转账解封费后被直接拉黑，号也未能解封。', isCorrect: false, danger: 'high', tip: '❌ 官方账号封禁只能通过正规申诉渠道，号称能强行解封的全是骗子！' },
            { text: '通过官方客服渠道提交规范申诉材料', effect: { alertness: 10 }, log: '选择通过官方正规申诉管道处理。', isCorrect: true, danger: 'safe', tip: '✅ 正确！账号异常唯有相信官方客服渠道。' }
        ]
    },
    {
        id: 's_37', category: '虚假抽奖', title: '【粉丝回馈】“知名博主抽奖：付邮费送旗舰手机”',
        desc: '关注的某数码博主发动态：“为回馈粉丝，特此抽送100台九成新旗舰手机，中奖者仅需支付20元快递费。”你下意识点进链接，输入了地址，准备付那20元。',
        options: [
            { text: '支付20元快递费等待收货', effect: { money: -20, anxiety: 5 }, log: '收到一个劣质塑料玩具手机模型，遭遇山寨邮费骗局。', isCorrect: false, danger: 'high', tip: '❌ “付邮费送高端数码产品”是常见的骗取快递费与个人信息的套路！' },
            { text: '识破低级套路，直接划走', effect: { alertness: 10 }, log: '识破付邮费送手机骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！保持理性，不贪图小便宜。' }
        ]
    },
    {
        id: 's_38', category: '二手买卖', title: '【闲置交易】买家要求“脱离平台私下转账”',
        desc: '二手平台上刚上架闲置自行车，买家拍下后发来私信：“平台扣手续费太高了，我直接微信转给你，你修改状态发货吧。”对方还发来一张“已转账”的截图。',
        options: [
            { text: '同意私下交易并提前将自行车交予对方', effect: { money: -300, anxiety: 15 }, log: '收到伪造的转账截图后交货，钱财两空。', isCorrect: false, danger: 'high', tip: '❌ 骗子常利用假转账截图诱导脱离平台担保交易！' },
            { text: '坚持必须在官方闲鱼/转转平台内确认收款再交货', effect: { alertness: 10 }, log: '坚持平台担保交易流程。', isCorrect: true, danger: 'safe', tip: '✅ 正确！二手交易必须全程留在官方平台内。' }
        ]
    },
    {
        id: 's_39', category: '考研退费', title: '【考研辅导】“不过全额退费的高端封闭特训营”',
        desc: '某线下考研机构宣传：“18800元保过特训班，不过全额无忧退款，签正式法律协议。”你攒了很久的钱，想着搏一把。半年后机构突然卷款跑路，连教室都人去楼空。',
        options: [
            { text: '东拼西凑交纳了18800元学费报名', effect: { money: -3000, anxiety: 50 }, log: '培训机构人去楼空卷款跑路，预付费维权无门。', isCorrect: false, danger: 'high', tip: '❌ 警惕预付费大额培训机构跑路风险，切勿盲目相信“保过退费”！' },
            { text: '选择信誉良好的知名网课或自主复习', effect: { gpa: +0.1, alertness: 15 }, log: '理性选择学习途径，规避机构跑路风险。', isCorrect: true, danger: 'safe', tip: '✅ 正确！谨慎对待大额预付款培训项目。' }
        ]
    },
    {
        id: 's_40', category: '宠物诈骗', title: '【爱心领养】“纯种布偶猫因出国免费领养，自付空运”',
        desc: '贴吧看到领养贴：“因主人出国定居，纯种蓝猫免费送给爱猫人士，只需微信转300元航空托运费即可送达。”配图里的小猫憨态可掬，爱猫的你立马来了精神。',
        options: [
            { text: '微信转账300元托运费等待宠物送上门', effect: { money: -300, anxiety: 15 }, log: '转账托运费后对方迅速拉黑，遭遇虚假宠物领养骗局。', isCorrect: false, danger: 'high', tip: '❌ “免费领养宠物收取运费、检疫费”是极高发的网络宠物诈骗！' },
            { text: '坚持只接受同城线下面对面领养', effect: { alertness: 15 }, log: '拒绝远程转账领养宠物。', isCorrect: true, danger: 'safe', tip: '✅ 正确！宠物领养务必选择同城实地核验。' }
        ]
    },
    {
        id: 's_41', category: '校园买卡', title: '【校园通信】“校园特惠无限流量王卡”',
        desc: '宿舍楼下有人摆摊办理：“校园独家大流量卡，预存100元送200元话费，全国流量不限量随便用。”摊主热情地递来一张花哨的宣传单，价格确实诱人。',
        options: [
            { text: '现场交纳100元办理了该私人流量卡', effect: { money: -100, anxiety: 10 }, log: '办理的是违规物联网卡，使用两周后被运营商封卡失联。', isCorrect: false, danger: 'high', tip: '❌ 校园里推销的所谓“无限流量卡”多为违规物联网卡，随时面临停机！' },
            { text: '前往三大运营商校内正规营业厅办理套餐', effect: { alertness: 10 }, log: '选择官方营业厅办理通信业务。', isCorrect: true, danger: 'safe', tip: '✅ 正确！通信办卡认准官方正规营业网点。' }
        ]
    },
    {
        id: 's_42', category: '兼职代理', title: '【微商轻创业】“美妆品牌核心代理与裂变合伙人”',
        desc: '学姐拉你加入一个创业群：“代理某轻奢美妆品牌，拿货越多折扣越高，不仅能卖货，拉一个下线还能拿巨额返利。”群里每天都在晒收款截图。',
        options: [
            { text: '进货2000元成为品牌二级代理', effect: { money: -2000, anxiety: 30 }, log: '遭遇变相传销套路，货物质量低劣且根本卖不出去。', isCorrect: false, danger: 'high', tip: '❌ 依靠层层发展下线、囤货获利的模式极易涉嫌传销！' },
            { text: '婉言拒绝，认为这涉嫌传销拉人头模式', effect: { alertness: 20 }, log: '拒绝微商代理与囤货套路。', isCorrect: true, danger: 'safe', tip: '✅ 正确！远离靠拉下线牟利的商业模式。' }
        ]
    },
    {
        id: 's_43', category: '租房中介', title: '【个人转租】“二房东直租精装单身公寓”',
        desc: '毕业季租房遇到一位“热心的二房东”转租精装房，要求一次性付清半年房租可享大额优惠。交钱入住两周后，真房东上门要求限期搬离，你才知上了当。',
        options: [
            { text: '未核实房东产权与原租赁合同直接交了半年房租', effect: { money: -3000, anxiety: 50 }, log: '遭遇假二房东卷款跑路，损失惨重。', isCorrect: false, danger: 'high', tip: '❌ 租二房东的房子必须仔细查验原房东同意转租的授权证明！' },
            { text: '坚持必须与房屋产权所有人当面核对签约', effect: { alertness: 20 }, log: '核验产权证明，避开二房东跑路陷阱。', isCorrect: true, danger: 'safe', tip: '✅ 正确！租房必须查验房产证与原件。' }
        ]
    },
    {
        id: 's_44', category: '游戏代练', title: '【电竞兼职】“高段位游戏代练派单接单”',
        desc: '加入一个游戏代练接单群，客服告知：“接单前为防止打坏客户账号，需先交纳100元安全保证金。”你正愁生活费，想着代练来钱快，便准备转账。',
        options: [
            { text: '向对方转账100元保证金准备接单', effect: { money: -100, anxiety: 10 }, log: '转账保证金后被对方直接拉黑，遭遇虚假代练派单骗局。', isCorrect: false, danger: 'high', tip: '❌ 代练接单前要求交纳“保证金、押金”的全部都是诈骗！' },
            { text: '选择正规有平台担保的代练接单App', effect: { alertness: 10 }, log: '拒绝私下交押金接单。', isCorrect: true, danger: 'safe', tip: '✅ 正确！正规代练接单平台内置资金托管担保机制。' }
        ]
    },
    {
        id: 's_45', category: '明星粉丝', title: '【应援集资】“爱豆新专辑打榜冲销量集资”',
        desc: '饭圈后援会骨干号召：“为支持爱豆新歌空降榜单，大家积极参与集资，满1000元返还独家精美周边礼包。”作为粉丝的你，很想为偶像出一份力。',
        options: [
            { text: '通过微信转账1000元参与后援会集资', effect: { money: -1000, anxiety: 25 }, log: '后援会粉头卷款失联，集资款血本无归。', isCorrect: false, danger: 'high', tip: '❌ 非法民间集资缺乏有效监管，饭圈卷款跑路事件频发！' },
            { text: '理性追星，拒绝参与任何民间非正规资金筹集', effect: { alertness: 15 }, log: '理性追星，拒绝参与集资。', isCorrect: true, danger: 'safe', tip: '✅ 正确！理智追星，保护好个人财产安全。' }
        ]
    },
    {
        id: 's_46', category: '虚假返现', title: '【街头推广】“扫码关注公众号立领50元现金”',
        desc: '校园路口有人举着二维码牌子：“扫码关注我们的创业微信公众号，现场直接通过手机打款50元现金红包。”你看着那50元，心想动动手指就能赚。',
        options: [
            { text: '扫码并按照提示授权绑定了手机与姓名', effect: { money: -200, anxiety: 20 }, log: '扫码授权了恶意钓鱼程序，导致微信零钱被盗刷。', isCorrect: false, danger: 'high', tip: '❌ 街头扫码领红包可能暗含恶意授权或钓鱼木马程序！' },
            { text: '直接拒绝，不扫描来源不明的二维码', effect: { alertness: 10 }, log: '拒绝街头不明扫码，保护资金安全。', isCorrect: true, danger: 'safe', tip: '✅ 正确！不贪图小利，不乱扫陌生二维码。' }
        ]
    },
    {
        id: 's_47', category: '高价收号', title: '【账号买卖】“长期高价现金收购闲置微信/QQ号”',
        desc: '宿舍楼道墙上贴着小广告：“高价收购实名认证的老微信或QQ号，一个最高1000元，用于企业营销推广。”你盯着自己那个闲置的老号，动了卖号换零花的念头。',
        options: [
            { text: '将自己不常用的旧微信号出售给对方', effect: { money: 1000, alertness: -30, anxiety: 40 }, log: '出售的微信号被电诈团伙用于违法犯罪，自己面临公安机关追责。', isCorrect: false, danger: 'high', tip: '❌ 违法！买卖社交账号实为帮助电信网络诈骗提供工具，触犯刑法！' },
            { text: '无视小广告，保护个人账户安全', effect: { alertness: 20 }, log: '拒绝买卖个人社交账号。', isCorrect: true, danger: 'safe', tip: '✅ 正确！个人社交账号严禁买卖出借。' }
        ]
    },
    {
        id: 's_48', category: '论文查重', title: '【学术陷阱】“极速免费论文查重与降重系统”',
        desc: '网上搜索到一家宣称“限时免费论文查重”的网站，提示只需上传完整的毕业论文Word文档即可获取详细报告。你为省下那笔查重费，准备上传全文。',
        options: [
            { text: '直接将毕业论文全文上传至该免费网站', effect: { gpa: -0.3, alertness: -10, anxiety: 30 }, log: '论文惨遭恶意盗卖，导致毕业查重时严重重合无法通过。', isCorrect: false, danger: 'high', tip: '❌ 不正规的免费查重网站极易窃取并倒卖你的毕业论文！' },
            { text: '使用学校官方指定的知网或万方查重系统', effect: { gpa: +0.1, alertness: 15 }, log: '使用学校官方认可的查重平台。', isCorrect: true, danger: 'safe', tip: '✅ 正确！论文查重认准学校官方指定渠道。' }
        ]
    },
    {
        id: 's_49', category: '外币兑换', title: '【私下换汇】“留学生群里的超优惠私下换汇”',
        desc: '校园论坛留学版块有人发帖：“因出国旅游急需人民币，手头有大量外汇，按远低于银行的汇率私下转账互换。”汇率低得诱人，正打算换汇的你有些心动。',
        options: [
            { text: '私下转账人民币给对方企图换汇', effect: { money: -2000, anxiety: 40 }, log: '收到来路不明的黑钱导致银行卡被冻结，遭遇换汇诈骗。', isCorrect: false, danger: 'high', tip: '❌ 私下换汇不仅极易遭遇诈骗，更涉嫌参与地下钱庄非法买卖外汇！' },
            { text: '通过正规商业银行合法渠道办理外汇业务', effect: { alertness: 15 }, log: '拒绝私下换汇，选择银行正规渠道。', isCorrect: true, danger: 'safe', tip: '✅ 正确！外汇兑换必须通过合规金融机构办理。' }
        ]
    },
    {
        id: 's_50', category: '套现诈骗', title: '【资金周转】“花呗/信用卡极速低息提现”',
        desc: '社交平台上看到：“专业提供花呗、信用卡额度快速提现服务，手续费全网最低，秒到账。”囊中羞涩的你，想着套点现救急，点开了对方的私信。',
        options: [
            { text: '联系对方按照指引进行扫码套现', effect: { money: -1000, anxiety: 30 }, log: '扫码付款后遭遇对方直接拉黑，钱没提出来反被骗光。', isCorrect: false, danger: 'high', tip: '❌ 套现本身属于违法违规行为，以套现为名的诈骗更是陷阱重重！' },
            { text: '拒绝违规套现，合理规划日常财务', effect: { alertness: 15 }, log: '拒绝违规套现诱惑。', isCorrect: true, danger: 'safe', tip: '✅ 正确！合理消费，远离违法违规金融借贷。' }
        ]
    },
    {
        id: 's_51', category: '取消会员', title: '【会员注销】平台客服来电“误开年度会员自动扣费”',
        desc: '接到自称某视频平台客服的来电：“因系统操作失误，为您误开通了年度大会员，每月将自动扣费288元，请您按指引下载会议软件进行注销操作。”你翻了翻账单，似乎从没开过这个会员。',
        options: [
            { text: '按客服指引下载软件并开启屏幕共享操作', effect: { money: -1500, anxiety: 35 }, log: '开启屏幕共享泄露验证码，存款被洗劫一空。', isCorrect: false, danger: 'high', tip: '❌ “误开会员要扣费”是取消会员诈骗的经典话术！' },
            { text: '直接挂断，登录官方App查询会员状态', effect: { alertness: 15 }, log: '识破取消会员诈骗套路。', isCorrect: true, danger: 'safe', tip: '✅ 正确！是否开通会员以官方App显示为准。' }
        ]
    },
    {
        id: 's_52', category: '到付诈骗', title: '【到付包裹】陌生包裹“货到付款”签收',
        desc: '快递员送来一个到付包裹，寄件人不明，声称是“中奖赠品”，需支付28元到付邮费才能签收。你明明没买过东西，却好奇这到底是哪个“抽奖”中的奖。',
        options: [
            { text: '支付到付邮费签收陌生包裹', effect: { money: -28, anxiety: 5 }, log: '签收后发现是劣质无用的小商品。', isCorrect: false, danger: 'high', tip: '❌ 不明来路的到付包裹多为“盲发”骗局！' },
            { text: '核对购物记录后果断拒收', effect: { alertness: 10 }, log: '拒收不明到付包裹。', isCorrect: true, danger: 'safe', tip: '✅ 正确！没买过的东西一律拒收到付。' }
        ]
    },
    {
        id: 's_53', category: '中奖诈骗', title: '【幸运中奖】“知名综艺场外幸运观众”中奖通知',
        desc: '收到短信：“恭喜您被《XX综艺》抽为场外幸运观众，中得旗舰手机一台，领取需先缴纳888元个人所得税。”你明明从没看过那档节目，却还是点开了链接。',
        options: [
            { text: '按指引缴纳“个人所得税”领奖', effect: { money: -888, anxiety: 25 }, log: '缴纳“税费”后对方失联，奖品子虚乌有。', isCorrect: false, danger: 'high', tip: '❌ 中奖先交税或手续费的100%是诈骗！' },
            { text: '不予理会，直接删除短信', effect: { alertness: 10 }, log: '识破中奖交税骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！正规中奖无需预先缴纳任何费用。' }
        ]
    },
    {
        id: 's_54', category: '游戏钓鱼', title: '【游戏福利】“免费领取限定皮肤”钓鱼链接',
        desc: '游戏好友突然发来一条链接：“官方周年庆免费领传说皮肤，数量有限，输入账号密码即可领取。”你正缺那款皮肤，想都没想就点了进去。',
        options: [
            { text: '点击链接输入游戏账号密码领取', effect: { money: -500, anxiety: 20 }, log: '点击钓鱼链接账号被盗，绑定财产被洗劫。', isCorrect: false, danger: 'high', tip: '❌ 免费领皮肤绝不会索要账号密码！' },
            { text: '不予点击，向官方客服核实活动真伪', effect: { alertness: 10 }, log: '识破游戏皮肤钓鱼链接。', isCorrect: true, danger: 'safe', tip: '✅ 正确！领取游戏福利认准游戏内官方活动入口。' }
        ]
    },
    {
        id: 's_55', category: '伪造众筹', title: '【爱心捐款】“同学大病众筹”伪造求助链接',
        desc: '朋友圈刷到一条“同学突发重病急需救命钱”的众筹链接，转发者却是许久未联系的陌生人。你心头一紧，想起那位同学前阵子确实身体不太好。',
        options: [
            { text: '未核实就点击链接捐出200元', effect: { money: -200, anxiety: 10 }, log: '捐给了伪造众筹的诈骗团伙。', isCorrect: false, danger: 'high', tip: '❌ 不法分子常盗用患者信息伪造众筹链接骗捐！' },
            { text: '先向同学或学校核实求助真实性', effect: { alertness: 10 }, log: '识破伪造众筹骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！捐款前务必核实求助信息真伪。' }
        ]
    },
    {
        id: 's_56', category: '低价充值', title: '【话费充值】“全网最低价充话费”第三方店铺',
        desc: '某平台小店铺打出“话费100元仅售50元，官方渠道直充秒到账”的诱人广告。你一看便宜一半，毫不犹豫拍下了链接。',
        options: [
            { text: '拍下50元的话费充值链接', effect: { money: -50, anxiety: 10 }, log: '付款后店铺关店跑路，话费分文未到。', isCorrect: false, danger: 'high', tip: '❌ 明显低于市场价的话费充值多为洗钱或诈骗资金！' },
            { text: '只在运营商官方App或正规渠道充值', effect: { alertness: 10 }, log: '选择官方渠道充值话费。', isCorrect: true, danger: 'safe', tip: '✅ 正确！充值务必认准官方渠道。' }
        ]
    },
    {
        id: 's_57', category: '虚假投资', title: '【高息理财】“稳赚不赔”的陌生投资APP',
        desc: '陌生网友推荐一款“日息1%”的理财APP，还不断展示自己每天躺赚的收益截图。你看着那串上涨的数字，心里有些痒。',
        options: [
            { text: '下载APP并充值5000元试水', effect: { money: -5000, anxiety: 50 }, log: 'APP后台操控，充进去的钱根本无法提现。', isCorrect: false, danger: 'high', tip: '❌ 收益远超正常的理财全是资金盘陷阱！' },
            { text: '拒绝下载，提醒对方警惕资金盘', effect: { alertness: 20 }, log: '识破虚假投资APP骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！投资理财必须通过持牌正规金融机构。' }
        ]
    },
    {
        id: 's_58', category: '冒充银行', title: '【银行客服】“信用卡逾期影响征信”恐吓来电',
        desc: '接到自称银行客服的电话：“您名下的信用卡已逾期未还，将被拉入征信黑名单，需立即将欠款转入指定还款账户。”对方报出的卡号后四位分毫不差，让你心头一紧。',
        options: [
            { text: '因害怕征信受损，向指定账户转账', effect: { money: -2000, anxiety: 40 }, log: '被冒充银行客服诈骗，资金转入骗子账户。', isCorrect: false, danger: 'high', tip: '❌ 银行绝不会让客户向个人或不明账户转账还款！' },
            { text: '挂断后拨打银行官方客服电话核实', effect: { alertness: 15 }, log: '识破冒充银行客服诈骗。', isCorrect: true, danger: 'safe', tip: '✅ 正确！涉及还款转账务必走官方渠道核实。' }
        ]
    },
    {
        id: 's_59', category: '征信修复', title: '【征信修复】“花钱消除不良征信记录”',
        desc: '因曾有信用卡逾期记录，你在网上搜到一家“专业征信修复机构”，声称只需3000元就能抹除征信不良记录。你正为这抹黑历史发愁，差点就信了。',
        options: [
            { text: '交3000元委托其“修复征信”', effect: { money: -3000, anxiety: 40 }, log: '被骗走“修复费”，征信记录纹丝未动。', isCorrect: false, danger: 'high', tip: '❌ 个人征信由央行统一管理，任何个人和机构都无法“修复删除”！' },
            { text: '拒绝，通过正规途径逐步维护信用', effect: { alertness: 15 }, log: '识破征信修复骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！维护征信唯有按时还款、积累良好记录。' }
        ]
    },
    {
        id: 's_60', category: '红包返利', title: '【红包返利】“转发链接领88元红包”',
        desc: '某微信群群主发布：“转发本链接到5个群，截图即可领取88元现金红包，秒到账。”你看着群里的抢红包接龙，手痒想试一试。',
        options: [
            { text: '疯狂转发链接并截图领红包', effect: { social: -5, alertness: -10 }, log: '链接实为恶意营销，还泄露了个人社交关系链。', isCorrect: false, danger: 'high', tip: '❌ 转发返利红包多为诱导传播与信息收集陷阱！' },
            { text: '识破诱导传播套路，退出群聊', effect: { alertness: 10 }, log: '拒绝转发返利诱导。', isCorrect: true, danger: 'safe', tip: '✅ 正确！不帮骗子做免费推广。' }
        ]
    },
    {
        id: 's_61', category: '模特兼职', title: '【模特兼职】“高薪平面模特需先拍模卡”',
        desc: '自称摄影机构联系你：“你形象气质出众，可签约做平面模特，月入过万。但需先花1500元拍摄个人模卡资料。”你对着镜子打量自己，有些跃跃欲试。',
        options: [
            { text: '交1500元拍摄所谓“模卡”', effect: { money: -1500, anxiety: 30 }, log: '拍完模卡后机构再无音讯，工作承诺成空。', isCorrect: false, danger: 'high', tip: '❌ 正规模特签约绝不收取“模卡费、包装费”！' },
            { text: '拒绝先收费的签约邀请', effect: { alertness: 15 }, log: '识破模特包装费骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！先交钱后工作的“星探”多是骗局。' }
        ]
    },
    {
        id: 's_62', category: '驾考代考', title: '【驾考捷径】“包过代考驾照”广告',
        desc: '学车群有人私聊你：“科目二三考不过？我们有关系，交2000元包过，车管所内部有人。”正被练车折磨得焦头烂额的你，眼前一亮。',
        options: [
            { text: '交2000元委托“代考包过”', effect: { money: -2000, anxiety: 30 }, log: '交钱后对方失联，还涉嫌考试舞弊风险。', isCorrect: false, danger: 'high', tip: '❌ 驾考代考属违法犯罪，所谓“包过”全是骗局！' },
            { text: '踏实练车，通过正规驾校考试', effect: { alertness: 15 }, log: '拒绝驾考作弊骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！驾驶技能关乎生命安全，务必真才实学。' }
        ]
    },
    {
        id: 's_63', category: '代抢门票', title: '【演唱会代抢】“专业代抢票内部渠道”',
        desc: '明星演唱会开票秒罄，社交平台有人私信：“专业团队代抢票，成功率99%，每张加收200元代抢费。”你盯着那张求而不得的门票，决定试试。',
        options: [
            { text: '转账200元请其代抢门票', effect: { money: -200, anxiety: 15 }, log: '转账后被拉黑，票也没抢到。', isCorrect: false, danger: 'high', tip: '❌ 代抢票多为骗取代抢费的骗局！' },
            { text: '通过官方平台实名购票或候补', effect: { alertness: 10 }, log: '拒绝第三方代抢票。', isCorrect: true, danger: 'safe', tip: '✅ 正确！官方平台实名购票才是正道。' }
        ]
    },
    {
        id: 's_64', category: '二手数码', title: '【二手数码】“九成新”旗舰机低价甩卖',
        desc: '二手平台刷到一台“九成新”旗舰手机，价格远低于市场价，卖家催促“手慢无，先款后货”。你对比了下价格，觉得捡了个大便宜。',
        options: [
            { text: '轻信描述，先款后货买下手机', effect: { money: -1500, anxiety: 25 }, log: '收到翻新故障机，卖家失联维权无门。', isCorrect: false, danger: 'high', tip: '❌ 低价数码多为翻新机、组装机，先款后货风险极高！' },
            { text: '坚持平台担保交易并验货', effect: { alertness: 10 }, log: '坚持验机与平台担保交易。', isCorrect: true, danger: 'safe', tip: '✅ 正确！贵重数码务必验货加平台担保。' }
        ]
    },
    {
        id: 's_65', category: '点赞返利', title: '【点赞返利】“给指定朋友圈点赞立返5元”',
        desc: '兼职群发布任务：“给指定账号朋友圈点赞，每赞返5元，多号操作日入百元，需先交50元入会费。”你心想点赞谁不会，这钱好赚。',
        options: [
            { text: '交50元入会费领取点赞任务', effect: { money: -50, anxiety: 10 }, log: '交费后对方直接解散群聊。', isCorrect: false, danger: 'high', tip: '❌ 先交“入会费”才能接单的兼职全是骗局！' },
            { text: '识破先交费套路，直接退出', effect: { alertness: 10 }, log: '避开点赞返利骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！正规兼职不会先向求职者收费。' }
        ]
    },
    {
        id: 's_66', category: '打赏返利', title: '【直播返利】“为主播打赏获高额返现”',
        desc: '直播间管理员私聊你：“参与平台活动为主播打赏，打赏金额会双倍返现，还有额外抽成奖励。”你正热衷于给喜欢的主播刷礼物，不免多看了两眼。',
        options: [
            { text: '打赏1000元等待双倍返现', effect: { money: -1000, anxiety: 35 }, log: '打赏后返现承诺成空，主播与管理员失联。', isCorrect: false, danger: 'high', tip: '❌ 打赏返利是新型刷单诈骗变种！' },
            { text: '拒绝打赏返利诱惑', effect: { alertness: 15 }, log: '识破直播打赏返利骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！天上不会掉馅饼，理性看待直播打赏。' }
        ]
    },
    {
        id: 's_67', category: '树洞钓鱼', title: '【校园树洞】“匿名表白墙投稿”链接',
        desc: '校园论坛有人发来“匿名表白墙”投稿链接，称点开即可匿名发布告白或吐槽，还能看到别人的秘密。你好奇地想看看大家都偷偷说了些什么。',
        options: [
            { text: '点击链接并授权登录个人信息', effect: { alertness: -10, anxiety: 15 }, log: '恶意链接窃取个人信息，社交账号被控制群发诈骗。', isCorrect: false, danger: 'high', tip: '❌ 陌生链接要求授权登录可能窃取账号信息！' },
            { text: '不予点击，仅使用学校官方平台', effect: { alertness: 10 }, log: '拒绝陌生树洞链接。', isCorrect: true, danger: 'safe', tip: '✅ 正确！网络投稿认准学校官方认证平台。' }
        ]
    },
    {
        id: 's_68', category: '注销贷款', title: '【贷款注销】“校园贷账户需注销”连环诈骗',
        desc: '客服来电：“你大学期间注册过贷款平台账户，根据新规需配合注销，否则影响征信，请将各平台额度清零转入安全账户。”你隐约记得确实注册过这类平台。',
        options: [
            { text: '按指引将平台额度提现转入指定账户', effect: { money: -4000, anxiety: 50 }, log: '陷入“注销校园贷”连环诈骗，背负真实贷款。', isCorrect: false, danger: 'high', tip: '❌ 凡要求“清零额度转账”的注销操作均为诈骗！' },
            { text: '挂断电话，通过官方平台核实', effect: { alertness: 20 }, log: '识破注销校园贷骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！账户注销通过官方客服渠道办理。' }
        ]
    },
    {
        id: 's_69', category: '网赚App', title: '【领红包软件】“签到领红包每天提现”',
        desc: '广告推送一款App：“下载注册即可领88元新人红包，每天签到还能提现，日入百元不是梦。”你看着那88元，顺手就点了下载。',
        options: [
            { text: '下载注册并绑定手机号银行卡', effect: { money: -300, anxiety: 20 }, log: 'App暗藏木马，绑定信息后银行卡被盗刷。', isCorrect: false, danger: 'high', tip: '❌ 宣称“注册领钱、签到提现”的App多含木马与套路！' },
            { text: '不予下载，识别为非法网赚陷阱', effect: { alertness: 10 }, log: '拒绝下载网赚红包App。', isCorrect: true, danger: 'safe', tip: '✅ 正确！远离不明网赚类App。' }
        ]
    },
    {
        id: 's_70', category: '删差评', title: '【差评删除】“有偿删除网店差评”中介',
        desc: '你网购给差评后，有人私信：“我们可帮你删除差评，每条50元，不删退款。”你正嫌那条差评闹心，动了花钱删掉的念头。',
        options: [
            { text: '付50元委托对方删除差评', effect: { money: -50, anxiety: 10 }, log: '付款后对方无法删除，还涉嫌买卖评价违规。', isCorrect: false, danger: 'high', tip: '❌ “有偿删差评”本身就是违规，且多为骗取删评费！' },
            { text: '保留真实评价，通过平台申诉维权', effect: { alertness: 10 }, log: '坚持真实评价，通过正规渠道维权。', isCorrect: true, danger: 'safe', tip: '✅ 正确！评价自由，维权走平台正规流程。' }
        ]
    },
    {
        id: 's_71', category: '学历包过', title: '【学历提升】“专升本包过、快速拿证”',
        desc: '有人在校园里宣传：“专升本、自考本科快速拿证，交6000元包录取包毕业，国家承认学历。”正为学历发愁的你，仿佛抓住了救命稻草。',
        options: [
            { text: '交6000元报名“包过”学历提升', effect: { money: -6000, anxiety: 40 }, log: '机构卷款跑路，学历与证书均成泡影。', isCorrect: false, danger: 'high', tip: '❌ “包过拿证”的学历机构多为骗局，正规学历需通过统一考试！' },
            { text: '通过正规招生渠道了解学历提升政策', effect: { alertness: 15 }, log: '拒绝虚假学历包过诱惑。', isCorrect: true, danger: 'safe', tip: '✅ 正确！学历提升认准正规高校与考试院。' }
        ]
    },
    {
        id: 's_72', category: '账号解绑', title: '【账号解绑】“旧手机号解绑服务”收费',
        desc: '你换了新手机号，旧账号需要解绑，网上有人宣称：“专业解绑各大平台账号，50元一个，快速安全。”你嫌一个个申诉太麻烦，想花点钱省事。',
        options: [
            { text: '付50元并交出账号密码委托解绑', effect: { money: -50, anxiety: 15 }, log: '交出密码后账号被洗劫盗用。', isCorrect: false, danger: 'high', tip: '❌ 把账号密码交给“解绑中介”等于拱手送人！' },
            { text: '自行通过各平台官方申诉解绑', effect: { alertness: 10 }, log: '通过官方申诉渠道完成解绑。', isCorrect: true, danger: 'safe', tip: '✅ 正确！账号解绑认准平台官方申诉入口。' }
        ]
    },
    {
        id: 's_73', category: '续费诈骗', title: '【培训班续费】“课程升级需补交差价”',
        desc: '你在某兴趣班报了课程，突然接到“课程顾问”电话：“机构推出课程升级计划，补交2000元差价可升级为高级班并保就业推荐。”你确实报过这个班，便信了几分。',
        options: [
            { text: '按“顾问”要求补交2000元差价', effect: { money: -2000, anxiety: 30 }, log: '转账后发现该“顾问”为冒充，机构从未有此活动。', isCorrect: false, danger: 'high', tip: '❌ 冒充课程顾问的续费诈骗高发，务必向机构官方核实！' },
            { text: '通过机构官方电话或前台核实', effect: { alertness: 15 }, log: '识破冒充课程顾问的续费骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！涉及续费缴费先向官方渠道确认。' }
        ]
    },
    {
        id: 's_74', category: '盗版资源', title: '【网盘资源】“全网最新课程资源打包出售”',
        desc: '备考中你在某贴吧看到：“全网名师课程、押题资料、绝密笔记，全部打包仅售99元，付款即发网盘链接。”你正愁资料不全，动了买的念头。',
        options: [
            { text: '付款99元购买网盘资源', effect: { money: -99, anxiety: 15 }, log: '付款后对方发来失效链接或垃圾资料，随后失联。', isCorrect: false, danger: 'high', tip: '❌ 盗版资源兜售多为骗局，还涉嫌侵权！' },
            { text: '使用正版教材与正规学习平台', effect: { alertness: 10, gpa: 0.05 }, log: '选择正版资料安心备考。', isCorrect: true, danger: 'safe', tip: '✅ 正确！支持正版，拒绝盗版资源陷阱。' }
        ]
    },
    {
        id: 's_75', category: '冒充客服', title: '【平台客服】“开通卖家需缴保证金”诈骗',
        desc: '你在二手平台首次挂出商品，很快有“平台客服”私信：“新卖家需缴纳500元消费者保障保证金，商品才能正常展示出售。”你刚挂链接，正等着买家上门。',
        options: [
            { text: '按“客服”指引缴纳500元保证金', effect: { money: -500, anxiety: 20 }, log: '向冒充平台客服的骗子缴纳保证金后被拉黑。', isCorrect: false, danger: 'high', tip: '❌ 平台客服绝不会私下要求卖家缴纳保证金！' },
            { text: '通过平台官方帮助中心核实', effect: { alertness: 10 }, log: '识破冒充平台客服的保证金骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！交易与缴费均在官方App内完成。' }
        ]
    },

    // ==================== 【一·续、 深度变体事件】 (76-100) ====================
    {
        id: 's_76', category: '冒充公检法', title: '【通缉令】“检察院”发来的电子逮捕令',
        desc: '一条短信发来：“【人民检察院】你名下银行卡涉嫌跨境洗钱，现依法对你执行逮捕。点击链接查看电子逮捕令，配合缴纳取保候审保证金即可解除。”链接点开，一张盖着红章的“逮捕令”赫然在目，上面还有你的照片。',
        options: [
            { text: '看到“逮捕令”慌了神，按指示缴纳保证金', effect: { money: -5000, anxiety: 55 }, log: '被伪造电子逮捕令诈骗，缴纳所谓“取保候审保证金”。', isCorrect: false, danger: 'high', tip: '❌ 公检法机关绝不会通过短信或链接发送电子逮捕令索要保证金！' },
            { text: '冷静识别伪造文书，拨打96110核实', effect: { alertness: 25 }, log: '识破伪造电子逮捕令骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！所有法律文书均通过正规渠道送达，绝不线上索款。' }
        ]
    },
    {
        id: 's_77', category: '冒充公检法', title: '【安全账户】“公安”要求资金清查',
        desc: '电话那头自称“反诈中心民警”：“你的账户涉嫌为电诈团伙洗钱，为证明清白，请将全部存款转入警方指定‘安全账户’接受审查。”对方语气威严，还准确报出了你的姓名和学校。',
        options: [
            { text: '为自证清白，将存款转入“安全账户”', effect: { money: -4000, anxiety: 50 }, log: '被“安全账户”诈骗，存款全数被卷走。', isCorrect: false, danger: 'high', tip: '❌ 公安机关不存在所谓的“安全账户”，更不会电话办案！' },
            { text: '识破“安全账户”话术，直接挂断并报警', effect: { alertness: 20 }, log: '识破“安全账户”诈骗话术。', isCorrect: true, danger: 'safe', tip: '✅ 正确！凡是要求转入“安全账户”的都是诈骗。' }
        ]
    },
    {
        id: 's_78', category: '冒充银行', title: '【信用卡提额】“银行经理”发来的提额链接',
        desc: '短信提示：“【XX银行】您的信用卡可免费提升至10万元额度，仅需点击链接完善资料并验证一笔流水。”你正愁额度不够用，点进去是个仿得极像的银行页面。',
        options: [
            { text: '点击链接输入卡号、密码和验证码', effect: { money: -3000, anxiety: 35 }, log: '点击钓鱼链接，信用卡被盗刷。', isCorrect: false, danger: 'high', tip: '❌ 银行提额绝不会通过短信链接索取密码和验证码！' },
            { text: '通过银行官方App或柜台办理提额', effect: { alertness: 10 }, log: '通过官方渠道办理业务，避开钓鱼链接。', isCorrect: true, danger: 'safe', tip: '✅ 正确！金融业务一律走官方App或线下网点。' }
        ]
    },
    {
        id: 's_79', category: '征信修复', title: '【征信洗白】“内部渠道修复不良记录”',
        desc: '你因之前的校园贷逾期，征信有了污点。网上有人私信：“专业征信修复，银行内部有人，交3000元就能帮你抹掉所有不良记录，包过。”',
        options: [
            { text: '病急乱投医，交钱“修复征信”', effect: { money: -3000, anxiety: 30 }, log: '被虚假征信修复中介诈骗。', isCorrect: false, danger: 'high', tip: '❌ 征信记录由人民银行统一管理，任何个人都无法“花钱洗白”！' },
            { text: '不信“征信洗白”，依法按时还款养征信', effect: { alertness: 15 }, log: '拒绝征信修复骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！征信修复只有一条路：按时履约、等待不良记录自然消除。' }
        ]
    },
    {
        id: 's_80', category: '注销贷款', title: '【注销校园贷】“客服”催你注销贷款账户',
        desc: '“客服”来电：“你读书期间开通过校园贷账户，现国家要求注销，否则影响征信。请下载会议App，我远程教你操作，并需先清空各平台额度。”',
        options: [
            { text: '听从指引下载App并清空额度“注销”', effect: { money: -6000, anxiety: 45 }, log: '被注销校园贷诈骗，清空的额度被转走。', isCorrect: false, danger: 'high', tip: '❌ 以“注销账户、清空额度”为名的都是诈骗，正规平台不会索要验证码！' },
            { text: '挂断电话，通过官方App自行查询注销', effect: { alertness: 15 }, log: '识破注销贷款诈骗。', isCorrect: true, danger: 'safe', tip: '✅ 正确！注销贷款请直接登录官方平台操作。' }
        ]
    },
    {
        id: 's_81', category: '套现诈骗', title: '【花呗套现】“低手续费”套现骗局',
        desc: '你急需现金，群里有人打广告：“花呗/白条套现，手续费只要5%，秒到账。”你想着应急一下，就联系了对方。',
        options: [
            { text: '转账支付“手续费”让对方套现', effect: { money: -800, anxiety: 25 }, log: '被套现诈骗，手续费打了水漂且被平台风控。', isCorrect: false, danger: 'high', tip: '❌ 所谓“套现”本就违规，且100%是骗局，钱货两空！' },
            { text: '意识到违规风险，放弃套现', effect: { alertness: 10 }, log: '拒绝违规套现。', isCorrect: true, danger: 'safe', tip: '✅ 正确！套现是违规行为，且极易被骗。' }
        ]
    },
    {
        id: 's_82', category: '虚拟货币', title: '【币圈导师】“带你玩转虚拟币暴富”',
        desc: '某“币圈大神”在群里晒出几十倍收益截图，主动加你：“跟着我炒币，内部消息，稳赚。先把钱转到我的私人的USDT钱包，我帮你操作。”',
        options: [
            { text: '被暴富神话吸引，转账跟投', effect: { money: -5000, anxiety: 45 }, log: '被虚拟货币投资诈骗。', isCorrect: false, danger: 'high', tip: '❌ 我国禁止虚拟货币交易，所谓“币圈导师”多是卷款跑路的骗子！' },
            { text: '拒绝参与，并举报该群', effect: { alertness: 20 }, log: '识破虚拟货币骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！远离虚拟货币投机，警惕“暴富”话术。' }
        ]
    },
    {
        id: 's_83', category: '外币兑换', title: '【换汇】留学生群里的“低价换汇”',
        desc: '留学群里有人发消息：“急用人民币，美元汇率比银行低，找我换汇有优惠。”你正好需要一些外汇。',
        options: [
            { text: '贪图汇率优惠，私下转账换汇', effect: { money: -2000, anxiety: 30 }, log: '私下换汇被骗，转账后被拉黑。', isCorrect: false, danger: 'high', tip: '❌ 私下换汇既违法又极易被骗，对方可能还是洗钱团伙！' },
            { text: '走银行正规渠道换汇', effect: { alertness: 10 }, log: '通过正规渠道换汇。', isCorrect: true, danger: 'safe', tip: '✅ 正确！换汇务必通过银行等正规渠道。' }
        ]
    },
    {
        id: 's_84', category: '代抢门票', title: '【代抢】演唱会门票“专业代抢”套路',
        desc: '演唱会票秒光，你在闲鱼看到“专业代抢团队，抢不到全额退款，代抢费200元”。对方信誓旦旦有“内部脚本”。',
        options: [
            { text: '支付200元代抢费', effect: { money: -200, anxiety: 15 }, log: '被代抢票诈骗，钱付了票没抢到。', isCorrect: false, danger: 'high', tip: '❌ 所谓“专业代抢”多是拿钱跑路，或诱导你开启屏幕共享盗刷！' },
            { text: '自己蹲守官方抢票，拒绝代抢', effect: { alertness: 8 }, log: '拒绝代抢，自行抢票。', isCorrect: true, danger: 'safe', tip: '✅ 正确！抢票没有捷径，谨防代抢骗局。' }
        ]
    },
    {
        id: 's_85', category: '驾考代考', title: '【驾考】“包过”代考服务',
        desc: '你科目二屡考不过，贴吧有人私信：“驾考代考，专业枪手，包过拿证，费用2000元。”',
        options: [
            { text: '花钱找代考', effect: { money: -2000, anxiety: 30, gpa: -0.1 }, log: '参与驾考代考，钱被骗且被查处。', isCorrect: false, danger: 'high', tip: '❌ 驾考代考严重违法，一旦查处将面临重罚并禁考！' },
            { text: '拒绝代考，老实练车重考', effect: { alertness: 10 }, log: '拒绝代考，踏实练车。', isCorrect: true, danger: 'safe', tip: '✅ 正确！安全驾驶是底线，考试没有捷径。' }
        ]
    },
    {
        id: 's_86', category: '学历包过', title: '【学历】“包拿”本科文凭速成班',
        desc: '你看到广告：“无需上课，最快6个月拿国家承认本科文凭，包过包拿证。”你正为学历焦虑。',
        options: [
            { text: '交钱报名“速成班”', effect: { money: -4000, anxiety: 35 }, log: '被学历速成班诈骗。', isCorrect: false, danger: 'high', tip: '❌ 正规学历必须通过国家统一考试，不存在“交钱包过”！' },
            { text: '拒绝，选择正规自考或成考', effect: { gpa: 0.05, alertness: 10 }, log: '拒绝学历速成骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！提升学历走正规渠道。' }
        ]
    },
    {
        id: 's_87', category: '考研退费', title: '【考研】“未过线全额退费”协议班',
        desc: '考研机构推销：“签协议，未过线全额退费，先交9800元。”你心动于这个“保底”承诺。',
        options: [
            { text: '签约交费', effect: { money: -9800, anxiety: 30 }, log: '签了退费协议，但机构以各种理由拒绝退款。', isCorrect: false, danger: 'high', tip: '❌ 退费协议陷阱重重，机构往往设置严苛的退费门槛！' },
            { text: '仔细阅读条款，拒绝夸大宣传', effect: { alertness: 15 }, log: '拒绝考研退费协议班。', isCorrect: true, danger: 'safe', tip: '✅ 正确！报班前务必看清退费条款。' }
        ]
    },
    {
        id: 's_88', category: '公考资料', title: '【公考】“内部绝密”真题密卷',
        desc: '有人私信你：“公考内部渠道，命题人泄露的绝密真题，押题率90%，一份800元。”',
        options: [
            { text: '花800元买“绝密真题”', effect: { money: -800, anxiety: 20 }, log: '买到拼凑的假题，被骗。', isCorrect: false, danger: 'high', tip: '❌ 公考命题绝对保密，所谓“绝密真题”全是骗局！' },
            { text: '不信谣言，踏实刷官方真题', effect: { gpa: 0.05, alertness: 10 }, log: '拒绝公考假题。', isCorrect: true, danger: 'safe', tip: '✅ 正确！备考靠实力，官方真题才靠谱。' }
        ]
    },
    {
        id: 's_89', category: '模特兼职', title: '【模特】“高薪模特”需先交模卡费',
        desc: '你被自称星探的人搭讪，夸你形象好，邀你做兼职模特，日薪上千。但对方说“要先拍一套模卡，费用1980元”。',
        options: [
            { text: '为抓住机会，交钱拍模卡', effect: { money: -1980, anxiety: 25 }, log: '被模特模卡费诈骗。', isCorrect: false, danger: 'high', tip: '❌ 正规经纪公司不会让新人先交高昂的“模卡费”！' },
            { text: '拒绝交费，警惕星探套路', effect: { alertness: 15 }, log: '识破模特兼职骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！警惕以“高薪”为诱饵的收费套路。' }
        ]
    },
    {
        id: 's_90', category: '网赚App', title: '【挂机赚钱】“下载App挂机日赚百元”',
        desc: '广告弹窗：“下载这款App，手机挂机自动赚钱，日赚100-300元，提现秒到账。”你抱着试试看的心态下载了。',
        options: [
            { text: '充值“激活会员”解锁提现', effect: { money: -500, anxiety: 20 }, log: '被挂机赚钱App诈骗。', isCorrect: false, danger: 'high', tip: '❌ 挂机赚钱App多为套路，充值后永远无法提现！' },
            { text: '识破套路，卸载App', effect: { alertness: 10 }, log: '识破挂机赚钱骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！天上不会掉馅饼，挂机赚钱多是骗局。' }
        ]
    },
    {
        id: 's_91', category: '点赞返利', title: '【点赞返佣】“点赞关注日结”刷单群',
        desc: '你被拉进一个“点赞返佣群”，群里说：“给指定视频点赞+关注，截图返2元，动动手指日赚几十。”',
        options: [
            { text: '先做小单尝甜头，再垫付大单', effect: { money: -2000, anxiety: 35 }, log: '被点赞返利刷单诈骗。', isCorrect: false, danger: 'high', tip: '❌ 点赞返利是刷单诈骗的引流入口，后续必有大额垫付陷阱！' },
            { text: '见好就收，及时退出并举报', effect: { alertness: 15 }, log: '识破点赞返利套路。', isCorrect: true, danger: 'safe', tip: '✅ 正确！任何刷单点赞返利都涉嫌诈骗。' }
        ]
    },
    {
        id: 's_92', category: '打赏返利', title: '【直播打赏】“打赏返现十倍”骗局',
        desc: '直播间里主播喊话：“今天回馈粉丝，打赏100返1000，截图联系客服秒返！”弹幕里一片“已到账”。',
        options: [
            { text: '为赚返现，打赏刷礼物', effect: { money: -1500, anxiety: 30 }, log: '被直播打赏返利诈骗。', isCorrect: false, danger: 'high', tip: '❌ “打赏返现”是典型的诈骗话术，弹幕“已到账”全是托！' },
            { text: '识破“返现”噱头，拒绝打赏', effect: { alertness: 15 }, log: '识破打赏返利骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！理性消费，警惕返现噱头。' }
        ]
    },
    {
        id: 's_93', category: '红包返利', title: '【红包返利】“发红包返双倍”套路',
        desc: '群里有人发：“新年福利，发66返188，发188返888，仅限今日。”还附上一张张“返现到账”截图。',
        options: [
            { text: '抱着侥幸发红包参与', effect: { money: -500, anxiety: 20 }, log: '被红包返利诈骗。', isCorrect: false, danger: 'high', tip: '❌ “发红包返双倍”是经典诈骗，返现截图全是P的！' },
            { text: '识破套路，退群举报', effect: { alertness: 10 }, log: '识破红包返利骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！天上不会掉红包。' }
        ]
    },
    {
        id: 's_94', category: '卡牌抽奖', title: '【盲盒】“保底必出隐藏款”抽奖',
        desc: '你在某小程序看到“盲盒抽奖，保底必出隐藏款，抽中高价回收”。你抽了几次都出普通款，客服说“再抽几次就必出了”。',
        options: [
            { text: '上头继续充钱抽', effect: { money: -1500, anxiety: 25 }, log: '被盲盒抽奖套路诱导过度消费。', isCorrect: false, danger: 'high', tip: '❌ 盲盒“保底必出”是诱导消费陷阱，隐藏款概率极低！' },
            { text: '及时止损，停止充值', effect: { alertness: 10 }, log: '及时止损停止抽奖。', isCorrect: true, danger: 'safe', tip: '✅ 正确！理性消费，警惕博彩式抽奖。' }
        ]
    },
    {
        id: 's_95', category: '到付诈骗', title: '【到付件】“免费试用”到付包裹',
        desc: '快递员送来一个到付包裹，显示“某品牌免费试用装，货到付款39元”。你隐约记得自己没买过。',
        options: [
            { text: '没多想，付39元签收', effect: { money: -39, anxiety: 5 }, log: '收到到付垃圾包裹，被赚取到付费。', isCorrect: false, danger: 'high', tip: '❌ 这是“盲发快递”到付诈骗，里面往往是几块钱的劣质品！' },
            { text: '核实自己没买过，拒收', effect: { alertness: 8 }, log: '拒收到付诈骗包裹。', isCorrect: true, danger: 'safe', tip: '✅ 正确！不明到付包裹坚决拒收。' }
        ]
    },
    {
        id: 's_96', category: '软件代下', title: '【代下载】付费文档/软件“低价代下”',
        desc: '你需要某平台一个付费文档，有人私信：“代下载，原价30我只收5元，先付款后给链接。”',
        options: [
            { text: '贪便宜，先转账5元', effect: { money: -5, anxiety: 5 }, log: '代下载转账后被拉黑。', isCorrect: false, danger: 'high', tip: '❌ 私下代下载多为骗局，还可能夹带病毒！' },
            { text: '自己开通会员或走正规渠道', effect: { alertness: 5 }, log: '拒绝代下载，走正规渠道。', isCorrect: true, danger: 'safe', tip: '✅ 正确！支持正版，谨防代下陷阱。' }
        ]
    },
    {
        id: 's_97', category: '删差评', title: '【删差评】“花钱删掉你的差评”反向勒索',
        desc: '你给一家店打了差评，结果有人联系你：“想删差评吗？交200元我帮你处理，否则就把你的个人信息曝光。”',
        options: [
            { text: '害怕曝光，交钱息事宁人', effect: { money: -200, anxiety: 20 }, log: '被删差评敲诈。', isCorrect: false, danger: 'high', tip: '❌ 这是变相敲诈，一旦妥协只会被反复勒索！' },
            { text: '坚决不妥协，保留证据举报', effect: { alertness: 15 }, log: '拒绝删差评敲诈。', isCorrect: true, danger: 'safe', tip: '✅ 正确！遇到敲诈坚决不转账，及时举报。' }
        ]
    },
    {
        id: 's_98', category: '宠物诈骗', title: '【领养】“免费领养名贵宠物”需付运费',
        desc: '你在网上看到“免费领养布偶猫”，对方说只要付200元“疫苗费”和300元“运费”就能寄给你。',
        options: [
            { text: '为领养猫咪，转账疫苗费和运费', effect: { money: -500, anxiety: 15 }, log: '被免费领养宠物诈骗。', isCorrect: false, danger: 'high', tip: '❌ “免费领养”让你付运费、疫苗费的多是骗局，根本没有猫！' },
            { text: '要求视频看猫或线下交接', effect: { alertness: 10 }, log: '识破领养骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！领养宠物务必实地核验，谨防诈骗。' }
        ]
    },
    {
        id: 's_99', category: '明星粉丝', title: '【粉丝团】“明星见面会门票”黄牛溢价',
        desc: '偶像要来开见面会，票被黄牛炒到天价。一个“粉丝团团长”私信你：“内部团购价，比黄牛便宜，先转定金200元占座。”',
        options: [
            { text: '转账定金，加入“内部团购”', effect: { money: -200, anxiety: 10 }, log: '被粉丝团购票诈骗。', isCorrect: false, danger: 'high', tip: '❌ 粉丝圈“内部票”多为骗子伪装，转账后立刻失联！' },
            { text: '只在官方票务平台购票', effect: { alertness: 10 }, log: '拒绝粉丝内部票。', isCorrect: true, danger: 'safe', tip: '✅ 正确！追星也要理性，认准官方渠道。' }
        ]
    },
    {
        id: 's_100', category: '二手数码', title: '【二手数码】“九成新”翻新机当新机卖',
        desc: '你在二手平台看中一台“几乎全新”的旗舰手机，价格诱人。卖家坚持私下交易，还发来“专柜小票”。',
        options: [
            { text: '私下转账交易', effect: { money: -3000, anxiety: 25 }, log: '买到翻新机或直接被骗。', isCorrect: false, danger: 'high', tip: '❌ 私下交易数码产品极易买到翻新机或钱货两空！' },
            { text: '坚持走平台验机宝等担保交易', effect: { alertness: 12 }, log: '走担保平台交易。', isCorrect: true, danger: 'safe', tip: '✅ 正确！二手数码务必走平台验机，确认无误再收货。' }
        ]
    },

    // ==================== 【二、 日常生活与正规校园事件】 (76-100) ====================
    {
        id: 'n_01', category: '正规兼职', title: '【勤工俭学】社区中心的小学数学家教',
        desc: '学校勤工俭学中心发布正规岗位：社区周末小学辅导员，每周工作6小时，月薪800元，由学校统一审核对接。比起校外来路不明的兼职，这份工作让人格外安心。',
        options: [
            { text: '申请应聘并认真完成家教工作', effect: { money: 800, gpa: 0.1, social: 5 }, log: '通过学校勤工俭学担任家教，获得正规收入。', isCorrect: true, danger: 'safe', tip: '✅ 正规兼职安全且能锻炼能力。' },
            { text: '嫌工资太少，放弃不干', effect: {}, log: '放弃了社区家教兼职。', isCorrect: true, danger: 'low', tip: '⚠️ 合法开源是缓解经济压力的好方法。' }
        ]
    },
    {
        id: 'n_02', category: '学业奖励', title: '【学业竞争】国家励志奖学金评选',
        desc: '因你平时成绩优异，辅导员通知你本学期有资格竞争国家励志奖学金（5000元）。这笔钱足以覆盖大半年的生活费，你开始认真整理起参评材料。',
        options: [
            { text: '积极准备材料并成功参评', effect: { money: 5000, gpa: 0.2, social: 5 }, log: '获得国家励志奖学金，生活得到改善。', isCorrect: true, danger: 'safe', tip: '✅ 努力学习能获得丰厚奖学金。' },
            { text: '懒得整理材料，主动放弃', effect: {}, log: '错失了一次奖学金机会。', isCorrect: true, danger: 'low', tip: '⚠️ 抓住每一次正规改变生活条件的机会。' }
        ]
    },
    {
        id: 'n_03', category: '校园生活', title: '【期末复习】图书馆的通宵奋战',
        desc: '期末考试周来临，面对厚厚的专业书，你感到有些焦虑，GPA面临下滑。图书馆的灯光彻夜通明，空气里都是翻书与咖啡的味道。',
        options: [
            { text: '去图书馆连续通宵复习，努力刷GPA', effect: { gpa: +0.2, anxiety: +15 }, log: '期末努力复习，GPA显著提升。', isCorrect: true, danger: 'safe', tip: '✅ 踏实学习是提升学业的唯一正道。' },
            { text: '买网上号称“稳过”的付费内部真题', effect: { money: -100, gpa: -0.1 }, log: '买虚假真题被骗，考试未见起色。', isCorrect: false, danger: 'high', tip: '❌ 警惕网上“买答案”骗局，违纪且是诈骗。' }
        ]
    },
    {
        id: 'n_04', category: '校园社交', title: '【社团纳新】校学生会部门招新',
        desc: '百团大战期间，校学生会宣传部向你抛出橄榄枝，邀请你加入并担任干事。你想起自己一直想锻炼下组织和表达能力。',
        options: [
            { text: '加入学生会，积极参与校园活动', effect: { social: +15, gpa: -0.05 }, log: '加入了学生会，人际圈子明显扩大。', isCorrect: true, danger: 'safe', tip: '✅ 适度社交有助于提升综合素质。' },
            { text: '婉言谢绝，想把时间留给个人学习', effect: { gpa: +0.1, social: -5 }, log: '拒绝加入社团，专注于个人学业。', isCorrect: true, danger: 'safe', tip: '✅ 明确自身目标同样难能可贵。' }
        ]
    },
    {
        id: 'n_05', category: '日常娱乐', title: '【周末出行】室友邀约周末周边游',
        desc: '室友周末计划一起去市区博物馆和商场游玩，预算大概需要150元。连日的紧绷学习让你也渴望出门透透气。',
        options: [
            { text: '欣然前往，享受大学青春生活', effect: { money: -150, social: +10, anxiety: -10 }, log: '与室友周末出游，放松了心情。', isCorrect: true, danger: 'safe', tip: '✅ 劳逸结合有助于保持心理健康。' },
            { text: '选择留在宿舍省钱自习', effect: { money: 0, gpa: +0.05, social: -5 }, log: '周末留校自习，省下了出行开销。', isCorrect: true, danger: 'safe', tip: '✅ 勤俭节约也是良好的生活习惯。' }
        ]
    },
    {
        id: 'n_06', category: '身体健康', title: '【换季流感】宿舍集体感冒风波',
        desc: '气温骤降，宿舍几位室友相继感冒发烧，你感觉咽喉也有些疼痛，身体发沉。窗外的风刮得正紧，你裹紧了被子。',
        options: [
            { text: '及时去校医院就医并遵医嘱吃药休息', effect: { money: -50, anxiety: -5 }, log: '及时就医治疗流感，身体迅速恢复。', isCorrect: true, danger: 'safe', tip: '✅ 身体是革命的本钱，生病切勿硬抗。' },
            { text: '硬扛着不去医院，继续熬夜打游戏', effect: { money: 0, gpa: -0.1, anxiety: +10 }, log: '因延误病情导致感冒加重，军心涣散。', isCorrect: false, danger: 'low', tip: '⚠️ 规律作息与健康管理至关重要。' }
        ]
    },
    {
        id: 'n_07', category: '校园讲座', title: '【讲座旁听】大咖前沿科技讲座',
        desc: '学校大礼堂今晚有一场知名学者的前沿科技与社会发展讲座，但与你的专业课复习时间冲突。海报上那位学者的名字，你曾在期刊上见过。',
        options: [
            { text: '前往大礼堂听讲座，开阔眼界', effect: { alertness: +5, social: +5 }, log: '旁听了一场精彩讲座，收获颇丰。', isCorrect: true, danger: 'safe', tip: '✅ 多听高质量讲座能够拓宽认知边界。' },
            { text: '留在宿舍复习专业课考试', effect: { gpa: +0.1 }, log: '专注复习专业课，巩固了学业基础。', isCorrect: true, danger: 'safe', tip: '✅ 抓紧核心学业同样非常重要。' }
        ]
    },
    {
        id: 'n_08', category: '食堂餐饮', title: '【餐饮体验】食堂新开特色窗口',
        desc: '第一食堂二楼最近新开了一家网红砂锅饭窗口，排队的人络绎不绝，价格略贵（25元/份）。香气顺着走廊飘过来，勾得你直咽口水。',
        options: [
            { text: '尝鲜买了一份砂锅饭，味道确实不错', effect: { money: -25, anxiety: -5 }, log: '品尝了食堂新窗口美食，心情愉悦。', isCorrect: true, danger: 'safe', tip: '✅ 适度享受美食能提升生活幸福感。' },
            { text: '觉得价格偏贵，选择普通窗口经济套餐', effect: { money: -12 }, log: '选择了经济实惠的食堂套餐。', isCorrect: true, danger: 'safe', tip: '✅ 理性消费有助于保持财务健康。' }
        ]
    },
    {
        id: 'n_09', category: '考证考级', title: '【技能提升】英语四六级考试报名',
        desc: '大学英语四六级考试即将开始报名，你需要决定是否趁早报考并购买复习资料。证书对未来的实习和求职都很有分量。',
        options: [
            { text: '果断报名并购买正版真题开始刷题', effect: { money: -80, gpa: +0.1 }, log: '报名四六级并开始认真备考。', isCorrect: true, danger: 'safe', tip: '✅ 尽早通过英语等级考试对未来发展很有帮助。' },
            { text: '觉得还早，选择这次先放弃报考', effect: {}, log: '错失了一次英语考级机会。', isCorrect: true, danger: 'low', tip: '⚠️ 尽早规划各类证书拿证时间。' }
        ]
    },
    {
        id: 'n_10', category: '评优评奖', title: '【班级评优】年度三好学生答辩',
        desc: '辅导员通知班级有名额推荐校级“三好学生”，需要上台进行三分钟个人风采展示。你心里既想争取，又有些怯场。',
        options: [
            { text: '精心准备PPT勇敢上台答辩', effect: { social: +10, gpa: +0.1, money: 200 }, log: '成功评选为校三好学生并获得奖学金。', isCorrect: true, danger: 'safe', tip: '✅ 敢于展现自我能收获更多荣誉与成长。' },
            { text: '性格内向，选择默默放弃机会', effect: {}, log: '放弃了三好学生评选答辩。', isCorrect: true, danger: 'low', tip: '⚠️ 勇敢迈出舒适区才能遇见更好的自己。' }
        ]
    },
    {
        id: 'n_11', category: '正规兼职', title: '【校园招聘】图书馆学生助理招聘',
        desc: '图书馆招募整理图书的学生助理，每周协助工作4小时，月补贴400元，由馆里统一排班。环境安静，还能顺手多读几本书。',
        options: [
            { text: '报名应聘并获得助理岗位', effect: { money: 400, gpa: +0.05 }, log: '成为图书馆学生助理，兼顾学习与赚生活费。', isCorrect: true, danger: 'safe', tip: '✅ 校内正规助理岗位安全可靠。' },
            { text: '时间冲突，不参与应聘', effect: {}, log: '未应聘图书馆助理岗位。', isCorrect: true, danger: 'low', tip: '⚠️ 合理规划时间精力。' }
        ]
    },
    {
        id: 'n_12', category: '体育锻炼', title: '【运动健身】夜跑与羽毛球俱乐部',
        desc: '室友邀请你每天晚上一起去操场夜跑3公里，改善久坐体质。晚风拂过操场，一圈跑下来，白天的压力似乎也随汗水流走了。',
        options: [
            { text: '加入夜跑队伍，坚持体育锻炼', effect: { anxiety: -10, gpa: +0.05 }, log: '坚持夜跑健身，精力更加充沛。', isCorrect: true, danger: 'safe', tip: '✅ 坚持运动能有效缓解心理压力。' },
            { text: '回宿舍躺着玩手机放松', effect: { anxiety: +5 }, log: '选择留在宿舍打游戏。', isCorrect: true, danger: 'low', tip: '⚠️ 注意避免沉迷手机缺乏运动。' }
        ]
    },
    {
        id: 'n_13', category: '学科竞赛', title: '【创新创业】全国大学生互联网+大赛',
        desc: '专业老师邀请你加入项目团队，共同参加“互联网+”大学生创新创业大赛。这是一个把课堂知识真正落地的好机会，简历上也能添上浓重一笔。',
        options: [
            { text: '积极加入项目组，承担课题研发', effect: { gpa: +0.2, social: +10 }, log: '参加创新创业大赛，获得了省赛奖项。', isCorrect: true, danger: 'safe', tip: '✅ 参加正规学科竞赛大有裨益。' },
            { text: '觉得太累，婉言谢绝了老师', effect: {}, log: '未参加创新创业竞赛。', isCorrect: true, danger: 'low', tip: '⚠️ 平衡好课业与课外项目。' }
        ]
    },
    {
        id: 'n_14', category: '宿舍生活', title: '【宿舍卫生】每周宿舍大扫除公约',
        desc: '寝室长提议每周五下午进行宿舍大扫除，参与公共区域卫生清理。窗明几净的环境，住着也舒心。',
        options: [
            { text: '积极参与大扫除，打扫干净', effect: { social: +10 }, log: '参与宿舍大扫除，室友关系更融洽。', isCorrect: true, danger: 'safe', tip: '✅ 良好的生活环境有助于身心健康。' },
            { text: '借故溜走，不愿打扫卫生', effect: { social: -10 }, log: '逃避大扫除导致与室友产生摩擦。', isCorrect: false, danger: 'low', tip: '⚠️ 团队合作与集体意识很重要。' }
        ]
    },
    {
        id: 'n_15', category: '志愿服务', title: '【公益活动】校园无偿献血与志愿服务',
        desc: '红十字会献血车进校园，招募义务献血者与现场引导志愿者。白色的车停在梧桐树下，路过的同学三三两两地驻足。',
        options: [
            { text: '报名成为引导志愿者服务同学', effect: { social: +10, alertness: +5 }, log: '参与无偿献血志愿服务，获得荣誉证书。', isCorrect: true, danger: 'safe', tip: '✅ 参与志愿服务彰显社会责任感。' },
            { text: '路过看看，未参与服务', effect: {}, log: '路过公益活动现场。', isCorrect: true, danger: 'low', tip: '⚠️ 量力而行参与公益活动。' }
        ]
    },
    {
        id: 'n_16', category: '生活开销', title: '【购买二手】从毕业学长处买二手自行车',
        desc: '大四学长毕业甩卖自行车，九成新只需80元，方便上课代步。你算了算校门口到教学楼的距离，有辆车确实能省不少脚力。',
        options: [
            { text: '当面验车并买下自行车', effect: { money: -80, anxiety: -5 }, log: '买下学长二手自行车，出行更便利。', isCorrect: true, danger: 'safe', tip: '✅ 校内同城面交二手物品性价比高。' },
            { text: '选择继续步行上课', effect: {}, log: '选择步行出行。', isCorrect: true, danger: 'safe', tip: '✅ 步行也是很好的锻炼方式。' }
        ]
    },
    {
        id: 'n_17', category: '正规兼职', title: '【校外家教】正规家教机构一对一辅导',
        desc: '通过学校认证的正规家教中介接单：初中物理辅导，每小时60元，按次结清。中介资质齐全，家长信息也经过审核，比私下接活踏实得多。',
        options: [
            { text: '面试成功，周末按时去上课', effect: { money: 600, social: +5 }, log: '通过正规家教获得了可观收入。', isCorrect: true, danger: 'safe', tip: '✅ 依靠知识技能合法获取兼职报酬。' },
            { text: '觉得路程较远放弃', effect: {}, log: '放弃了校外家教兼职。', isCorrect: true, danger: 'low', tip: '⚠️ 安全与距离是兼职考量要素。' }
        ]
    },
    {
        id: 'n_18', category: '心理健康', title: '【心理咨询】校心理健康中心开放预约',
        desc: '最近因学业与人际关系感到焦虑不安，看到校心理咨询中心预约告示。你犹豫着，要不要迈出那一步。',
        options: [
            { text: '预约免费心理咨询，进行倾诉引导', effect: { anxiety: -20, alertness: +5 }, log: '接受了校心理咨询，解开了心结。', isCorrect: true, danger: 'safe', tip: '✅ 积极寻求专业心理辅导是明智之举。' },
            { text: '觉得不好意思，独自闷在心里', effect: { anxiety: +10 }, log: '独自承受情绪压力。', isCorrect: false, danger: 'low', tip: '⚠️ 重视心理健康，学会主动求助。' }
        ]
    },
    {
        id: 'n_19', category: '课程学习', title: '【选修课程】通识选修课《网络安全与防范》',
        desc: '学校教务系统开放选课，包含一门热门通识课《网络安全与防范》。课程简介里那些真实的诈骗案例，读来让人后背发凉。',
        options: [
            { text: '选修该课程，认真听讲备考', effect: { alertness: +20, gpa: +0.1 }, log: '修读网络安全课，防范意识大幅提升。', isCorrect: true, danger: 'safe', tip: '✅ 系统学习防范知识最能提升警惕度。' },
            { text: '选修了轻松的影视鉴赏课', effect: { social: +5 }, log: '选修了影视鉴赏课程。', isCorrect: true, danger: 'safe', tip: '✅ 通识课程拓宽知识面。' }
        ]
    },
    {
        id: 'n_20', category: '节日聚餐', title: '【班级活动】中秋节班级联欢晚会',
        desc: '班委会组织中秋晚会，大家AA制买月饼零食聚会，每人需要交20元。月光下，班里许久没聚过的同学都到了。',
        options: [
            { text: '交纳20元并积极参与班级晚会节目', effect: { money: -20, social: +15 }, log: '参加班级中秋晚会，增强了集体凝聚力。', isCorrect: true, danger: 'safe', tip: '✅ 融入集体生活有利于人际交往。' },
            { text: '不参与集体活动，独处宿舍休息', effect: { social: -5 }, log: '未参加班级聚会活动。', isCorrect: true, danger: 'low', tip: '⚠️ 适度社交有利于身心健康。' }
        ]
    },
    {
        id: 'n_21', category: '考研备考', title: '【考研规划】大三考研目标与计划制定',
        desc: '面对就业与升学抉择，你开始制定考研复习计划，购买考研公共课正版教材。书架上的目标院校明信片，是你每天睁眼就能看到的方向。',
        options: [
            { text: '购买200元正版教材开始制定复习计划', effect: { money: -200, gpa: +0.2 }, log: '购买正版考研教材，开启系统备考。', isCorrect: true, danger: 'safe', tip: '✅ 明确未来规划并脚踏实地努力。' },
            { text: '迷茫犹豫，暂不作升学规划', effect: { anxiety: +10 }, log: '对未来毕业规划感到迷茫。', isCorrect: true, danger: 'low', tip: '⚠️ 尽早明确毕业发展方向。' }
        ]
    },
    {
        id: 'n_22', category: '校园安全', title: '【消防演练】宿舍区消防逃生与演练',
        desc: '保卫处在宿舍楼组织消防应急疏散演练，讲解灭火器使用方法。警报响起时，整栋楼的同学都有序地往楼下跑。',
        options: [
            { text: '积极参与演练，掌握灭火器用法', effect: { alertness: +5 }, log: '参与消防演练，掌握了安防技能。', isCorrect: true, danger: 'safe', tip: '✅ 掌握基本安全技能十分实用。' },
            { text: '嫌麻烦留在宿舍不愿下楼', effect: {}, log: '未参与消防演练。', isCorrect: true, danger: 'low', tip: '⚠️ 安全无小事，防患于未然。' }
        ]
    },
    {
        id: 'n_23', category: '技能证书', title: '【计算机二级】全国计算机等级考试备考',
        desc: '计算机二级考试开始报名，报名费80元，需要刷题复习。这张证书在很多单位的招聘要求里都赫然在列。',
        options: [
            { text: '报名并每天抽出半小时刷题', effect: { money: -80, gpa: +0.1 }, log: '报考计算机二级并顺利考取证书。', isCorrect: true, danger: 'safe', tip: '✅ 考取实用技能证书增加履历含金量。' },
            { text: '放弃本次报考', effect: {}, log: '未报考计算机二级。', isCorrect: true, danger: 'low', tip: '⚠️ 规划好考证时间表。' }
        ]
    },
    {
        id: 'n_24', category: '假期出行', title: '【国庆假期】正规票务平台购买高铁票',
        desc: '国庆假期临近，你在铁路12306官方平台抢购买回家的动车票。归心似箭的你，提前设好了好几轮的抢票提醒。',
        options: [
            { text: '通过12306官方App候补抢票', effect: { money: -150 }, log: '通过12306买到假期回家火车票。', isCorrect: true, danger: 'safe', tip: '✅ 购票认准12306官方平台。' },
            { text: '找网上“加速包代抢”私下付款', effect: { money: -200, anxiety: +10 }, log: '购买加速包未抢到票且退款繁琐。', isCorrect: false, danger: 'low', tip: '❌ 官方12306候补比加速包更靠谱安全！' }
        ]
    },
    {
        id: 'n_25', category: '失物招领', title: '【拾金不昧】在教室捡到失主校园卡',
        desc: '在阶梯教室自习时，发现讲台上有一张别人遗忘的校园卡与手机。屏幕还亮着，似乎主人刚离开不久。',
        options: [
            { text: '送交至校保卫处或交还给失主', effect: { social: +10, alertness: +5 }, log: '拾金不昧归还失主物件，受到好评。', isCorrect: true, danger: 'safe', tip: '✅ 传递校园正能量。' },
            { text: '视而不见，直接离开', effect: {}, log: '对捡到物品未作处理。', isCorrect: true, danger: 'low', tip: '⚠️ 互相帮助营造良好校园氛围。' }
        ]
    },

    // ==================== 【AI 诈骗专题】===================
    {
        id: 's_ai1', category: 'AI诈骗', title: '【AI拟声】「表哥」的紧急借钱电话',
        desc: '深夜，你接到「表哥」的电话，声音一模一样：「我出了点事，私了要两万，别告诉我爸妈，先转我！」背景还有嘈杂的人声。你正要转账，突然想起表哥从不在外地——可那声音实在太像了。',
        options: [
            { text: '听到声音就信了，立刻转账两万', effect: { money: -20000, anxiety: 30 }, log: '被 AI 拟声冒充熟人诈骗，损失两万元。', isCorrect: false, danger: 'high', tip: '❌ AI 只需几秒录音就能克隆亲人的声音！涉及钱，必须回拨本人原号码或用其他渠道独立核实。' },
            { text: '先挂断，用微信视频或回拨本人号码确认', effect: { alertness: 15 }, log: '识破 AI 拟声骗局，未转账。', isCorrect: true, danger: 'safe', tip: '✅ 正确！视听证据在 AI 时代不能作为唯一凭证，独立核实才是底线。' }
        ]
    },
    {
        id: 's_ai2', category: 'AI诈骗', title: '【AI换脸】视频里的「闺蜜」求帮忙',
        desc: '好友发来一段视频通话录屏，画面里是闺蜜本人，她说账号被冻结，要你帮忙代收一笔退款再转给她。可通话时她一直以「信号不好」为由拒绝实时对话，只发来文字和录屏。',
        options: [
            { text: '看脸是本人，帮忙代收并转账', effect: { money: -3000, anxiety: 20 }, log: '被 AI 换脸视频冒充好友诈骗。', isCorrect: false, danger: 'high', tip: '❌ AI 换脸能伪造实时视频！凡要求代收、代转、验证码，一律当面或原渠道确认。' },
            { text: '要求实时语音对暗号 / 当面确认', effect: { alertness: 15 }, log: '识破换脸骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！与家人朋友约定只有彼此知道的「暗号」，AI 无法伪造。' }
        ]
    },
    {
        id: 's_ai3', category: 'AI诈骗', title: '【AI伪造公文】「通缉令」要求配合资金清查',
        desc: '你收到一封带「公安局红头文件」的邮件，称你涉嫌洗钱，附件是印着你头像的「通缉令」，要求添加「办案民警」QQ 配合「秘密资金清查」，并威胁「告诉别人就拘捕你」。',
        options: [
            { text: '害怕被抓，按要求转账「清查」', effect: { money: -5000, anxiety: 40 }, log: '被伪造公文与假冒公检法诈骗。', isCorrect: false, danger: 'high', tip: '❌ 公检法绝不会通过电话/网络要求转账，更不会把「通缉令」发给你个人！' },
            { text: '拨打 110 或去就近派出所当面核实', effect: { alertness: 15 }, log: '识破伪造公文骗局。', isCorrect: true, danger: 'safe', tip: '✅ 正确！任何「保密、限时、要钱」的「官方通知」都是诈骗，立即报警核实。' }
        ]
    }
];
