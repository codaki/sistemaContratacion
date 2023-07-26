import { Button, Typography } from "@mui/material";

export default function Home(){
    return(
        <>
        <div className="authPage">
            <div className="headerContainer">   
                <Typography 
                variant="h3"
                color="primary"
                >
                    CONCURSO DE MERITOS Y OPOSICION 2023
                </Typography>
                
                <Button 
                variant="outlined" 
                color="error"
                >
                    Mas información
                </Button>
            </div>
        </div>
        </>
    );
}