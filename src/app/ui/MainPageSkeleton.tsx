import {WelcomeSectionSkeleton} from "@/features/movieCard/ui/WelcomeSection";
import {MovieSectionSkeleton} from "@/features/movieCard/ui/CategoryPage/MovieSectionSkeleton.tsx";


export const MainPageSkeleton=()=>{
    return(
        <>
        <WelcomeSectionSkeleton/>
            <MovieSectionSkeleton/>
        </>
    )
}