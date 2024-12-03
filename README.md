# part-time

纯粹为了兼职开发项目而构建，尽可能用最少的代码与步骤独立开发整个项目

## 思路

使用 workspaces 统合一个项目包含的所有端代码，可以灵活加减应用端，并且统一使用ts的情况下，可以跨应用端复用代码

- 应用端
	- 服务端 => nestjs
	- pc网页端 => react、antd
	- H5、小程序 => Taro

## 项目结构

命名结构：框架-应用端定位

- nest-serve => 后端服务
- react-admin => 管理后台
- taro-mobile => 移动端（移动端网页、小程序）（待定）
- react-web => 自适应网页（待定）
- electron-desktop => 桌面端开发（待定）