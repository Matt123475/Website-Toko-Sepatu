document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let index = 0;
    let interval;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove("active"));
        if (slides[i]) slides[i].classList.add("active");
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    if (slides.length > 0) {
        showSlide(index);
        interval = setInterval(nextSlide, 4000);

        const carousel = document.querySelector(".carousel");
        if (carousel) {
            carousel.addEventListener("mouseenter", () => clearInterval(interval));
            carousel.addEventListener("mouseleave", () => {
                interval = setInterval(nextSlide, 4000);
            });
        }
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.2 });

    document.querySelectorAll("section, .card").forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
    });

    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function(e) {
            const email = document.querySelector("input[type='email']");
            if (email && !email.value.includes("@")) {
                alert("Email tidak valid!");
                e.preventDefault();
            }
        });
    }
    const sizes = document.querySelectorAll(".size-btn");

        sizes.forEach(btn => {
            btn.addEventListener("click", () => {

                sizes.forEach(b => b.classList.remove("active"));

                btn.classList.add("active");

            });
        });
});