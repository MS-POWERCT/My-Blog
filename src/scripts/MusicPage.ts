import MUSIC_LIST, { type MusicTrack } from "@/page_data/MusicList";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";

const sameNameLrc = (url: string) => url.replace(/\.(mp3|wav|m4a|ogg|flac)$/i, ".lrc");
const loops = ["all", "one", "none"] as const;
const loopText = { all: "列表循环", one: "单曲循环", none: "不循环" };

const toAudio = (tracks: MusicTrack[]) =>
  tracks.map((track) => ({
    name: track.name,
    artist: track.artist,
    url: track.url,
    cover: track.cover,
    lrc: track.lrc || sameNameLrc(track.url),
  }));

let spaceHandler: ((e: KeyboardEvent) => void) | null = null;

const bindSpace = (ap: any) => {
  if (spaceHandler) window.removeEventListener("keydown", spaceHandler);
  spaceHandler = (e: KeyboardEvent) => {
    if (e.code !== "Space" && e.key !== " ") return;
    const el = e.target as HTMLElement;
    if (el.closest("input, textarea, select, [contenteditable='true']")) return;
    if (!document.querySelector(".vh-tools-main>main.music-main")) return;
    e.preventDefault();
    ap.toggle();
  };
  window.addEventListener("keydown", spaceHandler);
};

const fmt = (sec = 0) => {
  if (!Number.isFinite(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const bindStage = (ap: any, tracks: MusicTrack[], root: Element) => {
  const cover = root.querySelector<HTMLImageElement>(".vh-music-cover");
  const title = root.querySelector(".vh-music-title");
  const artist = root.querySelector(".vh-music-artist");
  const stage = root.querySelector(".vh-music-stage");
  const lrcBox = root.querySelector(".vh-music-lrc-box");
  const playBtn = root.querySelector(".vh-music-play");
  const loopBtn = root.querySelector(".vh-music-loop");
  const played = root.querySelector<HTMLElement>(".vh-music-played");
  const time = root.querySelector(".vh-music-time");
  const vol = root.querySelector<HTMLInputElement>(".vh-music-vol");
  const lrc = root.querySelector(".aplayer-lrc");
  if (lrcBox) lrcBox.innerHTML = "";
  if (lrc && lrcBox) lrcBox.appendChild(lrc);

  const paint = () => {
    const index = ap.list?.index ?? 0;
    const track = tracks[index] || tracks[0];
    if (!track) return;
    if (cover && cover.getAttribute("src") !== track.cover) cover.setAttribute("src", track.cover);
    if (title) title.textContent = track.name;
    if (artist) artist.textContent = track.artist;
  };

  const paintTime = () => {
    const duration = ap.audio.duration || 0;
    const current = ap.audio.currentTime || 0;
    if (played) played.style.width = duration ? `${(current / duration) * 100}%` : "0%";
    if (time) time.textContent = `${fmt(current)} / ${fmt(duration)}`;
  };

  const paintLoop = () => {
    if (loopBtn) loopBtn.textContent = loopText[ap.options.loop as keyof typeof loopText] || "列表循环";
  };

  paint();
  paintLoop();
  if (vol) vol.value = String(ap.audio.volume ?? 0.7);

  ap.on("listswitch", () => paint());
  ap.on("playing", () => paint());
  ap.on("canplay", () => paint());
  ap.on("play", () => {
    stage?.classList.add("is-playing");
    if (playBtn) playBtn.textContent = "暂停";
  });
  ap.on("pause", () => {
    stage?.classList.remove("is-playing");
    if (playBtn) playBtn.textContent = "播放";
  });
  ap.audio.addEventListener("timeupdate", paintTime);
  ap.audio.addEventListener("durationchange", paintTime);
  root.querySelector(".aplayer-list")?.addEventListener("click", () => setTimeout(paint, 0));

  root.querySelector(".vh-music-prev")?.addEventListener("click", () => ap.skipBack());
  playBtn?.addEventListener("click", () => ap.toggle());
  root.querySelector(".vh-music-disc-toggle")?.addEventListener("click", () => ap.toggle());
  root.querySelector(".vh-music-next")?.addEventListener("click", () => ap.skipForward());
  loopBtn?.addEventListener("click", () => {
    const next = loops[(loops.indexOf(ap.options.loop) + 1) % loops.length];
    ap.options.loop = next;
    paintLoop();
  });
  vol?.addEventListener("input", () => ap.volume(Number(vol.value), true));
  root.querySelector(".vh-music-bar")?.addEventListener("click", (e) => {
    const bar = e.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, ((e as MouseEvent).clientX - rect.left) / rect.width));
    if (ap.audio.duration) ap.seek(ratio * ap.audio.duration);
  });
};

export default async (MusicList: any[]) => {
  const box = document.querySelector(".vh-tools-main>main.music-main");
  if (!box) return;

  const artists = [...new Set(MUSIC_LIST.map((i) => i.artist))];
  const filters = ["全部", ...artists]
    .map((name, idx) => `<button type="button" class="vh-music-filter${idx === 0 ? " active" : ""}" data-artist="${name === "全部" ? "" : name}">${name}</button>`)
    .join("");

  box.innerHTML = `
    <div class="vh-music-page">
      <div class="vh-music-filters">${filters}</div>
      <div class="vh-music-stage">
        <div class="vh-music-visual">
          <span class="vh-music-orbit"></span>
          <span class="vh-music-orbit vh-music-orbit-2"></span>
          <div class="vh-music-eq"><i></i><i></i><i></i><i></i><i></i></div>
          <div class="vh-music-disc">
            <img class="vh-music-cover" alt="" />
          </div>
          <button type="button" class="vh-music-disc-toggle" aria-label="播放或暂停"></button>
        </div>
        <div class="vh-music-meta">
          <h2 class="vh-music-title"></h2>
          <p class="vh-music-artist"></p>
          <div class="vh-music-lrc-box"></div>
          <div class="vh-music-controls">
            <div class="vh-music-bar"><i class="vh-music-played"></i></div>
            <div class="vh-music-toolbar">
              <button type="button" class="vh-music-prev">上一首</button>
              <button type="button" class="vh-music-play">播放</button>
              <button type="button" class="vh-music-next">下一首</button>
              <button type="button" class="vh-music-loop">列表循环</button>
              <span class="vh-music-time">00:00 / 00:00</span>
              <label class="vh-music-vol-wrap">音量<input class="vh-music-vol" type="range" min="0" max="1" step="0.01" value="0.7"></label>
            </div>
          </div>
        </div>
      </div>
      <div class="vh-music-player"></div>
    </div>`;

  const container = box.querySelector(".vh-music-player");
  const page = box.querySelector(".vh-music-page");
  if (!container || !page) return;

  let ap: any = null;
  const mount = (tracks: MusicTrack[]) => {
    if (ap) {
      ap.destroy();
      const i = MusicList.indexOf(ap);
      if (i >= 0) MusicList.splice(i, 1);
    }
    ap = new APlayer({
      container,
      audio: toAudio(tracks),
      lrcType: 3,
      loop: "all",
      listFolded: false,
      listMaxHeight: "360px",
      preload: "metadata",
    });
    MusicList.push(ap);
    bindStage(ap, tracks, page);
    bindSpace(ap);
    const nativeBar = container.querySelector<HTMLElement>(".aplayer-body");
    if (nativeBar) nativeBar.style.display = "none";
  };

  mount(MUSIC_LIST);

  box.querySelectorAll<HTMLButtonElement>(".vh-music-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      box.querySelectorAll(".vh-music-filter").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      const artist = btn.dataset.artist || "";
      mount(artist ? MUSIC_LIST.filter((i) => i.artist === artist) : MUSIC_LIST);
    });
  });
};
