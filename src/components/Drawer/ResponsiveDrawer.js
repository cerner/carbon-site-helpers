import CssBaseline from "@material-ui/core/CssBaseline/index";
import Divider from "@material-ui/core/Divider/index";
import Drawer from "@material-ui/core/Drawer/index";
import Hidden from "@material-ui/core/Hidden/index";
import { withStyles } from "@material-ui/core/styles/index";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../helpers/constants";
import renderNavItems from "../../helpers/navItemHelpers";
import {
    getPageContent,
    getPageTitle,
    makeContentId
} from "../../helpers/pageHelpers";
import { RouterContextConsumer } from "../Context/RouterContext";
import Header from "../Header/Header";
import ToolbarIcon from "./ToolbarIcon";
import ContentBreadcrumb from "./ContentBreadcrumb";

const styles = theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: constants.DRAWER_WIDTH,
            flexShrink: 0
        }
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    drawerPaper: {
        backgroundColor: theme.palette.background.paper,
        width: constants.DRAWER_WIDTH
    },
    contentRoot: {
        display: "flex",
        background: theme.palette.background.paper,
        flexDirection: "column",
        height: "100vh",
        paddingTop: theme.spacing(9),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    content: {
        width: `calc(100vw - ${theme.spacing(2)}px)`, // The below width parameters are dependant on the paddingLeft of contentRoot
        [theme.breakpoints.up("sm")]: {
            width: `calc(100vw - ${constants.DRAWER_WIDTH +
                theme.spacing(2)}px)`
        },
        height: `calc(100vh - ${theme.spacing(9)}px)`
    }
});

class ResponsiveDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.graph = null;
        this.contentElement = null;
        this.setElementRef = e => {
            this.contentElement = e;
        };
        this.state = {
            mobileOpen: false
        };
    }

    componentDidMount() {
        this.renderContent();
    }

    componentDidUpdate(prevProps) {
        const { currentPage } = this.props;
        if (prevProps.currentPage !== currentPage) {
            this.destroyContent();
            this.renderContent();
        }
    }

    componentWillUnmount() {
        this.destroyContent();
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    destroyContent() {
        if (this.graph) {
            this.graph.destroy();
        }
    }

    renderContent() {
        const { currentPage, pages } = this.props;
        if (currentPage) {
            this.graph = getPageContent(pages, currentPage.pathname)(
                this.contentElement.id
            );
        }
    }

    render() {
        const { props, state } = this;
        const { classes, pages, currentPage, gitHubURL } = props;
        const { mobileOpen } = state;
        const drawer = (
            <RouterContextConsumer>
                {context => (
                    <div>
                        <ToolbarIcon />
                        <Divider />
                        {renderNavItems({
                            props,
                            pages,
                            activePage: context,
                            depth: 0
                        })}
                    </div>
                )}
            </RouterContextConsumer>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header
                    onMenuClick={this.handleDrawerToggle}
                    title={getPageTitle(pages, currentPage.pathname)}
                    pages={pages}
                    gitHubURL={gitHubURL}
                />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            anchor="left"
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.contentRoot}>
                    <ContentBreadcrumb pathname={currentPage.pathname} />
                    <div
                        className={classes.content}
                        ref={this.setElementRef}
                        id={makeContentId(currentPage.pathname)}
                        key={currentPage.pathname}
                    />
                </main>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentPage: PropTypes.objectOf(PropTypes.string).isRequired,
    gitHubURL: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
