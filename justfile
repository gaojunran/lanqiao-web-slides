# 启动对应的Web演示。
dev name:
    pnpm run dev slides/{{ name }}.md

# 需npm i -D playwright-chromium，导出为PDF。
export name:
    pnpm run export slides/{{ name }}.md

# 需安装fzf并在unix环境下：
pick:
    ls slides/*.md | fzf | xargs pnpm run dev 