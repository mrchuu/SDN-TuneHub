import { ReportQuestionRepository } from "../repository/index.js";
const getQuestionReport = async (req, res) => {
    try {
        const result = await ReportQuestionRepository.getAllQuestion()
        res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addReport = async (req, res) => {
    try {
        const userId = req.decodedToken.userId;
        const commentReportedId = req.params.commentReportedId;
        const result = await ReportQuestionRepository.addReport(userId, commentReportedId)
        res.status(200).json({ data: result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default {
    getQuestionReport,
    addReport
}