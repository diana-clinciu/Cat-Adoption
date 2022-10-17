const burgir = document.getElementsByClassName('burgir')[0]
const navContent = document.getElementsByClassName('nav-content')[0]

burgir.addEventListener('click', () => {
    navContent.classList.toggle('active')
})


var x = document.getElementById('logIn')
var y = document.getElementById('register')
var z = document.getElementById('btn')

function signup() {
    x.style.left = '-400px';
    y.style.left = '50px';
    z.style.left = '130px';
}

function login() {
    x.style.left = '50px';
    y.style.left = '450px';
    z.style.left = '0px';
}


document.addEventListener('keydown', e => {
    const cookie = document.getElementById('cookie');
    const cookieStyles = window.getComputedStyle(cookie);
    const cookieBottom = parseInt(cookieStyles.getPropertyValue('bottom'));
    const cookieRight = parseInt(cookieStyles.getPropertyValue('right'));

    switch (e.code) {
        case 'KeyW':
            cookie.style.bottom = String(cookieBottom + 10) + 'px';
            break;
        case 'KeyA':
            cookie.style.right = String(cookieRight + 10) + 'px';
            break;
        case 'KeyS':
            cookie.style.bottom = String(cookieBottom - 10) + 'px';
            break;
        case 'KeyD':
            cookie.style.right = String(cookieRight - 10) + 'px';
            break;
    }

    if (cookieRight < 130 && cookieRight > 0 && cookieBottom < 70 && cookieBottom > -5)
        document.getElementById('thx-txtbbl').style.display = 'block';
    else
        document.getElementById('thx-txtbbl').style.display = 'none';
});




