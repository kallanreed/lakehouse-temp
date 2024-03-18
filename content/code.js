function updateUI(data) {
    const tempChartElement = document.getElementById('tempChart');
    const humidityChartElement = document.getElementById('humidityChart');
    const tempValElement = document.getElementById('tempVal');
    const humidityValElement = document.getElementById('humidityVal');
    const dateValElement = document.getElementById('lastUpdateVal');
    data.sort((x, y) => x.d.localeCompare(y.d));

    // Use 'Z' to force parsing as UTC so conversion to local time works.
    const labels = data.map(x => new Date(x.d + 'Z'));
    const tempData = data.map(x => x.t);
    const humidData = data.map(x => x.h);

    dateValElement.innerText = labels.slice(-1).toLocaleString("en-US");
    tempValElement.innerText = tempData.slice(-1) + '\u00B0';
    humidityValElement.innerText = humidData.slice(-1) + '%';

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

function fetchData() {
    fetch("readweather")
        .then(resp => resp.json())
        .then(data => updateUI(data))
        .catch(error => console.error('Error fetching data:', error));
}