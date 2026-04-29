import {WelcomeSectionSkeleton} from "@/features/movieCard/ui/WelcomeSection";
import {MovieSectionSkeleton} from "@/features/movieCard/ui/CategoryPage/MovieSectionSkeleton.tsx";
import {Container} from "@mui/material";


export const MainPageSkeleton=()=>{
    return(
        <>
            <WelcomeSectionSkeleton />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <MovieSectionSkeleton />
                <MovieSectionSkeleton />
                <MovieSectionSkeleton />
                <MovieSectionSkeleton />
            </Container>
        </>
    )
}