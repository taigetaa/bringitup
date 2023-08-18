export default class ShowInfo {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.closest(".module__info-show")) {
                    const sibling = btn.closest(".module__info-show").nextElementSibling;

                    sibling.classList.toggle("msg");
                    sibling.style.marginTop = "20px";
                }
            });
        });
    }
}