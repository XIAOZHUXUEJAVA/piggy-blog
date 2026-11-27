export type NoteCategory = 'daily' | 'thoughts' | 'joys';
export type NoteLocale = 'zh' | 'en';

interface NoteText {
  title: string;
  paragraphs: string[];
  aside?: string;
}

export interface NoteEntry {
  id: string;
  date: string;
  category: NoteCategory;
  text: Record<NoteLocale, NoteText>;
}

// Sample entries, kept separately so they can be replaced with personal notes later.
const notesData: NoteEntry[] = [
  {
    id: 'ordinary-day',
    date: '2026-11-19',
    category: 'daily',
    text: {
      zh: {
        title: '给普通的一天留个位置',
        paragraphs: [
          '今天下楼买东西，发现路边的树已经掉了好多叶子。回来时特意绕了一小段路，踩着落叶走，声音很好听。',
          '突然觉得，有些事情虽然不值得写成一篇文章，也值得记下来。比如便利店刚好有热乎乎的烤红薯，比如回家时，夕阳正好落在窗台上。',
        ],
        aside: '今日收获：一小段没有看手机的路。',
      },
      en: {
        title: 'A little room for an ordinary day',
        paragraphs: [
          'Went downstairs for groceries and noticed how many leaves the trees had lost. Took the long way home just to hear them crunch beneath my shoes.',
          'Some things may never become a whole article, but they still deserve a few lines. A warm sweet potato at the corner shop. The sunset resting on the windowsill when I got home.',
        ],
        aside: 'Today’s find: a little stretch of road without looking at my phone.',
      },
    },
  },
  {
    id: 'close-the-laptop',
    date: '2026-11-16',
    category: 'thoughts',
    text: {
      zh: {
        title: '暂时合上电脑',
        paragraphs: [
          '一个小问题改了半天，越盯着屏幕越觉得哪里都不对。最后决定先放着，出门走了一圈，反而在等红灯的时候想明白了。',
          '原来休息也算是解决问题的一部分。下次再卡住，先去喝杯水，看看窗外，允许自己暂时没有答案。',
        ],
      },
      en: {
        title: 'Closing the laptop for a while',
        paragraphs: [
          'Spent half a day on a tiny bug. The longer I stared at the screen, the less sense it made. Left it alone, went for a walk, and figured it out while waiting at a red light.',
          'Rest can be part of solving a problem. Next time I get stuck: water, a look outside, and permission to have no answer for a while.',
        ],
      },
    },
  },
  {
    id: 'warm-bread',
    date: '2026-11-13',
    category: 'joys',
    text: {
      zh: {
        title: '刚出炉的快乐',
        paragraphs: [
          '路过面包店的时候，刚好遇到新一炉出炉。纸袋捧在手里暖暖的，还没走到家，就忍不住掰了一小块。',
          '外面脆脆的，里面又很软。今天没有发生什么大事，但这个面包值得单独占一页。',
        ],
        aside: '幸福有时候只需要一个牛皮纸袋。',
      },
      en: {
        title: 'Happiness, fresh from the oven',
        paragraphs: [
          'Passed the bakery just as a fresh batch came out. The paper bag was warm in my hands. Broke off a piece before I even made it home.',
          'Crisp outside, soft inside. Nothing big happened today, but this bread deserves a page of its own.',
        ],
        aside: 'Sometimes happiness fits inside a brown paper bag.',
      },
    },
  },
  {
    id: 'desk-corner',
    date: '2026-11-09',
    category: 'daily',
    text: {
      zh: {
        title: '整理了桌子的一个角落',
        paragraphs: [
          '把堆在键盘旁边的东西挪开，擦掉杯底留下的圆圈，又把那盆长得慢吞吞的绿植移到了窗边。桌子还是那张桌子，看着却轻松了一点。',
          '翻出一张不知道什么时候留下的小票，背面写着一个已经忘记的点子。先把它夹进本子里，说不定哪天又用得上。',
        ],
      },
      en: {
        title: 'One tidy corner of the desk',
        paragraphs: [
          'Moved the pile beside my keyboard, wiped away a ring left by a mug, and put my very slow-growing plant by the window. Same desk, a little more breathing room.',
          'Found an old receipt with a forgotten idea scribbled on the back. Tucked it into my notebook. Maybe it will come in handy one day.',
        ],
      },
    },
  },
  {
    id: 'unfinished-things',
    date: '2026-11-05',
    category: 'thoughts',
    text: {
      zh: {
        title: '关于那些没做完的事',
        paragraphs: [
          '以前总想等到想法完整了再写，等到有整块的时间再开始。后来发现，很多事情就这样一直停在了「等一等」。',
          '所以先写几句，先做一点。像这个手记一样，不一定有结论，也不必每次都说得很漂亮。留下一点痕迹，就已经很好。',
        ],
        aside: '今天的进度：开始了。',
      },
      en: {
        title: 'A note on unfinished things',
        paragraphs: [
          'I used to wait for a complete idea before writing, or a wide-open afternoon before starting. A lot of things ended up permanently waiting.',
          'So here are a few lines, a small beginning. Like this scrapbook, it doesn’t need a conclusion or perfect words every time. Leaving a little trace is enough.',
        ],
        aside: 'Today’s progress: started.',
      },
    },
  },
  {
    id: 'evening-sky',
    date: '2026-11-02',
    category: 'joys',
    text: {
      zh: {
        title: '抬头的那几秒',
        paragraphs: [
          '傍晚去扔垃圾，本来急着回来，结果在楼下站了好一会儿。天边的云像被水彩晕开，粉色和橘色混在一起。',
          '手机没带，没拍下来。也好，有些风景可以只存在记忆里。回来的时候，顺手把窗帘拉开了一点。',
        ],
      },
      en: {
        title: 'Those few seconds looking up',
        paragraphs: [
          'Took the rubbish downstairs, meaning to hurry back, and ended up standing outside for a while. The clouds looked like watercolours bleeding together, pink into orange.',
          'Left my phone upstairs, so there’s no photo. That’s okay. Some views can live only in memory. Opened the curtains a little wider when I got back.',
        ],
      },
    },
  },
];

export default notesData;
