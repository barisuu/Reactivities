import {useEffect, useState} from 'react'
import {Container, createTheme, CssBaseline, List, ListItem, ListItemText, ThemeProvider} from "@mui/material";
import axios from "axios";
import NavBar from './NavBar';

const theme = createTheme({
    palette: {
        background: {
            default: "#242424",
        },
        text:{
            primary: 'rgba(255, 255, 255, 0.87)',
        },
    },
});

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then(response => setActivities(response.data))
    }, [])
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavBar/>
                <Container maxWidth="xl" sx={{mt:3}}>
                    <List>
                        {activities.map(activity => (
                            <ListItem key={activity.id}>
                                <ListItemText>{activity.title}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default App
