import { createMuiTheme } from "@material-ui/core/styles";

/**
 * @enum {object}
 */
export default {
    GITHUB_API_RELEASE_URL: "https://api.github.com/repos{repo_name}/releases",
    GITHUB_REPO_TOOLTIP: "GitHub Repository",
    GITHUB_SITE: "github.com",
    HEADER_MAIN_TITLE: "Carbon",
    HEADER_ROOT_LINK: "#",
    NOTFOUND_PRIMARY_TITLE: "404",
    GETTING_STARTED: "Get Started",
    NOTFOUND_SECONDARY_TITLE: "Page Not Found",
    PATHNAME_PROPERTY: "pathname",
    SEARCH_PLACEHOLDER: "Search",
    SEARCH_MAX_RESULTS: 10,
    DRAWER_WIDTH: 275,
    THEME: () =>
        createMuiTheme({
            palette: {
                primary: {
                    main: "#01579b"
                },
                secondary: {
                    main: "#6a1b9a"
                }
            },
            typography: {
                fontFamily: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"'
                ].join(",")
            }
        }),
    VERSIONS_PATH: "versions",
    LOCAL_STORAGE: {
        GET_RELEASES_ETAG: "getReleasesETAG",
        RELEASES_DATA: "releasesData",
    }
};
