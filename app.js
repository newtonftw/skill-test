

document.addEventListener('DOMContentloaded', async () => {
    const username = 'coalition';
    const password = 'skills-test';
    const encodedCredentials = btoa(`${username}:${password}`)

     try {
        console.log('Fetching data...');
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
            headers: {
                'Authorization': `Basix ${encodedCredentials}`
            }
        });
        const data = await response.json();
        console.log('Data fetched:', data);

        const jessica = data.find(person => person.name === 'Jessica Taylor');
        if (!jessica) {
            throw new Error(jessica taylor not found );
        }
        
        const diagnosisHistory = jessica.diagnosis_history;
        console.log('Data fetched:', data);

        const ctx = document.getElementById('diagnosisChart').getCpntext('2d');
        const labels = diagnosisHistory.map(item => `${item.month} ${item.year}`);
        const bloodPressureSystolic = diagnosisHistory.map(item => item.blood_Pressure.systolic.value);
        const bloodPressureDiastolic = diagnosisHistory.map(item => item.blood_Pressure.diastolic.value);
        const heartRate = diagnosisHistory.map(item => item.heart_rate.value);
        const respiratoryRate = diagnosisHistory.map(item => item.respiratory_rate.value);
        const temperature = diagnosisHistory.map(item.temperature.value);

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Systolic Blood Pressure',
                        data: bloodPressureSystolic,
                        borderColor: 'raba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Diastolic Blood Pressure',
                        data: bloodPressureDiastolic,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Heart Rate',
                        data: heartRate,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Respiratory Rate',
                        data: respiratoryRate,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        fill: false,
                    },
                    {
                        label: 'Temperature',
                        data: temperature,
                        borderColor: 'rgba(255, 206, 86, 1)',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        fill: false,
                    }
                ]
            },
            Options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
     } catch (error) {
        console.error('Error fetching data:', error)
     }
});

