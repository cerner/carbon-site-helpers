import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
    aceEditor: {
        width: "100% !important",
        position: "relative",
        marginBottom: theme.spacing(1)
    },
    expansionPanelContainer: {
        margin: "1rem 0"
    }
}));

export default function SourceCodeViewer(props) {
    const { code } = props;
    const classes = useStyles();
    return (
        <Paper className={classes.expansionPanelContainer}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIconRounded />}>
                    <Typography variant="button" color="textPrimary">
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
    code: PropTypes.string.isRequired
};
