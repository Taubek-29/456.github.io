document.addEventListener('DOMContentLoaded', function() {
    // Получаем сохраненные данные
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData'));
    
    if (!portfolioData) {
        alert('Данные не найдены. Пожалуйста, заполните форму сначала.');
        window.location.href = 'index.html';
        return;
    }
    
    // Заполняем данные
    document.getElementById('portfolio-name').textContent = portfolioData.name;
    document.getElementById('portfolio-job').textContent = portfolioData.job;
    document.getElementById('about-text').textContent = portfolioData.about;
    document.getElementById('contact-email').textContent = portfolioData.email;
    
    // Заполняем навыки
    const skillsList = document.getElementById('skills-list');
    portfolioData.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.textContent = skill;
        skillsList.appendChild(skillElement);
    });
    
    // Заполняем проекты
    const projectsGrid = document.getElementById('projects-grid');
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project}</h3>
            <p>Описание проекта и использованных технологий</p>
        `;
        projectsGrid.appendChild(projectCard);
    });
    
    // Управление слайдами
    let currentSlide = 1;
    const totalSlides = 4;
    const slides = document.querySelectorAll('.slide');
    
    function showSlide(n) {
        // Анимация перехода
        const animationType = document.querySelector('input[name="animation"]:checked').value;
        
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.animation = 'none';
        });
        
        setTimeout(() => {
            slides[n-1].classList.add('active');
            
            switch(animationType) {
                case 'slide':
                    slides[n-1].style.animation = 'slideInRight 0.5s ease-out';
                    break;
                case 'zoom':
                    slides[n-1].style.animation = 'zoomIn 0.5s ease-out';
                    break;
                default:
                    slides[n-1].style.animation = 'fadeIn 0.5s ease-out';
            }
            
            // Обновляем точки навигации
            document.querySelectorAll('.slide-dot').forEach(dot => {
                dot.classList.remove('active');
            });
            document.querySelector(`.slide-dot[data-slide="${n}"]`).classList.add('active');
            
            currentSlide = n;
        }, 10);
    }
    
    // Навигация по слайдам
    document.querySelector('.btn-next-slide').addEventListener('click', () => {
        if (currentSlide < totalSlides) {
            showSlide(currentSlide + 1);
        }
    });
    
    document.querySelector('.btn-prev-slide').addEventListener('click', () => {
        if (currentSlide > 1) {
            showSlide(currentSlide - 1);
        }
    });
    
    // Навигация по точкам
    document.querySelectorAll('.slide-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const slideNum = parseInt(dot.dataset.slide);
            showSlide(slideNum);
        });
    });
    
    // Боковая панель
    const sidebar = document.querySelector('.portfolio-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
    });
    
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
    
    // Выбор темы
    function applyTheme(theme) {
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
    }
    
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
            applyTheme(option.dataset.theme);
        });
    });
    
    // Инициализация
    showSlide(1);
    applyTheme(portfolioData.theme || 'minimal');
    
    // Установить активную тему в боковой панели
    setTimeout(() => {
        const activeTheme = document.querySelector(`.theme-option[data-theme="${portfolioData.theme || 'minimal'}"]`);
        if (activeTheme) activeTheme.classList.add('active');
    }, 100);
    
    // Редактирование текста (просто пример)
    document.querySelector('.btn-edit').addEventListener('click', () => {
        alert('В реальном приложении здесь будет открыт редактор текста');
    });
    
    // Скачивание PDF (просто пример)
    document.querySelector('.btn-download').addEventListener('click', () => {
        alert('В реальном приложении здесь будет генерация PDF');
    });
    
    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
            showSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
            showSlide(currentSlide - 1);
        }
    });
});