/* global google */
import { Formik, Form } from "formik"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Confirm, Header, Segment } from "semantic-ui-react"
import { listenToEvents } from "../eventActions"
import * as Yup from "yup"
import MyTextInput from "../../../app/common/form/MyTextInput"
import MyTextArea from "../../../app/common/form/MyTextArea"
import MySelectInput from "../../../app/common/form/MySelectInput"
import { categoryData } from "../../../app/api/categoryOptions"
import MyDateInput from "../../../app/common/form/MyDateInput"
import MyPlaceInput from "../../../app/common/form/MyPlaceInput"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { Redirect } from "react-router"
import { toast } from "react-toastify"

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )
  const { loading, error } = useSelector((state) => state.async)

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: "",
    },
    venue: {
      address: "",
      latLng: "",
    },
    date: "",
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required("City is required"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Venue is required"),
    }),
    date: Yup.string().required(),
  })

  async function handleCancelToggle(event) {
    setConfirmOpen(false)
    setLoadingCancel(true)
    try {
      await cancelEventToggle(event)
      setLoadingCancel(false)
    } catch (error) {
      setLoadingCancel(true)
      toast.error(error.message)
    }
  }
  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  })

  if (loading) return <LoadingComponent content="Loading event ..." />
  if (error) return <Redirect to="/error" />
  return (
    <Segment clearing>
      <Header sub color="teal" content="Event Details" />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values)
            setSubmitting(false)
            history.push("/events")
          } catch (error) {
            toast.error(error.message)
            setSubmitting(false)
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectInput
              name="category"
              placeholder="Event Category"
              options={categoryData}
            />
            <MyTextArea name="description" placeholder="Description" rows="3" />
            <Header sub color="teal" content="Event Location Details" />
            <MyPlaceInput name="city" placeholder="City" />
            <MyPlaceInput
              disabled={!values.city.latLng}
              name="venue"
              placeholder="Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 2000,
                types: ["establishment"],
              }}
            />
            <MyDateInput
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
            {selectedEvent && (
              <Button
                type="button"
                loading={loadingCancel}
                floated="left"
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate event"
                    : "Cancel Event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}

            <Button
              loading={isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              as={Link}
              to={"/eventes"}
              type="submit"
              floated="right"
              content="Cancel"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event - are you sure"
            : "This will cancel the event - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  )
}
