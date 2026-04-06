# 机器狗智能消防平台 React 项目

这是一个基于 **React + Vite** 的本地前端项目，

## 一、启动方法

先确保你的电脑已经安装：
- Node.js 18 或 20
- npm

在项目目录打开终端后执行：

```bash
npm install
npm run dev
```

浏览器打开：

```bash
http://localhost:5173
```

## 二、打包

```bash
npm run build
```

打包结果会输出到 `dist` 目录。

## 三、项目结构

```text
robot-dog-fire-react/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  └─ styles.css
└─ public/
```

## 四、你后续最应该改的地方

### 1. 接后端接口
最简单的做法：

```js
useEffect(() => {
  fetch('http://你的后端接口地址/api/dashboard')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
}, [])
```

然后把接口返回的数据替换到页面里。

### 3. 替换中间视频区域
现在中间是模拟图形，不是真视频。
后面你可以替换成：

- `<img src="视频流地址" />`
- `<video src="本地视频地址" controls />`
- WebRTC / RTSP 转流后的播放器

### 4. 替换左侧地图
现在是纯样式模拟。
后面可以接：

- 高德地图 JS API
- 百度地图
- ECharts 地图
- 自己的园区平面图背景

### 5. 报告区接大模型结果
右下角“算法分析识别报告”现在是静态文本。
你后面可以把 OCR、识别结果、风险分析、整改建议都从接口传进来。

## 五、推荐修改顺序

先不要急着全改，按这个顺序最稳：

1. 先把页面本地跑起来
2. 先改静态文字和表格数据
3. 再接报警表格接口
4. 再接识别分类状态
5. 再换中间视频区域
6. 最后再接地图和报告区

## 六、部署建议

前端开发阶段用：

```bash
npm run dev
```

正式部署时：

```bash
npm run build
```

然后把 `dist` 部署到：

- Nginx
- 宝塔
- GitHub Pages（纯静态可行）
- Vercel / Netlify
- 你自己的服务器

## 七、额外提醒

这版是“可落地的 React 页面骨架”，不是完整业务系统。

现在已经适合你做这些事情：
- 继续改 UI
- 接 Flask / SpringBoot / Node 后端
- 换真实图片和视频
- 接识别结果接口
- 后面再拆成多个组件
# robot-car-fire-react
