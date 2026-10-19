<script lang="ts">
    import { onMount } from "svelte";
    import "../app.css";
    import "$lib/pageStyles.css";
    import Navbar from "$lib/Navbar.svelte";
    import ProjectCard from "$lib/ProjectCard.svelte";
    import { getAllPosts } from "$lib/blog";

    const recentPosts = getAllPosts().slice(0, 3);

    let isVisible: Record<string, boolean> = {};
    let activeSection = "header";
    let typedText = "";
    const fullText = "I'm Insan Anshary Rasul.";
    const homeLinks = [
        { href: "/#header", label: "Home", key: "header" },
        { href: "/#about", label: "About", key: "about" },
        { href: "/#skills-section", label: "Skills", key: "skills-section" },
        {
            href: "/#projects-section",
            label: "Projects",
            key: "projects-section",
        },
        { href: "/blog", label: "Blog", key: "blog" },
    ];

    onMount(() => {
        let i = 0;
        const tw = () => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                typedText = fullText;
                return;
            }
            if (i < fullText.length) {
                typedText = fullText.substring(0, ++i);
                setTimeout(tw, 100);
            }
        };
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(tw, { timeout: 800 });
        } else {
            setTimeout(tw, 500);
        }

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isVisible[entry.target.id] = true;
                        activeSection = entry.target.id;
                    }
                });
            },
            { threshold: 0.2 },
        );

        ["header", "about", "skills-section", "projects-section", "blog-section"].forEach(
            (id) => {
                const el = document.getElementById(id);
                if (el) obs.observe(el);
            },
        );
        return () => {
            obs.disconnect();
        };
    });
</script>

<svelte:head>
    <title>Insan Anshary Rasul — Computer Science Student & Developer</title>
    <meta
        name="description"
        content="Insan Anshary Rasul is a Computer Science student at IPB University building software across systems, mobile, and automation."
    />
</svelte:head>

<main>
    <section
        id="header"
        class="w-full min-h-screen relative flex flex-col bg-bg"
    >
        <Navbar links={homeLinks} {activeSection} />
        <div
            class="hero-grid flex-1 flex items-center w-full max-w-7xl mx-auto px-[5%] py-12 gap-8"
        >
            <!-- 01 / INTRODUCTION rail -->
            <div
                class="hero-rail hidden md:flex flex-col items-start gap-4 pr-8 border-r border-border self-stretch"
            >
                <p class="section-label">
                    <span class="text-primary">01</span> / INTRODUCTION
                </p>
            </div>
            <!-- Main intro: typewriter kept verbatim -->
            <div class="hero-main flex-1 min-w-0 text-left text-text">
                <p
                    class="font-mono text-xs tracking-[0.25em] text-text-muted mb-4"
                >
                    HELLO, I'M
                </p>
                <h1
                    class="typewriter text-primary text-left font-monda text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                >
                    {typedText}<span class="cursor">|</span>
                </h1>
                <p
                    class="text-text text-left text-lg md:text-xl lg:text-2xl font-normal opacity-90"
                    style="font-family: 'Raleway', sans-serif;"
                >
                    Computer Science Student at IPB University.
                </p>
                <p
                    class="text-text-muted text-sm md:text-base leading-relaxed mt-4 max-w-md"
                >
                    I build software, explore systems, and enjoy turning ideas
                    into working solutions.
                </p>
                <div class="flex flex-wrap items-center gap-6 mt-8">
                    <a
                        href="#projects-section"
                        class="inline-flex items-center gap-3 bg-primary text-text-on-accent font-semibold text-sm px-6 py-3 rounded-md transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
                    >
                        Explore Projects <span aria-hidden="true">→</span>
                    </a>
                    <a
                        href="#about"
                        class="text-text-muted text-sm underline underline-offset-4 decoration-border hover:text-primary hover:decoration-primary transition-all duration-300"
                    >
                        About Me
                    </a>
                </div>
            </div>
            <!-- Interests rail -->
            <aside
                class="hero-side hidden lg:flex flex-col justify-center gap-6 pl-8 border-l border-border max-w-xs"
            >
                <div>
                    <h2
                        class="font-mono text-xs tracking-[0.2em] text-primary mb-3"
                    >
                        INTERESTS
                    </h2>
                    <ul class="space-y-1.5 text-sm text-text-muted">
                        <li>System Programming</li>
                        <li>Mobile Development</li>
                        <li>Linux &amp; Infrastructure</li>
                        <li>Automation &amp; Tooling</li>
                    </ul>
                </div>
                <div class="w-10 h-px bg-primary"></div>
                <p class="font-mono text-sm text-text-muted leading-relaxed">
                    Better software,<br />better systems,<br />a more open
                    future.
                </p>
            </aside>
            <!-- Deco grid -->
            <div
                class="hero-deco hidden xl:flex flex-col justify-between self-stretch w-40"
                aria-hidden="true"
            >
                <div class="hero-grid-lines relative flex-1">
                    <span class="absolute top-0 right-0 w-4 h-4 bg-primary"
                    ></span>
                </div>
                <p
                    class="font-mono text-[0.65rem] tracking-[0.15em] text-text-muted mt-3"
                >
                    IPB UNIVERSITY<br />/ 2026
                </p>
            </div>
        </div>
        <div
            class="hero-foot flex items-center gap-4 px-[5%] pb-6 max-w-7xl mx-auto w-full"
        >
            <span class="scroll-cue"></span>
            <a
                href="#projects-section"
                aria-label="Scroll to projects"
                class="ml-auto text-primary text-xl leading-none no-underline hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform duration-300"
                >↗</a
            >
        </div>
    </section>

    <section
        id="about"
        class="section-animate py-16 px-5 bg-bg"
        class:visible={isVisible.about}
    >
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
            <!-- Left rail -->
            <div class="md:w-56 shrink-0 flex flex-col">
                <p class="section-label">
                    <span class="text-primary">02</span> / ABOUT ME
                </p>
                <h2
                    class="font-monda font-bold text-5xl leading-[1.05] mt-6 text-text"
                >
                    How I<br /><span class="text-primary">think.</span>
                </h2>
                <div class="w-10 h-px bg-primary mt-6"></div>
                <p
                    class="font-mono text-sm text-text-muted leading-relaxed mt-4"
                >
                    Better software,<br />better systems,<br />a more open
                    future.
                </p>
                <div class="mt-auto pt-10 hidden md:block">
                    <p class="font-mono text-xs tracking-[0.2em] text-primary">
                        01 -- 02
                    </p>
                    <a
                        href="#skills-section"
                        aria-label="Explore skills section"
                        class="font-mono text-xs tracking-[0.2em] text-text-muted hover:text-primary transition-colors duration-300 mt-2 inline-block"
                        >EXPLORE →</a
                    >
                </div>
            </div>
            <!-- Main -->
            <div class="flex-1 min-w-0 md:border-l md:border-border md:pl-10">
                <div
                    class="flex flex-col lg:flex-row gap-8 border-b border-border pb-10"
                >
                    <p
                        class="flex-1 min-w-0 text-text-muted text-lg md:text-xl leading-relaxed"
                    >
                        I'm a Computer Science student at IPB University,
                        interested in understanding the systems behind software
                        and building applications that solve practical problems.
                        I enjoy exploring systems programming, Linux, and mobile
                        development.
                    </p>
                    <aside
                        class="lg:w-48 shrink-0 lg:border-l lg:border-border lg:pl-8"
                    >
                        <h3
                            class="font-mono text-xs tracking-[0.2em] text-text-muted mb-3"
                        >
                            CURRENTLY EXPLORING
                        </h3>
                        <ul
                            class="space-y-1.5 font-mono text-sm text-text-muted"
                        >
                            <li><span class="text-primary">$</span> systems</li>
                            <li><span class="text-primary">$</span> mobile</li>
                            <li><span class="text-primary">$</span> backend</li>
                            <li><span class="text-primary">$</span> network</li>
                        </ul>
                    </aside>
                    <div
                        class="hidden xl:flex flex-col justify-between w-40 shrink-0"
                        aria-hidden="true"
                    >
                        <div class="hero-grid-lines relative flex-1 min-h-40">
                            <span
                                class="absolute top-0 right-0 w-4 h-4 bg-primary"
                            ></span>
                        </div>
                        <p
                            class="font-mono text-[0.65rem] tracking-[0.15em] text-text-muted mt-3"
                        >
                            IPB UNIVERSITY<br />/ 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section
        id="skills-section"
        class="section-animate py-16 px-5 bg-bg"
        class:visible={isVisible["skills-section"]}
    >
        <div
            class="skills-content max-w-7xl mx-auto flex flex-col md:flex-row gap-10"
        >
            <div class="md:w-56 shrink-0 flex flex-col">
                <p class="section-label">
                    <span class="text-primary">03</span> / SKILLS
                </p>
                <h2
                    class="font-monda font-bold text-5xl leading-[1.05] mt-6 text-text"
                >
                    What I<br /><span class="text-primary">use.</span>
                </h2>
                <div class="w-10 h-px bg-primary mt-6"></div>
                <p class="text-text-muted text-sm leading-relaxed mt-4">
                    Languages, frameworks, and tools I reach for when building
                    software.
                </p>
                <div class="mt-auto pt-10 hidden md:block">
                    <p class="font-mono text-xs tracking-[0.2em] text-primary">
                        02 -- 03
                    </p>
                    <a
                        href="#projects-section"
                        aria-label="Explore projects section"
                        class="font-mono text-xs tracking-[0.2em] text-text-muted hover:text-primary transition-colors duration-300 mt-2 inline-block"
                        >EXPLORE →</a
                    >
                </div>
            </div>
            <div class="flex-1 min-w-0 md:border-l md:border-border md:pl-10">
                <div class="grid md:grid-cols-2 gap-6">
                    <div
                        class="bg-surface border border-border rounded-lg p-6 flex flex-col"
                    >
                        <p
                            class="font-mono text-xs tracking-[0.2em] text-primary mb-4"
                        >
                            01 / SYSTEMS
                        </p>
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="inline-flex items-center justify-center w-12 h-12 rounded-md border border-primary text-primary shrink-0"
                                aria-hidden="true"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><polyline points="4 17 10 11 4 5" /><line
                                        x1="12"
                                        y1="19"
                                        x2="20"
                                        y2="19"
                                    /></svg
                                >
                            </span>
                            <h3 class="text-text text-xl font-monda font-bold">
                                Systems Programming
                            </h3>
                        </div>
                        <p class="text-text-muted text-sm leading-relaxed">
                            I like knowing what my code really does to the
                            machine — small C, C++, and Rust utilities on Linux,
                            glued together with shell.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-5 mb-6">
                            <span class="pill"
                                ><img
                                    src="icons/c-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />C</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/cplusplus-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />C++</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/rust-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />Rust</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/linux-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />Linux</span
                            >
                            <span class="pill">Shell</span>
                        </div>
                        <div
                            class="flex items-center justify-between gap-3 border-t border-border mt-auto pt-4"
                        >
                            <a
                                href="#projects-section"
                                aria-label="View systems development projects"
                                class="inline-flex items-center gap-2 text-primary text-sm hover:translate-x-1 transition-transform duration-300"
                                ><span aria-hidden="true">→</span> View related projects</a
                            >
                            <span
                                class="font-mono text-[0.65rem] tracking-[0.1em] text-text-muted"
                                >// SYSTEMS_DEVELOPMENT</span
                            >
                        </div>
                    </div>
                    <div
                        class="bg-surface border border-border rounded-lg p-6 flex flex-col"
                    >
                        <p
                            class="font-mono text-xs tracking-[0.2em] text-primary mb-4"
                        >
                            02 / MOBILE
                        </p>
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="inline-flex items-center justify-center w-12 h-12 rounded-md border border-primary text-primary shrink-0"
                                aria-hidden="true"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><rect
                                        x="7"
                                        y="2"
                                        width="10"
                                        height="20"
                                        rx="2"
                                    /><line
                                        x1="11"
                                        y1="18"
                                        x2="13"
                                        y2="18"
                                    /></svg
                                >
                            </span>
                            <h3 class="text-text text-xl font-monda font-bold">
                                Mobile Development
                            </h3>
                        </div>
                        <p class="text-text-muted text-sm leading-relaxed">
                            I build cross-platform apps with Flutter and Bloc,
                            and tinker with native Android and Kotlin when I
                            want to get closer to the platform.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-5 mb-6">
                            <span class="pill"
                                ><img
                                    src="icons/flutter-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />Flutter</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/bloc-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />Bloc</span
                            >
                            <span class="pill">Kotlin</span>
                            <span class="pill">Android</span>
                        </div>
                        <div
                            class="flex items-center justify-between gap-3 border-t border-border mt-auto pt-4"
                        >
                            <a
                                href="#projects-section"
                                aria-label="View mobile development projects"
                                class="inline-flex items-center gap-2 text-primary text-sm hover:translate-x-1 transition-transform duration-300"
                                ><span aria-hidden="true">→</span> View related projects</a
                            >
                            <span
                                class="font-mono text-[0.65rem] tracking-[0.1em] text-text-muted"
                                >// MOBILE_APPS</span
                            >
                        </div>
                    </div>
                    <div
                        class="bg-surface border border-border rounded-lg p-6 flex flex-col md:col-span-2"
                    >
                        <p
                            class="font-mono text-xs tracking-[0.2em] text-primary mb-4"
                        >
                            03 / AUTOMATION
                        </p>
                        <div class="flex items-center gap-4 mb-4">
                            <span
                                class="inline-flex items-center justify-center w-12 h-12 rounded-md border border-primary text-primary shrink-0"
                                aria-hidden="true"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><polygon
                                        points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                                    /></svg
                                >
                            </span>
                            <h3 class="text-text text-xl font-monda font-bold">
                                Automation &amp; Tooling
                            </h3>
                        </div>
                        <p class="text-text-muted text-sm leading-relaxed">
                            I automate the boring parts — scripts and browser
                            tests with Python and Playwright, versioned with Git
                            and GitHub.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-5 mb-6">
                            <span class="pill"
                                ><img
                                    src="icons/python-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />Python</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/javascript-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />JavaScript</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/playwright-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />Playwright</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/git-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />Git</span
                            >
                            <span class="pill"
                                ><img
                                    src="icons/github-original.svg"
                                    alt=""
                                    width="16"
                                    height="16"
                                />GitHub</span
                            >
                        </div>
                        <div
                            class="flex items-center justify-between gap-3 border-t border-border mt-auto pt-4"
                        >
                            <a
                                href="#projects-section"
                                aria-label="View automation tooling projects"
                                class="inline-flex items-center gap-2 text-primary text-sm hover:translate-x-1 transition-transform duration-300"
                                ><span aria-hidden="true">→</span> View related projects</a
                            >
                            <span
                                class="font-mono text-[0.65rem] tracking-[0.1em] text-text-muted"
                                >// AUTOMATION_TOOLING</span
                            >
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2 mt-6">
                    <span
                        class="font-mono text-[0.65rem] tracking-[0.1em] text-text-muted mr-2"
                        >// TOOLS</span
                    >
                    <span class="pill"
                        ><img
                            src="icons/ubuntu-original.svg"
                            alt=""
                            width="16"
                            height="16"
                        />Ubuntu</span
                    >
                    <span class="pill"
                        ><img
                            src="icons/neovim-original.svg"
                            alt=""
                            width="16"
                            height="16"
                        />Neovim</span
                    >
                    <span class="pill"
                        ><img
                            src="icons/vscode-original.svg"
                            alt=""
                            width="16"
                            height="16"
                        />VSCode</span
                    >
                    <span class="pill"
                        ><img
                            src="icons/androidstudio-original.svg"
                            alt=""
                            width="16"
                            height="16"
                        />Android Studio</span
                    >
                </div>
            </div>
        </div>
    </section>

    <section
        id="projects-section"
        class="section-animate py-16 px-5 bg-bg"
        class:visible={isVisible["projects-section"]}
    >
        <div
            class="projects max-w-7xl mx-auto flex flex-col md:flex-row gap-10"
        >
            <div class="md:w-56 shrink-0 flex flex-col">
                <p class="section-label">
                    <span class="text-primary">04</span> / PROJECTS
                </p>
                <h2
                    class="font-monda font-bold text-5xl leading-[1.05] mt-6 text-text"
                >
                    Selected<br /><span class="text-primary">work.</span>
                </h2>
                <div class="w-10 h-px bg-primary mt-6"></div>
                <p class="text-text-muted text-sm leading-relaxed mt-4">
                    A selection of projects that I've worked on, from automation
                    tools to apps and developer utilities.
                </p>
                <div class="mt-auto pt-10 hidden md:block">
                    <p class="font-mono text-xs tracking-[0.2em] text-primary">
                        03 -- 04
                    </p>
                    <a
                        href="https://github.com/insanansharyrasul"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Explore GitHub profile"
                        class="font-mono text-xs tracking-[0.2em] text-text-muted hover:text-primary transition-colors duration-300 mt-2 inline-block"
                        >EXPLORE →</a
                    >
                </div>
            </div>

            <div class="flex-1 min-w-0">
                <div
                    class="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 py-2"
                >
                    <ProjectCard
                        title="IPB Auto Logbook"
                        description="Automation tool for IPB University logbook system"
                        githubUrl="https://github.com/insanansharyrasul/ipb_auto_logbook"
                        technologies={["Python", "Automation"]}
                        index="01"
                        category="Automation"
                    />

                    <ProjectCard
                        title="SPP Sekolah"
                        description="School payment system management application"
                        githubUrl="https://github.com/insanansharyrasul/spp_sekolah"
                        technologies={["Qt", "Desktop App"]}
                        index="02"
                        category="Desktop App"
                    />

                    <ProjectCard
                        title="Syamsun"
                        description="Prayer time application with home widget and sleep notifier"
                        githubUrl="https://github.com/insanansharyrasul/syamsun"
                        technologies={["Development", "Innovation"]}
                        index="03"
                        category="App"
                    />

                    <ProjectCard
                        title="The Djenggot"
                        description="Creative coding project with unique functionality"
                        githubUrl="https://github.com/insanansharyrasul/the_djenggot"
                        technologies={["Creative", "Coding"]}
                        index="04"
                        category="Creative"
                    />
                </div>
            </div>
        </div>
    </section>

    <section
        id="blog-section"
        class="section-animate py-16 px-5 bg-bg"
        class:visible={isVisible["blog-section"]}
    >
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
            <div class="md:w-56 shrink-0 flex flex-col">
                <p class="section-label">
                    <span class="text-primary">05</span> / BLOG
                </p>
                <h2
                    class="font-monda font-bold text-5xl leading-[1.05] mt-6 text-text"
                >
                    Latest<br /><span class="text-primary">writes.</span>
                </h2>
                <div class="w-10 h-px bg-primary mt-6"></div>
                <p class="text-text-muted text-sm leading-relaxed mt-4">
                    Writeups, notes, and life updates.
                </p>
                <div class="mt-auto pt-10 hidden md:block">
                    <p class="font-mono text-xs tracking-[0.2em] text-primary">
                        04 -- 05
                    </p>
                    <a
                        href="/blog"
                        aria-label="Explore all blog posts"
                        class="font-mono text-xs tracking-[0.2em] text-text-muted hover:text-primary transition-colors duration-300 mt-2 inline-block"
                        >EXPLORE →</a
                    >
                </div>
            </div>
            <div class="flex-1 min-w-0 md:border-l md:border-border md:pl-10">
                {#if recentPosts.length}
                    <div
                        class="flex flex-col divide-y divide-border border-y border-border"
                    >
                        {#each recentPosts as post}
                            <a
                                href="/blog/{post.slug}"
                                class="group flex items-baseline gap-4 py-4 no-underline transition-colors duration-300 hover:bg-surface px-3 -mx-3 rounded-md"
                            >
                                <span class="flex-1 min-w-0">
                                    <span
                                        class="block text-text text-lg leading-snug group-hover:text-primary transition-colors duration-300 truncate"
                                        >{post.title}</span
                                    >
                                    <span
                                        class="block font-mono text-xs tracking-wide text-text-muted mt-1"
                                        >{post.dateLabel} · {post.readTime} min read</span
                                    >
                                </span>
                                <span
                                    aria-hidden="true"
                                    class="text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                                    >→</span
                                >
                            </a>
                        {/each}
                    </div>
                    <a
                        href="/blog"
                        aria-label="View all blog posts"
                        class="inline-flex items-center gap-2 text-primary text-sm mt-6 hover:translate-x-1 transition-transform duration-300"
                        ><span aria-hidden="true">→</span> View all posts</a
                    >
                {:else}
                    <p class="text-text-muted">
                        No posts yet — first writeup coming soon.
                    </p>
                {/if}
            </div>
        </div>
    </section>

    <section id="footer" class="py-16 px-5 border-t border-border bg-bg">
        <div
            class="footer-content max-w-7xl mx-auto flex flex-col md:flex-row gap-10"
        >
            <div class="md:w-56 shrink-0 flex flex-col">
                <p class="section-label">
                    <span class="text-primary">06</span> / CONNECT
                </p>
                <h2
                    class="font-monda font-bold text-5xl leading-[1.05] mt-6 text-text"
                >
                    Follow<br />the <span class="text-primary">builds.</span>
                </h2>
                <div class="w-10 h-px bg-primary mt-6"></div>
            </div>
            <div class="flex-1 min-w-0 md:border-l md:border-border md:pl-10">
                <p class="text-text-muted text-lg md:text-xl leading-relaxed">
                    Code on GitHub, life on Instagram.
                </p>
                <div class="social-links flex flex-wrap gap-4 mt-6">
                    <a
                        href="https://github.com/insanansharyrasul"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow on GitHub"
                        class="inline-flex items-center gap-3 bg-primary text-text-on-accent font-semibold text-sm px-6 py-3 rounded-md transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
                    >
                        <img
                            src="icons/icons8-github.svg"
                            alt=""
                            width="20"
                            height="20"
                            class="w-5 h-5 brightness-0"
                        />
                        <span>GitHub</span>
                    </a>
                    <a
                        href="https://instagram.com/insan_a_r"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow on Instagram"
                        class="social-link"
                    >
                        <img
                            src="icons/icons8-instagram.svg"
                            alt=""
                            width="20"
                            height="20"
                            class="w-5 h-5 filter invert sepia saturate-[5] hue-rotate-[25deg]"
                        />
                        <span>Instagram</span>
                    </a>
                </div>
                <p
                    class="text-xs text-text-muted mt-10 pt-6 border-t border-border m-0"
                    style="font-family: 'Raleway', sans-serif;"
                >
                    © 2026 Insan Anshary Rasul. All rights reserved.
                </p>
            </div>
        </div>
    </section>
</main>

<style>
    /* ponytail: 16px pill icons in original colors */
    .pill:has(img) {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
    .pill img {
        width: 16px;
        height: 16px;
    }
</style>
