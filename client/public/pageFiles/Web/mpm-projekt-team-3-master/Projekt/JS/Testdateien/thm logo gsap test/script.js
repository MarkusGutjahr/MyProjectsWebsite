/*
gsap.from('#box1', {duration: 1, y: '-500%',ease: 'bounce' })
gsap.from('#box2', {duration: 1.25, y: '-1000%',ease: 'bounce' })
gsap.from('#box3', {duration: 1.5, y: '-1000%',ease: 'bounce' })
gsap.from('#box4', {duration: 1.75, y: '-1000%',ease: 'bounce' })
gsap.from('#box5', {duration: 2, y: '-1000%',ease: 'bounce' })
gsap.from('#box6', {duration: 2.25, y: '-1000%',ease: 'bounce' })
gsap.from('#box7', {duration: 2.5, y: '-1000%',ease: 'bounce' })
gsap.from('#box8', {duration: 2.75, y: '-1000%',ease: 'bounce' })
gsap.from('#box9', {duration: 3, y: '-1000%',ease: 'bounce' })
gsap.from('#box10', {duration: 3.25, y: '-1000%',ease: 'bounce' })
gsap.from('#box11', {duration: 3.5, y: '-1000%',ease: 'bounce' })
gsap.from('#line', {duration: 3.5, y: '-700%',ease: 'elastic' })

gsap.from('#t', {duration: 2, x: '800%',ease: 'bounce' })
gsap.from('#h', {duration: 2, x: '800%',ease: 'bounce' })
gsap.from('#m', {duration: 2, x: '800%',ease: 'bounce' })
*/
gsap.from(".box", {
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