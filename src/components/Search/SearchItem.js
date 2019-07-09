import { Link } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import React from "react";
import { getHashedHref } from "../../helpers/pageHelpers";
import { makeSearchTitle } from "../../helpers/searchHelpers";

function SearchItem({ suggestion, itemProps, index, highlightedIndex }) {
    return (
        <Link underline="none" href={getHashedHref(suggestion.pathname)}>
            <MenuItem
                {...itemProps}
                button
                divider
                key={suggestion.pathname}
                component="div"
                selected={highlightedIndex === index}
                alignItems="flex-start"
            >
                {makeSearchTitle(suggestion.pathname)}
            </MenuItem>
        </Link>
    );
}

SearchItem.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.shape({
        id: PropTypes.string
    }).isRequired,
    suggestion: PropTypes.shape({
        label: PropTypes.string,
        pathname: PropTypes.string
    }).isRequired
};

SearchItem.defaultProps = {
    highlightedIndex: 0,
    index: 0
};

export default SearchItem;
