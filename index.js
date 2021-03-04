import {slider} from './slider.js'
import img1 from './images/111.jpg'
import img2 from './images/112.jpg'
import img3 from './images/113.jpg'
import img4 from './images/114.jpg'
import img5 from './images/115.jpg'


slider({
    parent: document.querySelector('.slider-line'),
    containerDots: document.querySelector('.container-dots'),
    nextBtn: document.querySelector('.slider-next'),
    prevBtn: document.querySelector('.slider-prev'),
    images:[
        {path:img1},
        {path:img2},
        {path:img3},
        {path:img4},
        {path:img5},
    ]
})