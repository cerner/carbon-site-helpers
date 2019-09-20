import renderSiteApp from "../src/App";
import "./index.less";

const appContent = (id, value) => {
    document.querySelector(`#${id}`).innerHTML = value;
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
                    content: id => {
                        appContent(id, "content/folder-1/file-1");
                    },
                    getCodeContent: () => appContent.toString()
                },
                {
                    pathname: "/folder-1/file-2",
                    content: id => {
                        appContent(id, "content/folder-1/file-2");
                    }
                },
                {
                    pathname: "/folder-1/nested-folder",
                    children: [
                        {
                            pathname: "/folder-1/nested-folder/nested-file",
                            content: id => {
                                appContent(
                                    id,
                                    "content/folder-1/nested-folder/nested-file"
                                );
                            }
                        },
                        {
                            pathname: "/folder-1/nested-folder/nested-file-2",
                            content: id => {
                                appContent(
                                    id,
                                    "content/folder-1/nested-folder/nested-file-2"
                                );
                            }
                        },
                        {
                            pathname:
                                "/folder-1/nested-folder/nested-file-long-name-to-work-with",
                            content: id => {
                                appContent(
                                    id,
                                    "content/folder-1/nested-folder/nested-file-long-name-to-work-with"
                                );
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
                    content: id => {
                        appContent(id, "content/folder-2/file-1");
                    }
                },
                {
                    pathname: "/folder-2/file-2",
                    content: id => {
                        appContent(id, "content/folder-2/file-2");
                    }
                }
            ]
        },
        {
            pathname: "/folder-leaf",
            content: id => {
                appContent(id, "content/folder-leaf");
            }
        }
    ],
    {
        gettingStartedLink: "#/folder-1/file-1",
        gitHubRepo: "https://github.com/cerner/carbon-site-helpers"
    }
);
