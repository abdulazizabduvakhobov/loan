export default class Difference {
    constructor(blockSelector, items) {
        this.blockSelector = document.querySelector(blockSelector);
        try {this.items = this.blockSelector.querySelectorAll(items);} catch(e){}
        this.counter = 0;
    }

    hideItems() {
        this.items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
                item.classList.add('animated');
            }
        });
    }

    bindTriggers() {
        this.blockSelector.querySelector('.plus').addEventListener('click', () => {
            if (this.counter !== this.items.length - 2) {
                this.items[this.counter].style.display = 'flex';
                this.items[this.counter].classList.add('fadeInUp');
                this.counter++;
            } else {
                this.items[this.counter].style.display = 'flex';
                this.items[this.counter].classList.add('fadeInUp');
                this.items[this.items.length - 1].remove();
            }
        });
    }

    init() {
        try {
            this.hideItems();
            this.bindTriggers();
        } catch(e){}
    }
}