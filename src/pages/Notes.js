import React, {useEffect, useState} from 'react'
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NoteCard from "../components/NoteCard.js";
import Masonry from "react-masonry-css";

export default function Notes() {
    const[todos, setTodos] = useState([]);

    const handleDelete = async (id) => {
        await fetch("http://localhost:8000/notes/" + id, {
            method: "DELETE",
        })

        const newTodos = todos.filter(el => el.id !== id);
        setTodos(newTodos);
    }

    useEffect(() => {
        fetch("http://localhost:8000/notes")
            .then(res => res.json())
            .then(data => setTodos(data))
    }, []);

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

  return (
    <Container>
        {/*<Grid container spacing={3}>*/}
        <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {
                todos.map
                    ( note =>
                        <div key={note.id}>
                            <NoteCard note={note} handleDelete={handleDelete}></NoteCard>
                        </div>
                        // <Grid key={note.id } item xs={12} md={6} lg={4}>
                        //     <NoteCard handleDelete={handleDelete} note={note}/>
                        // </Grid>

                    )
            }
        </Masonry>
        {/*</Grid>*/}
    </Container>
  )
}
