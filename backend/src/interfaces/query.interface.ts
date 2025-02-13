import {CourseFormatEnum} from "../enums/course-format.enum";
import {CourseEnum} from "../enums/course.enum";
import {CourseTypeEnum} from "../enums/course-type.enum";
import {StatusEnum} from "../enums/status.enum";

export interface IQuery {
    page?: string
    order?: string
    name?: string
    surname?: string,
    email?: string,
    phone?: string,
    age?: string,
    course?: CourseEnum,
    course_format?: CourseFormatEnum,
    course_type?: CourseTypeEnum,
    status?: StatusEnum,
    group?: string,
    manager?: string
    start_date?: string
    end_date?: string
}
