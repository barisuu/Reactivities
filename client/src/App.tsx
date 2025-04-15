import {useEffect, useState,Fragment} from 'react'
function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    
    useEffect(() => {
        fetch('https://localhost:5001/api/activities').then(response => response.json())
            .then(data => setActivities(data))
    }, [])
    return (
    <>
      <Fragment>
          <h3>Reactivities</h3>
          <ul>
              {activities.map(activity => (
                  <li key={activity.id}>{activity.title}</li>
              ))}
          </ul>
      </Fragment>
    </>
  )
}

export default App
