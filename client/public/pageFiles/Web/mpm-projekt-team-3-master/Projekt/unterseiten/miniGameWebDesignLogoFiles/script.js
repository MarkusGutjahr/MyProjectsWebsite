gsap.from(".target", {
    duration: 1,
    scale: 0.1,
    opacity: 0,
    rotate: -270,
    y: '-500%',
    ease: 'power1.inOut',
    stagger: 0.1
})

gsap.from(".letter", {
    duration: 2,
    opacity: 0,
    x: '800%',
    ease: 'power4.inOut',
    stagger: 0.1
})

gsap.from('#line', {
    duration: 2,
    opacity: 0,
    y: '100%',
    ease: 'power2.inOut',
})