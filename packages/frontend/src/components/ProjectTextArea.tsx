import { Textarea } from "@nextui-org/react";

interface ProjectTextAreaProps {
  children: string | undefined;
}

export default function ProjectTextArea({ children }: ProjectTextAreaProps) {
  return (
    <Textarea
    size="xl"
    rows={10}
    css={{ width: "100%" }}
    readOnly
    borderWeight="bold"
    initialValue={children}
    />
  );
}