import Head from 'next/head'
import { useRouter } from "next/router"
import { Row, Col } from "react-bootstrap"
import Error from 'next/error'
import ArtworkCardDetail from '@/components/ArtworkCardDetail'

export default function Artwork() {
    const router = useRouter()
    const { objectID } = router.query

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Artwork</title>
                <meta name="description" content="Metropolitan Museum of Art | Artwork" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>
            {
                objectID ?
                    <Row>
                        <Col>
                            <ArtworkCardDetail objectID={objectID} />
                        </Col>
                    </Row>
                    :
                    <Error statusCode={404} />
            }

        </>
    )
}