var selectedIndex = null;
var array1 = new Array();
array1.push({"Frekvencia":"87,6", "teljesitmeny":"7,6", "csatorna":"Neo FM", "adohely":"Győr"});
array1.push({"Frekvencia":"87,6", "teljesitmeny":"0,5", "csatorna":"Kontakt Rádió", "adohely":"Budapest"});

printArray();

function printArray(){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML="";
    for (var i = 0; i < array1.length; i++) {
        var newRow = table.insertRow(table.length);
        newRow.insertCell(0).innerHTML = array1[i].Frekvencia;
        newRow.insertCell(1).innerHTML = array1[i].teljesitmeny;
        newRow.insertCell(2).innerHTML = array1[i].csatorna;
        newRow.insertCell(3).innerHTML = array1[i].adohely;
        newRow.insertCell(4).innerHTML = '<a onClick="onEdit('+i+')">Szerkeszt</a> <a onClick="onDelete('+i+')">Töröl</a>';
    }
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["Frekvencia"] = document.getElementById("Frekvencia").value;
    formData["teljesitmeny"] = document.getElementById("teljesitmeny").value;
    formData["csatorna"] = document.getElementById("csatorna").value;
    formData["adohely"] = document.getElementById("adohely").value;
    return formData;
}

function insertNewRecord(data) {
    array1.push(data);
    printArray();
}

function resetForm() {
    document.getElementById("Frekvencia").value = "";
    document.getElementById("teljesitmeny").value = "";
    document.getElementById("csatorna").value = "";
    document.getElementById("adohely").value = "";
    selectedIndex = null;
}

function onEdit(index) {
    document.getElementById("Frekvencia").value = array1[index].Frekvencia;
    document.getElementById("teljesitmeny").value = array1[index].teljesitmeny;
    document.getElementById("csatorna").value = array1[index].csatorna;
    document.getElementById("adohely").value = array1[index].adohely;
    selectedIndex = index;
}

function updateRecord(formData) {
    array1[selectedIndex] = formData;
    printArray();
}

function onDelete(index) {
    if (confirm('Biztosan törölni akarod?')) {
        array1.splice(index, 1);
        resetForm();
        printArray();
    }
}

function validate() {
    var isValid = true;
    if (document.getElementById("Frekvencia").value == "") {
        isValid = false;
        document.getElementById("FrekvenciaValidationError").classList.remove("hide");
    } else {
        document.getElementById("FrekvenciaValidationError").classList.add("hide");
    }
    return isValid;
}