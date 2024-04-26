import {useEffect, useState} from "react";
import React from 'react';
import {
    Button,
    Container,
    RadioGroup,
    Radio,
    TextField,
    Typography,
    FormControlLabel, FormControl, FormLabel
} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useHistory} from "react-router-dom";

const styles = {
    field: {
        marginTop: "20px",
        marginBottom: "20px",
        display: "block"
    }
}
export default function Edit() {
    const [noteIdToEdit, setNoteIdToEdit] = useState();
    const [noteTitle, setNoteTitle] = useState("");
    const [noteDetails, setNoteDetails] = useState("");
    const [noteTitleError, setNoteTitleError] = useState(false);
    const [noteDetailsError, setNoteDetailsError] = useState(false);
    const [category, setCategory] = useState("todos");
    const history = useHistory();

    useEffect(async () => {
        setNoteIdToEdit(JSON.parse(localStorage.getItem("noteToEditId")));
        console.log(noteIdToEdit)
        const response = await fetch("http://localhost:8000/notes/" +
            JSON.parse(localStorage.getItem("noteToEditId")), {
            method: "GET",
        })

        response.json().then(note => {
            setNoteTitle(note.title);
            setNoteDetails(note.details);
            setCategory(note.category);
        });

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setNoteTitleError(false);
        setNoteDetailsError(false);

        if(noteTitle === '')
            setNoteTitleError(true);
        if(noteDetails === '')
            setNoteDetailsError(true);
        if(noteTitle && noteDetails) {
            fetch("http://localhost:8000/notes/"+noteIdToEdit, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    title: noteTitle,
                    details: noteDetails,
                    category: category
                })
            }).then(() => history.push("/"))
        }
    }

    return (
        <Container>
            <Typography
                variant="h6"
                component="h2"
                gutterBottom
                color="textSecondary"
            >
                Edit the Note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    value={noteTitle}
                    onChange={e => setNoteTitle(e.target.value)}
                    sx={styles.field}
                    variant="outlined"
                    label="Note Title"
                    fullWidth required
                    error={noteTitleError}
                />
                <TextField
                    value={noteDetails}
                    onChange={e => setNoteDetails(e.target.value)}
                    sx={styles.field}
                    variant="outlined"
                    label="Details"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={noteDetailsError}
                />

                <FormControl sx={styles.field}>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup
                        value={category}
                        onChange={event => setCategory(event.target.value)}>
                        <FormControlLabel value="money"  control={<Radio/>} label="Money"/>
                        <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
                        <FormControlLabel value="reminders"  control={<Radio/>} label="Reminders"/>
                        <FormControlLabel value="work"  control={<Radio/>} label="Work"/>
                    </RadioGroup>
                </FormControl>


                <Button
                    type="submit"
                    variant="contained"
                    //onClick={() => console.log("You clicked me!")}
                    endIcon={<KeyboardArrowRightIcon/>}
                >
                    Submit
                </Button>
            </form>

        </Container>
    )
}
