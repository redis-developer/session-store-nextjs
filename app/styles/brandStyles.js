// app/styles/brandStyles.js

export const brandColors = {
  primary: "#FF3B30", // Hyper (Red)
  secondary: "#5856D6", // Violet
  tertiary: "#007AFF", // Big Blue
  black: "#000000",
  darkGray: "#8E8E93",
  lightGray: "#C7C7CC",
  white: "#FFFFFF",
  midnight: "#091A23",
};

export const fonts = {
  normal: "Space Grotesk, sans-serif",
  mono: "Space Mono, monospace",
};

export const styles = {
  card: {
    backgroundColor: brandColors.white,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
    overflow: "hidden",
    marginBottom: "1.5rem",
    padding: "1.5rem",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: brandColors.black,
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: brandColors.black,
    marginBottom: "0.5rem",
  },
  button: {
    backgroundColor: brandColors.tertiary,
    color: brandColors.white,
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
