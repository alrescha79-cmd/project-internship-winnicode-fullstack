import React from 'react'
import { CChart } from '@coreui/react-chartjs'

const JournalistPostsChart = ({ data = [] }) => {
    const labels = data.map(journalist => journalist.name || 'Unknown')
    const postCounts = data.map(journalist => journalist.postCount || 0)

    return (
        <CChart
            type="bar"
            data={{
                labels,
                datasets: [
                    {
                        label: 'Jumlah Postingan',
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#FFCE56', '#36A2EB'],
                        data: postCounts,
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
                scales: {
                    x: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--cui-border-color-translucent'),
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--cui-body-color'),
                        },
                    },
                    y: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--cui-border-color-translucent'),
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--cui-body-color'),
                        },
                    },
                },
            }}
        />
    )
}

export default JournalistPostsChart
