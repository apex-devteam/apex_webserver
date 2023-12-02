import { COLUMNS } from './tableColumns/MerchantsLocationsColumns';
import { useMemo } from 'react'
import DefaultTable from './DefaultTable';
import { useLoaderData } from 'react-router-dom';

const MerchantsLocationsTable = () => {

    const merchantData = useLoaderData();
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => merchantData, [merchantData])

return (
    <div>
        {DefaultTable({columns, data})}
    </div>
)
}

export default MerchantsLocationsTable