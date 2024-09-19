import * as React from "react"
import { GeistMono } from 'geist/font/mono';
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva(`text-foreground`, {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      muted: "text-sm text-muted-foreground",
      small: "text-sm font-medium leading-none",
      code: GeistMono.className,
      pre: cn(GeistMono.className, "p-4 bg-gray-100 rounded-md overflow-x-auto"),
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

const Typography = React.forwardRef(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : variant === 'pre' ? 'pre' : variant === 'code' ? 'code' : "p"
  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
})

Typography.displayName = "Typography"

export { Typography, typographyVariants }
