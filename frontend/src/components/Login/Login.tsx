import {SubmitHandler, useForm} from "react-hook-form";

import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {authActions} from "../../store/slices/authSlice.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../../validators/userValidator.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import css from "./Login.module.css"
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<{ email: string, password: string }>({
        mode: "onBlur",
        resolver: joiResolver(userValidator)
    });
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {loginError} = useAppSelector(state => state.auth)
    const [searchParams] = useSearchParams()
    const {isLoading} = useAppSelector(state => state.loading)
    const sessionExpiration = !!searchParams.get("sessionExpiration")


    const login:SubmitHandler<{ email: string, password: string }> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}))
        if (requestStatus==='fulfilled'){
            setVisiblePassword(false)
            navigate('/orders')
        }
    }

    return (
        <div className={css.loginPage}>
            { sessionExpiration && <div className={css.sessionExpirationDiv}><p>Your session was expiration. Please login again</p></div>}
            <form className={css.loginForm} onSubmit={handleSubmit(login)}>
                <label htmlFor={"email"}>Email</label>
                {errors.email ?
                    <input className={`${css.redBorder}`} id={"email"} type="text"
                           placeholder={'email'} {...register('email')}/>
                    :
                    <input id={"email"} type="text" placeholder={'email'} {...register('email')}/>
                }
                {errors.email && <p>{errors.email.message}</p>}
                <label className={css.labelPassword} htmlFor={"password"}> Password
                {/*{errors.password ?*/}
                {/*    <input className={`${css.redBorder}`} id={"password"} type="password" placeholder={'password'} {...register('password')}/>*/}
                {/*    :*/}
                {/*    <input id={"password"} type="password" placeholder={'password'} {...register('password')}/>*/}
                {/*}*/}
                <input className={errors.password && css.redBorder} id={"password"} type={visiblePassword ? "text" : "password"} placeholder={'password'} {...register('password')}/>
                {visiblePassword ? <VisibilityOff onClick={() => setVisiblePassword(false)}/> :  <Visibility onClick={() => setVisiblePassword(true)}/>}
                </label>
                {errors.password && <p>{errors.password.message}</p>}
                {loginError && <p>{loginError}</p>}
                <button>{isLoading ? "LOADING..." : "LOGIN"}</button>
            </form>
        </div>
    );
};

export {Login};