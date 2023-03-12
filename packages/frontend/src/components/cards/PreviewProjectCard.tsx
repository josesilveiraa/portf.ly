import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import Link from "next/link";

interface ProjectData {
  projectId: string;
  category: string;
  title: string;
  imageUrl: string;
  firstLine: string;
  secondLine?: string;
  buttonContent: string;
}

export const PreviewProjectCard = ({
  projectId,
  category,
  title,
  imageUrl,
  firstLine,
  secondLine,
  buttonContent,
}: ProjectData) => {
  
  return (
    <Card css={{ w: "100%", h: "400px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            {category}
          </Text>
          <Text h3 color="white">
            {title}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={imageUrl}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Project Card"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={12}>
              {firstLine}
            </Text>
            <Text color="#000" size={12}>
              {secondLine}
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button
                flat
                auto
                rounded
                as={Link}
                color="secondary"
                href={`/project/${projectId}`}
              >
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  {buttonContent}
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
