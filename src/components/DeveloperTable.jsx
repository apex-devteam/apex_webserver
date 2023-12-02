import { useLoaderData } from 'react-router-dom'
import { useMemo, useState } from 'react';
import { COLUMNS } from './tableColumns/DeveloperMerchantColumns';
import DefaultTable from './DefaultTable';
import EditMerchantPopup from './popups/EditMerchantPopup';
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
                                className="btn m-1" 
                                onClick={() => {
                                    console.log("cell", cell.row.original)
                                    setEditPopup(true)
                                    setSelectedData(cell.row.original)
                                    
                                }}
                            
                            >
                                Edit
                            </button>
                            <button 
                                className="btn secondary-btn m1"
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
                <h1 className="flex justify-center mb-8 capitalize">Developer Table</h1>
                <DeleteMerchantPopup deletePopup={deletePopup} setDeletePopup={setDeletePopup} idToDelete={idToDelete}/>
                <EditMerchantPopup editPopup={editPopup} setEditPopup={setEditPopup} selectedData={selectedData}/>
                {DefaultTable({columns, data})}
            </div>
        </>
    );
};

export default DeveloperTable;