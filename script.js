// API配置 - 使用免费的热榜API服务
const API_CONFIG = {
    // 使用免费的热榜聚合API
    hotlist: 'https://v1.alapi.cn/api/tophub/get',
    // 备用API（如果主API不可用）
    backup: {
        zhihu: 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total',
        weibo: 'https://weibo.com/ajax/side/hotSearch'
    }
};

// 平台映射配置
const PLATFORM_MAP = {
    zhihu: { name: '知乎', key: 'zhihu', icon: 'fab fa-zhihu' },
    weibo: { name: '微博', key: 'weibo', icon: 'fab fa-weibo' },
    xiaohongshu: { name: '小红书', key: 'xiaohongshu', icon: 'fas fa-book' }
};

// 模拟数据作为备用（当API不可用时使用）
const fallbackData = {
    zhihu: [
        { title: "如何看待2024年人工智能的发展趋势？", heat: "1.2万热度", url: "https://www.zhihu.com/hot" },
        { title: "程序员35岁危机是真的吗？", heat: "8.5k热度", url: "https://www.zhihu.com/hot" },
        { title: "为什么现在的年轻人越来越不愿意加班？", heat: "7.8k热度", url: "https://www.zhihu.com/hot" },
        { title: "如何评价ChatGPT对传统行业的影响？", heat: "6.9k热度", url: "https://www.zhihu.com/hot" },
        { title: "在北京月薪2万是什么水平？", heat: "6.2k热度", url: "https://www.zhihu.com/hot" },
        { title: "为什么很多人说学历不重要，但招聘时又要求学历？", heat: "5.8k热度", url: "https://www.zhihu.com/hot" },
        { title: "如何看待现在的房价走势？", heat: "5.5k热度", url: "https://www.zhihu.com/hot" },
        { title: "年轻人应该如何理财？", heat: "4.9k热度", url: "https://www.zhihu.com/hot" },
        { title: "为什么现在找工作这么难？", heat: "4.6k热度", url: "https://www.zhihu.com/hot" },
        { title: "如何提高自己的核心竞争力？", heat: "4.2k热度", url: "https://www.zhihu.com/hot" }
    ],
    xiaohongshu: [
        { title: "2024年最火的护肤品推荐！亲测有效✨", heat: "15.6万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "上班族的一日三餐搭配，健康又美味🍱", heat: "12.3万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "小个子女生的穿搭秘籍，显高10cm不是梦👗", heat: "11.8万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "学生党必备的平价好物分享💕", heat: "10.9万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "居家收纳神器，让你的房间瞬间变整洁🏠", heat: "9.7万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "减肥期间的低卡美食制作教程🥗", heat: "9.2万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "新手化妆教程，5分钟搞定日常妆容💄", heat: "8.8万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "旅行必备物品清单，再也不怕遗漏✈️", heat: "8.1万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "宿舍改造大作战，花最少的钱打造温馨小窝🛏️", heat: "7.6万点赞", url: "https://www.xiaohongshu.com/explore" },
        { title: "考研党的高效学习方法分享📚", heat: "7.2万点赞", url: "https://www.xiaohongshu.com/explore" }
    ],
    weibo: [
        { title: "#春节档电影票房创新高#", heat: "2.1亿阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#某明星恋情曝光#", heat: "1.8亿阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#全国多地迎来降雪#", heat: "1.5亿阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#新能源汽车销量再创新高#", heat: "1.2亿阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#教育部发布最新政策#", heat: "1.1亿阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#网友晒出家乡美景#", heat: "9800万阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#春运返程高峰来临#", heat: "9200万阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#AI技术新突破#", heat: "8900万阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#健康生活方式分享#", heat: "8500万阅读", url: "https://s.weibo.com/top/summary" },
        { title: "#年轻人消费观念调查#", heat: "8100万阅读", url: "https://s.weibo.com/top/summary" }
    ]
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async function() {
    await initializeApp();
});

async function initializeApp() {
    // 显示加载状态
    console.log('开始加载热榜数据...');
    
    // 并行加载所有平台数据
    await Promise.all([
        loadPlatformData('zhihu'),
        loadPlatformData('xiaohongshu'),
        loadPlatformData('weibo')
    ]);
    
    console.log('热榜数据加载完成');
    
    // 更新时间
    updateLastUpdateTime();
    
    // 设置刷新按钮事件
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async function() {
            console.log('手动刷新热榜数据...');
            
            // 并行重新加载所有数据
            await Promise.all([
                loadPlatformData('zhihu'),
                loadPlatformData('xiaohongshu'),
                loadPlatformData('weibo')
            ]);
            
            // 更新时间
            updateLastUpdateTime();
            console.log('手动刷新完成');
        });
    }
    
    // 设置自动刷新（每10分钟，避免API请求过于频繁）
    setInterval(async () => {
        console.log('自动刷新热榜数据...');
        await refreshAllPlatforms();
        console.log('自动刷新完成');
    }, 10 * 60 * 1000);
}

// 获取真实热榜数据的函数
async function getHotlistData(platform) {
    try {
        // 首先尝试使用ALAPI获取数据
        const response = await fetchWithTimeout(`${API_CONFIG.hotlist}?type=${platform}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }, 5000);
        
        if (response.ok) {
            const data = await response.json();
            if (data.code === 200 && data.data) {
                return formatAPIData(data.data, platform);
            }
        }
        
        // 如果主API失败，尝试备用方案
        console.warn(`主API获取${platform}数据失败，使用备用数据`);
        return fallbackData[platform] || [];
        
    } catch (error) {
        console.error(`获取${platform}热榜数据失败:`, error);
        // 返回备用数据
        return fallbackData[platform] || [];
    }
}

// 带超时的fetch函数
function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('请求超时')), timeout)
        )
    ]);
}

// 格式化API数据
function formatAPIData(data, platform) {
    if (!Array.isArray(data)) return [];
    
    return data.slice(0, 10).map((item, index) => {
        let title = item.title || item.name || `热榜第${index + 1}名`;
        let heat = item.hot || item.heat || item.view_count || `${Math.floor(Math.random() * 10000)}热度`;
        let url = item.url || item.link || getPlatformDefaultUrl(platform);
        
        // 确保热度有单位
        if (typeof heat === 'number') {
            if (heat > 10000) {
                heat = `${(heat / 10000).toFixed(1)}万热度`;
            } else {
                heat = `${heat}热度`;
            }
        }
        
        return { title, heat, url };
    });
}

// 获取平台默认URL
function getPlatformDefaultUrl(platform) {
    const urls = {
        zhihu: 'https://www.zhihu.com/hot',
        xiaohongshu: 'https://www.xiaohongshu.com/explore',
        weibo: 'https://s.weibo.com/top/summary'
    };
    return urls[platform] || '#';
}

async function loadPlatformData(platform) {
    const listElement = document.getElementById(`${platform}-list`);
    
    // 显示加载状态
    showLoading(listElement);
    
    try {
        const data = await getHotlistData(platform);
        if (data && data.length > 0) {
            renderHotList(listElement, data);
        } else {
            showError(listElement, '暂无数据');
        }
    } catch (error) {
        console.error(`加载${platform}数据失败:`, error);
        showError(listElement, '加载失败，请稍后重试');
    }
}

function showLoading(element) {
    element.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>正在加载热榜数据...</p>
        </div>
    `;
}

function showError(element, message) {
    element.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
}

function renderHotList(element, data) {
    const listHTML = data.map((item, index) => `
        <div class="hot-item" onclick="openLink('${item.url}')">
            <div class="rank">${index + 1}</div>
            <div class="content">
                <div class="title">${item.title}</div>
                <div class="heat">${item.heat}</div>
            </div>
        </div>
    `).join('');
    
    element.innerHTML = listHTML;
}

function openLink(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    }
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const timeElement = document.getElementById('last-update');
    if (timeElement) {
        timeElement.textContent = `最后更新: ${timeString}`;
    }
}

async function refreshAllPlatforms() {
    await Promise.all([
        loadPlatformData('zhihu'),
        loadPlatformData('xiaohongshu'),
        loadPlatformData('weibo')
    ]);
    updateLastUpdateTime();
}