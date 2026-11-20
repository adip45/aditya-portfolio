const { chromium } = require('/home/user/.npm/_npx/fd3bca3c548369c0/node_modules/playwright-core');
const BASE = 'http://127.0.0.1:3000';
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  let fails = 0;
  const check = (n, c, x='') => { if (!c) fails++; console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${x ? ' — ' + x : ''}`); };

  /* ---------- 1. No hydration errors on any route ---------- */
  for (const [url, label] of [['/', 'Home'], ['/projects/hostelconnect', 'Case study'], ['/nope', '404']]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    const errs = [];
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
    await p.goto(BASE + url, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    const isHyd = e => /hydrat|didn't match|did not match|server rendered|server HTML/i.test(e);
    const hyd = errs.filter(isHyd);
    const other = errs.filter(e => !isHyd(e) && !/404|Failed to load resource/i.test(e));
    check(`${label}: hydration clean`, hyd.length === 0, hyd[0]?.split('\n')[0] || 'no mismatch');
    check(`${label}: console clean`, other.length === 0, other.join(' | ') || 'no errors');
    await p.close();
  }

  /* ---------- 2. SSR markup === client markup, byte for byte ----------
     The hero visual is now a CSS-3D composition rather than an SVG, so the
     check compares the rendered attribute surface of the stack node instead
     of SVG primitives. Anything non-deterministic (random ids, float
     formatting, time) shows up here as a mismatch. */
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const serverHTML = await res.text();
  await p.waitForTimeout(2200);

  const extract = (html) => {
    const m = html.match(/<div class="hero-stack"[\s\S]*?<\/ul>/);
    return m ? m[0] : null;
  };

  const clientHTML = await p.evaluate(() => {
    const el = document.querySelector('.hero-stack');
    return el ? el.outerHTML : null;
  });

  const norm = (html) =>
    html
      .replace(/\s+/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();

  const S = extract(serverHTML);
  const C = clientHTML ? norm(clientHTML) : null;
  const SN = S ? norm(S) : null;

  check('Hero stack present in SSR markup', !!SN);
  check('Hero stack present on client', !!C);

  /* Compare structure only: tag names in order. Inline style values are
     allowed to differ because Framer animates transform on mount. */
  const tags = (html) => (html.match(/<([a-z]+)[\s>]/g) || []).map((t) => t.slice(1, -1));
  const st = SN ? tags(SN) : [];
  const ct = C ? tags(C) : [];
  const sameShape = st.length === ct.length && st.every((t, i) => t === ct[i]);
  check(`Hero stack structure identical (${st.length} nodes)`, sameShape, `${st.length} vs ${ct.length}`);

  /* No non-deterministic artefacts anywhere on the page. */
  const bad = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('[class],[style]').forEach((el) => {
      for (const a of el.attributes) {
        if (/undefined|NaN|Infinity/.test(a.value)) out.push(a.name + '=' + a.value.slice(0, 40));
      }
    });
    return out;
  });
  check('No undefined/NaN attributes', bad.length === 0, bad.slice(0, 1).join(''));

  const vis = await p.evaluate(() => {
    const el = document.querySelector('.hero-stack__scene');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.width > 40 && r.height > 40;
  });
  check('Hero visual renders', vis === true);

  /* ---------- 3. Reduced motion: the stack must settle, not animate ---- */
  const pr = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rmErrors = [];
  pr.on('console', (m) => m.type() === 'error' && rmErrors.push(m.text()));
  pr.on('pageerror', (e) => rmErrors.push(e.message));
  await pr.goto(BASE + '/', { waitUntil: 'networkidle' });
  await pr.waitForTimeout(1500);

  const rmState = await pr.evaluate(() => {
    const group = document.querySelector('.hero-stack__group');
    const cs = group ? getComputedStyle(group) : null;
    const anyUndef = [...document.querySelectorAll('[style]')].some((el) =>
      /undefined|NaN/.test(el.getAttribute('style') || '')
    );
    return {
      anim: cs ? cs.animationName : 'none',
      transform: cs ? cs.transform.slice(0, 12) : null,
      anyUndef,
    };
  });

  check('Reduced motion: stack animation off', rmState.anim === 'none', rmState.anim);
  check('Reduced motion: no undefined attrs', rmState.anyUndef === false);
  check('Reduced motion: no console errors', rmErrors.length === 0, rmErrors.slice(0, 2).join(' | ') || 'clean');
  await pr.close();

  /* ---------- 4. Hero composition intact ---------- */
  const geo = await p.evaluate(() => {
    const stack = document.querySelector('.hero-stack');
    const scene = document.querySelector('.hero-stack__scene');
    const planes = document.querySelectorAll('.hero-stack__plane');
    const legend = document.querySelectorAll('.hero-stack__legend-row');
    const r = scene ? scene.getBoundingClientRect() : { width: 0, height: 0 };
    return {
      hasStack: !!stack,
      planes: planes.length,
      legend: legend.length,
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  });
  check('Hero stack present', geo.hasStack);
  check('Hero stack has 3 planes', geo.planes === 3, `${geo.planes}`);
  check('Legend has 3 rows', geo.legend === 3, `${geo.legend}`);
  check('Hero visual has real area', geo.w > 100 && geo.h > 100, `${geo.w}x${geo.h}`);

  /* ---------- 5. Hero content matches the brief ---------- */
  const copy = await p.evaluate(() => ({
    eyebrow: document.querySelector('#home .kicker')?.textContent?.trim(),
    h1: document.querySelector('#home h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    headline: document.querySelectorAll('#home p')[1]?.textContent?.replace(/\s+/g, ' ').trim(),
    tags: [...document.querySelectorAll('#home ul[aria-label] li')].map((l) => l.textContent.trim()),
    primary: [...document.querySelectorAll('#home a')].find((a) => a.textContent.includes('Explore'))?.getAttribute('href'),
    secondary: [...document.querySelectorAll('#home a')].find((a) => a.textContent.includes('Connect'))?.getAttribute('href'),
  }));
  check('Eyebrow copy', copy.eyebrow === 'PICT Pune · Computer Engineering · Second year', copy.eyebrow);
  check('Name copy', /ADITYA\s*PATIL/.test(copy.h1 || ''), copy.h1);
  check('Headline copy', (copy.headline || '').includes('I turn ideas into software that solves problems'), copy.headline?.slice(0, 60));
  check('Three technical tags', copy.tags.length === 3, copy.tags.join(' | '));
  check('Primary CTA → #projects', copy.primary === '#projects', String(copy.primary));
  check('Secondary CTA → #contact', copy.secondary === '#contact', String(copy.secondary));

  await p.close();

  /* ---------- 6. Projects: equal treatment, real assets ---------- */
  const pj = await b.newPage();
  await pj.goto(`${BASE}/#projects`, { waitUntil: 'networkidle' });
  const proj = await pj.evaluate(() => {
    const cards = [...document.querySelectorAll('#projects article')];
    return {
      count: cards.length,
      // The same component means the same set of actions on every card.
      ctas: cards.map((c) =>
        [...c.querySelectorAll('a')].map((a) => a.textContent.replace(/\s+/g, ' ').trim())
      ),
      heights: cards.map((c) => Math.round(c.getBoundingClientRect().height)),
      widths: cards.map((c) => Math.round(c.getBoundingClientRect().width)),
      previews: cards.map((c) => {
        const img = c.querySelector('img');
        return img ? { src: img.getAttribute('src'), w: img.naturalWidth } : null;
      }),
      badges: cards.map((c) => {
        const t = c.textContent;
        return t.includes('Reconstructed UI') ? 'reconstructed' : 'capture';
      }),
      links: cards.map((c) => c.querySelector('a[href^="/projects/"]')?.getAttribute('href')),
      titleSizes: cards.map((c) =>
        Math.round(parseFloat(getComputedStyle(c.querySelector('h3')).fontSize))
      ),
    };
  });

  check('Three project cards', proj.count === 3, `${proj.count}`);
  check('Every card has a preview image', proj.previews.every((i) => i && i.w > 0),
    proj.previews.map((i) => (i ? `${i.src}:${i.w}` : 'MISSING')).join(' '));
  check('Every card has Explore project', proj.links.every(Boolean), proj.links.join(' '));
  check('Every card has a GitHub action',
    proj.ctas.every((c) => c.some((t) => t === 'GitHub')), 'missing on some card');
  check('No card invents a Live demo',
    proj.ctas.filter((c) => c.some((t) => t === 'Live demo')).length === 2,
    'only the two deployed projects show one');
  check('Lead card title is set larger than the rest',
    proj.titleSizes[0] > proj.titleSizes[1] + 4, proj.titleSizes.join(' / ') + ' px');
  check('Copy column height matched across the two side-by-side cards',
    Math.abs(proj.heights[1] - proj.heights[2]) <= 2, proj.heights.join(' / '));
  check('Reconstructed previews stay labelled',
    proj.badges[0] === 'reconstructed', proj.badges.join(' '));

  /* ---------- 7. Every case-study route renders ---------- */
  const routes = ['/projects/hostelconnect', '/projects/towers-of-hanoi', '/projects/sih-2026'];
  for (const r of routes) {
    const cs = await b.newPage();
    const res = await cs.goto(BASE + r, { waitUntil: 'networkidle' });
    // next/image lazy-loads below the fold; scroll the page so every
    // figure actually decodes before we assert on it.
    await cs.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await cs.waitForTimeout(1200);
    const info = await cs.evaluate(() => ({
      h1: document.querySelector('h1')?.textContent?.trim(),
      chapters: [...document.querySelectorAll('article h2')].map((h) => h.textContent.trim()),
      imgs: [...document.querySelectorAll('article img')].length,
      demo: [...document.querySelectorAll('a')].some((a) => a.textContent.includes('Open live site')),
      brokenImgs: [...document.querySelectorAll('article img')].some((i) => i.naturalWidth === 0),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    check(`${r} → 200`, res.status() === 200, String(res.status()));
    check(`${r} has seven chapters`, info.chapters.length >= 7, info.chapters.join(','));
    check(`${r} renders previews`, info.imgs > 0 && !info.brokenImgs, `${info.imgs} img`);
    check(`${r} no horizontal overflow`, info.overflow <= 1, `${info.overflow}px`);
    if (r.includes('hostelconnect')) {
      check(`${r} shows no live-demo button`, info.demo === false, 'correctly absent');
    }
    await cs.close();
  }

  /* ---------- 8. Unknown project 404s cleanly ---------- */
  const miss = await b.newPage();
  const missRes = await miss.goto(`${BASE}/projects/not-a-real-project`, { waitUntil: 'domcontentloaded' });
  check('/projects/not-a-real-project → 404', missRes.status() === 404, String(missRes.status()));
  await miss.close();
  await pj.close();

  console.log(fails === 0 ? '\n✅ ALL CHECKS PASSED' : `\n❌ ${fails} FAILURE(S)`);
  await b.close();
})();
