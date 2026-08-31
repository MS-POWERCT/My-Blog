import SITE_CONFIG from "@/config";
const { vhMusicApi } = SITE_CONFIG;
import { $GET } from '@/utils/index'
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

// 初始化音乐播放器
export default async (MusicList: any[]) => {
  const musicDOM: any = document.querySelectorAll(".vh-node.vh-vhMusic");
  if (!musicDOM.length) return;
  musicDOM.forEach(async (container: any) => {
    const { type = 'song', server = 'netease', id, url, name, artist, cover, lrc } = container.dataset;
    const audio = url
      ? [{ name: name || 'Music', artist: artist || '', url, cover: cover || '', lrc: lrc || '' }]
      : await $GET(`${vhMusicApi}?server=${server}&type=${type}&id=${id}&r=${Math.random()}`);
    const ap = new APlayer({ container, audio, lrcType: url ? 0 : 3 });
    MusicList.push(ap);
  });
};
