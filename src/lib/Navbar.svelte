<script lang="ts">
  type NavItem = {
    href: string;
    label: string;
    key: string;
  };

  export let links: NavItem[] = [];
  export let activeSection = "";
  export let sticky = false;

  let menuVisible = false;

  function hideMenu() {
    menuVisible = false;
  }

  function toggleMenu() {
    menuVisible = !menuVisible;
  }
</script>

<nav
  class="navbar relative z-10 flex px-[5%] py-4 justify-between items-center bg-bg border-border"
  class:sticky-nav={sticky}
>
  <a href="/" on:click={hideMenu} aria-label="Home" class="logo">
    <img
      src="/icons/header_icon.svg"
      alt=""
      class="h-8 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(255,143,64,0.6)]"
    />
  </a>
  <div
    class="nav-right transition-transform duration-500 ease-out flex-1 text-right"
    class:visible={menuVisible}
  >
    <ul class="items-center">
      {#each links as item}
        <li class="list-none inline-block px-3 relative">
          <a
            href={item.href}
            on:click={hideMenu}
            class="nav-link text-text no-underline text-base font-normal relative transition-all duration-300 hover:text-primary hover:-translate-y-1"
            class:active={activeSection === item.key}
            aria-current={activeSection === item.key ? "page" : undefined}
            style="font-family: 'Raleway', sans-serif;">{item.label}</a
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="hamburger-wrapper">
    <button
      aria-label="Toggle menu"
      aria-expanded={menuVisible}
      on:click={toggleMenu}
      class="hamburger-btn"
      class:open={menuVisible}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>

<style>
  .sticky-nav {
    position: sticky;
    top: 0;
  }

  .hamburger-wrapper {
    display: none;
  }

  .hamburger-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  .hamburger-btn span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-text);
    transition:
      transform 0.3s ease,
      opacity 0.3s ease,
      background 0.3s ease;
  }

  .hamburger-btn.open span {
    background: var(--color-primary);
  }

  .hamburger-btn.open span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger-btn.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger-btn.open span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  @media screen and (max-width: 600px) {
    .hamburger-wrapper {
      display: block;
      z-index: 200;
      position: relative;
      margin-left: auto;
    }

    .nav-right {
      position: fixed;
      background: var(--color-bg);
      border-left: 1px solid var(--color-border);
      height: 100vh;
      width: 250px;
      top: 0;
      right: -250px;
      text-align: left;
      z-index: 150;
      transition: right 0.3s ease;
      transform: none;
      padding: 20px;
    }

    .nav-right ul {
      margin-top: 60px;
    }

    .nav-right ul li {
      display: block;
    }

    .nav-right ul li a {
      font-size: 18px;
      padding: 15px 0;
      display: block;
      color: var(--color-text) !important;
      border-bottom: 1px solid var(--color-border);
    }

    .nav-right ul li a:hover {
      color: var(--color-primary) !important;
      padding-left: 10px;
    }

    .nav-right.visible {
      right: 0;
    }
  }
</style>
