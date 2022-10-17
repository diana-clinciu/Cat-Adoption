const burgir = document.getElementsByClassName('burgir')[0];
const navContent = document.getElementsByClassName('nav-content')[0];

burgir.addEventListener('click', () => {
    navContent.classList.toggle('active')
});


function changeTime() {
    const p = document.getElementById('clock');
    const date = new Date();
    p.innerHTML = date.toLocaleTimeString();
}

interval = setInterval(changeTime, 1000);

function randomBgImage() {
    const imageArray = ['../images/herocat1.jpg', '../images/herocat2.jpg', '../images/herocat3.jpg', '../images/herocat4.jpg', '../images/herocat5.jpg', '../images/herocat6.jpg'];
    randIndex = Math.floor(Math.random() * (imageArray.length));
    return imageArray[randIndex];
}

const hero = document.getElementsByClassName('hero-image')[0];
hero.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + randomBgImage() + "')";