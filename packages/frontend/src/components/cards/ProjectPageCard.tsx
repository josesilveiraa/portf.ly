import { Card, Col, Text } from "@nextui-org/react";

interface ProjectPageCardProps {
  firstLine: string;
  secondLine: string | undefined;
  imageUrl: string;
}

export default function ProjectPageCard({ firstLine, secondLine, imageUrl }: ProjectPageCardProps) {
  return (<Card>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          {firstLine}
        </Text>
        <Text h4 color="white">
          {secondLine}
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src={imageUrl}
      objectFit="cover"
      width="100%"
      height={340}
      alt="Card background"
    />
  </Card>);
}
