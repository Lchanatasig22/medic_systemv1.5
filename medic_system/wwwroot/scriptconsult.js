﻿$(document).ready(function () {
    // Añadir fila a la tabla de diagnósticos
    $('#anadirFila').on('click', function () {
        const $diagnosticoSelect = $('#DiagnosticoId');
        const selectedDiagnostico = $diagnosticoSelect.val();
        const selectedDiagnosticoText = $diagnosticoSelect.find("option:selected").text();

        if (selectedDiagnostico) {
            const newRow = `
            <tr>
                <td>${selectedDiagnosticoText}<input type="hidden" name="Diagnosticos.DiagnosticoId" value="${selectedDiagnostico}" /></td>
                <td>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-outline-secondary">
                            <input type="checkbox" name="Diagnosticos.PresuntivoDiagnosticos" autocomplete="off"> Presuntivo
                        </label>
                        <label class="btn btn-outline-secondary">
                            <input type="checkbox" name="Diagnosticos.DefinitivoDiagnosticos" autocomplete="off"> Definitivo
                        </label>
                    </div>
                </td>
                <td><button type="button" class="btn btn-outline-secondary eliminar-fila-diagnostico"><i class="fas fa-times-circle"></i> Eliminar</button></td>
            </tr>`;

            $('#diagnosticoTableBody').append(newRow);
            $diagnosticoSelect.val(''); // Resetea el select después de añadir
        } else {
            alert("Por favor, seleccione un diagnóstico antes de añadir.");
        }
    });

    // Eliminar fila de diagnóstico
    $('#diagnosticoTableBody').on('click', '.eliminar-fila-diagnostico', function () {
        $(this).closest('tr').remove();
    });

    // Añadir fila a la tabla Medicamentos
    $('#anadirFilaMedicamento').on('click', function () {
        const $medicamentoSelect = $('#MedicamentoId');
        const selectedMedicamento = $medicamentoSelect.val();
        const selectedMedicamentoText = $medicamentoSelect.find("option:selected").text();

        if (selectedMedicamento) {
            const newRow = `
            <tr>
                <td>${selectedMedicamentoText}<input type="hidden" name="Medicamentos.MedicamentoId" value="${selectedMedicamento}" /></td>
                <td><input type="number" name="Medicamentos.Cantidad" max="999" placeholder="0" class="form-control" /></td>
                <td><input type="text" name="Medicamentos.Observacion" maxlength="300" placeholder="Máximo 300 caracteres" class="form-control" /></td>
                <td><button type="button" class="btn btn-outline-secondary eliminar-fila-medicamento"><i class="fas fa-times-circle"></i> Eliminar</button></td>
            </tr>`;

            $('#medicamentosTableBody').append(newRow);
            $medicamentoSelect.val(''); // Resetea el select después de añadir
        } else {
            alert("Por favor, seleccione un medicamento antes de añadir.");
        }
    });

    // Eliminar fila de medicamentos
    $('#medicamentosTableBody').on('click', '.eliminar-fila-medicamento', function () {
        $(this).closest('tr').remove();
    });

    // Añadir fila a la tabla Imágenes
    $('#anadirFilaImagen').on('click', function () {
        const $imagenSelect = $('#ImagenId');
        const selectedImagen = $imagenSelect.val();
        const selectedImagenText = $imagenSelect.find("option:selected").text();

        if (selectedImagen) {
            const newRow = `
            <tr>
                <td>${selectedImagenText}<input type="hidden" name="Imagenes.ImagenId" value="${selectedImagen}" /></td>
                <td><input type="number" name="Imagenes.Cantidad" max="999" placeholder="0" class="form-control" /></td>
                <td><input type="text" name="Imagenes.Observacion" maxlength="300" placeholder="Máximo 300 caracteres" class="form-control" /></td>
                <td><button type="button" class="btn btn-outline-secondary eliminar-fila-imagen"><i class="fas fa-times-circle"></i> Eliminar</button></td>
            </tr>`;

            $('#imagenesTableBody').append(newRow);
            $imagenSelect.val(''); // Resetea el select después de añadir
        } else {
            alert("Por favor, seleccione una imagen (examen) antes de añadir.");
        }
    });

    // Eliminar fila de imágenes
    $('#imagenesTableBody').on('click', '.eliminar-fila-imagen', function () {
        $(this).closest('tr').remove();
    });

    // Añadir fila a la tabla Laboratorios
    $('#anadirFilaLaboratorio').on('click', function () {
        const $laboratorioSelect = $('#LaboratorioId');
        const selectedLaboratorio = $laboratorioSelect.val();
        const selectedLaboratorioText = $laboratorioSelect.find("option:selected").text();

        if (selectedLaboratorio) {
            const newRow = `
            <tr>
                <td>${selectedLaboratorioText}<input type="hidden" name="Laboratorios.LaboratorioId" value="${selectedLaboratorio}" /></td>
                <td><input type="number" name="Laboratorios.Cantidad" max="999" placeholder="0" class="form-control" /></td>
                <td><input type="text" name="Laboratorios.Observacion" maxlength="300" placeholder="Máximo 300 caracteres" class="form-control" /></td>
                <td><button type="button" class="btn btn-outline-secondary eliminar-fila-laboratorio"><i class="fas fa-times-circle"></i> Eliminar</button></td>
            </tr>`;

            $('#laboratorioTableBody').append(newRow);
            $laboratorioSelect.val(''); // Resetea el select después de añadir
        } else {
            alert("Por favor, seleccione un laboratorio antes de añadir.");
        }
    });

    // Eliminar fila de laboratorios
    $('#laboratorioTableBody').on('click', '.eliminar-fila-laboratorio', function () {
        $(this).closest('tr').remove();
    });

    // Función para enviar el formulario como JSON
    $('#submitFormButton').on('click', function () {
        submitFormAsJson();
    });

    // Configuración inicial del wizard
    const $navListItems = $('div.stepwizard-step button');
    const $allWells = $('.setup-content');
    $allWells.hide();

    // Mostrar el primer paso al cargar la página
    $('#step-1').show();
    const $firstNavItem = $navListItems.first();
    $firstNavItem.addClass('btn-primary').removeClass('btn-secondary');
    $firstNavItem.removeAttr('disabled');  // Asegúrate de que el primer botón no esté deshabilitado

    // Manejo de clicks en los pasos del wizard
    $navListItems.on('click', function (e) {
        e.preventDefault();
        const $item = $(this);
        const step = $item.data('step');
        const $target = $('#step-' + step);

        if (!$item.hasClass('disabled')) {
            $navListItems.removeClass('btn-primary').addClass('btn-secondary');
            $item.addClass('btn-primary');
            $allWells.hide();
            $target.show().find('input:eq(0)').focus();
        }
    });

    // Mostrar u ocultar campos de observación al cambiar los switches
    $('.consulta-antecedente-checked').on('change', function () {
        const $observacionField = $(this).closest('.fields').find('.consulta-antecedente-observacion');
        const isChecked = $(this).is(':checked');

        $observacionField.toggle(isChecked);
        $observacionField.find('input').prop('disabled', !isChecked);
    });
});


//Modificacion tabla

//document.getElementById('agregarAlergiaCirugia').addEventListener('click', function () {
//    var tipoAlergiaSelect = document.getElementById('tipoAlergiaSelect');
//    var obserAlergias = document.getElementById('Obseralergias').value;
//    var tipoCirugiaSelect = document.getElementById('tipoCirugiaSelect');
//    var obserCirugias = document.getElementById('ObsercirugiasId').value;

//    // Obtener el texto y valor seleccionado de las alergias y cirugías
//    var alergiaText = tipoAlergiaSelect.options[tipoAlergiaSelect.selectedIndex].text;
//    var alergiaValue = tipoAlergiaSelect.value;
//    var cirugiaText = tipoCirugiaSelect.options[tipoCirugiaSelect.selectedIndex].text;
//    var cirugiaValue = tipoCirugiaSelect.value;

//    var tableBody = document.querySelector('#tablaAlergiasCirugias tbody');

//    // Solo agregar si hay selección válida
//    if (alergiaValue && obserAlergias) {
//        var row = tableBody.insertRow();
//        row.innerHTML = `<td>Alergia</td><td>${alergiaText}</td><td>${obserAlergias}</td><td><button type="button" class="btn btn-danger btn-sm eliminarFila">Eliminar</button></td>`;
//    }

//    if (cirugiaValue && obserCirugias) {
//        var row = tableBody.insertRow();
//        row.innerHTML = `<td>Cirugía</td><td>${cirugiaText}</td><td>${obserCirugias}</td><td><button type="button" class="btn btn-danger btn-sm eliminarFila">Eliminar</button></td>`;
//    }

//    // Limpiar campos después de agregar
//    tipoAlergiaSelect.selectedIndex = 0;
//    document.getElementById('Obseralergias').value = '';
//    tipoCirugiaSelect.selectedIndex = 0;
//    document.getElementById('ObsercirugiasId').value = '';
//});

document.getElementById('tablaAlergiasCirugias').addEventListener('click', function (event) {
    if (event.target.classList.contains('eliminarFila')) {
        var fila = event.target.closest('tr');
        fila.remove();
    }
});

function goToNextStep(stepNumber, event) {
    event = event || window.event;
    var curStep = $(event.target).closest(".setup-content"),
        nextStepWizard = $('div.stepwizard-step button[data-step="' + stepNumber + '"]'),
        curInputs = curStep.find("input, select"),
        isValid = true;

    $(".form-group").removeClass("has-error");
    curInputs.each(function () {
        if (!this.validity.valid) {
            isValid = false;
            $(this).closest(".form-group").addClass("has-error");
        }
    });

    if (isValid) {
        curStep.hide();
        nextStepWizard.removeAttr('disabled').trigger('click');
        $('#step-' + stepNumber).show();
    }
}

function goToPreviousStep(stepNumber) {
    var curStep = $('#step-' + stepNumber),
        prevStepWizard = $('div.stepwizard-step button[data-step="' + (stepNumber - 1) + '"]');

    prevStepWizard.removeAttr('disabled').trigger('click');
    curStep.hide();
    $('#step-' + (stepNumber - 1)).show();
}

// Función para enviar el formulario como JSON

function submitFormAsJson() {
    const form = document.getElementById('consultationForm');
    const formData = new FormData(form);
    const object = {};

    // Mapeo de los campos que deben ser números
    const intFields = [
        "PacienteConsultaP", "TipoparienteConsulta", "AlergiasConsultaId",
        "CirugiasConsultaId", "DiasincapacidadConsulta", "MedicoConsultaD",
        "EspecialidadId", "EstadoConsultaC", "TipoConsultaC", "ActivoConsulta",
        "ParentescoCatalogoCardiopatia", "ParentescoCatalogoDiabetes",
        "ParentescoCatalogoEnfCardiovascular", "ParentescoCatalogoHipertension",
        "ParentescoCatalogoCancer", "ParentescoCatalogoTuberculosis",
        "ParentescoCatalogoEnfMental", "ParentescoCatalogoEnfInfecciosa",
        "ParentescoCatalogoMalFormacion", "ParentescoCatalogoOtro",
        "Diagnosticos.DiagnosticoId", "Laboratorios.LaboratorioId", "Imagenes.ImagenId",
        "Medicamentos.MedicamentoId", "Imagenes.Cantidad", "Laboratorios.Cantidad"
    ];

    // Mapeo de los campos que deben ser booleanos
    const boolFields = [
        "Cardiopatia", "Diabetes", "EnfCardiovascular", "Hipertension",
        "Cancer", "Tuberculosis", "EnfMental", "EnfInfecciosa",
        "MalFormacion", "Otro", "OrgSentidos", "Respiratorio",
        "CardioVascular", "Digestivo", "Genital", "Urinario",
        "MEsqueletico", "Endocrino", "Linfatico", "Nervioso",
        "Cabeza", "Cuello", "Torax", "Abdomen", "Pelvis",
        "Extremidades", "PresuntivoDiagnosticos", "DefinitivoDiagnosticos",
        "ConsultaAntecedentesFamiliares.Cardiopatia"
    ];

    formData.forEach((value, key) => {
        if (intFields.includes(key)) {
            object[key] = value ? parseInt(value, 10) : null;
        } else if (boolFields.includes(key)) {
            object[key] = value === "true" || value === "on";
        } else {
            object[key] = value;
        }

        // Verificación de campos null
        if (object[key] === null) {
            console.log(`Campo ${key} está en null.`);
        }
    });

    // Capturar los diagnósticos
    const diagnosticos = [];
    document.querySelectorAll('#diagnosticoTableBody tr').forEach(row => {
        const diagnosticoIdElement = row.querySelector('input[name="Diagnosticos.DiagnosticoId"]');
        if (diagnosticoIdElement) {
            const diagnosticoId = parseInt(diagnosticoIdElement.value, 10);
            const presuntivoElement = row.querySelector('input[name="Diagnosticos.PresuntivoDiagnosticos"]');
            const definitivoElement = row.querySelector('input[name="Diagnosticos.DefinitivoDiagnosticos"]');
            const presuntivo = presuntivoElement ? presuntivoElement.checked : false;
            const definitivo = definitivoElement ? definitivoElement.checked : false;
            diagnosticos.push({
                diagnostico_id: diagnosticoId,
                presuntivo_diagnosticos: presuntivo,
                definitivo_diagnosticos: definitivo
            });

            // Verificación de campos null en diagnósticos
            if (diagnosticoId === null) {
                console.log('Campo diagnostico_id está en null.');
            }
        }
    });
    object["Diagnosticos"] = diagnosticos.length > 0 ? diagnosticos : [];

    // Capturar los medicamentos
    const medicamentos = [];
    document.querySelectorAll('#medicamentosTableBody tr').forEach(row => {
        const medicamentoIdElement = row.querySelector('input[name="Medicamentos.MedicamentoId"]');
        if (medicamentoIdElement) {
            const medicamentoId = parseInt(medicamentoIdElement.value, 10);
            const cantidadElement = row.querySelector('input[name="Medicamentos.Cantidad"]');
            const observacionElement = row.querySelector('input[name="Medicamentos.Observacion"]');
            const cantidad = cantidadElement ? parseInt(cantidadElement.value, 10) : null;
            const observacion = observacionElement ? observacionElement.value : null;
            medicamentos.push({
                medicamento_id: medicamentoId,
                dosis_medicamento: cantidad,
                observacion_medicamento: observacion
            });

            // Verificación de campos null en medicamentos
            if (medicamentoId === null) {
                console.log('Campo medicamento_id está en null.');
            }
            if (cantidad === null) {
                console.log('Campo cantidad en medicamentos está en null.');
            }
        }
    });
    object["Medicamentos"] = medicamentos.length > 0 ? medicamentos : [];

    // Capturar las imágenes
    const imagenes = [];
    document.querySelectorAll('#imagenesTableBody tr').forEach(row => {
        const imagenIdElement = row.querySelector('input[name="Imagenes.ImagenId"]');
        if (imagenIdElement) {
            const imagenId = parseInt(imagenIdElement.value, 10);
            const cantidadElement = row.querySelector('input[name="Imagenes.Cantidad"]');
            const observacionElement = row.querySelector('input[name="Imagenes.Observacion"]');
            const cantidad = cantidadElement ? parseInt(cantidadElement.value, 10) : null;
            const observacion = observacionElement ? observacionElement.value : null;
            imagenes.push({
                imagen_id: imagenId,
                cantidad_imagen: cantidad,
                observacion_imagen: observacion
            });

            // Verificación de campos null en imágenes
            if (imagenId === null) {
                console.log('Campo imagen_id está en null.');
            }
            if (cantidad === null) {
                console.log('Campo cantidad en imágenes está en null.');
            }
        }
    });
    object["Imagenes"] = imagenes.length > 0 ? imagenes : [];

    // Capturar los laboratorios
    const laboratorios = [];
    document.querySelectorAll('#laboratorioTableBody tr').forEach(row => {
        const laboratorioIdElement = row.querySelector('input[name="Laboratorios.LaboratorioId"]');
        if (laboratorioIdElement) {
            const laboratorioId = parseInt(laboratorioIdElement.value, 10);
            const cantidadElement = row.querySelector('input[name="Laboratorios.Cantidad"]');
            const observacionElement = row.querySelector('input[name="Laboratorios.Observacion"]');
            const cantidad = cantidadElement ? parseInt(cantidadElement.value, 10) : null;
            const observacion = observacionElement ? observacionElement.value : null;
            laboratorios.push({
                laboratorio_id: laboratorioId,
                cantidad_laboratorio: cantidad,
                observacion_laboratorio: observacion
            });

            // Verificación de campos null en laboratorios
            if (laboratorioId === null) {
                console.log('Campo laboratorio_id está en null.');
            }
            if (cantidad === null) {
                console.log('Campo cantidad en laboratorios está en null.');
            }
        }
    });
    object["Laboratorios"] = laboratorios.length > 0 ? laboratorios : [];

    // Debugging: Verificar el contenido del objeto antes de enviarlo
    console.log("Formulario capturado:", object);

    // Convertir el objeto a JSON y enviarlo
    const json = JSON.stringify(object);
    console.log("JSON enviado:", json); // Verificación adicional antes de enviar

    fetch(consultaUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(response => {
            if (response.ok) {
                return response.json();  // Parsear respuesta JSON
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(data => {
            console.log("Respuesta completa del servidor:", data);

            const consultaId = parseInt(data.id, 10);
            if (isNaN(consultaId) || consultaId <= 0) {
                console.error(`Received invalid consultaId: ${consultaId} from server`);
                throw new Error("El ID de la consulta no se recibió correctamente.");
            }

            // Usando la URL generada por @Url.Action
            var getConsultId = '@Url.Action("GetConsultaById", "Consultatio")';
            const consultaDetailsUrl = `${getConsultId}/${consultaId}`;

            // Nueva solicitud para obtener los detalles de la consulta
            return fetch(consultaDetailsUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => {
            if (response.ok) {
                return response.json();  // Parsear respuesta JSON con los detalles de la consulta
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(consulta => {
            // Mostrar los detalles completos de la consulta en la consola
            console.log("Detalles completos de la consulta:", consulta);

            // Si quieres redirigir a la página de edición o mostrar los detalles, puedes hacerlo aquí
            const redirUrl = editarConsultaUrl.replace('__ID__', consulta.ConsultaId);
            window.location.href = redirUrl;
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Ocurrió un error al crear la consulta: ${error.message}`);
        });
}







