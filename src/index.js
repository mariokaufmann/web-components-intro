import Reveal from 'reveal.js';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';

import './index.css';
import './zuehlke-chapter.css';
import './zuehlke-toc.css';


import toc from './pages/toc.html';
import chapter1 from './pages/01.html';

document.querySelector('.toc').innerHTML = `<div>${toc}</div>`;

const chapters = [
    chapter1,
];

function loadChapter(index) {
    const chapter = chapters[index - 1];

    document.querySelector('.toc').innerHTML = '';
    document.querySelector('.slides-container').innerHTML = `<div class="reveal"><div class="slides">${chapter}</div></div>`;

    const deck = new Reveal(document.querySelector('.reveal'));
    deck.initialize();
}

loadChapter(1);

