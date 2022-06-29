/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-console */

const { emptyMedias } = require('../components/dom');
const {lightBox,lightBoxContent, photographerPage, closeLightBoxBtn,nextLightBoxBtn,prevLightBoxBtn} = require('../components/domLinker');

const EscKey = 'Escape' || key === 'Esc' || key === 27;
const arrowR = 'ArrowRight' || key === 39;
const arrowL = 'ArrowLeft' || key === 37;

/**
 * @param {array} articles
 * @returns index of array
 */
const getCurrentArticleIndex = (articles) => {
  const article = lightBoxContent.firstElementChild;
  const result = articles.find((item) => item.id === article.id);
  console.log("Média à l'index: ",articles.indexOf(result),"avec l'id: ",article.id);
  return articles.indexOf(result);
};

/**
 * @param {array} articles
 */
const nextMedia = (articles) => {
  const currentIndex = getCurrentArticleIndex(articles);
  emptyMedias(lightBoxContent);
  lightBoxContent.appendChild(
    currentIndex === articles.length - 1
      ? articles[0]
      : articles[currentIndex + 1]
  );
  setVideo()
};

/**
 * @param {array} articles
 */
const prevMedia = (articles) => {
  const currentIndex = getCurrentArticleIndex(articles);
  emptyMedias(lightBoxContent);
  lightBoxContent.appendChild(
    currentIndex === 0
      ? articles[articles.length - 1]
      : articles[currentIndex - 1]
  );
  setVideo()
};

const setKeys = (userKeyPressed, articles) => {
  if(lightBox.classList.contains('show')){
    switch (userKeyPressed) {
     case EscKey: closeLightBox()
       break;
     case arrowL: prevMedia(articles)
       break;
     case arrowR: nextMedia(articles)
       break;
    }
  }
}

const openLightBox = (media ,articles) => {
  lightBox.classList.add('show');
  displayLightBoxContent(media)
  getCurrentArticleIndex(articles)

  nextLightBoxBtn.addEventListener('click', () => nextMedia(articles));
  prevLightBoxBtn.addEventListener('click', () => prevMedia(articles));

  photographerPage.setAttribute('aria-hidden', 'true')
  lightBox.setAttribute('aria-hidden', 'false')
  closeLightBoxBtn.focus()
  document.addEventListener('keydown', e =>{
    const userPress = e.key
    setKeys(userPress, articles)
});
};

const closeLightBox = () => {
    lightBox.classList.remove('show');
    emptyMedias(lightBoxContent);
    photographerPage.setAttribute('aria-hidden', 'true')
    lightBox.setAttribute('aria-hidden', 'false')
    photographerPage.focus()
    document.removeEventListener('click',nextMedia)
    document.removeEventListener('click',prevMedia)
    document.removeEventListener('keydown',setKeys)
};

/**
 *
 * @param {object} media data from photographers.json
 */
const displayLightBoxContent = (media) => {
  lightBoxContent.appendChild(media.getArticleDOM().article);
  setVideo()
};

const setVideo = () => {
  const video = document.querySelector('div.lightBox__container > article > video')
  if (video){
    video.setAttribute('controls' , 'controls')
  }
}

module.exports = {
  openLightBox,
  closeLightBox,
  nextMedia,
  prevMedia,
  getCurrentArticleIndex,
};