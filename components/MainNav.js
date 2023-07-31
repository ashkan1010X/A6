import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from "next/link"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { readToken } from '@/lib/authenticate';
import { removeToken } from '@/lib/authenticate';

export default function MainNav() {

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const [isExpanded, setisExpanded] = useState(false);

    let token = readToken();

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setisExpanded(expand => expand = false);
        setSearchHistory(await addToHistory(`title=true&q=${e.target.search.value}`));
        router.push(`/artwork?title=true&q=${e.target.search.value}`)
    }

    function collapseNav(e) {
        setisExpanded(expand => expand = !expand);
    }

    function handleChange() {
        setisExpanded(false);
    }

    function logout() {
        setisExpanded(expand => expand = false);
        removeToken();
        router.push('/login');
    }

    return (
        <>
            <Navbar bg="navbar-dark" expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>ASHKAN ASADPOUR</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={collapseNav} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior >
                                <Nav.Link href="/" onClick={handleChange}>Home</Nav.Link>
                            </Link>
                            {token ? (<Link href="/search" passHref legacyBehavior >
                                <Nav.Link href="/search" onClick={handleChange}>Advanced Search</Nav.Link>
                            </Link>) : ''}
                        </Nav>
                        &nbsp;{token ? (<Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                name="search"
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>) : ''}&nbsp;
                        {token ? (<Nav>
                            <NavDropdown active={router.pathname === "/history"} title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior >
                                    <NavDropdown.Item href="/favourites" onClick={handleChange}>Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior >
                                    <NavDropdown.Item href="/history" onClick={handleChange}>Search History</NavDropdown.Item>
                                </Link>
                                <Link href="/" passHref legacyBehavior >
                                    <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>)
                            :
                            (<Nav>
                                <Link href="/register" passHref legacyBehavior >
                                    <Nav.Link href="/register" onClick={handleChange}>Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior >
                                    <Nav.Link href="/login" onClick={handleChange}>Log in</Nav.Link>
                                </Link>
                            </Nav>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <br />
            <br />
        </>
    );
}