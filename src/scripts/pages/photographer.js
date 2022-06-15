/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-console */

const api = require('../components/api');
const {getPhotographerProfileDetails} = require('../factories/photographer');
const {getPhotographersMedias, totalOfLikes} = require('../factories/medias');
const { openModal, closeModal } = require('../utils/modal');


module.exports = (id) => {
  /**
   * to display each photographer info on his profile
   * @param {object} data from data.json
   */
  const displayHeaderElements = (data) => {
    data.forEach((photographer) => {
      if (location.href.includes(photographer.id)) {
        getPhotographerProfileDetails(photographer);
      }
    });
  };

  const displayMedias = (data) => {
    console.log(`id du photographe: ${id}`);
    data.forEach((media) => {
      if (parseInt(id) === media.photographerId) {
        getPhotographersMedias(media);
      }
    });
  };
  const displaytotalOfLikes = (data,) => {
    console.log(`id du photographe: ${id}`);
    const arrayOfLikes = []
    data.forEach((media) => {
        totalOfLikes(media, arrayOfLikes);
    });
    const likesReduce = arrayOfLikes.reduce((acc,likes)=> acc + likes)
    console.log(likesReduce);
    const totalLikesDom = document.getElementById('totalLikes')
    totalLikesDom.textContent = likesReduce
    
  };

  const displayLightBox = (data) => {
    console.log('lightbox', data);
    /* data.forEach((object) => {
      if(object.id == clickedId){
        console.log('match');
      };
    }) */
    
  };

  /**
   * To get data photographers info in data.json, put it in an array and play the code.
   * To get each photographer's media from data.json
   */
   const init = async () => {
    const photographers = await api.getPhotographers();
    console.log("Photographes:" , photographers);
    const medias = await api.getMediasByPhotographerId(parseInt(id));
    console.log("medias du photographe:", medias)

    displayHeaderElements(photographers);
    displayMedias(medias);
    displayLightBox(medias);
    displaytotalOfLikes(medias);
  };

 const runPage = async () => {
  await init();
  
  openModal();
  closeModal();
 }
 runPage()
 
 
};
