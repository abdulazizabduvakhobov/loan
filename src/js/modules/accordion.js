export default class Accordion {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    init() {
        try {
            this.btns.forEach(btn => {
                const sibling = btn.closest('.module__info-show').nextElementSibling;
                sibling.style.marginTop = '20px';
                sibling.classList.add('animated');
                btn.addEventListener('click', () => {
                    sibling.classList.toggle('msg');
                    if (sibling.classList.contains('msg')) {
                        sibling.classList.remove('fadeInUp');
                        sibling.classList.add('fadeOutUp');
                    } else {
                        sibling.classList.add('fadeInUp');
                        sibling.classList.remove('fadeOutUp');
                    }
                });
            });
        } catch(e){}
    }
}