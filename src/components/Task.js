import React, { useState, useCallback } from 'react'
import { MdModeEditOutline, MdDelete, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { IoIosCheckbox } from 'react-icons/io';
import {useForm} from "react-hook-form";

export const Task = ({data, removeTask, editTask, doneTask}) => {

    const [edit, setEdit] = useState(false);
    const [checkBoxStatus, setCheckBoxStatus] = useState(false);

    const {id, name, description, status} = data

    const { register, handleSubmit, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
            task: name,
            description: description
        }
    })

    const onSubmit = useCallback( data => {
        editTask(id, data)
        setEdit(false)
        reset()
    }, [editTask, id, reset])


    const statusHandler = useCallback( () => {
        setCheckBoxStatus(!checkBoxStatus)
        doneTask(id)
    }, [doneTask, id, checkBoxStatus])

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center bg-[#fc5e63] p-4 justify-between items-cente mb-1">


                <div className="flex flex-col">
                    {
                        edit
                        ?
                        <input
                            placeholder="New task" {...register("task", { required: true, maxLength: 20 })}
                            className="shadow appearance-none border w-full pb-0.5 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mb-0.5 bg-[#fc5e63] text-white"
                        />
                        :
                        <span className={`text-white ${status === 1 ? "" : "line-through"}`}>{name}</span>
                    }
                    {
                        edit
                        ?
                        <input
                            placeholder="New task" {...register("description", { required: true, maxLength: 200 })}
                            className="shadow appearance-none border w-full pb-0.5 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-[#fc5e63] text-white"
                        />
                        :
                        <span className="text-white text-xs">{description}</span>
                    }

                </div>

                <div>
                    {
                        edit
                        ?
                            <button className="bg-[#fc5e63] border border-white mx-auto hover:bg-[#ff777c] text-white text-sm font-bold py-2 px-4 focus:outline-none focus:shadow-outline">save</button>
                        :
                            <>
                                <button className="px-1 text-white">
                                    { checkBoxStatus
                                        ?
                                        <IoIosCheckbox onClick={statusHandler} size={16} />
                                        :
                                        <MdCheckBoxOutlineBlank onClick={statusHandler} size={16} />
                                    }
                                </button>
                                <button className="px-1 text-white"><MdModeEditOutline onClick={() => setEdit(true)} size={16} /></button>
                                <button className="px-1 text-white"><MdDelete onClick={() => removeTask(id)} size={16} /></button>
                            </>
                    }


                </div>

        </form>

    )

}
