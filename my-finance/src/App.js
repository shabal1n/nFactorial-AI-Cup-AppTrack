import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddBudgetModal from "./components/AddBudgetModal"
import AddExpenseModal from "./components/AddExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import AddPaymentMethodModal from "./components/AddPaymentMethodModal"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContexts"
import AddGoalModal from "./components/AddGoalModal"
import AddMonthlyPaymentModal from "./components/AddMonthlyPaymentModal"
import IncomeCard from "./components/IncomeCard"
import GoalCard from "./components/GoalCard"

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [addPaymentMethodModalBudgetId, setAddPaymentMethodModalBudgetId] = useState()
  const [showAddPaymentMethodModal, setShowAddPaymentMethodModal] = useState(false)
  const [showAddGoalModal, setShowAddGoalModal] = useState(false)
  const [addGoalModalBudgetId, setAddGoalModalBudgetId] = useState()
  const [showAddMonthlyPaymentModal, setShowAddMonthlyPaymentModal] = useState(false)
  const [addMonthlyPaymentModalBudgetId, setAddMonthlyPaymentModalBudgetId] = useState()
  const { budgets, paymentMethods, goals, monthlyPayments, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  function openAddPaymentMethodModal(budgetId) {
    setShowAddPaymentMethodModal(true)
    setAddPaymentMethodModalBudgetId(budgetId)
  }

  function openAddGoalModal(budgetId) {
    setShowAddGoalModal(true)
    setAddGoalModalBudgetId(budgetId)
  }

  function openAddMonthlyPaymentModal(budgetId) {
    setShowAddMonthlyPaymentModal(true)
    setAddMonthlyPaymentModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">MyFinance</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget Category
          </Button>
          <Button variant="outline-danger" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
          <Button variant="outline-secondary" onClick={openAddPaymentMethodModal}>
            Add Payment Method
          </Button>
          <Button variant="outline-info" onClick={openAddGoalModal}>
            Add Goal
          </Button>
          <Button variant="outline-warning" onClick={openAddMonthlyPaymentModal}>
            Add Regular Payment
          </Button>
        </Stack>

        <h1 className="me-auto">Payment Methods</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
          className="mb-4"
        >
          {paymentMethods?.map(paymentMethod => {
            return (
              <IncomeCard
                key={paymentMethod.id}
                name={paymentMethod.name}
                amount={paymentMethod.amountMoney}
              />
            )
          })}
        </div>
        
        <h1 className="me-auto">Categories</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
          className="mb-4"
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>

        <h1 className="me-auto">Goals</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
          className="mb-4"
        >
          {goals?.map(goal => {
            return (
              <GoalCard
                key={goal.id}
                name={goal.name}
                collectedMoney={goal.collectedMoney}
                totalNeeded={goal.totalNeeded}
                deadline={goal.deadline}
              />
            )
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      <AddPaymentMethodModal
        show={showAddPaymentMethodModal}
        defaultBudgetId={addPaymentMethodModalBudgetId}
        handleClose={() => setShowAddPaymentMethodModal(false)}
      />
      <AddGoalModal
        show={showAddGoalModal}
        defaultBudgetId={addGoalModalBudgetId}
        handleClose={() => setShowAddGoalModal(false)}
      />
      <AddMonthlyPaymentModal
        show={showAddMonthlyPaymentModal}
        defaultBudgetId={addMonthlyPaymentModalBudgetId}
        handleClose={() => setShowAddMonthlyPaymentModal(false)}
      />
    </>
  )
}

export default App