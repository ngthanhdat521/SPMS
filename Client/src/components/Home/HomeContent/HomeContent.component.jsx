import React, { useEffect, useState } from 'react';
import styles from './HomeContent.module.scss';
const HomeContent = ({img,title,desc}) => {
    const [isAppeared,setIsAppeare] = useState(false);
    useEffect(()=> {
        window.addEventListener('scroll', ()=>{
            if(window.pageYOffset > 700){
                setIsAppeare(true);
            }
            });
    })
    return (
        <div className={styles["home-content"] + " row" +" justify-content-center"}>
            <div className={styles["home-content_left"] + " col-xl-4 col-lg-12" + ' '+ (isAppeared?styles["rightToLeft"]:'')}>
                <img src = {img} alt="" className = {styles["content-image"]}/>
            </div>
            <div className={styles["home-content_right"] + " col-xl-4 col-lg-12"  + ' '+ (isAppeared?styles["leftToRight"]:'')}>
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
        </div>
    );
};

export default HomeContent;