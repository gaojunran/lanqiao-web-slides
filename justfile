# 运行just dev + 幻灯片名字，以启动对应的Web演示。
dev name='guide':
    pnpm run dev slides/"{{ name }}.md"