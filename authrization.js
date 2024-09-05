let formUp = document.getElementById('form-nav-up');
let formIn = document.getElementById('form-nav-in');
let name = document.getElementById('formname');
let email = document.getElementById('formemail');
let pass = document.getElementById('formpass');
let confirmPass = document.getElementById('formconf');
let formSignin = document.getElementById('form-in');
let formSignbtn = document.getElementById('form-sub');
let terms = document.getElementById('terms');

formSignbtn.addEventListener('click',(e) => {
    e.preventDefault();
    let user = name.value;
    localStorage.setItem('username',user);
    validateUp(name,email,pass,confirmPass);
}); 

if(localStorage.getItem('state') == 'loggedIn') {
    window.location.href ='resume.html';
}

window.onload = ()=>{
    formUp.classList.add('form-btn-design');
}

formIn.addEventListener('click',()=>{
    formSignbtn.style.display = 'none';
    formSignin.style.display = 'block';

    name.style.display = 'none';
    confirmPass.style.display = 'none';
    formIn.classList.add('form-btn-design');
    formUp.classList.remove('form-btn-design');
});

formUp.addEventListener('click', function() {
    formSignbtn.style.display = 'block';
    formSignin.style.display = 'none';
    name.style.display = 'block';
    confirmPass.style.display = 'block';
    formIn.classList.remove('form-btn-design');
    formUp.classList.add('form-btn-design');
});

formSignin.addEventListener('click',()=>{
    let res = validateIn(email,pass);
    if(res == 'success') {
        localStorage.setItem('state','loggedIn');
        setTimeout(()=>{
            window.location.href = 'resume.html';
        },3100);
    }
});

function displayMessage(mssg) {
    let alertBox = document.getElementsByClassName('message-box')[0];
    alertBox.style.display = 'flex';
    alertBox.innerHTML = `<p>${mssg}</p>`
    setTimeout(() => {

        alertBox.style.display = 'none';
    }, 3000);
}

function validateUp(name,email,pass,confirmPass) {
    let res = checkFormFeilds(name.value,email.value,pass.value,confirmPass.value);
    if(res == 'All'|| res == 'valid' || res == 'confirm' ||res == 'terms' || res == 'password') {
        return;
    }
    let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
    if(usersArray.length > 0) {
       for(let obj of usersArray) {
            if(obj.email === email.value) {
                displayMessage('Email already exists');
                name.value = '';
                pass.value = '';
                confirmPass.value = '';
                email.value = ''; 
                return;
            }
        }
    }
    let userObj = {
        name: name.value,
        email: email.value,
        pass: pass.value
    };
    usersArray.push(userObj);
    localStorage.setItem('usersArray', JSON.stringify(usersArray));
    displayMessage('Registered Successfully'); 
    name.value = '';
    pass.value = '';
    confirmPass.value = '';
    email.value = '';    
    }

function checkFormFeilds(name,email,pass,confirmPass) {
    if(name == '' || email == '' || pass == '' || confirmPass == '') {
        displayMessage('All fields are required');
        return 'All';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        displayMessage('Please enter a valid email address.');
        return 'valid';
    }

    if(pass.length < 8 ||!/[A-Z]/.test(pass) ||!/[a-z]/.test(pass) ||!/[0-9]/.test(pass) ||!/\W/.test(pass)) {
        displayMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        return 'password';
    }
    if(pass!= confirmPass) {
        displayMessage('Passwords do not match');
        return 'confirm';
    }
    if(!terms.checked) {
        displayMessage('You must agree to the terms and conditions');
        return 'terms';
    }
}

function validateIn(email,pass) {
    if(!terms.checked) {
        displayMessage('You must agree to the terms and conditions');
        return;
    }
    let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
    if(usersArray.length != 0) {
        for(let obj of usersArray) {
            if(obj.email == email.value && obj.pass == pass.value) {
                displayMessage('Login successful');
                email.value= '';
                pass.value = '';
                return "success";
            }
        }
    }
    displayMessage('Invalid email or password');
}

let body = document.querySelector('.images'), body_cnt = 0;
let bodyImages = ['https://t3.ftcdn.net/jpg/03/70/92/84/240_F_370928450_R6g8c0j5cey86PUXE32W7KMiqIUe1fOI.jpg','https://img.freepik.com/free-photo/workspace-with-office-supplies_140725-23268.jpg?w=740&t=st=1725198530~exp=1725199130~hmac=9b071d9717c0ab8857bb645113ed181eb067ab33d8215b0a6e099ae9733d372b','https://t3.ftcdn.net/jpg/00/21/70/82/360_F_21708280_RFKz4O7ImQluB9FgX2mUYFUNDmlLokX6.jpg','https://static.vecteezy.com/system/resources/previews/031/597/411/large_2x/neon-brilliance-geometric-triangles-in-laser-light-form-stunning-wallpapers-and-backgrounds-vertical-mobile-wallpaper-ai-generated-free-photo.jpg',];

function changeBackground() {
    if(body_cnt >= bodyImages.length) body_cnt = 0;
    body.style.backgroundImage = `url(${bodyImages[body_cnt]})`;
    body_cnt++;
}
setInterval(changeBackground,2500);

document.querySelector('#home').addEventListener('click',()=>{
    window.location.href = 'index.html';
});