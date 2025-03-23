document.addEventListener('DOMContentLoaded', function() {
    // 初始化过滤标签功能
    initFilterTabs();
    
    // 初始化订阅表单
    initSubscribeForm();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 添加华泰证券品牌效果
    addHuataiEffects();
    
    // 添加导航栏跟随滚动高亮功能
    initScrollSpy();

    // 初始化AI问一问功能
    initAIAssistant();
});

// 过滤标签功能
function initFilterTabs() {
    const filterTabsContainers = document.querySelectorAll('.filter-tabs');
    
    filterTabsContainers.forEach(container => {
        const tabs = container.querySelectorAll('.filter-tab');
        const parentSection = container.closest('.content-section');
        const cards = parentSection.querySelectorAll('.content-card');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的active类
                tabs.forEach(t => t.classList.remove('active'));
                
                // 给当前点击的标签添加active类
                this.classList.add('active');
                
                // 获取过滤类型
                const filterType = this.textContent.trim().toLowerCase();
                
                // 过滤卡片
                cards.forEach(card => {
                    const cardTag = card.querySelector('.card-tag');
                    
                    if (filterType === '全部') {
                        card.style.display = 'flex';
                    } else {
                        // 检查卡片标签是否匹配过滤类型
                        const cardType = cardTag ? cardTag.textContent.trim().toLowerCase() : '';
                        
                        if (cardType === filterType || 
                            (filterType === '国内' && cardType === '国内') || 
                            (filterType === '国际' && cardType === '国际') ||
                            (filterType === '融资事件' && cardType === '融资') ||
                            (filterType === '公司动态' && cardType === '公司') ||
                            (filterType === '专家观点' && cardType === '专家观点') ||
                            (filterType === '研究报告' && cardType === '研究报告')) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    });
}

// 订阅表单功能
function initSubscribeForm() {
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    
    subscribeForms.forEach(form => {
        const button = form.querySelector('button');
        const input = form.querySelector('input');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = input.value.trim();
            
            if (!email) {
                showToast('请输入您的邮箱地址');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('请输入有效的邮箱地址');
                return;
            }
            
            // 模拟订阅操作
            showToast('订阅成功！感谢您的订阅');
            input.value = '';
        });
    });
    
    // 顶部订阅按钮
    const topSubscribeBtn = document.querySelector('.subscribe-btn');
    if (topSubscribeBtn) {
        topSubscribeBtn.addEventListener('click', function() {
            const subscribeSection = document.querySelector('.subscribe-section');
            if (subscribeSection) {
                subscribeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                
                if (!searchTerm) {
                    showToast('请输入搜索关键词');
                    return;
                }
                
                // 模拟搜索操作
                showToast(`正在搜索"${searchTerm}"相关内容`);
                
                // 这里可以添加实际的搜索逻辑
                // ...
                
                // 清空搜索框
                this.value = '';
            }
        });
    }
}

// 滚动动画
function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-section');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // 当section进入视口时添加动画类
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('animated');
            }
        });
    });
    
    // 触发一次滚动事件以初始化可见元素的动画
    window.dispatchEvent(new Event('scroll'));
}

// 华泰证券特定效果
function addHuataiEffects() {
    // 添加华泰证券标识脉动效果
    const logoElement = document.querySelector('.logo h1::before');
    if (logoElement) {
        setInterval(() => {
            logoElement.classList.toggle('pulse');
        }, 3000);
    }
    
    // 强调卡片标签效果
    const cardTags = document.querySelectorAll('.card-tag');
    cardTags.forEach(tag => {
        tag.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 辅助函数：显示提示信息
function showToast(message) {
    // 检查是否已存在toast
    let toast = document.querySelector('.toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    // 设置消息并显示
    toast.textContent = message;
    toast.classList.add('show');
    
    // 3秒后隐藏
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 辅助函数：验证邮箱
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// 添加toast和华泰特色样式
function addToastStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: rgba(224, 54, 54, 0.9); /* 华泰红色半透明 */
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            box-shadow: 0 4px 12px rgba(183, 28, 28, 0.2); /* 红色阴影 */
        }
        
        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        .content-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .content-section.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .logo h1::before {
            transition: all 0.3s ease;
        }
        
        .logo h1::before.pulse {
            transform: scale(1.2);
            box-shadow: 0 0 8px rgba(224, 54, 54, 0.8);
        }
        
        /* 华泰证券标识动画 */
        @keyframes logoGlow {
            0% { box-shadow: 0 0 5px rgba(224, 54, 54, 0.6); }
            50% { box-shadow: 0 0 15px rgba(224, 54, 54, 0.8); }
            100% { box-shadow: 0 0 5px rgba(224, 54, 54, 0.6); }
        }
        
        .logo h1::before {
            animation: logoGlow 3s infinite;
        }
    `;
    document.head.appendChild(style);
}

// 添加自定义样式
addToastStyle();

// 导航栏跟随滚动高亮功能
function initScrollSpy() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section[id]');
    
    // 设置选项
    const options = {
        threshold: 0.4,  // 当section的40%进入视口时触发
        rootMargin: "-80px 0px 0px 0px"  // 顶部偏移80px（导航栏高度）
    };
    
    // 使用Intersection Observer代替滚动事件
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 当section进入视口
            if (entry.isIntersecting) {
                // 获取当前section的id
                const id = entry.target.getAttribute('id');
                
                // 更新导航高亮
                updateNavLinks(id);
            }
        });
    }, options);
    
    // 观察所有sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 确保首页链接正确
    const homeLink = document.querySelector('nav ul li:first-child a');
    if (homeLink && homeLink.getAttribute('href') !== '#hero') {
        homeLink.setAttribute('href', '#hero');
    }
    
    // 点击导航链接平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标section的ID
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 在开始滚动前更新高亮
                updateNavLinks(targetId);
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 处理首页特殊情况 - 在页面顶部时高亮首页
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            updateNavLinks('hero');
        }
    });
    
    // 初始化时高亮正确的导航项
    // 使用setTimeout确保在DOM完全加载和渲染后执行
    setTimeout(() => {
        // 检查当前窗口位置
        if (window.scrollY < 100) {
            updateNavLinks('hero');
        } else {
            // 找到当前视口中最上方的section
            let closestSection = null;
            let closestDistance = Infinity;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            });
            
            if (closestSection) {
                updateNavLinks(closestSection.id);
            }
        }
    }, 100);
}

// 更新导航链接
function updateNavLinks(id) {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        // 移除所有active类
        link.classList.remove('active');
        
        // 为当前section对应的链接添加active类
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
}

// AI问一问功能
function initAIAssistant() {
    const chatMessages = document.getElementById('chatMessages');
    const userQuestion = document.getElementById('userQuestion');
    const askButton = document.getElementById('askButton');
    
    if (!chatMessages || !userQuestion || !askButton) return;
    
    askButton.addEventListener('click', handleUserQuestion);
    userQuestion.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserQuestion();
        }
    });
    
    // 添加对话历史管理
    let conversationHistory = [];
    
    function handleUserQuestion() {
        const question = userQuestion.value.trim();
        if (!question) return;
        
        // 添加用户问题到聊天界面
        addUserMessage(question);
        
        // 将问题添加到对话历史
        conversationHistory.push({
            role: "user",
            content: question
        });
        
        // 清空输入框
        userQuestion.value = '';
        
        // 显示思考中动画
        showThinking();
        
        // 模拟调用大模型API
        // 这里将来会替换为实际的API调用
        setTimeout(() => {
            // 移除思考中动画
            removeThinking();
            
            // 获取增强版AI回复
            const aiResponse = getEnhancedAIResponse(question);
            
            // 添加回复到对话历史
            conversationHistory.push({
                role: "assistant",
                content: aiResponse
            });
            
            // 保持对话历史在合理长度
            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }
            
            addSystemMessage(aiResponse);
            
            // 自动滚动到底部
            scrollToBottom();
        }, 1500);
    }
    
    function addUserMessage(message) {
        const messageElement = createMessageElement('user', message);
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addSystemMessage(message) {
        const messageElement = createMessageElement('system', message);
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function createMessageElement(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const contentP = document.createElement('p');
        contentP.textContent = content;
        contentDiv.appendChild(contentP);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getCurrentTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        return messageDiv;
    }
    
    function showThinking() {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'thinking';
        thinkingDiv.id = 'thinking';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            thinkingDiv.appendChild(dot);
        }
        
        chatMessages.appendChild(thinkingDiv);
        scrollToBottom();
    }
    
    function removeThinking() {
        const thinkingDiv = document.getElementById('thinking');
        if (thinkingDiv) {
            thinkingDiv.remove();
        }
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // 格式化时间为两位数
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes}`;
    }
    
    // 增强版AI回复
    function getEnhancedAIResponse(question) {
        // 预设的回复模板
        const responses = {
            default: "感谢您的提问！我是华泰证券AI助手，很高兴为您解答AI行业相关问题。您的问题我已记录，我们的AI专家团队会持续优化回答质量。您还可以关注我们的周报获取更多行业洞见。",
            
            // 关于大模型的问题回复
            model: "目前国内大模型发展迅速，百度文心、阿里通义、讯飞星火等模型在中文理解和行业应用方面表现突出。与国际模型相比，中国大模型在中文语境和合规性上具有优势，但在基础研究和模型规模上仍有提升空间。近期趋势是向多模态、垂直领域应用以及小型化、高效化方向发展。",
            
            // 关于AI投资的问题回复
            investment: "AI赛道投资热点主要集中在：(1)大模型基础设施，如高性能芯片和算力中心；(2)特定领域的AI应用，如医疗、金融、教育等垂直场景；(3)低代码开发平台和AI辅助工具链；(4)数据安全和隐私保护相关技术。从风险角度，需关注技术路线迭代快、商业模式仍不明确、监管政策可能趋严等因素。",
            
            // 关于AI芯片的问题回复
            chip: "AI芯片市场目前以英伟达为主导，高端GPU市场占有率超过80%。国内厂商如寒武纪、沐曦等也在加速布局。未来趋势包括：异构计算架构优化、专用化设计、功耗效率提升以及大算力小型化等方向。对投资者而言，需关注技术壁垒、产业链协同以及国产替代进程。",
            
            // 关于AI监管的问题回复
            regulation: "全球AI监管框架正在形成，欧盟AI法案已经通过，美国发布AI权利法案，中国也出台了生成式AI服务管理规定和算法备案制度。总体趋势是在促进创新的同时，加强对数据安全、算法公平性和AI安全的监管要求。企业需关注合规成本上升、数据治理要求提高等挑战。",
            
            // 关于AI应用的问题回复
            application: "AI在金融领域的应用正快速普及，包括智能投顾、风险评估、市场预测等。华泰证券已将AI技术应用于量化交易策略优化、投研报告生成和客户服务等多个环节，有效提升了业务效率和客户体验。未来AI在金融领域的价值将进一步体现在个性化服务、风险防控和决策支持等方面。",
            
            // 关于AI趋势的问题回复
            trend: "2024年AI发展的主要趋势包括：(1)模型小型化和高效部署，降低使用成本；(2)多模态能力增强，实现跨感知模式的理解与生成；(3)行业垂直场景深耕，特别是金融、医疗和制造业；(4)AI原生应用兴起，重构传统软件架构；(5)可信AI发展，强化隐私保护、公平性和可解释性。这些趋势将推动AI从概念验证阶段向规模化商业应用转变。",
            
            // 关于大模型训练的问题
            training: "大模型训练目前面临的主要挑战是算力需求和成本。训练一个大型基础模型可能需要数百甚至上千张高端GPU，耗资数千万美元。中国企业在自主训练大模型方面已取得进展，但与OpenAI等国际领先机构相比仍有差距。随着国产AI芯片和分布式训练技术的发展，这一差距有望逐步缩小。",
            
            // 关于周报内容的问题
            newsletter: "华泰证券AI行业周报每周发布，内容涵盖AI领域监管政策、行业动态、资本市场和研究洞见。您可以在本网站订阅电子版周报，或通过华泰证券官方APP查看。最新一期周报重点关注了AI大模型在金融领域的应用案例分析和国内智能芯片产业链的投资机会。"
        };
        
        // 增强的关键词匹配
        if (question.includes("大模型") || question.includes("GPT") || question.includes("模型") || 
            question.includes("文心") || question.includes("通义") || question.includes("星火")) {
            return responses.model;
        } else if (question.includes("投资") || question.includes("机会") || question.includes("风险") || 
                   question.includes("股票") || question.includes("基金") || question.includes("回报")) {
            return responses.investment;
        } else if (question.includes("芯片") || question.includes("算力") || question.includes("硬件") || 
                   question.includes("英伟达") || question.includes("GPU") || question.includes("TPU")) {
            return responses.chip;
        } else if (question.includes("监管") || question.includes("法规") || question.includes("合规") || 
                   question.includes("政策") || question.includes("规定") || question.includes("法案")) {
            return responses.regulation;
        } else if (question.includes("应用") || question.includes("落地") || question.includes("场景") || 
                   question.includes("金融") || question.includes("医疗") || question.includes("实践")) {
            return responses.application;
        } else if (question.includes("趋势") || question.includes("发展") || question.includes("方向") || 
                   question.includes("未来") || question.includes("前景") || question.includes("预测")) {
            return responses.trend;
        } else if (question.includes("训练") || question.includes("算力") || question.includes("数据") || 
                   question.includes("参数") || question.includes("预训练") || question.includes("微调")) {
            return responses.training;
        } else if (question.includes("周报") || question.includes("订阅") || question.includes("内容") || 
                   question.includes("期刊") || question.includes("报告") || question.includes("最新")) {
            return responses.newsletter;
        } else {
            // 尝试上下文理解
            if (conversationHistory.length >= 2) {
                const lastQuestion = conversationHistory[conversationHistory.length - 2].content;
                
                // 如果上一个问题是关于某个主题，而当前问题是后续提问
                if (lastQuestion.includes("大模型") && (question.includes("具体") || question.includes("例子") || question.includes("哪些"))) {
                    return "国内领先的大模型包括百度文心一言、阿里通义千问、讯飞星火认知、智谱GLM等。这些模型在中文理解和对话能力上已接近国际水平，在特定垂直领域甚至有所超越。例如，文心一言在金融领域的专业知识掌握和监管合规性方面表现优异，而通义千问在多模态理解和创意生成方面具有优势。";
                }
                
                if (lastQuestion.includes("投资") && (question.includes("建议") || question.includes("怎么") || question.includes("如何"))) {
                    return "投资AI领域需谨慎，建议考虑以下策略：(1)关注已有明确商业模式的AI应用企业；(2)布局具有技术壁垒的基础设施提供商；(3)选择在特定垂直领域有数据和场景优势的企业；(4)通过ETF等工具分散投资风险。华泰证券提供的AI主题投资组合可作为参考，详情请咨询您的投资顾问。";
                }
            }
            
            return responses.default;
        }
    }
    
    /* 
    // 百度文心API调用示例代码（需替换为您的API密钥）
    async function callBaiduWenxinAPI(question) {
        try {
            // 获取访问令牌
            // 注意：实际应用中应该在服务器端处理令牌获取和API调用
            const tokenResponse = await fetch('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YOUR_API_KEY&client_secret=YOUR_SECRET_KEY', {
                method: 'POST'
            });
            
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;
            
            if (!accessToken) {
                throw new Error('无法获取访问令牌');
            }
            
            // 调用文心API
            const apiResponse = await fetch(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=${accessToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: conversationHistory,
                    temperature: 0.7,
                    top_p: 0.8
                })
            });
            
            const responseData = await apiResponse.json();
            
            if (responseData.error_code) {
                throw new Error(`API错误: ${responseData.error_msg}`);
            }
            
            return responseData.result;
        } catch (error) {
            console.error('API调用出错:', error);
            // 如果API调用失败，使用本地回复
            return getEnhancedAIResponse(question);
        }
    }
    */
} 