import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

export default function BudgetCard({
    name,
    amount
}) {
    const classNames = []

    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                    </div>
                </Card.Title>

            </Card.Body>
        </Card>
    )
}