import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiService } from "@/services/api";

export const Employee: React.FC = () => {
  useEffect(()=>{
    const fetchEmployeeList=async()=>{
      let pageNumber=1
      let pageSize=10
     const res= await apiService.getEmployee(pageNumber,pageSize)
     console.log('res: ', res);
    }
    fetchEmployeeList()
  },[])

  return (
    <div className="space-y-6">
      {/* Page Header */}
        <h1>Employee...</h1>
    </div>
  );
};