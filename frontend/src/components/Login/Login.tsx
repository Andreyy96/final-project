import {SubmitHandler, useForm} from "react-hook-form";

import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {authActions} from "../../store/slices/authSlice.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../../validators/userValidator.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import css from "./Login.module.css"


const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<{ email: string, password: string }>({
        mode: "onBlur",
        resolver: joiResolver(userValidator)
    });
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {loginError} = useAppSelector(state => state.auth)
    const [searchParams] = useSearchParams()
    const {isLoading} = useAppSelector(state => state.loading)
    const sessionExpiration = !!searchParams.get("sessionExpiration")


    const login:SubmitHandler<{ email: string, password: string }> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}))
        if (requestStatus==='fulfilled'){
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
                    <label htmlFor={"password"}>Password</label>
                {errors.password ?
                    <input className={`${css.redBorder}`} id={"password"} type="password" placeholder={'password'} {...register('password')}/>
                    :
                    <input id={"password"} type="password" placeholder={'password'} {...register('password')}/>
                }
                {errors.password && <p>{errors.password.message}</p>}
                {loginError && <p>{loginError}</p>}
                <button>{isLoading ? "LOADING..." : "LOGIN"}</button>
            </form>
        </div>
    );
};

export {Login};