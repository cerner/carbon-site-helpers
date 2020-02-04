import constants from "./constants";
import { makeTitle } from "./pageHelpers";

/**
 * Returns filtered search suggestions based on search string
 * @param {array} suggestions - Pages
 * @param {string} value - search string
 * @returns {Array|*} Filtered suggestions on valid search string or []
 */
const getFilteredSuggestions = (suggestions, value) => {
    const inputValue = value.trim().toLowerCase();
    if (!inputValue) {
        return [];
    }
    return suggestions
        .filter(
            (s) =>
                makeTitle(s.pathname)
                    .toLowerCase()
                    .indexOf(inputValue) > -1
        )
        .slice(0, constants.SEARCH_MAX_RESULTS);
};
/**
 * Creates search title to be shown in the popup in a readable way.
 * Title is used by parsing the pathname
 * "/grid/line/horizontal-grid-hidden" becomes "Grid  >  Line  >  Horizontal Grid Hidden"
 * @param {string} title - Search Result pathname
 */
const makeSearchTitle = (title) =>
    makeTitle(title.substr(1).replace(/\//g, "- > -"));

export { getFilteredSuggestions, makeSearchTitle };
