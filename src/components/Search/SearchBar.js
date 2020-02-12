import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles/index";
import SearchIcon from "@material-ui/icons/SearchRounded";
import Downshift from "downshift";
import PropTypes from "prop-types";
import React, { useState } from "react";
import constants from "../../helpers/constants";
import { flatten } from "../../helpers/pageHelpers";
import { getFilteredSuggestions } from "../../helpers/searchHelpers";
import SearchItem from "./SearchItem";

const styles = (theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        },
        [theme.breakpoints.only("xs")]: {
            display: "none"
        }
    },
    searchIcon: {
        width: theme.spacing(5),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit",
        width: "100%"
    },
    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 275
        }
    },
    container: {
        position: "relative"
    }
});

function SearchBar(props) {
    const { className, classes, pages, isHome, withNav } = props;
    const handleKeyDown = (e) => {
        e.preventDownshiftDefault =
            e.target.keyCode === 13 || e.key === "Enter";
    };
    const [anchor, setAnchor] = useState(null);
    const [anchorWidth, setAnchorWidth] = useState(0);
    return (
        <Box className={className}>
            {!isHome && withNav ? (
                <Downshift id="downshift-popper">
                    {({
                        getInputProps,
                        getItemProps,
                        getMenuProps,
                        highlightedIndex,
                        inputValue,
                        isOpen
                    }) => (
                        <div
                            className={classes.container}
                            title="Search"
                            role="textbox"
                        >
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <Input
                                    inputProps={getInputProps({
                                        onKeyDown: handleKeyDown,
                                        placeholder:
                                            constants.SEARCH_PLACEHOLDER
                                    })}
                                    disableUnderline
                                    inputRef={(node) => {
                                        if (!node) {
                                            return;
                                        }
                                        setAnchor(node);
                                        setAnchorWidth(node.clientWidth);
                                    }}
                                    type="search"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput
                                    }}
                                />
                            </div>
                            <Popper
                                keepMounted
                                disablePortal
                                open={isOpen}
                                anchorEl={anchor}
                            >
                                <div
                                    {...(isOpen
                                        ? getMenuProps(
                                              {},
                                              { suppressRefError: true }
                                          )
                                        : {})}
                                >
                                    <Paper
                                        elevation={10}
                                        style={{
                                            width: anchorWidth
                                        }}
                                    >
                                        {getFilteredSuggestions(
                                            flatten(pages),
                                            inputValue
                                        ).map((suggestion, index) => (
                                            <SearchItem
                                                suggestion={suggestion}
                                                key={suggestion.pathname}
                                                index={index}
                                                itemProps={getItemProps({
                                                    item: suggestion.pathname
                                                })}
                                                highlightedIndex={
                                                    highlightedIndex
                                                }
                                            />
                                        ))}
                                    </Paper>
                                </div>
                            </Popper>
                        </div>
                    )}
                </Downshift>
            ) : (
                ""
            )}
        </Box>
    );
}

SearchBar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    pages: PropTypes.arrayOf(PropTypes.object),
    isHome: PropTypes.bool,
    withNav: PropTypes.bool
};

SearchBar.defaultProps = {
    className: "",
    pages: [],
    isHome: false,
    withNav: true
};

export default withStyles(styles, { withTheme: true })(SearchBar);
