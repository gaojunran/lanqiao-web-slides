---
# You can also start simply with 'default'
theme: ../theme
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://images.unsplash.com/photo-1621237023000-6a628c285938?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
# some information about your slides (markdown enabled)
title: 浏览器API与Vue3
info: |
  Created with [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade-out
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true

---

# 浏览器API与Vue3 { .!text-yellow-100}

蓝桥杯Web组 省赛备赛 {.!text-white/50}

---
layout: two-cols
background: "/background.avif"
---

# 浏览器API

<v-clicks>

+ CSS选择器

+ 文档结构与遍历

+ 属性

+ 元素内容

+ 操作节点

+ 操作样式

</v-clicks>

::right::

# Vue3

<v-clicks>

+ 模板语法

+ 响应式API

+ 生命周期API

+ 定义`props`/`emits`/`model`

+ 模板引用

</v-clicks>

---

# CSS选择器

浏览器提供了 `document.querySelector` 和 `document.querySelectorAll` 两个方法，可以用来根据 CSS 选择器来获取 DOM 元素。

## 通过标签名、id、class

```js
div
#nav
.warning
```

## 通过属性

```js
p[lang="fr"]
*[name="x"]
```

## 组合

```js
span.fatal.error // 取交集，同时满足
img, video  // 取并集，满足其一
```

```js
#log span  // 后代
#log > span  // 子代
body > h1 :first-child  // 伪类
img + p.caption  // 紧邻
img ~ p.caption  // 兄弟


```