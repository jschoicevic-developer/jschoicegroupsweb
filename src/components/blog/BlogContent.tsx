'use client';

import { useEffect, useRef } from 'react';

const FAQ_KEYWORDS = ['frequently asked', 'faq', 'common questions', 'questions & answers', 'questions and answers'];

/** Collect sibling elements after `startEl` until a same-or-higher-level heading, a [data-faq-item], or end of parent */
function collectAnswerEls(startEl: Element, stopAtLevel: number): Element[] {
    const answers: Element[] = [];
    let cur = startEl.nextElementSibling;

    while (cur) {
        if (cur.hasAttribute('data-faq-item')) break;
        const tag = cur.tagName.toUpperCase();
        if (/^H[1-6]$/.test(tag) && parseInt(tag[1]) <= stopAtLevel) break;
        answers.push(cur);
        cur = cur.nextElementSibling;
    }

    return answers;
}

/** Convert a question heading + its answer siblings into one accordion item */
function makeAccordionItem(questionEl: Element): void {
    if (questionEl.closest('[data-faq-item]')) return;

    const level = parseInt(questionEl.tagName[1]);
    const answers = collectAnswerEls(questionEl, level);
    if (!answers.length) return;

    /* wrapper */
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-faq-item', '');
    wrapper.style.cssText = [
        'border:1px solid #dde1ff',
        'border-radius:12px',
        'overflow:hidden',
        'background:#ffffff',
        'transition:border-color 0.2s, box-shadow 0.2s',
    ].join(';');

    /* toggle button */
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = [
        'width:100%',
        'text-align:left',
        'padding:15px 18px',
        'display:flex',
        'align-items:flex-start',
        'justify-content:space-between',
        'gap:14px',
        'background:#f5f6ff',
        'cursor:pointer',
        'border:none',
        'font-family:inherit',
        'transition:background 0.2s',
    ].join(';');

    const qText = document.createElement('span');
    qText.style.cssText = 'font-size:0.95rem;font-weight:700;color:#1a202c;line-height:1.5;flex:1;';
    qText.innerHTML = questionEl.innerHTML;

    const iconWrap = document.createElement('span');
    iconWrap.style.cssText = 'flex-shrink:0;display:flex;align-items:center;margin-top:2px;transition:transform 0.3s ease;';
    iconWrap.innerHTML = `<svg width="16" height="16" fill="none" stroke="#ABB3F1" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>`;

    btn.appendChild(qText);
    btn.appendChild(iconWrap);

    /* answer panel */
    const panel = document.createElement('div');
    panel.style.cssText = [
        'display:none',
        'padding:14px 18px 18px',
        'background:#ffffff',
        'border-top:1px solid #eef0ff',
    ].join(';');

    answers.forEach(ans => {
        const clone = ans.cloneNode(true) as HTMLElement;
        clone.style.cssText = 'margin:0 0 10px;color:#4b5563;font-size:0.95rem;line-height:1.75;';
        panel.appendChild(clone);
    });

    /* toggle behaviour */
    let open = false;
    const setOpen = (next: boolean) => {
        open = next;
        panel.style.display = open ? 'block' : 'none';
        iconWrap.style.transform = open ? 'rotate(180deg)' : 'rotate(0)';
        btn.style.background = open ? 'rgba(171,179,241,0.18)' : '#f5f6ff';
        wrapper.style.borderColor = open ? '#ABB3F1' : '#dde1ff';
        wrapper.style.boxShadow = open ? '0 2px 12px rgba(171,179,241,0.18)' : 'none';
    };

    btn.addEventListener('click', () => setOpen(!open));
    btn.addEventListener('mouseenter', () => { if (!open) btn.style.background = 'rgba(171,179,241,0.1)'; });
    btn.addEventListener('mouseleave', () => { if (!open) btn.style.background = '#f5f6ff'; });

    wrapper.appendChild(btn);
    wrapper.appendChild(panel);

    questionEl.parentNode?.insertBefore(wrapper, questionEl);
    questionEl.remove();
    answers.forEach(a => a.remove());
}

/** Build accordion items then wrap the whole FAQ section in a distinct styled card */
function transformFaqSection(faqHeading: Element): void {
    const sectionLevel = parseInt(faqHeading.tagName[1]);

    /* ── Step 1: collect question headings ── */
    const questions: Element[] = [];
    let cur = faqHeading.nextElementSibling;
    while (cur) {
        if (!cur.hasAttribute('data-faq-item')) {
            const tag = cur.tagName.toUpperCase();
            if (/^H[1-6]$/.test(tag)) {
                const lvl = parseInt(tag[1]);
                if (lvl <= sectionLevel) break;
                if (lvl === sectionLevel + 1) questions.push(cur);
            }
        }
        cur = cur.nextElementSibling;
    }

    /* ── Step 2: build accordion items bottom-up ── */
    [...questions].reverse().forEach(makeAccordionItem);

    /* ── Step 3: collect everything now in the FAQ section ── */
    const sectionEls: Element[] = [];
    cur = faqHeading.nextElementSibling;
    while (cur) {
        const tag = cur.tagName.toUpperCase();
        if (/^H[1-6]$/.test(tag) && parseInt(tag[1]) <= sectionLevel) break;
        sectionEls.push(cur);
        cur = cur.nextElementSibling;
    }

    /* ── Step 4: build the outer FAQ card ── */
    const card = document.createElement('div');
    card.setAttribute('data-faq-section', '');
    card.style.cssText = [
        'margin:2.5rem 0',
        'border-radius:20px',
        'overflow:hidden',
        'border:1.5px solid #c7cdf7',
        'box-shadow:0 8px 32px rgba(171,179,241,0.18)',
        'background:linear-gradient(160deg,#f4f6ff 0%,#faf5ff 100%)',
    ].join(';');

    /* card header */
    const cardHeader = document.createElement('div');
    cardHeader.style.cssText = [
        'background:linear-gradient(120deg,#1a202c 0%,#2d3748 55%,#4a5568 100%)',
        'padding:18px 24px',
        'display:flex',
        'align-items:center',
        'gap:12px',
        'border-bottom:2px solid #ABB3F1',
    ].join(';');

    const headerIcon = document.createElement('span');
    headerIcon.style.cssText = 'flex-shrink:0;display:flex;align-items:center;';
    headerIcon.innerHTML = `<svg width="22" height="22" fill="none" stroke="#ABB3F1" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`;

    const headerTitle = document.createElement('span');
    headerTitle.style.cssText = [
        'font-size:1rem',
        'font-weight:900',
        'color:#ffffff',
        'letter-spacing:0.07em',
        'text-transform:uppercase',
        'font-family:inherit',
    ].join(';');
    headerTitle.textContent = (faqHeading.textContent || 'Frequently Asked Questions').trim();

    cardHeader.appendChild(headerIcon);
    cardHeader.appendChild(headerTitle);

    /* card body */
    const cardBody = document.createElement('div');
    cardBody.style.cssText = 'padding:20px 20px 24px;display:flex;flex-direction:column;gap:8px;';

    sectionEls.forEach(el => cardBody.appendChild(el));

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    /* replace FAQ heading with the card */
    faqHeading.parentNode?.insertBefore(card, faqHeading);
    faqHeading.remove();
}

/* ─────────────────────────────────────────────────────────────── */

interface BlogContentProps {
    html: string;
    className?: string;
}

export default function BlogContent({ html, className }: BlogContentProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        /* guard against React Strict Mode double-invoke */
        if (root.querySelector('[data-faq-section]')) return;

        const headings = Array.from(root.querySelectorAll('h2, h3, h4'));
        let transformed = false;

        for (const h of headings) {
            const text = (h.textContent || '').trim().toLowerCase();
            if (FAQ_KEYWORDS.some(kw => text.includes(kw))) {
                transformFaqSection(h);
                transformed = true;
            }
        }

        /* fallback: standalone question headings ending with "?" */
        if (!transformed) {
            const questionHeadings = Array.from(root.querySelectorAll('h3, h4')).filter(h =>
                (h.textContent || '').trim().endsWith('?')
            );
            [...questionHeadings].reverse().forEach(makeAccordionItem);
        }
    }, [html]);

    return (
        <div
            ref={ref}
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
