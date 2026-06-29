import { useState } from "react";
import { Button, Input, Modal, Toast, Loader } from "../components/ui";

function ComponentShowcase() {
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="component-showcase" className="component-showcase">
            <h2>UI Component Library</h2>

            <div className="showcase-grid">
                <Button onClick={() => setIsModalOpen(true)}>
                    Open Modal
                </Button>

                <Input
                    placeholder="Enter product name"
                    value={inputValue}
                    onChange={setInputValue}
                />

                <Loader />

                <Toast
                    message="Description generated successfully!"
                    type="success"
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <h3>Reusable Modal</h3>
                    <p>This modal is part of the UI component library.</p>
                </Modal>
            </div>
        </section>
    );
}

export default ComponentShowcase;