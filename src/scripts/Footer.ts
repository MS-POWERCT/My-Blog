// 格式化时间
import { fmtDate, LoadScript } from "@/utils/index";
import SITE_CONFIG from "@/config";
const { CreateTime, Busuanzi } = SITE_CONFIG;

// 初始化 网站运行时间
export default () => {
  const timeDOM = document.querySelector("em.web_time");
  if (timeDOM) {
    if (!CreateTime) timeDOM.remove();
    else timeDOM.textContent = fmtDate(CreateTime);
  }
  if (Busuanzi.enable && !document.querySelector('script[data-busuanzi]')) {
    LoadScript("https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js", [
      { k: "data-busuanzi", v: "true" },
      { k: "async", v: true },
    ]).catch(() => {});
  }
}