import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";
import Splitting from "splitting";
import { throttle } from "lodash";

gsap.registerPlugin(ScrollTrigger);

import { preloadImages } from "./imagesloaded.js";

let lenis;
const initSmoothScrolling = () => {
    lenis = new Lenis({
        lerp: 0.15,
        smoothWheel: true,
    });
    lenis.on("scroll", () => ScrollTrigger.update());
    const scrollFn = (time) => {
        lenis.raf(time);
        requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);
};

const segments = () => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
        const segmentLabels = document.querySelectorAll(".segment__label");
        segmentLabels.forEach((segmentLabel) => {
            const words = Splitting({ target: segmentLabel, by: "chars" });
            words.forEach((word) => {
                word.chars.forEach((char) => {
                    const span = document.createElement("span");
                    span.classList.add("segment__label__char");
                    span.appendChild(char);
                    word.words[0].appendChild(span);
                });
            });
        });
    });

    mm.add("(max-width: 1024px)", () => {
        const segmentLabels = document.querySelectorAll(".header__name--section h3");
        segmentLabels.forEach((segmentLabel) => {
            const words = Splitting({ target: segmentLabel, by: "chars" });
            words.forEach((word) => {
                word.chars.forEach((char) => {
                    const span = document.createElement("span");
                    span.classList.add("header__name__char");
                    span.appendChild(char);
                    word.words[0].appendChild(span);
                });
            });
        });
    });
};

const sections = () => {
    let sections = document.querySelectorAll(".section");
    let mm = gsap.matchMedia();
    let timeline = null;
    const photo = document.querySelector(".photo__wrapper > img");
    const photoWidth = 208;
    const photoCount = 7;
    const randomCount = 7;
    const photoPositions = Array.from({ length: photoCount }, (_, i) => i * photoWidth);

    function segmentTransition(fromIndex, toIndex) {
        mm.add("(min-width: 1024px)", () => {
            let toSegmentLabel = document.querySelector(`.segment__label[data-index="${toIndex}"]`);
            let toChars = toSegmentLabel.querySelectorAll(".char");
            let toCharWrappers = toSegmentLabel.querySelectorAll(".segment__label__char");
            let allSegmentLabels = document.querySelectorAll(".segment__label");
            let fromSegmentLabel = document.querySelector(`.segment__label[data-index="${fromIndex}"]`);
            let fromChars = fromSegmentLabel.querySelectorAll(".char");
            let fromCharWrappers = fromSegmentLabel.querySelectorAll(".segment__label__char");

            if (fromIndex != toIndex) {
                timeline = gsap
                    .timeline()
                    .fromTo(
                        fromChars,
                        {
                            yPercent: 0,
                        },
                        {
                            duration: 0.5,
                            ease: "power1.in",
                            yPercent: -100,
                            stagger: {
                                each: 0.03,
                            },
                            onComplete: () => {
                                allSegmentLabels.forEach((segmentLabel) => {
                                    if (segmentLabel !== toSegmentLabel) segmentLabel.classList.remove("segment__label--current");
                                });
                            },
                        }
                    )
                    .fromTo(
                        fromCharWrappers,
                        {
                            yPercent: 0,
                        },
                        {
                            duration: 0.5,
                            ease: "power1.in",
                            yPercent: 100,
                            stagger: {
                                each: 0.03,
                            },
                            onComplete: () => {
                                allSegmentLabels.forEach((segmentLabel) => {
                                    if (segmentLabel !== toSegmentLabel) segmentLabel.classList.remove("segment__label--current");
                                });
                            },
                        },
                        0
                    )
                    .addLabel("currentPanel", ">-=0.2")
                    .fromTo(
                        toChars,
                        {
                            yPercent: 100,
                        },
                        {
                            onStart: () => {
                                toSegmentLabel.classList.add("segment__label--current");
                            },
                            duration: 0.5,
                            ease: "expo",
                            yPercent: 0,
                            stagger: {
                                each: 0.03,
                            },
                        },
                        "currentPanel"
                    )
                    .fromTo(
                        toCharWrappers,
                        {
                            yPercent: -100,
                        },
                        {
                            onStart: () => {
                                toSegmentLabel.classList.add("segment__label--current");
                            },
                            duration: 0.5,
                            ease: "expo",
                            yPercent: 0,
                            stagger: {
                                each: 0.03,
                            },
                        },
                        "currentPanel"
                    )
                    .addLabel("end");
            }

            gsap.to(photo, {
                left: () => {
                    return -photoPositions[toIndex];
                },
                ease: "power3.inOut",
                duration: 1,
            });

            /* let randomOrder = randomizePhotoIndexes(toIndex);
            for (let i = 0; i < randomCount; i++) {
                gsap.to(photo, {
                    left: () => {
                        return -photoPositions[randomOrder[i]];
                    },
                    delay: i * 0.2,
                    duration: 0,
                });
            } */
        });
    }

    function randomizePhotoIndexes(finalIndex) {
        const randomOrder = Array.from({ length: randomCount }, () => Math.floor(Math.random() * photoCount));
        randomOrder.sort(() => Math.random() - 0.5);

        const index = randomOrder.indexOf(finalIndex);
        randomOrder.splice(index, 1);
        randomOrder.push(finalIndex);

        return randomOrder;
    }

    function updateSectionInView(self) {
        sections.forEach((section) => {
            let positionInViewportTop = ScrollTrigger.positionInViewport(section, "top");
            let positionInViewportBottom = ScrollTrigger.positionInViewport(section, "bottom");
            let isInViewport = false;
            isInViewport = positionInViewportTop <= 0 && positionInViewportBottom >= 1;
            if (!isInViewport) {
                isInViewport = positionInViewportTop <= 0.5 && positionInViewportTop > 0;
                if (self.direction === -1) {
                    isInViewport = positionInViewportBottom >= 0.5 && positionInViewportBottom < 1;
                }
            }
            if (!section.classList.contains("section--inview") && isInViewport) {
                let oldSection = document.querySelector(".section--inview");
                let fromIndex = 0;
                if (oldSection) {
                    fromIndex = oldSection.dataset.view;
                }
                let toIndex = section.dataset.view;
                sections.forEach((section) => {
                    section.classList.remove("section--inview");
                });
                section.classList.add("section--inview");
                if (timeline && timeline.isActive()) {
                    timeline.eventCallback("onComplete", () => {
                        segmentTransition(fromIndex, toIndex);
                    });
                } else {
                    segmentTransition(fromIndex, toIndex);
                }
                return;
            }
        });
    }

    ScrollTrigger.create({
        start: -1,
        end: "max",
        onUpdate: throttle(updateSectionInView, 800, {
            leading: true,
            trailing: true,
        }),
    });

    mm.add("(max-width: 1024px)", () => {
        let headerNameSections = document.querySelectorAll(`.header__name--section`);

        headerNameSections.forEach((headerNameSection) => {
            let toChars = headerNameSection.querySelectorAll(".char");
            let toCharWrappers = headerNameSection.querySelectorAll(".header__name__char");
            gsap.timeline({
                scrollTrigger: {
                    trigger: headerNameSection,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play reset play reset",
                },
            })
                .fromTo(
                    toChars,
                    {
                        xPercent: 100,
                    },
                    {
                        duration: 0.5,
                        ease: "expo",
                        xPercent: 0,
                        stagger: {
                            each: 0.03,
                        },
                    },
                    "0.3"
                )
                .fromTo(
                    toCharWrappers,
                    {
                        xPercent: -100,
                    },
                    {
                        duration: 0.5,
                        ease: "expo",
                        xPercent: 0,
                        stagger: {
                            each: 0.03,
                        },
                    },
                    "0.3"
                );
        });
    });
};

const charts = () => {
    const charts = document.querySelectorAll(".skill__chart");
    charts.forEach((chart) => {
        let svg = chart.querySelector("svg");

        let basePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        basePolygon.style.stroke = tailwindConfig.theme.colors.white;
        basePolygon.style.strokeWidth = "0.5";
        basePolygon.style.fill = "none";
        svg.appendChild(basePolygon);
        let levelPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        levelPolygon.style.stroke = tailwindConfig.theme.colors.white;
        levelPolygon.style.strokeWidth = "0.5";
        levelPolygon.style.fill = tailwindConfig.theme.colors.primary;

        svg.appendChild(levelPolygon);

        let baseShape = svg.dataset.baseShape.split("|").map((point) => {
            return point.split(",").map((coord) => parseInt(coord));
        });

        let levelShapePerc = svg.dataset.levelShapePerc.split(",").map((point) => {
            return parseInt(point);
        });

        const middlePoint = baseShape
            .reduce(
                (acc, point) => {
                    acc[0] += point[0];
                    acc[1] += point[1];
                    return acc;
                },
                [0, 0]
            )
            .map((coord) => coord / baseShape.length);

        const levelShape = baseShape.map((point, index) => {
            const percentage = levelShapePerc[index] / 100;
            return [middlePoint[0] + (point[0] - middlePoint[0]) * percentage, middlePoint[1] + (point[1] - middlePoint[1]) * percentage];
        });

        for (let i = 0; i < baseShape.length; i++) {
            var point = svg.createSVGPoint();
            point.x = baseShape[i][0];
            point.y = baseShape[i][1];
            basePolygon.points.appendItem(point);

            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", `M ${middlePoint[0]} ${middlePoint[1]} L ${baseShape[i][0]} ${baseShape[i][1]}`);
            path.style.stroke = tailwindConfig.theme.colors.white;
            path.style.strokeWidth = "0.5";
            path.style.fill = "none";
            svg.appendChild(path);
        }

        for (let i = 0; i < levelShape.length; i++) {
            var point = svg.createSVGPoint();
            point.x = levelShape[i][0];
            point.y = levelShape[i][1];
            levelPolygon.points.appendItem(point);

            const closerPoint = [middlePoint[0] + (levelShape[i][0] - middlePoint[0]) * 0.8, middlePoint[1] + (levelShape[i][1] - middlePoint[1]) * 0.8];

            gsap.to(point, {
                x: closerPoint[0],
                y: closerPoint[1],
                duration: 1,
                repeat: -1,
                yoyo: true,
                delay: i * 0.5,
                ease: "none",
            });
        }
    });
};

const skills = () => {
    const skills = document.querySelectorAll(".skill");

    skills.forEach((skill) => {
        const skillLineDot = skill.querySelector(".skill__line__dot");
        const level = skillLineDot.getAttribute("data-level");

        gsap.to(skillLineDot, {
            scrollTrigger: {
                trigger: skill,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reset play reset",
            },
            left: level + "%",
            duration: 1,
            ease: "power2",
        });
    });

    const skillGrids = document.querySelectorAll(".skill__grid");

    skillGrids.forEach((skillGrid) => {
        const skillGridItemStarColor = skillGrid.querySelectorAll(".skill__grid__item__star[data-color]");

        gsap.to(skillGridItemStarColor, {
            scrollTrigger: {
                trigger: skillGrid,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reset play reset",
            },
            backgroundColor: tailwindConfig.theme.colors.highlight,
            stagger: 0.04,
        });
    });
};

const languages = () => {
    const languages = document.querySelectorAll(".languages");
    const languageSVGs = document.querySelectorAll(".language__circle svg");

    languageSVGs.forEach((svg, i) => {
        let percentage = svg.dataset.percentage;
        let circle = svg.querySelector("circle");
        var dasharray = circle.getTotalLength();
        let offset = dasharray - (dasharray * percentage) / 100;

        gsap.set(circle, {
            strokeDasharray: dasharray,
            strokeDashoffset: dasharray,
        });

        gsap.to(circle, {
            scrollTrigger: {
                trigger: languages,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reset play reset",
            },
            duration: 1,
            strokeDashoffset: offset,
            delay: i * 0.2,
        });
    });
};

const experiences = () => {
    const experienceSection = document.querySelector(".experiences");

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: experienceSection,
            start: "10% bottom",
            toggleActions: "play reset play reset",
        },
    });

    const experiencesLine = document.querySelector(".experiences__line");
    timeline.fromTo(
        experiencesLine,
        {
            bottom: "100%",
        },
        {
            bottom: "0",
            duration: 0.8,
            delay: 0.2,
        }
    );

    const experincesDots = document.querySelectorAll(".experience__dot");
    timeline.fromTo(
        experincesDots,
        {
            borderWidth: 0,
        },
        {
            borderWidth: 5,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.4,
        },
        "0"
    );
};

const tasks = () => {
    const tasks = document.querySelectorAll(".tasks");

    tasks.forEach((task) => {
        const tasksDots = task.querySelectorAll(".tasks__dot");
        gsap.to(tasksDots, {
            scrollTrigger: {
                trigger: task,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reset play reset",
            },
            scale: 1,
            stagger: 0.2,
            delay: 0.1,
        });
    });
};

const passions = () => {
    const passions = document.querySelectorAll(".passion");

    passions.forEach((passion) => {
        const passionIcon = passion.querySelector(".passion__icon");
        gsap.to(passionIcon, {
            scrollTrigger: {
                trigger: passion,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reset play reset",
            },
            translateX: 0,
            backgroundColor: tailwindConfig.theme.colors.highlight,
            rotate: 0,
            duration: 0.8,
        });
    });
};

const works = () => {
    const workPreviewTilt = document.querySelectorAll(".work__preview__tilt");

    VanillaTilt.init(workPreviewTilt, {
        max: 5,
        speed: 800,
    });

    gsap.utils.toArray(".work__preview__image--back").forEach((previewBack, i) => {
        gsap.to(previewBack, {
            scrollTrigger: {
                trigger: previewBack,
                scrub: true,
            },
            y: -80,
            delay: i * 0.5,
        });
    });

    gsap.utils.toArray(".work__preview__image--front").forEach((previewFront, i) => {
        gsap.to(previewFront, {
            scrollTrigger: {
                trigger: previewFront,
                scrub: true,
            },
            y: -50,
            delay: i * 0.6,
        });
    });
};

const highlights = () => {
    const highlights = document.querySelectorAll("em");

    highlights.forEach((highlight, i) => {
        if (highlight.parentElement.tagName.toLowerCase() == "strong") {
            gsap.fromTo(
                highlight,
                {
                    background: `linear-gradient(to right, ${tailwindConfig.theme.colors.highlight} 0%, transparent 0%)`,
                },
                {
                    background: `linear-gradient(to right, ${tailwindConfig.theme.colors.highlight} 100%, transparent 100%)`,
                    duration: 0.5,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: highlight,
                        toggleActions: "play reset play reset",
                    },
                }
            );
        } else {
            gsap.fromTo(
                highlight,
                {
                    background: `linear-gradient(to right, ${tailwindConfig.theme.colors.white} 0%, transparent 0%)`,
                },
                {
                    background: `linear-gradient(to right, ${tailwindConfig.theme.colors.white} 100%, transparent 100%)`,
                    duration: 0.5,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: highlight,
                        toggleActions: "play reset play reset",
                    },
                }
            );
        }
    });
};

preloadImages().then(() => {
    document.body.classList.remove("loading");
    initSmoothScrolling();
    segments();
    sections();
    skills();
    languages();
    charts();
    experiences();
    tasks();
    passions();
    works();
    highlights();
});
