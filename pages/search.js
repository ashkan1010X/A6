import Head from 'next/head'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';
import { addToHistory } from '@/lib/userData'

export default function AdvancedSearch() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            query: "",
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isHighlight: false,
            isOnView: false
        }
    })

    const submitForm = async (data) => {
        let query = "/artwork?"
        query += `${data?.searchBy}=true`
        query += data.geoLocation ? `&geoLocation=${data.geoLocation}` : ""
        query += data.medium ? `&medium=${data.medium}` : ""
        query += `&isOnView=${data?.isOnView}`
        query += `&isHighlight=${data?.isHighlight}`
        query += `&q=${data?.query}`
        setSearchHistory(await addToHistory(query))
        router.push(query)
    }

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Search</title>
                <meta name="description" content="Metropolitan Museum of Art | Search" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>

            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="q"
                                {...register("query", { required: true })}
                            />
                            {errors.query?.type === "required" && <p >Search query is required</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" name="medium" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register("isHighlight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register("isOnView")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit" disabled={Object.keys(errors).length > 0}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>

    )
}