import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            slide.querySelector('.card__title').style.opacity = "0.4";
            slide.querySelector('.card__controls-arrow').style.opacity = "0";
        });
    
        if (this.slides[0] && !this.slides[0].closest('button')) {
            this.slides[0].classList.add('animated', 'fadeInUp');
        }
    
        if (this.slides[0] && this.animate) {
            this.slides[0].classList.add(this.activeClass);
            this.slides[0].querySelector('.card__title').style.opacity = "1";
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = "1";
        }
    }

    nextSlide() {
        this.slides = Array.from(this.slides);
        if (this.slides[1] && this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[2]);
            this.decorizeSlides();
        } else if (this.slides[1] && this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener("click", this.nextSlide());

        this.prev.addEventListener("click", () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    const active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;
        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
    }
}