import React, { useEffect, useState } from 'react';
import styles from './HomeCards.module.scss';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
const HomeCards = () => {
    const [isAppeared,setIsAppeare] = useState(false);
    useEffect(()=> {
        window.addEventListener('scroll', ()=>{
            if(window.pageYOffset > 200){
                setIsAppeare(true);
            }
            });
    })
    return (
        <div className={styles["home-cards"]}>
            <div className={styles["cards"] +" row " + (isAppeared?styles["bottomToTop"]:'')}>
                <div className={styles["card"] + ' col-xl-2 col-lg-12'}>
                    <ExitToAppOutlinedIcon sx={{fontSize: '6rem'}} className={styles["home-icons"]}></ExitToAppOutlinedIcon>
                    <h4>Capstone Register</h4>
                    <p>Students easily register and capture information about capstone</p>
                </div>
                <div className={styles["card"] + ' col-xl-2 col-lg-12'}>
                    <GroupsOutlinedIcon sx={{fontSize: '6rem'}} className={styles["home-icons"]}></GroupsOutlinedIcon>
                    <h4>Team Work</h4>
                    <p>Team leader can assign tasks, track and monitor the completion of the members' work</p>
                </div>
                <div className={styles["card"] + ' col-xl-2 col-lg-12'}>
                    <ManageAccountsOutlinedIcon sx={{fontSize: '6rem'}} className={styles["home-icons"]}></ManageAccountsOutlinedIcon>
                    <h4>Manage Capstone</h4>
                    <p>Moderator can manage most of the capstone execution process</p>
                </div>
                <div className={styles["card"] + ' col-xl-2 col-lg-12'}>
                    <GpsFixedOutlinedIcon sx={{fontSize: '6rem'}} className={styles["home-icons"]}></GpsFixedOutlinedIcon>
                    <h4>Evaluation</h4>
                    <p>Mentors and councils can evaluate groups conveniently</p>
                </div>
            </div>
        </div>
    );
};

export default HomeCards;