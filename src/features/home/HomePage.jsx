import React from "react"
import {
  Container,
  Segment,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react"

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            style={{ marginBottom: 12 }}
          />
        </Header>
        <Button size="huge" inverted>
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  )
}
