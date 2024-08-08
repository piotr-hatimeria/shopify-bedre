class HeroBanner {
    constructor(animationPath, rootElement) {
        this.inViewPort = false;
        this.loadedScripts = false;
        this.animation = false;
        this.animationPath = animationPath;
        this.$root = rootElement;
    }

    loadScripts() {
        const element = this;
        (function(d, id) {
            if (d.getElementById(id)) { return; }
            var s = d.createElement('script'), fjs = d.scripts[d.scripts.length - 1];
            s.id = id; s.async = true;
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js';
            fjs.parentNode.insertBefore(s, fjs);
            s.addEventListener('load', () => {
                element.loadedScripts = true;
                element.playAnimation();
            });
        })(document, 'bodymovin-js-embed');
    }

    playAnimation() {
        if (!this.loadedScripts) {
            this.loadScripts();
            return;
        }
        if (this.animation) {
            this.animation.play();
        } else {
            this.animation = bodymovin.loadAnimation({
                container: this.$root,
                path: this.animationPath,
                renderer: 'svg',
                loop: true,
                autoplay: true
            });
        }
    }

    pauseAnimation() {
        if (this.animation) {
            this.animation.pause();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var bannerAnimationTitleElement = document.getElementById('banner__animation__title');
    if (bannerAnimationTitleElement) {
        var animationPath = bannerAnimationTitleElement.getAttribute('data-animation-path');
        var bannerAnimationTitle = new HeroBanner(animationPath, bannerAnimationTitleElement);
        bannerAnimationTitle.playAnimation();

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    bannerAnimationTitle.playAnimation();
                } else {
                    bannerAnimationTitle.pauseAnimation();
                }
            });
        });

        observer.observe(bannerAnimationTitleElement);
    }
});
