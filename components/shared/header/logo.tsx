"use client";

import { APP_NAME } from "@/lib/constants";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Link href="/" className="flex-start ml-4">
      <Image
        // src={`/images/${theme === "light" ? "logo-dark" : "logo"}.svg`}
        src={`/images/logo.svg`}
        alt={`${APP_NAME} logo`}
        priority
        height={88}
        width={88}
      />
    </Link>
  );
};

export default Logo;
