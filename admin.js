const { getJobs, saveJobs } = window.Sarkarijoblist;
let jobs = getJobs();

// Admin Credentials
const ADMIN_EMAIL = "manishratnakar09@gmail.com";
const ADMIN_PASS = "Manish@12";

// Auth Check
const checkAuth = () => {
    const isLogged = sessionStorage.getItem('admin_logged_in');
    const overlay = document.getElementById('admin-login-overlay');
    if (isLogged === 'true') {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                overlay.style.display = 'none';
                animateAdminEntrance();
            }
        });
    } else {
        overlay.style.display = 'flex';
        animateLoginEntrance();
    }
};

const animateLoginEntrance = () => {
    gsap.from('.login-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });
    
    gsap.from('.login-card > *', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
    });
};

const animateAdminEntrance = () => {
    gsap.from('.header-actions', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.admin-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
    });
};

// Login Handler
const loginForm = document.getElementById('admin-login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const pass = document.getElementById('admin-password').value;

    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
        sessionStorage.setItem('admin_logged_in', 'true');
        checkAuth();
    } else {
        loginError.style.display = 'block';
        gsap.to('.login-card', { x: 10, duration: 0.1, repeat: 5, yoyo: true });
    }
});

// Run auth check on load
checkAuth();

// Logout Handler
document.getElementById('admin-logout')?.addEventListener('click', () => {
    gsap.to('.app', {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        onComplete: () => {
            sessionStorage.removeItem('admin_logged_in');
            location.reload();
        }
    });
});

const jobListContainer = document.getElementById('admin-job-list');
const addJobForm = document.getElementById('add-job-form');

function renderJobList() {
    jobListContainer.innerHTML = '';
    jobs.forEach((job) => {
        const item = document.createElement('div');
        item.className = 'job-list-item';
        item.innerHTML = `
            <div>
                <div style="font-weight: 600;">${job.title}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted)">${job.company} • ${job.location}</div>
            </div>
            <button class="btn-danger" data-id="${job.id}">Delete</button>
        `;
        jobListContainer.appendChild(item);
        
        // Quick entrance for each item
        gsap.from(item, {
            x: -20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Add delete event listeners
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            deleteJob(id, e.target.parentElement);
        });
    });
}

function deleteJob(id, element) {
    if (confirm('Are you sure you want to delete this position?')) {
        gsap.to(element, {
            height: 0,
            opacity: 0,
            padding: 0,
            duration: 0.4,
            onComplete: () => {
                jobs = jobs.filter(job => job.id !== id);
                saveJobs(jobs);
                renderJobList();
            }
        });
    }
}

addJobForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newJob = {
        id: Date.now(),
        title: document.getElementById('title').value,
        company: document.getElementById('company').value,
        location: document.getElementById('location').value,
        type: document.getElementById('type').value,
        salary: document.getElementById('salary').value,
        tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    jobs.unshift(newJob);
    saveJobs(jobs);
    addJobForm.reset();
    renderJobList();
    
    // Success feedback
    const btn = addJobForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = '✓ Deployed to Mainframe';
    btn.style.background = 'var(--secondary)';
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
    }, 2000);
});

// Initial Render
renderJobList();
