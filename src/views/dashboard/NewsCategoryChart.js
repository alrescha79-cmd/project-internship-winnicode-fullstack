import React from 'react'
import { CChart } from '@coreui/react-chartjs'

const NewsCategoryChart = ({ data = [] }) => {
    const labels = data.map(item => item.name || 'Unknown')
    const newsCounts = data.map(item => item.newsCount || 0)

    return (
        <CChart
            type="doughnut"
            data={{
                labels,
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#FFCE56', '#36A2EB'],
                        data: newsCounts,
                    },
                ],
            }}
            options={{
                plugins: {
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--cui-body-color'),
                        },
                    },
                },
            }}
        />
    )
}

export default NewsCategoryChart
