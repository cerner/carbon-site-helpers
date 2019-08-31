import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles/index";
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
            marginLeft: theme.spacing.unit,
            width: "auto"
        },
        [theme.breakpoints.only("xs")]: {
            display: "none"
        }
    },
    searchIcon: {
        width: theme.spacing.unit * 5,
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
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
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
    const { classes, pages, isHome, withNav } = props;
    const handleKeyDown = e => {
        e.preventDownshiftDefault =
            e.target.keyCode === 13 || e.key === "Enter";
    };
    return (
        <MuiThemeProvider theme={CONSTANTS.THEME()}>
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
                                        square
                                        style={{
                                            marginTop: 15,
                                            marginLeft: 35,
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
        </MuiThemeProvider>
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
