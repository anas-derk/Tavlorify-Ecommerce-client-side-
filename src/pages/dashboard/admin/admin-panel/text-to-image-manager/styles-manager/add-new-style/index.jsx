import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import Axios from "axios";

const AddNewCategoryStyle = () => {
    
    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryIndex, setCategoryIndex] = useState(-1);

    const [categoryName, setCategoryName] = useState("");

    const [categoryImageFile, setCategoryImageFile] = useState({});
    
    const [styleName, setStyleName] = useState("");

    const [stylePrompt, setStylePrompt] = useState("");
    
    const [styleNegativePrompt, setStyleNegativePrompt] = useState("");

    const [modelName, setModelName] = useState("");
    
    const [styleImageFile, setStyleImageFile] = useState({});

    useEffect(() => {
        Axios.get(`${process.env.BASE_API_URL}/text-to-image/categories/all-categories-data`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    console.log(result);
                } else {
                    setCategoriesData(result);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const addNewCategoryStyle = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("styleName", styleName);
        formData.append("stylePrompt", stylePrompt);
        formData.append("styleNegativePrompt", styleNegativePrompt);
        formData.append("modelName", modelName);
        formData.append("styleImgFile", styleImageFile);
        try{
            const res = await Axios.post(`${process.env.BASE_API_URL}/text-to-image/styles/add-new-style`, formData);
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
                <title>Tavlorify Store - Add New Category Style For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3 text-center">Hello To You In Add New Category Style Page For Text To Image</h1>
            <hr className="mb-5" />
            <form className="add-new-category-form w-50 mx-auto mb-4" onSubmit={addNewCategoryStyle}>
            <select className="form-control mx-auto mb-4 p-2" onChange={(e) => {
                    setCategoryIndex(parseInt(e.target.value));
                }}>
                    <option defaultValue="" hidden>Select The Category</option>
                    {categoriesData.map((category, index) => (
                        <option value={index} key={index}>{category.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    className="form-control mb-4 p-2"
                    placeholder="Please Enter Style Name"
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

export default AddNewCategoryStyle;