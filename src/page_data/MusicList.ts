export type MusicTrack = {
  name: string
  artist: string
  url: string
  cover: string
  /** 本地歌词路径；不填则自动找同名 .lrc */
  lrc?: string
}

const jay = '/assets/music/周杰伦/avatar.jpg'
const yunduo = '/assets/music/云朵/avatar.jpg'
const jayCover = (name: string) => `/assets/music/周杰伦/covers/${name}.jpg`

/** 音乐页歌单：按歌手放在 public/assets/music/{歌手}/ 下，文件命名 `歌名.mp3` + 同名 `歌名.lrc` */
export default [
  { name: '爱在西元前', artist: '周杰伦', url: '/assets/music/周杰伦/爱在西元前.mp3', cover: jay },
  { name: '简单爱', artist: '周杰伦', url: '/assets/music/周杰伦/简单爱.mp3', cover: jay },
  { name: '双节棍', artist: '周杰伦', url: '/assets/music/周杰伦/双节棍.mp3', cover: jay },
  { name: '对不起', artist: '周杰伦', url: '/assets/music/周杰伦/对不起.mp3', cover: jay },
  { name: '东风破', artist: '周杰伦', url: '/assets/music/周杰伦/东风破.mp3', cover: jay },
  { name: '花海', artist: '周杰伦', url: '/assets/music/周杰伦/花海.mp3', cover: jay },
  { name: '兰亭序', artist: '周杰伦', url: '/assets/music/周杰伦/兰亭序.mp3', cover: jay },
  { name: '七里香', artist: '周杰伦', url: '/assets/music/周杰伦/七里香.mp3', cover: jay },
  { name: '三年二班', artist: '周杰伦', url: '/assets/music/周杰伦/三年二班.mp3', cover: jay },
  { name: '说好的幸福呢', artist: '周杰伦', url: '/assets/music/周杰伦/说好的幸福呢.mp3', cover: jay },
  { name: '以父之名', artist: '周杰伦', url: '/assets/music/周杰伦/以父之名.mp3', cover: jay },
  { name: '夜曲', artist: '周杰伦', url: '/assets/music/周杰伦/夜曲.mp3', cover: jayCover('夜曲') },
  { name: '稻香', artist: '周杰伦', url: '/assets/music/周杰伦/稻香.mp3', cover: jay },
  { name: '等你下课', artist: '周杰伦', url: '/assets/music/周杰伦/等你下课.mp3', cover: jay },
  { name: '告白气球', artist: '周杰伦', url: '/assets/music/周杰伦/告白气球.mp3', cover: jay },
  { name: '最后的战役', artist: '周杰伦', url: '/assets/music/周杰伦/最后的战役.mp3', cover: jay },
  { name: '流浪诗人', artist: '周杰伦', url: '/assets/music/周杰伦/流浪诗人.mp3', cover: jay },
  { name: '米兰的小铁匠', artist: '周杰伦', url: '/assets/music/周杰伦/米兰的小铁匠.mp3', cover: jay },
  { name: '麦芽糖', artist: '周杰伦', url: '/assets/music/周杰伦/麦芽糖.mp3', cover: jayCover('麦芽糖') },
  { name: '青花瓷', artist: '周杰伦', url: '/assets/music/周杰伦/青花瓷.mp3', cover: jay },
  { name: '说走就走', artist: '周杰伦', url: '/assets/music/周杰伦/说走就走.mp3', cover: jay },
  { name: '土耳其冰淇淋', artist: '周杰伦', url: '/assets/music/周杰伦/土耳其冰淇淋.mp3', cover: jay },
  { name: '我的楼兰', artist: '云朵', url: '/assets/music/云朵/我的楼兰.mp3', cover: yunduo },
] as MusicTrack[]
