
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("network-bg");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: 0.5 * (Math.random() - 0.5),
            vy: 0.5 * (Math.random() - 0.5),
            radius: 2 * Math.random() + 1
        });
    }

    setInterval(() => {
        ctx.fillStyle = "rgba(5, 5, 16, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(0, 170, 51, 0.6)";
            ctx.fill();
        });

        ctx.strokeStyle = "rgba(0, 170, 51, 0.2)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    let opacity = 1 - distance / 200;
                    ctx.strokeStyle = `rgba(0, 170, 51, ${0.3 * opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }, 30);

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                if (Math.random() > 0.7) {
                    entry.target.classList.add("glitch");
                    setTimeout(() => entry.target.classList.remove("glitch"), 500);
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px"
    });

    sections.forEach(section => observer.observe(section));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    document.getElementById("scroll-down").addEventListener("click", () => {
        const aboutSection = document.getElementById("about");
        window.scrollTo({
            top: aboutSection.offsetTop - 80,
            behavior: "smooth"
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    
    function createSlider(containerId, prevBtnId, nextBtnId, dotsContainerId, imagesArray) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const track = container.querySelector(".slider-track");
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dotsContainer = document.getElementById(dotsContainerId);
        
        let currentIndex = 0;
        let slideInterval;

        function updateSlider() {
            track.style.transform = `translateX(-${100 * currentIndex}%)`;
            
            dotsContainer.querySelectorAll(".slider-dot").forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add("active", "bg-white");
                    dot.classList.remove("bg-white/50");
                } else {
                    dot.classList.remove("active", "bg-white");
                    dot.classList.add("bg-white/50");
                }
            });

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === imagesArray.length - 1;
            prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
            nextBtn.style.opacity = currentIndex === imagesArray.length - 1 ? "0.5" : "1";
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % imagesArray.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
            updateSlider();
        }

        function startAutoPlay() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        track.innerHTML = "";
        dotsContainer.innerHTML = "";
        
        imagesArray.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `Slide ${index + 1}`;
            img.className = "slider-slide w-full h-64 object-cover";
            
            img.onerror = () => {
                img.src = `https://placehold.co/600x400/1e293b/94a3b8?text=Image+${index + 1}`;
            };
            track.appendChild(img);

            const dot = document.createElement("button");
            dot.className = "slider-dot w-2 h-2 bg-white/50 rounded-full focus:outline-none";
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
                startAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        nextBtn.addEventListener("click", () => {
            nextSlide();
            startAutoPlay();
        });

        prevBtn.addEventListener("click", () => {
            prevSlide();
            startAutoPlay();
        });

        container.addEventListener("mouseenter", () => clearInterval(slideInterval));
        container.addEventListener("mouseleave", startAutoPlay);

        updateSlider();
        startAutoPlay();
    }

    const reportRaiserImages = [
        "./imgs/reportraiser-1.png",
        "./imgs/reportraiser-2.png",
        "./imgs/reportraiser-3.png",
        "./imgs/reportraiser-4.png",
        "./imgs/reportraiser-5.png"
    ];
    createSlider("project-slider", "slider-prev", "slider-next", "slider-dots", reportRaiserImages);

    const pepeImages = [
        "./imgs/pepecollector-1.png",
        "./imgs/pepecollector-2.png",
        "./imgs/pepecollector-3.png",
        "./imgs/pepecollector-4.png"
    ];
    createSlider("pepe-slider", "pepe-prev", "pepe-next", "pepe-dots", pepeImages);
});

/**
 * GITHUB PROJECTS FETCH
 */
document.addEventListener("DOMContentLoaded", () => {
    let page = 1;
    let allRepos = [];
    const projectsContainer = document.getElementById("projects-container");
    const loadMoreBtn = document.getElementById("load-more");
    const excludedRepos = ["register", "dexterthedev", "dexter", "iptvnator"];

    function escapeHtml(unsafe) {
        return unsafe ? String(unsafe)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;") : "";
    }

    async function fetchProjects() {
        try {
            if (page === 1) {
                projectsContainer.innerHTML = '<div class="text-center py-12 col-span-3"><div class="loading-spinner mb-4" aria-hidden></div><p>Loading projects from GitHub...</p></div>';
            }

            const response = await fetch(`https://api.github.com/users/DexterTheDev/repos?sort=updated&type=sources&per_page=12&page=${page}`);
            
            if (!response.ok) {
                throw new Error("GitHub API error");
            }

            const data = await response.json();
            allRepos = page === 1 ? data : [...allRepos, ...data];
            
            if (page === 1) projectsContainer.innerHTML = "";

            data.forEach(repo => {
                if (excludedRepos.includes(repo.name.toLowerCase())) return;

                const card = document.createElement("div");
                card.className = "project-card p-6 h-full flex flex-col cursor-pointer";
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-semibold">${escapeHtml(repo.name)}</h3>
                    </div>
                    <p class="text-slate-400 mb-4 flex-grow">${escapeHtml(repo.description || "No description available")}</p>
                    <div class="flex justify-between items-center mt-auto">
                        <div class="flex items-center gap-3">
                            <a href="${repo.html_url}" target="_blank" class="text-slate-400 z-50 hover:text-white transition-colors"><i class="fab fa-github"></i></a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="text-slate-400 hover:text-white transition-colors"><i class="fas fa-external-link-alt"></i></a>` : ""}
                        </div>
                    </div>`;
                
                card.addEventListener('click', (event) => {
                    if (!event.target.closest('a')) {
                        window.open(repo.html_url, '_blank');
                    }
                });

                projectsContainer.appendChild(card);
            });

            if (data.length === 12) {
                loadMoreBtn.classList.remove("hidden");
            } else {
                loadMoreBtn.classList.add("hidden");
            }

        } catch (error) {
            console.error("GitHub fetch error:", error);
            projectsContainer.innerHTML = `
                <div class="col-span-3 text-center py-10">
                    <i class="fas fa-exclamation-triangle text-4xl mb-4 text-yellow-500"></i>
                    <p>Unable to load projects from GitHub at this time.</p>
                    <p class="text-slate-400 mt-2">Visit the profile directly.</p>
                    <a href="https://github.com/DexterTheDev" target="_blank" class="btn-primary mt-4 inline-block">Visit GitHub Profile</a>
                </div>`;
        }
    }

    loadMoreBtn.addEventListener("click", () => {
        page++;
        fetchProjects();
    });

    fetchProjects();
});

document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor");
    const cursorText = document.querySelector(".cursor-code");
    const interactiveElements = document.querySelectorAll(".interactive-element, .code-block, a, button");
    
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    const codeSnippets = ["{ }", "function() {}", "const x = 10;", "if (true) { }", "console.log();", "return null;", "import React;", "export default", "props => {}", "useState()", "useEffect()", "=> arrow", "let arr = []", "class Component", "try { } catch()"];

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += 0.15 * (mouseX - cursorX);
        cursorY += 0.15 * (mouseY - cursorY);
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener("mousedown", () => cursor.classList.add("click"));
    document.addEventListener("mouseup", () => cursor.classList.remove("click"));

    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
            cursorText.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
            cursorText.textContent = "{ }";
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
        deadlineInput.min = new Date().toISOString().split('T')[0];
    }

    const commissionForm = document.getElementById('commissionForm');
    if (commissionForm) {
        commissionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusEl = document.getElementById('status');
            statusEl.classList.add('hidden');
            statusEl.classList.remove('success', 'error');

            const discord = document.getElementById('discord').value.trim();
            const project = document.getElementById('project').value.trim();
            const deadline = document.getElementById('deadline').value;
            const budget = document.getElementById('budget').value;
            const request = document.getElementById('details').value.trim();

            const formattedDate = new Date(deadline).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });

            const embed = {
                title: 'New Commission Request',
                color: 0x00ff88,
                description: request.length > 4075 ? `**Details**:\n\`${request.substring(0, 4075)}...\`` : `**Details**:\n\`${request}\``,
                fields: [
                    { name: 'Discord Username', value: `\`${discord}\``, inline: false },
                    { name: 'Project Name', value: `\`${project}\``, inline: false },
                    { name: 'Deadline', value: `\`${formattedDate}\``, inline: true },
                    { name: 'Budget', value: `**$${parseFloat(budget).toFixed(2)}**`, inline: true }
                ],
                footer: { text: `Submitted at ${new Date().toLocaleString()}` }
            };

            try {
                const res = await fetch(
                    'https://discord.com/api/webhooks/1438609348770136074/1IDb5xPOVp_N-y1q2derKgpOdPRHNShovNyeB8EH_b8HVyKEsXgLUsB7QChkQKhUtI-w', 
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: 'Commission Bot',
                            embeds: [embed],
                            content: "<@780079091172900884>"
                        })
                    }
                );

                if (res.ok) {
                    statusEl.textContent = 'Sent successfully!';
                    statusEl.classList.add('success');
                    commissionForm.reset();
                } else {
                    throw new Error('Discord returned ' + res.status);
                }
            } catch (err) {
                console.error(err);
                statusEl.textContent = 'Failed to send. Try again.';
                statusEl.classList.add('error');
            }

            statusEl.classList.remove('hidden');
            setTimeout(() => statusEl.classList.add('hidden'), 5000);
        });
    }
});
