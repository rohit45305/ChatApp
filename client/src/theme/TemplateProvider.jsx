import { createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { createContext } from 'react';

export const TemplateContext = createContext(null);

const TemplateProvider = ({children}) => {
    const theme = createTheme({
        overrides:{
            MuiDrawer:{
                paperAnchorLeft:{
                    left: '4.5%',
                    top: '2.5%',
                    height: '95%',
                    width: 397,
                    right: 'auto'
                }
            },
            MuiBackdrop:{
                root:{
                    backgroundColor:'unset'
                }
            }
        }
    })
    return <div>
        <TemplateContext.Provider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </TemplateContext.Provider>
    </div>;
};

export default TemplateProvider;
