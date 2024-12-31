function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


}
locoScroll();
let main = document.querySelector("#main");
main.addEventListener("mousemove",(dets)=>{
    gsap.to("#crsr",{
      x:dets.x,
      y:dets.y
    })
})


let tl = gsap.timeline();

tl.from("#loader .head",{
    x:60,
    opacity:0,
    duration:0.8,
    stagger:0.1,  
})
tl.to("#loader .head",{
    x:-40,
    opacity:0,
    stagger:0.1,
    duration:0.6,
})
tl.to("#loader",{
    opacity:0,
    display:"none"
})
tl.from("#nav",{
  opacity:0,
  y:-20
},"anime1")
tl.from(".menu-opener__square",{
  opacity:0,
  y:-20
},"anime1")
tl.from("#page1 h1",{
  y:40,
  opacity:0,
},"anime1")
tl.from("#page1 h2",{
  y:40,
  opacity:0,
},"anime1")

let menubox = document.querySelector(".menubox");
let menuOpen = document.querySelector(".menu-opener__square");

function toggleMenu(){
  menubox.classList.toggle("open-menu")
  let tl2 = gsap.timeline();
  tl2.fromTo(".menubox h1",{
   y:100,opacity:0},
  {y:0,opacity:1,stagger:0.1,duration:0.4})
}

menuOpen.addEventListener("click",toggleMenu);

let Path = `M 10 100 Q 700 100 1390 100`;
let finalPath = `M 10 100 Q 700 100 1390 100`;
let string = document.querySelector("#string");
let string2 = document.querySelector("#string2");

string.addEventListener("mousemove",(dets)=>{
   Path = `M 10 100 Q ${dets.x} ${dets.y} 1390 100`;
   gsap.to("#string svg Path",{
    attr:{d:Path},
    // duration:0.3,
    ease:"Power3.out"
   })
})
string.addEventListener("mouseleave",(dets)=>{
  gsap.to("#string svg Path",{
   attr:{d:finalPath},
   duration:1.2,
   ease: "elastic.out(1,0.1)"
  })
})



string2.addEventListener("mousemove",(dets)=>{
  Path = `M 10 100 Q ${dets.x} ${dets.y} 1390 100`;
  gsap.to("#string2 svg Path",{
   attr:{d:Path},
   // duration:0.3,
   ease:"Power3.out"
  })
})
string2.addEventListener("mouseleave",(dets)=>{
 gsap.to("#string2 svg Path",{
  attr:{d:finalPath},
  duration:1.2,
  ease: "elastic.out(1,0.1)"
 })
})
