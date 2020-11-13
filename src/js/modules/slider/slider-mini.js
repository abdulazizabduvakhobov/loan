import Slider from './sliders';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, animated, autoplay, activeClass) {
        super(container, next, prev, animated, autoplay, activeClass);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animated) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (this.animated) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
        if (this.slides[0].type !== "button") {
            this.slides[0].classList.add(this.activeClass);
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.decorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });

        this.next.addEventListener('click', () => this.nextSlide());
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            overflow: hidden;
            `;
            this.bindTriggers();
            this.decorizeSlides();

            if  (this.autoplay)   {
                setInterval(() => this.nextSlide(), 5000);
            }
        } catch(e){}
    }
}