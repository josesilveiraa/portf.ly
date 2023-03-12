import { Navbar, Text, Button, Link } from '@nextui-org/react';


export default function MainNavbar() {
  return (
      <Navbar isCompact variant={"sticky"}>
        <Navbar.Brand>
          <Text b color="inherit">portf.ly</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="underline">
          <Navbar.Link href="/">Projects</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">Log-in</Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
  );
}