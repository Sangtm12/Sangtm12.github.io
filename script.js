const btn1 = document.querySelector('.hero .btn');
const ele = document.querySelector(':root');
const cs = getComputedStyle(ele);

function random(num) {
    return Math.floor(Math.random()*num + 1);
}
let currentColor = cs.getPropertyValue('--primary');

function change() {
    const randomColor = `rgb(${random(255)},${random(255)},${random(255)})`;
    if (currentColor === ' #e5d91c') {
        ele.style.setProperty('--primary', randomColor)
    } else {
        ele.style.setProperty('--primary',' #e5d91c')
    }
    currentColor = cs.getPropertyValue('--primary');
    //this getPropertyValue thing seems to work only once, so if i dont include the above line, it is always the default yellow color
}

const themeBtn = document.getElementById('theme');
themeBtn.addEventListener('click', change);

/* function changeToWhite() {
    ele.style.setProperty('--primary','red');
    ele.style.setProperty('--lighter','white');
    ele.style.setProperty('--light','lightgrey');
    ele.style.setProperty('--dark','grey');
    ele.style.setProperty('color','black');
    ele.style.setProperty('--metaText','black');
}

function changeToBlack() {
    ele.style.setProperty('--primary','#e5d91c');
    ele.style.setProperty('--lighter','#333438');
    ele.style.setProperty('--light','#2d2e32');
    ele.style.setProperty('--dark','#25262a');
    ele.style.setProperty('--metaText','lightgrey');
    ele.style.setProperty('color','white');
}
 */