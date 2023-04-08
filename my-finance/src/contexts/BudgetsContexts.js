import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    const [monthlyPayments, setMonthlyPayments] = useLocalStorage("monthlyPayments", [])
    const [paymentMethods, setPaymentMethods] = useLocalStorage("paymentMethods", [])
    const [goals, setGoals] = useLocalStorage("goals", [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function getMonthlyPayments(paymentId) {
        return monthlyPayments.filter(payment => payment.paymentId === paymentId)
    }

    function getPaymentMethods(methodId) {
        return paymentMethods.filter(payment => payment.methodId === methodId)
    }

    function getGoals(goalId) {
        return goals.filter(goal => goal.goalId === goalId)
    }

    function addMonthlyPayment({ name, type, paymentDate }) {
        setMonthlyPayments(prevMonthlyPayments => {
            return [...prevMonthlyPayments, { id: uuidV4(), name, type, paymentDate }]
        })
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }

    function addPaymentMethod({ name, amountMoney }) {
        setPaymentMethods(prevPaymentMethods => {
            return [...prevPaymentMethods, { id: uuidV4(), name, amountMoney }]
        })
    }

    function addGoal({ name, collectedMoney, totalNeeded, deadline }) {
        setGoals(prevGoals => {
            return [...prevGoals, { id: uuidV4(), name, collectedMoney, totalNeeded, deadline }]
        })
    }

    function deletePaymentMethod({ id }) {
        setPaymentMethods(prevPaymentMethods => {
            return prevPaymentMethods.filter(payment => payment.id !== id)
        })
    }

    function deleteGoal({ id }) {
        setGoals(prevGoals => {
            return prevGoals.filter(goal => goal.id !== id)
        })
    }

    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
            })
        })

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteMonthlyPayment({ id }) {
        setMonthlyPayments(prevMonthlyPayments => {
            return prevMonthlyPayments.filter(payment => payment.id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                monthlyPayments,
                paymentMethods,
                goals,
                getBudgetExpenses,
                getMonthlyPayments,
                getPaymentMethods,
                getGoals,
                addExpense,
                addBudget,
                addMonthlyPayment,
                addPaymentMethod,
                addGoal,
                deleteBudget,
                deleteExpense,
                deleteMonthlyPayment,
                deletePaymentMethod,
                deleteGoal,
            }}
        >
            {children}
        </BudgetsContext.Provider>
    )
}