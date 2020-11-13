export default class Slider {
    constructor({
        container=null, 
        btns=null, 
        next=null, 
        prev=null,
        activeClass = '',
        animated,
        autoplay} =''){
        this.container = document.querySelector(container);
        this.btns = document.querySelectorAll(btns);
        try {this.slides = this.container.children;} catch(e){}
        this.slideIndex = 1;
        this.activeClass = activeClass;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.animated = animated;
        this.autoplay = autoplay;
    }
}