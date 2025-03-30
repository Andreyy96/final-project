import css from "./ModalWindow.module.css"
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {createManagerValidator} from "../../../validators/userValidator.ts";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {useState} from "react";
import {authActions} from "../../../store/slices/authSlice.ts";
import {ICreateManager} from "../../../interfaces/user.interface.ts";

const ModalWindow = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ICreateManager>({
        mode: "onSubmit",
        resolver: joiResolver(createManagerValidator)
    });

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        reset()
        setOpen(false)
    };
    const dispatch = useAppDispatch()

    const createManager:SubmitHandler<ICreateManager> = async (body) => {
        await dispatch(authActions.signUpManager({body}))
        handleClose()
    }


    return (
        <div>
            <button className={css.button_create} onClick={handleOpen}>CREATE</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={css.box}>
                    <form onSubmit={handleSubmit(createManager)}>
                        <div>
                            <label className={css.form_item}>Email
                                <input className={errors.email && css.border_red} type="text"
                                       placeholder={'Email'} {...register('email')}/>
                                {errors.email && <p>{errors.email.message}</p>}
                            </label>
                        </div>

                        <div>
                            <label className={css.form_item}>Name
                                <input className={errors.name && css.border_red} type="text" placeholder={'Name'} {...register('name')}/>
                                {errors.name && <p>{errors.name.message}</p>}
                            </label>
                        </div>

                        <div>
                            <label className={css.form_item}>Surname
                                <input className={errors.surname && css.border_red} type="text" placeholder={'Surname'} {...register('surname')}/>
                                {errors.surname && <p>{errors.surname.message}</p>}
                            </label>
                        </div>

                        <div className={css.button_container}>
                            <button className={css.button_item} onClick={handleClose}>CANCEL</button>
                            <button className={css.button_item}>CREATE</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export {ModalWindow};
