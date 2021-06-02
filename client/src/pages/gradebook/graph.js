import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const data = {
    labels: ['A1', 'A2', 'A3', 'Test 1', 'Exam'],
    datasets: [
        {
            label: 'Avg. Grade',
            data: [88, 75, 60, 79, 80, 66],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 5
        },
        {
            label: 'Weight %',
            data: [10, 5, 15, 15, 50],
            fill: false,
            backgroundColor: 'rgb(3, 177, 252)',
            borderColor: 'rgba(3, 177, 252, 0.2)',
            borderWidth: 5
        },
    ],
};

/* set default configs */
defaults.font.size = 16;
defaults.font.weight = "bold";

const setHeight = (Number(window.innerWidth) > 480 ? '75%' : '100%');

const GradeChart = () => (
    <Line
        data={data}
        height={setHeight}
        options={{
            plugins: {
                title: {
                    display: true,
                    text: "Class Average"
                }
            },
            scale: {
                beginAtZero: true,
                max: 100
            },
            font: {
                size: 100
            }
        }}
    />
);

export default GradeChart;