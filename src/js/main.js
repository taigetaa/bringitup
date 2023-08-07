import videoPlayer from "./modules/playVideo";
import mainSlider from "./modules/slider/slider-main";

window.addEventListener("DOMContentLoaded", () => {
    const slider = new mainSlider({btns: '.next', page: '.page'});
    slider.render();

    const player = new videoPlayer(".showup .play", ".overlay");
    player.init();

});