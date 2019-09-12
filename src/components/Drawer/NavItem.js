import Button from "@material-ui/core/Button/index";
import Collapse from "@material-ui/core/Collapse/index";
import Link from "@material-ui/core/Link/index";
import ListItem from "@material-ui/core/ListItem/index";
import { withStyles } from "@material-ui/core/styles/index";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { getHashedHref } from "../../helpers/pageHelpers";
import { RouterContextConsumer } from "../Context/RouterContext";

const styles = theme => ({
    item: {
        display: "block !important",
        paddingTop: "0 !important",
        paddingBottom: "0 !important"
    },
    itemLeaf: {
        color: theme.palette.primary.dark,
        display: "flex",
        paddingTop: "0 !important",
        paddingBottom: "0 !important"
    },
    button: {
        color: theme.palette.primary.dark,
        fontSize: 16,
        letterSpacing: "0.5px",
        justifyContent: "flex-start",
        textTransform: "none",
        width: "100%"
    },
    buttonLeaf: {
        color: theme.palette.primary.dark,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 14,
        justifyContent: "flex-start",
        textTransform: "none",
        width: "100%"
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
    },
    regular: {
        color: theme.palette.primary.dark
    }
});

class NavItem extends React.Component {
    constructor(props) {
        super(props);
        const { openImmediately } = props;
        this.state = {
            open: openImmediately
        };
    }

    componentDidMount() {
        const { openImmediately, classes } = this.props;
        // So we only run this logic once.
        if (!openImmediately) {
            return;
        }

        // Center the selected item in the list container.
        const activeElement = document.querySelector(`.${classes.active}`);
        if (activeElement && activeElement.scrollIntoView) {
            activeElement.scrollIntoView({});
        }
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const {
            children,
            classes,
            depth,
            href,
            onClick,
            openImmediately,
            title,
            ...other
        } = this.props;
        const { open } = this.state;
        const style = {
            paddingLeft: 8 * (3 + 2 * depth)
        };

        if (href) {
            return (
                <RouterContextConsumer>
                    {context => (
                        <ListItem
                            selected={context.pathname === href}
                            className={classes.itemLeaf}
                            disableGutters
                            {...other}
                        >
                            <Button
                                component={React.forwardRef((props, ref) => (
                                    <Link
                                        classes={{
                                            root:
                                                context.pathname === href
                                                    ? classes.active
                                                    : ""
                                        }}
                                        ref={ref}
                                        href={getHashedHref(href)}
                                        {...props}
                                    />
                                ))}
                                className={classNames(
                                    classes.buttonLeaf,
                                    `depth-${depth}`
                                )}
                                disableRipple
                                color="secondary"
                                onClick={onClick}
                                style={style}
                            >
                                {title}
                            </Button>
                        </ListItem>
                    )}
                </RouterContextConsumer>
            );
        }
        return (
            <ListItem className={classes.item} disableGutters {...other}>
                <Button
                    classes={{
                        root: classes.button,
                        label: openImmediately ? "active" : ""
                    }}
                    onClick={this.handleClick}
                    color="primary"
                    style={style}
                >
                    {title}
                </Button>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            </ListItem>
        );
    }
}

NavItem.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    depth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    href: PropTypes.string,
    onClick: PropTypes.func,
    openImmediately: PropTypes.bool
};

NavItem.defaultProps = {
    openImmediately: false,
    children: undefined,
    href: undefined,
    onClick: () => {}
};

export default withStyles(styles, { withTheme: true })(NavItem);
