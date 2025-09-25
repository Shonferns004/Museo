import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config()


const recommend = async (req, res) => {
    try {
        const { user_query } = req.query;
        const response = await axios.get(`${process.env.FLASK_URL}/recommend-monuments?user_query=${user_query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const planTour = async (req, res) => {
    try {
        const { monument_name, duration, budget, travel_mode } = req.query;
        const response = await axios.get(
            `${process.env.FLASK_URL}/plan-tour?monument_name=${monument_name}&duration=${duration}&budget=${budget}&travel_mode=${travel_mode}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editSchedule =  async (req, res) => {
    try {
        const response = await axios.post(`${process.env.FLASK_URL}/edit-schedule`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const visualizeTour = async (req, res) => {
    try {
        const { monument_name } = req.query;
        const response = await axios.get(`${process.env.FLASK_URL}/visualize-tour?monument_name=${monument_name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { visualizeTour,editSchedule ,planTour, recommend }