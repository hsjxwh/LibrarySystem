//更新表格现实的数据
export function updateTableData(allData, tableData, currentPage, pageSize) {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  tableData.value = allData.value.slice(start, end);
}

// 页码改变时的处理函数
export function handleCurrentChange(allData, tableData, page, currentPage, pageSize) {
  currentPage.value = page;
  updateTableData(allData, tableData, currentPage, pageSize);
}
