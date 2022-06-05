document.querySelector('.btn').addEventListener('click', measureHeight);
function measureHeight() {
let height = prompt('xin chào đây là chương trình đo chiều cao bằng công nghệ lượng tử cho độ chính xác đến hàng nghìn mét. Xin mời nhập chiều cao của bạn (đơn vị cm)');
alert('Chiều cao của bạn là: ' + height + 'cm.');
}