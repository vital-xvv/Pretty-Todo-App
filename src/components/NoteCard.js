import React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {Avatar, IconButton, Typography} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {amber, deepOrange, green, pink, yellow} from "@mui/material/colors";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if(note.category === "work") {
                return pink[700];
            }
            if(note.category === "todos") {
                return green[700];
            }
            if(note.category === "money") {
                return yellow[700];
            }
            if(note.category === "reminders") {
                return deepOrange[700];
            }
        }
    }
})

const NoteCard = ({note, handleDelete}) => {
    const styles = useStyles(note);
    return (
        <div>
            <Card elevation={2}>
                <CardHeader
                    avatar={<Avatar className={styles.avatar}>{note.category[0].toUpperCase()}</Avatar>}
                action={
                    <IconButton onClick={() => handleDelete(note.id)}>
                        <DeleteOutlined/>
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default NoteCard;