import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Menu, Image, Dropdown } from "semantic-ui-react"
import { signOutUser } from "../auth/authActions"

function SignedInMenu() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const history = useHistory()
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.email || "test"}>
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
            onClick={() => {
              dispatch(signOutUser())
              history.push("/")
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedInMenu
