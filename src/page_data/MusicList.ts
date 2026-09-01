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

/** 音乐页歌单：按歌手放在 public/assets/music/{歌手}/ 下，同名 .lrc 放同目录 */
export default [
  { name: '以父之名', artist: '周杰伦', url: '/assets/music/周杰伦/以父之名.mp3', cover: jay },
  { name: '夜曲', artist: '周杰伦', url: '/assets/music/周杰伦/夜曲.mp3', cover: '/assets/music/周杰伦/covers/夜曲.jpg' },
  { name: '麦芽糖', artist: '周杰伦', url: '/assets/music/周杰伦/麦芽糖.mp3', cover: '/assets/music/周杰伦/covers/麦芽糖.jpg' },
  { name: '三年二班', artist: '周杰伦', url: '/assets/music/周杰伦/三年二班.mp3', cover: jay },
  { name: '米兰的小铁匠', artist: '周杰伦', url: '/assets/music/周杰伦/米兰的小铁匠.mp3', cover: jay },
  { name: '稻香', artist: '周杰伦', url: '/assets/music/周杰伦/稻香.mp3', cover: jay },
  { name: '青花瓷', artist: '周杰伦', url: '/assets/music/周杰伦/青花瓷.mp3', cover: jay },
  { name: '我的楼兰', artist: '云朵', url: '/assets/music/云朵/我的楼兰.mp3', cover: yunduo },
] as MusicTrack[]
