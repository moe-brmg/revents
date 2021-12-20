import React, { useState } from "react"
import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import { useDispatch, useSelector } from "react-redux"
import EventListItemPlaceholder from "./EventListItemPlaceholder"
import EventFilters from "./EventFilters"
import { listenToEventsFormFirestore } from "../../../app/firestore/firestoreService"
import { listenToEvents } from "../eventActions"

import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection"

export default function EventDashboard() {
  const dispatch = useDispatch()
  const { events } = useSelector((state) => state.event)
  const { loading } = useSelector((state) => state.async)
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  )
  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)))
  }

  // useEffect (() => {
  //   dispatch(asyncActionStart())
  //   const unsubscribe= getEventsFromFirestore({
  //   next: snapshot => {
  //   dispatch(listenToEvents (snapshot.docs.map(docSnapshotdataFromSnapshot (docSnapshot))));
  //   dispatch(asyncActionFinish())
  //   },
  //   error: error => dispatch (asyncActionError(error)),
  //   // complete: () ⇒ (console.log("you will never see this message"))
  //   })
  //   return unsubscribe
  // }, [dispatch])}

  useFirestoreCollection({
    query: () => listenToEventsFormFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  })

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters
          setPredicate={handleSetPredicate}
          predicate={predicate}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  )
}
