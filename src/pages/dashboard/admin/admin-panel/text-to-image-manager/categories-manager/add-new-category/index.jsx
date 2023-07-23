import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState } from "react";
import Axios from "axios";

const AddNewCategory = () => {

    const [categoryName, setCategoryName] = useState("");

    const [categoryImageFile, setCategoryImageFile] = useState({});
    
    const [styleName, setStyleName] = useState("");

    const [stylePrompt, setStylePrompt] = useState("");
    
    const [styleNegativePrompt, setStyleNegativePrompt] = useState("");

    const [modelName, setModelName] = useState("");
    
    const [styleImageFile, setStyleImageFile] = useState({});

    const addNewCategory = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("categoryImgFile", categoryImageFile);
        formData.append("styleName", styleName);
        formData.append("stylePrompt", stylePrompt);
        formData.append("styleNegativePrompt", styleNegativePrompt);
        formData.append("modelName", modelName);
        formData.append("styleImgFile", styleImageFile);
        try{
            const res = await Axios.post(`${process.env.BASE_API_URL}/text-to-image/categories/add-new-category`, formData);
            const data = await res.data;
            console.log(data);
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
                    className="form-control mb-4 p-2"
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
                <input
                    type="text"
                    className="form-control mb-4 p-2"
                    placeholder="Please Enter The First Style Name"
                    required
                    onChange={(e) => setStyleName(e.target.value)}
                />
                <textarea
                    className="form-control mb-4 p-2"
                    placeholder="Please Enter Style Prompt"
                    required
                    onChange={(e) => setStylePrompt(e.target.value)}
                ></textarea>
                <textarea
                    className="form-control mb-4 p-2"
                    placeholder="Please Enter Style Negative Prompt"
                    required
                    onChange={(e) => setStyleNegativePrompt(e.target.value)}
                ></textarea>
                <select
                    type="text"
                    className="form-control mb-4 p-2"
                    required
                    onChange={(e) => setModelName(e.target.value)}
                >
                    <option hidden value="">Please Select Model Name</option>
                    <option value="dreamshaper">Dreamshaper</option>
                    <option value="stable-diffusion">Stable Diffusion</option>
                    <option value="deliberate-v2">Deliberate</option>
                    <option value="kandinsky-2">kandinsky</option>
                    <option value="openjourney">Openjourney</option>
                </select>
                <input
                    type="file"
                    className="form-control mb-4 p-2"
                    placeholder="Please Enter Category Image"
                    required
                    onChange={(e) => setStyleImageFile(e.target.files[0])}
                />
                <button type="submit" className="btn btn-success w-25 d-block mx-auto">Add Now</button>
            </form>
        </div>
    );
}

export default AddNewCategory;