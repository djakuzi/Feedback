import { useEffect, useRef, useState, useLayoutEffect } from "react"
import FeedbackCard from "../FeedbackCard/FeedbackCard"
import styles from "./FeedbackMenu.module.css"
import { useInView } from 'react-intersection-observer';


export default function FeedbackMenu({feedback, filter,saveHeight, saveScrollFeedback, hooks}){

    const [openMore, setOpenMore] = useState(false)

    const feedbackMenu = useRef()
   

    useEffect(() =>{

        changeResizeScrollFeedback(feedbackMenu.current,saveScrollFeedback)

        if (saveScrollFeedback == null ) deleteSaveScrollFeedback(hooks.setSaveScrollFeedback)
        
        if (saveHeight) feedbackMenu.current.style.height = saveHeight + 'px'

        if (document.body.offsetWidth <= 1300 ) setOpenMore(true)
        
        feedbackMenu.current.addEventListener('mouseenter', ()=> {
            if (document.body.offsetWidth > 1300 ) document.body.style.overflow = 'hidden'
        })

        feedbackMenu.current.addEventListener('mouseleave', ()=> {
             document.body.style.overflow = 'visible'
        })

        window.addEventListener('resize', function() {

            const bodyWidth = document.body.offsetWidth

            changeStandartHeightFeedbackMenu(bodyWidth, feedbackMenu.current, setOpenMore, hooks.setSaveHeight)
        })

    }, [])

    
    useEffect( ()=>{
        // feedbackMenu.current.scrollTop = saveScrollFeedback
        changeResizeScrollFeedback(feedbackMenu.current,saveScrollFeedback)
        deleteSaveScrollFeedback(hooks.setSaveScrollFeedback)
        const bodyWidth = document.body.offsetWidth
        if(saveHeight == null) changeStandartHeightFeedbackMenu(bodyWidth, feedbackMenu.current, setOpenMore, hooks.setSaveHeight)
    },[filter])

    const handlerSeeMore = () =>{

        let quantityCards = feedbackMenu.current.children.length
        
        let bodyWidth = document.body.offsetWidth

        calculatorHeightFeedbackMenu(bodyWidth, quantityCards, feedbackMenu.current, setOpenMore, hooks.setSaveHeight)

    }

    return (
        <div className={styles['box']}>

            <div ref={feedbackMenu} className={styles['feedbackMenu']}>
                {feedback.filter( (el) => ( filter == "all" || filter == "rateBig" || filter == "rateSmall") ? true : el.sort == filter)
                .sort((a,b)=> ( filter == "rateBig") ? (b.rate - a.rate): (filter == "rateSmall") ? (  a.rate - b.rate) : null)
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
                        setFeedbackDetails={hooks.setFeedbackDetails}
                        setOpen={hooks.setOpen}
                        setSaveScrollFeedback={hooks.setSaveScrollFeedback}
                        refFeedbackMenu={feedbackMenu}
                    />)
                }
            
            </div>

            <div className={styles["moreOpen"]}>Всего отзывов {feedback.length} { openMore  && <span onClick={() => handlerSeeMore()}>Показать еще</span>} </div>

        </div>
        
    )
}
// /function/ 

//функция которая вычиляет размер feedbackMenu при нажатии на 'показать еще', чтобы показать еще отзывов
function calculatorHeightFeedbackMenu(bodyWidth, quantityCards, feedbackMenu, setOpenMore, setSaveHeight){ 

    let heightRows
    let min
    let max

    if(bodyWidth <= 1300 && bodyWidth > 900){
            heightRows = 330
            min = 660
            max = Math.ceil(quantityCards/3) * heightRows

    }

    if(bodyWidth <= 900 && bodyWidth > 560){

        heightRows = 250
        min = 750
        max = Math.ceil(quantityCards/2) * heightRows
    }

    if(bodyWidth <= 560){

        heightRows = 230
        min = 690
        max = Math.ceil(quantityCards/1) * heightRows
        
    }

    feedbackMenu.style.height = feedbackMenu.offsetHeight + min + 'px'

    if(feedbackMenu.offsetHeight > max) {
        feedbackMenu.style.height = max + 'px'
        setOpenMore(false)
    }

    if (feedbackMenu.offsetHeight < max){
        setOpenMore(true)
    }

    setSaveHeight(parseInt(window.getComputedStyle(feedbackMenu).height))
}

function changeStandartHeightFeedbackMenu(bodyWidth, feedbackMenu, setOpenMore, setSaveHeight){


    setSaveHeight(null)

     if (bodyWidth > 1300) {
        setOpenMore(false)
        feedbackMenu.style.height = 660 + 'px'// когда экран больше 1300 px то меню отзывов overflow = hidden, поэтому возвращаем до стандартных размеров height
    }

    if (bodyWidth <= 1300 ) {
        document.body.style.overflow = 'visible'
        setOpenMore(true)
        feedbackMenu.style.height = 660 + 'px'
    }

    if (bodyWidth <= 900){
        feedbackMenu.style.height = 750 + 'px'
    }

    if (bodyWidth <= 560){
        feedbackMenu.style.height = 690 + 'px'
    }


} 

//удаляет рамзер скролла для чтобы feddbackMenu был показан сначала
function deleteSaveScrollFeedback(setSaveScrollFeedback){
    setSaveScrollFeedback(null)
}

//показывает пользователю отзыв позле закрытия более подробной информации этого же отзыва(вычисляет какой размер скролла нужен)
function changeResizeScrollFeedback(feedbackMenu,saveScrollFeedback){
    if(document.body.offsetWidth > 1300) feedbackMenu.scrollTop = saveScrollFeedback
    if(document.body.offsetWidth <= 1300) {
        console.log(saveScrollFeedback)

        if(saveScrollFeedback !== null) { // здесь используется setTimeout так как при рендере страница польностью не загружается, поэтому проккрутку нужно вызвать когда все элементы загрузились
            window.scrollTo({
                top: saveScrollFeedback,
                left: 0,
                behavior: "smooth"
            })
           
            console.log('res')
        }
        // window.scrollTo(saveScrollFeedback,0)
    }
}