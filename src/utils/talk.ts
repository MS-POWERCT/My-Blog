type TalkVideo = string | { url: string; poster?: string }
type TalkMusic = string | {
  id?: string
  server?: string
  type?: string
  url?: string
  name?: string
  artist?: string
  cover?: string
}
export type TalkExtra = {
  images?: string[]
  videos?: TalkVideo[]
  musics?: TalkMusic[]
  iframes?: string[]
  html?: string
}

/** 多行正文：换行会变成 <br/>；图片 / 视频 / 音乐单独传 */
export function talk(raw: string, extra: string[] | TalkExtra = []) {
  const media: TalkExtra = Array.isArray(extra) ? { images: extra } : extra
  const lines = raw.replace(/^\n/, '').replace(/\n\s*$/, '').split('\n')
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)?.[0].length ?? 0)
  const min = indents.length ? Math.min(...indents) : 0
  const body = lines.map((l) => l.slice(min)).join('<br/>')

  const videos = (media.videos || [])
    .map((item) => {
      const url = typeof item === 'string' ? item : item.url
      const poster = typeof item === 'string' ? '' : item.poster || ''
      return `<section class="vh-node vh-vhVideo" data-url="${url}" data-poster="${poster}"><section class="vh-space-loading"><span></span><span></span><span></span></section></section>`
    })
    .join('')

  const musics = (media.musics || [])
    .map((item) => {
      if (typeof item !== 'string' && item.url) {
        const name = item.name || ''
        const artist = item.artist || ''
        const cover = item.cover || ''
        return `<section class="vh-node vh-vhMusic" data-url="${item.url}" data-name="${name}" data-artist="${artist}" data-cover="${cover}"></section>`
      }
      const id = typeof item === 'string' ? item : item.id || ''
      const server = typeof item === 'string' ? 'netease' : item.server || 'netease'
      const type = typeof item === 'string' ? 'song' : item.type || 'song'
      return `<section class="vh-node vh-vhMusic" data-id="${id}" data-server="${server}" data-type="${type}"></section>`
    })
    .join('')

  const iframes = (media.iframes || [])
    .map((src) => `<div class="vh-talk-embed"><iframe src="${src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`)
    .join('')

  const gallery = (media.images || []).length
    ? `<p class="vh-img-flex">${media.images!.map((src) => `<img src="${src}">`).join('')}</p>`
    : ''

  return body + videos + musics + iframes + gallery + (media.html || '')
}
