module.exports = {
  theme: 'vuepress-theme-reco',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no' 
      }
    ]
  ],
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
      }
    ],
    sidebar: 'auto',
     // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    lastUpdated: 'Last Updated'
  }
}
