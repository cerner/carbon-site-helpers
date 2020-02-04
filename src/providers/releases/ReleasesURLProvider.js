import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { childrenPropType } from "../../helpers/propTypesHelper";

const ReleasesURLContext = createContext();

const useReleasesURL = () => {
    const context = useContext(ReleasesURLContext);
    if (context === undefined) {
        throw new Error(
            "useReleasesURL must be used within ReleasesURLProvider"
        );
    }
    return context;
};

const ReleasesURLProvider = ({ children, gitHubURL }) => {
    const [url, setURL] = useState(gitHubURL);
    const value = React.useMemo(() => [url, setURL], [url]);
    return (
        <ReleasesURLContext.Provider value={value}>
            {children}
        </ReleasesURLContext.Provider>
    );
};

ReleasesURLProvider.propTypes = {
    children: childrenPropType.isRequired,
    gitHubURL: PropTypes.string
};

ReleasesURLProvider.defaultProps = {
    gitHubURL: ""
};

export { ReleasesURLProvider, useReleasesURL };
