import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

export default function BudgetCard({
    name,
    collectedMoney,
    totalNeeded,
    deadline
}) {

    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(collectedMoney)}
                        {totalNeeded && (
                            <span className="text-muted fs-6 ms-1">
                                / {currencyFormatter.format(totalNeeded)}
                            </span>
                        )}
                    </div>
                </Card.Title>
                <div className="me-2 mb-3">{deadline}</div>
                {totalNeeded && (
                    <ProgressBar
                        className="rounded-pill"
                        variant={getProgressBarVariant(collectedMoney, totalNeeded)}
                        min={0}
                        max={totalNeeded}
                        now={collectedMoney}
                    />
                )}
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.25) return "danger"
    if (ratio < 0.5) return "warning"
    return "primary"
}