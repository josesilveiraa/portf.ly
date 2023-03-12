import { Navbar, Text, Button } from '@nextui-org/react';


export default function MainNavbar() {
  return (
      <Navbar isCompact variant={"static"}>
        <Navbar.Brand>
          <Text b color="inherit">portf.ly</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="md">
          <Navbar.Link href="/">Projects</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat href="#">Log-in</Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
  );
}