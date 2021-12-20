import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Header, Segment, Comment } from "semantic-ui-react"
import {
  firebaseObjectToArray,
  getEventChatRef,
} from "../../../app/firestore/firebaseService"
import { listenToEventChat } from "../eventActions"
import EventDetailedChatForm from "./EventDetailedChatForm"
import { formatDistance } from "date-fns"
import { Link } from "react-router-dom"

function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch()
  const { comments } = useSelector((state) => state.event)
  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists()) return
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      )
      console.log(snapshot.val())
    })
  }, [eventId, dispatch])
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} />
        <Comment.Group>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split("\n").map((text, i) => (
                    <span key={i}>
                      {text} <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  )
}

export default EventDetailedChat
