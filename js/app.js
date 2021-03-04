/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('*[id^="section"]');
const navigationBar = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigation() {
    for (section of sections) {
        const navName = section.getAttribute('data-nav');
        const navElement = document.createElement("li");
        navElement.classList.add("menu__link");
        navElement.innerText = navName;
        navElement.setAttribute("title", "Scroll to " + navName);
        navigationBar.appendChild(navElement);
        console.log("Added " + navName + " to Navigationlist");
    }
}

function removeActiveFromNav(evt) {
    if ((evt.target.nodeName === 'LI')) {
        children = navigationBar.querySelectorAll("li.menu__link");
        for (child of children) {
            child.classList.remove("active");
        }
    }
}

function addActiveOnClick(evt) {
    if (evt.target.nodeName === 'LI') {
        evt.target.classList.add("active");
    }
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

buildNavigation();
navigationBar.addEventListener('click', function(event) {
    removeActiveFromNav(event);
    addActiveOnClick(event);
});

// Scroll to section on link click

// sectionFour.scrollIntoView({block: "start", behavior: "smooth"});

// Set sections as active


