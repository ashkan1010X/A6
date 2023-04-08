import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validData from '@/public/data/validObjectIDList.json'
import Link from "next/link";

const PER_PAGE = 12;

export default function ArtworkList() {
  const [artworkList, setArtworkList] = useState()
  const [page, setPage] = useState(1)

  const router = useRouter()
  let finalQuery = router.asPath.split('?')[1]

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

  const previousPage = () => {
      if (page > 1) {
          setPage(page - 1)
      }
  }

  const nextPage = () => {
      if (page < artworkList.length) {
          setPage(page + 1)
      }
  }

  useEffect(() => {
      if (data) {
          const filteredData = validData.objectIDs.filter((item) => {
              return data.objectIDs?.includes(item)
          })

          const results = []
          for (let i = 0; i < filteredData.length; i += PER_PAGE) {
              const chunk = filteredData.slice(i, i + PER_PAGE);
              results.push(chunk);
          }
          setArtworkList(results)
      }
      setPage(1)
  }, [data])

  if (error) {
    return <Error statusCode={404} />
}

if (artworkList) {
    return (
        <>
            <Row className="gy-4">
                {artworkList.length > 0 ? (
                    artworkList[page - 1].map(currentObjectID => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))
                ) : (
                    <Col lg={12}>
                        <Card>
                            <Card.Body>
                                <h4>Nothing Here</h4>
                                Try searching for something else.
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            {artworkList.length > 0 && (
                <Row>
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} />
                            <Pagination.Item active>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </Col>
                </Row>
            )}

        </>
    )
}
else {
    return null
}

}
