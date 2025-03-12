import {FC, useState} from 'react';
import {IOrder} from "../../../interfaces/order.interface.ts";
import css from "./Order.module.css"
import {SubmitHandler, useForm} from "react-hook-form";
import {OrderComment} from "../OrderComment/OrderComment.tsx";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {commentActions} from "../../../store/slices/commentSlice.ts";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {ModalWindow} from "../ModalWindow/ModalWindow.tsx";

interface IProps {
    order: IOrder
    index: number
}

const Order: FC<IProps> = ({order, index}) => {
    const [trigger, setTrigger] = useState<boolean>(false)
    const {register, handleSubmit, reset} = useForm<{comment: string}>()
    const dispatch = useAppDispatch()
    const res = (index % 2) === 0
    const {currentUser} = useAppSelector(state => state.auth)

    const sendComment:SubmitHandler<{comment: string}> = ({comment}) =>  {
        reset()
        dispatch(commentActions.postComment({dto: {body: comment}, id: order._id}))

    }

    return (
        <>
        <tr className={!res ? css.white : css.gray} onClick={() => setTrigger(!trigger)}>
            <th>{order.id}</th>
            <th>{order.name ? order.name : "null"}</th>
            <th>{order.surname ? order.surname : "null"}</th>
            <th>{order.email ? order.email : "null"}</th>
            <th>{order.phone ? order.phone : "null"}</th>
            <th>{order.age ? order.age : "null"}</th>
            <th>{order.course ? order.course : "null"}</th>
            <th>{order.course_format ? order.course_format : "null"}</th>
            <th>{order.course_type ? order.course_type : "null"}</th>
            <th>{order.status ? order.status : "null"}</th>
            <th>{order.sum ? order.sum : "null"}</th>
            <th>{order.already_paid ? order.already_paid : "null"}</th>
            <th>{order.group ? order.group : "null"}</th>
            <th>{order.created_at ? order.created_at : "null"}</th>
            <th>{order.manager ? order.manager : "null"}</th>
        </tr>
            {trigger && <tr className={css.tr}>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    <p className={css.message}>Message: {order.msg ? order.msg : "null"}</p>
                    <p className={css.utm}>UTM: {order.utm ? order.utm : "null"}</p>
                </th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    {order.comments &&
                        <div className={css.commentsDiv}>
                            {order.comments.map((comment, index) => <OrderComment key={comment._id} comment={comment}
                                                                                  index={index}/>)}
                        </div>
                    }
                </th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    <form onSubmit={handleSubmit(sendComment)} className={css.form}>
                        <input className={css.input} type={"text"} placeholder={"Comment"} {...register("comment")}/>
                        <button className={css.submit} disabled={currentUser._id !== order.manager_info?._id && order.manager !== null}>SUBMIT</button>
                    </form>
                </th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}></th>
                <th className={res ? css.divContainerGray : css.divContainerWhite}>
                    <ModalWindow order={order}/>
                </th>
            </tr>}
        </>
    )
};

export {Order};