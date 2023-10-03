import { Route, Routes } from 'react-router-dom'
import AllSqueals from './AllSqueals'
import Card from '../Card'
import Settings from '../profile/Settings'
import ModeratorBtn from '../profile/ModeratorBtn'

export default function DestinationRoutes({ user, squeals, isMyUser }) {
  return (
    <Routes>
      <Route
        index
        path={user + `/allsqueals`}
        element={<AllSqueals squeals={squeals} />}
      />
      <Route
        path={user + `/channels`}
        element={'Tommi devi inserire la gestione dei canali privati qui'}
      />
      {isMyUser && (
        <Route
          path={user + `/settings`}
          element={
            <Card>
              <Settings />
            </Card>
          }
        />
      )}
      {isMyUser && (
        <Route index path={user + `/moderator`} element={<ModeratorBtn />} />
      )}
    </Routes>
  )
}
