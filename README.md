# 华泰证券AI行业周报网站

一个专注于人工智能行业资讯的信息门户网站，为用户提供最新的监管政策、行业动态、资本市场和研究洞见。

## 项目结构

```
/
├── index.html        - 网站主页HTML
├── styles.css        - 样式表文件
├── script.js         - 交互脚本文件
└── README.md         - 项目说明文档
```

## 功能特点

- 监管政策：提供国内外AI相关法规和政策更新
- 行业动态：展示AI领域最新动向和企业新闻
- 资本市场：追踪AI相关投融资事件和市场趋势
- 洞见报告：汇总行业专家观点和研究报告摘要
- AI问一问：个性化AI助手，回答用户关于AI行业的问题
- 订阅功能：用户可订阅每周AI行业资讯

## AI问一问功能集成指南

网站已包含一个模拟版的AI问一问功能，可以通过以下步骤整合真实的大模型API：

### 1. 百度文心大模型集成

1. 访问[百度智能云](https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html)，注册开发者账号
2. 创建应用并获取API Key和Secret Key
3. 在`script.js`文件中找到`initAIAssistant`函数
4. 取消注释`callBaiduWenxinAPI`函数，并替换以下内容：
   ```javascript
   // 替换为您的API Key和Secret Key
   const tokenResponse = await fetch('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=您的API_KEY&client_secret=您的SECRET_KEY', {
   ```

5. 在`handleUserQuestion`函数中将：
   ```javascript
   const aiResponse = getEnhancedAIResponse(question);
   ```
   替换为：
   ```javascript
   const aiResponse = await callBaiduWenxinAPI(question);
   ```

### 2. 通义千问或讯飞星火等其他模型API的集成

如果您希望使用其他大模型API，可参考其官方文档，相应修改API调用部分。通常需要：

1. 替换API端点URL
2. 调整请求参数格式
3. 解析不同的响应结构

### 3. 安全注意事项

在生产环境中，请注意：

- API密钥应存储在服务器端，而非前端代码中
- 实现API调用的代理服务，避免直接从浏览器发起请求
- 添加用户验证和请求频率限制，防止滥用
- 考虑加入敏感内容过滤机制

## 本地开发

运行以下命令启动本地服务器：

```bash
python3 -m http.server 8000
```

然后在浏览器中访问 http://localhost:8000

## 联系方式

如有任何问题或建议，请联系：ai-report@htsc.com

## 内容板块

1. **监管政策**
   - 国内政策法规
   - 国际监管动态

2. **行业动态**
   - 国内动态
   - 国际动态

3. **资本市场及公司动态**
   - 创业融资事件
   - 大型科技公司动向

4. **行业观点与报告摘要**
   - 行业专家观点
   - 研究报告摘要

## 如何运行

1. 克隆仓库到本地
2. 直接在浏览器中打开`index.html`文件
3. 或者使用本地服务器运行项目：

```bash
# 使用Python启动简易HTTP服务器
python -m http.server 8000

# 或者使用Node.js的http-server
npx http-server
```

然后在浏览器中访问`http://localhost:8000`即可查看网站。

## 部署建议

- 可以部署到任何静态网站托管服务，如GitHub Pages、Netlify、Vercel等
- 对于动态内容管理，可以考虑添加后端API或使用无头CMS系统

## 未来开发计划

1. 集成实时数据API，自动获取最新AI行业动态
2. 添加用户账户系统，支持个性化内容推荐
3. 实现全文搜索功能
4. 添加数据可视化组件，展示行业趋势和投资热点
5. 开发移动应用版本

## 许可证

MIT License 