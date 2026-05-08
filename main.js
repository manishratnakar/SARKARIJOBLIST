// Three.js is loaded via script tag in index.html


class Experience {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.mouse = new THREE.Vector2();
        this.targetMouse = new THREE.Vector2();
        
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.addObjects();
        this.addLights();
        this.addEventListeners();
        this.animate();
    }

    addObjects() {
        // Create a particle system for a futuristic network feel
        const geometry = new THREE.BufferGeometry();
        const count = 3000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 15;
            colors[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.015,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);

        // Add a central glowing torus knot
        const torusGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 150, 20);
        const torusMat = new THREE.MeshPhongMaterial({
            color: 0x8a2be2,
            wireframe: true,
            transparent: true,
            opacity: 0.1,
            emissive: 0x8a2be2,
            emissiveIntensity: 0.5
        });
        this.torus = new THREE.Mesh(torusGeo, torusMat);
        this.scene.add(this.torus);
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f2fe, 2);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x8a2be2, 2);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Smooth mouse movement
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Animate objects
        this.points.rotation.y += 0.001;
        this.points.rotation.x = this.mouse.y * 0.2;
        this.points.rotation.y = this.mouse.x * 0.2;

        this.torus.rotation.x += 0.005;
        this.torus.rotation.y += 0.003;
        this.torus.position.x = this.mouse.x * 0.5;
        this.torus.position.y = this.mouse.y * 0.5;

        this.renderer.render(this.scene, this.camera);
    }
}

window.experience = new Experience();

// Login Modal Logic
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');

if (loginBtn && loginModal && closeModal) {
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
        gsap.fromTo('.modal-content', 
            { scale: 0.8, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );
        
        // Stagger social buttons entrance
        gsap.from('.social-btn', {
            x: -30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
        });
    });

    closeModal.addEventListener('click', () => {
        gsap.to('.modal-content', {
            scale: 0.8,
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                loginModal.classList.remove('active');
            }
        });
    });

    // Close on outside click
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeModal.click();
        }
    });
}

// Social Login Handlers
const handleSocialLogin = (provider) => {
    console.log(`Attempting login with ${provider}...`);
    // In a real app, you would integrate with Firebase, Auth0, etc.
    // For this demo, we'll show a nice notification
    const modalContent = document.querySelector('.modal-content');
    const originalContent = modalContent.innerHTML;

    gsap.to('.modal-content', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
            modalContent.innerHTML = `
                <div style="padding: 2rem;">
                    <div class="loader" style="margin-bottom: 1.5rem;"></div>
                    <h2 style="margin-bottom: 0.5rem;">Connecting to ${provider}...</h2>
                    <p style="color: var(--text-muted)">Please wait while we authenticate your account.</p>
                </div>
            `;
            gsap.to('.modal-content', { opacity: 1, y: 0, duration: 0.3 });

            // Simulate successful login
            setTimeout(() => {
                gsap.to('.modal-content', {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    onComplete: () => {
                        modalContent.innerHTML = `
                            <div style="padding: 2rem;">
                                <div style="font-size: 4rem; color: var(--secondary); margin-bottom: 1rem;">✓</div>
                                <h2 style="margin-bottom: 0.5rem;">Login Successful!</h2>
                                <p style="color: var(--text-muted)">Welcome back to Sarkarijoblist.</p>
                            </div>
                        `;
                        gsap.to('.modal-content', { opacity: 1, y: 0, duration: 0.3 });
                        
                        setTimeout(() => {
                            loginModal.classList.remove('active');
                            // Reset modal for next time
                            modalContent.innerHTML = originalContent;
                            // Re-attach close event because we replaced innerHTML
                            document.getElementById('close-modal').addEventListener('click', () => {
                                loginModal.classList.remove('active');
                            });
                        }, 2000);
                    }
                });
            }, 2000);
        }
    });
};

document.getElementById('google-login')?.addEventListener('click', () => handleSocialLogin('Google'));
document.getElementById('facebook-login')?.addEventListener('click', () => handleSocialLogin('Facebook'));
document.getElementById('linkedin-login')?.addEventListener('click', () => handleSocialLogin('LinkedIn'));

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const moonPath = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
const sunPath = "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z";

const updateTheme = (isLight) => {
    if (isLight) {
        body.setAttribute('data-theme', 'light');
        themeIcon.querySelector('path').setAttribute('d', sunPath);
        // Update 3D colors for light mode if experience exists
        if (window.experience) {
            window.experience.scene.background = new THREE.Color(0xf0f2f5);
            window.experience.points.material.opacity = 0.3;
        }
    } else {
        body.removeAttribute('data-theme');
        themeIcon.querySelector('path').setAttribute('d', moonPath);
        if (window.experience) {
            window.experience.scene.background = null;
            window.experience.points.material.opacity = 0.8;
        }
    }
};

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    updateTheme(true);
}

themeToggle?.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    updateTheme(!isLight);
    localStorage.setItem('theme', !isLight ? 'light' : 'dark');
    
    // Add a quick spin animation
    gsap.to(themeIcon, {
        rotation: "+=360",
        duration: 0.5,
        ease: "back.out(1.7)"
    });
});
