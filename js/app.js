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

const navigationBlock = document.querySelector("#navbar__list");
const mainContainer = document.querySelector("main");

// add additional sections to main container
addSections(); // functions are defined under Helper Functions
// we first need to append the new sections to the DOM before accsessing them as global variable
const pageBlocks = document.querySelectorAll('*[id^="section"]');

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
        rectangle.top >= -50 &&
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

function createSection(id = 6) {
    const template = `
    <section id="section${id}" data-nav="Section ${id}">
      <div class="landing__container">
        <h2>Section ${id}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>
    </section>
    `;

    return template;
}

function addSections(start = 4, end = 6) {
    for (let i = start; i <= end; i++) {
        mainContainer.insertAdjacentHTML( 'beforeend', createSection(id = i) );
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createNavBarBlock() {
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
        navigationBlock.appendChild(navElement);
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
    evt.preventDefault();

    if((evt.target.nodeName === 'LI')) {
        const pageBlockId = evt.target.getAttribute("data-identifier");
        const pageBlock = document.getElementById(pageBlockId);

        pageBlock.scrollIntoView({behavior: "smooth"});
    }
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu and append sections

createNavBarBlock();

// Scroll to section on link click

navigationBlock.addEventListener('click', (event) => {
    scrollPageBlock(event);
});

// Set sections as active

document.addEventListener('scroll', () => {
    setPageBlockActive();
});