/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryText: "#1E293B",
        primaryBackground: "#ECECEC",
        secondaryText: "#FFFFFF",
        secondaryBackground: "#62B6CB",
        defaultText: "#1E293B",
        defaultBackground: "#F7F7F7",
        inputText: "#1E293B",
        inputBackground: "#FFFFFF",
        createEventText: "#1E293B",
        createEventBackground: "#FFD166",
        nextText: "#FFFFFF",
        nextTextCelebratory: "#1E293B",
        nextBackground: "#62b6CB",
        nextBackgroundCelebratory: "#FFD166",
      },
    },
  },
  plugins: [],
}
