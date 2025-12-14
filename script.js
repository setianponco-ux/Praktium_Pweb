var selectedRow = null;
const STORAGE_KEY = "productData";

window.addEventListener("DOMContentLoaded", () => {
  loadDataFromStorage();
});
function onFormSubmit(e) {
  event.preventDefault();
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}
function readFormData() {
  var formData = {};
  formData["productCode"] = document.getElementById("productCode").value;
  formData["product"] = document.getElementById("product").value;
  formData["qty"] = document.getElementById("qty").value;
  formData["perPrice"] = document.getElementById("perPrice").value;
  return formData;
}
function insertNewRecord(data) {
  var table = document
    .getElementById("storeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.productCode;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.product;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.qty;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = formatCurrency(parseCurrencyToNumber(data.perPrice) || 0);
  cell5 = newRow.insertCell(4);
  var rowTotal = calculateRowTotal(data.qty, data.perPrice);
  cell5.innerHTML = formatCurrency(rowTotal);
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick = "onDelete(this)">Hapus</button>`;
  

  saveDataToStorage();
  updateGrandTotal();
}
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
  document.getElementById("product").value = selectedRow.cells[1].innerHTML;
  document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
  // perPrice cell is formatted currency, convert to plain number when editing
  document.getElementById("perPrice").value = parseCurrencyToNumber(selectedRow.cells[3].innerHTML);
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.productCode;
  selectedRow.cells[1].innerHTML = formData.product;
  selectedRow.cells[2].innerHTML = formData.qty;
  selectedRow.cells[3].innerHTML = formatCurrency(parseCurrencyToNumber(formData.perPrice) || 0);
  var rowTotal = calculateRowTotal(formData.qty, formData.perPrice);
  selectedRow.cells[4].innerHTML = formatCurrency(rowTotal);
  saveDataToStorage();
  updateGrandTotal();
}
function onDelete(td) {
  if (confirm("Apakah kamu yakin ingin menghapus data ini? 😒")) {
    row = td.parentElement.parentElement;
    document.getElementById("storeList").deleteRow(row.rowIndex);
    resetForm();
    
    saveDataToStorage();
    updateGrandTotal();
  }
}
function resetForm() {
  document.getElementById("productCode").value = "";
  document.getElementById("product").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("perPrice").value = "";
  selectedRow = null;
}

function saveDataToStorage() {
  var table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
  var data = [];
  for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    data.push({
      productCode: row.cells[0].innerHTML,
      product: row.cells[1].innerHTML,
      qty: row.cells[2].innerHTML,
      perPrice: parseCurrencyToNumber(row.cells[3].innerHTML)
    });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function loadDataFromStorage() {
  var savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    var data = JSON.parse(savedData);
    data.forEach((item) => {
      insertNewRecord(item);
    });
    updateGrandTotal();
  }
}

function calculateRowTotal(qty, perPrice){
  var q = parseFloat(qty) || 0;
  var p = parseCurrencyToNumber(perPrice) || 0;
  return q * p;
}

function formatCurrency(value){
  try{
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Math.round(value));
  }catch(e){
    return 'Rp ' + (Math.round(value) || 0);
  }
}

function parseCurrencyToNumber(str){
  if(str === null || str === undefined) return 0;
  var s = String(str);
  s = s.replace(/[^0-9,\.-]+/g, '');
  s = s.replace(/\./g, '');
  s = s.replace(/,/g, '.');
  var n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function updateGrandTotal(){
  var table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
  var grand = 0;
  for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    var totalCell = row.cells[4];
    if(totalCell){
      var amount = parseCurrencyToNumber(totalCell.innerHTML);
      grand += amount || 0;
    }
  }
  var grandNode = document.getElementById('grandTotal');
  if(grandNode){
    grandNode.innerHTML = formatCurrency(grand);
  }
}
