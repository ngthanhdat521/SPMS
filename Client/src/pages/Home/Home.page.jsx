import React from "react";
import HomeCards from "../../components/Home/HomeCards/HomeCards.component";
import HomeContent from "../../components/Home/HomeContent/HomeContent.component";
import HomeHeader from "../../components/Home/HomeHeader/HomeHeader.component";
import HomeContent2 from "../../components/Home/HomeContent2/HomeContent2.component";
import Navbar from "../../ui/Menu/Navbar/Navbar.component";
import Footer from "../../components/Footer/Footer.component";
import styles from "./Home.module.scss";

const Home = () => {
    return (
        <div className={styles["home"]}>
            <Navbar style={{padding:"0 200px"}} isShownSidebarIcon={false}></Navbar>
            <HomeHeader></HomeHeader>
            <HomeCards></HomeCards>
            <HomeContent
                img="./assets/images/register.png"
                title="Capstone Register"
                desc="Students easily register and capture information about capstone"
            ></HomeContent>
            <HomeContent2
                img="./assets/images/teamwork.jpg"
                title="Team Work"
                desc="Team leader can assign tasks, track and monitor the completion of the members' work"
            ></HomeContent2>
            <HomeContent
                img="./assets/images/management.jpg"
                title="Manage Capstone"
                desc="Moderator can manage document, student, group, topic, defense,... most of the capstone execution process"
            ></HomeContent>
            <HomeContent2
                img="./assets/images/evaluation.jpg"
                title="Evaluation"
                desc="Mentors and councils can evaluate groups conveniently"
            ></HomeContent2>

            <Footer />
        </div>
    );
};

export default Home;
