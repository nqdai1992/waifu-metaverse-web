'use client'

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Flex direction="column" gap="5">
      <Text>Hello from Radix Themes :)</Text>
      <Button onClick={() => router.push('/sign-in')}>Let&apos;s go</Button>
      <div className="flex justify-center">
          <Button
            className="max-w-3xs"
            onClick={() => router.push('/doujinshi')}
            color="crimson"
          >
            Doujinshi
          </Button>
        </div>
    </Flex>
  );
}
