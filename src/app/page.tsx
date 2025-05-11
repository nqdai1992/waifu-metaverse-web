'use client'

import { Flex, Text, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Flex direction="column" gap="2">
			<Text>Hello from Radix Themes :)</Text>
			<Button onClick={() => router.push('/sign-in')}>Let&apos;s go</Button>
		</Flex>
  );
}
