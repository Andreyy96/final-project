import {IManagerInfo} from "./user.interface.ts";
import {IComment} from "./comment.interface.ts";

export interface IOrder {
	_id: string;
	id: number;
	name?: string;
	surname?: string;
	email?: string;
	phone?: string;
	age?: number;
	course?: string;
	course_format?: string;
	course_type?: string;
	sum?: number;
	already_paid?: number;
	group?: string;
	status?: string;
	msg?: string;
	utm?: string;
	created_at: string;
	manager?: string;
	manager_info?: IManagerInfo;
	comments?: IComment[];
}

export interface IOrderPagination {
	data: IOrder[];
	"page": number,
	"total": number,
	"limit": number
}

export interface ISortOrder {
	sortById: () => void
	sortByName: () => void
	sortBySurname: () => void
	sortByEmail: () => void
	sortByPhone: () => void
	sortByAge: () => void
	sortByCourse: () => void
	sortByCourseFormat: () => void
	sortByCourseType: () => void
	sortBySum: () => void
	sortByStatus: () => void
	sortByAlreadyPaid: () => void
	sortByGroup: () => void
	sortByCreatedAt: () => void
	sortByManager: () => void
}

export interface IQueryFilterOrder {
	name?: string
	surname?: string
	email?: string
	phone?: string
	age?: string
	course?: string
	course_format?: string
	course_type?: string
	status?: string
	group?: string
	start_date?: string
	end_date?: string
	manager?: boolean
}