import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContexts"

export default function AddGoalModal({
    show,
    handleClose,
    defaultBudgetId,
}) {
    const nameRef = useRef()
    const typeRef = useRef()
    const paymentDateRef = useRef()
    const { addMonthlyPayment } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        addMonthlyPayment({
            name: nameRef.current.value,
            type: typeRef.current.value,
            paymentDate: paymentDateRef.current.value,
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Regular Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="type">
                        <Form.Label>Type of payment</Form.Label>
                        <Form.Control ref={typeRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="paymentDate">
                        <Form.Label>Payment Date each month</Form.Label>
                        <Form.Control
                            ref={paymentDateRef}
                            type="number"
                            required
                            min={0}
                            step={1}
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