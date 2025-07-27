// 模拟数据 - 实际项目中需要通过后端API获取
const mockData = {
    zhihu: [
        { title: "如何看待2024年人工智能的发展趋势？", heat: "1.2万热度", url: "#" },
        { title: "程序员35岁危机是真的吗？", heat: "8.5k热度", url: "#" },
        { title: "为什么现在的年轻人越来越不愿意加班？", heat: "7.8k热度", url: "#" },
        { title: "如何评价ChatGPT对传统行业的影响？", heat: "6.9k热度", url: "#" },
        { title: "在北京月薪2万是什么水平？", heat: "6.2k热度", url: "#" },
        { title: "为什么很多人说学历不重要，但招聘时又要求学历？", heat: "5.8k热度", url: "#" },
        { title: "如何看待现在的房价走势？", heat: "5.5k热度", url: "#" },
        { title: "年轻人应该如何理财？", heat: "4.9k热度", url: "#" },
        { title: "为什么现在找工作这么难？", heat: "4.6k热度", url: "#" },
        { title: "如何提高自己的核心竞争力？", heat: "4.2k热度", url: "#" }
    ],
    xiaohongshu: [
        { title: "2024年最火的护肤品推荐！亲测有效✨", heat: "15.6万点赞", url: "#" },
        { title: "上班族的一日三餐搭配，健康又美味🍱", heat: "12.3万点赞", url: "#" },
        { title: "小个子女生的穿搭秘籍，显高10cm不是梦👗", heat: "11.8万点赞", url: "#" },
        { title: "学生党必备的平价好物分享💕", heat: "10.9万点赞", url: "#" },
        { title: "居家收纳神器，让你的房间瞬间变整洁🏠", heat: "9.7万点赞", url: "#" },
        { title: "减肥期间的低卡美食制作教程🥗", heat: "9.2万点赞", url: "#" },
        { title: "新手化妆教程，5分钟搞定日常妆容💄", heat: "8.8万点赞", url: "#" },
        { title: "旅行必备物品清单，再也不怕遗漏✈️", heat: "8.1万点赞", url: "#" },
        { title: "宿舍改造大作战，花最少的钱打造温馨小窝🛏️", heat: "7.6万点赞", url: "#" },
        { title: "考研党的高效学习方法分享📚", heat: "7.2万点赞", url: "#" }
    ],
    weibo: [
        { title: "#春节档电影票房创新高#", heat: "2.1亿阅读", url: "#" },
        { title: "#某明星恋情曝光#", heat: "1.8亿阅读", url: "#" },
        { title: "#全国多地迎来降雪#", heat: "1.5亿阅读", url: "#" },
        { title: "#新能源汽车销量再创新高#", heat: "1.2亿阅读", url: "#" },
        { title: "#教育部发布最新政策#", heat: "1.1亿阅读", url: "#" },
        { title: "#网友晒出家乡美景#", heat: "9800万阅读", url: "#" },
        { title: "#春运返程高峰来临#", heat: "9200万阅读", url: "#" },
        { title: "#AI技术新突破#", heat: "8900万阅读", url: "#" },
        { title: "#健康生活方式分享#", heat: "8500万阅读", url: "#" },
        { title: "#年轻人消费观念调查#", heat: "8100万阅读", url: "#" }
    ]
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 加载所有平台数据
    loadPlatformData('zhihu');
    loadPlatformData('xiaohongshu');
    loadPlatformData('weibo');
    
    // 更新时间
    updateLastUpdateTime();
    
    // 设置自动刷新（每5分钟）
    setInterval(() => {
        refreshAllPlatforms();
    }, 5 * 60 * 1000);
}

function loadPlatformData(platform) {
    const listElement = document.getElementById(`${platform}-list`);
    
    // 显示加载状态
    showLoading(listElement);
    
    // 模拟API请求延迟
    setTimeout(() => {
        try {
            const data = mockData[platform];
            if (data && data.length > 0) {
                renderHotList(listElement, data);
            } else {
                showError(listElement, '暂无数据');
            }
        } catch (error) {
            console.error(`加载${platform}数据失败:`, error);
            showError(listElement, '加载失败，请稍后重试');
        }
    }, Math.random() * 1000 + 500); // 随机延迟500-1500ms
}

function renderHotList(container, data) {
    container.innerHTML = '';
    
    data.forEach((item, index) => {
        const hotItem = createHotItem(item, index + 1);
        container.appendChild(hotItem);
    });
}

function createHotItem(item, rank) {
    const hotItem = document.createElement('div');
    hotItem.className = 'hot-item';
    hotItem.onclick = () => openLink(item.url);
    
    const rankClass = rank <= 3 ? 'top3' : 'normal';
    
    hotItem.innerHTML = `
        <div class="hot-rank ${rankClass}">${rank}</div>
        <div class="hot-content">
            <div class="hot-title">${item.title}</div>
            <div class="hot-meta">
                <span class="hot-heat">${item.heat}</span>
                <span class="hot-time">${getRandomTime()}</span>
            </div>
        </div>
    `;
    
    return hotItem;
}

function showLoading(container) {
    container.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>加载中...</span>
        </div>
    `;
}

function showError(container, message) {
    container.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <div>${message}</div>
        </div>
    `;
}

function refreshPlatform(platform) {
    const refreshBtn = event.target.closest('.refresh-btn');
    const icon = refreshBtn.querySelector('i');
    
    // 添加旋转动画
    icon.style.animation = 'spin 1s linear';
    
    // 重新加载数据
    loadPlatformData(platform);
    
    // 移除动画
    setTimeout(() => {
        icon.style.animation = '';
    }, 1000);
    
    // 更新时间
    updateLastUpdateTime();
}

function refreshAllPlatforms() {
    loadPlatformData('zhihu');
    loadPlatformData('xiaohongshu');
    loadPlatformData('weibo');
    updateLastUpdateTime();
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        lastUpdateElement.textContent = timeString;
    }
}

function getRandomTime() {
    const minutes = Math.floor(Math.random() * 60) + 1;
    return `${minutes}分钟前`;
}

function openLink(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// 实际项目中的API调用示例（注释掉的代码）
/*
async function fetchRealData(platform) {
    try {
        // 这里需要后端API支持，避免跨域问题
        const response = await fetch(`/api/hotlist/${platform}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
        throw error;
    }
}

// 知乎热榜API（需要后端代理）
// https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total

// 微博热搜API（需要后端代理）
// https://weibo.com/ajax/side/hotSearch

// 小红书热榜（需要爬虫或第三方API）
// 由于小红书没有公开API，需要通过爬虫获取

*/