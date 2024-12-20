import './App.css'

//import components
import { PlaceCard } from './components/PlaceCard';

import { useFetchPlacesQuery } from './api/api-slice';

function App() {

  const {data: places, isLoading, isSuccess, isError, error} = useFetchPlacesQuery();

  return (
    <div className="min-h-screen mx-24">
      <div className="gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {
          places && places.map((place) => {
            return (
              <PlaceCard place={place} key={place._id}></PlaceCard>
            )
          })
        }
      </div>

    </div>
  )
}

export default App;
