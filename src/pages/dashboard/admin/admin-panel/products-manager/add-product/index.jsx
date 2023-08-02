import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";
import validations from "../../../../../../../public/global_functions/validations";

const AddProduct = () => {
    const router = useRouter();
    const [productCategories, setProductCategories] = useState({
        "subject": {
            mainSubject: "",
            subSubject: "",
            subFromSubSubject: "",
        },
        "style": {
            mainStyle: "",
            subStyle: "",
            subFromSubStyle: "",
        },
        "room": {
            mainRoom: "",
            subRoom: "",
            subFromSubRoom: "",
        },
    });
    const [subjects, setSubjects] = useState([]);
    const [styles, setStyles] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [colors, setColors] = useState([]);
    const [file, setFile] = useState("");
    const [name, setProductName] = useState("");
    const [orientation, setOrientation] = useState("");
    const [price, setPrice] = useState("0.0");
    const [waitMsg, setWaitMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({});
    const categoryTypesWithoutColorCategoryType = ["Subject", "Style", "Room"];
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(-1);
    const [selectedStyleIndex, setSelectedStyleIndex] = useState(-1);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(-1);
    const [selectedSubSubjectIndex, setSelectedSubSubjectIndex] = useState(-1);
    const [selectedSubStyleIndex, setSelectedSubStyleIndex] = useState(-1);
    const [selectedSubRoomIndex, setSelectedSubRoomIndex] = useState(-1);

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            Axios.get(`${process.env.BASE_API_URL}/categories/all-categories`)
                .then((res) => {
                    const categories = res.data;
                    const subjects = categories.filter((category) => category.categoryType === "subjects");
                    const styles = categories.filter((category) => category.categoryType === "styles");
                    const rooms = categories.filter((category) => category.categoryType === "rooms");
                    const colors = categories.filter((category) => category.categoryType === "colors");
                    setSubjects(subjects);
                    setStyles(styles);
                    setRooms(rooms);
                    setColors(colors);
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMsg("Sorry, Something Went Wrong");
                });
        }
    }, []);

    const handleSelectCategoryTypeAndName = (categoryTypeAndIndex) => {
        const categoryAsArray = categoryTypeAndIndex.split("-");
        switch (categoryAsArray[0]) {
            case "subject": {
                const productCategoriesTemp = productCategories;
                productCategories["subject"].mainSubject = subjects[categoryAsArray[1]].name;
                setProductCategories(productCategoriesTemp);
                setSelectedSubjectIndex(categoryAsArray[1]);
                break;
            }
            case "style": {
                const productCategoriesTemp = productCategories;
                productCategories["style"].mainStyle = styles[categoryAsArray[1]].name;
                setProductCategories(productCategoriesTemp);
                setSelectedStyleIndex(categoryAsArray[1]);
                break;
            }
            case "room": {
                const productCategoriesTemp = productCategories;
                productCategories["room"].mainRoom = styles[categoryAsArray[1]].name;
                setProductCategories(productCategoriesTemp);
                setSelectedRoomIndex(categoryAsArray[1]);
                break;
            }
            default: {
                console.log("Error !!");
            }
        }
    }

    const handleSelectSubCategoryTypeAndName = (subCategoryTypeAndIndex) => {
        const subCategoryAsArray = subCategoryTypeAndIndex.split("-");
        switch (subCategoryAsArray[0]) {
            case "subject": {
                const productCategoriesTemp = productCategories;
                productCategories["subject"].subSubject = subjects[selectedSubjectIndex].subCategories[subCategoryAsArray[1]].subCategoryName;
                setProductCategories(productCategoriesTemp);
                setSelectedSubSubjectIndex(subCategoryAsArray[1]);
                break;
            }
            case "style": {
                const productCategoriesTemp = productCategories;
                productCategories["style"].subSubject = styles[selectedSubjectIndex].subCategories[subCategoryAsArray[1]].subCategoryName;
                setProductCategories(productCategoriesTemp);
                setSelectedSubStyleIndex(subCategoryAsArray[1]);
                break;
            }
            case "room": {
                const productCategoriesTemp = productCategories;
                productCategories["room"].subSubject = rooms[selectedSubjectIndex].subCategories[subCategoryAsArray[1]].subCategoryName;
                setProductCategories(productCategoriesTemp);
                setSelectedSubRoomIndex(subCategoryAsArray[1]);
                break;
            }
            default: {
                console.log("Error !!");
            }
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "file",
                value: file,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                    isImage: {
                        msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                    },
                },
            },
            {
                name: "name",
                value: name,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "orientation",
                value: orientation,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "price",
                value: price,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            let productData = new FormData();
            productData.append("imageSrc", file);
            productData.append("name", name);
            productData.append("orientation", orientation);
            productData.append("price", price);
            setWaitMsg("please wait ...");
            try {
                let res = await Axios.post(`${process.env.BASE_API_URL}/products/add-new-product`, productData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                let result = await res.data;
                setTimeout(() => {
                    setWaitMsg("");
                    setSuccessMsg(result);
                    setTimeout(() => {
                        setSuccessMsg("");
                    }, 2000);
                }, 1500);
            }
            catch (err) {
                setTimeout(() => {
                    setWaitMsg("");
                    setErrorMsg(result);
                    setTimeout(() => {
                        setErrorMsg("");
                    }, 2000);
                }, 1500);
            }
        }
    }
    return (
        // Start Add Product Page
        <div className="add-product">
            <Head>
                <title>Tavlorify Store - Add Product</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add Product Page</h1>
                    <form className="add-product-form w-75 mx-auto" onSubmit={addProduct}>
                        <div
                            className={`file-box p-3 bg-white form-control ${formValidationErrors["file"] ? "border border-danger mb-2" : "mb-2"}`}
                        >
                            <h6 className="fw-bold">Please Upload Product Image</h6>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        {formValidationErrors["file"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["file"]}</p>}
                        <h6 className="fw-bold">Please Enter Product Name</h6>
                        <input
                            type="text"
                            placeholder="product name"
                            className={`form-control p-2 ${formValidationErrors["name"] ? "border border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setProductName(e.target.value.trim())}
                        />
                        {formValidationErrors["name"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["name"]}</p>}
                        <h6 className="fw-bold">Please Select Product Orientation</h6>
                        <select
                            className={`form-control p-2 ${formValidationErrors["orientation"] ? "border border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setOrientation(e.target.value)}
                        >
                            <option value="" hidden>Select Product Orientation</option>
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="square">Square</option>
                        </select>
                        {formValidationErrors["orientation"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["orientation"]}</p>}
                        {categoryTypesWithoutColorCategoryType.map((categoryType, index) => (
                            <Fragment key={index}>
                                <h6 className="fw-bold">Please Select Product Category By {categoryType}</h6>
                                <div className="row">
                                    <div className="col-md-4">
                                        <select
                                            className={`form-control p-2 ${formValidationErrors["orientation"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => handleSelectCategoryTypeAndName(e.target.value)}
                                        >
                                            <option value="" hidden>Select Main {categoryType}</option>
                                            {categoryType === "Subject" && subjects.map((subject, subjectIndex) => (
                                                <option value={`subject-${subjectIndex}`} key={subjectIndex}>{subject.name}</option>
                                            ))}
                                            {categoryType === "Style" && styles.map((style, styleIndex) => (
                                                <option value={`style-${styleIndex}`} key={styleIndex}>{style.name}</option>
                                            ))}
                                            {categoryType === "Room" && rooms.map((room, roomIndex) => (
                                                <option value={`room-${roomIndex}`} key={roomIndex}>{room.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            className={`form-control p-2 ${formValidationErrors["orientation"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => handleSelectSubCategoryTypeAndName(e.target.value)}
                                        >
                                            <option value="" hidden>Select Sub {categoryType}</option>
                                            {categoryType === "Subject" && selectedSubjectIndex > -1 && subjects[selectedSubjectIndex].subCategories.map((subSubject, subSubjectIndex) => (
                                                <option value={`subject-${subSubjectIndex}`} key={subSubjectIndex}>{subSubject.subCategoryName}</option>
                                            ))}
                                            {categoryType === "Style" && selectedStyleIndex > -1 && styles[selectedStyleIndex].subCategories.map((subSubject, subSubjectIndex) => (
                                                <option value={`style-${subSubjectIndex}`} key={subSubjectIndex}>{subSubject.subCategoryName}</option>
                                            ))}
                                            {categoryType === "Room" && selectedRoomIndex > -1 && rooms[selectedRoomIndex].subCategories.map((subSubject, subSubjectIndex) => (
                                                <option value={`room-${subSubjectIndex}`} key={subSubjectIndex}>{subSubject.subCategoryName}</option>
                                            ))}
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            className={`form-control p-2 ${formValidationErrors["orientation"] ? "border border-danger mb-2" : "mb-4"}`}
                                            onChange={(e) => setOrientation(e.target.value)}
                                        >
                                            <option value="" hidden>Select Sub From Sub {categoryType}</option>
                                            {categoryType === "Subject" && selectedSubjectIndex > -1 && selectedSubSubjectIndex > -1 && subjects[selectedSubjectIndex].subCategories[selectedSubSubjectIndex].subCategories.map((subSubject, subSubjectIndex) => (
                                                <option value={`subject-${subSubjectIndex}`} key={subSubjectIndex}>{subSubject.subCategoryName}</option>
                                            ))}
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                        <h6 className="fw-bold">Please Enter Product Price</h6>
                        <input
                            type="number"
                            placeholder="product price"
                            className={`form-control p-2 ${formValidationErrors["price"] ? "border border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setProductPrice(e.target.value)}
                            defaultValue={price}
                        />
                        {formValidationErrors["price"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["price"]}</p>}
                        {!waitMsg && !errorMsg && !successMsg && <button type="submit" className="btn btn-success w-100 p-2">Add Product</button>}
                        {waitMsg && <button className="btn btn-warning w-100" disabled>Wait</button>}
                        {errorMsg && <p className="alert alert-danger mt-4">{waitMsg}</p>}
                        {successMsg && <p className="alert alert-success mt-4">{successMsg}</p>}
                    </form>
                </div>
            </section>
            {/* End Content Section */}
        </div>
        // End Add Product Page
    );
}

export default AddProduct;