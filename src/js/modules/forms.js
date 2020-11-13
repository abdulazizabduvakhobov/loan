export default class Form {
    constructor(forms, url) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Loading...',
            success: 'Thanks! We will contact you soon...',
            error: 'Something went wrong...',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
        this.path = url;
        this.inputs = document.querySelectorAll('input');
    }

    async postData (url, data) {
        const res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkEmailInputs () {
        const emailInputs = document.querySelectorAll('[type="email"]');
    
        emailInputs.forEach(item => {
            item.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ /.]/)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {

        let setCursorPosition = (pos, elem) => {
            elem.focus();
            
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    init() {
        this.initMask();
        this.checkEmailInputs();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
            
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: #000000;
                `;
                item.parentNode.appendChild(statusMessage);
                item.classList.add('animated', 'fadeOutUp');

                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
    
                let statusImg = document.createElement('img');
                statusImg.setAttribute('src', this.message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);
    
                let textMessage = document.createElement('div');
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);
                

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                        statusImg.setAttribute('src', this.message.ok);
                    })
                    .catch(err => {
                        console.error(err);
                        statusMessage.textContent = this.message.error;
                        statusImg.setAttribute('src', this.message.fail);
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.classList.remove('fadeOutUp');
                            item.classList.add('fadeInUp'); 
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }


}