import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';
import MiniSlider from './modules/slider/slider-mini';
import Difference from './modules/differences';
import Form from './modules/forms';
import Accordion from './modules/accordion';
import Download from './modules/download';

window.addEventListener("DOMContentLoaded", () => {
    const mainSlider = new MainSlider({container: '.page', btns:'.next'});
    mainSlider.render();

    const mainPageSlider = new MainSlider({
        container: '.moduleapp', 
        btns: '.next', 
        next: '.nextmodule', 
        prev: '.prevmodule'});
    mainPageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animated: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animated: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new Difference('.officerold', '.officer__card-item').init();

    new Difference('.officernew', '.officer__card-item').init();

    new Form('.form', 'assets/question.php').init();

    new Accordion('.plus .plus__content', '.msg').init();

    new VideoPlayer('.showup .play', '.overlay').init();

    new VideoPlayer('.module__video-item .play', '.overlay').init();

    new Download('.download').init();
});