import React, { useContext, useEffect, useState } from 'react'
import AppHeader from './AppHeader'
import '../../Styles/TasksTab.css'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Button } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TodoContext } from '../../App';
import { ethers } from 'ethers';



const TasksTab = () => {

    const [todoArr, activeGroup, handleActiveGroupChange, ethersObj, contractObj, setIsProcessing, , setSnackbarProps] = useContext(TodoContext)
    const [tasks, setTasks] = useState([])

    const [disableButtons, setDisableButtons] = useState(false)

    const [progressData, setProgressData] = useState({
        finishedCount: 0,
        percentage: 0
    })


    useEffect(() => {
        if (activeGroup === null && todoArr.length > 0) {
            handleActiveGroupChange(todoArr[0].group, todoArr)
        } else {
            if (todoArr.length > 0) {
                let temp = []
                let finishedCount = 0
                activeGroup.data.map((data) => {

                    if (!data.isDeleted) {
                        temp.push({
                            name: data.task,
                            isFinished: data.isFinished,
                            deadline: data.deadline,
                            id: ethers.utils.formatUnits(data.id, 0)
                        })
                        if (data.isFinished) {
                            finishedCount++
                        }
                    }
                })

                if (temp.length > 0) {
                    setProgressData({
                        finishedCount: finishedCount,
                        percentage: ((finishedCount / temp.length) * 100).toFixed()

                    })
                } else {
                    setProgressData({
                        finishedCount: 0,
                        percentage: 0
                    })
                }

                setTasks(temp.reverse());
            }

        }

    }, [activeGroup, todoArr])

    const modify = async (id, action) => {
        try {
            setDisableButtons(true)
            const Signer = contractObj.connect(ethersObj.signer)
            setIsProcessing(true)
            if (action === 'finished') {
                await Signer.setIsFinished(id)
                setDisableButtons(false)
                setSnackbarProps({
                    open: true,
                    messgae: "Setting to 'Finished' ..."
                })
            } else {
                await Signer.setIsDeleted(id)
                setDisableButtons(false)
                setSnackbarProps({
                    open: true,
                    messgae: 'Deleting Todo ...'
                })
            }
        } catch (error) {
            console.log(error);
            setIsProcessing(false)
            setDisableButtons(false)
        }
    }



    return (
        <div className='wrapper_tab' >
            <AppHeader headingText={['Your', 'Tasks']} />

            {
                activeGroup !== null && todoArr.length > 0 ? <div className='tasks_wraper' >

                    <div className='tasks_heading' >

                        <div className='progressbar_container' style={{
                            width: 70,
                            height: 70,
                            marginRight: '1rem'
                        }} >
                            <CircularProgressbar value={progressData.percentage} text={`${progressData.percentage}%`} />
                        </div>

                        <div>
                            <h3>{activeGroup.name}</h3>
                            <p>{progressData.finishedCount} of {tasks.length} Completed </p>
                        </div>
                    </div>

                    <div className='tasks_container' >

                        {
                            tasks.length > 0 ? tasks.map((taskItem, index) => <div className='tasks_container-task' key={index} >


                                {
                                    taskItem.isFinished ? <CheckCircleRoundedIcon
                                        fontSize='small'
                                        style={{
                                            marginRight: 4,
                                            color: 'green',
                                        }}
                                        className='tasks_container-icon'
                                    /> : <CircleOutlinedIcon
                                        fontSize='small'
                                        style={{
                                            marginRight: 4,
                                            color: 'gray',

                                        }}
                                        className='tasks_container-icon'
                                    />
                                }

                                <div className='tasks_container_task-content' >

                                    <p>{taskItem.name}</p>

                                    <span className='task_content_option-deadline' >{taskItem.deadline}</span>

                                    <div className='task_content-options'>

                                        {
                                            !taskItem.isFinished ? <Button
                                                className='task_content_optio-finished'
                                                size='small'
                                                disabled={disableButtons}
                                                onClick={() => modify(taskItem.id, 'finished')

                                                }
                                            >Finished</Button> : <></>
                                        }

                                        <Button
                                            className='task_content_optio-delete'
                                            size='small'
                                            disabled={disableButtons}
                                            onClick={() => modify(taskItem.id, 'delete')

                                            } >Delete</Button>


                                    </div>


                                </div>

                            </div>) : <></>
                        }


                    </div>


                </div> : <div className='notodos_box'>
                        <h3>Please add a few tasks.</h3>
                </div>
            }


        </div>
    )
}

export default TasksTab