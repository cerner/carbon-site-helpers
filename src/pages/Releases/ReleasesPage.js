import React, { useState } from "react";
import PropTypes from "prop-types";
import marked from "marked";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles/index";
import DOMPurify from "dompurify";
import classNames from "classnames";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useReleases from "../../hooks/useReleases";
import Header from "../../components/Header/Header";
import CONSTANTS from "../../helpers/constants";
import { isLatestRelease } from "../../helpers/releasesInfo";

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 9
    },
    cardHolder: {
        border: "none",
        paddingBottom: "1rem"
    },
    latestRelease: {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#9ccc65",
        backgroundColor: "#f1f8e9"
    }
});

const ReleasesPage = props => {
    const { classes, gitHubURL } = props;
    const versions = useReleases(gitHubURL);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    function getMarkdownText(body) {
        const rawMarkup = marked(DOMPurify.sanitize(body));
        return { __html: rawMarkup };
    }

    const getReleaseDetails = version => {
        return (
            <div
                key={version.id}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={getMarkdownText(version.body)}
            />
        );
    };

    const handlePageChange = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (!versions.length) {
        return "";
    }

    return (
        <MuiThemeProvider theme={CONSTANTS.THEME()}>
            <Paper>
                <Header withNav={false} gitHubURL={gitHubURL} />
                <React.Fragment>
                    <Table className={classes.container}>
                        <TableBody>
                            {versions
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(v => (
                                    <TableRow key={v.id}>
                                        <TableCell
                                            className={classes.cardHolder}
                                        >
                                            <Card
                                                raised={isLatestRelease(
                                                    versions,
                                                    v
                                                )}
                                                className={classNames({
                                                    [classes.latestRelease]: isLatestRelease(
                                                        versions,
                                                        v
                                                    )
                                                })}
                                            >
                                                <CardContent>
                                                    {getReleaseDetails(v)}
                                                </CardContent>
                                            </Card>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[rowsPerPage, 10, 25]}
                                    count={versions.length}
                                    onChangePage={handlePageChange}
                                    onChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </React.Fragment>
            </Paper>
        </MuiThemeProvider>
    );
};

ReleasesPage.propTypes = {
    gitHubURL: PropTypes.string.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles, { withTheme: true })(ReleasesPage);
