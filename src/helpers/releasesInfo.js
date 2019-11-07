import axios from "axios";
import constants from "./constants";

export const retrieveReleases = gitHubURL =>
    new Promise((resolve, reject) => {
        const repositoryName = gitHubURL.split("github.com")[1];
        const lsReleasesData = localStorage.getItem(constants.LOCAL_STORAGE.RELEASES_DATA) || "";
        const releasesData = lsReleasesData.split(";")[0];
        const lsReleasesTimeStampEntry = lsReleasesData.split(";")[1] || "";

        // Only retrieve releases if timeStamp is within 24hrs
        // Return from localStorage if retrieving release the same day; else make an API call
        if(new Date() < new Date(lsReleasesTimeStampEntry) ) {
            resolve(JSON.parse(releasesData));
            return;
        }

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
                    // Set a expiry date as 24hrs from the creation on the local storage item.
                    const expiryDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
                    localStorage.setItem(constants.LOCAL_STORAGE.GET_RELEASES_ETAG, response.headers.etag.toString());
                    localStorage.setItem(constants.LOCAL_STORAGE.RELEASES_DATA, `${JSON.stringify(response.data)};${expiryDate}`);
                    resolve(response.data);
                } else {
                    localStorage.removeItem(constants.LOCAL_STORAGE.RELEASES_DATA);
                    resolve([]);
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 304) {
                    resolve(JSON.parse(releasesData));
                }
                else {
                    localStorage.removeItem(constants.LOCAL_STORAGE.RELEASES_DATA);
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
