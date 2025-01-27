import Joi from "joi";


import {ListOrderByEnum} from "../enums/orderBy.enum";

export class OrderValidator {

    public static listQuery = Joi.object({
        page: Joi.number().min(1).default(1),
        order: Joi.string().valid(...Object.values(ListOrderByEnum)),
    });
}