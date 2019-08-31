import axios from "axios";
import CONSTANTS from "./constants";

export const retrieveReleases = gitHubURL =>
    new Promise((resolve, reject) => {
        const repositoryName = gitHubURL.split("github.com")[1];
        axios
            .get(
                CONSTANTS.GITHUB_API_RELEASE_URL.replace(
                    "{repo_name}",
                    repositoryName
                )
            )
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    resolve([]);
                }
            })
            .catch(err => {
                reject(err);
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
