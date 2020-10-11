import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';

import './zuehlke-chapter.css';
import './zuehlke-toc.css';
import './index.css';

// import example web components
import VoteCounter from "./vote-counter";
// import stencil web components
import {defineCustomElements} from "../stencil-components/loader";

// import chapters
import toc from './pages/toc.html';
import chapter1 from './pages/01.html';
import chapter2 from './pages/02.html';
import chapter3 from './pages/03.html';
import chapter4 from './pages/04.html';
import chapter5 from './pages/05.html';
import chapter6 from './pages/06.html';
import chapter7 from './pages/07.html';
import chapter8 from './pages/08.html';

// define custom elements
customElements.define('vote-counter', VoteCounter);
defineCustomElements().catch(console.error);

const chapters = [
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter8,
];

function loadToc() {
    document.querySelector('.toc').innerHTML = `<div>${toc}</div>`;
    chapters.forEach((chapter, index) => {
        const chapterNumber = index + 1;
        const chapterSection = document.getElementById(`chapter${chapterNumber}`);
        chapterSection.addEventListener('click', () => loadChapter(chapterNumber));
    });
}

function loadChapter(index) {
    const chapter = chapters[index - 1];

    document.querySelector('.toc').innerHTML = '';
    document.querySelector('.slides-container').innerHTML = `<div class="reveal chapter${index}"><div class="slides">${chapter}</div></div>`;

    const deck = new Reveal(document.querySelector(`.chapter${index}`), {
        history: true,
        plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
    });
    deck.initialize().then(() => {
        deck.getPlugin('highlight').hljs.initHighlightingOnLoad();
        deck.slide(0, 0, 0);
        deck.sync();
    });
}

// show table of contents
loadToc();
