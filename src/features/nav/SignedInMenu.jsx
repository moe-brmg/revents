import React from "react"
import { Link } from "react-router-dom"
import { Menu, Image, Dropdown } from "semantic-ui-react"

function SignedInMenu({ signOut }) {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="assets/user.png" />
      <Dropdown pointing="top left" text="Bob">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item to="My profile" icon="user" text="My Profile" />
          <Dropdown.Item
            to="Sign out"
            icon="power"
            text="Sign Out"
            onClick={signOut}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu
