import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {schemaForSetPassword} from "../../validators/userValidator.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {authActions} from "../../store/slices/authSlice.ts";
import css from "./RecoveryPasswordForm.module.css";
import {IPassword} from "../../interfaces/password.interface.ts";

const RecoveryPasswordForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<IPassword>({
        mode: "onSubmit",
        resolver: joiResolver(schemaForSetPassword)
    });
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {passwordError} = useAppSelector(state => state.auth)

    const {actionToken} = useParams<string>()

    const recoveryPassword:SubmitHandler<IPassword> = async (body) => {
        const {meta: {requestStatus}} = await dispatch(authActions.recoveryPassword({actionToken, body}))
        if (requestStatus === 'fulfilled'){
            navigate('/login')
        }
    }

    return (
        <div className={css.recoveryPasswordPage}>
            <form className={css.recoveryPasswordForm} onSubmit={handleSubmit(recoveryPassword)}>
                <label htmlFor={"password"}>Password</label>
                <input className={errors.password && css.redBorder} id={"password"} type="password" placeholder={'password'} {...register('password')}/>

                {errors.password && <p>{errors.password.message}</p>}
                <label htmlFor={"confirm_password"}>Confirm password</label>
                <input className={(errors.confirm_password || passwordError) && css.redBorder} id={"confirm_password"} type="password" placeholder={'confirm_password'} {...register('confirm_password')}/>

                {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
                {passwordError && <p>{passwordError}</p>}
                <button>Confirm</button>
            </form>
        </div>
    );
};

export {RecoveryPasswordForm};
