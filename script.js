const btn1 = document.querySelector('.hero .btn');
const ele = document.querySelector(':root');
const cs = getComputedStyle(ele);


function change() {
    if (cs.getPropertyValue('--primary') === '#e5d91c') {
        changeToWhite();
    } else {
        changeToBlack();
    }
}

function changeToWhite() {
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
