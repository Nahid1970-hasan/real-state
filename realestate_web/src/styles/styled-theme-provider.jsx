import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global.style";
import { theme } from "./theme";

export const StyledThemeProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            {children}
        </ThemeProvider>
    );
};