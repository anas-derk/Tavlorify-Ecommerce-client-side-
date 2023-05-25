import Head from "next/head";
import text_to_image_data from "../../../../../../public/data/text_to_image_data";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState } from "react";

const CategoriesAndStylesManager = () => {

    const [categoryIndex, setCategoryIndex] = useState(-1);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const getCategoryInfo = (e) => {
        e.preventDefault();
    }

    return (
        <div className="categories-and-styles-manger text-center">
            <Head>
                <title>Tavlorify Store - Categories And Styles Manager</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3">Hello To You In Categories And Styles Manager Page</h1>
            <hr className="mb-3" />
            <h5 className="mb-3">Please Select The Category</h5>
            <form className="select-category-form mb-2" onSubmit={getCategoryInfo}>
                <select className="form-control w-50 mx-auto" onChange={(e) => {
                    setIsWaitStatus(true);
                    setTimeout(() => {
                        setIsWaitStatus(false);
                        setCategoryIndex(e.target.value);
                    }, 2000);
                }}>
                    <option defaultValue="" hidden>Select The Category</option>
                    {text_to_image_data.categoriesData.map((category, index) => (
                        <option value={index} key={index}>{category.name}</option>
                    ))}
                </select>
            </form>
            {isWaitStatus && <span className="loader"></span>}
            {categoryIndex > -1 && !isWaitStatus && <div className="categories-and-styles-box p-3">
                <table className="categories-and-styles-table mb-4">
                    <thead>
                        <tr>
                            <th>Style Name</th>
                            <th>Prompt</th>
                            <th>Negative Prompt</th>
                            <th>Model Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {text_to_image_data.categoriesData[categoryIndex].styles.map((style, styleIndex) => (
                            <tr key={styleIndex}>
                                <td>{style.name}</td>
                                <td>{style.prompt}</td>
                                <td>{style.negative_prompt}</td>
                                <td>{style.modelName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

export default CategoriesAndStylesManager;