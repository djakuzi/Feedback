import { useEffect, useState } from "react"
import styles from "./FeedbackCard.module.css"
import feedbackIMG from "../../../public/img/feedback.png"
import rateIMG from "../../../public/img/rate.png"

export default function FeedbackCard({id,sort, data, rate, name, link, site, product, enter, open, setFeedbackDetails, setOpen}){

    const [txtLink, setTxtLink] = useState(site)
    let {...details} = {id,sort, data, rate, name, link, site, product, enter, open,}

 
    useEffect( ()=>{

        changeTxt(link)

    }, [])

    function changeTxt(link){
        let count = 0
        let txt = ''

        for(let i = 0; i <= link.length - 1; i++){

            if (link[i] == '/' && count <= 2){
                count += 1
                if( count == 2){
                    continue
                }
            }

            if(count >= 2){
                txt += link[i]
            }

        }

        setTxtLink(txt)
    }

    const handleClick = () =>{
        setFeedbackDetails(details)
        setOpen(true)
        console.log(details)
    }
    

    return(
        <div onClick={()=> handleClick()} className={styles["feedbackCard"]}>

            <div className={styles['feedbackCard__inner']}> 
            <img src={feedbackIMG} alt="" />
            {data}
            <a href={link + ""} >{txtLink + ""}</a>
            </div>

            <div className={styles['product']}>{product}</div>
            <div className={styles['name']}>{name}</div>

            <div className={styles['rate']}>
                {Array(rate).fill(0).map( el => <img src={rateIMG} alt="" />)}
            </div>

            <p className={styles['enter']}>{enter}</p>

            <div className={styles['shadow']}></div>
        </div>
    )
}