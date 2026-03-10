"use client";

import { useState, useEffect } from "react";

const mono  = "'JetBrains Mono', monospace";
const serif = "'Gloock', Georgia, serif";
const sans  = "'Red Hat Text', system-ui, sans-serif";

const RAW = "https://raw.githubusercontent.com/Oinkyjinju/betjemanandbarton_tea/main";

// ── Syntax highlight ────────────────────────────────────────────────────────
function CodeHighlight({ code, language }: { code: string; language: string }) {
  void language;
  const rules: { re: RegExp; color: string }[] = [
    { re: /(\/\*[\s\S]*?\*\/)/g,                        color: "#6c7086" },
    { re: /(\/\/[^\n]*)/g,                              color: "#6c7086" },
    { re: /("[^"]*"|'[^']*')/g,                         color: "#a6e3a1" },
    { re: /\b(var|const|let|function|return|if|else|for|forEach|addEventListener|class|new|this|true|false|null|undefined)\b/g, color: "#cba6f7" },
    { re: /(--[\w-]+)/g,                                color: "#89dceb" },
    { re: /(@[\w-]+)/g,                                 color: "#f38ba8" },
    { re: /\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms)?)\b/g, color: "#fab387" },
    { re: /([:;,{}[\]()>])/g,                           color: "#9399b2" },
    { re: /([\w-]+)(?=\s*[:(])/g,                       color: "#89b4fa" },
  ];
  const tokens: { text: string; color?: string }[] = [];
  let rem = code;
  while (rem.length > 0) {
    let best: { idx: number; len: number; color: string } | null = null;
    for (const { re, color } of rules) {
      re.lastIndex = 0;
      const m = re.exec(rem);
      if (m && (best === null || m.index < best.idx)) best = { idx: m.index, len: m[0].length, color };
    }
    if (!best) { tokens.push({ text: rem }); break; }
    if (best.idx > 0) tokens.push({ text: rem.slice(0, best.idx) });
    tokens.push({ text: rem.slice(best.idx, best.idx + best.len), color: best.color });
    rem = rem.slice(best.idx + best.len);
  }
  return <>{tokens.map((t, i) => t.color ? <span key={i} style={{ color: t.color }}>{t.text}</span> : <span key={i}>{t.text}</span>)}</>;
}

// ── Source code (raw, as written) ───────────────────────────────────────────
const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/20dffc9a4f.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="nav.css">
    <script src="nav.js" defer></script>
    <script src="app.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&family=Oranienbaum&display=swap" rel="stylesheet">
    <title>Betjeman & Barton</title>
</head>

<script>
  class SiteNav extends HTMLElement {
    async connectedCallback() {
      const html = await (await fetch('nav.html')).text();
      this.innerHTML = html;
    }
  }
  customElements.define('site-nav', SiteNav);
</script>

<!-- Nav -->
<site-nav></site-nav>

<body>
    <div class="hero">
        <div class="cta">
            <div class="cta_container">
                <a href="item_page.html">Discover</a>
            </div>
            <div class="hero_subtitle">A World of Sweetness</div>
        </div>
    </div>

    <div class="highlight_product">
        <div class="highlight_nav">
            <span class="category">Autumn Selection</span>
            <a href="item_page.html">See all<i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="img_container" id="autum_selection_img">
          <a href="#" data-name="Autumn Blend" data-price="$12"><img src="img/2455.webp"></a>
          <a href="#" data-name="Spiced Chai" data-price="$15"><img src="img/2470.webp"></a>
          <a href="#" data-name="Pumpkin Tea" data-price="$18"><img src="img/2634.webp"></a>
          <a href="#" data-name="Maple Delight" data-price="$20"><img src="img/3811.webp"></a>
        </div>
    </div>

    <div class="listing_container">
        <div class="listing_item" data-image="img/cursor/flavored.webp" data-href="/item_page.html">
            <span>Our Flavored Tea</span>
        </div>
        <div class="listing_item" data-image="img/cursor/Sous-Categorie_Boites_125g_12036_R_S.webp" data-href="/item_page.html">
            <span>Grands Crus &amp; Rare Teas</span>
        </div>
        <div class="listing_item" data-image="img/cursor/2871.webp" data-href="/item_page.html">
            <span>The Iconic Ones</span>
        </div>
        <div class="listing_item" data-image="img/cursor/christmas.webp" data-href="/item_page.html">
            <span>The Art of Tea</span>
        </div>
    </div>

    <div class="story_container">
        <div class="story">
            <div class="title">A house of excellence since 1919</div>
            <div class="description">For over a century, Betjeman & Barton has been selecting
              and blending exceptional teas, combining tradition and creativity.</div>
            <a href="/item_page.html">Discover</a>
        </div>
        <img src="img/3_ef0652e2-c2c6-429e-ae7e-8aa2d526aa43.webp">
    </div>

    <div class="best_seller_container">
        <div class="best_seller">
            <span>Best Seller</span>
            <a href="/item_page.html">Discover <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="best_seller_items">
            <a href="#"><img src="img/1751.webp"></a>
            <a href="#"><img src="img/2835.webp"></a>
            <a href="#"><img src="img/1661.webp"></a>
            <a href="#"><img src="img/SD-boite_de_Noel_2025_-_ouverte.webp"></a>
            <a href="#"><img src="img/1677.webp"></a>
            <a href="#"><img src="img/1693.webp"></a>
        </div>
    </div>

    <div class="news_letter">
        <span>Newsletter</span>
        <p>Sign up and find all our new products, selections and exceptional invitations</p>
        <input type="text" id="email" placeholder="Drop your email here">
        <input class="submit" type="submit" value="Sign up for Newsletter">
    </div>
</body>
</html>`;

const CSS_CODE = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
:root {
  --color-pearl: #FCFAF7;
  --color-tealeaf: #5F7D6B;
  --color-tea-charcoal: #1F2522;
  --color-sage-mist: #C9D1CB;
  --color-plum: #4A2A44;
  --color-muted: #B9B9B9;
  --font-title: "Monsieur La Doulaise", cursive;
  --font-body: "Oranienbaum", Georgia, serif;
}

.hero {
    width: 100%;
    padding: 4% 5%;
    background-image: url("img/Banniere_AUTOMNE_bis.webp");
    background-size: cover;
    background-position: 50% 82%;
    background-repeat: no-repeat;
}
.hero > .cta {
    width: 100%;
    font-family: var(--font-title);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.cta_container a {
    color: var(--color-tea-charcoal);
    background-color: var(--color-pearl);
    font: 20px var(--font-body);
    padding: 8px 20px;
    text-decoration: none;
}
.cta_container a:hover {
    color: var(--color-pearl);
    background-color: var(--color-plum);
}
.cta > .hero_subtitle {
    font: 400 50px / 1.2 var(--font-body);
    color: var(--color-pearl);
    text-align: right;
    width: 100%;
    height: 35vh;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
.highlight_nav, .best_seller {
    padding-top: 5%;
    margin: 0 5%;
    display: inline-flex;
    justify-content: space-between;
    width: 90%;
    align-items: baseline;
}
.highlight_nav .category, .best_seller span {
    font: 50px var(--font-title);
    color: var(--color-tea-charcoal);
}
.highlight_product .img_container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 50px;
    margin: 0 5% 5%;
}
.img_container img { width: 100%; border-radius: 10px; }

.listing_container { display: list-item; }
.listing_item {
    border-top: 1px solid lightgray;
    padding: 2% 5%;
    cursor: pointer;
}
.listing_item:nth-child(4) { border-bottom: 1px solid lightgray; }
.listing_item span { font: 35px var(--font-body); }

.cursor_hover {
    position: fixed;
    pointer-events: none;
    padding: 6px 12px;
    font: 400 25px / 1.2 var(--font-body);
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1200;
    display: flex;
    align-items: center;
    gap: 15px;
}
.cursor_hover.show { opacity: 1; }
.cursor_hover img { width: 200px; height: 200px; object-fit: cover; }

.story_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 10% 5% 5%;
    gap: 50px;
}
.story .title { font-size: 30px; font-family: var(--font-body); }
.story .description { font-size: 18px; font-weight: 200; line-height: 1.5; font-family: var(--font-body); }
.story_container img {
    width: 100%; height: 50vh;
    border-radius: 10px;
    object-fit: cover; object-position: 50% 81%;
}

.best_seller_items {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 10px;
    width: 90%; margin-left: 5%;
}
.best_seller_items a > img { width: 100%; border-radius: 10px; }

.news_letter {
    width: 100%; padding: 3% 5%;
    background-color: var(--color-tealeaf);
    color: var(--color-pearl);
    display: flex; flex-direction: column; align-items: center;
    margin-top: 150px;
}
.news_letter span { font-family: var(--font-title); font-size: 50px; }
.news_letter input#email {
    width: 30%; height: 35px;
    border: none; padding: 0 10px; margin: 10px 0;
}
.news_letter .submit { padding: 10px 40px; border: none; }`;

const JS_CODE = `// Cursor follow — shows product image beside mouse on hover
const listingItem = document.querySelectorAll('.listing_item');
const cursor = document.createElement('div');
cursor.className = 'cursor_hover';
document.body.appendChild(cursor);

listingItem.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
        const image = this.getAttribute('data-image');
        cursor.innerHTML =
          '<img src="' + image + '"> Discover ' +
          '<i class="fa-solid fa-arrow-right"></i>';
        cursor.classList.add('show');
    });
    item.addEventListener('mouseleave', function() {
        cursor.classList.remove('show');
    });
    item.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 15 + 'px';
        cursor.style.top  = e.clientY + 15 + 'px';
    });
    item.addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        if (href) window.location.href = href;
    });
});

// Product hover — show name + price overlay on autumn selection
const autumSelection = document.querySelectorAll('#autum_selection_img a');

autumSelection.forEach(function(item) {
    const autumInfo = document.createElement('div');
    autumInfo.className = 'autum_info';
    item.appendChild(autumInfo);

    item.addEventListener('mouseenter', function() {
        const name  = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        if (name && price) {
            autumInfo.innerHTML =
              '<div class="info_name">'  + name  + '</div>' +
              '<div class="info_price">' + price + '</div>';
            autumInfo.classList.add('show');
        }
    });
    item.addEventListener('mouseleave', function() {
        autumInfo.classList.remove('show');
    });
});`;

// ── Self-contained preview (images → GitHub raw, CSS + JS inlined) ──────────
const PREVIEW_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://kit.fontawesome.com/20dffc9a4f.js" crossorigin="anonymous"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&family=Oranienbaum&display=swap" rel="stylesheet">
  <style>
    /* ── reset ── */
    * { margin:0; padding:0; box-sizing:border-box; }
    :root {
      --color-pearl:#FCFAF7; --color-tealeaf:#5F7D6B;
      --color-tea-charcoal:#1F2522; --color-sage-mist:#C9D1CB;
      --color-plum:#4A2A44; --color-muted:#B9B9B9;
      --font-title:"Monsieur La Doulaise",cursive;
      --font-body:"Oranienbaum",Georgia,serif;
    }

    /* ── nav.css ── */
    .site-nav { position:sticky; top:0; background:var(--color-pearl); border-bottom:1px solid rgba(0,0,0,.06); z-index:1000; }
    #top-nav { display:flex; gap:24px; align-items:center; list-style:none; padding:12px 24px; }
    .nav .logo { width:30px; background-color:var(--color-tealeaf); border-radius:100px; }
    .nav .logo a { color:transparent; display:block; width:30px; height:30px; }
    .nav-btn { background:transparent; border:none; font:500 14px/1.2 var(--font-body); color:var(--color-tea-charcoal); padding:10px 8px; cursor:pointer; }
    .nav-btn:hover { color:var(--color-tealeaf); }
    .nav-right { align-items:center; display:flex; justify-content:flex-end; margin-right:45px; height:50px; }
    .nav-right .fa-solid { font-size:20px; }
    .hamburger-menu { display:none; cursor:pointer; }
    li { position:relative; }
    .dropdown_menu { position:absolute; top:48px; min-width:180px; background:var(--color-pearl); border:1px solid rgba(0,0,0,.08); border-radius:12px; box-shadow:0 12px 24px rgba(0,0,0,.08); padding:12px; opacity:0; transform:translateY(4px); transition:opacity .15s ease,transform .15s ease,visibility 0s linear .15s; z-index:1100; pointer-events:none; }
    .dropdown_menu#menu1{left:50px} .dropdown_menu#menu2{left:120px} .dropdown_menu#menu3{left:220px} .dropdown_menu#menu4{left:340px} .dropdown_menu#menu5{left:450px}
    .dropdown_menu.show { transform:translateY(0); opacity:1; pointer-events:auto; }
    .dropdown_list { list-style:none; display:grid; gap:6px; }
    .dropdown_list a { display:block; padding:8px 10px; border-radius:8px; font:400 14px/1.3 var(--font-body); color:var(--color-tea-charcoal); text-decoration:none; }
    .dropdown_list a:hover { background:var(--color-sage-mist); }

    /* ── style.css ── */
    .hero { width:100%; padding:4% 5%; background-image:url("${RAW}/img/Banniere_AUTOMNE_bis.webp"); background-size:cover; background-position:50% 82%; background-repeat:no-repeat; }
    .hero>.cta { width:100%; font-family:var(--font-title); display:flex; flex-wrap:wrap; justify-content:space-between; }
    .cta_container { width:100%; height:-webkit-fill-available; }
    .cta_container a { color:var(--color-tea-charcoal); background-color:var(--color-pearl); font:20px var(--font-body); padding:8px 20px; text-decoration:none; }
    .cta_container a:hover { color:var(--color-pearl); background-color:var(--color-plum); }
    .cta>.hero_subtitle { font:400 50px/1.2 var(--font-body); text-shadow:0 4px 7px #00000059; color:var(--color-pearl); text-align:right; width:100%; height:35vh; display:flex; align-items:flex-end; justify-content:flex-end; }
    .highlight_nav,.best_seller { padding-top:5%; margin:0 5%; display:inline-flex; justify-content:space-between; width:90%; align-items:baseline; }
    .highlight_nav .category,.best_seller span { font:50px var(--font-title); color:var(--color-tea-charcoal); }
    .highlight_nav a,.best_seller a { font-family:var(--font-body); color:var(--color-tea-charcoal); text-decoration:none; }
    .highlight_nav a:hover,.best_seller a:hover { color:var(--color-plum); }
    .highlight_product .img_container { display:grid; grid-template-columns:repeat(4,1fr); column-gap:50px; margin:0 5% 5%; }
    #autum_selection_img a { position:relative; display:block; }
    .autum_info { top:0; position:absolute; height:98%; opacity:0; display:flex; flex-direction:column; justify-content:space-between; pointer-events:none; width:100%; }
    .autum_info.show { opacity:1; }
    .autum_info .info_name { color:var(--color-pearl); background-color:var(--color-tealeaf); width:100%; border-radius:5px 5px 0 0; padding:10px 15px; }
    .autum_info .info_price { color:var(--color-pearl); background-color:var(--color-tealeaf); border-radius:0 5px 0 5px; padding:10px 15px; width:fit-content; }
    .img_container img { width:100%; border-radius:10px; }
    .listing_container { display:list-item; }
    .listing_container .listing_item { border-top:1px solid lightgray; padding:2% 5%; cursor:pointer; }
    .listing_container .listing_item:nth-child(4) { border-bottom:1px solid lightgray; }
    .listing_item span { font:35px var(--font-body); }
    .cursor_hover { position:fixed; pointer-events:none; padding:6px 12px; font:400 25px/1.2 var(--font-body); opacity:0; transition:opacity .2s; z-index:1200; display:flex; align-items:center; gap:15px; }
    .cursor_hover.show { opacity:1; }
    .cursor_hover img { width:200px; height:200px; object-fit:cover; }
    .story_container { display:grid; grid-template-columns:repeat(2,1fr); margin:10% 5% 5%; gap:50px; }
    .story_container .story { display:flex; font-family:var(--font-body); flex-direction:column; }
    .story .title { font-size:30px; }
    .story .description { height:-webkit-fill-available; font-size:18px; font-weight:200; line-height:1.5; }
    .story a { font-size:20px; color:var(--color-tea-charcoal); }
    .story_container img { width:100%; height:50vh; border-radius:10px; object-fit:cover; object-position:50% 81%; }
    .best_seller_items { display:grid; grid-template-columns:repeat(6,1fr); column-gap:10px; width:90%; margin-left:5%; }
    .best_seller_items a>img { width:100%; object-fit:fill; border-radius:10px; }
    .news_letter { width:100vw; padding:3% 5%; background-color:var(--color-tealeaf); color:var(--color-pearl); display:flex; flex-direction:column; align-items:center; margin-top:150px; }
    .news_letter span { font-family:var(--font-title); text-align:center; font-size:50px; }
    .news_letter p { font-family:var(--font-body); font-size:16px; }
    .news_letter input#email { width:30%; height:35px; border:none; padding:0 10px; margin:10px 0; }
    .news_letter .submit { padding:10px 40px; border:none; font:14px var(--font-body); background-color:var(--color-sage-mist); }
    footer { background-color:var(--color-tea-charcoal); color:var(--color-sage-mist); font-family:var(--font-body); }
    footer a { color:var(--color-sage-mist); text-decoration:none; }
    footer a:hover { color:var(--color-plum); }
    .footer_top { display:grid; grid-template-columns:1.2fr 2fr; gap:40px; padding:48px 24px 28px; }
    .footer_brand .brand_mark { display:flex; flex-direction:column; gap:6px; margin-bottom:8px; }
    .brand_mark .name { font-family:var(--font-title); font-size:28px; line-height:1; color:var(--color-pearl); }
    .brand_mark .year { font-size:12px; opacity:.85; }
    .brand_description { font-size:14px; opacity:.9; margin:8px 0 14px; }
    .social { display:flex; gap:12px; }
    .social_media { width:36px; height:36px; display:grid; place-items:center; border-radius:999px; background:rgba(201,209,203,0.2); color:var(--color-pearl); transition:transform .15s,background .15s; text-decoration:none; }
    .social_media:hover { transform:translateY(-1px); background:rgba(201,209,203,0.5); }
    .footer_og_tea { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
    .footer_og_name { width:100%; background:transparent; border:none; font:18px var(--font-title); color:var(--color-pearl); text-align:left; cursor:pointer; }
    .og_list { list-style:none; display:grid; gap:8px; padding:8px 0 0; }
    .og_list a { font-size:14px; opacity:.95; }
    .og_list a:hover { color:var(--color-tealeaf); }
    .footer_bot { display:flex; gap:16px; align-items:center; justify-content:space-between; padding:16px 24px; border-top:1px solid rgba(255,255,255,.08); }
    .legal { list-style:none; display:flex; gap:16px; font-size:13px; }
    .payments { display:flex; gap:10px; font-size:24px; color:var(--color-pearl); opacity:.9; }
    .footer_legalnote { padding:12px 24px 28px; font-size:12px; opacity:.8; text-align:center; }
  </style>
</head>
<body>

  <!-- Nav (inlined — no fetch required) -->
  <div class="site-nav">
    <ul class="nav" id="top-nav">
      <li class="logo"><a href="#">B</a></li>
      <li><button class="nav-btn" id="teas">Teas</button>
        <div class="dropdown_menu" id="menu1"><ul class="dropdown_list">
          <li><a href="#">Black Tea</a></li><li><a href="#">Green Tea</a></li>
          <li><a href="#">White Tea</a></li><li><a href="#">Matcha</a></li><li><a href="#">Oolong</a></li>
        </ul></div></li>
      <li><button class="nav-btn" id="ourOg">Our Original Teas</button>
        <div class="dropdown_menu" id="menu2"><ul class="dropdown_list">
          <li><a href="#">In-House Blends</a></li><li><a href="#">France</a></li>
          <li><a href="#">England</a></li><li><a href="#">Japan</a></li><li><a href="#">America</a></li>
        </ul></div></li>
      <li><button class="nav-btn" id="boxNBag">Boxs &amp; Bags</button>
        <div class="dropdown_menu" id="menu3"><ul class="dropdown_list">
          <li><a href="#">Tea Boxes</a></li><li><a href="#">Gift Bags</a></li>
        </ul></div></li>
      <li><button class="nav-btn" id="boxNGift">Boxes &amp; Gifts</button>
        <div class="dropdown_menu" id="menu4"><ul class="dropdown_list">
          <li><a href="#">Gift Sets</a></li><li><a href="#">Seasonal</a></li>
        </ul></div></li>
      <li><button class="nav-btn" id="access">Accessories</button>
        <div class="dropdown_menu" id="menu5"><ul class="dropdown_list">
          <li><a href="#">Teapots</a></li><li><a href="#">Mugs</a></li>
          <li><a href="#">Tea Balls</a></li><li><a href="#">Filters</a></li>
        </ul></div></li>
    </ul>
  </div>

  <!-- Hero -->
  <div class="hero">
    <div class="cta">
      <div class="cta_container"><a href="#">Discover</a></div>
      <div class="hero_subtitle">A World of Sweetness</div>
    </div>
  </div>

  <!-- Autumn Selection -->
  <div class="highlight_product">
    <div class="highlight_nav">
      <span class="category">Autumn Selection</span>
      <a href="#">See all <i class="fa-solid fa-arrow-right"></i></a>
    </div>
    <div class="img_container" id="autum_selection_img">
      <a href="#" data-name="Autumn Blend" data-price="$12"><img src="${RAW}/img/2455.webp" alt="Autumn Blend"></a>
      <a href="#" data-name="Spiced Chai"  data-price="$15"><img src="${RAW}/img/2470.webp" alt="Spiced Chai"></a>
      <a href="#" data-name="Pumpkin Tea"  data-price="$18"><img src="${RAW}/img/2634.webp" alt="Pumpkin Tea"></a>
      <a href="#" data-name="Maple Delight" data-price="$20"><img src="${RAW}/img/3811.webp" alt="Maple Delight"></a>
    </div>
  </div>

  <!-- Cursor-follow category listing -->
  <div class="listing_container">
    <div class="listing_item" data-image="${RAW}/img/cursor/flavored.webp" data-href="#">
      <span>Our Flavored Tea</span>
    </div>
    <div class="listing_item" data-image="${RAW}/img/cursor/Sous-Categorie_Boites_125g_12036_R_S.webp" data-href="#">
      <span>Grands Crus &amp; Rare Teas</span>
    </div>
    <div class="listing_item" data-image="${RAW}/img/cursor/2871.webp" data-href="#">
      <span>The Iconic Ones</span>
    </div>
    <div class="listing_item" data-image="${RAW}/img/cursor/christmas.webp" data-href="#">
      <span>The Art of Tea</span>
    </div>
  </div>

  <!-- Story -->
  <div class="story_container">
    <div class="story">
      <div class="title">A house of excellence since 1919</div>
      <div class="description">For over a century, Betjeman &amp; Barton has been selecting and blending exceptional teas, combining tradition and creativity. Heir to a unique expertise, the house offers single-origin teas and exclusive blends, enhanced with a touch of French elegance.</div>
      <a href="#">Discover</a>
    </div>
    <img src="${RAW}/img/3_ef0652e2-c2c6-429e-ae7e-8aa2d526aa43.webp" alt="Betjeman and Barton">
  </div>

  <!-- Best Sellers -->
  <div class="best_seller_container">
    <div class="best_seller">
      <span>Best Seller</span>
      <a href="#">Discover <i class="fa-solid fa-arrow-right"></i></a>
    </div>
    <div class="best_seller_items">
      <a href="#"><img src="${RAW}/img/1751.webp" alt="Product"></a>
      <a href="#"><img src="${RAW}/img/2835.webp" alt="Product"></a>
      <a href="#"><img src="${RAW}/img/1661.webp" alt="Product"></a>
      <a href="#"><img src="${RAW}/img/SD-boite_de_Noel_2025_-_ouverte.webp" alt="Product"></a>
      <a href="#"><img src="${RAW}/img/1677.webp" alt="Product"></a>
      <a href="#"><img src="${RAW}/img/1693.webp" alt="Product"></a>
    </div>
  </div>

  <!-- Newsletter -->
  <div class="news_letter">
    <span>Newsletter</span>
    <p>Sign up and find all our new products, selections and exceptional invitations</p>
    <input type="text" id="email" placeholder="Drop your email here">
    <input class="submit" type="submit" value="Sign up for Newsletter">
  </div>

  <!-- Footer -->
  <footer>
    <div class="footer_top">
      <section class="footer_brand">
        <div class="brand_mark">
          <span class="name">Betjeman &amp; Barton</span>
          <span class="year">Maison de Th&eacute; &middot; Depuis 1919</span>
        </div>
        <p class="brand_description">Selecting and blending exceptional teas for over a century.</p>
        <div class="social">
          <a href="#" class="social_media"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="social_media"><i class="fa-brands fa-facebook"></i></a>
          <a href="#" class="social_media"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" class="social_media"><i class="fa-brands fa-pinterest"></i></a>
        </div>
      </section>
      <nav class="footer_og_tea">
        <section class="footer_og"><button class="footer_og_name">Shop</button><ul class="og_list"><li><a href="#">Black Tea</a></li><li><a href="#">Green Tea</a></li><li><a href="#">Matcha</a></li><li><a href="#">Gifts</a></li></ul></section>
        <section class="footer_og"><button class="footer_og_name">The House</button><ul class="og_list"><li><a href="#">Our Story</a></li><li><a href="#">Sourcing</a></li><li><a href="#">Boutiques</a></li></ul></section>
        <section class="footer_og"><button class="footer_og_name">Help</button><ul class="og_list"><li><a href="#">Shipping</a></li><li><a href="#">Returns</a></li><li><a href="#">FAQ</a></li></ul></section>
      </nav>
    </div>
    <div class="footer_bot">
      <ul class="legal"><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li><li><a href="#">Cookies</a></li></ul>
      <div class="payments">
        <i class="fa-brands fa-cc-visa"></i><i class="fa-brands fa-cc-mastercard"></i>
        <i class="fa-brands fa-cc-amex"></i><i class="fa-brands fa-cc-apple-pay"></i>
      </div>
    </div>
    <div class="footer_legalnote">&copy; 2025 Betjeman &amp; Barton. All rights reserved.</div>
  </footer>

  <script>
    // ── Nav dropdowns ───────────────────────────────────────────────────
    setTimeout(function() {
      var menus = { teas:'menu1', ourOg:'menu2', boxNBag:'menu3', boxNGift:'menu4', access:'menu5' };
      document.body.addEventListener('click', function(e) {
        var btn = e.target.closest('.nav-btn');
        Object.keys(menus).forEach(function(id) {
          var menu = document.getElementById(menus[id]);
          if (!menu) return;
          if (btn && btn.id === id) {
            menu.classList.toggle('show');
          } else {
            menu.classList.remove('show');
          }
        });
      });
    }, 100);

    // ── Cursor follow (listing items) ───────────────────────────────────
    var listingItems = document.querySelectorAll('.listing_item');
    var cursor = document.createElement('div');
    cursor.className = 'cursor_hover';
    document.body.appendChild(cursor);
    listingItems.forEach(function(item) {
      item.addEventListener('mouseenter', function() {
        var image = this.getAttribute('data-image');
        cursor.innerHTML = '<img src="' + image + '"> Discover <i class="fa-solid fa-arrow-right"></i>';
        cursor.classList.add('show');
      });
      item.addEventListener('mouseleave', function() { cursor.classList.remove('show'); });
      item.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 15 + 'px';
        cursor.style.top  = e.clientY + 15 + 'px';
      });
    });

    // ── Autumn selection hover overlay ──────────────────────────────────
    var autumLinks = document.querySelectorAll('#autum_selection_img a');
    autumLinks.forEach(function(item) {
      var autumInfo = document.createElement('div');
      autumInfo.className = 'autum_info';
      item.appendChild(autumInfo);
      item.addEventListener('mouseenter', function() {
        var name = this.getAttribute('data-name');
        var price = this.getAttribute('data-price');
        if (name && price) {
          autumInfo.innerHTML = '<div class="info_name">' + name + '</div><div class="info_price">' + price + '</div>';
          autumInfo.classList.add('show');
        }
      });
      item.addEventListener('mouseleave', function() { autumInfo.classList.remove('show'); });
    });
  </script>
</body>
</html>`;

const FILES = [
  { label: "HTML", language: "html" as const, code: HTML_CODE },
  { label: "CSS",  language: "css"  as const, code: CSS_CODE  },
  { label: "JS",   language: "js"   as const, code: JS_CODE   },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function BetjemanLab() {
  const [dark, setDark]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setDark(localStorage.getItem("theme") === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = () => {
    const newDark = !dark;
    localStorage.setItem("theme", newDark ? "dark" : "light");
    setDark(newDark);
  };

  const theme = dark
    ? { "--bg":"#09090E","--text-primary":"#EDEAE3","--text-secondary":"#7D7A73","--text-tertiary":"#4A4846","--border":"rgba(255,255,255,0.07)","--card-bg":"rgba(255,255,255,0.025)","--accent":"#F5A623","--nav-bg-scrolled":"rgba(9,9,14,0.82)" }
    : { "--bg":"#F8F7F2","--text-primary":"#0E0D0A","--text-secondary":"#5A5855","--text-tertiary":"#8E8C89","--border":"rgba(0,0,0,0.09)","--card-bg":"rgba(0,0,0,0.03)","--accent":"#2563EB","--nav-bg-scrolled":"rgba(248,247,242,0.82)" };

  const activeFile = FILES[activeTab];

  return (
    <div suppressHydrationWarning style={{ ...(theme as React.CSSProperties), backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)", transition: "background-color 0.4s ease" }}>

      {/* ── Nav ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(24px,5vw,64px)", height: 60, backgroundColor: scrolled ? "var(--nav-bg-scrolled)" : (dark ? "rgba(9,9,14,0.72)" : "rgba(248,247,242,0.72)"), backdropFilter: "blur(20px) saturate(1.6)", borderBottom: "1px solid var(--border)", transition: "background-color 0.35s ease" }}>
        <a href="/" style={{ fontFamily: serif, fontSize: 17, fontWeight: 400, color: "var(--text-primary)", textDecoration: "none", letterSpacing: "-0.01em" }}>
          Jinju Park
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28, height: "100%" }}>
          {(["Work", "Lab", "About", "Contact"] as const).map((label) => (
            <a key={label} href={`/#${label.toLowerCase()}`} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >{label}</a>
          ))}
          <button onClick={handleToggle} style={{ display: "flex", alignItems: "center", gap: 7, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "5px 13px", cursor: "pointer", fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", transition: "border-color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", background: dark ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : "linear-gradient(135deg,#1e1b4b,#4338ca)", transition: "background 0.4s" }} />
            {dark ? "light" : "dark"}
          </button>
        </div>
      </nav>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px,6vw,96px)", paddingTop: 100 }}>

        {/* Back */}
        <a href="/#lab" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", textDecoration: "none", marginBottom: 40, transition: "color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
        >← Lab</a>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {["HTML", "CSS", "JS"].map((t) => (
              <span key={t} style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: 12, marginTop: 0 }}>
            Betjeman &amp; Barton
          </h1>
          <p style={{ fontFamily: sans, fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 620, marginBottom: 20 }}>
            A luxury French tea house e-commerce concept. Hero with seasonal collection, cursor-follow image previews on category hover, product grids with hover name/price overlays, and a sticky nav with animated dropdowns — all in vanilla HTML, CSS, and JS.
          </p>
          <a href="https://github.com/Oinkyjinju/betjemanandbarton_tea" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: 2, transition: "opacity 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.65"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            View on GitHub ↗
          </a>
        </div>

        {/* Code + Preview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 120 }}>

          {/* Code panel */}
          <div style={{ background: dark ? "#0d1117" : "#1e1e2e", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", height: 500 }}>
            {/* Tab bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", flexShrink: 0 }}>
              <div style={{ display: "flex" }}>
                {FILES.map((f, i) => {
                  const isActive = i === activeTab;
                  return (
                    <button key={f.label} onClick={() => setActiveTab(i)} style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 16px", background: "transparent", border: "none", borderBottom: isActive ? "2px solid #F5A623" : "2px solid transparent", color: isActive ? "#cdd6f4" : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "color 0.15s" }}>
                      {f.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 6, padding: "0 16px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span key={c} aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                ))}
              </div>
            </div>
            {/* Code */}
            <pre style={{ fontFamily: mono, fontSize: 12, lineHeight: 1.7, color: "#cdd6f4", padding: "20px", margin: 0, overflowX: "auto", overflowY: "auto", whiteSpace: "pre", flex: 1, minHeight: 0 }}>
              <CodeHighlight code={activeFile.code} language={activeFile.language} />
            </pre>
          </div>

          {/* Preview */}
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", height: 500 }}>
            <iframe
              srcDoc={PREVIEW_HTML}
              title="Betjeman & Barton live preview"
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              sandbox="allow-same-origin allow-scripts"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
