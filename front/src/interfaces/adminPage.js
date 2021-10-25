import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
function AdminPage()
{

    const [deletedRows, setDeletedRows] = useState([]);
    const [listUsers,setLitsUsers] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3003/readUsers').then((response)=>{setLitsUsers(response.data);})
      },[]);
      
      const createData = (id, nom, email, desc) => {
        return { id, nom, email, desc};
      }
      
      const rows = [];
      listUsers.map((u, i) => {
        if (u.descrimination == 2) rows.push(createData(i, u.nom, u.email, true))
        else if (u.descrimination == 1) rows.push(createData(i, u.nom, u.email, false))
      })

      const handleSelectionChange = (selection) => {
       setDeletedRows([...rows.filter((r) => selection.selectionModel.includes(r.id))]);
      };

      const handleDelete = async () => {
        deletedRows.forEach((e) => {
          listUsers.map(async (u, i) => {
            if (u.email == e.email) {
              console.log(u);
              await axios.post("http://localhost:3003/users/delete", u);
            }
          })
        });
        window.location.reload();
      }

      const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nom', headerName: 'Nom', width: 300 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'desc', headerName: 'Is Prof', type: 'boolean', width: 120 }
      ];
      console.log(deletedRows);


    return(
        <div>
          <h2>Users</h2>
          <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      components={{
        Toolbar: GridToolbar,
      }}
      rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={handleSelectionChange} />
      <button onClick={handleDelete} className="btn btn-primary"> delete </button>
    </div>
    </div>
    )
}

export default AdminPage;