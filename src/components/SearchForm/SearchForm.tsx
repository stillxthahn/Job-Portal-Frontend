import React, { useEffect, useState } from 'react'
import { Input, Select, Form, Button, Row, Col } from "antd";
import styles from "./SearchForm.module.css"
import { getListCity } from '../../services/cityService';
import { useNavigate } from 'react-router-dom';

interface City {
    key: number;
    value: string
}

const SearchForm = () => {
    const navigate = useNavigate()
    const [cities, setCities] = useState(Array<City>);
    useEffect(() => {
        const fectAPI = async () => {
            const response = await getListCity()
            if (response) {
                const allCities = {
                    key: 0,
                    value: "All"
                }
                setCities([allCities, ...response])
            }
        }
        fectAPI()
    }, [])

    const handleFinish = (values: { city: string, keyword: string }) => {
        const city = values.city === "All" || values.city === undefined ? "" : values.city;
        navigate(
            `/search?city=${city}&keyword=${values.keyword || ""}`
        );
    }
    return (
        <div className="bg-purple-50">
            <div className="px-4 sm:pt-10 sm:pb-4 container drop-shadow-xl rounded-md">
                <Form onFinish={handleFinish}>
                    <Row gutter={[12, 12]}>
                        <div className='flex flex-wrap justify-center sm:w-full sm:justify-start'>
                            <Col xxl={6} xl={6} lg={6}>
                                <Form.Item className={styles.select} name="city">
                                    <Select className={styles.select} options={cities} placeholder="Location" />
                                </Form.Item>
                            </Col>
                            <Col xxl={15} xl={15} lg={15}>
                                <Form.Item name="keyword">
                                    <Input className={styles.select} placeholder="What position are you looking for ?" />
                                </Form.Item>
                            </Col>
                            <Col xxl={3} xl={3} lg={3}>
                                <Form.Item>
                                    <Button className={styles.button} type="primary" htmlType="submit" block>
                                        Apply for jobs
                                    </Button>
                                </Form.Item>
                            </Col>
                        </div>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default SearchForm