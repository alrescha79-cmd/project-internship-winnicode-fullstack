import React from 'react';
import { CChart } from '@coreui/react-chartjs';

const AuthorCharts = () => {

    return (
        <div>
            <CChart
                type="line"
                data={{
                    labels: ["Teknologi", "Lainnya", "Politik", "Olahraga", "Gaya Hidup"],
                    datasets: [
                        {
                            label: "Nama Penulis",
                            backgroundColor: "#FFCE56",
                            borderColor: "#FFCE56",
                            pointBackgroundColor: "#FFCE56",
                            pointBorderColor: "#E46651",
                            data: [2, 0, 1, 1, 1],
                        },
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                color: getComputedStyle(document.documentElement).getPropertyValue('--cui-body-color'),
                            }
                        }
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
