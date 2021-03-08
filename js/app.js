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

/* function adapted from https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/#:~:text=Demo-,Summary,in%20the%20viewport%20or%20not */
function elementInViewport (elem) {
    const boundingBox = elem.getBoundingClientRect();
    return (
        boundingBox.top >= -5 &&
        boundingBox.top <= 500 &&
        boundingBox.left >= 0
    );
};

function addNavActiveState(section) {
    const id = section.id;
    const navElem = document.querySelector('[data-id="' + id + '"]')
    
    navElem.classList.add("active");
}

function removeNavActiveState(section) {
    const id = section.id;
    const navElem = document.querySelector('[data-id="' + id + '"]')
    
    navElem.classList.remove("active");
}

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
        navElement.setAttribute("data-id", section.id);
        if (section.classList.contains("your-active-class")) {
            navElement.classList.add("active");
        }
        navigationBar.appendChild(navElement);
    }
}

// Add class 'active' to section when near top of viewport

function setSectionActive() {
    for(section of sections) {
        if(elementInViewport(section)) {
            section.classList.add("your-active-class");
            addNavActiveState(section);
        } else {
            section.classList.remove("your-active-class");
            removeNavActiveState(section);
        }
    }
}

// Scroll to anchor ID using scrollTO event

function scrollToElement (evt) {
    if((evt.target.nodeName === 'LI')) {
        const sectionId = evt.target.getAttribute("data-id");
        const section = document.getElementById(sectionId);

        section.scrollIntoView({block: "end", behavior: "smooth"});
    }
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

buildNavigation();

// Scroll to section on link click

navigationBar.addEventListener('click', function(event) {
    scrollToElement(event);
});

// Set sections as active

document.addEventListener('scroll', function () {
    setSectionActive()
});