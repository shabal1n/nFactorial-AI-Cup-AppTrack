import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContexts"

export default function AddGoalModal({
    show,
    handleClose,
    defaultBudgetId,
}) {
    const nameRef = useRef()
    const totalAmountRef = useRef()
    const collectedAmountRef = useRef()
    const deadlineRef = useRef()
    const { addGoal } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        addGoal({
            name: nameRef.current.value,
            collectedMoney: parseFloat(collectedAmountRef.current.value),
            totalNeeded: parseFloat(totalAmountRef.current.value),
            deadline: deadlineRef.current.value,
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="totalAmount">
                        <Form.Label>Total Amount Needed</Form.Label>
                        <Form.Control
                            ref={totalAmountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="collectedAmount">
                        <Form.Label>Collected Amount</Form.Label>
                        <Form.Control
                            ref={collectedAmountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="deadline">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control
                            ref={deadlineRef}
                            type="date"
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}