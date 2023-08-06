import Slider from "./modules/slider";
import videoPlayer from "./modules/playVideo";

window.addEventListener("DOMContentLoaded", () => {
    const slider = new Slider(".page", ".next");
    slider.render();
    const player = new videoPlayer(".showup .play", ".overlay");
    player.init();
});