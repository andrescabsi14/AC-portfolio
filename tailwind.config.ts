import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Semantic shadcn/ui colors using CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // NYC Palette - Named colors
        "nyc-statue-of-liberty": "#9db4b8",
        "nyc-flushing-meadows": "#2d6a4f",
        "nyc-museums": "#d9d9d9",
        "nyc-coney-island": "#d62828",
        "nyc-katz-delicatessen": "#d9a9a0",
        "nyc-pizza": "#ed5a1e",
        "nyc-broadway": "#f4d03f",
        "nyc-hudson-river": "#1e3a5f",
        "nyc-washington-square": "#e5e5e5",
        "nyc-the-highline": "#7a8c3f",
        "nyc-prospect-park": "#1a4d2e",
        "nyc-skyscrapers": "#7fb3a3",
        "nyc-roosevelt-island": "#d62828",
        "nyc-taxi": "#f4d03f",
        "nyc-greek-coffee": "#0052a3",
        "nyc-levain-bakery": "#1a3a52",
        "nyc-apollo": "#d97533",
        "nyc-brooklyn-bridge": "#a89080",
        "nyc-grand-central": "#5b9e9e",
        "nyc-flatiron": "#d4c5b9",
        "nyc-bagel": "#d4a574",
        "nyc-strand-bookstore": "#b81c23",
        "nyc-central-park": "#234d20",
        "nyc-yankee-stadium": "#1a3d52",
        "nyc-staten-island-ferry": "#dd7e50",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["'Raleway'", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss/plugin")],
};

export default config;
