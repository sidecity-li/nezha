/** @type {import('tailwindcss').Config} */

function getConfig() {
  const isStorybook = process.env.TYPE === "storybook";
  const content = ["./components/**/*.{js,ts,jsx,tsx}"];
  const config = {
    darkMode: ["class"],
    content: isStorybook
      ? [...content, "./stories/**/*.{js,ts,jsx,tsx}"]
      : content,
    theme: {
      extend: {
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        colors: {
          "primary-action": "hsl(var(--primary-action))",
          "primary-text": "hsl(var(--primary-text))" /**200 56% 4% */,
          "secondary-text": "hsl(var(--secondary-text))",
          "basic-line": "hsl(var(--basic-line))",
          "teriary-text": "hsl(var(--teriary-text))",
          "basic-link": "hsl(var(--basic-link))",
          border: "hsl(var(--border))",
          hint: "hsl(var(--hint))",
          block: "hsl(var(--block))",
          red: "hsl(var(--red))",
          green: "hsl(var(--green))",
          // "secondary-action": "hsl(var(--secondary-action))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          tooltip: {
            DEFAULT: "hsl(var(--tooltip))",
            foreground: "hsl(var(--tooltip-foreground))",
          },
          dialog: "hsl(var(--dialog))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          chart: {
            1: "hsl(var(--chart-1))",
            2: "hsl(var(--chart-2))",
            3: "hsl(var(--chart-3))",
            4: "hsl(var(--chart-4))",
            5: "hsl(var(--chart-5))",
          },
        },
      },
    },
    plugins: [
      require("tailwindcss-animate"),
      ({ addVariant }) => {
        addVariant("not-disabled", "&:not(:disabled)");
      },
    ],
  };

  return config;
}

export default getConfig();
