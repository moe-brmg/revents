import React from "react"
import { Route, useLocation } from "react-router"
import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/eventDashboard/EventDashboard"
import EventDetailedPage from "../../features/events/eventDetails/EventDetailedPage"
import EventForm from "../../features/events/eventForm/EventForm"
import HomePage from "../../features/home/HomePage"
import NavBar from "../../features/nav/NavBar"
import SandBox from "../../features/sandbox/Sandbox"
import ModalManger from "../common/modals/ModalManager"
import { ToastContainer } from "react-toastify"
import ErrorComponent from "../common/errors/ErrorComponent"
import AccountPage from "../../features/auth/AccountPage"
import { useSelector } from "react-redux"
import LoadingComponent from "./LoadingComponent"
import ProfilePage from "../../features/profiles/profilePage/ProfilePage"

function App() {
  const { key } = useLocation()
  const { initialized } = useSelector((state) => state.async)

  if (!initialized) return <LoadingComponent content="Loading app .." />

  return (
    <>
      <ModalManger />
      <ToastContainer themed="colored" postion="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <Route path="/sandbox" component={SandBox} />
              <Route path="/account" component={AccountPage} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default App
