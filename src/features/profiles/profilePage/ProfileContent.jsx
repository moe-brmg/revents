import React from "react"
import { Tab } from "semantic-ui-react"
import AboutTab from "./AboutTab"
import EventsTab from "./EventsTab"
import PhotosTab from "./PhotosTab"

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <Tab.Pane>
          <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <Tab.Pane>
          <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Events",
      render: () => (
        <Tab.Pane>
          <EventsTab profile={profile} />
        </Tab.Pane>
      ),
    },
    { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> },
  ]

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  )
}
