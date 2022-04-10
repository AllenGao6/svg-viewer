// ./src/components/SVGUploadForm.js

// Imports
import React from "react";
import { Form, Input, Button } from "antd";
const isSVG = require("is-svg");

// SVG upload form container
export default function SVGUploadForm({ updateSVG }) {
    // Contains code for SVG upload form

    const [form] = Form.useForm(); // Input form for SVG upload

    // Handle upload form
    const onSubmit = (formData) => {
        // Construct the new SVG from the form data
        let newSVG = {
            title: formData.title,
            svg: formData.svg,
        };

        // Check if the SVG is actually real
        if (isSVG(newSVG.svg)) {
            updateSVG(newSVG);
            // Alert the user that the SVG has been submitted
            alert(`SVG ${newSVG.title} has been submitted to GUN.`);
        } else {
            // Alert the user that the SVG is of invalid format
            alert(`${newSVG.title} is not a valid SVG.`);
        }

        // Clear the form data boxes
        form.resetFields();
    };

    // If the SVG is not valid, alert the user
    const onFinishFailed = (errorInfo) => {
        console.log("Failed SVG input:", errorInfo);
    };

    // Returns a JSX component for the SVG upload form
    return (
        <>
            {/* Overarching form structure */}
            <Form
                name="svg-upload-form"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: false }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {/* Title input segment for form */}
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a title for the SVG.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* SVG data input segment */}
                <Form.Item
                    label="SVG"
                    name="svg"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a valid SVG as a string.",
                        },
                    ]}
                >
                    <Input.TextArea rows={15} />
                </Form.Item>

                {/* Submit button */}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
}