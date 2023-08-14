export default class Form {
    constructor(form) {
        this.forms = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
        this.path = 'https://simple-server-cumz.onrender.com/api/data';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInpits() {
        const txtInputs = document.querySelectorAll('[type="email"]');

        txtInputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
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
                const range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        };

        const createMask = (event) => {
            const input = event.target;
            if (!input) return;
            const matrix = "+1 (___) ___-____";
            let i = 0;
            const def = matrix.replace(/\D/g, "");
            let val = input.value.replace(/\D/g, "");

            if (def.length >= val.length) {
                val = def;
            }

            input.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
            });

            if (event.type === "blur") {
                if (input.value.length == 2) {
                    input.value = "";
                }
            } else {
                setCursorPosition(input.value.length, input);
            }
        };

        const inpits = document.querySelectorAll('[name="phone"]');

        inpits.forEach((input) => {
            input.addEventListener("input", createMask);
            input.addEventListener("focus", createMask);
            input.addEventListener("blur", createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
              },
            method: "POST",
            body: JSON.stringify(data)
        });

        return await res.text();
    }

    init() {
        this.checkMailInpits();
        this.initMask();
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: gray;
                    `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);
                const jsonData = {};

                for (let [key, value] of formData.entries()) {
                    jsonData[key] = value;
                }

                this.postData(this.path, jsonData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    })
            });
        });
    }
}