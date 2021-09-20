// 啟動專案 yarn start 會同時啟動 dev-server 跟 proxy server

// 架構概述 <br />
基本分為 <br />
區分功能的模組層(module) <br />
管理共用元件的元件層(component)<br />
以及管理外部回傳資料的資料處理層，這個專案將其抽出做成Hook來使用<br />

// CORS 處理方式 <br />
在localhost:5000的地方建立一個簡單的http-server代理browser發送請求， <br />
並以此代理伺服器允許browser跨域存取資料

// Lint 部分選擇 ESLint + Prettier <br />

// 打包方面有把每個 chunk 都限制在 1MB 以下， react 跟 react-dom 也獨立出一個 vendor