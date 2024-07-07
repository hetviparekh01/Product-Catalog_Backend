export class ApiError extends Error{
    statusCode:number;
    constructor(
        statusCode:number,
        message=``,
    ){
        super(message);
        this.statusCode=statusCode;
        this.message=message
    }
}