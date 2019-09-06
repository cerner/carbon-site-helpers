import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles/index";
import SearchIcon from "@material-ui/icons/Search";
import Downshift from "downshift";
import PropTypes from "prop-types";
import React from "react";
import CONSTANTS from "../../helpers/constants";
import { flatten } from "../../helpers/pageHelpers";
import { getFilteredSuggestions } from "../../helpers/searchHelpers";
import SearchItem from "./SearchItem";

let popperNode = null;

const styles = theme => ({
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
    },
    paperPopper: {
        marginTop: theme.spacing(2.5),
        marginLeft: theme.spacing(4)
    }
});

function SearchBar(props) {
    const { classes, pages, isHome, withNav } = props;
    const handleKeyDown = e => {
        e.preventDownshiftDefault =
            e.target.keyCode === 13 || e.key === "Enter";
    };
    return (
        <>
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
                        <div className={classes.container}>
                            {
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <Input
                                        inputProps={getInputProps({
                                            onKeyDown: handleKeyDown,
                                            placeholder:
                                                CONSTANTS.SEARCH_PLACEHOLDER
                                        })}
                                        disableUnderline
                                        inputRef={node => {
                                            popperNode = node;
                                        }}
                                        type="search"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput
                                        }}
                                    />
                                </div>
                            }
                            <Popper open={isOpen} anchorEl={popperNode}>
                                <div
                                    {...(isOpen
                                        ? getMenuProps(
                                              {},
                                              { suppressRefError: true }
                                          )
                                        : {})}
                                >
                                    <Paper
                                        elevation={2}
                                        className={classes.paperPopper}
                                        style={{
                                            width: popperNode
                                                ? popperNode.clientWidth
                                                : null
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
        </>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    pages: PropTypes.arrayOf(PropTypes.object),
    isHome: PropTypes.bool,
    withNav: PropTypes.bool
};

SearchBar.defaultProps = {
    pages: [],
    isHome: false,
    withNav: true
};

export default withStyles(styles, { withTheme: true })(SearchBar);
