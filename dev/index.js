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
                    }
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
                            pathname: "/folder-1/nested-folder/nested-file-3",
                            content: id => {
                                appContent(
                                    id,
                                    "content/folder-1/nested-folder/nested-file-3"
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
    "#/folder-1/file-1"
);
