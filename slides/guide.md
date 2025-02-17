---
# You can also start simply with 'default'
theme: dracula
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://images.unsplash.com/photo-1621237023000-6a628c285938?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
# some information about your slides (markdown enabled)
title: 蓝桥杯Web组 备赛指南
info: |
  Created with [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# 蓝桥杯Web组 备赛指南 {.!text-yellow-100 }

2025年 省赛 { .!text-white/50 .text-2xl .!mt-8 }

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<div class="abs-br m-6 text-xl">
  <div class="flex items-center space-x-2">
  <a href="https://github.com/gaojunran/lanqiao-web-slides" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
  <div class="text-white/75 hover:text-white transition">gaojunran</div>
  </div>
</div>

---

## 比赛基本信息 📢

<v-clicks>

- 蓝桥杯Web组从2022年开始开设，已经举办**三届**。

- 比赛共设**大学组、职业院校组**两个组别，两个组别约有一半的题目是一样的。

- 省赛比赛时间**2025年4月**。

- 省赛比赛共**10道题**，共**4小时**，开赛后一小时可以交卷。

- 省赛每个组别设立一、二、三等奖，原则上各奖项的比例为**10%、20%、30%**。

- 全部题目将使用前端自动化测试技术完成机器**自动评分**。

</v-clicks>

<v-click>

详情：https://dasai.lanqiao.cn/notices/839/

</v-click>


---

## 比赛细节 👀

<v-clicks>

- 考试开始后，选手首先下载题目，并使用考场现场公布的解压密码解压试题。

- 题面以PDF的形式给出，基础源代码会以压缩包的形式给出。考生需要把作答完成的代码重新**打成压缩包**提交到指定位置。

- 作答期间**无互联网连接**，而且大概率评判题目期间也不会有互联网连接，所以不要引用除本地文件以外的资源。

- 本地开发环境：**Chrome、Visual Studio Code、Node.js**。

- 比赛环境中的VS Code可以提供**HTML标签**补全、**CSS样式**补全、**JavaScript基本语法**补全、**浏览器JavaScript API**补全、**Nodejs API**补全。

- 比赛环境中的VS Code不能提供**jQuery(已从考纲中移除)**、**Axios**、**Vue3**、**Element Plus**、**ECharts**等库的补全，如果考察Element Plus，一般会给出用法文档。

- 每道题目都有实际情境，无论是封装函数还是实现页面，都可以直观地自行判断是否成功实现功能。

</v-clicks>

---

## 比赛内容和难度 📚

<v-clicks>

- 比赛主要围绕着前端生态系统进行考察。

- 历届比赛的题目难度大体上**逐年递增**。

- Web组的整体难度**远低于**算法组，需要做对一半以上的题才能考虑省三。

- 和算法组相比，Web组的**知识点更多、涉及范围更广**，需要在赛前多积累API的使用经验。

- 通常每年的考纲会有细微的不同，但今年的考纲和去年相比**没有任何变化**。

- 这两年的考纲删除了：**jQuery**；将考察Vue2调整为**考察Vue3**；将考察ElementUI调整为**考察Element Plus**。

</v-clicks>

---
# layout: two-cols
---

## 考纲详细内容 🌏

<div class="overflow-y-scroll max-h-7/8 mt-6">

**1. HTML5**
- HTML 基本标签
- HTML5 新特性
- HTML5 本地存储

**2. CSS3**
- CSS 基础语法
- 盒子模型
- 浮动与定位
- CSS3 新特性
- 弹性盒子
- 媒体查询

**3. JavaScript**
- JavaScript 基础语法
- DOM 与 BOM
- JavaScript 内置对象
- JavaScript 事件
- JavaScript AJAX
- 正则表达式

**4. ES6**
- let 和 const 命令
- class
- set 和 map
- Proxy
- 字符串、函数、数组和对象的扩展
- 异步编程与模块化

**5. Axios**
- Axios API
- Axios 实例
- 请求配置
- 默认配置
- 拦截器

**6. Vue.js** 
- Vue 核心语法
- Vue 组件化开发
- vue-router (v4.x)
- pinia 使用

**7. ElementPlus**
- 基础组件的使用
- 表单和表格组件
- 反馈组件
- 导航组件
- 组件的二次封装

**8. ECharts**
- ECharts 基础语法
- ECharts 绘制图表
- ECharts 异步数据加载和更新
- ECharts 交互组件
- ECharts 事件处理

**9. Node.js（仅大学组考察）**
- Node.js 基础
- 内置模块使用 (fs、http 等)

</div>

---

## 注意事项

<v-clicks>

1. 历届题目有很多相似之处，你经常能在某道题中看到前几届赛题的影子，所以**务必刷完**✍🏻前几届的题目！

2. 赛题和实际开发的差距比较大，例如完全不考察**TypeScript**、**Vue SFC**等、也完全不考察构建打包工具，几乎每道题都是填空题，个别题目甚至只需要你填几行代码，要熟悉题目的考察方式！

3. 绝大多数的题目都只明确地**考察一个知识点**（考CSS的题就不会考你JS），不要看到题目最后的效果觉得很难做就轻易放弃，很多题目的效果是给你校验作答是否正确用的，不是需要你自己实现的！

4. 蓝桥杯**不是在线评测**！你交卷的时候不知道自己得了多少分！因此一定要注意审题👀，避免“会而不得分”的情况。

5. 不要买蓝桥杯官方的课😂。

</v-clicks>

---

## 视频内容规划

<v-clicks>

1. 带练**前三届**省赛大学组、职业院校组**省赛真题**14 + 12 + 14 = **40**道题。

2. 精选国赛中经典的、值得借鉴的题目进行讲解。

3. 总结和拓展考纲中的知识点、考察点。

</v-clicks>


<v-clicks>

<div class="my-12 border-t border-gray-300"></div>

Github: https://github.com/gaojunran/lanqiao-web-slides

Bilibili: CodeNebula

</v-clicks>