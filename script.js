var selectedIndex = null;
var array1 = new Array();
array1.push({"Frekvencia":"87,6	7,6","teljesitmeny":"Neo FM 	Győr","csatorna":"Szabadhegy","adohely":" "});
// OR: array1[0]= {"Frekvencia":"John Smith","teljesitmeny":"data1@gmail.com","csatorna":"2000","adohely":"London"};
array1.push({"Frekvencia":"87,6","teljesitmeny":"Kontakt Rádió","csatorna":"Budapest","adohely":"Terézváros "});
printArray();
function printArray(){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML="";
    var newRow;
    for (i = 0; i < array1.length; i++) {
        newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = array1[i].Frekvencia;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = array1[i].teljesitmeny;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = array1[i].csatorna;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = array1[i].adohely;
        cell4 = newRow.insertCell(4);
        cell4.innerHTML = '<a onClick="onEdit('+i+')">Edit</a>' + '<a onClick="onDelete('+i+')">Delete</a>';
    }
}
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex==null)
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
    array1.push({"Frekvencia":data.Frekvencia,"teljesitmeny":data.teljesitmeny,"csatorna":data.csatorna,"adohely":data.adohely});
    // OR: array1[array1.length]= {"Frekvencia":data.Frekvencia,"teljesitmeny":data.teljesitmeny,"csatorna":data.csatorna,"adohely":data.adohely};
    printArray();
}

function resetForm() {
    document.getElementById("Frekvencia").value = "";
    document.getElementById("teljesitmeny").value = "";
    document.getElementById("csatorna").value = "";
    document.getElementById("adohely").value = "";
    selectedIndex=null;
}
function onEdit(index) {
    document.getElementById("Frekvencia").value = array1[index].Frekvencia;
    document.getElementById("teljesitmeny").value = array1[index].teljesitmeny;
    document.getElementById("csatorna").value = array1[index].csatorna;
    document.getElementById("adohely").value = array1[index].adohely;
    selectedIndex=index;
}
function updateRecord(formData) {
    array1[selectedIndex].Frekvencia=formData.Frekvencia;
    array1[selectedIndex].teljesitmeny=formData.teljesitmeny;
    array1[selectedIndex].csatorna=formData.csatorna;
    array1[selectedIndex].adohely=formData.adohely;
    printArray();
}
function onDelete(index) {
    if (confirm('Are you sure to delete this record ?')) {
        array1.splice(index, 1); // Deleting the entry with the specified index
        resetForm();
        printArray();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("Frekvencia").value == "") {
        isValid = false;
        document.getElementById("FrekvenciaValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("FrekvenciaValidationError").classList.contains("hide"))
            document.getElementById("FrekvenciaValidationError").classList.add("hide");
    }
    return isValid;
}