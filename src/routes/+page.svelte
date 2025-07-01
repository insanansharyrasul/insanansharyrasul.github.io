<script lang="ts">
    import "../app.css";
    import Hamburger from "svelte-hamburger";
    import TechCard from "$lib/TechCard.svelte";
    import ProjectCard from "$lib/ProjectCard.svelte";
    import { onMount } from "svelte";

    let menuVisible = false;
    let isVisible: Record<string, boolean> = {};
    let typedText = "";
    let fullText = "I'm Insan Anshary Rasul.";
    let typeIndex = 0;

    function hideMenu() {
        menuVisible = false;
    }

    function toggleMenu() {
        menuVisible = !menuVisible;
    }

    function typeWriter() {
        if (typeIndex < fullText.length) {
            typedText += fullText.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    onMount(() => {
        typeWriter();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isVisible[entry.target.id] = true;
                    }
                });
            },
            { threshold: 0.3 },
        );

        // Observe sections
        ["about", "skills-section", "projects-section"].forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    });
</script>

<main>
    <section
        id="header"
        class="w-full min-h-screen relative flex flex-col bg-gradient-header"
    >
        <div
            class="absolute inset-0 animate-gradientShift z-0"
            style="background-size: 400% 400%;"
        ></div>
        <nav
            class="relative z-10 flex px-[5%] py-[1%] justify-between items-center backdrop-blur-md bg-white/5 border-b border-primary/10"
        >
            <ul class="logo">
                <img
                    src="icons/header_icon.svg"
                    alt=""
                    class="mask-[url(icons/header_icon.svg)] transition-all duration-300 hover:scale-110 hover:animate-glow"
                />
            </ul>
            <div
                class="nav-right transition-transform duration-500 ease-out flex-1 text-right"
                id="navRights"
                class:visible={menuVisible}
            >
                <button
                    on:click={hideMenu}
                    aria-label="Close menu"
                    class="bg-transparent border-none cursor-pointer text-white p-3 text-2xl transition-transform duration-300 hover:rotate-90 hidden"
                >
                </button>
                <ul class="items-center leading-3">
                    <li class="list-none inline-block px-3 py-2 relative">
                        <a
                            href="#header"
                            on:click={hideMenu}
                            class="text-white no-underline text-2xl font-normal relative transition-all duration-300 hover:text-primary hover:-translate-y-1"
                            style="font-family: 'Raleway', sans-serif;">Home</a
                        >
                    </li>
                    <li class="list-none inline-block px-3 py-2 relative">
                        <a
                            href="#about"
                            on:click={hideMenu}
                            class="text-white no-underline text-2xl font-normal relative transition-all duration-300 hover:text-primary hover:-translate-y-1"
                            style="font-family: 'Raleway', sans-serif;">About</a
                        >
                    </li>
                    <li class="list-none inline-block px-3 py-2 relative">
                        <a
                            href="#skills-section"
                            on:click={hideMenu}
                            class="text-white no-underline text-2xl font-normal relative transition-all duration-300 hover:text-primary hover:-translate-y-1"
                            style="font-family: 'Raleway', sans-serif;"
                            >Skills</a
                        >
                    </li>
                    <li class="list-none inline-block px-3 py-2 relative">
                        <a
                            href="#projects-section"
                            on:click={hideMenu}
                            class="text-white no-underline text-2xl font-normal relative transition-all duration-300 hover:text-primary hover:-translate-y-1"
                            style="font-family: 'Raleway', sans-serif;"
                            >Projects</a
                        >
                    </li>
                </ul>
            </div>
            <div class="hamburger-wrapper hidden">
                <Hamburger
                    bind:open={menuVisible}
                    on:click={toggleMenu}
                    --color="white"
                    --active-color="#FE8100"
                    --layer-width="24px"
                    --layer-height="2px"
                    --layer-spacing="6px"
                    --border-radius="0px"
                    --hover-opacity="0.8"
                />
            </div>
        </nav>
        <div
            class="text-box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-[90%] text-white"
        >
            <h1
                class="typewriter text-primary text-center font-monda text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
                {typedText}<span class="cursor">|</span>
            </h1>
            <p
                class="fade-in text-white text-center text-lg md:text-xl lg:text-2xl font-normal opacity-90"
                style="font-family: 'Raleway', sans-serif;"
            >
                Computer Science Student at IPB University
            </p>
        </div>
        <div class="scroll-indicator">
            <span></span>
        </div>
    </section>

    <section
        id="about"
        class="section-animate py-16 px-5 bg-gradient-about"
        class:visible={isVisible.about}
    >
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl text-center mb-6 text-primary font-monda">
                About Me
            </h1>
            <p class="mx-[5%] text-lg text-center leading-relaxed mb-8 text-gray-300">
                Freshman at IPB University studying Computer Science under the 
                <span class="text-primary italic">Sekolah Sains Data, Matematika dan Informatika</span>. 
                Currently interested in embedded systems and mobile app development.
            </p>
            
            <div class="grid md:grid-cols-2 gap-6 mt-8">
                <div class="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
                    <h3 class="text-primary text-xl mb-3 font-monda flex items-center">
                        ⚙️ Embedded Systems
                    </h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        Creating embedded systems that integrate hardware and software using C, C++, or Rust
                    </p>
                </div>
                <div class="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
                    <h3 class="text-primary text-xl mb-3 font-monda flex items-center">
                        📱 Mobile Development
                    </h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        Designing cross-platform mobile applications for Android and iOS
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section
        id="skills-section"
        class="section-animate py-16 px-5 bg-gradient-skills"
        class:visible={isVisible["skills-section"]}
    >
        <div class="skills-content max-w-5xl mx-auto">
            <h1 class="text-3xl text-center mb-10 text-primary font-monda">
                Skills & Technologies
            </h1>

            <!-- Automation Section -->
            <div class="mb-8">
                <h2 class="text-lg text-center mb-4 text-primary font-monda opacity-90">
                    Automation
                </h2>
                <div
                    class="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                    <TechCard
                        name="Python"
                        icon="icons/python-original.svg"
                        iconType="svg"
                        link="https://www.python.org"
                    />
                    <TechCard
                        name="JavaScript"
                        icon="icons/javascript-original.svg"
                        iconType="svg"
                        link="https://en.wikipedia.org/wiki/JavaScript"
                    />
                    <TechCard
                        name="Git"
                        icon="icons/git-original.svg"
                        iconType="svg"
                        link="https://git-scm.com"
                    />
                    <TechCard
                        name="GitHub"
                        icon="icons/github-original.svg"
                        iconType="svg"
                        link="https://github.com"
                    />
                    <TechCard
                        name="Playwright"
                        icon="icons/playwright-original.svg"
                        iconType="svg"
                        link="https://playwright.dev"
                    />
                </div>
            </div>

            <!-- Mobile Apps Section -->
            <div class="mb-12">
                <h2
                    class="text-2xl text-center mb-8 text-primary font-monda opacity-90"
                >
                    Mobile Apps
                </h2>
                <div
                    class="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                    <TechCard
                        name="Flutter"
                        icon="icons/flutter-original.svg"
                        iconType="svg"
                        link="https://flutter.dev"
                    />
                    <TechCard
                        name="BloC"
                        icon="icons/bloc-original.svg"
                        iconType="svg"
                        link="https://bloclibrary.dev"
                    />
                </div>
            </div>

            <div class="mb-12">
                <h2
                    class="text-2xl text-center mb-8 text-primary font-monda opacity-90"
                >
                    Embedded Systems
                </h2>
                <div
                    class="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                    <TechCard
                        name="C"
                        icon="icons/c-original.svg"
                        iconType="svg"
                        link="https://en.wikipedia.org/wiki/C_(programming_language)"
                    />
                    <TechCard
                        name="C++"
                        icon="icons/cplusplus-original.svg"
                        iconType="svg"
                        link="https://en.wikipedia.org/wiki/C%2B%2B"
                    />
                    <TechCard
                        name="Rust"
                        icon="icons/rust-original.svg"
                        iconType="svg"
                        link="https://www.rust-lang.org"
                    />
                </div>
            </div>
        </div>
    </section>

    <section
        id="projects-section"
        class="section-animate py-16 px-5 bg-gradient-about"
        class:visible={isVisible["projects-section"]}
    >
        <div class="projects max-w-5xl mx-auto">
            <h1 class="text-3xl text-center mb-3 text-primary font-monda">
                Coding Projects
            </h1>
            <p class="section-subtitle text-center text-gray-300 text-base mb-8 italic">
                Building solutions through code and creativity
            </p>

            <div class="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                <ProjectCard
                    title="IPB Auto Logbook"
                    description="Automation tool for IPB University logbook system"
                    githubUrl="https://github.com/insanansharyrasul/ipb_auto_logbook"
                    imageUrl="https://opengraph.githubassets.com/1/insanansharyrasul/ipb_auto_logbook"
                    technologies={["Python", "Automation"]}
                />

                <ProjectCard
                    title="SPP Sekolah"
                    description="School payment system management application"
                    githubUrl="https://github.com/insanansharyrasul/spp_sekolah"
                    imageUrl="https://opengraph.githubassets.com/1/insanansharyrasul/spp_sekolah"
                    technologies={["Qt", "Desktop App"]}
                />

                <ProjectCard
                    title="Syamsun"
                    description="Prayer time application with home widget and sleep notifier"
                    githubUrl="https://github.com/insanansharyrasul/syamsun"
                    imageUrl="https://opengraph.githubassets.com/1/insanansharyrasul/syamsun"
                    technologies={["Development", "Innovation"]}
                />

                <ProjectCard
                    title="The Djenggot"
                    description="Creative coding project with unique functionality"
                    githubUrl="https://github.com/insanansharyrasul/the_djenggot"
                    imageUrl="https://opengraph.githubassets.com/1/insanansharyrasul/the_djenggot"
                    technologies={["Creative", "Coding"]}
                />
            </div>
        </div>
    </section>

    <section
        id="footer"
        class="py-8 px-5 border-t border-primary/20 bg-gradient-footer"
    >
        <div class="footer-content max-w-3xl mx-auto text-center">
            <div class="social-links flex justify-center gap-6 mb-6">
                <a href="https://instagram.com/insan.a.r" class="social-link">
                    <img
                        src="icons/icons8-instagram.svg"
                        alt="Instagram"
                        class="w-5 h-5 filter invert sepia saturate-[5] hue-rotate-[25deg]"
                    />
                    <span>Instagram</span>
                </a>
                <a
                    href="https://github.com/insanansharyrasul"
                    class="social-link"
                >
                    <img
                        src="icons/icons8-github.svg"
                        alt="GitHub"
                        class="w-5 h-5 filter invert sepia saturate-[5] hue-rotate-[25deg]"
                    />
                    <span>GitHub</span>
                </a>
            </div>
            <p
                class="text-xs text-gray-500 m-0"
                style="font-family: 'Raleway', sans-serif;"
            >
                © 2025 Insan Anshary Rasul. All rights reserved.
            </p>
        </div>
    </section>
</main>

<style>
    /* Navigation link hover effects */
    .nav-right ul li {
        position: relative;
    }

    .nav-right ul li::after {
        content: "";
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #fe8100, #ff6b35);
        display: block;
        margin: auto;
        transition: width 0.5s ease;
    }

    .nav-right ul li:hover::after {
        width: 100%;
    }

    /* Mobile responsive navigation */
    @media screen and (max-width: 600px) {
        .hamburger-wrapper {
            display: block !important;
            z-index: 30;
        }

        .nav-right {
            position: fixed;
            background: linear-gradient(135deg, #fe8100, #ff6b35);
            height: 100vh;
            width: 250px;
            top: 0;
            right: -250px;
            text-align: left;
            z-index: 20;
            transition: right 0.3s ease;
            transform: none;
            padding: 20px;
            backdrop-filter: blur(10px);
            border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-right ul {
            margin-top: 60px;
        }

        .nav-right ul li {
            display: block !important;
        }

        .nav-right ul li a {
            font-size: 18px !important;
            padding: 15px 0;
            display: block;
            color: white !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-right ul li a:hover {
            color: #fff !important;
            padding-left: 10px;
        }

        .nav-right.visible {
            right: 0;
            transform: none;
        }

        .text-box h1 {
            font-size: 2rem !important;
        }

        .text-box p {
            font-size: 1.25rem !important;
        }

        .logo img {
            margin: auto;
            width: 120px;
        }
    }

    /* Additional responsive styles */
    @media screen and (max-width: 768px) and (min-width: 601px) {
        .text-box h1 {
            font-size: 3rem !important;
        }

        .text-box p {
            font-size: 1.5rem !important;
        }
    }

    @media screen and (min-width: 1200px) {
        .text-box h1 {
            font-size: 4.5rem !important;
        }

        .text-box p {
            font-size: 2.25rem !important;
        }
    }
</style>
