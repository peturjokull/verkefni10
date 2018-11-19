// todo vísa í rétta hluti með import
import * as help from './helpers';
import * as storage from './storage';
/**
 * Reikna út stig fyrir svör út frá heildarfjölda svarað á tíma.
 * Ekki þarf að gera ráð fyrir hversu lengi seinasta spurning var sýnd. Þ.e.a.s.
 * stig verða alltaf reiknuð fyrir n-1 af n spurningum.
 *
 * @param {number} total Heildarfjöldi spurninga
 * @param {number} correct Fjöldi svarað rétt
 * @param {number} time Tími sem spurningum var svarað á í sekúndum
 *
 * @returns {number} Stig fyrir svör
 */
export function score(total, correct, time) {
  // todo útfæra
  // score := ((correct / total)^2 + correct) * total / time
  var skila = (((correct / total) * (correct / total) + correct) * total / time);
  skila = Math.round(skila) * 100;
  return skila;
}

/**
 * Útbúa stigatöflu, sækir gögn í gegnum storage.js
 */
export default class Highscore {
  constructor() {
    this.scores = document.querySelector('.highscore__scores');
    this.button = document.querySelector('.highscore__button');

    this.button.addEventListener('click', this.clear.bind(this));
  }

  /**
   * Hlaða stigatöflu inn
   */
  load() {
    // todo útfæra
    this.highscore(storage.load());
  }

  /**
   * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
   */
  clear() {
    storage.clear();
    help.empty(this.scores);
    const stigSkrad = help.el('p', 'Engin stig skráð');
    this.scores.appendChild(stigSkrad);

    this.button.classList.add('highscore__button--hidden');
  }

  /**
   * Hlaða inn stigatöflu fyrir gefin gögn.
   *
   * @param {array} data Fylki af færslum í stigatöflu
   */
  highscore(data) {
    // todo útfæra
    help.empty(this.scores);
    this.button.classList.remove('highscore__button--hidden');
    const ordlist = help.el('ol');
    this.scores.appendChild(ordlist);
    data.forEach((pts) => {
      const listi = help.el('li');
      const stig = help.el('span', `${pts.points}`);
      stig.classList.add('highscore__number');
      const nafn = help.el('span', `${stig.name}`);
      stig.classList.add('highscore__name');
      listi.appendChild(stig);
      listi.appendChild(nafn);
      ordlist.appendChild(listi);
    });
  }
}
