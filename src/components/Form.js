import React, {useCallback} from "react"
import { useForm } from "react-hook-form"

export const Form = ({addTask}) => {

    const { register, handleSubmit, reset } = useForm()


    const onSubmit = useCallback( data => {
        addTask(data)
        reset()
    }, [addTask, reset])

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="my-4 text-center">
                <input placeholder="New task" {...register("task", { required: true, maxLength: 20 })} className="shadow appearance-none border w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mb-2" />
                <input placeholder="Description" {...register("description", { required: true, maxLength: 200 })} className="shadow appearance-none border w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline mb-2" />

                <button type="submit" className="bg-[#fc5e63] border border-white mx-auto hover:bg-[#ff777c] text-white text-sm font-bold py-2 px-4 focus:outline-none focus:shadow-outline">Add task</button>
            </div>



        </form>
    )

}
