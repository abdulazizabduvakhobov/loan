import Slider from './sliders';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }
    
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(slide => {
            slide.classList.add('animated', 'fadeOutDown');
            slide.classList.remove('fadeInDown');
            slide.style.display = 'none';
        });

        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e){}

        this.slides[this.slideIndex - 1].style.display = 'block';
        this.slides[this.slideIndex - 1].classList.add('fadeInDown');
        this.slides[this.slideIndex - 1].classList.remove('fadeOutDown');
    }

    plusSlide(n) {
        this.showSlides(this.slideIndex += n);
    }

    addEvent(selector, n) {
        document.querySelectorAll(selector).forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                this.plusSlide(n);
            });
        });
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlide(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.addEvent(this.prev, -1);
        this.addEvent(this.next, 1);
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}
            
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        } 
    } 
}