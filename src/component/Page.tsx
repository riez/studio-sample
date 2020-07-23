import { FunctionComponent } from "react";
import DesktopContainer from "./Container/DesktopContainer";
import MobileContainer from "./Container/MobileContainer";
import { FilmModel } from "../models/film";

interface Props{
    children: React.ReactNode;
    dataFilm?: FilmModel;
    hideIntroHeader?: boolean;
}

const Page: FunctionComponent<Props> = ({
    children,
    dataFilm,
    hideIntroHeader
}) => {
    return (
        <div>
            <DesktopContainer hideIntroHeader={hideIntroHeader} dataFilm={dataFilm}>{children}</DesktopContainer>
            <MobileContainer hideIntroHeader={hideIntroHeader} dataFilm={dataFilm}>{children}</MobileContainer>
        </div>
    )
}

export default Page;