import styles from "./Select.module.css"
import cn from 'classnames'
import {useRef, useState} from 'react'


export default function Select({setFilter}){

    const [isValid, setIsValid] = useState(false) // open or cancel CUSTOM SELECT
    const [valueSelect, setValueSelect] = useState('ВСЕ ОТЗЫВЫ') // set value CUSTOM SELECT
    const [coordSelect, setCoordSelect] = useState({}) // coord for positiom absolute opening SELECT 
    const select = useRef() // help for coordSelect
    const but = useRef() // help for coordSelect


    const goBut = (e) => {
        e.preventDefault()
        checkSize()
        setIsValid(!isValid)
      
    }

    function checkSize(){
        let cdSl = select.current.getBoundingClientRect()
        let cdBtn = but.current.getBoundingClientRect()
        setCoordSelect({
            width: getComputedStyle(select.current).width,
            position: "absolute",
            top: cdBtn.top + window.pageYOffset + "px",
            left: cdSl.left + window.pageXOffset +  "px"
        })
  
    }

    const sort = (e) => {
        setFilter(e.target.dataset.sort)
        setIsValid(!isValid)
        setValueSelect(e.target.textContent)
    }
    

    return(
        <div ref={select} style={ isValid ? coordSelect : {}}  className={styles["select"]}>
            <div ref={but}  onClick={(e)=>goBut(e)} className={cn(styles['select__button'], {
            [styles['openButton']]: isValid,
          })}>{valueSelect}</div>

            <ul  className={cn(styles['select__ul'], {
            [styles['openUl']]: isValid,
          })}>
                <li onPointerDown={(e)=> sort(e)} data-sort="all">все отзывы</li>
                <li onPointerDown={(e)=> sort(e)} data-sort="rate">по рейтингу</li>
                <li onPointerDown={(e)=> sort(e)}  data-sort="site">разработка</li>
                <li onPointerDown={(e)=> sort(e)}  data-sort="promotion">продвижение</li>
                <li onPointerDown={(e)=> sort(e)}  data-sort="ad">реклама</li>
                <li onPointerDown={(e)=> sort(e)}  data-sort="help">поддержка</li>
                <li onPointerDown={(e)=> sort(e)}  data-sort="market">маркетплейсы</li>
            </ul>
        </div>
    )
}