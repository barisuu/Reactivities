import {useEffect, useState} from 'react'
import {Box, Container, CssBaseline, } from "@mui/material";
import axios from "axios";
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [createActivityStatus, setCreateActivityStatus] = useState<boolean>(false);

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then(response => setActivities(response.data))
    }, [])
    
    const handleCreateActivityOn = () => {
        setCreateActivityStatus(true);
    }
    const handleCreateActivityOff = () => {
        setCreateActivityStatus(false);
    }
    
    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(activity => activity.id === id));
    }
    
    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }
    
    return (
        <Box sx={{bgcolor: 'rgb(19,37,90)'}}>
            <CssBaseline/>
            <NavBar 
                createActivityOn={handleCreateActivityOn}
            />
            <Container maxWidth="xl" sx={{mt: 3}}>
                <ActivityDashboard activities={activities} 
                                   selectActivity={handleSelectActivity} 
                                   cancelSelectActivity={handleCancelSelectActivity}
                                   selectedActivity={selectedActivity}
                                   createActivityOff={handleCreateActivityOff}
                                   createActivityStatus={createActivityStatus}
                />
            </Container>
        </Box>
    )
}

export default App
