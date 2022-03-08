import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../../App'
import AppHeader from './AppHeader'
import '../../Styles/StatisticsTab.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';


const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        fill: false,
        lineTension: 0.3,
        backgroundColor: "#32a852",
        borderColor: "#32a852",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#32a852',
        pointBackgroundColor: '#32a852',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'green',
        pointHoverBorderColor: '#32a852',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [2, 3, 1, 4, 5, 2, 8]

    }]
}

const options = {
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Progress - Last Week',
        },
    },

}

const StatisticsTab = () => {

    const [todoArr, activeGroup, handleActiveGroupChange, ethersObj, contractObj, setIsProcessing, isProcessing, setSnackbarProps] = useContext(TodoContext)

    const [groups, setGroups] = useState([])
    const [formattedTodoArray, setFormattedTodoArray] = useState(null)


    useEffect(() => {
        let groups = []
        todoArr.map((item) => {
            if (!groups.includes(item.group)) {
                groups.push(item.group)
            }
        })
        setGroups(groups)
        let tempTodos = []
        groups.map((group) => {
            let finishedCount = 0
            let taskCount = 0
            todoArr.map((item) => {
                if (group == item.group && !item.isDeleted) {
                    if (item.isFinished) {
                        finishedCount++
                    }
                    taskCount++
                }
            })
            tempTodos.push({
                group: group,
                finishedCount: finishedCount,
                taskCount: taskCount,
                percent: ((finishedCount / taskCount) * 100).toFixed()
            })
        })
        setFormattedTodoArray(tempTodos)

    }, [todoArr])

    console.log(formattedTodoArray);


    return (
        <div className='wrapper_tab'>
            <AppHeader headingText={['Your', 'Profile']} />

            {
                todoArr.length > 0 ? <div className='statistics_wrapper' >

                    <div className='chart_container' >
                        <Line data={data} options={options} height={150} />
                    </div>

                    <div className='statistics_wrapper-group_data' >
                        <div className='group_data-container' >
                            {
                                formattedTodoArray ? formattedTodoArray.map((item, index) => {
                                    return item.percent !== 'NaN' ? <div
                                        className='group_data-container-stats'
                                        key={index}
                                        onClick={() => handleActiveGroupChange(item.group, todoArr)}
                                    >
                                        <p className='group_data-container_name' >{item.group}</p>
                                        <div className='progressbar_container' style={{
                                            width: 85,
                                            height: 85,
                                        }} >
                                            <CircularProgressbar
                                                value={item.percent}
                                                text={`${item.percent}%`}
                                                styles={buildStyles({
                                                    rotation: 0,
                                                    strokeLinecap: 'round',
                                                    textSize: '18px',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: `rgba(62, 152, 199, ${item.percent / 50})`,

                                                    trailColor: '#d6d6d6',
                                                    backgroundColor: '#3e98c7',

                                                })}

                                            />
                                        </div>
                                        <p className='group_data-container_count' >{item.finishedCount} of {item.taskCount}</p>
                                    </div> : null

                                }) : <></>
                            }
                        </div>

                    </div>


                </div> : <div className='notodos_box'>
                        <h3>No Data to Show.</h3>
                </div>
            }


        </div>
    )
}

export default StatisticsTab


