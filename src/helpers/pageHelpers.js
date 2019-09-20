/**
 * Validates string for Getting Started is provided or not.
 * @param {string} startLink - string to be used as href
 * @throws Add a valid getting started link
 */
const validateStartLink = startLink => {
    if (!startLink || typeof startLink !== "string") {
        throw new Error(`Add a valid getting started link`);
    }
};
/**
 * Validates page object input
 * @param {array} pageObject - Page object containing pathname and content
 * @throws Add a valid path
 * @throws Add a content along with the URL for path
 */
const validatePageObject = pageObject => {
    pageObject.forEach(p => {
        if (!p.pathname) {
            throw new Error(`Add a valid path`);
        }
        if (!p.children && !p.content) {
            throw new Error(
                `Add a content along with the URL for path: ${p.pathname}`
            );
        }
        if (p.children) {
            validatePageObject(p.children);
        }
    });
};
/**
 * Returns the title shown within the nav section
 * @param {string} str - pathname or title
 * @param {string} delimiter - pathname or title delimiter
 * @returns {string} pathname or title properly formatted and capitalized
 */
const makeTitle = (str, delimiter = "-") =>
    str
        .split(delimiter)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
/**
 * Converts page pathname to title or uses title property if available.
 * @param {object} page - Page object
 * @returns {string} Page title shown in Navigation panel
 */
const convertPageToTitle = page => {
    if (page.title) {
        return page.title;
    }
    return makeTitle(page.pathname.replace(/.*\//, ""));
};
/* eslint-disable no-nested-ternary */
/**
 * Recursively scans page object to return a list of property provided or the target object itself
 * @param {object} pages - Page object
 * @param {string} property - Target Property to be scanned and returned
 * @returns {array} List of objects containing property
 */
const getPageProperty = (pages, property) =>
    pages.map(p =>
        p.children
            ? getPageProperty(p.children, property)
            : property
            ? p[property]
            : p
    );
/* eslint-enable no-nested-ternary */
/**
 * Returns matching pathname given the key from page object.
 * path object containing pathname and content that is rendered.
 * @param {array} pages - List of Page Object
 * @param {string} key - pathname
 * @returns {object} path object containing pathname and content.
 */
const getMatchingPage = (pages, key) => {
    let result = {};
    const iter = a => {
        if (a.pathname === key) {
            result = a;
            return true;
        }
        return Array.isArray(a.children) && a.children.some(iter);
    };
    pages.some(iter);
    return result;
};
/**
 * Returns content for a particular page given page object and href key
 * @param {array} pages - list of page objects
 * @param {string} key - href key
 * @return {function} content for the page
 */
const getPageContent = (pages, key) => getMatchingPage(pages, key).content;
/**
 * Returns the source code used to generate a content for a particular page
 * @param {array} pages - list of page objects
 * @param {string} key - href key
 * @return {function} source code for the page
 */
const getPageSource = (pages, key) => {
    const currentPage = getMatchingPage(pages, key);
    if(currentPage.getCodeContent && typeof currentPage.getCodeContent === "function") {
        return getMatchingPage(pages, key).getCodeContent();
    }
    return "No source available";
};
/**
 * Page title for the header and Nav
 * @param {array} pages - list of page objects
 * @param {string} key - href key
 * @return {string} Page title
 */
const getPageTitle = (pages, key) =>
    convertPageToTitle(getMatchingPage(pages, key));
/**
 * Flattens array of page objects based on a given property
 * If property is not provided then pages are flattened based on objects
 * not containing children
 * @param {array} pages - list of page objects
 * @param {string} property - Target Property to be scanned and returned
 * @return {array} list of flattened page object
 */
const flatten = (pages, property) => {
    const result = [].concat(...getPageProperty(pages, property));
    if (!property && result.some(p => Array.isArray(p))) {
        return flatten(result, property);
    }
    return result;
};
/**
 * Returns pathname url as an href
 * @param {string} page - pathname url
 * @return {string} href
 */
const getHashedHref = page => `#${page}`;
/**
 * Constructs unique id based on base64 string encoded path href
 * @param {string} path - href pathname
 * @returns {string} unique id
 */
const makeContentId = path =>
    `carbon_id_${btoa(path)
        .substr(path.length - 1)
        .match(/([0-9aA-zZ])\w+/g)
        .join()}`;
/**
 * @enum {function}
 */
export {
    flatten,
    getHashedHref,
    getPageContent,
    getPageSource,
    getPageTitle,
    convertPageToTitle,
    makeTitle,
    makeContentId,
    validatePageObject,
    validateStartLink
};
