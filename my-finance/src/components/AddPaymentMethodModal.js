import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContexts"

export default function AddPaymentMethodModal({
    show,
    handleClose,
    defaultBudgetId,
}) {
    const nameRef = useRef()
    const amountRef = useRef()
    const { addPaymentMethod } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        addPaymentMethod({
            name: nameRef.current.value,
            amountMoney: parseFloat(amountRef.current.value),
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
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
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