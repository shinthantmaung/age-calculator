import React from 'react'
import moment from 'moment'

function App() {

  const[day, setDay] = React.useState(null)
  const[month, setMonth] = React.useState(null)
  const[year, setYear] = React.useState(null)
  const[dayError,setDayError] = React.useState(false)
  const[monthError,setMonthError] = React.useState(false)
  const[yearError,setYearError] = React.useState(false)
  const[dateError,setDateError] = React.useState(false)
  const[errorStyle, setErrorStyle] = React.useState(false)
  const[age, setAge] = React.useState(null)
  const [ageStored, setAgeStored] = React.useState(false)
  

  function handleDayChange(e){
    const rawInput = e.target.value
    const filteredInput = rawInput.replace(/\D/g,'')
    setDay(filteredInput)
    
  }

  function handleMonthChange(e){
    const rawInput = e.target.value
    let filteredInput = rawInput.replace(/\D/g,'')
    setMonth(filteredInput) 
  }

  function handleYearChange(e){
    const rawInput = e.target.value
    const filteredInput = rawInput.replace(/\D/g,'')
    setYear(filteredInput)
  }

  function dateValidation(day, month, year){
    const dateToTest = `${day}-${month}-${year}`
    const dateFormat = 'DD-MM-YYYY'
    const momentObj = moment(dateToTest, dateFormat)
    return momentObj.isValid()
  }

  function clickHandler(){
    
    // error detection starts
    let firstStageError = false
  
    setDayError(false)
    setMonthError(false)
    setYearError(false)
    setDateError(false)
    setErrorStyle(false)
  
    if (!(day>=1 && day<=31)){
      setDayError(true)
      setErrorStyle(true)
      firstStageError = true
    }
  
    if (!(month>=1 && month<=12)){
      setMonthError(true)
      setErrorStyle(true)
      firstStageError = true
    }
  
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    if (!(year >= 1 && year <= currentYear)){
      setYearError(true)
      setErrorStyle(true)
      firstStageError = true
    }
  
    if(!firstStageError){
      if(!dateValidation(day,month,year)){
        setDateError(true)
        setErrorStyle(true)
      }
      //error detection ends
      //calculating age begins
      else{
       const defaultMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
       const currentDate = new Date()
       let currentDay = currentDate.getDate()
       let currentMonth = currentDate.getMonth() + 1
       console.log(currentMonth)
       let currentYear = currentDate.getFullYear()
       if (day>currentDay){
        currentDay = currentDay + defaultMonths[month - 1]
        currentMonth = currentMonth - 1
       }

       if (month>currentMonth){
        currentMonth = currentMonth + 12
        currentYear = currentYear - 1
       }

       let ageDay = currentDay - day
       let ageMonth = currentMonth - month
       let ageYear = currentYear - year
       
       setAge({
        day : ageDay,
        month: ageMonth,
        year: ageYear
       })
       setAgeStored(true)
      }
    }
  }

  function restartor(){
    setAge(null)
    setDay('')
    setMonth('')
    setYear('')
    setAgeStored(false)
  }

  return (
    <div className="main-container">
      <div className="form-container">
        <form className="form-box">
          <label id={errorStyle ? "error-label" : undefined}>DAY</label>
          <input 
            type="text" 
            value={day} 
            onChange={handleDayChange}
            placeholder="DD"
            maxLength="2"
            id = {errorStyle ? "error-box" : undefined}
          />
          {dayError && <p className="error-message">Must be a valid day</p>}
          {dateError && <p className="error-message">Must be a valid date</p>}
        </form>
        <form className="form-box">
          <label id={errorStyle ? "error-label" : undefined}>MONTH</label>
          <input 
            type="text" 
            value={month} 
            onChange={handleMonthChange}
            placeholder="MM"
            maxLength="2"
             id = {errorStyle ? "error-box" : undefined}
          />
          {monthError && <p className="error-message">Must be a valid month</p>}
        </form>
        <form className="form-box">
          <label id={errorStyle ? "error-label" : undefined}>YEAR</label>
          <input 
            type="text" 
            value={year} 
            onChange={handleYearChange}
            placeholder="YYYY"
            maxLength="4"
            id = {errorStyle ? "error-box" : undefined}
          />
          {yearError && <p className="error-message">Must be in the past</p>}
        </form>
        <button onClick={ageStored ? restartor : clickHandler}>
          <img src="/images/icon-arrow.svg" alt="" />
        </button>
      </div>
      <h2 className="answer"><span>{ageStored ? age.year : "- -"}</span> years</h2>
      <h2 className="answer"><span>{ageStored ? age.month : "- -"}</span> months</h2>
      <h2 className="answer"><span>{ageStored ? age.day : "- -"}</span> days</h2>
    </div>
  )
}

export default App
