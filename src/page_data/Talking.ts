import { talk } from '@/utils/talk'

export default {
  // API 接口请求优先，数据格式保持和 data 一致
  api: '',
  // api 为空则使用 data 静态数据
  // 注意：图片请用 vh-img-flex 类包裹（talk 的第二参数会自动生成）
  data: [
    {
      date: '2026-09-01 01:12',
      tags: ['日常', '音乐'],
      content: talk(`
        再来一首周杰伦的《以父之名》。
        。
      `, {
        musics: [{
          url: '/assets/music/周杰伦-以父之名.mp3',
          name: '以父之名',
          artist: '周杰伦',
          cover: '/assets/music/avatars/周杰伦.jpg',
        }],
      })
    },
    {
      date: '2026-09-01 00:35',
      tags: ['日常', '音乐'],
      content: talk(`
        来一首云朵的《我的楼兰》。
        。
        `, {
        musics: [{
          url: '/assets/music/云朵-我的楼兰.mp3',
          name: '我的楼兰',
          artist: '云朵',
          cover: '/assets/music/avatars/云朵.jpg',
        }],
      })
    },
    {
      date: '2026-08-26 20:30',
      tags: ['日常', '开发'],
      content: talk(`
        从昨天到今天，我一直在开发「自律青年」App 2.0 版本。我花费了139元开通了Cursor 月会员，付费的东西就是速度快。
        我快速的完成了2.0的代码开发并新增了体重记录功能
     `)
    },
    {
      date: '2026-08-25 22:30',
      tags: ['日常', '开发'],
      content: talk(`
        今天，我准备开始「自律青年」App 2.0 版本的开发。这次主要是把原先的 UI 整体换掉，再补上一些新功能。
        我的做法还是老样子：先让 AI 根据原先页面做出新UI图，再让它对着代码文件逐个修改。
        想到这儿，我突然觉得有点可笑。
        其实 1.0 版本一开始，我也是用 AI 写的。写着写着发现，它生成的代码里有大量我认为多余的东西，还堆出了许多个页面。我就想，这样下去，这个项目迟早会变得连我自己都看不懂。于是我干脆自己写了一个 main.css 做全局样式，之后尽量反复调用，又把 AI 原先生成的那些文件代码，一个一个地替换掉。
        我记得，这花了很长、很长时间。
        而现在做 2.0，我却不想再自己动手了，有点改不动了。彻底拥抱 AI 吧——它做成什么样，就是什么样。
        我只是觉得，那十天，我好像在做一件很无用的事。
      `)
    },
    {
      date: '2026-08-23 22:30',
      tags: ['日常', '婚礼'],
      content: talk(`
        今天去参加了一场婚礼，新郎新娘都是我初三同班同学，从相识到现在，两个人携手走过了好多年，终于在今天步入了婚姻的殿堂。
        同班来的人不多，就我和另外一位，还有几个同校时认识的朋友，其余的大多是他高中甚至更晚阶段结识的人。忽然就觉得，人生大抵如此——大多数人都只是生命中的过客，彼此陪伴走过一程，然后各自散去。
        大家都许久未见，坐在一起反倒有些生疏，不知道该聊些什么。我自己也已经当爸爸了，大半时间都在旁边照看小孩。
      `, [
        '/assets/images/talking/xsy_yql/tglns-4ly6y.jpg',
        '/assets/images/talking/xsy_yql/tqr3h-tnysf.jpg',
        '/assets/images/talking/xsy_yql/txlze-66dej.jpg',
        '/assets/images/talking/xsy_yql/tf1gl-rbbmv.jpg',
      ])
    },
    {
      date: '2026-08-20 22:30',
      tags: ['日常', '卤牛腱子'],
      content: talk(`
        上次的牛腱子吃的很开心，很成功所以我决定再做一份，这次买的更多2.5斤，同样的做法同样的配料，味道没什么区别。
        但是还是增加了一些经验，原来一头牛有12个牛腱子，又分为不同的名字比如：金钱腱，三花腱，肉腱等，不同的腱子肉做不同的食物会好吃很多
        所以我下次还要再使用最好的腱子肉做一次
      `)
    },
    {
      date: '2026-08-11 22:30',
      tags: ['日常', '德州扑克'],
      content: talk(`
        家里没电费了，父亲还有哥哥都在老家，所以决定玩德州扑克，输了都冲电费。上一次我输50，这次输250。
        哎，还是不够沉稳，但<b> all in </b>那把我<b> 910JQK </b>,遇到<b> 10JQKA </b>我有什么办法
      `)
    },
    {
      date: '2026-08-11 18:30',
      tags: ['日常', '卤牛腱子'],
      content: talk(`
        今天做了一份卤牛腱子，还挺简单的，买好牛腱子买好桂皮八角一些东西，反正跟着视频中去做，就做出来了味道很不错。
        然后发现以前不做是因为不会，现在要考虑的是牛腱子还挺贵的，一斤多做出来后并没有多少，不过至少干净吧，
        计算一下料加牛肉大概72元，做出来的肉用来搭配面应该可以做8-10碗，这样就比较经济了平时自己在家煮面放点青菜然后切点牛腱子就很不错
      `)
    },
    {
      date: '2026-08-10 22:30',
      tags: ['日常'],
      content: talk(`今天去上饶给麻将馆的自助售货机补货，补了4箱水。然后去万达广场买菜，买了牛腱子。`)
    },
    {
      date: '2026-08-04 23:30',
      tags: ['日常'],
      content: talk(`
        今天老婆去剪头发了，短发，她短发挺好看的，但是不是我想象中的那样整齐的，而是另外一种
        第二张之前的短发
      `, [
        '/assets/images/talking/4befec3764997dc20fce4d60dcab10.JPG',
        '/assets/images/talking/IMG_1066.JPG',
      ])
    },
    {
      date: '2026-08-04 23:12',
      tags: ['日常', '打麻将'],
      content: talk(`我在上饶红星美凯龙开了一家自助麻将馆.不为赚钱，交个朋友`)
    },
    {
      date: '2026-07-30 15:05:00',
      tags: ['日常'],
      content: talk(`今天突然下暴雨，家里的被子没收难受了，然后家里阳台没做好，暴雨直接从阳台流进客厅中`)
    },
    {
      date: '2026-07-26 23:05:00',
      tags: ['日常', '遥远的救世主'],
      content: talk(`股市它实质不产生价值，它只是把多数人口袋里的钱转移到少部分人口袋里。`)
    },
    {
      date: '2026-07-26 22:58:00',
      tags: ['日常', '遥远的救世主'],
      content: talk(`
        自嘲 -丁元英
        本是后山人，偶做前堂客。
        醉舞经阁半卷书，坐井说天阔。
        大志戏功名，海斗量福祸。
        论到囊中羞涩时，怒指乾坤错
      `)
    },
    {
      date: '2026-07-24 22:58:00',
      tags: ['日常', '废话', '柏拉图'],
      content: talk(`柏拉图说过：一人做事一人当，小叮做事小叮当，当当做事当当当`)
    },
    {
      date: '2026-07-24 00:00:00',
      tags: ['日常', '图片'],
      content: talk('', [
        '/assets/images/talking/people/IMG_0059.JPG',
        '/assets/images/talking/people/IMG_0062.JPG',
      ])
    },
    {
      date: '2026-07-23 14:00:00',
      tags: ['日常', '图片', '旅行'],
      content: talk(`2020武功山之行：徒步登山，穿越草甸，云海翻涌如仙境，星空璀璨似银河。一步一景，皆是难忘的回忆。`, [
        '/assets/images/talking/wugushan/AAA_3065.JPG',
        '/assets/images/talking/wugushan/AAA_3106.JPG',
        '/assets/images/talking/wugushan/AAA_3294.jpg',
        '/assets/images/talking/wugushan/IMG_6105.JPG',
        '/assets/images/talking/wugushan/IMG_6128.JPG',
        '/assets/images/talking/wugushan/IMG_6177.jpg',
        '/assets/images/talking/wugushan/IMG_6240.JPG',
        '/assets/images/talking/wugushan/IMG_6242.JPG',
        '/assets/images/talking/wugushan/IMG_6244.JPG',
        '/assets/images/talking/wugushan/IMG_6245.JPG',
        '/assets/images/talking/wugushan/IMG_6246.JPG',
        '/assets/images/talking/wugushan/IMG_6247.JPG',
        '/assets/images/talking/wugushan/IMG_6249.JPG',
        '/assets/images/talking/wugushan/IMG_6250.JPG',
        '/assets/images/talking/wugushan/IMG_8848.JPG',
        '/assets/images/talking/wugushan/IMG_8850.JPG',
        '/assets/images/talking/wugushan/sajdhkj.jpg',
      ])
    },
    {
      date: '2026-07-23 11:31:06',
      tags: ['日常'],
      content: talk(`西西弗书店`, [
        '/assets/images/talking/people/xixifushudian.jpg',
      ])
    },
    {
      date: '2026-07-21 23:31:06',
      tags: ['日常', '图片'],
      content: talk('', [
        '/assets/images/talking/people/IMG_2541.JPG',
        '/assets/images/talking/people/IMG_2540.JPG',
        '/assets/images/talking/people/IMG_2539.JPG',
      ])
    },
    {
      date: '2026-07-21 23:21:06',
      tags: ['日常'],
      content: talk(`今天是宝贝登录地球online的140天，我发现今天她会往前移动了，不是爬，通过小脚往前蹭每次前进一点点，真是一个神奇的现象。`)
    },
    {
      date: '2026-07-21 23:11:06',
      tags: ['日常'],
      content: talk(`
        今天终于把9年前用表弟身份证办理的手机卡过户回自己名下了。这期间拉着表弟跑了好几趟营业厅，打了无数次电话，时间线拉得很长。
        2017年刚出社会，想办一张自己的手机卡，让表弟陪我去镇上营业厅。结果我没带身份证，老板说用表弟的也行，当时图方便就没回去拿。
        多年后子弹正中眉心——很多需要本人身份证办理的业务都因为这张卡受阻。今天终于通过中国移动APP线上过户完成了这件事。
        得出的经验：很多事情千万不要贪图一时方便，不然后面的麻烦会成倍反噬自己。
      `)
    },
    {
      date: '2025-07-21 23:11:06',
      tags: ['日常', '旅行', '图片'],
      content: talk(`
        2025年10月左右去了趟景德镇，瓷都这名号不是白叫的，满街都是和陶瓷有关的东西。
        逛了陶溪川，老厂房改成的创意园区，白天看展、晚上灯光亮起来更有味道；也去了雕塑瓷厂，小店一家挨着一家，挑来挑去眼睛都花了。
        御窑博物馆那边建筑很特别，里面讲的历史和瓷器工艺，外行看热闹也觉得有意思。
        还吃了当地的小炒，辣是辣，但下饭。带回来几件小玩意，摆在桌上看着就开心。
      `, [
        '/assets/images/talking/jingdezhen/IMG_1693.JPG',
        '/assets/images/talking/jingdezhen/IMG_1694.JPG',
        '/assets/images/talking/jingdezhen/IMG_1695.JPG',
        '/assets/images/talking/jingdezhen/IMG_1755.JPG',
        '/assets/images/talking/jingdezhen/IMG_1769.JPG',
        '/assets/images/talking/jingdezhen/IMG_1793.JPG',
        '/assets/images/talking/jingdezhen/IMG_1819.JPG',
        '/assets/images/talking/jingdezhen/IMG_1848.JPG',
        '/assets/images/talking/jingdezhen/IMG_1934.JPG',
        '/assets/images/talking/jingdezhen/IMG_1949.JPG',
        '/assets/images/talking/jingdezhen/IMG_2042.JPG',
      ])
    },
    {
      date: '2026-07-21 22:41:06',
      tags: ['日常', '旅行', '图片'],
      content: talk(`
        这次和下面香港之旅是一趟出来的，先在大湾区转了转。
        广州的第一顿早茶我就很喜欢，一屉一屉地上，虾饺、肠粉、凤爪……吃着吃着时间就慢下来了。还有乳鸽，皮脆肉嫩，印象挺深。
        我们去的一个美团评分很高的老店，很大但是基本都坐满了，中老年比较多。
        去看了广州塔，江边走走，风也舒服。广州圣心大教堂，很漂亮。
        之后又去了深圳，在海边那个公园吹了吹风，逛了万象天地，还去了华强北——电子产品一条街上，看什么都新鲜。
      `, [
        '/assets/images/talking/guanzhou/IMG_2091.JPG',
        '/assets/images/talking/guanzhou/IMG_2104.JPG',
        '/assets/images/talking/guanzhou/IMG_2111.JPG',
        '/assets/images/talking/guanzhou/IMG_2160.JPG',
        '/assets/images/talking/guanzhou/IMG_2206.JPG',
        '/assets/images/talking/guanzhou/IMG_2216.JPG',
        '/assets/images/talking/guanzhou/IMG_2238.JPG',
        '/assets/images/talking/guanzhou/IMG_2258.JPG',
        '/assets/images/talking/guanzhou/IMG_2307.JPG',
        '/assets/images/talking/guanzhou/IMG_2320.JPG',
        '/assets/images/talking/guanzhou/IMG_2327.JPG',
        '/assets/images/talking/guanzhou/IMG_2351.JPG',
        '/assets/images/talking/guanzhou/IMG_2513.JPG',
        '/assets/images/talking/guanzhou/IMG_2534.JPG',
      ])
    },
    {
      date: '2026-07-21 22:41:06',
      tags: ['日常', '旅行', '图片'],
      content: talk(`香港之旅，穿梭在霓虹闪烁的街头，感受东西方文化交融的独特魅力。维多利亚港的海风、庙街的烟火气、太平山顶的夜景...每一帧都是难忘的记忆。`, [
        '/assets/images/talking/hangkang/IMG_2491.JPG',
        '/assets/images/talking/hangkang/IMG_2469.JPG',
        '/assets/images/talking/hangkang/IMG_2405.JPG',
        '/assets/images/talking/hangkang/IMG_2448.JPG',
        '/assets/images/talking/hangkang/IMG_2439.JPG',
        '/assets/images/talking/hangkang/IMG_2407.JPG',
        '/assets/images/talking/hangkang/IMG_2426.JPG',
        '/assets/images/talking/hangkang/IMG_2414.JPG',
        '/assets/images/talking/hangkang/IMG_2412.JPG',
        '/assets/images/talking/hangkang/IMG_2402.JPG',
        '/assets/images/talking/hangkang/IMG_2409.JPG',
        '/assets/images/talking/hangkang/IMG_2394.JPG',
        '/assets/images/talking/hangkang/IMG_2380.JPG',
        '/assets/images/talking/hangkang/IMG_2397.JPG',
        '/assets/images/talking/hangkang/IMG_2391.JPG',
      ])
    },
    {
      date: '2026-07-21 22:31:06',
      tags: ['语录'],
      content: talk(`
        人生在世，无非是让别人笑笑，偶尔，也笑笑别人。
        ——郭德纲
      `)
    },
    {
      date: '2026-07-21 22:21:06',
      tags: ['语录'],
      content: talk(`
        自由固不是钱所能买到的，但能够为钱所卖掉。
        ——《娜拉走后怎样》鲁迅
      `)
    },
    {
      date: '2026-07-21 22:11:06',
      tags: ['语录'],
      content: talk(`
        楼下一个男人病得要死， 那间隔壁的一家唱着留声机， 对面是弄孩子， 楼上有两人狂笑， 还有打牌声， 河中的船上有女人哭着她死去的母亲， 人类的悲欢并不相通， 我只觉得他们吵闹。
        ——《而已集•小杂感》鲁迅
      `)
    },
    {
      date: '2026-07-19 20:41:06',
      tags: ['日常', '图片'],
      content: talk(`最近拍的一些照片，记录生活中的点点滴滴。`, [
        '/assets/images/talking/people/IMG_2660.JPG',
        '/assets/images/talking/people/IMG_2770.JPG',
        '/assets/images/talking/people/IMG_2571.JPG',
        '/assets/images/talking/people/IMG_2537.JPG',
        '/assets/images/talking/people/IMG_2538.JPG',
        '/assets/images/talking/people/IMG_2766.JPG',
        '/assets/images/talking/people/IMG_2771.JPG',
        '/assets/images/talking/people/IMG_2667.JPG',
        '/assets/images/talking/people/IMG_2765.JPG',
        '/assets/images/talking/people/IMG_2590.JPG',
      ])
    },
    {
      date: '2026-07-19 18:54:06',
      tags: ['语录'],
      content: talk(`
        长夜将至、我从今开始守望、至死方休。
        我将不娶妻、不封地、不生子。
        我将不戴宝冠、不争荣宠。
        我将尽忠职守、生死于斯。
        我是黑暗中的利剑、长城上的守卫、
        抵御寒冷的烈焰、破晓时分的光线、
        唤醒眠者的号角、守护王国的坚盾。
        我将生命与荣耀献给守夜人、今夜如此、夜夜皆然。
        ——《权力的游戏》守夜人誓言
      `)
    },
    {
      date: '2026-07-19 18:47:06',
      tags: ['语录'],
      content: talk(`
        如果你非要像疯狗般行事，别人也会把你视为疯狗，呼来喝去，最后杀了喂猪。
        ——《权力的游戏》卢斯·波顿
      `)
    },
    {
      date: '2026-07-19 18:22:06',
      tags: ['语录'],
      content: talk(`
        眼泪并不是女人唯一的武器，最厉害的武器在两腿之间
        ——《权力的游戏》瑟曦
      `)
    },
    {
      date: '2026-07-19 18:42:06',
      tags: ['语录'],
      content: talk(`
        我不知道我做了什么，让你如此不尊重我
        ——《教父》维托·唐·科莱昂
      `)
    },
    {
      date: '2026-07-19 18:04:06',
      tags: ['语录'],
      content: talk(`
        不经常与家人呆在一起的男人，永远也成不了真正的男人。
        ——《教父》维托·唐·科莱昂
      `)
    },
    {
      date: '2026-07-19 10:04:06',
      tags: ['语录'],
      content: talk(`
        我可以一直向你伸手，但我手举久了也会累，肩膀也很酸，别人都在看着，我也很难堪。
        ——《网易云音乐》
      `)
    },
    {
      date: '2026-07-19 10:04:06',
      tags: ['语录'],
      content: talk(`
        当心灵开始说话，理智站出来反对，是不恰当的
        ——《不能承受的生命之轻》
      `)
    },
    {
      date: '2026-07-19 10:04:06',
      tags: ['语录'],
      content: talk(`
        别人心里你什么样子， 大多时候早就确定好了， 无论做多少努力， 最后也只会沦为佐证他想法的证据罢了。
        ——德卡先生
      `)
    },
    {
      date: '2026-07-17 15:04:06',
      tags: ['诗词'],
      content: talk(`
        练得身形似鹤形
        千株松下两函经
        我来问道无余话
        云在青天水在瓶
        ——《大明王朝1566》飞元真君忠孝帝君万寿帝君--嘉靖皇帝
      `)
    },
    {
      date: '2026-07-17 15:01:06',
      tags: ['诗词'],
      content: talk(`
        有人辞官归故里
        有人星夜赶科场
        少年不知愁滋味
        老来方知行路难
      `)
    },
    {
      date: '2026-07-17 14:14:06',
      tags: ['日常', '图片', '壁纸'],
      content: talk(`这些壁纸好像是一个linux的壁纸，挺好看的`, [
        '/assets/images/talking/sham.png',
        '/assets/images/talking/hai.jpg',
        '/assets/images/talking/shu.png',
        '/assets/images/talking/lu.jpg',
        '/assets/images/talking/shan.jpg',
      ])
    },
    {
      date: '2026-07-16 16:16:06',
      tags: ['日常'],
      content: talk(`记录第一条动态 holle world`)
    }
  ]
}
