import { GameState } from './state.js';
import { MassiveScamPool } from '../../data/scam_pool_100.js';
import { StageEvents } from '../../data/stage_events.js';
import { RoommateInteractions, RoommateJudgeEvents, RoommateMultiEvents } from '../../data/roommate_interactions.js';
import { RoommateDaily } from '../../data/roommate_daily.js';
import { RoommateLongScams } from '../../data/roommate_scam_events.js';
import { StoryChapters } from '../../data/story_chapters.js';
import { GrindStories } from '../../data/grind_stories.js';
import { RoommateManager } from './roommate_manager.js';

export const EventEngine = {

    buildRoommateDesc(ev, target) {
        const name = target.name;
        const base = ev.desc || '';
        const ta = target.gender === '女' ? '她' : '他';
        return `你注意到舍友${name}最近有点不对劲：${base}（现在，骗局正瞄向你的舍友，你的每个决定都关乎${ta}的钱袋。）`;
    },

    /**
     * ✅ 生成「多元化干预选项」（五派）
     * 1. 强硬派 shout：必定暂时阻止，信任大降，可能偷偷继续
     * 2. 共情派 empathize：需 trust > 60，高成功率
     * 3. 证据派 evidence：依赖 persuasion
     * 4. 联合派 ally：拉舍友/辅导员，必定成功但影响氛围
     * 5. 钓鱼执法 bait：高风险高回报，可能暂时损失资金
     * 6. 冷眼旁观 ignore
     */
    buildInterventionOptions(ev, target) {
        const name = target.name;
        const ta = target.gender === '女' ? '她' : '他';
        const trust = target.trust;
        const persuasion = GameState.stats.persuasion;

        const opts = [
            {
                text: `🔌【强硬派】直接抢手机/拔网线，大声呵斥${name}`,
                intervention: 'shout',
                tip: '你冲过去抢过手机/拔掉网线，劈头盖脸一顿骂。对方被你镇住了，暂时收手，但也被你伤了自尊，可能背地里偷偷继续。',
                log: `强硬阻止${name}`,
                effect: {}
            },
            {
                text: `💞【共情派】先顺着${name}说，再慢慢引导${ta}发现破绽`,
                intervention: 'empathize',
                tip: `你先顺着${ta}的话聊，让${ta}放松警惕，再一步步引导${ta}自己发现其中的矛盾。成功率取决于${ta}对你的信任。`,
                log: `共情引导${name}`,
                effect: {},
                requireTrust: 60
            },
            {
                text: `📄【证据派】搜出官方反诈通报，甩在${name}脸上`,
                intervention: 'evidence',
                tip: `你当场搜出几篇一模一样的官方反诈通报，摆在${ta}面前。铁证如山，成功率取决于你的说服力。`,
                log: `证据破局${name}`,
                effect: {}
            },
            {
                text: `🤝【联合派】拉上其他舍友一起劝，或联系辅导员/家长`,
                intervention: 'ally',
                tip: '你拉上其他正常的舍友一起劝，甚至考虑联系辅导员或家长。基本稳了，但可能让${name}觉得"社会性死亡"。',
                log: `联合干预${name}`,
                effect: {}
            },
            {
                text: `🎣【钓鱼执法】顺着骗子套路反向操作，收集证据报警`,
                intervention: 'bait',
                tip: '你假装配合骗子，套取对方账户和话术，最后报警一锅端。高风险高回报，但期间${name}可能暂时损失部分资金。',
                log: `钓鱼执法${name}`,
                effect: {}
            },
            {
                text: `🚶 冷眼旁观，事不关己`,
                intervention: 'ignore',
                tip: '你觉得多一事不如少一事，假装没看见，转身走开。',
                log: `冷眼旁观${name}`,
                effect: {}
            }
        ];

        // ✅ 策略改造：持有线索卡时，解锁隐藏「深度思考」选项（插在旁观之前）
        const clueCount = this.clueCountFor(target.id);
        const matched = this.matchClues(target.id, ev);
        if (clueCount >= 1) {
            const lockedName = matched.length > 0 ? matched[0].name : '某种套路';
            opts.splice(5, 0, {
                text: `🧩【深度思考】结合 ${clueCount} 张线索卡，锁定「${lockedName}」`,
                intervention: 'deduce',
                tip: `你回想起收集到的线索，把它们拼在一起，隐隐看穿了骗子完整的套路。命中率极高。`,
                log: `深度思考锁定骗局`,
                effect: {}
            });
        }

        // 若信任不足，共情派降级提示
        if (trust < 60) {
            opts[1].text = `💞【共情派】先顺着${name}说，再慢慢引导（⚠️ 信任不足${trust}/60，成功率低）`;
        }
        // 说服力不足，证据派降级提示
        if (persuasion < 50) {
            opts[2].text = `📄【证据派】搜出反诈通报甩给${ta}看（⚠️ 说服力不足${Math.round(persuasion)}/50）`;
        }

        return opts;
    },

    /**
     * ✅ 应用舍友互动事件的结算（affectRoommate 字段）
     * @param {object} opt 选项
     * @param {string} roommateId 目标舍友 id
     */
    applyInteraction(opt, roommateId) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r || !opt.affectRoommate) return;

        const a = opt.affectRoommate;
        if (a.trust !== undefined) RoommateManager.changeTrust(roommateId, a.trust);
        if (a.status !== undefined) r.status = a.status;
        if (a.scamProgress !== undefined) r.scamProgress = Math.max(0, Math.min(100, a.scamProgress));

        // 舍友状态变化联动计数（移除宿舍氛围）
        if (a.status === 'scammed' || (a.scamProgress && a.scamProgress >= 70)) {
            GameState.counters.roommateScammed++;
        }
    },

    /**
     * ✅ 随机抽取一个舍友互动事件，并绑定到某位舍友
     * @returns {object|null}
     */
    rollRoommateInteractionEvent() {
        if (RoommateInteractions.length === 0) return null;
        const r = RoommateManager.pickTarget();
        if (!r) return null;
        const ev = JSON.parse(JSON.stringify(RoommateInteractions[Math.floor(Math.random() * RoommateInteractions.length)]));
        ev._targetRoommateId = r.id;
        GameState.currentEventTarget = r.id;
        ev._isInteractionEvent = true;
        // 描述里替换舍友占位（全部替换）
        if (!ev.desc.includes(r.name)) {
            ev.desc = ev.desc.split('舍友').join(r.name);
        }
        // ✅ 性别感知：把 {ta}/{bro}/{nickname} 等占位符按目标舍友性别替换
        this._resolveEventGender(ev, r);
        return ev;
    },

    /**
     * ✅ 随机抽取一个判定式舍友事件（judge）
     */
    rollRoommateJudgeEvent() {
        if (RoommateJudgeEvents.length === 0) return null;
        const r = RoommateManager.pickTarget();
        if (!r) return null;
        const ev = JSON.parse(JSON.stringify(RoommateJudgeEvents[Math.floor(Math.random() * RoommateJudgeEvents.length)]));
        ev._targetRoommateId = r.id;
        GameState.currentEventTarget = r.id;
        ev._isJudgeEvent = true;
        if (!ev.desc.includes(r.name)) ev.desc = ev.desc.split('舍友').join(r.name);
        this._resolveEventGender(ev, r);
        return ev;
    },

    /**
     * ✅ 随机抽取一个多舍友联动事件（multi）
     */
    rollRoommateMultiEvent() {
        if (RoommateMultiEvents.length === 0) return null;
        const ev = JSON.parse(JSON.stringify(RoommateMultiEvents[Math.floor(Math.random() * RoommateMultiEvents.length)]));
        // 绑定随机若干舍友（取前 N 个非 scammed 舍友）
        const candidates = GameState.roommates.filter(r => r.status !== 'scammed');
        if (candidates.length === 0) return null;
        ev._targetRoommateIds = candidates.map(r => r.id);
        ev._isMultiEvent = true;
        // ✅ 舍友同性同寝，用任意一位舍友的性别做 {ta}/{bro} 解析
        this._resolveEventGender(ev, candidates[0]);
        return ev;
    },

    /**
     * ✅ 结算判定式事件：根据选项 isScam 与真实答案判定对错
     */
    applyJudgeEvent(opt, roommateId) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return;
        const a = opt.affectRoommate;
        if (!a) return;
        if (a.trust !== undefined) RoommateManager.changeTrust(roommateId, a.trust);
        if (a.status !== undefined) r.status = a.status;
        if (a.scamProgress !== undefined) r.scamProgress = Math.max(0, Math.min(100, a.scamProgress));
        if (a.status === 'scammed') {
            GameState.counters.roommateScammed++;
        }
        if (opt.isScam === true) {
            GameState.counters.scamAvoids++;
        }
    },

    /**
     * ✅ 结算多舍友联动事件：affectRoommates 为数组，逐人结算
     */
    applyMultiEvent(opt) {
        const targets = opt.affectRoommates;
        if (!targets || !Array.isArray(targets)) return;
        const roommates = GameState.roommates;
        targets.forEach((a, i) => {
            const r = roommates[i % roommates.length];
            if (!r) return;
            if (a.trust !== undefined) RoommateManager.changeTrust(r.id, a.trust);
            if (a.status !== undefined) r.status = a.status;
            if (a.scamProgress !== undefined) r.scamProgress = Math.max(0, Math.min(100, a.scamProgress));
            if (a.status === 'scammed') {
                GameState.counters.roommateScammed++;
            }
        });
    },

    /**
     * ✅ 触发一条长线洗脑事件（随机选长线骗局 + 随机舍友，进入 phase 1）
     * @returns {object|null} 返回 phase 1 事件对象（已绑定舍友）
     */
    rollLongScamEvent() {
        if (RoommateLongScams.length === 0) return null;
        const r = RoommateManager.pickTarget({ excludeBrainwashed: true });
        if (!r) return null;
        const scam = RoommateLongScams[Math.floor(Math.random() * RoommateLongScams.length)];
        return this.buildLongScamPhaseEvent(scam, r, 1);
    },

    /**
     * ✅ 构建某长线骗局的某阶段事件对象（绑定舍友 + 替换占位）
     */
    buildLongScamPhaseEvent(scam, r, phase) {
        const phaseData = scam.phases[phase];
        if (!phaseData) return null;
        const ev = JSON.parse(JSON.stringify(phaseData));
        ev._isLongScamEvent = true;
        ev._longScamId = scam.id;
        ev._longScamTitle = scam.title;
        ev._longPhase = phase;
        ev._targetRoommateId = r.id;
        GameState.currentEventTarget = r.id;
        ev.title = `[🧠 长线] ${phaseData.title}`;
        ev.desc = phaseData.desc.split('{name}').join(r.name);
        this._resolveEventGender(ev, r);
        return ev;
    },

    /**
     * ✅ 长线事件结算：根据选项 intervention 判定当前阶段是否干预成功
     *  - 成功 → 终止长线，applySave
     *  - 放任/失败 → 推进到下一 phase，brainwash 递增
     */
    resolveLongScam(opt, ev) {
        const scam = RoommateLongScams.find(s => s.id === ev._longScamId);
        const r = GameState.roommates.find(x => x.id === ev._targetRoommateId);
        if (!scam || !r) return { success: false, resultText: '', extraTip: '', nextPhase: 0 };

        const name = r.name;
        const ta = r.gender === '女' ? '她' : '他';
        const phase = ev._longPhase;

        if (opt.intervention === 'ignore' || !opt.intervention) {
            const next = phase + 1;
            if (next <= 3) {
                RoommateManager.advanceBrainwash(r.id, scam.id, next, 35);
                return {
                    success: false,
                    resultText: `🚶 你没有及时干预，${name}在洗脑的道路上越陷越深。`,
                    extraTip: `进入下一阶段（第 ${next} 阶段），洗脑进度已上升。`,
                    nextPhase: next
                };
            } else {
                RoommateManager.applyBrainwashLoss(r.id, Math.round(r.money * 0.9));
                return {
                    success: false,
                    resultText: `💀 ${name}彻底深陷骗局，人财两空。`,
                    extraTip: '长线洗脑到达终点，代价极其惨痛。',
                    nextPhase: 0
                };
            }
        }

        const phaseFactor = phase === 1 ? 1.2 : (phase === 2 ? 1.0 : 0.7);
        let baseChance = 0.8 * phaseFactor;
        if (opt.intervention === 'evidence') baseChance = (GameState.stats.persuasion * 0.9 / 100 + 0.2) * phaseFactor;
        if (opt.intervention === 'empathize') baseChance = (r.trust >= 60 ? 0.9 : 0.4) * phaseFactor;
        if (opt.intervention === 'ally') baseChance = 0.95 * phaseFactor;
        if (opt.intervention === 'bait') baseChance = 0.7 * phaseFactor;
        if (opt.intervention === 'shout') baseChance = 0.75 * phaseFactor;

        const chance = RoommateManager.calcInterventionChance(r.id, opt.intervention, baseChance);
        const success = Math.random() < chance;

        if (success) {
            RoommateManager.applySave(r.id, Math.round(r.money * 0.5), 10);
            GameState.stats.persuasion = Math.min(100, GameState.stats.persuasion + 3);
            return {
                success: true,
                resultText: `✅ 你的${this.interventionLabel(opt.intervention)}奏效了，${name}终于清醒过来，脱离了洗脑。`,
                extraTip: `成功在第 ${phase} 阶段挽回了${ta}，避免了更大的损失。`,
                nextPhase: 0
            };
        } else {
            const next = phase + 1;
            if (next <= 3) {
                RoommateManager.advanceBrainwash(r.id, scam.id, next, 40);
                return {
                    success: false,
                    resultText: `❌ 你的干预没有奏效，${name}反而更坚信"导师"了。`,
                    extraTip: `进入下一阶段（第 ${next} 阶段）。`,
                    nextPhase: next
                };
            } else {
                RoommateManager.applyBrainwashLoss(r.id, Math.round(r.money * 0.9));
                return {
                    success: false,
                    resultText: `💀 干预失败，${name}彻底沉沦。`,
                    extraTip: '',
                    nextPhase: 0
                };
            }
        }
    },

    /** 干预派别中文名 */
    interventionLabel(type) {
        return { shout: '强硬手段', empathize: '共情引导', evidence: '证据攻势', ally: '联合劝说', bait: '钓鱼执法' }[type] || '干预';
    },

    /** 随机抽取一个日常互动事件 */
    rollRoommateDailyEvent() {
        if (RoommateDaily.length === 0) return null;
        const r = RoommateManager.pickTarget();
        if (!r) return null;
        const ev = JSON.parse(JSON.stringify(RoommateDaily[Math.floor(Math.random() * RoommateDaily.length)]));
        ev._targetRoommateId = r.id;
        GameState.currentEventTarget = r.id;
        ev._isDailyEvent = true;
        if (!ev.desc.includes(r.name)) ev.desc = ev.desc.split('舍友').join(r.name);
        this._resolveEventGender(ev, r);
        return ev;
    },

    /**
     * ✅ 抽取一个「刷值小剧情」并绑定随机舍友（用于「和舍友互动」刷值）
     *  - kind: 'scam' 真诈骗小剧情（识破 +说服力）
     *  - kind: 'mystery' 迷惑疑似非诈骗（虚惊一场 +信任值）
     *  - gender 筛选：根据目标舍友性别，过滤出「通用 + 该性别专属」的事件，
     *    让男性/女性线路刷值时能遇到针对性别的骗局（如裸聊敲诈/杀猪盘）。
     */
    rollGrindStoryEvent() {
        if (GrindStories.length === 0) return null;
        const r = RoommateManager.pickTarget();
        if (!r) return null;

        // ✅ 按舍友性别筛选事件池：通用(null) + 该性别专属(male/female)
        const genderKey = r.gender === '女' ? 'female' : 'male';
        const pool = GrindStories.filter(g => g.gender === null || g.gender === genderKey);
        if (pool.length === 0) return null;

        const ev = JSON.parse(JSON.stringify(pool[Math.floor(Math.random() * pool.length)]));
        ev._targetRoommateId = r.id;
        GameState.currentEventTarget = r.id;
        ev._isGrindStory = true;
        ev._grindKind = ev.kind;
        this._resolveEventGender(ev, r);
        return ev;
    },

    /**
     * ✅ 干预判定：结合性格抗性 + 五派干预，计算舍友是否得救
     * @param {object} opt 选项（含 intervention 字段）
     * @param {string} roommateId 舍友 id
     * @param {object} scamEv 原始诈骗事件
     */
    /**
     * ✅ 策略改造：返回玩家持有的、针对某舍友且与该骗局「关键词匹配」的线索卡
     */
    matchClues(roommateId, ev) {
        const text = `${ev.category || ''} ${ev.title || ''}`;
        return GameState.inventory.clues.filter(c =>
            c.roommateId === roommateId && !c.garbled && c.keywords.some(k => text.includes(k))
        );
    },

    /** 针对某舍友持有的真实线索卡数量（乱码线索不计入） */
    clueCountFor(roommateId) {
        return GameState.inventory.clues.filter(c => c.roommateId === roommateId && !c.garbled).length;
    },

    resolveIntervention(opt, roommateId, scamEv) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r) return { success: false, savedMoney: 0, resultText: '', extraTip: '' };

        const ta = r.gender === '女' ? '她' : '他';
        const persuasion = GameState.stats.persuasion;
        const trust = r.trust;

        // 估算被骗金额
        let scamAmount = Math.max(200, Math.round((scamEv && scamEv.amount) || (r.money * 0.4)));
        if (scamEv && scamEv.options && scamEv.options.length) {
            const bad = scamEv.options.find(o => o.danger === 'high' || o.isCorrect === false);
            if (bad && bad.effect && bad.effect.money && bad.effect.money < 0) {
                scamAmount = Math.min(r.money, Math.abs(bad.effect.money));
            }
        }

        // ✅ 策略改造：线索卡组合加成
        const clueCount = this.clueCountFor(roommateId);
        const matchedClues = this.matchClues(roommateId, scamEv);

        let success = false;
        let resultText = '';
        let extraTip = '';
        const name = r.name;

        // 各派基础成功率 + 性格抗性修正（统一走 RoommateManager.calcInterventionChance）
        switch (opt.intervention) {
            case 'shout': {
                // 强硬派：基础 0.8，性格抗性修正（暴躁老哥会打起来）
                const base = RoommateManager.calcInterventionChance(roommateId, 'shout', 0.8);
                success = Math.random() < base;
                RoommateManager.changeTrust(roommateId, success ? -20 : -30);
                resultText = success ? `✅ 你强行阻止了${name}。` : `❌ ${name}嘴上答应，背地里还是偷着继续了。`;
                extraTip = success ? `虽然保住了钱，但${ta}对你很不满。` : `你的强硬适得其反，反而把${ta}推向了骗子。`;
                break;
            }
            case 'empathize': {
                // 共情派：依赖信任度（需 >60 才高），性格抗性修正
                const baseRaw = trust >= 60 ? 0.85 : 0.35;
                const base = RoommateManager.calcInterventionChance(roommateId, 'empathize', baseRaw);
                success = Math.random() < base;
                RoommateManager.changeTrust(roommateId, success ? 15 : -3);
                resultText = success ? `✅ 你顺着${name}的话一步步引导，${ta}最终自己发现了破绽。` : `❌ ${name}没被说动，还嫌你啰嗦。`;
                extraTip = success ? `你的共情让${ta}更信任你了。` : '信任不足，共情效果大打折扣。';
                break;
            }
            case 'evidence': {
                // 证据派：依赖说服力 + 线索卡组合加成，性格抗性修正
                let baseRaw = (persuasion * 0.8) / 100 + 0.15; // 0.15~0.95
                if (matchedClues.length >= 2) baseRaw = 1.0;            // 🧩 精准锁定：2 张匹配线索一击必中
                else if (clueCount >= 2) baseRaw = Math.min(0.98, baseRaw + 0.3);
                else if (clueCount >= 1) baseRaw = Math.min(0.98, baseRaw + 0.15);
                const base = RoommateManager.calcInterventionChance(roommateId, 'evidence', baseRaw);
                success = Math.random() < base;
                RoommateManager.changeTrust(roommateId, success ? 10 : 0);
                resultText = success ? `✅ 铁证如山，${name}盯着反诈通报，脸色大变。` : `❌ ${name}看了通报还是将信将疑。`;
                extraTip = matchedClues.length >= 2 ? `🧩 你持有的 ${matchedClues.length} 张线索卡精准命中了骗局！` : (clueCount >= 1 ? `🧩 ${clueCount} 张线索卡让证据更有说服力。` : `你的说服力还不足以让${ta}信服。`);
                break;
            }
            case 'deduce': {
                // 🧩 深度思考：结合线索卡解锁的隐藏选项，成功率极高
                const base = matchedClues.length >= 2 ? 1.0 : (clueCount >= 2 ? 0.92 : 0.85);
                success = Math.random() < base;
                RoommateManager.changeTrust(roommateId, success ? 12 : -5);
                resultText = success ? `✅ 你拿出收集的线索卡，把${name}遇到的套路一环环拆开，${ta}恍然大悟。` : `❌ 线索还不够扎实，${name}将信将疑。`;
                extraTip = success ? '🧩 线索拼图生效，铁证 + 人情双管齐下。' : '继续收集线索再出手，命中率更高。';
                break;
            }
            case 'ally': {
                // 联合派：基本必成
                const base = RoommateManager.calcInterventionChance(roommateId, 'ally', 0.95);
                success = Math.random() < base;
                RoommateManager.changeTrust(roommateId, success ? 5 : -10);
                resultText = success ? `✅ 众人合力，${name}悬崖勒马。` : `❌ ${name}趁大家没反应过来就完成了操作。`;
                extraTip = success ? `虽然保住了${ta}，但这事闹得挺大。` : `${ta}怨你多管闲事。`;
                break;
            }
            case 'bait': {
                // 钓鱼执法：高风险高回报，可能暂时损失资金
                const base = RoommateManager.calcInterventionChance(roommateId, 'bait', 0.7);
                success = Math.random() < base;
                if (success) {
                    // 成功：报警端掉，但期间舍友可能暂时损失一部分
                    const tempLoss = Math.round(scamAmount * 0.2);
                    r.money = Math.max(0, r.money - tempLoss);
                    resultText = `✅ 你配合骗子套取了证据，报警后一锅端。${name}虽然暂时损失了 ¥${tempLoss}，但人清醒了。`;
                    extraTip = '高风险高回报，损失可控。';
                    GameState.stats.persuasion = Math.min(100, GameState.stats.persuasion + 5);
                } else {
                    // 失败：鸡飞蛋打，舍友被骗更多（反诈护盾可抵挡）
                    const blocked = RoommateManager.applyScamLoss(roommateId, scamAmount);
                    resultText = blocked ? `🛡️ 钓鱼执法翻车了，但反诈护盾替${name}挡下了全部损失。` : `❌ 钓鱼执法翻车了，${name}反而被骗走了更多钱。`;
                    extraTip = blocked ? '护盾已消耗。' : '风险果然很高。';
                }
                // 钓鱼执法不计入常规 applySave（已手动结算），直接 return
                return { success, savedMoney: success ? scamAmount * 0.8 : 0, resultText, extraTip };
            }
            case 'ignore':
            default: {
                success = false;
                resultText = `🚶 你没有插手，${name}还是陷了进去。`;
                extraTip = '';
                break;
            }
        }

        if (success) {
            RoommateManager.applySave(roommateId, scamAmount, 0);
            GameState.stats.persuasion = Math.min(100, GameState.stats.persuasion + 2);
        } else if (opt.intervention !== 'bait') {
            const blocked = RoommateManager.applyScamLoss(roommateId, scamAmount);
            if (blocked) {
                resultText = `🛡️ 反诈护盾生效！${name}本要转账，被你的护盾挡了下来，钱保住了。`;
                extraTip = '护盾已消耗（-1）。';
            }
        }

        return { success, savedMoney: success ? scamAmount : 0, resultText, extraTip };
    },

    /**
     * ✅ 观察舍友时，根据其状态决定是否触发诈骗事件
     * @returns {object|null} 若触发则返回一个绑定到该舍友的诈骗事件，否则 null
     */
    rollRoommateObserveEvent() {
        const r = RoommateManager.pickTarget();
        if (!r) return null;

        // 可疑/深陷的舍友更容易触发诈骗事件
        const triggerChance = r.status === 'scammed' ? 0.85 : (r.status === 'suspicious' ? 0.6 : 0.35);
        if (Math.random() > triggerChance) return null;

        // 从诈骗事件池随机选一个，绑定该舍友
        const scamPool = [...MassiveScamPool, ...StageEvents].filter(ev => ev.id.startsWith('s_') || (ev.category && /诈骗|陷阱|骗|贷|裸聊|杀猪|刷单/.test(ev.category)));
        if (scamPool.length === 0) return null;
        const ev = JSON.parse(JSON.stringify(scamPool[Math.floor(Math.random() * scamPool.length)]));
        ev._targetRoommateId = r.id;
        GameState.currentEventTarget = r.id;
        ev.title = `[👀 舍友异常] ${ev.title.replace(/^【.*?】\s*/, '')}`;
        ev.desc = this.buildRoommateDesc(ev, r);
        ev.options = this.buildInterventionOptions(ev, r);
        ev._isRoommateEvent = true;
        return ev;
    },

    // ============================================================
    //  ✅ 剧本式剧情章节引擎（《室友，你还好吗？》四章主线）
    //  - 章节 = 多幕对话剧，选项导向下一幕或结局。
    //  - 通过 storyChapter 状态记录进度，跨周期推进。
    // ============================================================

    /** 获取当前进行中的章节（自由选人模式下：若有未完成的进行中章节则返回，否则 null） */
    getCurrentChapter() {
        if (GameState.storyChapter.currentChapter) {
            return StoryChapters.find(c => c.id === GameState.storyChapter.currentChapter) || null;
        }
        return null;
    },

    /** 章节总数 */
    getTotalChapters() {
        return StoryChapters.length;
    },

    /** 获取某章节的舍友对象（player 章节返回 null） */
    getChapterRoommate(chapter) {
        if (!chapter || chapter.roommateId === 'player') return null;
        return GameState.roommates.find(r => r.id === chapter.roommateId) || null;
    },

    /**
     * ✅ 性别感知文本解析：把 {ta}/{bro}/{nickname}/{lover}/{lover_sex} 等占位符按舍友性别替换。
     *  - {ta}        → 他（男）/ 她（女）
     *  - {bro}       → 兄弟（男）/ 姐妹（女）
     *  - {nickname}  → 舍友昵称（如 小澄/小诚）
     *  - {name}      → 舍友姓名（player 章节为"你"）
     *  - {lover}     → 舍友的恋人称呼：男朋友（舍友女）/ 女朋友（舍友男）
     *  - {lover_sex} → 舍友恋人的性别：男生（舍友女）/ 女生（舍友男）
     * @param {string} text 原文
     * @param {object|null} roommate 舍友对象（player 章节传 null，{ta}→他，{bro}→兄弟，{name}→你）
     */
    resolveGenderText(text, roommate) {
        if (!text) return text;
        const isFemale = roommate && roommate.gender === '女';
        const ta = isFemale ? '她' : '他';
        const bro = isFemale ? '姐妹' : '兄弟';
        const name = (roommate && roommate.name) ? roommate.name : '你';
        const nickname = roommate ? (roommate.nickname || ('小' + name.slice(-1))) : '你';
        // 恋人称呼：舍友是女性 → 对象是男朋友/男生；舍友是男性 → 对象是女朋友/女生
        const lover = isFemale ? '男朋友' : '女朋友';
        const loverSex = isFemale ? '男生' : '女生';
        return text
            .split('{lover_sex}').join(loverSex)
            .split('{lover}').join(lover)
            .split('{ta}').join(ta)
            .split('{bro}').join(bro)
            .split('{nickname}').join(nickname)
            .split('{name}').join(name);
    },

    /**
     * ✅ 对事件对象的 title/desc/options 做性别感知替换（就地修改）。
     *  用于舍友互动、判定、日常等绑定到具体舍友的事件。
     */
    _resolveEventGender(ev, roommate) {
        if (!ev || !roommate) return ev;
        if (ev.title) ev.title = this.resolveGenderText(ev.title, roommate);
        if (ev.desc) ev.desc = this.resolveGenderText(ev.desc, roommate);
        if (Array.isArray(ev.options)) {
            ev.options = ev.options.map(opt => {
                const o = { ...opt };
                if (o.text) o.text = this.resolveGenderText(o.text, roommate);
                if (o.tip) o.tip = this.resolveGenderText(o.tip, roommate);
                if (o.log) o.log = this.resolveGenderText(o.log, roommate);
                return o;
            });
        }
        return ev;
    },

    /** 解析章节标题里的 {name}/{bro} 等占位（按当前舍友性别） */
    resolveChapterTitle(chapter) {
        const r = this.getChapterRoommate(chapter);
        return this.resolveGenderText(chapter.chapterTitle, r);
    },

    /** 解析章节 intro 里的 {name}/{ta} 等占位 */
    resolveChapterIntro(chapter) {
        const r = this.getChapterRoommate(chapter);
        const intro = chapter.intro || {};
        return {
            name: this.resolveGenderText(intro.name || '你', r),
            title: this.resolveGenderText(intro.title || '', r),
            desc: this.resolveGenderText(intro.desc || '', r)
        };
    },

    /** 开始一个章节：返回第一幕的事件对象 */
    startChapter(chapterId) {
        const chapter = StoryChapters.find(c => c.id === chapterId);
        if (!chapter) return null;
        GameState.storyChapter.currentChapter = chapterId;
        GameState.storyChapter.currentScene = 0;
        return this.buildChapterSceneEvent(chapter, 0);
    },

    /**
     * ✅ 把某章节的某幕转化为事件对象（用于渲染）
     *  - 标记 _isChapterEvent、_chapterId、_sceneIndex
     *  - desc 里的 {name} 替换为舍友名（player 章节替换为"你"）
     */
    buildChapterSceneEvent(chapter, sceneIndex) {
        const scene = chapter.scenes[sceneIndex];
        if (!scene) return null;

        const r = this.getChapterRoommate(chapter);
        const name = r ? r.name : '你';

        // 构造事件对象
        const ev = {
            id: `chapter_${chapter.id}_scene${sceneIndex}`,
            title: `${chapter.icon} ${this.resolveGenderText(scene.sceneTitle, r)}`,
            desc: this.resolveGenderText(scene.desc, r),
            clue: scene.clue ? {
                label: this.resolveGenderText(scene.clue.label, r),
                detail: this.resolveGenderText(scene.clue.detail, r)
            } : null,
            options: scene.options.map((opt, i) => ({
                text: this.resolveGenderText(opt.text, r),
                tip: this.resolveGenderText(opt.tip || '', r),
                next: opt.next || null,        // 'sceneN' | 'ending:xxx'
                effect: opt.effect || null,
                affectRoommate: opt.affectRoommate || null,
                require: opt.require || null    // ✅ 属性门槛 { persuasion?: number, trust?: number }
            })),
            _isChapterEvent: true,
            _chapterId: chapter.id,
            _chapterTitle: this.resolveGenderText(chapter.chapterTitle, r),
            _chapterIcon: chapter.icon,
            _theme: this.resolveGenderText(chapter.theme, r),
            _sceneIndex: sceneIndex,
            _chapterEnd: false,
            danger: 'safe'
        };

        // 记录目标舍友（用于结算）
        if (r) {
            ev._targetRoommateId = r.id;
            GameState.currentEventTarget = r.id;
        }
        return ev;
    },

    /**
     * ✅ 检测某个剧情选项的属性门槛是否满足
     * @param {object} opt 选项（含 require 字段）
     * @param {string|null} roommateId 该章节对应的舍友 id（player 章节为 null）
     * @returns {object} { ok:boolean, missing:[] } missing 为未满足条件的提示列表
     */
    checkOptionRequire(opt, roommateId) {
        const req = opt.require;
        if (!req) return { ok: true, missing: [] };
        const missing = [];
        // 说服力门槛
        if (req.persuasion !== undefined && GameState.stats.persuasion < req.persuasion) {
            missing.push(`🗣️ 说服力 ${Math.round(GameState.stats.persuasion)}/${req.persuasion}`);
        }
        // 信任值门槛（需指定舍友）
        if (req.trust !== undefined && roommateId) {
            const r = GameState.roommates.find(x => x.id === roommateId);
            const cur = r ? r.trust : 0;
            if (cur < req.trust) {
                missing.push(`🤝 信任值 ${Math.round(cur)}/${req.trust}`);
            }
        }
        return { ok: missing.length === 0, missing };
    },

    /**
     * ✅ 处理剧情章节的选项，返回 { type:'next'|'ending', scene/ending, chapter }
     *  - opt.next 形如 'scene2' 或 'ending:xxx'
     */
    advanceChapter(opt, chapterId) {
        const chapter = StoryChapters.find(c => c.id === chapterId);
        if (!chapter) return { type: 'end', chapter: null };

        // 应用选项的数值结算
        if (opt.effect) this.applyChapterEffect(opt.effect);
        if (opt.affectRoommate) {
            const r = this.getChapterRoommate(chapter);
            if (r) this.applyChapterRoommateEffect(r.id, opt.affectRoommate);
        }

        // 记录选择
        GameState.storyChapter.history.push({ chapterId, option: opt.text });

        const next = opt.next;
        if (!next) return { type: 'end', chapter };

        // 结局分支
        if (next.startsWith('ending:')) {
            const endingId = next.replace('ending:', '');
            const ending = chapter.endings[endingId];
            return { type: 'ending', chapter, endingId, ending };
        }

        // 下一幕：按 scene 的 key 或索引匹配
        let sceneIdx = chapter.scenes.findIndex(s => s.key === next);
        if (sceneIdx < 0) {
            // 兼容未写 key 的场景：按 next 里的数字推算（scene2 → 索引1）
            const m = next.match(/scene(\d+)/);
            if (m) {
                // sceneN 对应第 N 幕；但若有 _alt 岔路，需精确匹配
                const exactIdx = chapter.scenes.findIndex(s => s.key === next);
                sceneIdx = exactIdx >= 0 ? exactIdx : (parseInt(m[1], 10) - 1);
            }
        }
        if (sceneIdx >= 0 && sceneIdx < chapter.scenes.length) {
            GameState.storyChapter.currentScene = sceneIdx;
            return { type: 'scene', chapter, sceneIndex: sceneIdx };
        }

        // 兜底：直接进入第一章结局
        return { type: 'end', chapter };
    },

    /** 应用章节选项的玩家数值结算（精简后仅 money/persuasion） */
    applyChapterEffect(effect) {
        if (!effect) return;
        if (effect.money) GameState.stats.money += effect.money;
        if (effect.persuasion) GameState.stats.persuasion = Math.max(0, Math.min(100, GameState.stats.persuasion + effect.persuasion));
    },

    /** 应用章节选项的舍友结算（信任值 + 状态，移除宿舍氛围联动） */
    applyChapterRoommateEffect(roommateId, affect) {
        const r = GameState.roommates.find(x => x.id === roommateId);
        if (!r || !affect) return;
        if (affect.trust !== undefined) RoommateManager.changeTrust(roommateId, affect.trust);
        if (affect.status !== undefined) r.status = affect.status;
        if (affect.scamProgress !== undefined) r.scamProgress = Math.max(0, Math.min(100, affect.scamProgress));
        if (affect.status === 'scammed') {
            GameState.counters.roommateScammed++;
        }
    },

    /**
     * 完成当前章节：标记完成，并记录「首次通关」结局快照 + 「已体验结局」集合，推进学年。
     *  - completedChapters 去重记录（首次通关即永久，重玩不重复）。
     *  - firstEndings 仅在首次通关时写入，后续重玩探索不同结局不会覆盖。
     *  - seenEndings 累积记录每章体验过的所有结局（重玩不丢失，用于「全结局」判定）。
     *  - year 首次通关时 +1（大一→大四），通关第四章后进入「毕业」。
     * @param {string} chapterId
     * @param {string|null} endingId 达成的结局 id
     * @param {string|null} endingType 结局类型 good/bad/neutral
     */
    completeChapter(chapterId, endingId = null, endingType = null) {
        const firstTime = !GameState.storyChapter.completedChapters.includes(chapterId);

        if (firstTime) {
            GameState.storyChapter.completedChapters.push(chapterId);
            // ✅ 记录首次通关结局（定档，后续探索不覆盖）
            if (endingId) {
                GameState.storyChapter.firstEndings[chapterId] = { endingId, type: endingType };
            }
            // ✅ 推进学年（大一→大二→大三→大四；通关第四章后 year=5 表示毕业）
            GameState.storyChapter.year = Math.min(5, GameState.storyChapter.year + 1);
        }

        // ✅ 累积记录「已体验过的结局」（无论是否首次通关）
        if (endingId) {
            if (!GameState.storyChapter.seenEndings[chapterId]) {
                GameState.storyChapter.seenEndings[chapterId] = [];
            }
            if (!GameState.storyChapter.seenEndings[chapterId].includes(endingId)) {
                GameState.storyChapter.seenEndings[chapterId].push(endingId);
            }
        }

        GameState.storyChapter.currentChapter = null;
        GameState.storyChapter.currentScene = null;
    },

    /**
     * ✅ 获取某章的「首次通关」结局快照（无则返回 null）
     */
    getFirstEnding(chapterId) {
        return GameState.storyChapter.firstEndings[chapterId] || null;
    },

    /**
     * ✅ 学年与章节的映射顺序（大一~大四）
     */
    getYearOrder() {
        return [
            { year: 1, label: '大一', chapterId: 'chapter_lin_cheng' },
            { year: 2, label: '大二', chapterId: 'chapter_chen_yu' },
            { year: 3, label: '大三', chapterId: 'chapter_xu_jiashu' },
            { year: 4, label: '大四', chapterId: 'chapter_player' }
        ];
    },

    /** 获取当前学年的中文名（year=5 时为「已毕业」） */
    getCurrentYearLabel() {
        const y = GameState.storyChapter.year;
        if (y >= 5) return '🎓 已毕业';
        return ['大一', '大二', '大三', '大四'][y - 1] || '大一';
    },

    /** 是否已毕业（四章全部首次通关） */
    isGraduated() {
        return GameState.storyChapter.year >= 5;
    },

    /**
     * ✅ 检测某章是否已体验完所有结局
     * @param {string} chapterId
     * @returns {object} { allSeen, seenCount, total }
     */
    getChapterEndingProgress(chapterId) {
        const chapter = StoryChapters.find(c => c.id === chapterId);
        if (!chapter) return { allSeen: false, seenCount: 0, total: 0 };
        const total = Object.keys(chapter.endings || {}).length;
        const seen = (GameState.storyChapter.seenEndings[chapterId] || []).length;
        return { allSeen: seen >= total && total > 0, seenCount: seen, total };
    },

    /**
     * ✅ 检测是否「所有章节的全部结局」都已体验完
     * @returns {boolean}
     */
    isAllEndingsSeen() {
        return StoryChapters.every(ch => this.getChapterEndingProgress(ch.id).allSeen);
    },

    /**
     * ✅ 线索与剧情联动：每个舍友章节需收集足量该舍友的线索卡才解锁
     *  - 前 3 章（对应 3 名舍友）：各需 1 张该舍友的「真实线索」
     *  - 第 4 章（玩家自己）：体验三名舍友「各自的任一结局」后自动解锁
     * 返回 [{ chapter, displayTitle, intro, status, clueCount, needClue }]
     *  status: 'completed' | 'inProgress' | 'available' | 'locked'
     */
    listChapters() {
        const clueRequirement = 1;   // 每名舍友需 1 张真实线索解锁
        return StoryChapters.map(chapter => {
            const roommateId = chapter.roommateId;
            let status = 'available';
            let clueCount = 0;
            let needClue = 0;

            if (GameState.storyChapter.completedChapters.includes(chapter.id)) {
                status = 'completed';
            } else if (GameState.storyChapter.currentChapter === chapter.id) {
                status = 'inProgress';
            } else if (roommateId !== 'player') {
                // 舍友章节：需要收集该舍友的真实线索
                clueCount = this.clueCountFor(roommateId);
                if (clueCount < clueRequirement) {
                    status = 'locked';
                    needClue = clueRequirement;
                }
            } else {
                // 玩家章节：需前三章通关
                const roomChapters = StoryChapters.filter(c => c.roommateId !== 'player');
                const allDone = roomChapters.every(c => GameState.storyChapter.completedChapters.includes(c.id));
                if (!allDone) status = 'locked';
            }

            return {
                chapter,
                displayTitle: this.resolveChapterTitle(chapter),
                intro: this.resolveChapterIntro(chapter),
                status,
                clueCount,
                needClue
            };
        });
    },

    /** 开始指定章节（自由选人）：返回第一幕事件对象 */
    startChapterById(chapterId) {
        return this.startChapter(chapterId);
    },

    /** 构建章节结局的结算卡（反诈课堂） */
    buildChapterEnding(chapter, endingId, ending) {
        const r = this.getChapterRoommate(chapter);
        const name = r ? r.name : '你';
        const lesson = chapter.lesson || {};
        return {
            chapterId: chapter.id,
            chapterTitle: this.resolveGenderText(chapter.chapterTitle, r),
            chapterIcon: chapter.icon,
            theme: this.resolveGenderText(chapter.theme, r),
            endingId,
            endingTitle: this.resolveGenderText(ending.title, r),
            endingDesc: this.resolveGenderText(ending.desc, r),
            endingType: ending.type,
            lesson: {
                title: this.resolveGenderText(lesson.title, r),
                points: (lesson.points || []).map(p => this.resolveGenderText(p, r)),
                tips: (lesson.tips || []).map(t => this.resolveGenderText(t, r)),
                psychology: (lesson.psychology || []).map(p => this.resolveGenderText(p, r))
            }
        };
    }
};
