/* global google */
import { Formik, Form } from "formik"
import React from "react"
import cuid from "cuid"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Header, Segment } from "semantic-ui-react"
import { createEvent, updateEvent } from "../eventActions"
import * as Yup from "yup"
import MyTextInput from "../../../app/common/form/MyTextInput"
import MyTextArea from "../../../app/common/form/MyTextArea"
import MySelectInput from "../../../app/common/form/MySelectInput"
import { categoryData } from "../../../app/api/categoryOptions"
import MyDateInput from "../../../app/common/form/MyDateInput"
import MyPlaceInput from "../../../app/common/form/MyPlaceInput"

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )

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

  return (
    <Segment clearing>
      <Header sub color="teal" content="Event Details" />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              )
          history.push("/events")
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

            <Button
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
    </Segment>
  )
}
