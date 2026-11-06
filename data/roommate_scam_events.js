// ============================================================
//  舍友长线洗脑事件 (RoommateLongScams)
//  设计说明：
//  - 长线事件跨越 2~3 个月，逐步洗脑舍友。
//  - 每个长线骗局按 phase 分阶段：1=征兆 → 2=暴露 → 3=危机。
//  - 玩家需在每个阶段干预；前期不干预，后期挽救难度和代价极高。
//  - 数据结构：
//    {
//      id, title, targetPersonalityWeakness(可选，倾向某性格),
//      phases: {
//        1: { title, desc, options:[{text, intervention?, effect, tip, log, nextPhase}] },
//        2: { ... },
//        3: { ... }
//      }
//    }
//  - 选项带 intervention 标记（shout/empathize/evidence/ally/bait），
//    由引擎结合舍友性格 + 玩家属性判定成功率。
//  - 阶段推进：选「成功干预」→ 长线终结（applySave）；
//              选「放任/失败」→ 进入下一 phase，brainwash 递增。
// ============================================================

export const RoommateLongScams = [
    // ==================== 长线 A：成功学读书会 → 杀猪盘 ====================
    {
        id: 'long_success_1',
        title: '📚 成功学读书会',
        targetWeakness: 'arrogant',   // 偏向「极度自负」舍友
        phases: {
            1: {
                title: '👂 征兆：天天戴耳机听"课"',
                desc: '你发现舍友{name}最近总戴着耳机，对着一门"成功学读书会"的网课入迷，还开始念叨"财富自由""阶层跃迁"。你问{ta}，{ta}神秘兮兮地说"这是个改变命运的机会，你不懂"。',
                options: [
                    { text: '💬 顺着{ta}的话聊，旁敲侧击套出课程细节', intervention: 'empathize', tip: '你先顺着{ta}说，慢慢套出了课程收费和"导师"的信息，心里有了底。', log: '共情套话', effect: { persuasion: 3 } },
                    { text: '🔌 直接说{ta}被洗脑了，让{ta}清醒点', intervention: 'shout', tip: '你劈头盖脸说{ta}被洗脑了，{ta}反而更抵触，觉得你"眼界太低"。', log: '强硬斥责', effect: {} },
                    { text: '🚶 没当回事，随{ta}去', intervention: 'ignore', tip: '你摇摇头走开了。', log: '放任不管', effect: {} }
                ]
            },
            2: {
                title: '💸 暴露：找你借钱投"内部项目"',
                desc: '一个月后，{name}神神秘秘地找你借钱，说要投一个"稳赚不赔的内部项目"，回报率30%。{ta}说"读书会的老师带我们做，名额有限"。',
                options: [
                    { text: '📄 上网找到官方反诈通报，甩给{ta}看', intervention: 'evidence', tip: '你找出好几篇一模一样的杀猪盘通报，{name}盯着屏幕，脸色慢慢变了。', log: '证据派破局', effect: { persuasion: 8 } },
                    { text: '🤝 拉上其他舍友一起劝{ta}', intervention: 'ally', tip: '你们几个一起劝，{name}动摇了，答应先不投。', log: '联合劝说', effect: { social: 5 } },
                    { text: '💬 先共情再引导{ta}算笔账', intervention: 'empathize', tip: '你顺着{ta}说"这机会确实诱人"，再一步步引导{ta}算清"老师"的盈利逻辑漏洞。', log: '共情引导', effect: { persuasion: 5 } },
                    { text: '🚶 拒绝借钱，但也没拦{ta}', intervention: 'ignore', tip: '你没借钱，{name}又找了别人凑钱投了进去。', log: '拒绝借钱但未拦', effect: {} }
                ]
            },
            3: {
                title: '🚨 危机：深陷杀猪盘还想拉人下水',
                desc: '又过了一个月，{name}已经深陷杀猪盘，不仅把钱全投了进去，还想拉另一个舍友也加入。{ta}眼神狂热，口口声声说"这是最后的翻身机会"。',
                options: [
                    { text: '🎣 故意配合骗子，收集证据后报警', intervention: 'bait', tip: '你假装也感兴趣，套取了对方收款账户和话术，随后联合警方一举端掉。{name}虽然损失了钱，但人没彻底沉沦。', log: '钓鱼执法反杀', effect: { persuasion: 15, social: 5 } },
                    { text: '🏫 直接联系辅导员和家长介入', intervention: 'ally', tip: '你果断上报，辅导员和家长赶到，把{name}从悬崖边拉了回来。虽然{ta}有点怨你"多管闲事"，但终究清醒了。', log: '联合家校干预', effect: { social: 5, anxiety: 5 } },
                    { text: '🚶 眼睁睁看{ta}拉别人下水', intervention: 'ignore', tip: '你选择了沉默。最终{name}和那个舍友双双被骗，宿舍彻底崩了。', log: '放任连锁被骗', effect: {} }
                ]
            }
        }
    },

    // ==================== 长线 B：网恋"白富美" → 杀猪盘借钱 ====================
    {
        id: 'long_love_1',
        title: '💞 网恋"白富美"',
        targetWeakness: 'naive',   // 偏向「单纯傻白甜」舍友
        phases: {
            1: {
                title: '👀 征兆：频繁和"网友"聊到深夜',
                desc: '你发现舍友{name}最近天天抱着手机和一个"同城网友"聊到深夜，对方头像是个气质美女/帅哥，说话温柔体贴。{name}说"我们特别聊得来"。',
                options: [
                    { text: '💬 笑着打趣，顺便提醒"网上要多留个心眼"', intervention: 'empathize', tip: '你半开玩笑地提醒了{ta}，{name}笑着说"知道了"，但明显没往心里去。', log: '温和提醒', effect: { social: 3 } },
                    { text: '📄 给{ta}看"杀猪盘"的真实案例', intervention: 'evidence', tip: '你找了几个网恋杀猪盘的新闻给{ta}看，{name}皱着眉，说"应该不会吧"。', log: '证据提醒', effect: { persuasion: 3 } },
                    { text: '🚶 没在意', intervention: 'ignore', tip: '你觉得就是普通网恋，没多想。', log: '未在意', effect: {} }
                ]
            },
            2: {
                title: '💸 暴露：对方开始"借钱"或"带你投资"',
                desc: '过了一个月，{name}跟你说，那个"网友"最近家里出事了，急需周转，或者推荐了一个"稳赚"的平台。{ta}有点动摇，问你该怎么办。',
                options: [
                    { text: '📄 指出"网恋+借钱=杀猪盘"铁律', intervention: 'evidence', tip: '你斩钉截铁地告诉{ta}这就是杀猪盘标准套路，{name}半信半疑，但暂时没转钱。', log: '证据派点破', effect: { persuasion: 8 } },
                    { text: '💬 共情：先理解{ta}的感情，再劝{ta}核实对方身份', intervention: 'empathize', tip: '你表示理解{ta}的感情，然后提议一起查证对方的真实身份，{name}答应了。', log: '共情并核实', effect: { social: 5, persuasion: 5 } },
                    { text: '🔌 骂{ta}"恋爱脑"，让{ta}立刻断联', intervention: 'shout', tip: '你劈头盖脸骂{ta}恋爱脑，{name}又气又委屈，反而更想证明"对方是真心的"。', log: '强硬斥责', effect: {} },
                    { text: '🚶 不关我事', intervention: 'ignore', tip: '你摆摆手，让{ta}自己决定。', log: '放任', effect: {} }
                ]
            },
            3: {
                title: '🚨 危机：准备把生活费全转给对方',
                desc: '又过了一个月，{name}已经彻底上头，准备把生活费甚至网贷的钱都转给那个"网友"。{ta}红着眼说"对方不会骗我的"。',
                options: [
                    { text: '🎣 陪{ta}演，套出对方账户后报警', intervention: 'bait', tip: '你假装支持{ta}，套出了对方的收款信息，然后果断报警，帮{name}保住了大部分钱。', log: '钓鱼执法反杀', effect: { persuasion: 15, social: 5 } },
                    { text: '🏫 联系辅导员和家长紧急介入', intervention: 'ally', tip: '你紧急联系了辅导员和家长，三方合力把{name}从泥潭里拽了出来。', log: '联合家校干预', effect: { social: 5, anxiety: 5 } },
                    { text: '🚶 看着{ta}转账', intervention: 'ignore', tip: '你没有拦住，{name}把辛苦攒的钱全转了出去，人财两空。', log: '放任被骗', effect: {} }
                ]
            }
        }
    }
];
