import { Container, Text, Input, Spacer, Card, Row, Checkbox, Button } from "@nextui-org/react";

export default function LoginForm() {
  return (
    <Container display="flex" alignItems="center" justify="center" css={{ minHeight: '100vh' }}>
      <Card css={{ mw: '420px', p: '20px' }}>
          <Text
            size={24}
            weight="bold"
            css={{
              as: 'center',
              mb: '20px',
            }}
          >
            Portf.ly Dashboard
          </Text>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            type="password"
          />
          <Spacer y={1} />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
          </Row>
          <Spacer y={1} />
          <Button>Sign in</Button>
        </Card>
    </Container>
  );
}
