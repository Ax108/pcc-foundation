// Custom Font Awesome subset — only icons used on this site (no npm FA package).
// Pattern from Sample-temp-web-site/src/utils/icons.ts

export const loadFontAwesome = () => {
  if (document.getElementById('pcc-fa-subset')) return;

  const style = document.createElement('style');
  style.id = 'pcc-fa-subset';
  style.textContent = `
    @font-face {
      font-family: "Font Awesome 6 Free";
      font-style: normal;
      font-weight: 900;
      font-display: swap;
      src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2') format('woff2');
    }

    @font-face {
      font-family: "Font Awesome 6 Brands";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2') format('woff2');
    }

    .fa-solid, .fas {
      font-family: "Font Awesome 6 Free";
      font-weight: 900;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .fa-brands, .fab {
      font-family: "Font Awesome 6 Brands";
      font-weight: 400;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .fa-phone:before { content: "\\f095"; }
    .fa-envelope:before { content: "\\f0e0"; }
    .fa-location-dot:before { content: "\\f3c5"; }
    .fa-bars:before { content: "\\f0c9"; }
    .fa-xmark:before { content: "\\f00d"; }
    .fa-chevron-up:before { content: "\\f077"; }
    .fa-chevron-down:before { content: "\\f078"; }
    .fa-arrow-right:before { content: "\\f061"; }

    .fa-facebook:before { content: "\\f09a"; }
    .fa-instagram:before { content: "\\f16d"; }
    .fa-youtube:before { content: "\\f167"; }
  `;

  document.head.appendChild(style);
};

/** Solid icon — use with className="fa-solid fa-phone" etc. */
export const solidIcon = (name: string, className = '') =>
  `fa-solid fa-${name}${className ? ` ${className}` : ''}`;

/** Brand icon — use with className="fa-brands fa-facebook" etc. */
export const brandIcon = (name: string, className = '') =>
  `fa-brands fa-${name}${className ? ` ${className}` : ''}`;
