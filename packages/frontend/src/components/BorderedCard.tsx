import { Text, Card } from "@nextui-org/react";

interface BorderedCardProps {
  content: string;
}

export default function BorderedCard({ content }: BorderedCardProps) {
  return (
    <Card variant="bordered" >
      <Card.Body css={{ "padding": "20px" }}>
        <Text h3>{content}</Text>
      </Card.Body>
    </Card>
  );
}
