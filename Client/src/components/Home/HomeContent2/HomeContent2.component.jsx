import React, { useEffect, useState } from 'react';
import styles from '../HomeContent/HomeContent.module.scss';
const HomeContent2 = ({img, title, desc}) => {
    const [isAppeared,setIsAppeare] = useState(false);
    useEffect(()=> {
        window.addEventListener('scroll', ()=>{
            if(window.pageYOffset > 1200){
                setIsAppeare(true);
            }
            });
    })
    return (
        <div className={styles["home-content"] + " row" +" justify-content-center "} style={{background: "#edf2f4"}}>
            <div className={styles["home-content_right"] + " col-xl-4 col-lg-12"  + ' '+ (isAppeared?styles["rightToLeft"]:'')}>
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
            <div className={styles["home-content_left"] + " col-xl-4 col-lg-12" + ' '+ (isAppeared?styles["leftToRight"]:'')}>
                <img src = {img} alt="" className = {styles["content-image"]}/>
            </div>
        </div>
    );
};

export default HomeContent2;