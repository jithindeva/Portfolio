/**
 * D.P. JITHIN - SOFTWARE DEVELOPER PORTFOLIO INTERACTIVE SCRIPT
 * Pure Vanilla JavaScript (ES6+) with Real Resume Projects & Data
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScrollSpy();
    initProjectsGridAndModal();
    initRealtimeContactForm();
    initCardTiltEffect();
    initInteractiveDividers();
    initResumeDownload();
    removeHashUrls();
});

/* --------------------------------------------------------------------------
   2. NAV SCROLLSPY & STICKY HEADER
   -------------------------------------------------------------------------- */
function initNavbarScrollSpy() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // If the section's top crosses the bottom 70% of the screen, activate it
            if (rect.top <= window.innerHeight * 0.7) {
                current = section.getAttribute('id');
            }
        });

        // Failsafe for the very bottom of the page
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 20) {
            current = 'contact';
        }

        const indicator = document.getElementById('floating-indicator');
        const indicatorText = document.getElementById('indicator-text');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const target = link.getAttribute('data-target') || link.getAttribute('href');
            if (target === `#${current}`) {
                link.classList.add('active');
                if (indicatorText) {
                    indicatorText.textContent = link.textContent;
                }
            }
        });

        if (indicator) {
            if (window.scrollY > 200 && current !== 'hero') {
                indicator.classList.add('visible');
            } else {
                indicator.classList.remove('visible');
            }
        }
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

/* --------------------------------------------------------------------------
   3. REAL RESUME PROJECTS DATA & MODAL GENERATOR
   -------------------------------------------------------------------------- */
const projectsData = [
    {
        id: 'resume-analyzer',
        title: 'Resume Analyzer',
        category: 'fullstack',
        categoryName: 'AI & Recruiter Tool',
        shortDesc: 'Web application analyzing uploaded resumes to extract skills, qualifications, and keywords to help recruiters shortlist candidates efficiently.',
        fullDesc: 'Resume Analyzer is a web application designed to help recruiters shortlist candidates efficiently and enable job seekers to optimize their resumes for ATS screening. Automatically parses documents, extracts key skills, and computes keyword match ratios.',
        tags: ['JavaScript', 'Node.js', 'MongoDB', 'HTML', 'CSS'],
        github: 'https://github.com/jithindeva',
        features: [
            'Automated Resume Skill & Qualification Keyword Extraction',
            'Recruiter Candidate Shortlisting Dashboard',
            'Job Seeker Keyword Match Score Optimization',
            'MongoDB Document Parsing & Storage'
        ],
        role: 'Full-Stack Developer',
        challenges: 'Parsing multi-format resume files and matching key tech stack terms accurately.',
        results: 'Boosted candidate shortlisting speed for recruiters by 70%.'
    },
    {
        id: 'youtube-analyzer',
        title: 'YouTube Watch History Analyzer & Recommendation',
        category: 'datascience',
        categoryName: 'Data Analytics & ML Portal',
        shortDesc: 'Platform analyzing YouTube watch history to provide personalized recommendations, cluster videos by skill, and track learning patterns.',
        fullDesc: 'A data-driven platform that processes users\' YouTube watch history data. Features personalized video recommendations, video clustering by skill domain, content summarization, and interactive learning progress tracking.',
        tags: ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Python'],
        github: 'https://github.com/jithindeva',
        features: [
            'Watch History Skill Domain Clustering & Summarization',
            'Personalized Video Recommendation Engine',
            'Interactive Learning Pattern Tracker Dashboard',
            'Python Backend Data Processing Pipeline'
        ],
        role: 'Lead Data & Full-Stack Engineer',
        challenges: 'Clustering video topics accurately and generating personalized recommendation pipelines.',
        results: 'Delivered actionable learning metrics and custom skill cluster visualizations.'
    },

    {
        id: 'portfolio-website',
        title: 'Personal Developer Portfolio Website',
        category: 'frontend',
        categoryName: 'Web & Portfolio',
        shortDesc: 'Personal portfolio website showcasing projects, skills, certificates, and professional information with responsive design.',
        fullDesc: 'Designed and built a personal developer portfolio website showcasing engineering projects, technical skills, academic credentials, and interactive case study modals.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
        github: 'https://github.com/jithindeva',
        features: [
            'High-Contrast Fixed Dark Executive Aesthetics',
            'Interactive IDE Code Terminal Snippet Widgets',
            'Instant Resume PDF Download Handling',
            'Real-Time Direct Email Contact Form'
        ],
        role: 'Frontend Architect',
        challenges: 'Achieving 100 FPS fluid layout transitions without third-party frameworks.',
        results: 'Created a world-class portfolio showcasing software engineering projects.'
    }
];

function initProjectsGridAndModal() {
    const grid = document.getElementById('projects-grid');
    const modalOverlay = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');

    if (!grid) return;

    function renderProjects() {
        grid.innerHTML = '';
        projectsData.forEach(p => {
            const card = document.createElement('div');
            card.className = 'glass-card project-card';

            const tagsHTML = p.tags.map(t => `<span class="badge-pill">${t}</span>`).join(' ');

            card.innerHTML = `
                <div class="project-badge">${p.categoryName}</div>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.shortDesc}</p>
                <div class="project-tags">${tagsHTML}</div>
                <div class="project-actions">
                    <button class="btn-case-study view-modal-btn" data-id="${p.id}">
                        Case Study <i class="fas fa-arrow-right"></i>
                    </button>
                    <a onclick="window.open('${p.github}', '_blank')" rel="noopener noreferrer" class="btn-case-study" title="GitHub Source" style="cursor: pointer;">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.view-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                openProjectModal(id);
            });
        });
    }

    function openProjectModal(id) {
        const p = projectsData.find(item => item.id === id);
        if (!p || !modalOverlay) return;

        document.getElementById('modal-title').textContent = p.title;
        document.getElementById('modal-category').textContent = p.categoryName;
        document.getElementById('modal-desc').textContent = p.fullDesc;

        document.getElementById('modal-features').innerHTML = p.features.map(f => `
            <li style="margin-bottom: 0.5rem; color: var(--text-primary);"><i class="fas fa-check-circle" style="color: var(--secondary); margin-right: 8px;"></i>${f}</li>
        `).join('');

        document.getElementById('modal-role').textContent = p.role;
        document.getElementById('modal-challenges').textContent = p.challenges;
        document.getElementById('modal-results').textContent = p.results;

        document.getElementById('modal-tags').innerHTML = p.tags.map(t => `<span class="badge-pill">${t}</span>`).join(' ');
        const modalGithub = document.getElementById('modal-github');
        modalGithub.onclick = () => window.open(p.github, '_blank');

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    renderProjects();
}

/* --------------------------------------------------------------------------
   4. CARD 3D TILT EFFECT
   -------------------------------------------------------------------------- */
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        if (card.closest('#contact') || card.closest('#experience')) return; // Disable movement animation for contact and experience pages

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* --------------------------------------------------------------------------
   5. REAL-TIME CONTACT FORM (DIRECT MAILTO DISPATCH)
   -------------------------------------------------------------------------- */
function initRealtimeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !message) return;

        const btn = form.querySelector('button[type="submit"]');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(response => response.json())
            .then(data => {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
                form.reset();
                setTimeout(() => { btn.innerHTML = origText; }, 3000);
            })
            .catch(error => {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
                form.reset();
                setTimeout(() => { btn.innerHTML = origText; }, 3000);
            });
    });

    window.copyToClipboard = function (text, btn) {
        navigator.clipboard.writeText(text).then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = orig; }, 2000);
        });
    };
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE DIVIDER SCROLL ANIMATION
   -------------------------------------------------------------------------- */
function initInteractiveDividers() {
    const dividers = document.querySelectorAll('.interactive-divider');
    if (!dividers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Optional: remove class when out of view so it animates again next time you scroll to it
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the invisible 60px gap is in view
    });

    dividers.forEach(divider => observer.observe(divider));
}

/* --------------------------------------------------------------------------
   7. RESUME OPEN & DOWNLOAD HANDLER
   -------------------------------------------------------------------------- */
function initResumeDownload() {
    const resumeBtns = document.querySelectorAll('.btn-download-resume');
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Open the PDF in a new tab for viewing
            window.open('D_P_Jithin_Resume.pdf', '_blank');
            
            // 2. Force download the PDF
            const tempLink = document.createElement('a');
            tempLink.href = 'D_P_Jithin_Resume.pdf';
            tempLink.setAttribute('download', 'D_P_Jithin_Resume.pdf');
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            // 3. Show a top toast notification
            showDownloadToast();
        });
    });
}

function showDownloadToast() {
    const toast = document.createElement('div');
    toast.innerHTML = '<i class="fas fa-check-circle" style="margin-right: 8px;"></i> Resume Downloaded Successfully!';
    toast.style.position = 'fixed';
    toast.style.top = '-50px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--secondary, #10B981)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    toast.style.zIndex = '99999';
    toast.style.fontWeight = '600';
    toast.style.fontFamily = 'var(--font-heading, sans-serif)';
    toast.style.transition = 'top 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    
    document.body.appendChild(toast);
    
    // Slide down
    setTimeout(() => {
        toast.style.top = '20px';
    }, 100);
    
    // Slide up and remove
    setTimeout(() => {
        toast.style.top = '-50px';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 400);
    }, 3500);
}

/* --------------------------------------------------------------------------
   8. HIDE INTERNAL URLS ON HOVER
   -------------------------------------------------------------------------- */
function removeHashUrls() {
    const hashLinks = document.querySelectorAll('a[href^="#"]');
    hashLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        link.setAttribute('data-target', targetId);
        link.removeAttribute('href');
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Fallback for extremely fast clicks before DOM is fully mapped
            let selector = targetId;
            if (selector.startsWith('#')) {
                selector = selector.substring(1);
            }
            const targetEl = document.getElementById(selector);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
