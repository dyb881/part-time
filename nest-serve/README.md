# Nest Serve v4

使用 Nestjs 10.x 开发的基础管理后台服务，极大简约了代码，降低开发成本<br/>
[Nestjs 10.x 中文开发文档](https://docs.nestjs.cn/10/firststeps)

## 旧版本

- [v3 使用 monorepo 模式开发](https://github.com/dyb881/nest-serve/tree/monorepo-v3)
- [v2 使用 monorepo 模式开发](https://github.com/dyb881/nest-serve/tree/monorepo)
- [v1 使用 multirepo 模式开发](https://github.com/dyb881/nest-serve/tree/multirepo)

## 配置

一般情况下可以直接用当前配置，但如果要区分环境的话，就需要在 config 文件夹下添加这两个文件

- development.yaml
- production.yaml

在运行时会根据环境变量 NODE_ENV=配置文件名 进行选择加载，如

```sh
NODE_ENV=production yarn start // 加载 production.yaml 覆盖配置
```

环境变量为空时，默认会尝试加载 development.yaml


## 文件目录

- 仪表盘
  - 用户统计
  - 商品统计
  - 订单统计
  - 支付统计
- 账号管理
  - 管理员账号
  - 管理员角色（管理后台接口权限控制）
  - 用户账号
- 信息管理
  - 信息分类
  - 文章列表
- 商品管理
  - 商品分类
  - 商品列表
  - 订单管理
  - 评论管理
- 财务管理
  - 订单支付
- 系统管理
  - 文件管理
  - 配置管理
    - 枚举配置
    - 文件配置
    - 权限配置
    - 支付配置
    - 自定义配置
  - 操作日志
  - 系统日志
