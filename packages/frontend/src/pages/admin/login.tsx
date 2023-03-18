import LoginForm from "@/components/admin/LoginForm";
import { Input, Spacer } from "@nextui-org/react";

export default function Login() {
  return (
    <LoginForm>
      <Input
        clearable
        bordered
        fullWidth
        color="primary"
        size="lg"
        placeholder="Email"
      />
      <Spacer y={1} />
      <Input.Password
        clearable
        bordered
        fullWidth
        color="primary"
        size="lg"
        placeholder="Password"
        type="password"
      />
      <Spacer y={1} />
    </LoginForm>
  );
}
