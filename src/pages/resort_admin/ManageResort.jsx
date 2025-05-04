import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";
import React from "react";
import Manage_Resort from "../../components/Resort_admin/Manage_Resort";
import CarouselImageCard from "../../components/Resort_admin/CarouselImageCard";

const ManageResort = () => {
  useEffect(() => {
    document.title = "Manage Resort | Ocean View";
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 items-center sm:grid-cols-6 lg:grid-cols-9 gap-4 p-3">
        <Manage_Resort title="Main Image"/>
        <CarouselImageCard label = "Image 1" title="Image 1"/>
        <CarouselImageCard label = "Image 2" title="Image 2"/>
        <CarouselImageCard label = "Image 3" title="Image 3"/>
      </div>
    </>
  );
};

export default ManageResort;
