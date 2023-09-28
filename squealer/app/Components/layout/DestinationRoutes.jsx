'use client'
import { Route, Routes } from 'react-router-dom'
import AllSqueals from './AllSqueals'
import Card from '../Card'
import ModeratorSection from './ModeratorSection'
import Settings from '../profile/Settings'

export default function DestinationRoutes({ user, squeals, settings }) {
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
      <Route
        path={user + `/settings`}
        element={
          <Card>
            <Settings />
          </Card>
        }
      />

      <Route index path={`/moderator`} element={<ModeratorSection />} />
    </Routes>
  )
}
