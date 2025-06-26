<script>
    import "../app.css";
    import { onMount } from "svelte";

    let navRights;
    let menuVisible = false;

    function showMenu() {
        menuVisible = true;
    }

    function hideMenu() {
        menuVisible = false;
    }

</script>

<main>
    <section id="header">
        <nav>
            <ul class="logo">
                <img src="icons/header_icon.svg" alt="" />
            </ul>
            <div class="nav-right" id="navRights">
                <i class="fa-solid fa-xmark"></i>
                <ul>
                    <li><a href="#header" on:click={hideMenu}>Home</a></li>
                    <li><a href="#about" on:click={hideMenu}>About</a></li>
                    <li>
                        <a href="#photo-section" on:click={hideMenu}>Work</a>
                    </li>
                </ul>
            </div>
            <i class="fa-solid fa-bars"></i>
        </nav>
        <div class="text-box">
            <h1>I’m Insan Anshary Rasul.</h1>
            <p>Computer Science Student at IPB University</p>
        </div>
    </section>
    <section id="about">
        <div class="about-text">
            <h1>About Me</h1>
            <p>
                Freshman at IPB University on Computer Science Department under
                the Faculty of Math and Natural Science. Currently I’m
                interested in web development, cyber security, competitive
                programming, data mining and mobile apps development. I also
                recently studied about Python, C++, HTML, CSS and JavaScript. I
                have hobby as a landscape photographer.
            </p>
        </div>
        <div class="language">
            <h1>Primary Programming Language</h1>
            <div class="primary-language">
                <div class="programming-logo">
                    <img src="icons/Python.svg" alt="" />
                    <p>Python</p>
                </div>
                <div class="programming-logo">
                    <img src="icons/Cpp.svg" alt="" />
                    <p>C++</p>
                </div>
            </div>
        </div>
    </section>
    <section id="photo-section">
        <div class="photos">
            <h1>Photos</h1>
            <div class="row">
                <div class="single">
                    <img src="images/foto1.jpg" alt="" />
                    <p>An Old House</p>
                </div>
                <div class="single">
                    <img src="images/foto2.jpg" alt="" />
                    <p>FEM Garden</p>
                </div>
            </div>
            <div class="row">
                <div class="single">
                    <img src="images/foto3.jpg" alt="" />
                    <p>Sylvalestari's Room</p>
                </div>
                <div class="single">
                    <img src="images/foto4.jpg" alt="" />
                    <p>Road Near Sylvalestari Dormitory</p>
                </div>
            </div>
        </div>
    </section>
    <section id="footer">
        <div class="icon">
            <a href="https://instagram.com/insan.a.r">
                <img src="icons/icons8-instagram.svg" alt="" />
            </a>
            <a href="https://github.com/insanansharyrasul">
                <img src="icons/icons8-github.svg" alt="" />
            </a>
        </div>
        <p>Site by Insan Anshary Rasul</p>
    </section>
</main>
