import { v4 as uuidv4 } from 'uuid';

export function slider(options) {
    let imgArray = options.images || [];
    let parent = options.parent;
    const containerDots = options.containerDots;
    const nextBtn = options.nextBtn;
    const prevBtn = options.prevBtn
    let count=0;
    let width;
    let images;
    let dots;
    const sensitivity = 20; //Number of pixels after which the gesture will be considered as a swap
    let touchStart; //Dot start touch
    let touchPosition;//Current touch position

    function init() {
            createSlide();
            width = document.querySelector('.slider').offsetWidth;
            images = document.querySelectorAll('img');
            parent.style.width = width * images.length + 'px';
            images.forEach(item => {
                item.style.width = width + 'px';
                item.style.height = 'auto';
            });
            rollSlider();
        }

        init();
        
        function rollSlider() {
            parent.style.transform = 'translate(-' + count * width + 'px)';
        }

        function createSlide(){
            if(!imgArray) return
            imgArray.forEach((image,i)=>{
                let img = document.createElement('img');
                img.id = uuidv4();
                img.src = image.path;
                parent.append(img);
            })
        }
        createDots();

        function createDots(){
            images.forEach((elem, i)=>{
                let dot =  document.createElement('div');
                dot.id = i;
                dot.classList.add('dot');
                containerDots.append(dot);
            })
        }

        containerDots.addEventListener('click', moveToDots);
        dots = document.querySelectorAll('.dot');
        dots[count].classList.add('active');

        function moveToDots(e){    
            dots.forEach(dot=>{
                dot.classList.remove('active');
            })
            if(e.target.classList.contains('dot')){
                e.target.classList.add('active');
                let id = +e.target.id
                parent.style.transform = 'translate(-' + id * width + 'px)';
            }
        }

        function removeClassDots(){
            dots.forEach(dot=>{
                dot.classList.remove('active');
            })
        }

        function dotsClasslistAdd(count){
            dots[count].classList.add('active');
        };

        window.addEventListener('resize',(e)=>{
                    init()
                    window.setTimeout('location.reload()', 200);  
        });

        nextBtn.addEventListener('click', (e)=> {
            removeClassDots()
            count++;
            if (count >= images.length) {
                count = 0;
            };
            dotsClasslistAdd(count);
            rollSlider();
        });

        prevBtn.addEventListener('click',  (e)=> {
            removeClassDots()
            count--;
            if (count < 0) {
                count = images.length - 1;
            };
            dotsClasslistAdd(count);
            rollSlider();
        });

        parent.addEventListener('touchstart',(e)=>{
            touchStart = e.changedTouches[0].clientX;
            touchPosition = touchStart;
        })

        parent.addEventListener('touchmove', (e)=>{
            touchPosition = e.changedTouches[0].clientX;
        })

        parent.addEventListener('touchend', (e)=>{
            let distance = touchStart - touchPosition;
            if(Math.abs(distance)>sensitivity){
                if(distance > 0){
                       removeClassDots();
                       count++;
                    if (count >= images.length) {
                        count = 0;
                     }
                      dotsClasslistAdd(count);
                      rollSlider();
                 }
                else {
                    removeClassDots();
                    count--;
                    if (count < 0) {
                        count = images.length - 1;
                    }
                     dotsClasslistAdd(count)
                     rollSlider();
                }
            }
             touchStart = null;
             touchPosition = null;
        })      
}