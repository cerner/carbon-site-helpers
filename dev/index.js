/* eslint-disable import/no-extraneous-dependencies */
import "@babel/polyfill";
import renderSiteApp from "../src/App";
import "./index.less";

const appContent = (id, value) => {
    document.querySelector(`#${id}`).innerHTML = `Content from path: ${value}`;
    document
        .querySelector(`#${id}`)
        .setAttribute("style", "padding: 2rem; border: 1px dashed; ");
};
renderSiteApp(
    [
        {
            pathname: "/folder-1",
            children: [
                {
                    pathname: "/folder-1/file-1",
                    title: "File 1",
                    get content() {
                        return (id) => appContent(id, this.pathname);
                    }
                },
                {
                    pathname: "/folder-1/file-2",
                    get content() {
                        return (id) => appContent(id, this.pathname);
                    }
                },
                {
                    pathname: "/folder-1/nested-folder",
                    children: [
                        {
                            pathname: "/folder-1/nested-folder/nested-file",
                            get content() {
                                return (id) => appContent(id, this.pathname);
                            }
                        },
                        {
                            pathname: "/folder-1/nested-folder/nested-file-2",
                            get content() {
                                return (id) => appContent(id, this.pathname);
                            }
                        },
                        {
                            pathname:
                                "/folder-1/nested-folder/nested-file-long-name-to-work-with",
                            get content() {
                                return (id) => appContent(id, this.pathname);
                            }
                        },
                        {
                            pathname: "/folder-1/nested-folder/nested-file-3",
                            get content() {
                                return (id) => appContent(id, this.pathname);
                            }
                        }
                    ]
                }
            ]
        },
        {
            pathname: "/folder-2",
            children: [
                {
                    pathname: "/folder-2/file-1",
                    get content() {
                        return (id) => appContent(id, this.pathname);
                    }
                },
                {
                    pathname: "/folder-2/file-2",
                    get content() {
                        return (id) => appContent(id, this.pathname);
                    }
                }
            ]
        },
        {
            pathname: "/folder-leaf",
            get content() {
                return (id) => appContent(id, this.pathname);
            }
        }
    ],
    {
        gettingStartedLink: "#/folder-1/file-1",
        gitHubRepo: "https://github.com/cerner/carbon-site-helpers"
    }
);
