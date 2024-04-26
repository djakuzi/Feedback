import { useEffect, useRef, useState, forwardRef} from "react"
import styles from "./FeedbackCard.module.css"
import feedbackIMG from "../../../public/img/feedback.png"
import rateIMG from "../../../public/img/rate.png"
import { useInView } from 'react-intersection-observer';
import cn from 'classnames'

// {id,sort, data, rate, name, link, site, product, enter, open, setFeedbackDetails, setOpen, ref}
export default function FeedbackCard(props){

    const [txtLink, setTxtLink] = useState(props.site)
    let {...details} = props // (id,sort, data, rate, name, link, site, product, enter, open}

    const { ref, inView} = useInView({
        threshold: 0.3,
        // triggerOnce: true, 
    })
 
    useEffect( ()=> {changeTxt(props.link) }, [])

    //убирает http// or https// в ссылке на сайт, чтобы сделать более красивый текст ссылки
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

    const handleClick = (e) =>{
        if(e.target.tagName != 'A'){
            props.setFeedbackDetails(details) // change
            props.setOpen(true) // change 

            calculatorSaveScrollFeedback(e,props.setSaveScrollFeedback,props.refFeedbackMenu.current)
        }
        
    }

    return(
        <div ref={ref}  onClick={(e)=> handleClick(e)} className={cn(styles["feedbackCard"], {
            [styles['active']]: inView,
        })}>
            <div  className={styles['feedbackCard__inner']}> 
                <img loading='lazy' src={feedbackIMG} alt="" />
                {props.data}
                <a href={props.link + ""} target="_blank">{txtLink + ""} </a>
            </div>

            <div className={styles['product']}>{props.product}</div>
            <div className={styles['name']}>{props.name}</div>

            <div className={styles['rate']}>
                {Array(props.rate).fill(0).map( (el,i) => <img key={i+'img'+ props.id} src={rateIMG} alt="" />)}
            </div>

            <p className={styles['enter']}>{props.enter}</p>

            <div className={styles['shadow']}></div>
        </div>
    )
}
function  calculatorSaveScrollFeedback(e,setSaveScrollFeedback,refFeedbackMenu) {
    if(document.body.offsetWidth > 1300) setSaveScrollFeedback(refFeedbackMenu.scrollTop)
    if(document.body.offsetWidth <= 1300) {
        // console.log(window.pageYOffset)
        setSaveScrollFeedback(window.scrollY)
        
    }
    
}
