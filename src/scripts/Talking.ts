
import vh from 'vh-plugin'
import { fmtDate } from '@/utils/index'
import { $GET } from '@/utils/index'
// 图片懒加载
import vhLzImgInit from "@/scripts/vhLazyImg";

const GAP = 10
let galleryResizeBound = false

const isRealPhoto = (img: HTMLImageElement) =>
  img.complete && img.naturalWidth > 32 && !img.src.includes('lazy-loading')

const columnCount = (n: number, width: number) => {
  if (n <= 1) return 1
  if (width <= 568) return Math.min(2, n)
  return Math.min(3, n)
}

const layoutGallery = (gallery: HTMLElement) => {
  const imgs = [...gallery.querySelectorAll(':scope > img')] as HTMLImageElement[]
  if (!imgs.length) return

  if (imgs.length === 1) {
    gallery.classList.add('is-single')
    gallery.classList.remove('is-masonry')
    gallery.style.height = ''
    imgs[0].removeAttribute('style')
    return
  }

  gallery.classList.remove('is-single')
  gallery.classList.add('is-masonry')

  const width = gallery.clientWidth
  if (width <= 0) return

  const cols = columnCount(imgs.length, width)
  const colW = (width - GAP * (cols - 1)) / cols
  const colH = new Array(cols).fill(0)

  imgs.forEach((img) => {
    const ratio = isRealPhoto(img) ? img.naturalHeight / img.naturalWidth : 3 / 4
    const h = colW * ratio
    const col = colH.indexOf(Math.min(...colH))
    img.style.position = 'absolute'
    img.style.width = `${colW}px`
    img.style.height = `${h}px`
    img.style.left = `${col * (colW + GAP)}px`
    img.style.top = `${colH[col]}px`
    colH[col] += h + GAP
  })

  gallery.style.height = `${Math.max(...colH) - GAP}px`
}

const layoutTalkGalleries = () => {
  document.querySelectorAll<HTMLElement>('main.talking-main .vh-img-flex').forEach(layoutGallery)
}

const bindTalkGalleries = (root: Element) => {
  root.querySelectorAll<HTMLImageElement>('.vh-img-flex > img').forEach((img) => {
    img.addEventListener('load', () => {
      const gallery = img.parentElement as HTMLElement | null
      if (gallery?.classList.contains('vh-img-flex')) layoutGallery(gallery)
    })
  })
  layoutTalkGalleries()
  if (galleryResizeBound) return
  galleryResizeBound = true
  let resizeTimer = 0
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(layoutTalkGalleries, 120)
  })
}

const TalkingInit = async (data: any) => {
  const talkingDOM = document.querySelector('.main-inner-content>.vh-tools-main>main.talking-main')
  if (!talkingDOM) return;
  try {
    let res = data;
    if (typeof data === 'string') {
      res = await $GET(data);
    }
    talkingDOM.innerHTML = res.map((i: any) => `<article><header><img data-vh-lz-src="/assets/images/avatar1.png" /><p class="info"><span>.Cheng</span><time>${fmtDate(i.date)}前</time></p></header><section class="main">${i.content}</section><footer>${i.tags.map((tag: any) => `<span>${tag}</span>`).join('')}</footer></article>`).join('');
    // 图片懒加载
    vhLzImgInit();
    bindTalkGalleries(talkingDOM);
  } catch {
    vh.Toast('获取数据失败')
  }
}


// 动态说说初始化
import TALKING_DATA from "@/page_data/Talking";
const { api, data } = TALKING_DATA;
export default () => TalkingInit(api || data);