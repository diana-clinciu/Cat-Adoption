const burgir = document.getElementsByClassName('burgir')[0];
const navContent = document.getElementsByClassName('nav-content')[0];

burgir.addEventListener('click', () => {
    navContent.classList.toggle('active');
})
