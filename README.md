# 智慧校园消防管控平台

基于 `React + Vite` 的大屏前端项目，当前已经完成组件化重构、mock 数据分层、视频三模式支持和巡检任务状态流转，适合作为后续联调骨架继续开发。

## 启动

```bash
npm install
npm run dev
```

默认地址：

```text
http://localhost:5173
```

生产构建：

```bash
npm run build
```

## 静态资源约定

```text
public/
├─ demo.mp4
├─ scenes/
│  └─ campus-fire-scene.svg
└─ snapshots/
   ├─ extinguisher.svg
   ├─ exit-sign.svg
   ├─ hydrant.svg
   └─ passageway.svg
```

- 演示视频放在 `public/demo.mp4`
- 快照图放在 `public/snapshots/`
- 场景背景图放在 `public/scenes/`

## Mock 开关

项目通过 `VITE_USE_MOCK` 统一控制 mock 与真实接口切换。

开发环境默认：

```bash
VITE_USE_MOCK=true
```

位置：

- `.env.development`
- `.env.example`

切到真实接口时，将 `VITE_USE_MOCK=false`，然后在 [dashboardApi.js](/d:/Documents/code/html/robot-car-fire-react/src/services/dashboardApi.js) 中补齐真实接口地址即可。

## 联调入口

- 总览/场景/统计/视频配置：`getDashboardSummary`、`getStats`、`getVideoConfig`
- 巡检基础信息：`getInspectionInfo`
- 报警表格：`getAlarmList`
- 结构化报告：`getRecognitionReport`
- 快照数据：`getSnapshots`

这些函数都在 [dashboardApi.js](/d:/Documents/code/html/robot-car-fire-react/src/services/dashboardApi.js)，字段映射集中在 [transform.js](/d:/Documents/code/html/robot-car-fire-react/src/services/transform.js)。

## 常用修改点

- 改 demo 视频地址：`src/data/mockDashboard.js` 的 `mockVideoConfig.src`
- 改真实流地址：`src/data/mockDashboard.js` 的 `mockVideoConfig.streamSrc`
- 改默认 tab / 识别类型 / mock 开关：`src/config/dashboard.js`
- 改实时场景窗口形态：`src/components/left/MapView.jsx`
- 改视频三模式渲染：`src/components/center/VideoPanel.jsx`

## 当前结构

```text
src/
├─ assets/
├─ components/
├─ config/
├─ data/
├─ hooks/
├─ services/
├─ utils/
├─ App.jsx
├─ main.jsx
└─ styles.css
```
