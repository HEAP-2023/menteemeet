import { createTheme } from "@mui/material/styles";
export const generateColors = () => {
return (
    {
        primary: {
            100: "#fcfcff",
            200: "#f9f9ff",
            300: "#f6f6ff",
            400: "#f3f3ff",
            500: "#f0f0ff",
            600: "#c0c0cc",
            700: "#909099",
            800: "#606066",
            900: "#303033"
    },
    
        bg: {
              100: "#ffffff",
              200: "#ffffff",
              300: "#ffffff",
              400: "#ffffff",
              500: "#ffffff",
              600: "#cccccc",
              700: "#999999",
              800: "#666666",
              900: "#333333"
    },
        
        border: {
              100: "#f5f5f5",
              200: "#ececec",
              300: "#e2e2e2",
              400: "#d9d9d9",
              500: "#cfcfcf",
              600: "#a6a6a6",
              700: "#7c7c7c",
              800: "#535353",
              900: "#292929"
    },
        
        text: {
              100: "#d6d8dd",
              200: "#adb1bb",
              300: "#858b99",
              400: "#5c6477",
              500: "#333d55",
              600: "#293144",
              700: "#1f2533",
              800: "#141822",
              900: "#0a0c11"
    },
    }
);
}



const themeSetting = () => {
    const colors = generateColors();
    return ({
        palette : {
            primary : {
                main : colors.primary[500],
                contrastText : colors.text[500],
            },
            secondary : {
                main : colors.bg[500],
                contrastText : colors.text[500],
            },
            background : {
                main : colors.bg[500],
                contrastText : colors.text[500],
            },
            text : {
                primary : colors.text[500],
            }
        },
        typography : {
            fontFamily : 'Nunito',
            fontSize : 14,

            h1 : {
                fontFamily : 'Nunito',
                fontSize : 36,
            },
            h2 : {
                fontFamily : 'Nunito',
                fontSize : 30,
            },
            h3 : {
                fontFamily : 'Nunito',
                fontSize : 24,
            },
            h4 : {
                fontFamily : 'Nunito',
                fontSize : 20,
            },
            h5 : {
                fontFamily : 'Nunito',
                fontSize : 14,
            },
            h6 : {
                fontFamily : 'Nunito',
                fontSize : 14,
            },
        }
    })
}

export const theme = createTheme(themeSetting());