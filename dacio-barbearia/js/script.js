        /**
         * ESTRUTURA DO CARROSSEL 3D:
         * Organiza os cards em um círculo 3D.
         * O raio do círculo é calculado matematicamente baseado na quantidade de cards.
         */
        const stage = document.getElementById('carousel-stage');
        const cards = document.querySelectorAll('.carousel-card');
        const container = document.getElementById('carousel-container');
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');

        const totalCards = cards.length;
        const angleStep = 360 / totalCards;
        
        // Raio do cilindro 3D (distancia do centro ate o card)
        let radius;

        let currentAngle = 0; // Angulo atual de rotacao
        // Configuração inicial de posicionamento dos cards no cilindro 3D
        function setupCarousel() {
            const cardWidth = cards[0].getBoundingClientRect().width;
            radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / totalCards)) + 60;

            cards.forEach((card, index) => {
                const angle = index * angleStep;
                // Cada card é rotacionado no seu próprio eixo Y e empurrado para fora pelo raio
                card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            });
            updateCarousel();
        }

        // Atualiza rotação do palco
        function updateCarousel() {
            stage.style.transform = `rotateY(${currentAngle}deg)`;
            updateCardVisuals();
        }

        // Aplica efeito de opacidade nos cards traseiros para dar foco no card frontal
        function updateCardVisuals() {
            cards.forEach((card, index) => {
                const cardAngle = index * angleStep;
                // Normaliza o ângulo para descobrir qual card está virado para a frente (0 graus)
                let normalized = (cardAngle + currentAngle) % 360;
                if (normalized < 0) normalized += 360;

                // Se o card está na frente (próximo de 0 ou 360 graus)
                const isFront = normalized < 25 || normalized > 335;
                
                if (isFront) {
                    card.style.opacity = '1';
                    card.style.filter = 'none';
                    card.style.zIndex = '20';
                } else {
                    card.style.opacity = '0.5';
                    card.style.filter = 'blur(2px) grayscale(40%)';
                    card.style.zIndex = '1';
                }
            });
        }

        /* ==========================================
           LÓGICA DE ARRASTE COM MOUSE E TOUCH
           ========================================== */
        let isDragging = false;
        let startX = 0;
        let previousAngle = 0;

        // Início do arraste (Mouse)
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            previousAngle = currentAngle;
            container.style.cursor = 'grabbing';
        });

        // Movimento do arraste (Mouse global na janela)
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            // Sensibilidade do movimento (0.45 para giro natural)
            currentAngle = previousAngle + (deltaX * 0.45);
            updateCarousel();
        });

        // Fim do arraste (Mouse)
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                container.style.cursor = 'grab';
                // Alinha suavemente com o card mais próximo
                snapToNearestCard();
            }
        });

        // Suporte para Telas Touch (Celulares / Tablets)
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            previousAngle = currentAngle;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const deltaX = e.touches[0].clientX - startX;
            currentAngle = previousAngle + (deltaX * 0.5);
            updateCarousel();
        }, { passive: true });

        window.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                snapToNearestCard();
            }
        });

        // Ajusta o carrossel para parar exatamente de frente para um card
        function snapToNearestCard() {
            const cardIndex = Math.round(currentAngle / angleStep);
            currentAngle = cardIndex * angleStep;
            stage.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            updateCarousel();
            setTimeout(() => {
                stage.style.transition = 'transform 0.1s ease-out';
            }, 400);
        }

        // Botões Laterais de Navegação
        btnPrev.addEventListener('click', () => {
            currentAngle += angleStep;
            snapToNearestCard();
        });

        btnNext.addEventListener('click', () => {
            currentAngle -= angleStep;
            snapToNearestCard();
        });

        // Inicializa o carrossel quando a página carrega
        window.onload = () => {
            setupCarousel();
        };

        window.addEventListener('resize', setupCarousel);
    