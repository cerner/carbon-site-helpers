import React from "react";
import { withStyles } from "@material-ui/core/styles/index";
import AceEditor from "react-ace";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIconRounded from "@material-ui/icons/ExpandMoreRounded";
import Typography from "@material-ui/core/Typography";
import "brace/theme/twilight";
import "brace/mode/javascript";

const styles = theme => ({
    aceEditor: {
        width: "100% !important",
        position: "relative",
        marginBottom: theme.spacing(1)
    },
    expansionPanelContainer: {
        margin: "1rem 0"
    }
});

function SourceCodeViewer(props) {
    const { classes, code } = props;
    return (
        <Paper className={classes.expansionPanelContainer}>
            <ExpansionPanel
                classes={{
                    square: false
                }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIconRounded/>}>
                    <Typography variant="button" color="secondary">
                        Source
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <AceEditor
                        maxLines={Infinity}
                        className={classes.aceEditor}
                        value={code}
                        name="APP_CONTENT_CODE"
                        mode="javascript"
                        theme="twilight"
                        setOptions={{
                            showLineNumbers: true,
                            showGutter: true
                        }}
                        readOnly
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Paper>
    );
}

SourceCodeViewer.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    code: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(SourceCodeViewer);