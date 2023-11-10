import DefaultTable from './DefaultTable';
import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { COLUMNS } from './tableColumns/SalesColumns'
import LineChart from './charts/LineChart';

const SalesTable = () => {

    const salesData = useLoaderData()
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => salesData, [salesData])

    const [lineData, setLineData] = useState({
        labels: salesData.map((data) => data.date),
        datasets: [{
            label: "Total Sales",
            data: salesData.map((data) => data.total_taxable_sales),
        }]
    })

    return(
        <div>
            <LineChart chartData={lineData}/>
            {DefaultTable({columns, data})}
        </div>
    )
}

export default SalesTable;