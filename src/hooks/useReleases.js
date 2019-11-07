import { useState, useEffect } from "react";
import {retrieveReleases} from "../helpers/releasesInfo";

const useReleases = (gitHubURL) => {
    const [releases, setReleases] = useState([]);
    useEffect(() => {
        // Retrieve releases only if none present in localStorage
        if (!releases.length) {
            retrieveReleases(gitHubURL).then((response) => {
                setReleases(response);
            });
        }
    }, []);
    return releases;
};

export default useReleases;
