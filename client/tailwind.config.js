/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "600px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",

      "3xl": "2150px",
    },
  },
  plugins: [
    // ... other Tailwind CSS plugins

    // Define your own plugins if needed
    function ({ addUtilities }) {
      const newUtilities = {
        // Define your custom utility classes here
        ".zoomed-image": {
          transform: "scale(1.2)", // Adjust the scale factor as needed
          transition: "transform 0.3s ease-in-out", // Add a smooth transition
        },
        // ... other custom utility classes
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
