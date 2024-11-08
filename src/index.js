
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.classList.add("flex-ctr");

const h1 = document.createElement("h1")
h1.innerText = "DOM Manupulation"
mainEl.appendChild(h1)

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)"
topMenuEl.classList.add("flex-around");


//Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%"
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)"
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";


// Menu data structure
var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];


buildmenu(menuLinks)
//var topMenuLinks = topMenuEl.getElementsByTagName('a'); -- another way
var topMenuLinks = topMenuEl.querySelectorAll('a');

topMenuEl.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') return;

  // Remove the active class from all menu items 
  //Array.from(topMenuLinks).forEach(link => link.classList.remove('active'));-- another way
  topMenuLinks.forEach(link => link.classList.remove('active'));

  //Add the active class to the clicked menu item 
  event.target.classList.add('active');

  const clickedLink = menuLinks.find(link => link.text === event.target.textContent);

  if (clickedLink && clickedLink.subLinks) {
    buildSubmenu(clickedLink.subLinks);
    subMenuEl.style.top = '100%';
  }
  else {
    subMenuEl.style.top = '0';
  }

});

function buildmenu(menuLinks) {
  for (let menu of menuLinks) {
    const a = document.createElement("a")
    a.setAttribute("href", menu.href)
    a.textContent = menu.text
    topMenuEl.append(a);
  }
}

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = '';
  subLinks.forEach(link => {
    const a = document.createElement('a');
    a.setAttribute('href', link.href);
    a.textContent = link.text;
    subMenuEl.appendChild(a);
  });
}


subMenuEl.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }

  console.log(event.target.textContent);
  subMenuEl.style.top = '0';
  menuLinks.forEach(link => console.log(link));
  topMenuLinks.forEach(link => link.classList.remove('active'));
  //Array.from(topMenuLinks).forEach(link => link.classList.remove('active'));
  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
  if (event.target.textContent === 'ABOUT') {
    mainEl.innerHTML = '<h1>About</h1>';
  }
});



