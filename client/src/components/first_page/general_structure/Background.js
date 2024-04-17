import React, { Component } from 'react';
import './Background.css';

class Background extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.bubbleCord = [];
        this.balls = 225;
        this.speedfactor = 1.5;
        this.lineConnectionRange = 100;
        this.mouse = {
            x:0,
            y:0
        }

        this.curX = 0;
        this.curY = 0;
        this.tgX = 0;
        this.tgY = 0;

        this.interBubbleRef = React.createRef();
        this.isScrolling = false;
        this.isScrollingDown = false;
        this.animationFrame = null;
        this.lastScrollY = 0;
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.c = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initBubbleCord();
        this.draw();
        this.move();
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("scroll", this.handleScroll);

        this.animateOnMouseMove();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("mousemove", this.handleMouseMove);
        cancelAnimationFrame(this.animationFrameMouseMove);
    }

    handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (!this.isScrolling) {
            if (currentScrollY > this.lastScrollY) {
                // Downscroll
                this.isScrolling = true;
                this.isScrollingDown = true;
                this.animate();
            } else {
                // Upscroll
                this.isScrolling = true;
                this.isScrollingDown = false;
                this.animate();
            }
        }
        this.lastScrollY = currentScrollY;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
            cancelAnimationFrame(this.animationFrame);
        }, 200);
    };

    handleMouseMove = (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;

        this.tgX = e.clientX;
        this.tgY = e.clientY;
    };

     move() {
        this.curX += (this.tgX - this.curX) / 20;
        this.curY += (this.tgY - this.curY) / 20;
        this.interBubbleRef.current.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;
        requestAnimationFrame(() => {
            this.move();
        });
    }

    initBubbleCord() {
        // Initialize bubbleCord
        this.bubbleCord = [];
        for (let i = 0; i < this.balls; i++) {
            this.bubbleCord.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius:(Math.floor(Math.random() * 5)),
                dx:(Math.random() - 0.5) * 2 * this.speedfactor,
                dy:(Math.random() - 0.5) * 2 * this.speedfactor,
            });
        }
    }

    draw() {
        const c = this.c;
        c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw bubble
        for (let i = 0; i < this.bubbleCord.length; i++) {
            let bubble = this.bubbleCord[i];
            c.beginPath();
            c.arc(bubble.x, bubble.y, bubble.radius, 30, 0, Math.PI * 2, false);
            c.stroke();
            c.fillStyle = "#fff";
            c.fill();
        }

        // draw connection lines
        c.beginPath();
        for (let i = 0; i < this.bubbleCord.length; i++) {
            let line_1 = this.bubbleCord[i];
            c.moveTo(line_1.x, line_1.y);
            if(this.distance(this.mouse, line_1) < this.lineConnectionRange){
                c.lineTo(this.mouse.x, this.mouse.y);
            }
            for (let k = 0; k < this.bubbleCord.length; k++) {
                let line_2 = this.bubbleCord[k];

                if(this.distance(line_1, line_2) < this.lineConnectionRange) {
                    c.lineTo(line_2.x, line_2.y);
                }
            }
        }
        c.lineWidth = "0.05";
        c.strokeStyle = "#fff";
        c.stroke();
    }


    update(){
        for(let i = 0; i < this.bubbleCord.length; i++){
            let s = this.bubbleCord[i];
            if(s.x < 0 || s.x > this.canvas.width){
                s.dx = -s.dx;
            }
            if(s.y < 0 || s.y > this.canvas.height){
                s.dy = -s.dy;
            }
            s.x += s.dx;
            s.y += s.dy;
        }
    }

    reverseUpdate() {
        for (let i = 0; i < this.bubbleCord.length; i++) {
            let s = this.bubbleCord[i];
            if (s.x < 0 || s.x > this.canvas.width) {
                s.dx = -s.dx;
            }
            if (s.y < 0 || s.y > this.canvas.height) {
                s.dy = -s.dy;
            }
            s.x -= s.dx;
            s.y -= s.dy;
        }
    }

    distance(point1, point2){
        let dx = 0;
        let dy = 0;

        dx = point2.x - point1.x;
        dx = dx * dx;
        dy = point2.y - point1.y;
        dy = dy * dy;

        return Math.sqrt(dx + dy);
    }


    animate = () => {
        this.animationFrame = requestAnimationFrame(this.animate);
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isScrollingDown) {
            this.update();
        } else {
            // Reverse animation
            this.reverseUpdate();
        }
        this.draw();
    };


    animateOnMouseMove = () => {
        this.animationFrameMouseMove = requestAnimationFrame(this.animateOnMouseMove);
        this.draw();
    };


    render() {
        return (
            <div className="background-wrapper">
                <div className="background-DotsAndLines">
                    <canvas ref={this.canvasRef}/>
                </div>
                <div className="gradient-bg">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                    <div className="gradients-container">
                        <div className="g1"></div>
                        <div className="g2"></div>
                        <div className="g3"></div>
                        <div className="g4"></div>
                        <div className="g5"></div>
                        <div className="interactive"  ref={this.interBubbleRef}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Background;
