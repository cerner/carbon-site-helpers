import PropTypes from "prop-types";
import React from "react";
import HomePageBlurb from "../../components/Home/HomePageBlurb";
import Header from "../../components/Header/Header";

function HomePage(props) {
    const { startLink } = props;
    return (
        <>
            <Header isHome />
            <HomePageBlurb startLink={startLink} />
        </>
    );
}

HomePage.propTypes = {
    startLink: PropTypes.string.isRequired
};

export default HomePage;
