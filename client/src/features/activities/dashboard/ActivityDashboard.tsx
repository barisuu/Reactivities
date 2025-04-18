import {Grid} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    selectedActivity: Activity | undefined
    createActivityOff: () => void
    createActivityStatus: boolean
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, createActivityOff, createActivityStatus}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                />
            </Grid>
            <Grid size={5}>
                {selectedActivity && <ActivityDetail 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity} 
                />}
                {createActivityStatus && <ActivityForm createActivityOff={createActivityOff} />}
            </Grid>
        </Grid>
    )
}
