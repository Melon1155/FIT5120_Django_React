import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AccidentChart = ({ data }) => {
    const chartData = {
        labels: ['Low', 'Medium', 'High'],
        datasets: [
            {
                label: 'Accident Severity',
                data: [data.low, data.medium, data.high],
                backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
                borderColor: ['#4CAF50', '#FF9800', '#F44336'],
                borderWidth: 1,
                borderRadius: 5,
                hoverBackgroundColor: ['#66BB6A', '#FFA726', '#EF5350'],
                hoverBorderColor: ['#66BB6A', '#FFA726', '#EF5350'],
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 4,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(0,0,0,0.1)',
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    beginAtZero: true,
                    stepSize: 1,
                },
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutCubic',
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default AccidentChart;
