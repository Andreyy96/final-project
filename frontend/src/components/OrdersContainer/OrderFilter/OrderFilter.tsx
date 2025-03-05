import {SubmitHandler, useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {IQueryFilterOrder} from "../../../interfaces/order.interface.ts";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {authActions} from "../../../store/slices/authSlice.ts";
import {Replay} from "@mui/icons-material";
import css from "./OrderFilter.module.css"

const OrderFilter = () => {
    const {register, handleSubmit, setValue, reset} = useForm<IQueryFilterOrder>({
        mode: "onBlur",
    });
    const [startTrigger, setStartTrigger] = useState<boolean>(false)
    const [endTrigger, setEndTrigger] = useState<boolean>(false)

    const {currentUser} = useAppSelector(state => state.auth)
    const [query, setQuery] = useSearchParams();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (query.get("name")) {
            setValue("name", query.get("name"))
        }
        if (query.get("surname")) {
            setValue("surname", query.get("surname"))
        }
        if (query.get("email")) {
            setValue("email", query.get("email"))
        }
        if (query.get("phone")) {
            setValue("phone", query.get("phone"))
        }
        if (query.get("age")) {
            setValue("age", query.get("age"))
        }
        if (query.get("course")) {
            setValue("course", query.get("course"))
        }
        if (query.get("course_format")) {
            setValue("course_format", query.get("course_format"))
        }
        if (query.get("course_type")) {
            setValue("course_type", query.get("course_type"))
        }
        if (query.get("status")) {
            setValue("status", query.get("status"))
        }
        if (query.get("group")) {
            setValue("group", query.get("group"))
        }
        if (query.get("start_date")) {
            setValue("start_date", query.get("start_date"))
        }
        if (query.get("end_date")) {
            setValue("end_date", query.get("end_date"))
        }
        if (query.get("manager")) {
            setValue("manager", true)
        } else {
            setValue("manager", false)
        }
        dispatch(authActions.me())
    }, [dispatch, query, setValue]);

    const setQ:SubmitHandler<IQueryFilterOrder> = async (queries) => {
        for (const element in queries) {
            if (queries[element] && !queries[element].includes("all")) {
                setQuery(prev => {
                    prev.set(element, queries[element])
                    prev.delete("page")
                    return prev
                })
            }
            else {
                setQuery(prev => {
                    prev.delete(element)
                    return prev
                })
            }
        }
    }
    const resetTab = () => {
        reset()
        setQuery(prev => {
            prev.delete("name")
            prev.delete("surname")
            prev.delete("email")
            prev.delete("phone")
            prev.delete("age")
            prev.delete("course")
            prev.delete("course_format")
            prev.delete("course_type")
            prev.delete("status")
            prev.delete("group")
            prev.delete("start_date")
            prev.delete("end_date")
            prev.delete("order")
            prev.delete("manager")
            prev.delete("page")
            return prev
        })
    }

    return (
        <div>
            <form onChange={handleSubmit(setQ)}>
                <div>
                    <input type="text" placeholder={'name'} {...register('name')}/>
                    <input type="text" placeholder={'surname'} {...register('surname')}/>
                    <input type="text" placeholder={'email'} {...register('email')}/>
                    <input type="text" placeholder={'phone'} {...register('phone')}/>
                    <input type="text" placeholder={'age'} {...register('age')}/>
                    <select name="course" {...register("course")}>
                        <option value="">all courses</option>
                        <option value="FS">FS</option>
                        <option value="QACX">QACX</option>
                        <option value="JCX">JCX</option>
                        <option value="JSCX">JSCX</option>
                        <option value="FE">FE</option>
                        <option value="PCX">PCX</option>
                    </select>
                    <select name="course_format" {...register("course_format")}>
                        <option value="">all formats</option>
                        <option value="static">static</option>
                        <option value="online">online</option>
                    </select>
                    <select name="course_type" {...register("course_type")}>
                        <option value="">all types</option>
                        <option value="pro">pro</option>
                        <option value="minimal">minimal</option>
                        <option value="premium">premium</option>
                        <option value="incubator">incubator</option>
                        <option value="vip">vip</option>
                    </select>
                    <select name="status" {...register("status")}>
                        <option value="">all statuses</option>
                        <option value="In work">In work</option>
                        <option value="New">New</option>
                        <option value="Agree">Agree</option>
                        <option value="Disagree">Disagree</option>
                        <option value="Dubbing">Dubbing</option>
                    </select>
                    <select name="gropes" {...register("group")}>
                        <option value="">all groups</option>
                    </select>
                    <input type={startTrigger ? "date" : "text"} onClick={() => setStartTrigger(true)} placeholder={'start_date'} {...register('start_date')}/>
                    <input type={endTrigger ? "date" : "text"} onClick={() => setEndTrigger(true)} placeholder={'end_date'} {...register('end_date')}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value={currentUser && currentUser.name || ""} {...register('manager')}/>
                        My
                    </label>
                    <button formAction={resetTab}><Replay className={css.svg_reload}/></button>
                </div>
            </form>
        </div>
    );
};

export {OrderFilter};