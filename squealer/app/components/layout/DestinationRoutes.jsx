'use client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllSqueals from './AllSqueals'
import Card from '../Card'
import ModeratorSection from './ModeratorSection'
import Settings from '../profile/Settings'

export default function DestinationRoutes ({ user, squeals, settings }) {
  
  return (
    <Routes>
      <Route index path={`/`} element={<AllSqueals squeals={squeals} />} />
      <Route
        path={`/channels`}
        element={'Tommi devi inserire la gestione dei canali privati qui'}
      />
      <Route
        path={`/settings`}
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
