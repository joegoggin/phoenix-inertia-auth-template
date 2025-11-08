import Button, { ButtonVariant } from "@/components/core/Button";
import MainLayout from "@/layouts/Layout";
import { useEffect } from "react";

const HomePage: React.FC = (props) => {
    useEffect(() => {
        console.log(props);
    }, [props]);

    return (
        <MainLayout className="home-page" title="Phoenix Inertia Template">
            <h1>Phoenix Inertia Template</h1>
            <div className="home-page__images">
                <img src="/images/phoenix.png" alt="phoenix logo" />
                <img src="/images/inertia.png" alt="inertia.js logo" />
                <img src="/images/react.png" alt="react logo" />
            </div>
            <div className="home-page__buttons">
                <Button href={"/auth/sign-up"}>Sign Up</Button>
                <Button href={"/auth/log-in"} variant={ButtonVariant.SECONDARY}>
                    Log In
                </Button>
            </div>
        </MainLayout>
    );
};

export default HomePage;
