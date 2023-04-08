import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function ArtworkCard({ objectID }) {

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    return (
        error ?
            <Error statusCode={404} />
            :
            data ?
                <>
                    <Card style={{ maxWidth: '100%' }}>
                        <Link href={`/artwork/${objectID}`} passHref>
                            <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
                        </Link>

                        <Card.Body>
                            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                            <section style={{ paddingBottom: "1.5rem" }}>
                                <div><strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}</div>
                                <div><strong>Classification: </strong>{data.classification ? data.classification : "N/A"}</div>
                                <div><strong>Medium: </strong>{data.medium ? data.medium : "N/A"}</div>

                            </section>

                            <Link href={`/artwork/${objectID}`} passHref>
                                <Button variant="outline-success">
                                    <strong>ID: </strong>{objectID}
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </>
                :
                null
    )
}