import MainNav from "/components/MainNav.js";
import { Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{props.children}</Container>
      <br />
    </>
  );
}
