const ele = document.querySelector(':root');
const cs = getComputedStyle(ele);
console.log('???')
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
