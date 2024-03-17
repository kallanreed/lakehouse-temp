function updateChart(data) {
    const ctx = document.getElementById('tempChart');
    const labels = data.map(x => x.d);
    const tempData = data.map(x => x.t);
    const humidData = data.map(x => x.h);

    const color = Chart.helpers.color;
    const chartColors = {
        Temp: 'rgb(244,91,105)',
        Humid: 'rgb(172, 193, 215)',
        Lines: 'rgb(228, 253, 225)',
        Background: 'rgb(107, 39, 55)'
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: tempData,
                backgroundColor: color(chartColors.Temp).alpha(0.2).rgbString(),
                borderColor: color(chartColors.Temp).rgbString(),
            }, {
                label: 'Humidity',
                data: humidData,
                backgroundColor: color(chartColors.Humid).alpha(0.2).rgbString(),
                borderColor: color(chartColors.Humid).rgbString(),
            }]
        },
        options: {
            scales: {
                x: {
                    backgroundColor: chartColors.Background,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    ticks: {
                        color: chartColors.Lines,
                    },
                },
                y: {
                    backgroundColor: chartColors.Background,
                    beginAtZero: false,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    ticks: {
                        color: chartColors.Lines,
                    },
                }
            }
        }
    });
}