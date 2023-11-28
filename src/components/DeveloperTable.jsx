import { useLoaderData } from 'react-router-dom'
import { useMemo, useState } from 'react';
import { COLUMNS } from './tableColumns/DeveloperMerchantColumns';
import DefaultTable from './DefaultTable';
import EditMerchantPopup from './EditMerchantPopup';
import DeleteMerchantPopup from './popups/DeleteMerchantPopup';

const DeveloperTable = () => {
    
    const [editPopup, setEditPopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [selectedData, setSelectedData] = useState({})
    const [idToDelete, setIdToDelete] = useState(null)
    const merchantInfo = useLoaderData()
    const columns = useMemo(() => {
        return [...COLUMNS,
            {
                Header: "Edit",
                Cell: ({cell}) =>{ 
                    return (
                        <>
                            <button
                                className="bg-amber-800 hover:bg-amber-900 border-2 hover:border-white" 
                                onClick={() => {
                                    console.log("cell", cell.row.original)
                                    setEditPopup(true)
                                    setSelectedData(cell.row.original)
                                    
                                }}
                            
                            >Edit
                            </button>
                            <button 
                                className="bg-red-700 hover:bg-red-900"
                                onClick={() => {
                                    setDeletePopup(true)
                                    console.log("merchant_id:", cell.row.original.merchants_id)
                                    setIdToDelete(cell.row.original.merchants_id)
                                }}
                            >
                                Delete
                            </button>
                            </>
                    )
                }
            },]
    }, [])

    const data = useMemo(() => merchantInfo, [merchantInfo])

    return (
        <>
            <div>
                <DeleteMerchantPopup deletePopup={deletePopup} setDeletePopup={setDeletePopup} idToDelete={idToDelete}/>
                <EditMerchantPopup editPopup={editPopup} setEditPopup={setEditPopup} selectedData={selectedData}/>
                {DefaultTable({columns, data})}
            </div>
        </>
    );
};

export default DeveloperTable;