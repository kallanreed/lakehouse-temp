function updateChart(data) {
    const tempChartElement = document.getElementById('tempChart');
    const humidityChartElement = document.getElementById('humidityChart');
    data.sort((x, y) => x.d.localeCompare(y.d));

    const labels = data.map(x => x.d);
    const tempData = data.map(x => x.t);
    const humidData = data.map(x => x.h);

    const color = Chart.helpers.color;
    const chartColors = {
        Temp: 'rgb(244,91,105)',
        Humid: 'rgb(172, 193, 215)',
        Lables: 'rgb(228, 228, 225)',
        Lines: 'rgba(228, 228, 225, 0.2)',
    };

    new Chart(tempChartElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: tempData,
                backgroundColor: color(chartColors.Temp).alpha(0.2).rgbString(),
                borderColor: color(chartColors.Temp).rgbString(),
            }]
        },
        options: {
            plugins: {
                title: {
                    text: "Temperature",
                    display: true,
                    color: chartColors.Lables
                },
                legend: {
                    display: false
                },
                decimation: {
                    enabled: true,
                    algorithm: 'lttb'
                }
            },
            elements: {
                point: {
                    pointStyle: false
                }
            },
            layout: {
                padding: 10
            },
            scales: {
                x: {
                    grid: {
                        color: [chartColors.Lines],
                    },
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: "M/d HH"
                        }
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                },
                y: {
                    grace: 5,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                }
            }
        }
    });

    new Chart(humidityChartElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humidity',
                data: humidData,
                backgroundColor: color(chartColors.Humid).alpha(0.2).rgbString(),
                borderColor: color(chartColors.Humid).rgbString(),
            }]
        },
        options: {
            plugins: {
                title: {
                    text: "Humidity",
                    display: true,
                    color: chartColors.Lables
                },
                legend: {
                    display: false
                },
                decimation: {
                    enabled: true,
                    algorithm: 'lttb'
                }
            },
            elements: {
                point: {
                    pointStyle: false
                }
            },
            layout: {
                padding: 10
            },
            scales: {
                x: {
                    grid: {
                        color: [chartColors.Lines],
                    },
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: "M/d HH"
                        }
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                },
                y: {
                    grace: 5,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                }
            }
        }
    });
}