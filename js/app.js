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

const pageBlocks = document.querySelectorAll('*[id^="section"]');
const navigationBarList = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* function adapted from https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/#:~:text=Demo-,Summary,in%20the%20viewport%20or%20not */
function elementVisible (elem) {
    /*
    function identivies if the given output is visible in viewport
    it returns a boolean 
    */
    const rectangle = elem.getBoundingClientRect();
    return (
        rectangle.top >= -5 &&
        rectangle.top <= 500 &&
        rectangle.left >= 0
    );
};

function addNavActiveState(pageBlock) {
    /*
    based on the given section the function adds the class active to the navigation bar
    no return value
    */
    const id = pageBlock.id;
    const navElem = document.querySelector('[data-identifier="' + id + '"]')
    
    navElem.classList.add("active");
}

function removeNavActiveState(pageBlock) {
    /*
    based on the given section the function removes the class active to the navigation bar
    no return value
    */
    const id = pageBlock.id;
    const navElem = document.querySelector('[data-identifier="' + id + '"]')
    
    navElem.classList.remove("active");
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createNavBar() {
    /*
    the function identifies all sections present in index.html and builds a navigation menu based on those sections
    */
    for (pageBlock of pageBlocks) {
        const navName = pageBlock.getAttribute('data-nav');
        const navElement = document.createElement("li");
        navElement.classList.add("menu__link");
        navElement.innerText = navName;
        navElement.setAttribute("title", "Scroll to " + navName);
        navElement.setAttribute("data-identifier", pageBlock.id);
        if (pageBlock.classList.contains("your-active-class")) {
            navElement.classList.add("active");
        }
        navigationBarList.appendChild(navElement);
    }
}

// Add class 'active' to section when near top of viewport

function setPageBlockActive() {
    /*
    function iterates over all sections in index.html, identifies if the given section is in viewport and adds active css to the navigation bar and the section itself
    no return value
    */
    for(pageBlock of pageBlocks) {
        if(elementVisible(pageBlock)) {
            pageBlock.classList.add("your-active-class");
            addNavActiveState(pageBlock);
        } else {
            pageBlock.classList.remove("your-active-class");
            removeNavActiveState(pageBlock);
        }
    }
}

// Scroll to anchor ID using scrollTO event

function scrollPageBlock (evt) {
    /*
    if a section is clicked in the navigationbar the function scrolls the viewport to the clicked section
    */
    if((evt.target.nodeName === 'LI')) {
        const pageBlockId = evt.target.getAttribute("data-identifier");
        const pageBlock = document.getElementById(pageBlockId);

        pageBlock.scrollIntoView({block: "end", behavior: "smooth"});
    }
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

createNavBar();

// Scroll to section on link click

navigationBarList.addEventListener('click', function(event) {
    scrollPageBlock(event);
});

// Set sections as active

document.addEventListener('scroll', function () {
    setPageBlockActive()
});