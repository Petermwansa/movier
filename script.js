const toggle = document.getElementById('toggleTheme');
const body = document.querySelector('body');
const headings = document.querySelectorAll('h1, h2, h3, p');
const navigation = document.getElementById('navigation');
const nav_item = document.getElementById('nav_item');

toggle.addEventListener('click', function() {
    this.classList.toggle('fa-moon');
    if (toggleTheme.classList.contains('fa-moon')) {
        body.style.background = 'white';
        toggle.style.color = "#040000";
        // navigation.style.background = "#040000";
        headings.forEach(e => e.style.color="black");
    } else {
        body.style.background = 'black';
        toggle.style.color = "white";
        headings.forEach(e => e.style.color="white");
        toggle.style.color = "white";



    }
})