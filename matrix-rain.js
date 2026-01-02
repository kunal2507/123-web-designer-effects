// ==============================
// MINIMAL MATRIX RAIN
// ==============================
(function () {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Configuration
    const chars = "01";
    const fontSize = 20;
    let columns = Math.floor(canvas.width / (fontSize * 1.1));
    let drops = [];

    function initDrops() {
        columns = Math.floor(canvas.width / (fontSize * 1.1));
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = {
                x: i * fontSize * 1.3,
                y: -Math.random() * canvas.height,
                speed: 0.5 + Math.random() * 2,
                length: 3 + Math.floor(Math.random() * 8),
                chars: []
            };
        }
    }

    initDrops();

    // Re-init on resize
    window.addEventListener('resize', initDrops);

    function draw() {
        ctx.fillStyle = 'rgba(2, 6, 20, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `bold ${fontSize}px Courier New`;

        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            drop.y += drop.speed;

            if (drop.y > canvas.height + drop.length * fontSize) {
                drop.y = -drop.length * fontSize;
                drop.chars = [];
            }

            if (Math.random() > 0.9 || drop.chars.length === 0) {
                drop.chars.unshift(chars[Math.floor(Math.random() * chars.length)]);
                if (drop.chars.length > drop.length) {
                    drop.chars.pop();
                }
            }

            for (let j = 0; j < drop.chars.length; j++) {
                const opacity = j === 0 ? 0.8 : 0.8 - (j / drop.length * 0.8);
                ctx.fillStyle = `rgba(9, 174, 255, ${opacity})`;
                ctx.fillText(drop.chars[j], drop.x, drop.y + j * fontSize);
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();
