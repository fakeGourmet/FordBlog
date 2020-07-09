module.exports = {
  // host: '127.0.0.1'
  port: '233',
  title: '一个兴趣使然的博客',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      },
    ],
  ],
  // 主题配置
  theme: 'vuepress-theme-reco',
  themeConfig: {
    type: 'blog',
    author: 'Fake Gourmet',
    authorAvatar: '/avatar.png',
    nav: [
      {
        text: 'Home',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: 'TimeLine',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/fakeGourmet', icon: 'reco-github' }
        ],
      },
    ],
    sidebar: 'auto',
    startYear: '2020',
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      },
    },
    lastUpdated: 'Last Updated'
  },
  markdown: {
      lineNumbers: true //代码显示行号
  },
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 插件
  plugins: [
    ['flowchart'],  // 支持流程图
    [
      '@vuepress-reco/vuepress-plugin-bgm-player',
      {
        autoShrink: true,
        floatPosition: 'right',
        audios: [
          {
            name: '강남역 4번 출구',
            artist: 'Plastic / Fallin` Dild',
            url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
          },
        ],
      },
    ],
    ['@vuepress-reco/vuepress-plugin-kan-ban-niang'],
    ['@vuepress-reco/vuepress-plugin-screenfull'],
    ['vuepress-plugin-smooth-scroll'],  // 平滑滚动
    ['@vuepress/nprogress'],  // 加载进度条
    ['reading-progress']  // 阅读进度条
  ]
}
