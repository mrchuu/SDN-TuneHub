import ReportQuestion from "../model/ReportQuestion.js"
import Report from "../model/Report.js"

const getAllQuestion = async () => {
    try {
        return await ReportQuestion.find();
    } catch (error) {
        throw new Error(error.message);
    }
}

const addReport = async (userId, commentReportedId) => {
    try {
        return await Report.create({
            userId: userId,
            comment_reported: commentReportedId
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    getAllQuestion,
    addReport
} 