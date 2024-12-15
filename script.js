async function fetchPatients(){
    try{
        const response = await fetch('json_analysis1.json');
        if (!response.ok) throw new Error('Failed to fetch patients');

        const data = await response.json();
        console.log(data);

        const patients = data.patient;
        const container = document.getElementById('patientList');
        const Load = document.getElementById('btn');

        if (btn.style.display === 'none'){
            btn.style.display = 'block';
        }else{
            btn.style.display = 'none'
        }


        if (patients && patients.length > 0){
            container.innerHTML = patients.map(patient =>
                `<div class="card">
                    <h3>${patient.Name}</h3>
                    <button onclick= "showPatientDetails('${patient.ID}')">Details</button>
                    <div class="details" id="details-${patient.ID}" style= "display: block;"></div>
                </div>`
            ).join('');
    }   else {
        container.innerHTML = `<p>No Patient List Found</p>`;
    }
    }  catch (error) {
        alert('Error loading patients:'+ error.message);
    } 
}


async function showPatientDetails(patientId) {
    try{
        const response = await fetch('json_analysis1.json');
        if (!response.ok) throw new Error('Failed to fetch patient details');

        const data = await response.json();
        const patient = data.patient.find(p => p.ID === patientId);
        const detailsContainer = document.getElementById(`details-${patient.ID}`);

        
        if(patient){
            console.log(patient);
            const PatientDetails = `
                <p><strong>ID:</strong> ${patient.ID}</p>
                <p><strong>Gender:</strong> ${patient.Gender}</p>
                <p><strong>Age:</strong> ${patient.Age}</p>
                <p><strong>GA:</strong> ${patient.GA}</p>
                <p><strong>BMI:</strong> ${patient.BMI}</p>
                <p><strong>Examination Findings:</strong></p>
                <ul>
                    ${Object.entries(patient["Examination Findings"]).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
                </ul>
                <p><strong> Conclusion:</strong> ${patient.Conclusion}</p>
            `;
                // ID: patient.ID,
                // Name: patient.Name,
                // Gender: patient.Gender,
                // Age: patient.Age,
                // GA: patient.GA,
                // BMI: patient.BMI,
                // ExaminationFinding: patient["Examination Findings"],
                // Conclusion: patient.Conclusion




            detailsContainer.innerHTML = PatientDetails

            if (detailsContainer.style.display === 'none'){
                detailsContainer.style.display = 'block';
            }else{
                detailsContainer.style.display = 'none'
            }
            // detailsContainer.style.diplay = detailsContainer.style.display === 'block';
        } else {
            detailsContainer.innerText = '<p>patient not found.</p>';
        }
    } catch (error){
        alert('Error loading patient Details:' + error.message);
    }
}




