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
let escapeHandler: ((e: KeyboardEvent) => void) | null = null;
let lrcFullscreen = false;
let fsOverlay: HTMLElement | null = null;
let stageLrcBoxRef: HTMLElement | null = null;
let fsLrcBoxRef: HTMLElement | null = null;

let fsShellReady = false;
let musicAp: any = null;
let musicTracks: MusicTrack[] = [];
let musicRoot: Element | null = null;

const closeLrcFullscreen = () => {
  const lrcEl = fsLrcBoxRef?.querySelector(".aplayer-lrc");
  if (lrcEl && stageLrcBoxRef) stageLrcBoxRef.appendChild(lrcEl);
  fsOverlay?.classList.remove("is-open");
  fsOverlay?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("vh-music-lrc-fullscreen-active");
  lrcFullscreen = false;
  if (musicRoot && musicAp?.lrc) {
    requestAnimationFrame(() => {
      syncLrcScroll(musicAp.lrc);
      requestAnimationFrame(() => syncLrcScroll(musicAp.lrc));
    });
  }
};

const getLrcWrap = () =>
  fsLrcBoxRef?.querySelector<HTMLElement>(".aplayer-lrc") ||
  stageLrcBoxRef?.querySelector<HTMLElement>(".aplayer-lrc");

const ensureLrcFullscreenShell = () => {
  if (fsOverlay) return fsOverlay;

  fsOverlay = document.createElement("div");
  fsOverlay.className = "vh-music-lrc-fullscreen";
  fsOverlay.setAttribute("aria-hidden", "true");
  fsOverlay.innerHTML = `
    <div class="vh-music-lrc-fs-inner">
      <header class="vh-music-lrc-fs-head">
        <button type="button" class="vh-music-lrc-fs-exit">退出全屏</button>
        <div class="vh-music-lrc-fs-meta">
          <strong class="vh-music-lrc-fs-title"></strong>
          <span class="vh-music-lrc-fs-artist"></span>
        </div>
        <span class="vh-music-lrc-fs-time">00:00 / 00:00</span>
      </header>
      <div class="vh-music-lrc-fs-body">
        <div class="vh-music-lrc-box"></div>
      </div>
      <footer class="vh-music-lrc-fs-foot">
        <div class="vh-music-bar vh-music-bar--fs"><i class="vh-music-played vh-music-played--fs"></i></div>
        <div class="vh-music-lrc-fs-toolbar">
          <button type="button" class="vh-music-prev--fs">上一首</button>
          <button type="button" class="vh-music-play--fs">播放</button>
          <button type="button" class="vh-music-next--fs">下一首</button>
        </div>
      </footer>
    </div>`;
  document.body.appendChild(fsOverlay);
  fsLrcBoxRef = fsOverlay.querySelector(".vh-music-lrc-fs-body .vh-music-lrc-box");
  return fsOverlay;
};

const paintFsMeta = () => {
  const track = musicTracks[musicAp?.list?.index ?? 0] || musicTracks[0];
  if (!track || !fsOverlay) return;
  const fsTitle = fsOverlay.querySelector<HTMLElement>(".vh-music-lrc-fs-title");
  const fsArtist = fsOverlay.querySelector<HTMLElement>(".vh-music-lrc-fs-artist");
  if (fsTitle) fsTitle.textContent = track.name;
  if (fsArtist) fsArtist.textContent = track.artist;
};

const setLrcFullscreen = (on: boolean) => {
  if (!stageLrcBoxRef || !fsLrcBoxRef) return;

  if (on) {
    if (lrcFullscreen) return;
    const lrcEl = stageLrcBoxRef.querySelector(".aplayer-lrc");
    if (!lrcEl) return;
    fsLrcBoxRef.appendChild(lrcEl);
    fsOverlay?.classList.add("is-open");
    fsOverlay?.setAttribute("aria-hidden", "false");
    document.body.classList.add("vh-music-lrc-fullscreen-active");
    lrcFullscreen = true;
    paintFsMeta();
    requestAnimationFrame(() => {
      syncLrcScroll(musicAp?.lrc);
      requestAnimationFrame(() => syncLrcScroll(musicAp?.lrc));
    });
  } else {
    closeLrcFullscreen();
  }
};

const toggleLrcFullscreen = () => setLrcFullscreen(!lrcFullscreen);

const paintFsTime = (current: number, duration: number, ratio: number) => {
  const fsTime = fsOverlay?.querySelector<HTMLElement>(".vh-music-lrc-fs-time");
  const fsPlayed = fsOverlay?.querySelector<HTMLElement>(".vh-music-played--fs");
  if (fsTime) fsTime.textContent = `${fmt(current)} / ${fmt(duration)}`;
  if (fsPlayed) fsPlayed.style.width = `${ratio}%`;
};

const bindLrcFullscreen = (ap: any, tracks: MusicTrack[], root: Element) => {
  musicAp = ap;
  musicTracks = tracks;
  musicRoot = root;
  ensureLrcFullscreenShell();
  stageLrcBoxRef = root.querySelector<HTMLElement>(".vh-music-stage .vh-music-lrc-box");
  if (!fsOverlay || !stageLrcBoxRef || !fsLrcBoxRef) return;

  root.querySelector(".vh-music-lrc-full")?.addEventListener("click", toggleLrcFullscreen);
  root.querySelector(".vh-music-lrc-box")?.addEventListener("dblclick", toggleLrcFullscreen);

  if (!fsShellReady) {
    fsShellReady = true;
    fsOverlay.querySelector(".vh-music-lrc-fs-exit")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeLrcFullscreen();
    });
    fsOverlay.querySelector(".vh-music-prev--fs")?.addEventListener("click", () => musicAp?.skipBack());
    fsOverlay.querySelector(".vh-music-play--fs")?.addEventListener("click", () => musicAp?.toggle());
    fsOverlay.querySelector(".vh-music-next--fs")?.addEventListener("click", () => musicAp?.skipForward());
    fsOverlay.querySelector(".vh-music-bar--fs")?.addEventListener("click", (e) => {
      const bar = e.currentTarget as HTMLElement;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, ((e as MouseEvent).clientX - rect.left) / rect.width));
      if (musicAp?.audio.duration) musicAp.seek(ratio * musicAp.audio.duration);
    });

    if (escapeHandler) window.removeEventListener("keydown", escapeHandler);
    escapeHandler = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !fsOverlay?.classList.contains("is-open")) return;
      closeLrcFullscreen();
    };
    window.addEventListener("keydown", escapeHandler);
  }

  ap.on("listswitch", paintFsMeta);
  ap.on("play", () => {
    const btn = fsOverlay?.querySelector<HTMLElement>(".vh-music-play--fs");
    if (btn) btn.textContent = "暂停";
  });
  ap.on("pause", () => {
    const btn = fsOverlay?.querySelector<HTMLElement>(".vh-music-play--fs");
    if (btn) btn.textContent = "播放";
  });

  const fsPlayBtn = fsOverlay?.querySelector<HTMLElement>(".vh-music-play--fs");
  if (fsPlayBtn) fsPlayBtn.textContent = ap.paused ? "播放" : "暂停";

  return { paintFsMeta };
};

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

/** APlayer 内置滚动步长固定 16px，与自定义行高不一致；移出 .aplayer 后还会吃到 display:none */
const syncLrcScroll = (lrc: any) => {
  if (!lrc?.container) return;
  const wrap = getLrcWrap();
  const contents = lrc.container as HTMLElement;
  const lines = contents.querySelectorAll<HTMLElement>("p");
  if (!wrap || !lines.length) return;

  const index = Math.min(Math.max(lrc.index ?? 0, 0), lines.length - 1);
  const current = lines[index];
  const lineTop = current.offsetTop;
  const lineH = current.offsetHeight;
  const targetY = wrap.clientHeight / 2 - (lineTop + lineH / 2);
  const minY = wrap.clientHeight - contents.scrollHeight;
  const y = Math.min(0, Math.max(minY, targetY));

  contents.style.transform = `translateY(${y}px)`;
  contents.style.webkitTransform = `translateY(${y}px)`;
};

const bindLrcScroll = (ap: any, _root: Element) => {
  const run = () =>
    requestAnimationFrame(() => {
      syncLrcScroll(ap.lrc);
      requestAnimationFrame(() => syncLrcScroll(ap.lrc));
    });
  ap.audio.addEventListener("timeupdate", run);
  ap.on("listswitch", () => {
    run();
    setTimeout(run, 120);
    setTimeout(run, 500);
  });
  ap.on("lrcshow", run);
};

const renderPlaylist = (tracks: MusicTrack[], root: Element, activeIndex = 0) => {
  const wrap = root.querySelector(".vh-music-playlist");
  if (!wrap) return;

  wrap.innerHTML = `
    <header class="vh-music-pl-head">
      <strong class="vh-music-pl-title">歌单</strong>
      <span class="vh-music-pl-count">${tracks.length} 首</span>
    </header>
    <div class="vh-music-pl-scroll">
      ${tracks
        .map(
          (track, index) => `
        <button type="button" class="vh-music-pl-item${index === activeIndex ? " is-active" : ""}" data-index="${index}" aria-label="播放 ${track.name}">
          <span class="vh-music-pl-cover">
            <img src="${track.cover}" alt="" loading="lazy" />
          </span>
          <span class="vh-music-pl-info">
            <strong class="vh-music-pl-name">${track.name}</strong>
            <span class="vh-music-pl-artist">${track.artist}</span>
          </span>
          <span class="vh-music-pl-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="vh-music-pl-progress"><i></i></span>
        </button>`,
        )
        .join("")}
    </div>`;
};

const syncPlaylist = (ap: any, root: Element, playing = false) => {
  const index = ap.list?.index ?? 0;
  root.querySelectorAll<HTMLElement>(".vh-music-pl-item").forEach((item, i) => {
    item.classList.toggle("is-active", i === index);
    item.classList.toggle("is-playing", i === index && playing);
  });
  root.querySelector(".vh-music-pl-item.is-active")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
};

const bindPlaylist = (ap: any, tracks: MusicTrack[], root: Element) => {
  renderPlaylist(tracks, root, ap.list?.index ?? 0);

  root.querySelector(".vh-music-pl-scroll")?.addEventListener("click", (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>(".vh-music-pl-item");
    if (!item) return;
    const index = Number(item.dataset.index);
    if (!Number.isFinite(index)) return;
    if (index === ap.list.index) ap.toggle();
    else {
      ap.list.switch(index);
      ap.play();
    }
  });
};

const bindStage = (ap: any, tracks: MusicTrack[], root: Element) => {
  const cover = root.querySelector<HTMLImageElement>(".vh-music-cover");
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
  bindLrcScroll(ap, root);
  requestAnimationFrame(() => syncLrcScroll(ap.lrc));

  const fs = bindLrcFullscreen(ap, tracks, root);

  const paint = () => {
    const index = ap.list?.index ?? 0;
    const track = tracks[index] || tracks[0];
    if (!track) return;
    if (cover && cover.getAttribute("src") !== track.cover) cover.setAttribute("src", track.cover);
    fs?.paintFsMeta();
  };

  const paintTime = () => {
    const duration = ap.audio.duration || 0;
    const current = ap.audio.currentTime || 0;
    const ratio = duration ? (current / duration) * 100 : 0;
    if (played) played.style.width = `${ratio}%`;
    if (time) time.textContent = `${fmt(current)} / ${fmt(duration)}`;
    if (lrcFullscreen) paintFsTime(current, duration, ratio);
    const plProgress = root.querySelector<HTMLElement>(".vh-music-pl-item.is-active .vh-music-pl-progress i");
    if (plProgress) plProgress.style.width = `${ratio}%`;
  };

  const paintLoop = () => {
    if (loopBtn) loopBtn.textContent = loopText[ap.options.loop as keyof typeof loopText] || "列表循环";
  };

  paint();
  paintLoop();
  if (vol) vol.value = String(ap.audio.volume ?? 0.7);

  ap.on("listswitch", () => {
    paint();
    syncPlaylist(ap, root, !ap.paused);
  });
  ap.on("playing", () => paint());
  ap.on("canplay", () => paint());
  ap.on("play", () => {
    stage?.classList.add("is-playing");
    if (playBtn) playBtn.textContent = "暂停";
    syncPlaylist(ap, root, true);
  });
  ap.on("pause", () => {
    stage?.classList.remove("is-playing");
    if (playBtn) playBtn.textContent = "播放";
    syncPlaylist(ap, root, false);
  });
  ap.audio.addEventListener("timeupdate", paintTime);
  ap.audio.addEventListener("durationchange", paintTime);
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
  if (!box) {
    closeLrcFullscreen();
    return;
  }

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
          <div class="vh-music-lrc-head">
            <button type="button" class="vh-music-lrc-full">全屏歌词</button>
          </div>
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
      <div class="vh-music-playlist"></div>
      <div class="vh-music-player vh-music-engine" aria-hidden="true"></div>
    </div>`;

  const container = box.querySelector(".vh-music-player");
  const page = box.querySelector(".vh-music-page");
  if (!container || !page) return;

  let ap: any = null;
  const mount = (tracks: MusicTrack[]) => {
    if (ap) {
      closeLrcFullscreen();
      ap.destroy();
      const i = MusicList.indexOf(ap);
      if (i >= 0) MusicList.splice(i, 1);
    }
    ap = new APlayer({
      container,
      audio: toAudio(tracks),
      lrcType: 3,
      loop: "all",
      listFolded: true,
      preload: "metadata",
    });
    MusicList.push(ap);
    bindPlaylist(ap, tracks, page);
    bindStage(ap, tracks, page);
    syncPlaylist(ap, page, !ap.paused);
    bindSpace(ap);
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
