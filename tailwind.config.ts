module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    // "node_modules/@cpm/package-manager/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "1/8": "12%",
        18: "68px",
        55: "240px",
      },
      
      screens: {
        mxl: "992px",
      },
      fontSize: {
        xxs: "0.625rem",
        17: "17px",
        22: "22px",
        "4xl": "50px",
        "5xl": "54px",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(150px, 1fr))",
      },
      boxShadow: {
        "small-button": "0px 4px 10px 0px #D5B56F4D",
        filterShadow: "0px 4px 4px 0px #00000040",
        button:
          "-6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2)",
        "button-active":
          "-1px 2px 5px rgba(81, 41, 10, 0.15), 0px 1px 1px rgba(81, 41, 10, 0.15)",
        "input-ring": "0px 0px 0px 1px #fff, 0px 0px 0px 3px #dbf2fe",
        "icon-ring": "0px 0px 0px 2px #fff, 0px 0px 0px 4px #eceff2",
        "nest-shadow": "0px 1px 2px 0px #0000000D",
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        "slide-top":
          "slide-top 200ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-top-select":
          "slide-top-select 200ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        leave: "leave 150ms ease-in forwards",
        fade: "fadeOut 5s ease-in-out",
      },
      textShadow: {
        default: "1px -2px #D5B56F",
        lg: "2px 2px 4px rgba(0, 0, 0, 0.7)",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-top": {
          "0%": {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(-40px)",
          },
        },
        "slide-top-select": {
          "0%": {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(-46px)",
          },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        outfit: ["Outfit", "system-ui"],
        karla: ["Karla", "sans-serif"],
        din: ['DIN1451Mittelschrift', 'sans-serif'],
      
      },
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
        pvYellow: "#FEC022",
        pvRed: "#ED5757",
        pvBlue: "#2E94EA",
        pvLightGray: "#F0F0F0",
        pvDarkGray: "#787878",
        pvDisabledPrimary: "#2E94EA",
        pvShadowPrimary: "#75838E",
        pvPrimaryText: "#1C2033",
        pvPlaceholder: "#b8b8b8",
        lightGreen: "#E8FFE7",
        pvDarkGreen: " #037847",
        pvExtraLightGreen: "#F8FFF7",
        pvLightOrange: "#FFFBF7",
        pvDarkOrange: "#F29339",
        // primary: "#202225",
        // secondary: "#5865f2",
        lightBGPink:"#FAF5F6",
        darkPink:"#F4EEEE",
        lobobgColor1: "#63AEED",
        lobobgColor2: "#86C1F3",
        trustgreen: "#038E60",
        transparencyyellow: "#D89D08",
        excellenceBlue: "#2E94EA",
        stepsGreen: "#0CC269",
        DarkBlue: "#064E89",
        BorderBlue: "#8BC3F1",
        StepperbgGray: " var(--Grayscale-Input-Background, #EFF0F6)",
        // pvBlue: "#1887E4",
        grayText: "#787878",
        fieldNameColor: " var(--Grayscale-Title-Active, #1C2033)",
        requiredColor: "var(--6, #ED5757)",
        fieldBorder: "var(--Grayscale-Input-Stroke, #CACACA)",
        fieldBg: "var(--White-10, #FFF)",
        primaryBlue: "var(--Colors-Primary, #2E94EA)",
        primaryBtnTxt: "var(--gray-50, #F9FAFB)",
        secondaryBtnBg: "#F0F0F0",
        // pvRed: "#ED5757",
        // pvLightGray: "#F0F0F0",
        pvPlaceHolder: "#B8B8B8",
        pvtextgray: "#787878",
        pvBackGroundGray: "#FAFAFA",
        pvborderRadius: "#A5A5A5",
        /////    extra colors
        pvDarkYellow: "#D89D08",
        pvLightYellow: "#FFF3E0",
        pvMediumYellow: "#FFE6A7",
        pvLightRed: "#FEEBEE",
        pvGreen: "#038E60",
        pvLightGreen: "#E0FFE2",
        pvHoverBlue: "#46A9FD",
        pvLightBlue: "#E3F2FD",
        pvVeryLightGray: "#F9F9F9",
        pvMediumLightGray: "#E2E2E2",
        pvMediumGray: "#D2D6DC",
        nestedTabsBackground: "#F5F5F5",

        /////    table
        tableHeaderBackgound: "#F9FAFB",
        tableLinkBlack: "#1C2033",
        tableContent: "#6B7280",
        globalFilterBorder: "#CACACA",
        dropdownselected: "#181818",
        dropdownNotSelected: "#7C7C7C",
        dropdownChecboxBorder: "#D9D9D9",
        unselectedTabs: "#6E7191",
        selectedTabs: "#2B3049",
        statusPillYellowbg: "#FFF3E0",
        statusPillYellowText: "#D89D08",
        navigationSelectedItem: "#374151",
        navigationSelectedItemText: "#D1D5DB",
        navigationBg: "#2B2B29",
        SiteTextColor: "#7A7D9C",
        SiteBlackColor: "#1B1B1B",

        "blue-o": {
          100: "#E0F0FE",
          80: "#21263C",
          70: "#DCE6F0",
          50: "#F6FBFF",
          30: "#C0DFF9",
          20: "#EAF4FD",
          10: "#EAECF0",
        },
        "black-b": {
          400: "#181818",
          300: "#1C2033",
          250: "#111111",
          210: "#5C5C5C",
          190: "#BDBDBD",
          180: "#5F5F5F",
          150: "#4A4A4A",
          140: "#101010",
          100: "#2B3049",
          70: "#212942",
          50: "#374151",
        },
        "primary-o": {
          900: "#4F46E5",
          800: "#5865f2",
          600: "#2E94EA",
          550: "#46A9FD",
          500: "#B4C6FC",
          450: "#8DC0EB",
          400: "#2196F3",
          390: "#47B2FF",
          370: "#47ABFF",
          350: "#208ec7",
        },
        "secondary-g": {
          150: "#E0FFE2",
          100: "#EBF4FC",
          90: "#E3F2FD",
          50: "#EEF7FF",
          20: "#F0F2F5",
        },
        "secondary-o": {
          100: "#FFE6A7",
          50: "#FFF3E0",
        },
        "secondary-p": {
          900: "#6E7191",
        },
        "status-success": {
          900: "#038E60",
          300: "#35A423",
          100: "#F8FFF7",
        },
        "status-danger": {
          900: "#FE0000",
          800: "#ED5757",
          300: "#F44D58",
          50: "#FEEBEE",
          10: "#FFF9F9",
        },
        "status-warning": {
          900: "#D89D08",
          800: "#FEC022",
        },
        "gray-o": {
          650: "#202225",
          620: "#424242",
          600: "#6B7280",
          550: "#737373",
          500: "#757575",
          480: "#787878",
          470: "#7C7C7C",
          460: "#75838E",
          450: "#b8b8b8",
          420: "#CCC",
          410: "#E9E9E9",
          400: "#CACACA",
          390: "#313441",
          370: "#D1D5DB",
          360: "#D2D6DC",
          350: "#D9D9D9",
          300: "#E2E2E2",
          250: "#F0F0F0",
          150: "#F5F5F5",
          100: "#F9FAFB", 
          80: "#828282",
          70: "#FAFAFA",
          50: "#F9F9F9",
        },
        "gray-p": {
          550: "#E1E1E1",
          500: "#84868D",
          400: "#E8E5E4",
          450: "#404A5F",
          350: "#EAEAEA",
          250: "#A2A2A2",
          200: "#EAEAFF",
          150: "#F7F7FE",
          100: "#EFEFFF",
          50: "#E8E8E8",
        },
        cream: {
          50: "#D5B56F",
        },
      },
      spacing: {
        88: "22rem",
      },
    },
  },
  plugins: [],
};
