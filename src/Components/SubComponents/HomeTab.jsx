import React, { useEffect, useState, useContext } from 'react'
import AppHeader from './AppHeader'
import '../../Styles/HomeTab.css'
import { Button } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { TodoContext } from '../../App';
import { ethers } from 'ethers';
const HomeTab = () => {

    const [taskInputData, setTaskInputData] = useState({
        task: '',
        group: '',
        deadline: ''
    })
    const [groups, setGroups] = useState([])
    const [formattedTodoArray, setFormattedTodoArray] = useState(null)

    const [todoArr, , handleActiveGroupChange, ethersObj, contractObj, setIsProcessing, isProcessing, setSnackbarProps] = useContext(TodoContext)

    const [isAddDisabled, setIsAddDisabled] = useState(false)

    useEffect(() => {
        if (isProcessing) {
            setIsAddDisabled(true)
        } else {
            setIsAddDisabled(false)
        }
    }, [isProcessing])


    const handleAddSubmit = async (event) => {
        event.preventDefault()

        try {
            setSnackbarProps({
                open: true,
                messgae: 'Adding Task...'
            })
            const Signer = contractObj.connect(ethersObj.signer)
            setIsProcessing(true)
            await Signer.addTodos(taskInputData.task, taskInputData.group, taskInputData.deadline)

        } catch (error) {
            setSnackbarProps({
                open: true,
                messgae: 'Unsuccessful. Please Try Again.'
            })
            setIsAddDisabled(false)

        }

    }



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
            let temp = []
            let finishedCount = 0
            todoArr.map((item) => {
                if (group == item.group && !item.isDeleted) {
                    temp.push({
                        task: item.task,
                        isFinished: item.isFinished,
                        isDeleted: item.isDeleted,
                        id: ethers.utils.formatUnits(item.id, 0)

                    })
                    if (item.isFinished) {
                        finishedCount++
                    }

                }
            })
            tempTodos.push({
                group: group,
                tasks: temp.reverse(),
                finishedCount: finishedCount
            })
        })
        setFormattedTodoArray(tempTodos)

    }, [todoArr])




    return (
        <div className='wrapper_tab' >

            <AppHeader headingText={['Add', 'Tasks']} />

            <form action="" onSubmit={handleAddSubmit} className='addTask_form' >

                <input
                    type="text"
                    className='addTask_form-task'
                    required
                    placeholder='New Task'
                    autoFocus
                    onChange={(e) => setTaskInputData({ ...taskInputData, task: e.target.value })}
                    value={taskInputData.task}
                />
                <div>
                    <input
                        type="text"
                        className='addTask_form-group'
                        placeholder='Group'
                        onChange={(e) => setTaskInputData({ ...taskInputData, group: e.target.value })}
                        value={taskInputData.group}
                    />
                    <input
                        type="text"
                        className='addTask_form-deadline'
                        placeholder='Deadline'
                        onChange={(e) => setTaskInputData({ ...taskInputData, deadline: e.target.value })}
                        value={taskInputData.deadline}
                    />
                </div>

                <Button
                    variant='contained'
                    type='submit'
                    className='addTask_from-button'
                    disabled={isAddDisabled}
                >Add</Button>


            </form>

            {
                todoArr.length ? <><div className='groups-wrapper' >

                    <h3>Task Groups</h3>

                    <div className='groups-container' >


                        

                        {
                            groups.map((group, index) => {

                                return ((formattedTodoArray[index].finishedCount/formattedTodoArray[index].tasks.length)*100).toString() !== 'NaN' ? <div
                                    className='group'
                                    onClick={() => handleActiveGroupChange(group, todoArr)}
                                    key={index}
                                >


                                    <p className='group-name' > {group} </p>
                                    <p className='group-progress' >{formattedTodoArray[index].finishedCount} of {formattedTodoArray[index].tasks.length} </p>

                                    <div className='group-tasks' >


                                        {
                                            formattedTodoArray ? formattedTodoArray[index].tasks.map((taskItem, index) => {
                                                if (!taskItem.isDeleted && index < 3) {
                                                    return <div>

                                                        {
                                                            !taskItem.isFinished ? <CircleOutlinedIcon
                                                                fontSize='10'
                                                                style={{
                                                                    marginRight: 4,
                                                                    marginLeft: 1,
                                                                    color: 'white'
                                                                }}
                                                            /> : <CheckCircleRoundedIcon
                                                                fontSize='10'
                                                                style={{
                                                                    marginRight: 4,
                                                                    color: 'rgb(6, 172, 6)'
                                                                }}
                                                            />
                                                        }

                                                        <p>{taskItem.task.length > 14 ? taskItem.task.slice(0, 13) + '...' : taskItem.task}</p>
                                                    </div>
                                                }
                                            }) : ''
                                        }
                                    </div>


                                </div> : null
                            })
                        }





                    </div>


                </div></> : <div className='no_todos' > <h3>
                    You have no todos.
                </h3> </div>
            }

        </div >
    )
}

export default HomeTab