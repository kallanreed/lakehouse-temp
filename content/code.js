function updateUI(data) {
    const tempChartElement = document.getElementById('tempChart');
    const humidityChartElement = document.getElementById('humidityChart');
    const tempInValElement = document.getElementById('tempInVal');
    const humidityInValElement = document.getElementById('humidityInVal');
    const tempOutValElement = document.getElementById('tempOutVal');
    const humidityOutValElement = document.getElementById('humidityOutVal');
    const dateValElement = document.getElementById('lastUpdateVal');
    data.sort((x, y) => x.d.localeCompare(y.d));

    // Use 'Z' to force parsing as UTC so conversion to local time works.
    const labels = data.map(x => new Date(x.d + 'Z'));
    const tempInData = data.map(x => x.t);
    const humidInData = data.map(x => x.h);
    const tempOutData = data.map(x => x.to);
    const humidOutData = data.map(x => x.ho);

    dateValElement.innerText = labels.slice(-1).toLocaleString("en-US");
    tempInValElement.innerText = tempInData.slice(-1) + '\u00B0';
    humidityInValElement.innerText = humidInData.slice(-1) + '%';
    tempOutValElement.innerText = tempOutData.slice(-1) + '\u00B0';
    humidityOutValElement.innerText = humidOutData.slice(-1) + '%';

    const color = Chart.helpers.color;
    const chartColors = {
        TempIn: 'rgb(244,91,105)',
        TempOut: 'rgb(224, 127, 58)',
        HumidIn: 'rgb(172, 193, 215)',
        HumidOut: 'rgb(43, 215, 224)',
        Lables: 'rgb(228, 228, 225)',
        Lines: 'rgba(228, 228, 225, 0.2)',
    };

    new Chart(tempChartElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature Indoor',
                data: tempInData,
                backgroundColor: color(chartColors.TempIn).alpha(0.2).rgbString(),
                borderColor: color(chartColors.TempIn).rgbString(),
                yAxisID: 'y1',
            }, {
                label: 'Temperature Outdoor',
                data: tempOutData,
                backgroundColor: color(chartColors.TempOut).alpha(0.2).rgbString(),
                borderColor: color(chartColors.TempOut).rgbString(),
                yAxisID: 'y2',
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
                y1: {
                    grace: 1,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                    position: 'left'
                },
                y2: {
                    grace: 1,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                    position: 'right'
                }
            }
        }
    });

    new Chart(humidityChartElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humidity Indoor',
                data: humidInData,
                backgroundColor: color(chartColors.HumidIn).alpha(0.2).rgbString(),
                borderColor: color(chartColors.HumidIn).rgbString(),
                yAxisID: 'y1',
            }, {
                label: 'Humidity Outdoor',
                data: humidOutData,
                backgroundColor: color(chartColors.HumidOut).alpha(0.2).rgbString(),
                borderColor: color(chartColors.HumidOut).rgbString(),
                yAxisID: 'y2',
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
                y1: {
                    grace: 1,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                    position: 'left'
                },
                y2: {
                    grace: 1,
                    grid: {
                        color: [chartColors.Lines],
                    },
                    ticks: {
                        color: chartColors.Lables,
                    },
                    position: 'right'
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