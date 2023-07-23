import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState } from "react";
import Axios from "axios";

const AddNewCategory = () => {

    const [categoryName, setCategoryName] = useState("");

    const [categoryImageFile, setCategoryImageFile] = useState({});

    const addNewCategory = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("imgSrc", categoryImageFile);
        try{
            const res = await Axios.post(`${process.env.BASE_API_URL}/text-to-image/categories/add-new-category`, formData);
            const data = await res.data;
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="add-new-categoty">
            <Head>
                <title>Tavlorify Store - Add New Category For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3 text-center">Hello To You In Add New Category Page For Text To Image</h1>
            <hr className="mb-5" />
            <form className="add-new-category-form w-50 mx-auto mb-4" onSubmit={addNewCategory}>
                <input
                    type="text"
                    className="form-control mb-4 p-3"
                    placeholder="Please Enter Category Name"
                    required
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <input
                    type="file"
                    className="form-control mb-4 p-2"
                    placeholder="Please Enter Category Image"
                    required
                    onChange={(e) => setCategoryImageFile(e.target.files[0])}
                />
                <button type="submit" className="btn btn-success w-25 d-block mx-auto">Add Now</button>
            </form>
        </div>
    );
}

export default AddNewCategory;