// 主JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categoryList = document.getElementById('categoryList');
    const categoryItems = categoryList.querySelectorAll('.category-item');
    const tags = document.querySelectorAll('.tag');
    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // 当前筛选条件
    let currentCategory = 'all';
    let currentTag = 'all';
    let searchKeyword = '';

    // 初始化页面
    renderCards();

    // 分类筛选事件
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新选中状态
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // 更新当前分类
            currentCategory = this.getAttribute('data-category');
            
            // 重新渲染卡片
            renderCards();
        });
    });

    // 标签筛选事件
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 更新选中状态
            tags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新当前标签
            currentTag = this.getAttribute('data-tag');
            
            // 重新渲染卡片
            renderCards();
        });
    });

    // 搜索功能
    searchBtn.addEventListener('click', function() {
        searchKeyword = searchInput.value.trim().toLowerCase();
        renderCards();
    });

    // 回车搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchKeyword = searchInput.value.trim().toLowerCase();
            renderCards();
        }
    });

    // 渲染卡片函数
    function renderCards() {
        // 清空容器
        cardsContainer.innerHTML = '';
        
        // 筛选数据
        let filteredData = websiteData.filter(item => {
            // 分类筛选
            const categoryMatch = currentCategory === 'all' || item.category === currentCategory;
            
            // 标签筛选
            const tagMatch = currentTag === 'all' || item.tags.includes(currentTag);
            
            // 搜索筛选
            const searchMatch = searchKeyword === '' || 
                                item.title.toLowerCase().includes(searchKeyword) || 
                                item.description.toLowerCase().includes(searchKeyword);
            
            return categoryMatch && tagMatch && searchMatch;
        });
        
        // 如果没有匹配结果
        if (filteredData.length === 0) {
            cardsContainer.innerHTML = '<div class="no-results">没有找到匹配的结果</div>';
            return;
        }
        
        // 渲染卡片
        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // 卡片点击事件
            card.addEventListener('click', function() {
                // 跳转到详情页，传递ID参数
                window.location.href = 'detail.html?id=' + item.id;
            });
            
            // 卡片内容
            card.innerHTML = `
                <div class="card-icon">
                    <img src="${item.previewImage || item.icon || 'https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/1963148410538950669~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1788792052&x-signature=IrRReamOYkBezdfmqPbdXASsKUM%3D'}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.description}</p>
                </div>
            `;
            
            cardsContainer.appendChild(card);
        });
    }
});