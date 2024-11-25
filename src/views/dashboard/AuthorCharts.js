import React from 'react';
import { CChart } from '@coreui/react-chartjs';

const AuthorCharts = ({ authorCategories = [] }) => {
    const groupedData = authorCategories.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = 0;
        }
        acc[item.category] += 1;
        return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return (
        <div>
            <CChart
                type="line"
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "Jumlah Postingan per Kategori",
                            backgroundColor: "#FFCE56",
                            borderColor: "#FFCE56",
                            pointBackgroundColor: "#FFCE56",
                            pointBorderColor: "#E46651",
                            data: data,
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
        </div>
    );
};


export default AuthorCharts;
