import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js/auto"
import PropTypes from 'prop-types'


const LineChart = ({chartData}) => {
    return (
        <Line data={chartData} />
    )
}
LineChart.propTypes = {
    chartData: PropTypes.object
}

export default LineChart;