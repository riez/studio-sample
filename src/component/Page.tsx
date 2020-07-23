import { FunctionComponent } from "react";
import { Helmet } from 'react-helmet';
import DesktopContainer from "./Container/DesktopContainer";
import MobileContainer from "./Container/MobileContainer";
import { FilmModel } from "../models/film";
import Footer from "./Footer";

interface Props{
    children: React.ReactNode;
    dataFilm?: FilmModel;
    metaTitle?: string;
    metaDescription?: string;
    hideIntroHeader?: boolean;
}

const Page: FunctionComponent<Props> = ({
    children,
    dataFilm,
    hideIntroHeader,
    metaTitle,
    metaDescription
}) => {
    return (
        <div>
            <Helmet title={metaTitle || 'Studio Sample - Just another studio website'}>
                <meta name="description" content={metaDescription || 'Studio Sample is a SEO Optimized Website contains information about Films.'} />
            </Helmet>
            <DesktopContainer hideIntroHeader={hideIntroHeader} dataFilm={dataFilm}>{children}</DesktopContainer>
            <MobileContainer hideIntroHeader={hideIntroHeader} dataFilm={dataFilm}>{children}</MobileContainer>
            <Footer />
        </div>
    )
}

export default Page;