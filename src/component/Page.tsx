import { FunctionComponent } from "react";
import DesktopContainer from "./Container/DesktopContainer";
import MobileContainer from "./Container/MobileContainer";

interface Props{
    children: React.ReactNode;
}

const Page: FunctionComponent<Props> = ({
    children
}) => {
    return (
        <div>
            <DesktopContainer>{children}</DesktopContainer>
            <MobileContainer>{children}</MobileContainer>
        </div>
    )
}

export default Page;