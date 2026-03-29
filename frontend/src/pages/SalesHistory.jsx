import { useEffect, useState } from "react";
import api from "../api/api";

function SalesHistory(){

  const [sales,setSales] = useState([])
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")

  useEffect(()=>{
    loadSales()
  },[])

  const loadSales = async ()=>{

    let url = "sales/history/"

    if(startDate && endDate){
      url += `?start_date=${startDate}&end_date=${endDate}`
    }

    const res = await api.get(url)
    setSales(res.data)
  }

  const exportExcel = ()=>{
    window.open("http://127.0.0.1:8000/api/sales/export/")
  }

  return(

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Historial de ventas
      </h1>

      <div className="flex gap-4 mb-4">

        <input type="date" onChange={(e)=>setStartDate(e.target.value)} />
        <input type="date" onChange={(e)=>setEndDate(e.target.value)} />

        <button
          onClick={loadSales}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>

        <button
          onClick={exportExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Exportar Excel
        </button>

      </div>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>

          {sales.map(s=>(
            <tr key={s.id} className="border-t">

              <td className="p-3">{s.product}</td>
              <td>{s.quantity}</td>
              <td>${s.price}</td>
              <td>${s.total}</td>
              <td>{s.date}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}

export default SalesHistory