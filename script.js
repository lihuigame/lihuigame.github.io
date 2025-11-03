// 当前语言
let currentLang = 'en';

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言设置
    initLanguage();
    
    // 移动菜单切换功能
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 语言切换功能
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            toggleLanguage();
        });
    }
    
    // 平滑滚动功能
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 计算目标位置，考虑固定导航栏的高度
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 关闭移动菜单（如果打开）
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // 联系表单处理
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // 在实际应用中，这里应该发送数据到服务器
            // 这里仅做演示，显示成功消息
            alert(currentLang === 'en' ? 'Thank you for your message! We will get back to you soon.' : '感谢您的留言！我们会尽快回复您。');
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--primary)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // 游戏卡片动画效果
    const gameCards = document.querySelectorAll('.game-card');
    
    // 创建IntersectionObserver来检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 为游戏卡片添加初始样式和观察
    gameCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 关于我们区域动画效果
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateX(20px)';
        aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.2
        });
        
        aboutObserver.observe(aboutContent);
    }
    
    // 隐私政策区域动画效果
    const policySections = document.querySelectorAll('.policy-section');
    
    policySections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(section);
    });
    
    // 添加滚动到顶部按钮
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);
    
    // 显示/隐藏滚动到顶部按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // 滚动到顶部功能
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});

// 初始化语言设置
function initLanguage() {
    // 检查本地存储中的语言设置
    const savedLang = localStorage.getItem('lihuigames-lang');
    
    if (savedLang) {
        currentLang = savedLang;
    } else {
        // 检测浏览器语言
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('zh')) {
            currentLang = 'zh';
        } else {
            currentLang = 'en';
        }
    }
    
    // 更新页面语言
    updatePageLanguage();
}

// 切换语言
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('lihuigames-lang', currentLang);
    updatePageLanguage();
}

// 更新页面语言
function updatePageLanguage() {
    // 更新语言切换按钮文本
    const langText = document.querySelector('.lang-text');
    const langFlag = document.querySelector('.lang-flag');
    
    if (currentLang === 'en') {
        langText.textContent = 'EN';
        langFlag.textContent = '🌐';
    } else {
        langText.textContent = '中文';
        langFlag.textContent = '🌐';
    }
    
    // 更新页面内容
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (languagePack[currentLang] && languagePack[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', languagePack[currentLang][key]);
            } else {
                element.textContent = languagePack[currentLang][key];
            }
        }
    });
    
    // 更新HTML lang属性
    document.documentElement.setAttribute('lang', currentLang);
    
    // 更新页面标题
    const titleElement = document.querySelector('title');
    if (titleElement) {
        titleElement.textContent = currentLang === 'en' 
            ? 'LIHUIGAMES - Innovative Game Development Studio' 
            : 'LIHUIGAMES - 创新游戏开发工作室';
    }
}