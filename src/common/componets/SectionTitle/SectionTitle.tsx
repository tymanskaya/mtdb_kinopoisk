import {Typography} from "@mui/material";

type Props = {
    title: string
}

export const SectionTitle = ({title}: Props) => {
    return (
        <Typography variant="h5" sx={{ fontWeight: 700}}>{title}</Typography>
    )
}

