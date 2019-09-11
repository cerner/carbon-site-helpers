import axios from "axios";
import constants from "./constants";

export const retrieveReleases = gitHubURL =>
    new Promise((resolve, reject) => {
        const repositoryName = gitHubURL.split("github.com")[1];
        axios
            .get(
                constants.GITHUB_API_RELEASE_URL.replace(
                    "{repo_name}",
                    repositoryName
                ),
                {
                    headers: {
                        "If-None-Match": localStorage.getItem(constants.LOCAL_STORAGE.GET_RELEASES_ETAG) || ""
                    }
                }
            )
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem(constants.LOCAL_STORAGE.GET_RELEASES_ETAG, response.headers.etag.toString());
                    localStorage.setItem(constants.LOCAL_STORAGE.RELEASES_DATA, JSON.stringify(response.data));
                    resolve(response.data);
                } else {
                    resolve([]);
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 304) {
                    resolve(JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE.RELEASES_DATA)));
                }
                else {
                    reject(err);
                }
            });
    });

export const getLatestRelease = releases => {
    const latestRelease = releases.find(
        release => !release.prerelease && !release.draft
    );
    return latestRelease.tag_name;
};

export const isLatestRelease = (versions, targetRelease) =>
    getLatestRelease(versions) === targetRelease.tag_name;
