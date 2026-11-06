import { GameState } from './state.js';

// ============================================================
//  结局结算：防诈段位评定
//  触发时机：
//   1. 玩家体验完剧情后主动点击「结束探索」
//   2. 玩家被退学（学术不端）等特殊结局
//  评定依据（以「首次通关」结果为准，后续重玩探索不覆盖）：
//   - completedChapters：首次通关的章节数（重玩不重复计入）。
//   - firstEndings：每章首次达成的结局快照（type: good/bad/neutral）。
//   - 段位 = f(首次通关章节数, 其中 good 结局的数量)。
// ============================================================

export const EndingManager = {
    /** 统计首次通关的章节数、好/坏/中性结局数 */
    _getStats() {
        const completed = (GameState.storyChapter.completedChapters || []).length;
        const total = GameState.roommates.length;

        // ✅ 以首次通关结局为准统计 good/bad/neutral
        const firstEndings = GameState.storyChapter.firstEndings || {};
        let goodCount = 0;
        let badCount = 0;
        let neutralCount = 0;
        for (const id in firstEndings) {
            const t = firstEndings[id].type;
            if (t === 'good') goodCount++;
            else if (t === 'bad') badCount++;
            else neutralCount++;
        }

        const scammedCount = GameState.roommates.filter(r => r.status === 'scammed').length;
        return { completed, total, goodCount, badCount, neutralCount, scammedCount };
    },

    /**
     * 生成防诈段位结局（正常结束探索时调用）
     * 依据「首次通关」的章节数与好结局数评定，后续重玩不影响。
     * @returns {object} 结局对象 { title, desc, type, rank, isFinal }
     */
    getRankEnding() {
        const { completed, total, goodCount, badCount } = this._getStats();

        // 特殊彩蛋：四章全部通关，但首次通关时没有一章达成好结局
        if (completed >= 4 && goodCount === 0) {
            return {
                title: '🕵️ 孤独的清醒者',
                desc: '你看穿了所有骗局，却没有一个能拉住深陷其中的室友。\n\n宿舍里四张床，只剩你一个人清醒地坐到了天亮。那一刻你终于明白：识破骗局和守护一个人，从来都是两件不同的事。',
                type: 'neutral',
                rank: '特殊',
                isFinal: true
            };
        }

        switch (completed) {
            case 4:
                if (goodCount === 4) {
                    return {
                        title: '🏆 反诈之神',
                        desc: '你是当之无愧的宿舍之光！四次机会，你每一次都做出了最清醒的选择，成功守护了整个宿舍。',
                        type: 'good',
                        rank: '神',
                        isFinal: true
                    };
                }
                return {
                    title: '🥇 黄金反诈师',
                    desc: `你通关了全部故事，但其中 ${4 - goodCount} 章留下了遗憾。\n\n识破骗局需要洞察，而守护一个人，还需要恰到好处的分寸。`,
                    type: 'good',
                    rank: '黄金',
                    isFinal: true
                };
            case 3:
                return {
                    title: '🥇 黄金反诈师',
                    desc: '你敏锐地识破了大部分套路，距离全员安全只有一步之遥。',
                    type: 'good',
                    rank: '黄金',
                    isFinal: false
                };
            case 2:
                return {
                    title: '🥈 白银反诈师',
                    desc: '你已经具备了一定的防骗意识，成功保护了部分室友。',
                    type: 'good',
                    rank: '白银',
                    isFinal: false
                };
            case 1:
                return {
                    title: '🥉 青铜反诈师',
                    desc: '你仅仅看穿了冰山一角，还有更多隐秘的骗局潜伏在你的宿舍里。',
                    type: 'neutral',
                    rank: '青铜',
                    isFinal: false
                };
            default:
                return {
                    title: '🫥 尚未入门',
                    desc: '你还没有体验任何一段剧情。\n\n或许你该先去「观察舍友」，收集线索，解锁他们的故事。',
                    type: 'neutral',
                    rank: '未评级',
                    isFinal: false
                };
        }
    },

    /** 根据舍友被骗数量追加一句状态描述 */
    _tail(base) {
        const { scammedCount } = this._getStats();
        if (scammedCount === 0) {
            return `${base}\n\n✨ 本局所有舍友都安然无恙，没有一个人落入骗局。`;
        } else if (scammedCount === 1) {
            return `${base}\n\n⚠️ 可惜的是，有一位舍友没能躲过骗局。`;
        } else {
            return `${base}\n\n😔 有 ${scammedCount} 位舍友在骗局中深陷其中，成了你心里的遗憾。`;
        }
    },

    /**
     * 检查是否有需要立即触发的特殊结局（如学术不端退学）
     * @returns {object|null}
     */
    checkEnding() {
        // 学术不端退学（代写论文等）
        if (GameState.flags.expelled) {
            return {
                title: '🚫 学术不端：开除退学',
                desc: '你花钱找代写买论文的事东窗事发，被认定为严重学术不端。学校作出开除学籍、退学的处理决定。\n\n这一刻，你才明白：有些捷径的代价，是再也回不了头的。',
                type: 'bad'
            };
        }
        return null;
    }
};
