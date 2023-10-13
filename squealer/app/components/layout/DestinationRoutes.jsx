import { Route, Routes } from 'react-router-dom'
import AllSqueals from './AllSqueals'
import Card from '../Card'
import Settings from '../profile/Settings'
import ModeratorBtn from '../profile/ModeratorBtn'
import AddChannel from '../moderators/AddChannel'

export default function DestinationRoutes ({ user, squeals, isMyUser, profile, avatar }) {
  return (
    <Routes>
      <Route
        index
        path={user + `/allsqueals`}
        element={<AllSqueals squeals={squeals} profile={profile} avatar={avatar} />}
      />
      <Route path={user + `/channels`} element={<AddChannel pvt={true} />} />
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
