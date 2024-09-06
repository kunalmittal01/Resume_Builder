if(localStorage.getItem('state') == 'loggedIn') {
    window.location.href ='resume.html';
}


let template = document.getElementById('temp-disp');

let images = ['assets/temp1.png', 'assets/temp2.jpg', 'assets/temp3.jpg','assets/temp4.png','assets/temp5.png','assets/template6.jpg','assets/temp7.webp']; 

let img_cnt = 0;
function displayImages() {
   template.src = images[img_cnt % images.length];
   img_cnt++;  
}

setInterval(displayImages, 2500);

let start = document.getElementById('get-started');
let trybtn = document.getElementsByClassName('hero-btn')[0];
let create = document.getElementById('create');
start.addEventListener('click', ()=>{
    window.location.href = 'authrization.html';
});
trybtn.addEventListener('click', ()=>{
    window.location.href = 'authrization.html';
});
create.addEventListener('click', ()=>{
    window.location.href = 'authrization.html';
});

let darkmode = document.getElementsByClassName('dark-mode')[0];
let darkbtn = document.getElementById('dark-btn');
let toggle = false;
if(JSON.parse(localStorage.getItem('darkMode')) == true) {
    darkbtn.classList.add('forward');
    document.body.classList.add('dark-effect');
}
darkmode.addEventListener('click', ()=>{
    if(!toggle) {
        darkbtn.classList.add('forward');
        darkbtn.classList.remove('backward')
        document.body.classList.add('dark-effect');
        toggle = true;
        localStorage.setItem('darkMode', true);
    }
    else {
        darkbtn.classList.add('backward');
        document.body.classList.remove('dark-effect');
        toggle = false;
        localStorage.setItem('darkMode', false);
    }
});