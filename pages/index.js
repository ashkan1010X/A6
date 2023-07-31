/*********************************************************************************
* WEB422 – Assignment 6
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Shayan Asadpour Student ID: 111 155 206 Date: ____________________

Vercel App (Deployed) Link: a6-persiankid100.vercel.app

*
*
********************************************************************************/

import Head from 'next/head'
import { Row, Col, Image } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <Head>
        <title>Metropolitan Museum of Art | Home</title>
        <meta name="description" content="Metropolitan Museum of Art | Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/museum.ico" />
      </Head>
      <main>
        <h5 style={{ paddingBottom: "0.5rem" }}>Welcome to Metropolitan Museum of Art</h5>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg'
          fluid
          rounded
          alt='main-photo'
          style={{ marginBottom: "2rem" }}
        />
        <Row>
          <Col md={6}>
            <p> The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;, is the largest art museum in the Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by area one of the world&apos;s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</p>
            <p>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.</p>
          </Col>
          <Col md={6}>
            <p >The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.</p>
            <p>For more information, please visit:</p>
            <a  href='https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art' target="_blank">https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a>
          </Col>
        </Row>
      </main>
    </>
  )
}