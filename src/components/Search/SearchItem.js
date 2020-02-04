import React from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import { getHashedHref } from "../../helpers/pageHelpers";
import { makeSearchTitle } from "../../helpers/searchHelpers";

const useStyles = makeStyles((theme) => ({
    searchItemRoot: {
        color: theme.palette.text.primary,
        flex: 1,
        flexWrap: "wrap",
        whiteSpace: "normal",
        alignItems: "center"
    }
}));

function SearchItem({ suggestion, itemProps, index, highlightedIndex }) {
    const classes = useStyles();
    return (
        <Link underline="none" href={getHashedHref(suggestion.pathname)}>
            <MenuItem
                className={classes.searchItemRoot}
                {...itemProps}
                button
                divider
                title={suggestion.pathname}
                key={suggestion.pathname}
                selected={highlightedIndex === index}
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
