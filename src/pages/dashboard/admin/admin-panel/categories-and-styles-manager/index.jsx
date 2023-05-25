import Head from "next/head";
import text_to_image_data from "../../../../../../public/data/text_to_image_data";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState } from "react";
import { useRouter } from "next/router";

const CategoriesAndStylesManager = () => {

    const router = useRouter();

    const [categoryIndex, setCategoryIndex] = useState(-1);

    const [isWaitStatus, setIsWaitStatus] = useState(false);
    
    const [isUpdateStatus, setIsUpdateStatus] = useState(false);

    const [categoryData, setCategoryData] = useState(null);

    const changeStylePrompt = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoriesDataTemp.styles[styleIndex].prompt = newValue;
        setCategoryData(categoriesDataTemp);
    }

    const changeStyleNegativePrompt = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoriesDataTemp.styles[styleIndex].negative_prompt = newValue;
        setCategoryData(categoriesDataTemp);
    }
    
    const getCategoryInfo = (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        setTimeout(() => {
            setIsWaitStatus(false);
            setCategoryData(text_to_image_data.categoriesData[categoryIndex]);
        }, 2000);
    }

    const updateStyleData = (styleIndex) => {
        setIsUpdateStatus(true);
        setTimeout(() => {
            setIsUpdateStatus(false);
            setTimeout(() => {
                router.reload();
            }, 1000);
        }, 2000);
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
            <form className="select-category-form mb-4" onSubmit={getCategoryInfo}>
                <select className="form-control w-50 mx-auto mb-3" onChange={(e) => {
                    setCategoryIndex(parseInt(e.target.value));
                }}>
                    <option defaultValue="" hidden>Select The Category</option>
                    {text_to_image_data.categoriesData.map((category, index) => (
                        <option value={index} key={index}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-success">Get Category Data</button>
            </form>
            {isWaitStatus && <span className="loader"></span>}
            {categoryData && !isWaitStatus && <div className="categories-and-styles-box p-3">
                <table className="categories-and-styles-table mb-4">
                    <thead>
                        <tr>
                            <th>Style Name</th>
                            <th>Prompt</th>
                            <th>Negative Prompt</th>
                            <th>Model Name</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.styles.map((style, styleIndex) => (
                            <tr key={styleIndex}>
                                <td className="style-name-cell">{style.name}</td>
                                <td>
                                    <textarea
                                        placeholder="Enter Negative Prompt"
                                        defaultValue={style.prompt}
                                        className="p-2"
                                        onChange={(e) => changeStylePrompt(styleIndex, e.target.value)}
                                    ></textarea>
                                </td>
                                <td>
                                    <textarea
                                        placeholder="Enter Negative Prompt"
                                        defaultValue={style.negative_prompt}
                                        className="p-2"
                                        onChange={(e) => changeStyleNegativePrompt(styleIndex, e.target.value)}
                                    ></textarea>
                                </td>
                                <td className="model-name-cell">{style.modelName}</td>
                                <td className="update-cell">
                                    {!isUpdateStatus && <button
                                        className="btn btn-danger"
                                        onClick={() => updateStyleData(styleIndex)}
                                    >Update</button>}
                                    {isUpdateStatus && <p className="alert alert-primary">Update ...</p>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

export default CategoriesAndStylesManager;