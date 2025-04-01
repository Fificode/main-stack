/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#131316", // Custom primary color
          secondary: "#56616B",
        },
        backgroundImage: {
          "avatar-gradient": "linear-gradient(#5C6670, #131316)",
          "white-gradient": "linear-gradient(#FFFFFF, #F2F3F5)",
     
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"], // Custom font
        },
        spacing: {
          '18': '4.5rem', // Custom spacing
        },
      },
    },
    plugins: [],
  };
  