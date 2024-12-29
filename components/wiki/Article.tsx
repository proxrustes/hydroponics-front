import { Typography } from "@mui/material";
import { CustomContainer } from "../common/CustomContainer";

export function Article(props: {title: string, children: any}){

    return(
<CustomContainer>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>{props.title}</Typography>
                   {props.children}
                </CustomContainer>
    )
}