export default class videoPlayer {
    constructor(triggers, overlay) {
        this.buttons = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector(".close");
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.buttons.forEach((btn, i) => {
            if (btn.closest(".module__video-item")) {
                const blockedElem = btn.closest(".module__video-item").nextElementSibling;

                if (i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            }

            btn.addEventListener("click", () => {
                if (!btn.closest(".module__video-item") || btn.closest(".module__video-item").getAttribute("data-disabled") !== "true") {
                    this.activeBtn = btn;

                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = "flex";
                        if (this.path !== btn.getAttribute("data-url")) {
                            this.path = btn.getAttribute("data-url");
                            this.player.loadVideoById({
                                videoId: this.path
                            });
                        }
                    } else {
                        const path = btn.getAttribute("data-url");

                        this.createPlayer(path);
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener("click", () => {
            this.overlay.style.display = "none";
            this.player.stopVideo();
        });
    }

    createPlayer(videoId) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = "flex";
    }

    onPlayerStateChange(state) {
        if (this.activeBtn.closest(".module__video-item")) {
            const blockedElem = this.activeBtn.closest(".module__video-item").nextElementSibling;
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

            if (state.data === 0) {
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove();
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);
                    blockedElem.querySelector('.play__text').textContent = "play video";
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';

                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        }
    }

    init() {
        if (this.buttons.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}