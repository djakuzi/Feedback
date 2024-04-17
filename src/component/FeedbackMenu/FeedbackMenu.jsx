import { useEffect, useRef, useState } from "react"
import FeedbackCard from "../FeedbackCard/FeedbackCard"
import styles from "./FeedbackMenu.module.css"

function calculatorHeightFeedbackMenu(bodyWidth, quantityCards, feedbackMenu, setOpenMore){

     if(bodyWidth <= 1000 && bodyWidth >= 901){

            let heightRows = 330
            let min = 660
            let max = Math.ceil(quantityCards/3) * heightRows
            console.log(feedbackMenu.offsetHeight)
            
            feedbackMenu.style.height = feedbackMenu.offsetHeight + min + 'px'

            if(feedbackMenu.offsetHeight > max) {
                feedbackMenu.style.height = max + 'px'
                setOpenMore(false)
            }

            if (feedbackMenu.offsetHeight < max){
                setOpenMore(true)
            }

        }

    if(bodyWidth <= 900 && bodyWidth >= 561){

        let heightRows = 250
        let min = 750
        let max = Math.ceil(quantityCards/2) * heightRows
        
        feedbackMenu.style.height = feedbackMenu.offsetHeight + min + 'px'

        if(feedbackMenu.offsetHeight > max) {
            feedbackMenu.style.height = max + 'px'
            setOpenMore(false)
        }

        if (feedbackMenu.offsetHeight < max){
            setOpenMore(true)
        }
    }

    if(bodyWidth <= 560){

        let heightRows = 230
        let min = 690
        let max = Math.ceil(quantityCards/1) * heightRows
        console.log(feedbackMenu.offsetHeight)
        
        feedbackMenu.style.height = feedbackMenu.offsetHeight + min + 'px'

        if(feedbackMenu.offsetHeight > max) {
            feedbackMenu.style.height = max + 'px'
            setOpenMore(false)
        }

        if (feedbackMenu.offsetHeight < max){
            setOpenMore(true)
        }
    }
}

export default function FeedbackMenu({feedback, filter,setFeedbackDetails,setOpen}){

    const [openMore, setOpenMore] = useState(false)

    const feedbackMenu = useRef()
    

    useEffect(() =>{

        if (document.body.offsetWidth <= 1000 ) setOpenMore(true)
        
        feedbackMenu.current.addEventListener('mouseenter', ()=> {
            if (document.body.offsetWidth > 1000 ) document.body.style.overflow = 'hidden'
        })
        feedbackMenu.current.addEventListener('mouseleave', ()=> {
            if (document.body.offsetWidth > 1000 ) document.body.style.overflow = 'visible'
        })
    }, [])

    window.addEventListener('resize', function() {
            if (document.body.offsetWidth <= 1000 ) {
                setOpenMore(true)
            }
            if (document.body.offsetWidth > 1000) {
                setOpenMore(false)
                feedbackMenu.current.style.height = 660 + 'px'// когда экран больше 1000 px то меню отзывов overflow = hidden, поэтому возвращаем до стандартных размеров height
            }
    })


    const handlerSeeMore = () =>{

        let quantityCards = feedbackMenu.current.children.length
        
        let bodyWidth = document.body.offsetWidth

        calculatorHeightFeedbackMenu(bodyWidth, quantityCards, feedbackMenu.current, setOpenMore)

       
    }

    return (
        <div className={styles['box']}>

            <div ref={feedbackMenu} className={styles['feedbackMenu']}>
                {feedback.filter( (el) => ( filter == "all" || filter == "rate") ? true : el.sort == filter)
                .sort((a,b)=> ( filter == "rate") ? (b.rate - a.rate): null)
                .map( (el) => <FeedbackCard 
                        key={el.id} 
                        id={el.id} 
                        sort={el.sort}
                        data={el.data}
                        rate={el.rate}
                        name={el.name}
                        link={el.link}
                        site={el.site}
                        product={el.product}
                        enter={el.enter}
                        open={el.open}
                        setFeedbackDetails={setFeedbackDetails}
                        setOpen={setOpen}
                    />)
                }

            
            </div>

            <div className={styles["moreOpen"]}>Всего отзывов {feedback.length} { openMore  && <span onClick={() => handlerSeeMore()}>Показать еще</span>} </div>

        </div>
        
    )
}