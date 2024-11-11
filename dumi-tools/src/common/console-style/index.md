---
nav:
  title: 公共函数
---

# 颜色控制台

创建带样式的日志打印对象

## Demo

```tsx
import React from 'react';
import { Button } from 'antd';
import { consoleStyle } from 'dumi-tools';

const colors = {
  blue: 'color: #0089E5;',
  green: 'color: #2DB700;',
  red: 'color: #F41900;',
};

const { blue, red, green } = consoleStyle(colors);

const onClick = () => {
  blue.log('蓝色日志文本');
  red.group('红色日志组', () => {
    console.log('默认日志文本');
    green.log('绿色日志文本');
  });
};

export default () => (
  <Button type="primary" onClick={onClick}>
    请打开控制台并点击按钮查看实际效果
  </Button>
);
```

## API

| Description | Function | Type                                        |
| ----------- | -------- | ------------------------------------------- |
| 普通日志    | log      | (text: string) => void                      |
| 日志组      | group    | (text: string, content: () => void) => void |
