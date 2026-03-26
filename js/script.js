/* ============================================
   LAWYER PORTFOLIO — Clean & Simple JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile nav toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---- Active nav link highlight on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ---- Back to top button ----
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = target.offsetTop - 70;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ---- Contact Form → Email (mailto) ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;

            // Gather form values
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const subjectEl = document.getElementById('formSubject');
            const subject = subjectEl.options[subjectEl.selectedIndex].text;
            const message = document.getElementById('formMessage').value.trim();

            // Advocate's email address
            const advocateEmail = 'rambadanchoubey@gmail.com';

            // Build email subject & body
            const emailSubject = `Consultation Request — ${subject}`;

            let emailBody = `Dear Advocate R.B. Choubey,\n\n`;
            emailBody += `I would like to request a consultation regarding ${subject}.\n\n`;
            emailBody += `--- Details ---\n`;
            emailBody += `Name: ${name}\n`;
            emailBody += `Email: ${email}\n`;
            if (phone) emailBody += `Phone: ${phone}\n`;
            emailBody += `Legal Matter: ${subject}\n\n`;
            emailBody += `--- Message ---\n`;
            emailBody += `${message}\n\n`;
            emailBody += `Looking forward to hearing from you.\n`;
            emailBody += `Regards,\n${name}`;

            const mailtoUrl = `mailto:${advocateEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            // Show feedback, then open mail client
            submitBtn.textContent = 'Opening Email...';
            submitBtn.disabled = true;

            setTimeout(() => {
                window.location.href = mailtoUrl;
                contactForm.reset();

                submitBtn.textContent = '✓ Email Client Opened';
                submitBtn.style.background = '#2d7a2d';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 500);
        });
    }

    // ---- Gallery Lightbox ----
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';

            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '✕';

            overlay.appendChild(lightboxImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                    document.body.style.overflow = '';
                }, 250);example
            };

            overlay.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
});
