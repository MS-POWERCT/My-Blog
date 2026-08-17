import { getCollection } from "astro:content";

// 全站统一出口：自动过滤 hide 文章，按时间倒序
const allPosts = (await getCollection("blog")).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
const posts = allPosts.filter((i: any) => !i.data.hide);

// 获取文章分类
const getCategories = () => {
  const categoriesList = posts.reduce((acc: any, i: any) => {
    acc[i.data.categories] = (acc[i.data.categories] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(categoriesList).map(([title, count]) => ({ title, count }));
}

// 获取统计数据
const getCountInfo = () => {
  return { ArticleCount: posts.length, CategoryCount: getCategories().length, TagCount: getTags().length }
}

// 获取文章标签
const getTags = () => {
  const tagList = posts.reduce((acc: any, i: any) => {
    (i.data.tags || []).forEach((tag: string | number) => {
      const key = String(tag);
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});
  return Object.entries(tagList).sort((a: any, b: any) => b[1] - a[1]);
}

// 获取推荐文章 (给文章添加 recommend: true 字段)
const getRecommendArticles = () => {
  const recommendList = posts.filter(i => i.data.recommend);
  return (recommendList.length ? recommendList : posts.slice(0, 6)).map(i => ({ title: i.data.title, date: i.data.date, id: i.data.id }))
};

// 获取上一篇下一篇文章
const getPrevNextPosts = (id: string) => {
  const index = posts.findIndex(i => i.data.id === id);
  const none = { title: '没有啦~', id: '#' };
  return { prev: posts[index - 1] ? posts[index - 1].data : none, next: posts[index + 1] ? posts[index + 1].data : none }
}

export { getCategories, getTags, getRecommendArticles, getCountInfo, getPrevNextPosts };