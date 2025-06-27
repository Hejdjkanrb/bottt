document.addEventListener('DOMContentLoaded', () => {
    // Modo oscuro
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = toggle.querySelector('i');
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    toggle.addEventListener('click', () => {
        body.classList.toggle('light');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
    });

    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Inicializar Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00a859' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#00a859', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    particlesJS('particles-success', {
        particles: { number: { value: 50 }, color: { value: '#1e3a8a' }, shape: { type: 'triangle' }, opacity: { value: 0.3 }, size: { value: 4 }, move: { speed: 1 } },
        interactivity: { events: { onhover: { enable: true, mode: 'bubble' } } }
    });

    particlesJS('particles-how', {
        particles: { number: { value: 60 }, color: { value: '#00a859' }, shape: { type: 'circle' }, opacity: { value: 0.4 }, size: { value: 3 }, move: { speed: 2 } },
        interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } }
    });

    particlesJS('particles-faq', {
        particles: { number: { value: 70 }, color: { value: '#1e3a8a' }, shape: { type: 'star' }, opacity: { value: 0.5 }, size: { value: 3 }, move: { speed: 1.5 } },
        interactivity: { events: { onclick: { enable: true, mode: 'push' } } }
    });

    particlesJS('particles-blog', {
        particles: { number: { value: 80 }, color: { value: '#00a859' }, shape: { type: 'circle' }, opacity: { value: 0.4 }, size: { value: 3 }, move: { speed: 2 } },
        interactivity: { events: { onhover: { enable: true, mode: 'bubble' } } }
    });

    // Inicializar Swiper.js
    const swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        coverflowEffect: { rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
        loop: true,
        autoplay: { delay: 5000 },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    // Control de videos
    const iframes = document.querySelectorAll('.video-card iframe');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const iframe = entry.target;
            if (entry.isIntersecting) {
                iframe.src = iframe.dataset.src || iframe.src;
            } else {
                iframe.src = '';
            }
        });
    }, { threshold: 0.5 });

    iframes.forEach(iframe => observer.observe(iframe));

    // Pausar videos no activos
    swiper.on('slideChange', () => {
        iframes.forEach(iframe => {
            iframe.src = '';
        });
        const activeIframe = document.querySelector('.swiper-slide-active .video-card iframe');
        if (activeIframe) {
            activeIframe.src = activeIframe.dataset.src || activeIframe.src;
        }
    });

    // Three.js Hero
    if (typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-3d'), alpha: true });
        renderer.setSize(400, 400);

        const loader = new THREE.GLTFLoader();
        loader.setDracoLoader(new THREE.DracoLoader());
        let model;
        loader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Phone.glb', (gltf) => {
            model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5);
            scene.add(model);
        }, undefined, () => {
            document.querySelector('.gsap-hero-image').classList.remove('hidden');
        });

        camera.position.z = 5;
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;

        function animateHero() {
            requestAnimationFrame(animateHero);
            if (model) {
                model.rotation.y += 0.01;
            }
            renderer.render(scene, camera);
        }
        animateHero();
    }

    // Three.js Carrusel
    if (typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('carousel-3d'), alpha: true });
        renderer.setSize(640, 360);

        const loader = new THREE.GLTFLoader();
        loader.setDracoLoader(new THREE.DracoLoader());
        let model;
        loader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/RobotExpressive.glb', (gltf) => {
            model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5);
            scene.add(model);
        }, undefined, () => {
            document.getElementById('carousel-3d').nextElementSibling.classList.remove('hidden');
        });

        camera.position.z = 5;
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const canvas = document.getElementById('carousel-3d');
        canvas.addEventListener('mousemove', (e) => {
            if (model) {
                const rect = canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to(model.rotation, { y: x * Math.PI, x: -y * Math.PI, duration: 0.5 });
            }
        });

        function animateCarousel() {
            requestAnimationFrame(animateCarousel);
            if (model) {
                model.rotation.y += 0.01;
            }
            renderer.render(scene, camera);
        }
        animateCarousel();
    }

    // Lottie Animaciones
    const lottieAnimations = [
        { id: 'lottie-benefit-1', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' },
        { id: 'lottie-benefit-2', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' },
        { id: 'lottie-benefit-3', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' },
        { id: 'lottie-benefit-4', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' },
        { id: 'lottie-success-1', path: 'https://assets.lottiefiles.com/packages/lf20_kkflmtur.json' },
        { id: 'lottie-success-2', path: 'https://assets.lottiefiles.com/packages/lf20_kkflmtur.json' },
        { id: 'lottie-success-3', path: 'https://assets.lottiefiles.com/packages/lf20_kkflmtur.json' },
        { id: 'lottie-blog-1', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' },
        { id: 'lottie-blog-2', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' },
        { id: 'lottie-blog-3', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' },
        { id: 'lottie-image', path: 'https://assets.lottiefiles.com/packages/lf20_3pg6t0yc.json' }
    ];

    lottieAnimations.forEach(anim => {
        if (typeof lottie !== 'undefined') {
            lottie.loadAnimation({
                container: document.getElementById(anim.id),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: anim.path
            });
        } else {
            document.getElementById(anim.id).nextElementSibling.classList.remove('hidden');
        }
    });

    // GSAP Animaciones
    gsap.from('.gsap-hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#hero', start: 'top 80%' }
    });

    gsap.from('.gsap-hero-text', {
        opacity: 0,
        y: 30,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#hero', start: 'top 80%' }
    });

    gsap.from('.gsap-hero-button', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '#hero', start: 'top 80%' }
    });

    gsap.from('#hero-3d', {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        delay: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#hero', start: 'top 80%' }
    });

    gsap.utils.toArray('.benefit-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' }
        });
    });

    gsap.utils.toArray('.success-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' }
        });
    });

    gsap.utils.toArray('.blog-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' }
        });
    });

    gsap.utils.toArray('.diagram-node').forEach((node, index) => {
        gsap.from(node, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: index * 0.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: '#how-it-works', start: 'top 80%' }
        });
    });

    gsap.utils.toArray('.diagram-line').forEach((line, index) => {
        gsap.from(line, {
            strokeDasharray: 100,
            strokeDashoffset: 100,
            duration: 1,
            delay: index * 0.5 + 0.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: '#how-it-works', start: 'top 80%' }
        });
    });

    gsap.utils.toArray('.swiper-slide').forEach((slide, index) => {
        gsap.from(slide, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: slide, start: 'top 80%' }
        });
    });

    // Parallax
    gsap.to('#hero video', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('#hero-3d', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top 80%',
            end: 'bottom top',
            scrub: true
        }
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.transform = `scaleY(${scrolled / 100})`;
    });

    // Contadores animados
    const counters = document.querySelectorAll('.countup');
    const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const count = new CountUp(entry.target, entry.target.getAttribute('data-count'), { duration: 2 });
                count.start();
                observerCounter.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observerCounter.observe(counter));

    // Header scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // FAQ Acordeón
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isOpen = content.classList.contains('hidden');
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-toggle i').forEach(i => i.classList.replace('fa-chevron-up', 'fa-chevron-down'));
            if (isOpen) {
                content.classList.remove('hidden');
                toggle.querySelector('i').classList.replace('fa-chevron-down', 'fa-chevron-up');
                gsap.from(content, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.out' });
            }
        });
    });

    // Validación del formulario
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const business = document.getElementById('business').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !business || !message) {
            formMessage.classList.remove('hidden', 'success');
            formMessage.classList.add('error');
            formMessage.textContent = 'Por favor, completa todos los campos.';
            gsap.fromTo(formMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            formMessage.classList.remove('hidden', 'success');
            formMessage.classList.add('error');
            formMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
            gsap.fromTo(formMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            return;
        }

        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ name, email, business, message })
            });

            const result = await response.text();
            formMessage.classList.remove('hidden', 'error');
            formMessage.classList.add('success');
            formMessage.textContent = result;
            gsap.fromTo(formMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            form.reset();
        } catch (error) {
            formMessage.classList.remove('hidden', 'success');
            formMessage.classList.add('error');
            formMessage.textContent = 'Error al enviar el mensaje.';
            gsap.fromTo(formMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    });
});