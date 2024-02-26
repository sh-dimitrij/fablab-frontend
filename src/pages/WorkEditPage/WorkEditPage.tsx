import "./WorkEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useWork} from "../../hooks/works/useWork";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const WorkEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        work,
        fetchWork,
        setName,
        setDescription,
        setPrice,
        setImage
    } = useWork()

    useEffect(() => {
        id && fetchWork(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveWork = async() => {
        let form_data = new FormData()

        form_data.append('name', work.name)
        form_data.append('description', work.description)
        form_data.append('price', work.price)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`works/${work.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }
    }

    const deleteWork = async () => {

        const response = await api.delete(`works/${work.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (work == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={work.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={work.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={work.description} setValue={setDescription} />
                    
                    <CustomInput placeholder="Цена" value={work.price} setValue={setPrice} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveWork}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteWork}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default WorkEditPage